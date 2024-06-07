import React from 'react'
import Sidebar from '../customUI/asideAdmin'
import AdminNavbar from '../customUI/adminNavbar'
import RecordTable from './packagesListing'

const MainContent:React.FC = ()=> {
  return (
    <div className="min-h-screen bg-gray-700-50/50">
        <Sidebar packages={'true'}/>
        <div className="p-4 xl:ml-80">
        <AdminNavbar />
        <RecordTable />
        </div>
    </div>
  )
}

export default MainContent
