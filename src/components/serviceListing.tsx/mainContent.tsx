import React, { ChangeEvent, useEffect, useRef, useState } from 'react'

import 'react-datepicker/dist/react-datepicker.css';

import OnewayCard from '../customUI/onewayCard';


const MainContent: React.FC = () => {
    
    

    return (
        <div className='h-screen '>
            <h1 className='text-center  kanit-Regular text-3xl  mt-5 underline-offset-1'>Route Services</h1>
            <OnewayCard 
         />
        </div>
    )
}

export default MainContent
