// reducers/index.ts
import { combineReducers } from 'redux';
import authReducer from './authSlice';
import alertReducer from './alertSlice'
import bookingReducer from './bookingSice'
import packageReducer from './packageBookingSlice'
const rootReducer = combineReducers({
  auth: authReducer,
  alert: alertReducer,
  booking:bookingReducer,
  package:packageReducer
});

export default rootReducer;
