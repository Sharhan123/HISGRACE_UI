import React from 'react'
import MainContent from '../../components/vehicleListing/mainContent'
import Navbar from '../../components/homePage/navbar'
import Footer from '../../components/customUI/Footer'
import SidebarMenu from '../../components/vehicleListing/filter'


const VehicleListing:React.FC = ()=> {
  return (
   <>
   <Navbar/>
   <MainContent />
   </>
  )
}

export default VehicleListing
