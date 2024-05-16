import React, { useEffect } from 'react'
import InfoIcon from '@mui/icons-material/Info';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import { IdriverRes } from '../../interfaces';
import { removeDriverById } from '../../services/driverService';
import { useNavigate } from 'react-router-dom';
interface props{
    driver:IdriverRes | null
}

const Rejected:React.FC<props> = ({driver})=> {
    useEffect(()=>{
        document.body.style.overflowY = 'hidden'
        
        return ()=>{document.body.style.overflowY = ''}
    },[])
    const navigate = useNavigate()
  const removeDriver = async ()=>{
    try{
        const res = await removeDriverById(driver?._id)
        localStorage.removeItem('driver')
        navigate('/driver')
    }catch(err)
    {
        console.log(err);
        
    }
  }

    return (

    <div className='h-screen flex justify-center items-center'>
        <div className='grid grid-rows-4 w-5/6 mx-auto bg-custom rounded h-5/6'>
            <span className='row-span-1 flex justify-center gap-3 items-center'>
                <TravelExploreIcon className='text-yellow-400' fontSize='large'/> <h1 className='text-4xl kanit-regular text-white'>HISGRACE CABS</h1>
                {/* <h1 className='text-white text-2xl text-center kanit-light'><HourglassBottomIcon className='text-yellow-400' fontSize='medium'/> Waiting for Approval from Admin of Hisgrace</h1> */}
            </span>
            <span className='row-span-1 mx-auto flex flex-col  justify-start gap-5 items-center w-5/6 '>
                
               <div className='flex justify-center items-center gap-5'><InfoIcon className='text-red-600 '  fontSize='large'/><h1 className='text-4xl kanit-regular text-red-500'> Admin has rejected the registration Request</h1></div> 
               <button onClick={removeDriver} className='px-2 text-white kanit-regular py-2 rounded bg-yellow-500'>Back to Register</button>
                <p className='text-xl kanit-light text-white'>Application for driver registration in HISGRACE CABS has rejected by admin 
                     Please try another account and  check the reason of rejection at <span className='text-blue-500'>{driver?.email}</span> sent by admin.
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
                            Application status : <span className='text-xl kanit-light text-yellow-400'>{driver?.status} your application</span>
                        </h1>
                    </div>
            </span>
        </div>
    </div>
  )
}

export default Rejected
