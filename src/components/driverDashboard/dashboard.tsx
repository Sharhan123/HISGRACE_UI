import React, { useEffect } from 'react'
import Sidebar from '../customUI/asideAdmin'
import AdminNavbar from '../customUI/adminNavbar'
import RecordTable from '../adminVehicles/vehicleListing'

function Dashboard() {
    useEffect(()=>{
        document.body.style.overflowY = 'scroll'
    },[])
  return (
    <div className=" bg-gray-700-50/50">
        {/* <Sidebar vehicles={'true'}/> */}
        <AdminNavbar />
        <RecordTable />
        
    </div>
  )
}

export default Dashboard
