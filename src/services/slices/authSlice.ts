import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import {
  loginUserApi,
  logoutApi,
  getUserApi,
  registerUserApi,
  TRegisterData
} from '@api';
import { TUser } from '@utils-types';
import { RootState } from '../../services/store';

// Thunk для аутентификации пользователя
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (loginData: { email: string; password: string }) => {
    const data = await loginUserApi(loginData);
    return data;
  }
);

// Thunk для получения информации о пользователе
export const fetchUser = createAsyncThunk('auth/fetchUser', async () => {
  const data = await getUserApi();
  return data.user;
});

// Thunk для регистрации пользователе
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (body: TRegisterData) => {
    const data = await registerUserApi(body);
    return data.user;
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

// Создание слайса для аутентификации и пользователя
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
        state.user = action.payload.user;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        console.log(action);
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
      });
  }
});

export const { setAuth, logout, setUser } = authSlice.actions;

export const authReducer = authSlice.reducer;
