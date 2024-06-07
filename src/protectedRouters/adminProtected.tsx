import React from 'react';
import { Navigate } from 'react-router-dom';
import { verifyAdminToken } from '../middleWares/adminTokenVerify';

const ProtectedRouteWrapper = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('admin')
  if (token) {
    verifyAdminToken(token)
      return <>{children}</>; 
    } else {
      return <Navigate to="/admin" replace />;
  }
}

const ProtectedAuthWrapper = ({ children }: { children: React.ReactNode }) => {
const token = localStorage.getItem('admin')
 if(token){
    return <Navigate to={'/admin/dashboard'} replace/>
 }else{
    return <>{children}</>
 }

}

export default {ProtectedRouteWrapper,ProtectedAuthWrapper}
