// reducers/index.ts
import { combineReducers } from 'redux';
import authReducer from './authSlice';
import alertReducer from './alertSlice'
import bookingReducer from './bookingSice'
const rootReducer = combineReducers({
  auth: authReducer,
  alert: alertReducer,
  booking:bookingReducer
});

export default rootReducer;
