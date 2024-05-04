import React from 'react'
import Navbar from '../../components/homePage/navbar'
import MainContent from '../../components/serviceListing.tsx/mainContent'
import Alert from '../../components/customUI/alert'

const ServicePage:React.FC = ()=> {
  return (
    <>
    <Alert/>
    <Navbar/>
    <MainContent/>
    </>
  )
}

export default ServicePage
