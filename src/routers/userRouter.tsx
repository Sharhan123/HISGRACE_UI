import React, { useEffect, Suspense } from 'react';
import { Routes, Route, BrowserRouter as Router, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { jwtDecode } from 'jwt-decode';
import { Itoken } from '../interfaces';
import { handleLogout, verifyUser } from '../services/userServices';
import auth from '../protectedRouters/userProtected';
import Loader from '../components/customUI/loader';
import PackageBooking from '../components/packageBooking/bookingConfirm';
import { verifyUserToken } from '../middleWares/userTokenVerify';

// Lazy-loaded route components
const HomePage = React.lazy(() => import('../pages/userPages/homePage'));
const PackagesListing = React.lazy(() => import('../pages/userPages/packagesListing'));
const Authentication = React.lazy(() => import('../pages/userPages/signinSignupPage'));
const Otp = React.lazy(() => import('../components/otpVerification/otp'));
const VehicleListing = React.lazy(() => import('../pages/userPages/vehicleListingPage'));
const VehicleDetailsPage = React.lazy(() => import('../pages/userPages/vehicleDetailsPage'));
const PackageDetails = React.lazy(() => import('../pages/userPages/packageDetailPage'));
const ProfilePage = React.lazy(() => import('../pages/userPages/profilePage'));
const Forget = React.lazy(() => import('../components/forgetPassword/forgetPassword'));
const ForgetOtp = React.lazy(() => import('../components/forgetPassword/forgetOtp'));
const ForgetVerify = React.lazy(() => import('../components/forgetPassword/forgetVerify'));
const ServicePage = React.lazy(() => import('../pages/userPages/servicePage'));
const VehicleSelectionPage = React.lazy(() => import('../pages/userPages/vehicleSelectionPage'));
const BookingConfirmPage = React.lazy(() => import('../pages/userPages/bookingConfirmPage'));
const PaymentConfirmation = React.lazy(() => import('../components/bookingComponent/successPage'));
const PaymentFailure = React.lazy(() => import('../components/bookingComponent/failurePage'));
const ChatingPage = React.lazy(() => import('../pages/userPages/chatingPage'));

const UserRoutes = () => {
  const token = useSelector((state: RootState) => state.auth.token);
const navigate = useNavigate()
  useEffect(() => {
    verifyUserToken(navigate)
    const check = async () => {
      try {
        if (token) {
          const decode: Itoken = jwtDecode(token);
          const res = await verifyUser(decode.id);

          if (res.status === 200) {
            if (res.data.blocked === true) {
              handleLogout();
            }
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    check();
  }, [token]);

  return (
    
      <Suspense fallback={<Loader open/>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/packages" element={<PackagesListing />} />
          <Route path="/signin-signup" element={<auth.ProtectedRouteWrapper children={<Authentication />} />} />
          <Route path="/otp" element={<auth.ProtectedRouteWrapper children={<Otp />} />} />
          <Route path="/vehicles" element={<VehicleListing />} />
          <Route path="/vehicle" element={<VehicleDetailsPage />} />
          <Route path="/packageDetails/:id" element={<PackageDetails />} />
          <Route path="/profile" element={<auth.authRouterWrapper children={<ProfilePage />} />} />
          <Route path="/forgetPassword" element={<auth.ProtectedRouteWrapper children={<Forget />} />} />
          <Route path="/forgetOtp" element={<auth.forgetOtpWrapper children={<ForgetOtp />} />} />
          <Route path="/resetPassword" element={<auth.forgetPasswordWrapper children={<ForgetVerify />} />} />
          <Route path="/services" element={<ServicePage />} />
          <Route path="/choosevehicle" element={<auth.bookingWrapper><VehicleSelectionPage /></auth.bookingWrapper>} />
          <Route path="/cofirmBooking" element={<auth.bookingWrapper><BookingConfirmPage /></auth.bookingWrapper>} />
          <Route path="/success" element={<PaymentConfirmation />} />
          <Route path="/failure" element={<PaymentFailure />} />
          <Route path="/chat" element={<auth.authRouterWrapper><ChatingPage /></auth.authRouterWrapper>} />
          <Route path='/packageBooking' element={<auth.packageWrapper><PackageBooking/></auth.packageWrapper>} />
        </Routes>
      </Suspense>
    
  );
};

export default UserRoutes;
