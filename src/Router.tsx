import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Authentication from './pages/userPages/signinSignupPage';
import HomePage from "./pages/userPages/homePage";
import Otp from "./components/otpVerification/otp";
import { useSelector } from "react-redux";
import { RootState } from './redux/store'
import UserRoutes from "./routers/userRouter";
import AdminRoutes from "./routers/adminRouter";
import DriverRoutes from "./routers/driverRouter";


function Routers() {
    const token = useSelector((state: RootState) => state.auth.token); // Assuming 'auth' is your slice name and 'token' is the token property in your state

    return (
        
        <Router>
            <UserRoutes/>
            <AdminRoutes/>
            <DriverRoutes/>
       </ Router>
    );
}

export default Routers;
