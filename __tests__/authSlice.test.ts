import {
  authReducer,
  loginUser,
  fetchUser,
  logoutUser,
  AuthState
} from '../src/services/slices/authSlice';

describe('authSlice', () => {
  let initialState: AuthState;

  beforeEach(() => {
    initialState = {
      isAuthenticated: false,
      isAuthChecked: false,
      user: null,
      loading: false
    };
  });

  const testUser = { email: 'testUser@yandex.ru', name: 'testuser' };
  const loginData = { email: 'testUser@yandex.ru', password: 'testPassword' };

  it('при вызове экшена loginUser.pending loading становится true', () => {
    const action = { type: loginUser.pending.type, payload: undefined };
    const actualState = authReducer(initialState, action);
    expect(actualState.loading).toBe(true);
  });

  it('при вызове экшена loginUser.fulfilled isAuthenticated становится true и loading false, user получает данные пользователя', () => {
    const actionPayload = {
      user: testUser,
      accessToken: 'token',
      refreshToken: 'refresh'
    };
    const action = loginUser.fulfilled(
      { ...actionPayload, success: true },
      '',
      loginData
    );
    const actualState = authReducer(initialState, action);

    expect(actualState.isAuthenticated).toBe(true);
    expect(actualState.loading).toBe(false);
    expect(actualState.user).toEqual(testUser);
  });

  it('при вызове экшена loginUser.rejected isAuthenticated становится false, loading false, user null', () => {
    const error = new Error('Ошибка авторизации');
    const action = loginUser.rejected(error, 'requestId', loginData);

    const actualState = authReducer(initialState, action);

    expect(actualState.isAuthenticated).toBe(false);
    expect(actualState.loading).toBe(false);
    expect(actualState.user).toBeNull();
  });

  it('при вызове экшена fetchUser.pending loading становится true', () => {
    const action = fetchUser.pending('requestId');
    const actualState = authReducer(initialState, action);

    expect(actualState.loading).toBe(true);
  });

  it('при вызове экшена fetchUser.fulfilled isAuthenticated становится true, loading false, user получает данные пользователя', () => {
    const action = fetchUser.fulfilled(testUser, 'requestId');
    const actualState = authReducer(initialState, action);

    expect(actualState.isAuthenticated).toBe(true);
    expect(actualState.loading).toBe(false);
    expect(actualState.user).toEqual(testUser);
  });

  it('при вызове экшена fetchUser.rejected isAuthenticated становится false, loading false', () => {
    const action = fetchUser.rejected(new Error('Ошибка'), 'requestId');
    const actualState = authReducer(initialState, action);

    expect(actualState.isAuthenticated).toBe(false);
    expect(actualState.loading).toBe(false);
  });

  it('при вызове экшена logoutUser.fulfilled isAuthenticated становится false, user null, loading false', () => {
    const action = logoutUser.fulfilled(true, 'requestId');
    const actualState = authReducer(initialState, action);

    expect(actualState.isAuthenticated).toBe(false);
    expect(actualState.user).toBeNull();
    expect(actualState.loading).toBe(false);
  });

  it('при вызове экшена logoutUser.rejected loading становится false', () => {
    const action = logoutUser.rejected(null, 'Ошибка при выходе пользователя');
    const actualState = authReducer(initialState, action);

    expect(actualState.loading).toBe(false);
  });
});
