import React from 'react'
import Navbar from '../../components/homePage/navbar'
import MainContent from '../../components/packagesLising/mainContent'
import Footer from '../../components/customUI/Footer'

const PackagesListing:React.FC = ()=> {
  return (
    <>
     <Navbar/> 
     <MainContent/>
     <Footer/>
    </>
  )
}

export default PackagesListing
