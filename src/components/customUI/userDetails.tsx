import React from 'react'
import {  IuserRes } from '../../interfaces'
interface props{
showModal:boolean
close:()=>void
user:IuserRes
}

const UserDetails:React.FC<props> = ({showModal,close,user})=>{
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
 
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/5 " onClick={close}>
              <div className="bg-white grid grid-rows-3  h-auto rounded-lg p-6 w-5/6">
                <h1 className='text-md kanit-regular'>
                    User Details
                </h1>
                <span className='row-span-1 h-16 grid grid-cols-6' >
                    <div className='col-span-1 text-md mx-auto text-black kanit-regular'>
                        {user.name}
                    </div>
                    <div className='col-span-2 text-md mx-auto text-black kanit-regular'>
                        <span className='bg-custom rounded px-2 py-1 text-sm text-white kanit-regular'>{user.email}</span>
                    </div>
                    <div className='col-span-1 text-md mx-auto text-black kanit-regular'>
                        <span className='bg-gray-300   border rounded px-2 py-1  text-sm text-custom kanit-regular'>{user.mobile?user.mobile:'Not Updated'}</span>
                    </div>
                    <div className='col-span-1 mx-auto text-md text-black kanit-light'>
                    <span className={`px-2 rounded text-md text-white ${user.isBlocked?'bg-red-600':'bg-blue-600'}`}>{user.isBlocked?'Blocked':'Active'}</span>
                    </div>
                    <div className='col-span-1 mx-auto text-md text-orange-500 kanit-regular'>
                     {user.language?user.language:"Not Updated"} 
                    </div>

                </span>
                <h1 className='text-md kanit-regular'>
                    Personal Details
                </h1>
                <span className='row-span-1 grid grid-cols-2'>

                <span className='col-span-1  h-auto flex flex-col ' >
                        
                   <span className='text-md kanit-regular text-black'> Gender : {user.gender?user.gender:'Not Updated'}</span>
                   <span className='text-md kanit-regular text-black'> Age : {user.age?user.age:'Not Updated'}</span>
                   <span className='text-md kanit-regular text-black'> Lastseen : {formatDate(user.lastseen,'')}</span>  
                </span>
                
                </span>
                </div>
                </div>
    ) 
    }
    </>
  )
}

export default UserDetails
