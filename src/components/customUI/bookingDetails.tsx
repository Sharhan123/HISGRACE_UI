import React, { useState } from 'react'
import { IbookingRes } from '../../interfaces'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
interface props{
showModal:boolean
close:()=>void
booking:IbookingRes
}

const BookingDetails:React.FC<props> = ({showModal,close,booking})=>{
    // const [showModal,setShowModal] = useState(false)
    const formatDate = (dateString:any, timeString:any) => {
        const date = new Date(dateString);
        const timeParts = timeString.split(':');
        let hours = parseInt(timeParts[0], 10);
        const minutes = timeParts[1];
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12; // Convert to 12-hour format
        const formattedTime = `${hours}:${minutes} ${ampm}`;
        return `${date.toISOString().split('T')[0]} - ${formattedTime}`;
      };
      
  return (
    <>
    {
       showModal && (
 
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30" onClick={close}>
              <div className="bg-white grid grid-rows-3  h-auto rounded-lg p-6 w-5/6">
                <h1 className='text-md kanit-regular'>
                    Booking Details
                </h1>
                <span className='row-span-1 h-16 grid grid-cols-6' >
                    <div className='col-span-1 text-md mx-auto text-black kanit-regular'>
                        {booking.pickupDetails.bookingName}
                    </div>
                    <div className='col-span-2 text-md mx-auto text-black kanit-regular'>
                        <span className='bg-custom rounded px-2 py-1 text-sm text-white kanit-regular'>{booking.from.name || booking.from.city} <SwapHorizIcon className='text-green'/>{booking.to.name || booking.to.city}</span>
                    </div>
                    <div className='col-span-1 text-md mx-auto text-black kanit-regular'>
                        <span className='bg-gray-300   border rounded px-2 py-1  text-sm text-custom kanit-regular'>{formatDate(booking.period.date,booking.period.time)}</span>
                    </div>
                    <div className='col-span-1 mx-auto text-md text-black kanit-regular'>
                    {booking.totalKm} KM
                    </div>
                    <div className='col-span-1 mx-auto text-md text-orange-500 kanit-regular'>
                    ₹ {booking.totalPrice} /-
                    </div>

                </span>
                <span className='row-span-1 h-16 grid grid-cols-6' >
                    <div className='col-span-1 text-md mx-auto text-black kanit-regular'>
                 <span className='bg-gray-200/75 px-2 rounded'>{booking.vehicle.vehicleName}</span>
                    </div>
                    <div className='col-span-2 text-md mx-auto text-black kanit-regular'>
                    Driver : <span className='px-2 bg-gray-200/75  rounded'>{booking.driver.driverName}</span>
                    </div>
                    <div className='col-span-1 text-md mx-auto text-black kanit-regular'>
                        Trip : {booking.type}
                                            </div>
                    <div className='col-span-1 mx-auto text-md text-black kanit-regular'>
                    adult : {booking.person.adult}
                    </div>
                    <div className='col-span-1 mx-auto text-md text-black kanit-regular'>
                    child : {booking.person.child}
                    </div>
                    

                </span>
                <h1 className='text-md kanit-regular'>
                    Pickup Details
                </h1> 
                <span className='row-span-1 grid grid-cols-2'>

                <span className='col-span-1 mt-3 h-auto flex flex-col ' >
                        
                   <span className='text-md kanit-regular text-black'> Booking Name : {booking.pickupDetails.bookingName}</span>
                   <span className='text-md kanit-regular text-black'> Mobile Number : {booking.pickupDetails.mobile}</span>
                   <span className='text-md kanit-regular text-black'> Email Address : {booking.pickupDetails.email}</span>
                    

                    <span className='text-md kanit-regular text-black'> City : {booking.pickupDetails.bookingName}</span>
                    <span className='text-md kanit-regular text-black'> State : {booking.pickupDetails.state}</span>
                    <span className='text-md kanit-regular text-black'> Pincode : {booking.pickupDetails.postCode}</span>
                    <span className='text-md kanit-regular text-black '> Address : {booking.pickupDetails.address}</span>
                
                
                </span>
                <span className='col-span-1 mt-3 h-auto flex flex-col ' >
                        
                   <span className='text-md kanit-regular  text-black'> <span className='bg-red-500 rounded px-2 text-white'>Trip type : {booking.type}</span></span>
                   {booking.type === 'round-way'&&(<span className='bg-gray-300   border rounded px-2 py-1  text-sm text-custom kanit-regular'>{formatDate(booking.returnDate,'')}</span>
)}
                    

                    
                
                
                </span>
                </span>
                </div>
                </div>
    ) 
    }
    </>
  )
}

export default BookingDetails
