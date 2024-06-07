import React, { useState } from 'react';
import {  IpackageBookingRes } from '../../interfaces';
import CancelBooking from './cancelBooking';
import CancelModal from '../customUI/cancelModal';
import { PackagebookingStatus } from '../../services/packageBooking';

interface row {
    cancel:()=>void
 data:IpackageBookingRes
 id:(id:any)=>void
 reload:()=>void
}

interface props {
 data:IpackageBookingRes[]
 reload:()=>void
}



const PackageTableRow: React.FC<row> = ({data,reload}) => {
  const handleCancel = async (id:any)=>{
    try{
         await PackagebookingStatus({id,status:'Cancelled'})
        reload()
    }catch(err){
        console.log(err);
        
    }
  }
  return (
      <>
      {/* <BookingDetails booking={data} showModal={open} close={()=>setOpen(false)}/> */}
      <tr className="hover:bg-gray-50 text-black kanit-regular">
        

        <td className="px-6 py-4">
          
            {new Date(data.period.date).toISOString().split('T')[0]}
          
        </td>
        <td className="px-6 py-4">
            <span className='bg-custom text-white px-2 rounded'>{data.package.title}</span>
          
        </td>
        <td className="px-6 py-4">{data.package.vehicle.vehicleName}</td>
        <td className="px-6 py-4 text-orange-600">₹ {data.package.total}</td>
        <td className="px-6 py-4">{`${data.period.time} - ${data.period.meridian}`}</td>
        
        <td className="px-6 py-4"> 
          <button  className='px-2 py-2 rounded text-white kanit-regular bg-gradient-to-br from-blue-800 to-blue-500' >
            View Details
          </button>
        </td>
        {
            data.status === 'Active' ? (
                <td className="px-6 py-4"> 
          <button  className='px-2 py-2 rounded text-white kanit-regular bg-gradient-to-br from-red-800 to-red-500'>
          <CancelModal itemName={data.package.title} onDelete={()=>handleCancel(data._id)}/>
          </button>
        </td>
            ):(
                <td className="px-6 py-4"> 
                <button  className={` px-2 py-2 rounded  kanit-regular  ${data.status==='Completed'?'border border-green text-green':''} ${data.status==='Cancelled' || data.status === 'Rejected'?'border border-red-500 text-red-600':''}  ${data.status==='Pending'?'border border-yellow-500 text-yellow-600':''} `}>
                  {data.status}
                </button>
              </td> 
            )
        }
        
      </tr>
      </>
    );
  };

const PackageTable: React.FC<props> = ({data,reload}) => {
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
              Package
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Vehicle
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Estimate Price
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Pickup Time
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
            <PackageTableRow reload={reload} id={(id:any)=>setId(id)} cancel={()=>setCancel(true)} key={index} data={item} />
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

export default PackageTable;
