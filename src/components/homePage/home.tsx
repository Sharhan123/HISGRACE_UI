import React, { useEffect, useState } from 'react'
import './style.css'
import VehiclesSection from '../customUI/vehicle';
import banner from '../../assets/banner.jpg'
import Footer from '../customUI/Footer';
import { getPackages } from '../../services/packageService';
import { IpackageRes, IvehicleRes } from '../../interfaces';
import Alert from '../customUI/alert';
import PackagesCard from './packagesCard';
import { getVehicles } from '../../services/vehicleService';
import ImageSlider from './carousal';
import { showAlert } from '../../redux/slices/alertSlice';
import { useDispatch } from 'react-redux';
const Home: React.FC = () => {
  const [packages, setPackages] = useState<IpackageRes[]>([])
  const [vehicles, setVehicles] = useState<IvehicleRes[] | null>([])
  const [loader, setLoader] = useState(true)
  const dispatch = useDispatch()
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getPackages()
        const response = await getVehicles()
        setPackages(res.data.data)
        setVehicles(response.data.data)
      } catch (err:any) { 
        console.error('Error fetching data:', err);
        if(err.response.data){ 
            dispatch(showAlert({content:err.response.data.message,color:'red'}))
            return 
        }
        dispatch(showAlert({content:err.message,color:'red'}))

    }
      finally {
        setTimeout(() => {

          setLoader(false)
        }, 1500)
        
        
      }
    }

     fetch()
     console.log(packages,vehicles,'...');
     

  }, [])




  return (
    <>

      {/* <MainLoader open={loader} /> */}
      <div className='h-screen  lg:w-full md:w-full  ' >

        <Alert />
        <div className="w-screen lg:h-4/6 md:h-4/6 h-2/6 overflow-hidden relative before:block before:absolute before:bg-black/100 before:h-full before:w-full before:top-0 before:opacity-35 before:z-10 before:left-0 ">
          <img src={banner} className="absolute top-0 left-0 min-h-full w-full o" alt="" />
          <div className="relative  z-20 container items-center mx-auto grid grid-cols-12 h-full ">
            <div className="col-span-12  ml-2 lg:col-span-6  md:col-span-6">
              {/* <span className="uppercase text-white  text-sm kanit-medium  mb-2 block">WE ARE EXPERTS</span> */}
              <h1  className="text-white oswald  leading-loose mb-5  text-xl lg:text-4xl ">Hisgrace make your journey extra ordinary and valuable Book your slot now.</h1>
              <button className="mt-5 text-white uppercase lg:py-2 py-2 kanit-regular text-xs lg:text-lg  lg:px-5 px-3 bg-blue-600 rounded  hover:bg-white hover:bg-opacity-10">Get started</button>
              {/* <p className="text-white kanit-medium text-md">
                
              </p> */}
            </div>
            <div className='col-span-6 lg:block md:block hidden'>

            {packages && packages.length > 0 && <ImageSlider packages={packages} />}
              
            </div>
          </div>

        </div>
        {/* <OnewayCard /> */}





        <div className=" mx-auto mt-4 	 text-white py-4 px-6 flex justify-between items-center">

          <h1 className="text-lg text-black font-semibold">Exclusive <span className='text-red-500'>Packages</span></h1>

          <nav>
            <ul className="flex space-x-6 text-black">
              <li>
                <a href="#" className="flex items-center underline underline-offset-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">

                  </svg>
                  Sedan
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center underline underline-offset-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">

                  </svg>

                  SUV
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center underline underline-offset-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">

                  </svg>
                  Van
                </a>
              </li>
            </ul>
          </nav>

          <a href="/packages" className="text-red-500 underline">View All Packages</a>
        </div>
        <PackagesCard loading={loader} packages={packages} />
        <VehiclesSection loading={loader} vehicles={vehicles} />
        <Footer />
      </div>
    </>

  )
}

export default Home