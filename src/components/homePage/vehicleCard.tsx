import React from 'react'
import {  IvehicleRes } from '../../interfaces'
import CustomsButtons from '../customUI/customsButtons'
interface props{
    vehicle:IvehicleRes 
    handleClick:(id:number)=>void
}
const VehicleCard:React.FC<props> = ({vehicle,handleClick})=> {
 
  return (
    <div  className="relative overflow-hidden shadow-lg bg-white rounded-lg">
        <img onClick={() => handleClick(vehicle.id)} src={vehicle.images} alt={'hello'} className="object-contain" />
        <div className="absolute inset-0 flex flex-col justify-end p-4 bg-black bg-opacity-50">
          <p className={`lg:h-5 md:h-3 w-fit px-2  rounded-lg text-xs kanit-regular flex items-center justify-center text-white ${vehicle.isBlocked ? 'bg-red-600' : 'bg-green bg-opacity-90'} text-center`}>
            {vehicle.isBlocked ? 'Booked' : 'Available'}
          </p>
          <h1 onClick={() => handleClick(vehicle.id)} className=" lg:text-xl md:text-xl font-semibold text-white mb-1 kanit-bold">
            {vehicle.vehicleName}
          </h1>
          <p className="text-white mb-1 kanit-semibold">Premium {vehicle.seat} Seater {vehicle.type}</p>
          <p className="text-white text-sm kanit-light">{vehicle.desc}</p>
        <div className='mt-5'>
        <CustomsButtons image={vehicle.images}  secondFunction={()=>handleClick(vehicle.id)} first='View Image' second='View Details'/>
        </div>
        </div>
      </div>
  )
}

export default VehicleCard
