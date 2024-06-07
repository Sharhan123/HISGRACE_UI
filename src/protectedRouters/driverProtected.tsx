

import React from 'react';

import { Navigate } from 'react-router-dom';
import { verifyAdminToken } from '../middleWares/adminTokenVerify';

const DriverRouteWrapper = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('driver')
  if (token) {
    verifyAdminToken(token)
      return <>{children}</>; 
    } else {
      return <Navigate to="/driver" replace />;
  }
}

const DriverAuthRouter = ({ children }: { children: React.ReactNode }) => {
const token = localStorage.getItem('driver')
 if(token){
    return <Navigate to={'/driver/dashboard'} replace/>
 }else{
    return <>{children}</>
 }

}

export default {DriverRouteWrapper,DriverAuthRouter}
