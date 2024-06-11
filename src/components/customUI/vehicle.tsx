import React, { useEffect } from 'react';
import {  IvehicleRes } from '../../interfaces';
import { useNavigate } from 'react-router-dom';
import VehicleCard from '../homePage/vehicleCard';
import Slider from 'react-slick';

interface Vehicle {
  vehicles:IvehicleRes[] | null
  loading:boolean
}


const VehiclesSection: React.FC<Vehicle> = ({vehicles,loading}) => {
const navigate = useNavigate()

useEffect(()=>{
  console.log(vehicles + '....')
},[])
  const handleClick = (id:number)=>{
    navigate(`/vehicle?id=${id}`)
  }
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, 
    slidesToScroll: 1,
    autoplay: true, 
        autoplaySpeed: 3000,
        
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 2, 
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  

  return (
    <div className="container-fluid bg-gray-200 mx-auto py-8 px-6 flex flex-col items-center justify-between mt-5 ">
<div className="text-center mb-8">
  <h2 className="text-3xl font-semibold text-gray-800 relative inline-block">
    <span className=" px-4 kanit-reguular">Our Vehicles</span>
    
  </h2>
</div>
<div className="w-4/5 mt-5">
      {loading ? (
        <Slider {...settings}>
          {Array.from({ length: 3 }).map(() => (
            <div className='bg-red-400 h-full w-full' >

            </div>
            ))}
        </Slider>
      ) : (
        vehicles && vehicles.length > 0 ? (
          <Slider {...settings}>
            {vehicles.map((vehicle, index) => (
              <div key={index} className='p-4' onClick={() => handleClick(vehicle.id)}>
                <VehicleCard  handleClick={(id)=>handleClick(id)} vehicle={vehicle} />
              </div>
            ))}
          </Slider>
        ) : (
          <h1>No Vehicles</h1>
        )
      )}
    </div>

<button className="btn overflow-hidden relative w-64 bg-custom text-white py-4 px-4 rounded-xl font-bold uppercase -- before:block before:absolute before:h-full before:w-1/2 before:rounded-full before:bg-orange-400 before:top-0 before:left-1/4 before:transition-transform before:opacity-0 before:hover:opacity-100 hover:text-orange-200 hover:before:animate-ping transition-all duration-300 mt-10">
    <span className="relative">Show more</span>
  </button>

</div>
  );
}

export default VehiclesSection;
