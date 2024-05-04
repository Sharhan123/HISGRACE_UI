// authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IauthState } from '../../interfaces';



const initialState: IauthState = {
  token: localStorage.getItem('token') || null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<string>) {
      
      state.token = action.payload;
    },
    logout(state) {
      state.token = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
