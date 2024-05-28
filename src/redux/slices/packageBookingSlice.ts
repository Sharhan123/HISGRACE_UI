import { createSlice } from '@reduxjs/toolkit';
const storedData = localStorage.getItem('package');

const initialState = {
  packageData:  storedData ? JSON.parse(storedData) : null

};

const bookingSlice = createSlice({
  name: 'package',
  initialState,
  reducers: {
    setPackage: (state, action) => {
      state.packageData = action.payload;
    },
    clearPackage: (state) => {
      state.packageData = null;
    },
  },
});

export const { setPackage, clearPackage } = bookingSlice.actions;
export const selectPackageData = (state:any) => state.package.packageData;
export default bookingSlice.reducer;
