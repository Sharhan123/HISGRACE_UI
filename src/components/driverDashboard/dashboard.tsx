import React, { useEffect, useState } from 'react'
import Sidebar from '../customUI/asideAdmin'
import AdminNavbar from '../customUI/adminNavbar'
import RecordTable from '../adminVehicles/vehicleListing'
import { useNavigate } from 'react-router-dom'
import LogoutIcon from '@mui/icons-material/Logout';
import { getBookings } from '../../services/bookingsServices'
import { IbookingRes, IdriverRes } from '../../interfaces'
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import BookingDetails from '../customUI/bookingDetails'
interface props{
  driver:IdriverRes
}

const Dashboard:React.FC<props> = ({driver})=>{
  const [arrivals,setArrivals] = useState<IbookingRes[]>([])
  const [show,setShow] = useState(false)
  console.log(driver);
  
    useEffect(()=>{
      const fetch= async ()=>{
        try{
          const res = await getBookings()
          console.log(res.data.data,'data');
          
          const filtered = res.data.data.filter((item:IbookingRes)=> item.driver.email === driver.email )
          setArrivals(filtered)
        }catch(err){
          console.log(err);
          
        }
      }
      fetch()
        document.body.style.overflowY = 'scroll'
    },[])

    
    const navigate = useNavigate() 
    function formatTimeWithAmPm(time:any) {
      const [hour, minute] = time.split(':').map(Number);
      const amPm = hour >= 12 ? 'PM' : 'AM';
      const formattedHour = hour % 12 || 12; // Convert hour to 12-hour format
      return `${formattedHour}:${minute < 10 ? '0' + minute : minute} ${amPm}`;
    }
    return (
    <div className="bg-white h-screen w-full">
     <header>
                {/* <input
                    type="checkbox"
                    name="hbr"
                    id="hbr"
                    className="hbr peer"
                    hidden
                    aria-hidden="true"
                    checked={isOpen}
                    onChange={() => setIsOpen(!isOpen)}
                /> */}
                <nav className={` w-full bg-custom backdrop-blur navbar shadow-2xl shadow-gray-600/5  `}>
                    <div className="xl:container m-auto px-6 md:px-12 lg:px-6">
                        <div className="flex w-full grid grid-cols-2 items-center justify-between gap-6 md:py-2 md:gap-0 lg:py-2">
                            <div className="w-full   items-center flex justify-between lg:w-auto">
                                
                                <h1 className='text-white kanit-medium text-3xl ml-5'>HISGRACE CABS - DRIVER</h1>
                                
                                <label htmlFor="hbr" className="peer-checked:hamburger block relative z-20 p-6 -mr-6 cursor-pointer lg:hidden">
                                    <div aria-hidden="true" className="m-auto h-0.5 w-5 rounded bg-gray-900 dark:bg-gray-300 transition duration-300"></div>
                                    <div aria-hidden="true" className="m-auto mt-2 h-0.5 w-5 rounded bg-gray-900 dark:bg-gray-300 transition duration-300"></div>
                                </label>
                            </div>
                            <div className={`navmenu w-full  flex-wrap justify-end items-center mb-8 lg:mb-0 md:mb-0  space-y-8 p-6 rounded-3xl  shadow-gray-300/20   `}>
                            <a onClick={()=>{
                                              localStorage.removeItem('driver')
                                              navigate('/driver')
                                            }} className="relative flex gap-2 cursor-pointer h-9 ml-auto items-center justify-end sm:px-6 before:absolute before:inset-0 before:rounded-full focus:before:bg-sky-600/10 dark:focus:before:bg-sky-400/10 before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95">
                                                <LogoutIcon className='text-red-500 '/>
                                                <span className="relative text-sm text-red-500 font-semibold text-primary dark:text-primaryLight"> Logout</span>
                                            </a>
                                {/* <div className="w-full text-white  space-y-2 border-primary/10 dark:border-gray-700 flex flex-col justify-center items-center -ml-1 hidden md:block lg:block sm:flex-row lg:space-y-0 md:w-max lg:border-l ">
                                   
                                            
                                        
                                    



                                </div> */}
                            </div>

                        </div>

                    </div>
            

                </nav>

            </header>

            <h1 className='mt-5 ml-5 text-xl bg-custom px-5 w-fit rounded kanit-regular text-white'>
              My Bookings
              </h1>
              <div className='h-auto grid grid-cols-2 p-2 gap-2 w-full  '>
        <span className='col-span-2 flex flex-col items-center bg-custom overflow-auto h-80 '>
          <div className='kanit-light text-xl text-white '>
           {/* Today's Trips - {formatDate()} */}
          </div>
          <div className='h-full w-full overflow-auto'>
        {arrivals && arrivals[0] ?(
        arrivals.map((arrival, index) => (
          <>
          <BookingDetails booking={arrival} showModal={show} close={()=>setShow(false)} />
          <div key={index} className='h-16 grid grid-cols-6 border-b m-2 p-2'>    
          <span className='col-span-1 text-lg  kanit-regular text-white'>
            {arrival.from.name || arrival.from.city} <CompareArrowsIcon className='text-green'/> {arrival.to.name || arrival.to.city}
          </span>
          <span className='col-span-1 text-lg  kanit-regular text-white'>
            <span className='bg-white rounded text-black px-2'>{arrival.pickupDetails.bookingName}</span>
          </span>
          <span className='col-span-1 text-lg m kanit-regular text-yellow-400'>
            {arrival.vehicle.vehicleName}
          </span>
          <span className='col-span-1  justify-between text-lg mx-auto kanit-regular text-white'>
        {  formatTimeWithAmPm(arrival.period.time)}


          </span>
          <span className='col-span-1 text-lg mx-auto kanit-regular text-white'>
            ₹ {arrival.totalPrice} /-
          </span>
          <span className='col-span-1 text-lg mx-auto kanit-regular text-white'>
           <button onClick={()=>setShow(true)} className='px-2 py-1 bg-gradient-to-br from-orange-600 to-orange-400 text-white kanit-light text-sm rounded'>view details</button>
          </span>
          </div>
          </>
         ))):(
          <div  className=' h-full  p-2 mx-auto flex justify-center items-center'>    
          <span className='text-lg kanit-regular text-white'>
           No Bookings for today
          </span>
          </div>
         )
        }
      </div>
        </span>
        
      </div>  
    </div>
  )
}

export default Dashboard
