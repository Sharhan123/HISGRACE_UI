import React, { useEffect } from 'react';
import { Routes, Route, BrowserRouter as Router, useNavigate } from 'react-router-dom';
import HomePage from '../pages/userPages/homePage';
import Authentication from '../pages/userPages/signinSignupPage';
import Otp from '../components/otpVerification/otp';
import auth from '../protectedRouters/userProtected';
import VehicleDetailsPage from '../pages/userPages/vehicleDetailsPage';
import PackageDetails from '../pages/userPages/packageDetailPage';
import ProfilePage from '../pages/userPages/profilePage';
import { handleLogout, verifyUser } from '../services/userServices';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { jwtDecode } from 'jwt-decode';
import { Itoken } from '../interfaces';
import PackagesListing from '../pages/userPages/packagesListing';
import Forget from '../components/forgetPassword/forgetPassword';
import ForgetOtp from '../components/forgetPassword/forgetOtp';
import ForgetVerify from '../components/forgetPassword/forgetVerify';
import VehicleListing from '../pages/userPages/vehicleListingPage';
import ServicePage from '../pages/userPages/servicePage';
import VehicleSelectionPage from '../pages/userPages/vehicleSelectionPage';
import BookingConfirmPage from '../pages/userPages/bookingConfirmPage';
import PaymentConfirmation from '../components/bookingComponent/successPage';
import PaymentFailure from '../components/bookingComponent/failurePage';
import Success from '../components/bookingComponent/success';
const UserRoutes = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  useEffect(() => {
    const check = async () => {

      try {
        if (token) {
          const decode: Itoken = jwtDecode(token)


          const res = await verifyUser(decode.id)
          console.log(res);

          if (res.status === 200) {
            if (res.data.blocked === true) {
              handleLogout()
            }
          }
        }
      } catch (err) {
        console.log(err);

      }
    }
    check()
  }, [])
  return (
    
    <Routes>

      <Route path="/" element={<HomePage />} />
      <Route path='/packages' element={<PackagesListing />} />
      <Route path="/signin-signup" element={<auth.ProtectedRouteWrapper children={<Authentication />} />} />
      <Route path="/otp" element={<auth.ProtectedRouteWrapper children={<Otp />} />} />
      <Route path='/vehicles' element={<VehicleListing/>} />
      <Route path='/vehicle' element={<VehicleDetailsPage />} />
      <Route path='/packageDetails/:id' element={<PackageDetails/>} />
      <Route path='/profile' element={<auth.authRouterWrapper children={<ProfilePage />} />} />
      <Route path='/forgetPassword' element={<auth.ProtectedRouteWrapper children={<Forget />} />} />
      <Route path='/forgetOtp' element={<auth.forgetOtpWrapper children={<ForgetOtp />} />} />
      <Route path='/resetPassword' element={<auth.forgetPasswordWrapper children={<ForgetVerify/>} />} />
      <Route path='/services' element={<ServicePage/>} />
      <Route path='/choosevehicle' element={<auth.bookingWrapper><VehicleSelectionPage/></auth.bookingWrapper>} />
      <Route path='/cofirmBooking' element={<auth.bookingWrapper><BookingConfirmPage/></auth.bookingWrapper>} />
      <Route path='/success' element={<PaymentConfirmation/>} />
      <Route path='/failure' element={<PaymentFailure/>} />
      <Route path='/one' element={<Success/>} />
    </Routes>

  );
};

export default UserRoutes;
