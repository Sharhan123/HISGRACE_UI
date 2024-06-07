import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import UserRoutes from "./routers/userRouter";
import AdminRoutes from "./routers/adminRouter";
import DriverRoutes from "./routers/driverRouter";


const Routers:React.FC = ()=> {

    return (
        
        <Router>
            <UserRoutes/>
            <AdminRoutes/>
            <DriverRoutes/>
       </ Router>
    );
}

export default Routers;
