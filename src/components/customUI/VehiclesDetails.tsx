import React from 'react';
import './style.css'
import { IpackageRes } from '../../interfaces';
import { useNavigate } from 'react-router-dom';

interface props {
vehicle:IpackageRes
}

const VehiclesDetails:React.FC<props> =({vehicle})=>{
  const navigate = useNavigate()
  
  return (
    // <div className="flex h-screen items-center justify-center ">
    <div className="bg-custom  rounded-xl shadow-md flex flex-col items-center   lg:flex-row kanit-regular">
      
      <div className="p-6  -mt-2 lg:mt-0 lg:mr-5 ">
      <div className=" flex-none w-52 h-52  xl:w-60 xl:h-60  self-center  lg:-mr-1">
        <img
          src={vehicle.image}
          alt=""
          className=" inset-0 w-full h-full object-cover rounded-md shadow shadow-black"
          loading="lazy"
        />
      </div>
      
      </div>
      <div className='lg:mt-0 lg:mr-5'>

      
        <div className="flex flex-col w-full">
          <h1 className="flex-auto text-lg  xl:text-xl font-semibold text-white">
           {vehicle.title}
          </h1>
          <div className="self-start text-sm xl:text-md font-semibold text-yellow-400 opacity-100">
            {vehicle.days} days and {vehicle.days-1} nights
          </div>
        </div>
        <div className="flex  items-baseline mt-2  pb-2 xl:pb-6  border-b border-slate-200">
          <div title={vehicle?.location} className=" max-w-64 lg:max-w-80  flex-none text-xs xl:text-sm font-medium text-white mt-2 " >
    {vehicle.location.length < 42?vehicle.location:vehicle.location.slice(0,40)}..
  
          </div>
          
        </div>
        <div className="flex space-x-4 mb-6 text-sm mt-5 font-medium">
          <div className="flex-auto flex space-x-4 ">
            {/* Change "Add to cart" button to "View details" button */}
            <button onClick={()=>navigate(`/packageDetails/${vehicle._id}`)} className="bg-white h-10 px-6 font-semibold rounded-md border border-black-800 text-black" type="button">
              View details
            </button>
          </div>
          <button className="flex-none flex items-center justify-center w-9 h-9 rounded-md text-slate-300 border border-black" type="button" aria-label="Favorites">
            <svg width="20" height="20" fill="red" aria-hidden="true">
              <path fillRule="evenodd" clipRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
            </svg>
          </button>
        </div>
        </div>
    </div>
  
   );
}

export default VehiclesDetails;
