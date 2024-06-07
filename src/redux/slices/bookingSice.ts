import { createSlice } from '@reduxjs/toolkit';
const storedData = localStorage.getItem('booking');

const initialState = {
  bookingData:  storedData ? JSON.parse(storedData) : null

};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setBookingData: (state, action) => {
      state.bookingData = action.payload;
    },
    clearBookingData: (state) => {
      state.bookingData = null;
    },
    backBookingData:(state)=>{
      state.bookingData.show = false
    }
  },
});

export const { setBookingData, clearBookingData,backBookingData } = bookingSlice.actions;
export const selectBookingData = (state:any) => state.booking.bookingData;
export default bookingSlice.reducer;
