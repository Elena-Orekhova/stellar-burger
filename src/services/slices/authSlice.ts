import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import {
  loginUserApi,
  logoutApi,
  getUserApi,
  registerUserApi,
  forgotPasswordApi,
  resetPasswordApi,
  updateUserApi,
  fetchWithRefresh,
  TRegisterData,
  TLoginData,
  TRefreshResponse,
  TAuthResponse,
  TUserResponse
} from '@api';
import { TUser } from '@utils-types';
import { RootState } from '../../services/store';
import { deleteCookie, setCookie, getCookie } from '../../utils/cookie';

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

// Селекторы
export const selectAuthState = (state: RootState) => state.auth;
export const selectUser = (state: RootState): TUser | null => state.auth.user;

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
export const loginUser = createAsyncThunk<TAuthResponse, TLoginData>(
  'auth/loginUser',
  async (body) => {
    const data = await loginUserApi(body);
    return data;
  }
);

// Thunk для получения данных о пользователе
export const fetchUser = createAsyncThunk('auth/fetchUser', async () => {
  const data = await getUserApi();
  return data.user;
});

// Thunk для обновления данных о пользователе
export const updateUser = createAsyncThunk<TUserResponse, TRegisterData>(
  'auth/fetchNewDateUser',
  async (body) => {
    const user = await updateUserApi(body);
    return user;
  }
);

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
    const data = await forgotPasswordApi({ email });
    return data;
  }
);

// Thunk для запроса изменения пароля
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (args: { password: string; token: string }) => {
    const { password, token } = args;
    const data = await resetPasswordApi({ password, token });
    return data;
  }
);

// Thunk для выхода пользователя
export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
  const refreshToken = getCookie('refreshToken');
  if (!refreshToken) {
    throw new Error('Требуется токен');
  }
  await logoutApi();
  return true;
});

// Создание слайса для аутентификации, пользователя, управления паролем
const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        setCookie('accessToken', action.payload.accessToken);
        setCookie('userData', JSON.stringify(action.payload.user));
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.isAuthenticated = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        setCookie('userData', JSON.stringify(action.payload.user));
      })
      .addCase(updateUser.rejected, (state) => {
        state.isAuthenticated = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        setCookie('accessToken', action.payload.accessToken);
        setCookie('userData', JSON.stringify(action.payload.user));
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(registerUser.rejected, (state) => {
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.isAuthenticated = true;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isAuthenticated = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        deleteCookie('accessToken');
        deleteCookie('userData');
        localStorage.removeItem('refreshToken');
      })
      .addCase(logoutUser.rejected, (state, action) => {
        console.error('Ошибка выхода:', action.error);
      });
  }
});

export const authReducer = authSlice.reducer;
