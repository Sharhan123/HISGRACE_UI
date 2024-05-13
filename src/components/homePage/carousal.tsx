import React, { useState, useEffect } from 'react';
import { IpackageRes } from '../../interfaces';
import CustomsButtons from '../customUI/customsButtons';
import { Navigate, useNavigate } from 'react-router-dom';

interface Props {
  packages: IpackageRes[];
}

const ImageSlider: React.FC<Props> = ({ packages }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
const navigate = useNavigate()
  // Render nothing if packages array is empty or null
  if (!packages || packages.length === 0) {
    return null;
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === packages.length - 1 ? 0 : prevIndex + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? packages.length - 1 : prevIndex - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="max-w-2xl mx-auto ">
      <div className="relative" id="default-carousel">
        <div className="overflow-hidden   relative bg-custom h-56 rounded-lg sm:h-64 xl:h-80 2xl:h-96">
          {packages.map((item, index) => (
            <div key={index} className={`duration-500 h-full ease-in ${currentIndex === index ? 'block' : 'hidden'}`} data-carousel-item>
              {currentIndex === index && (
                <div style={{ backgroundImage: `url(${item.image})` }} className="bg-no-repeat flex flex-col justify-end items-start p-10 h-full transform text-center text-white">
                  <div className='text-start   '>
                  <h2 className="text-3xl drop-shadow-xl text-yellow-400 opacity-100 kanit-semibold ">{item.title}</h2>
                  <p className="mt-2 drop-shadow-xl opacity-100 kanit-regular" > {item.days} days & {item.days-1} nights</p>
                  <p className="mt-2 mb-2 opacity-100 drop-shadow-xl kanit-regular" >{item.location}</p>
                  <CustomsButtons first='View Image' image={item.image} second='view details' secondFunction={()=>navigate(`/packageDetails/${item._id}`)}/>
                </div>
                </div>
              )}  
            </div>
          ))}
        </div>
        {/* Slider indicators */}
        <div className="flex absolute bottom-5 left-1/2 z-30 space-x-3 -translate-x-1/2">
          {packages.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`w-3 h-3 rounded-full shadow-lg ${currentIndex === index ? 'bg-blue-500' : 'bg-gray-300'}`}
              aria-current={currentIndex === index ? 'true' : 'false'}
              aria-label={`Slide ${index + 1}`}
              onClick={() => setCurrentIndex(index)}
              data-carousel-slide-to={index}
            ></button>
          ))}
        </div>
        <button type="button" className="flex absolute top-0 left-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none" onClick={handlePrev} data-carousel-prev></button>
        <button type="button" className="flex absolute top-0 right-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none" onClick={handleNext} data-carousel-next></button>
      </div>
    </div>
  );
};

export default ImageSlider;
