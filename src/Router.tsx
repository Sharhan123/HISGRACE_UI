import React from "react";
import UserRoutes from "./routers/userRouter";
import AdminRoutes from "./routers/adminRouter";
import DriverRoutes from "./routers/driverRouter";
import { BrowserRouter as Router } from "react-router-dom";


const Routers:React.FC = ()=> {

    return (
        <Router>
            <UserRoutes/>
            <AdminRoutes/>
            <DriverRoutes/>
       </Router>
    );
}

export default Routers;
