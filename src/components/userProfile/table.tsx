import React, { useState } from 'react';
import { IbookingRes } from '../../interfaces';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import CancelBooking from './cancelBooking';
import BookingDetails from '../customUI/bookingDetails';

interface row {
    cancel:()=>void
 data:IbookingRes
 id:(id:any)=>void
}

interface props {
 data:IbookingRes[]
 reload:()=>void
}



const EmployeeTableRow: React.FC<row> = ({data,cancel,id}) => {
  const [open,setOpen] = useState(false)  
  
  return (
      <>
      <BookingDetails booking={data} showModal={open} close={()=>setOpen(false)}/>
      <tr className="hover:bg-gray-50 text-black kanit-regular">
        

        <td className="px-6 py-4">
          
            {new Date(data.period.date).toISOString().split('T')[0]}
          
        </td>
        <td className="px-6 py-4">
            <span className='bg-custom text-white px-2 rounded'>{data.from.name || data.from.city}<CompareArrowsIcon className='text-green mr-2 ml-2' /> {data.to.name || data.to.city}</span>
          
        </td>
        <td className="px-6 py-4">{data.vehicle.vehicleName}</td>
        <td className="px-6 py-4 text-orange-600">₹ {data.totalPrice}</td>
        <td className="px-6 py-4">{data.type}</td>
        
        <td className="px-6 py-4"> 
          <button onClick={()=>setOpen(true)} className='px-2 py-2 rounded text-white kanit-regular bg-gradient-to-br from-blue-800 to-blue-500' >
            View Details
          </button>
        </td>
        {
            data.status === 'Active' ? (
                <td className="px-6 py-4"> 
          <button onClick={()=>{
            cancel()
            id(data._id)
            }} className='px-2 py-2 rounded text-white kanit-regular bg-gradient-to-br from-red-800 to-red-500'>
            Cancel Booking
          </button>
        </td>
            ):(
                <td className="px-6 py-4"> 
                <button  className={` px-2 py-2 rounded text-white kanit-regular bg-gradient-to-br ${data.status==='Completed'?'from-green to-emerald-500':''} ${data.status==='Cancelled'?'from-red-800 to-red-500':''} ${data.status==='pending'?'from-yellow-600 to-yellow-400':''} `}>
                  {data.status}
                </button>
              </td> 
            )
        }
        
      </tr>
      </>
    );
  };

const EmployeeTable: React.FC<props> = ({data,reload}) => {
    const [cancel,setCancel] = useState(false)
    const [id,setId] = useState('') 

  return (
    <div className=" overflow-hidden rounded-lg w-full  border-gray-200 shadow-md m-5">
        <CancelBooking reload={reload} item={id} close={()=>setCancel(false)}  open={cancel} />
                
      <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Date
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Location
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Vehicle
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Estimate Price
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Type
            </th>
            <th scope="col" colSpan={2} className="text-center px-6 py-4 font-medium text-gray-900">
                Actions
            </th>
            {/* <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                
            </th> */}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
        {data && data.length > 0 ?( data.map((item, index) => (
            <EmployeeTableRow  id={(id:any)=>setId(id)} cancel={()=>setCancel(true)} key={index} data={item} />
        )))
        
          :(
            <tr className='text-center'>
                <td colSpan={8} className='text-xl kanit-regular text-black py-5'>No Bookings</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
