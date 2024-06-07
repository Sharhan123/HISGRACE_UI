import React, { useEffect } from 'react'
import Sidebar from '../customUI/asideAdmin'
import AdminNavbar from '../customUI/adminNavbar'
import RecordTable from './bookingsListing'
import Alert from '../customUI/alert'

const MainContent:React.FC = ()=> {
  useEffect(()=>{

  },[])
  return (
    <div className="h-screen overflow-auto bg-gray-700-50/50">
      <Alert/>
        <Sidebar bookings={'true'}/>
        <div className="p-4 xl:ml-80">
        <AdminNavbar />
        <RecordTable />
        </div>
    </div>
  )
}

export default MainContent
