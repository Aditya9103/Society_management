import { createSlice } from '@reduxjs/toolkit';

const USER_KEY  = 'parapet_admin_user';

const initialState = {
  user: JSON.parse(localStorage.getItem(USER_KEY) || 'null'),
  isAuthenticated: !!localStorage.getItem(USER_KEY),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, { payload: { user } }) {
      state.user = user;
      state.isAuthenticated = true;
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem(USER_KEY);
      // Clean up legacy token from previous version if it exists
      localStorage.removeItem('parapet_admin_token');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;

// Selectors
export const selectCurrentUser  = (state) => state.auth.user;
export const selectIsAdmin      = (state) => state.auth.isAuthenticated;
