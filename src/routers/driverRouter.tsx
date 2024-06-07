import { Route, Routes } from "react-router-dom"
import Loader from "../components/customUI/loader";
import React, { Suspense } from "react";
import DriverOtp from "../components/driverRegister/otpVerification";
import DriverProtected from "../protectedRouters/driverProtected";
import Aprooval from "../components/driverDashboard/mainContent";
const RegisterPage = React.lazy(() => import('../pages/driverPages/driverRegisterPage'));

const DriverRoutes: React.FC = () => {

    return (

        <Suspense fallback={<Loader open />}>
            <Routes>
                <Route path="/driver" element={<DriverProtected.DriverAuthRouter><RegisterPage/></DriverProtected.DriverAuthRouter>} />
                <Route path="/driver/verification" element={<DriverOtp/>} />
                <Route path="/driver/dashboard" element={<DriverProtected.DriverRouteWrapper><Aprooval/></DriverProtected.DriverRouteWrapper>} />
            </Routes>
            </Suspense>
            )
}

            export default DriverRoutes