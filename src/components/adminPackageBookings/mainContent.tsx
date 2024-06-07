import React, { useEffect } from 'react'
import Sidebar from '../customUI/asideAdmin'
import AdminNavbar from '../customUI/adminNavbar'
import Alert from '../customUI/alert'
import RecordTable from './bookingListing'

function MainContent() {
  useEffect(()=>{

  },[])
  return (
    <div className="h-screen overflow-auto bg-gray-700-50/50">
      <Alert/>
        <Sidebar packageBookings={'true'}/>
        <div className="p-4 xl:ml-80">
        <AdminNavbar />
        <RecordTable />
        </div>
    </div>
  )
}

export default MainContent
