import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = {
  accessExpirationTime: null,
  isLoggedIn: null,
  name: null,
  role: null,
  profileImage: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      const { accessExpirationTime, name, role, profileImage } = action.payload;
      state.accessExpirationTime = accessExpirationTime;
      state.isLoggedIn = true;
      state.name = name;
      state.role = role;
      state.profileImage = profileImage;
    },
    logout(state) {
      state.accessExpirationTime = initialAuthState.accessExpirationTime;
      state.isLoggedIn = false;
      state.name = initialAuthState.name;
      state.role = initialAuthState.role;
      state.profileImage = initialAuthState.profileImage;
    },
    updateUserInfo(state, action) {
      const { name, profileImage } = action.payload;
      state.name = name;
      state.profileImage = profileImage;
    },
  },
});

export default authSlice.reducer;
export const authActions = authSlice.actions;
