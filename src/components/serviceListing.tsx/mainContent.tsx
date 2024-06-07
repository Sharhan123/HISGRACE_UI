import React, {  useEffect } from 'react'

import 'react-datepicker/dist/react-datepicker.css';

import OnewayCard from '../customUI/onewayCard';
import Navbar from '../homePage/navbar';


const MainContent: React.FC = () => {
    useEffect(()=>{
        document.body.style.overflowY = 'hidden';
        return ()=>{document.body.style.overflowY = ''}
    },[])
    

    return (
        <div className='h-screen flex  flex-col'>
            <Navbar/>
            <h1 className='text-center bg-custom text-white py-3 mt-5 rounded border drop-shadow-md container mx-auto kanit-regular text-xl   underline-offset-1'>You can book your trip here !<p className='text-sm kanit-light'>Please let us know if you have any confusion in your booking chat with admin or contact <span className='text-blue-600'>9847109700</span></p></h1>
            <OnewayCard />
        </div>
    )
}

export default MainContent
