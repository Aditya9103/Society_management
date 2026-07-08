import { createSlice } from '@reduxjs/toolkit';

const USER_KEY = 'parapet_admin_user';
const TOKEN_KEY = 'parapet_admin_token';

const initialState = {
  user: JSON.parse(localStorage.getItem(USER_KEY) || 'null'),
  token: localStorage.getItem(TOKEN_KEY) || null,
  isAuthenticated: !!localStorage.getItem(TOKEN_KEY),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, { payload: { user } }) {
      const { token, ...userData } = user;
      state.user = userData;
      state.token = token;
      state.isAuthenticated = true;
      localStorage.setItem(USER_KEY, JSON.stringify(userData));
      if (token) localStorage.setItem(TOKEN_KEY, token);
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem(USER_KEY);
      localStorage.removeItem(TOKEN_KEY);
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;

// Selectors
export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export const selectIsAdmin = (state) => state.auth.isAuthenticated;
