import { Route, Routes, BrowserRouter as Router, Navigate } from "react-router-dom"
import AdminLoginPage from "../pages/adminPages/adminLoginPage"
import AdminDashboardPage from "../pages/adminPages/adminDashboardPage"
import AdminVehiclePage from "../pages/adminPages/adminVehiclePage"
import adminProtected from "../protectedRouters/adminProtected"
import AdminUsers from "../pages/adminPages/adminUsers"
import AdminPackagesPage from "../pages/adminPages/adminPackagesPage"
import AdminDriverPage from "../pages/adminPages/adminDrivers"
import AdminBookingsPage from "../pages/adminPages/adminBookingPage"
import AdminMessagesPage from "../pages/adminPages/adminMessagesPage"
import AdminPackageBookings from "../pages/adminPages/adminPackageBookings"

const AdminRoutes: React.FC = () => {

return (
        
            <Routes> 
                <Route path="/admin" element={<adminProtected.ProtectedAuthWrapper><AdminLoginPage /> </adminProtected.ProtectedAuthWrapper>} />
                <Route path="/admin/dashboard" element={<adminProtected.ProtectedRouteWrapper><AdminDashboardPage /></adminProtected.ProtectedRouteWrapper>} />
                <Route path="/admin/vehicles" element={<adminProtected.ProtectedRouteWrapper><AdminVehiclePage /></adminProtected.ProtectedRouteWrapper>} />
                <Route path="/admin/users" element={<adminProtected.ProtectedRouteWrapper><AdminUsers/></adminProtected.ProtectedRouteWrapper>} />
                <Route path="/admin/packages" element={<adminProtected.ProtectedRouteWrapper><AdminPackagesPage/></adminProtected.ProtectedRouteWrapper>} />
                <Route path="/admin/drivers" element={<adminProtected.ProtectedRouteWrapper><AdminDriverPage/></adminProtected.ProtectedRouteWrapper>} />
                <Route path="/admin/bookings" element={<adminProtected.ProtectedRouteWrapper><AdminBookingsPage/></adminProtected.ProtectedRouteWrapper>} />
                <Route path="/admin/packageBookings" element={<adminProtected.ProtectedRouteWrapper><AdminPackageBookings/></adminProtected.ProtectedRouteWrapper>} />
                <Route path="/admin/chats" element={<adminProtected.ProtectedRouteWrapper><AdminMessagesPage /></adminProtected.ProtectedRouteWrapper>} />
            </Routes>
       
    )
}

export default AdminRoutes