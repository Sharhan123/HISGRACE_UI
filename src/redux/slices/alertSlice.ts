// alertSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAlertState } from '../../interfaces';

const initialState: IAlertState = {
  show: false,
  head: '',
  content: '',
  color: 'info', 
};

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    showAlert(state, action: PayloadAction<{ head?: string; content: string; color?: string }>) {
      const { head, content, color } = action.payload;
      state.show = true;
      state.head = head || '';
      state.content = content;
      state.color = color || 'info';
    },
    hideAlert(state) {
      state.show = false;
      state.head = '';
      state.content = '';
      state.color = 'info';
    },
  },
});

export const { showAlert, hideAlert } = alertSlice.actions;
export default alertSlice.reducer;
