import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import {
  loginUserApi,
  logoutApi,
  getUserApi,
  registerUserApi,
  TRegisterData,
  TLoginData,
  forgotPasswordApi,
  resetPasswordApi,
  fetchWithRefresh,
  TRefreshResponse,
  TAuthResponse
} from '@api';
import { TUser } from '@utils-types';
import { RootState } from '../../services/store';
import { deleteCookie, setCookie } from '../../utils/cookie';

// Thunk для отправки запросов с автоматическим обновлением токенов
export const fetchWithRefreshThunk = createAsyncThunk<
  TRefreshResponse,
  { url: string; options: RequestInit }
>('api/fetchWithRefresh', async ({ url, options }, { rejectWithValue }) => {
  try {
    const data = await fetchWithRefresh<TRefreshResponse>(url, options);
    return data;
  } catch (err) {
    return rejectWithValue(err);
  }
});

// Thunk для аутентификации пользователя
export const loginUser = createAsyncThunk<TUser, TLoginData>(
  'auth/loginUser',
  async (loginData) => {
    const data = await loginUserApi(loginData);
    return data.user;
  }
);

// Thunk для получения информации о пользователе
export const fetchUser = createAsyncThunk('auth/fetchUser', async () => {
  const data = await getUserApi();
  return data.user;
});

// Thunk для регистрации пользователеля
export const registerUser = createAsyncThunk<TAuthResponse, TRegisterData>(
  'auth/registerUser',
  async (body) => {
    const data = await registerUserApi(body);
    return data;
  }
);

// Thunk для запроса сброса пароля
export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (args: { email: string }) => {
    const { email } = args;
    // TODO: так можно???? args
    const data = await forgotPasswordApi({ email });
    return data;
  }
);

// Thunk для запроса изменения пароля
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (args: { password: string; token: string }) => {
    const { password, token } = args;
    // TODO: так можно???? args
    const data = await resetPasswordApi({ password, token });
    return data;
  }
);

// Thunk для выхода пользователя
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
      return true;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Селекторы
export const selectAuthState = (state: RootState) => state.auth;
export const selectUser = (state: RootState): TUser | null => state.auth.user;

// Интерфейсы
interface AuthState {
  isAuthenticated: boolean;
  isAuthChecked: boolean;
  user: TUser | null;
}

const authInitialState: AuthState = {
  isAuthenticated: false,
  isAuthChecked: false,
  user: null
};

// Создание слайса для аутентификации, пользователя, управления паролем
const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    setAuth(state, action: PayloadAction<AuthState>) {
      return { ...state, ...action.payload };
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
    setUser(state, action: PayloadAction<TUser | null>) {
      state.user = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        setCookie('accessToken', action.payload.accessToken);
        setCookie('refreshToken', action.payload.refreshToken);
        setCookie('userData', JSON.stringify(action.payload.user));
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        deleteCookie('accessToken');
        deleteCookie('refreshToken');
        deleteCookie('userData');
      })
      .addCase(logoutUser.rejected, (state, action) => {
        console.error('Ошибка выхода:', action.error);
      })
      .addCase(fetchWithRefreshThunk.fulfilled, (state, action) => {
        console.log('Fetch with refresh successful:', action.payload);
      })
      .addCase(fetchWithRefreshThunk.rejected, (state, action) => {
        console.error('Ошибка запроса с обновлением токена:', action.error);
      });
  }
});

export const { setAuth, logout, setUser } = authSlice.actions;

export const authReducer = authSlice.reducer;
