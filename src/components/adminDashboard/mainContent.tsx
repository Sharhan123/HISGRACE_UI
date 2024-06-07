import React, { useEffect, useState } from 'react'
import Sidebar from '../customUI/asideAdmin'
import AdminNavbar from '../customUI/adminNavbar'
import { verifyAdminToken } from '../../middleWares/adminTokenVerify'
import { useNavigate } from 'react-router-dom'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import TourIcon from '@mui/icons-material/Tour';
import GroupIcon from '@mui/icons-material/Group';
import SensorOccupiedSharpIcon from '@mui/icons-material/SensorOccupiedSharp';
import { getVehicles } from '../../services/vehicleService'
import { getDrivers } from '../../services/driverService'
import { getUsers } from '../../services/adminService'
import { getPackages } from '../../services/packageService'
import { Chart } from 'react-chartjs-2';
import 'chart.js/auto';
import { getBookings } from '../../services/bookingsServices'
import { IbookingRes } from '../../interfaces'
import FlightLandIcon from '@mui/icons-material/FlightLand';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';

import { useDispatch } from 'react-redux'
import { showAlert } from '../../redux/slices/alertSlice'

const MainContent: React.FC = () => {
  const [vehicles,setVehicles] = useState(0)
  const [packages,setPackages] = useState(0)
  const [drivers,setDrivers] = useState(0)
  const [users,setUsers] = useState(0)
  const [graph,setGraph] = useState<number[]>([])
  const [arrivals,setArrivals] = useState<IbookingRes[]>([])
  const dispatch = useDispatch()
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Sales',
        data:graph,
        
        backgroundColor: '',
        borderColor: 'blue',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      
      }
    },
  };
  const navigate = useNavigate()
  function formatTimeWithAmPm(time:any) {
    const [hour, minute] = time.split(':').map(Number);
    const amPm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12; // Convert hour to 12-hour format
    return `${formattedHour}:${minute < 10 ? '0' + minute : minute} ${amPm}`;
  }
  
  const getCompletedBookingsPerMonth = (bookingsData: IbookingRes[]): number[] => {
    const bookingsMonth = bookingsData.filter((item) => item.status === 'Active' || item.status === 'Completed');
    
    const monthlyCounts = new Array(12).fill(0);
    
    bookingsMonth.forEach((booking) => {
      const date = new Date(booking.period.date);
      const month = date.getMonth(); 
      monthlyCounts[month]++;
    });
    
    return monthlyCounts;
  };
  useEffect(()=>{
    verifyAdminToken(navigate)
    const fetch = async ()=>{
      try{
      const vehicle = await getVehicles()
      const driver = await getDrivers()
      const user = await getUsers()
      const Package = await getPackages()
      const bookings = await getBookings()
      setVehicles(vehicle.data.data.length)
      setPackages(Package.data.data.length)
      setDrivers(driver.data.data.length)
      setUsers(user.data.users.length)
      const bookingsData:IbookingRes[] = bookings.data.data
      const bookingsMonth = getCompletedBookingsPerMonth(bookingsData)
      setGraph(bookingsMonth)
      const today = new Date().toISOString().split('T')[0];

const bookingsToday = bookingsData.filter(booking => {
  const bookingDate = new Date(booking.period.date).toISOString().split('T')[0];
  return bookingDate === today;
});
      console.log(bookingsToday,'arivvalsss');
      
      setArrivals(bookingsToday)
}catch(err:any){
  if(err){
    if(err.message){
      dispatch(showAlert({color:"red",content:err.message}))
    }
    console.log(err);
    
  }  
}
    }

    fetch()
  },[])
 
  const formatDate = () => {
    const options:any = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString(undefined, options);
  };
  return (
    <>
      <Sidebar dash={'true'} />
    <div className="bg-gray-700-50/50">
      <div className="p-4 xl:ml-80">
        <AdminNavbar />
        <div className="mt-12 ">
        <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
            <DirectionsCarIcon/>
            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-sm leading-normal kanit-regular font-normal text-blue-gray-600">Total Vehicles</p>
              <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">{vehicles}</h4>
            </div>
            <div className="border-t border-blue-gray-50 p-4">
              <p className="block antialiased kanit-regular text-base leading-relaxed font-normal text-blue-gray-600">
                <strong className="text-blue-600">78%</strong>&nbsp;of Bookings
              </p>
            </div>
          </div>
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-orange-600 to-orange-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
              <TourIcon/>
            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-sm leading-normal kanit-regular text-blue-gray-600">Total Packages</p>
              <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">{packages}</h4>
            </div>
            <div className="border-t border-blue-gray-50 p-4">
              <p className="block antialiased kanit-regular text-base leading-relaxed font-normal text-blue-gray-600">
                <strong className="text-orange-600">12%</strong>&nbsp; of Bookings
              </p>
            </div>
          </div>

          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-green to-emerald-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
            <SensorOccupiedSharpIcon/>

            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-sm leading-normal kanit-regular font-normal text-blue-gray-600">Total Drivers</p>
              <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">{drivers}</h4>
            </div>
            <div className="border-t border-blue-gray-50 p-4">
              <p className="block antialiased kanit-regular text-base leading-relaxed font-normal text-blue-gray-600">
                <strong className="text-green">100%</strong>&nbsp;this month
              </p>
            </div>
          </div>

          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-red-600 to-red-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
            <GroupIcon/>

            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-sm leading-normal kanit-regular text-blue-gray-600">Total Users</p>
              <h4 className="block antialiased tracking-normal font-sans text-2xl kanit-regular font-semibold leading-snug text-blue-gray-900">{users}</h4>
            </div>
            <div className="border-t border-blue-gray-50 p-4">
              <p className="block antialiased kanit-regular text-base leading-relaxed font-normal text-blue-gray-600">
                <strong className="text-red-600 ">30%</strong>&nbsp;of users this month
              </p>
            </div>
          </div>

        </div>
      </div>

      <div className='h-auto grid grid-cols-2 p-2 gap-2 w-full shadow border drop-shadow-lg '>
        <span className='col-span-2 flex flex-col items-center bg-custom h-80 '>
          <div className='kanit-light text-xl text-white '>
           {/* Today's Trips - {formatDate()} */}
          </div>
          <div className='h-full w-full overflow-auto'>
        {arrivals && arrivals[0] ?(
        arrivals.map((arrival, index) => (
          <div key={index} className='h-16 grid grid-cols-6 border-b m-2 p-2'>    
          <span className='col-span-1 text-lg mx-auto kanit-regular text-white'>
            {arrival.from.name || arrival.from.city} <CompareArrowsIcon className='text-green'/> {arrival.to.name || arrival.to.city}
          </span>
          <span className='col-span-1 text-lg mx-auto kanit-regular text-white'>
            <span className='bg-white rounded text-black px-2'>{arrival.pickupDetails.bookingName}</span>
          </span>
          <span className='col-span-1 text-lg mx-auto kanit-regular text-yellow-400'>
            {arrival.vehicle.vehicleName}
          </span>
          <span className='col-span-1  justify-between text-lg mx-auto kanit-regular text-white'>
        {  formatTimeWithAmPm(arrival.period.time)}


          </span>
          <span className='col-span-1 text-lg mx-auto kanit-regular text-white'>
            ₹ {arrival.totalPrice} /-
          </span>
          <span className='col-span-1 text-lg mx-auto kanit-regular text-white'>
           <button className='px-2 py-1 bg-gradient-to-br from-orange-600 to-orange-400 text-white kanit-light text-sm rounded'>view details</button>
          </span>
          </div>
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

      <div className='h-auto  grid grid-cols-2  '>
      <span className='col-span-1'>
      <div className='w-full' style={{ position: 'relative', height: '100%' }}>
          {/* <Bar data={data} options={options} /> */}
        <Chart data={data}  type='line' options={options} />
        </div>
      </span> 
      <span className='col-span-1 p-5'> 
      <div className='h-full w-full shadow border rounded drop-shadow-sm'>

      </div>
       </span>
      </div>
      {/* <h1 className='text-center kanit-bold text-4xl'> Remaining are coming soon</h1> */}
      </div>


      


    </div>
    </>
  )
}

export default MainContent
