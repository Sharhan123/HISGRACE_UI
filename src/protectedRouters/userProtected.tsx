import React, { Children } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Navigate, Route } from 'react-router-dom';
import { verifyUserToken } from '../middleWares/userTokenVerify';
import { selectBookingData } from '../redux/slices/bookingSice';
import { selectPackageData } from '../redux/slices/packageBookingSlice';
import { IbookingAuth } from '../interfaces';

const ProtectedRouteWrapper = ({ children }: { children: React.ReactNode }) => {
  const token = useSelector((state: RootState) => state.auth.token);
  
  if (token) {
    return <Navigate to="/" replace />;
  } else {
    return <>{children}</>; 
  }
};
const authRouterWrapper = ({ children }: { children: React.ReactNode }) => {
  const token = useSelector((state: RootState) => state.auth.token);
  
  if (token) {
    verifyUserToken(token)
    return <>{children}</>; 
  } else {
    return <Navigate to="/" replace />;
  }
};

const forgetPasswordWrapper = ({children}:{children:React.ReactNode})=>{
  const email = localStorage.getItem('email')
  if(email){
    return <>{children}</>
  }else{
    return <Navigate to={'/'} replace />
  }
}

const forgetOtpWrapper = ({children}:{children:React.ReactNode})=>{
  const otp = localStorage.getItem('otp')
  if(otp){
    return <>{children}</>

  }else{
    return <Navigate to={'/'} replace />
  }
}

const bookingWrapper = ({children}:{children:React.ReactNode})=>{
  const booking:IbookingAuth = useSelector(selectBookingData)
  console.log('booking data :');
  
  if(booking.show){
    return <>{children}</> 
  }
  return <Navigate to={'/'} replace />
}

const packageWrapper = ({children}:{children:React.ReactNode})=>{
  const booking = useSelector(selectPackageData)
  if(booking){
    return <>{children}</>
  }
  return <Navigate to={'/'} replace />
}

export default {ProtectedRouteWrapper,packageWrapper,authRouterWrapper,forgetPasswordWrapper,forgetOtpWrapper,bookingWrapper};
