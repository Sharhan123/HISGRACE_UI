import React, { useEffect } from 'react'
import InfoIcon from '@mui/icons-material/Info';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import { IdriverRes } from '../../interfaces';
interface props{
    driver:IdriverRes | null
}

const PendingPage:React.FC<props> = ({driver})=> {
  useEffect(()=>{
    document.body.style.overflowY = 'hidden'

    return ()=>{document.body.style.overflowY = ''}
  },[])

    return (

    <div className='h-screen flex justify-center items-center'>
        <div className='grid grid-rows-4 w-5/6 mx-auto bg-custom rounded h-5/6'>
            <span className='row-span-1 flex justify-center gap-3 items-center'>
                <TravelExploreIcon className='text-yellow-400' fontSize='large'/> <h1 className='text-4xl kanit-regular text-white'>HISGRACE CABS</h1>
                {/* <h1 className='text-white text-2xl text-center kanit-light'><HourglassBottomIcon className='text-yellow-400' fontSize='medium'/> Waiting for Approval from Admin of Hisgrace</h1> */}
            </span>
            <span className='row-span-1 mx-auto flex flex-col  justify-start gap-5 items-center w-5/6 '>
                
               <div className='flex justify-center items-center gap-5'><InfoIcon className='text-orange-500 '  fontSize='large'/><h1 className='text-4xl kanit-regular text-yellow-400'> Registration Request  Pending</h1></div> 
                <p className='text-xl kanit-light text-white'>Application for driver registration in HISGRACE CABS has sent to admin successfully,
                     Please wait until admin approves the application after the approval you can directly enter into the driver dashboard and manage the application
                     with in admin.
                      </p>
            </span>
            <span className='row-span-2  flex px-2 py-5  justify-center gap-10   '>
                
                    <img src={driver?.image} className='w-fit' />
                    <div className='flex flex-col justify-between'>
                        <h1 className='text-xl kanit-light text-white'>
                            Driver Name : {driver?.driverName}
                        </h1>
                        <h1 className='text-xl kanit-light text-white'>
                            Handling Vehicles : {driver?.vehicles.map((item)=>(`${item}  `))}
                        </h1>
                        <h1 className='text-xl kanit-light text-white'>
                            Email address  : {driver?.email}
                        </h1>
                        <h1 className='text-xl kanit-light text-white'>
                            Mobile No. : {driver?.mobile}
                        </h1>
                        <h1 className='text-xl kanit-light text-white'>
                            Experiance : {driver?.exp} yr
                        </h1>
                        <h1 className='text-xl kanit-light text-white'>
                            Application status : <span className='text-xl kanit-light text-yellow-400'>{driver?.status} & waiting for approoval</span>
                        </h1>
                    </div>
            </span>
        </div>
    </div>
  )
}

export default PendingPage
