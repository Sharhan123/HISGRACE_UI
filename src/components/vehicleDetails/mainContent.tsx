import React, { useEffect, useState } from 'react';
import './style.css'
import VehiclesSection from '../customUI/vehicle';
import { useLocation } from 'react-router-dom';
import { getVehicles } from '../../services/vehicleService';
import { IvehicleRes } from '../../interfaces';
import { FaClock, FaLeaf, FaSnowflake } from 'react-icons/fa';
import CustomsButtons from '../customUI/customsButtons';

const MainContent: React.FC = () => {
    const [data, setData] = useState<IvehicleRes>()
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id')
    useEffect(() => {
        const fetch = async () => {

            try {
                const vData = await getVehicles()
                const datas = [...vData.data.data]

                if (id) {

                    const unique = datas.filter((item: any) => item.id === parseFloat(id))
                    console.log(unique);
                    setData(unique[0])
                }

            } catch (err) {
                console.log(err);

            }
        }
        fetch()


    }, [id])
    return (
        <div >
            <div className="w-full max-w-5xl mt-10 rounded-3xl  bg-custom \ shadow-2xl   p-10 lg:p-20 mx-auto text-gray-800 relative md:text-left">
                <div className="md:flex items-center -mx-10">
                    <div className="w-full md:w-1/2 px-10 mb-10 md:mb-0">
                        <div className="relative">
                            <img
                                src={data?.images}
                                className="w-full relative z-10 rounded-3xl"
                                alt=""
                            />
                            <div className="border-4 border-yellow-200 absolute top-10 bottom-10 left-10 right-10 z-0"></div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 px-10 ">
                        <div className="mb-10 text-white">
                            <div className='w-full flex justify-end'>

                                <p className={`h-5 w-20 rounded-lg text-xs kanit-regular  flex items-center justify-center text-white ${data?.isBlocked ? 'bg-red-600' : 'bg-green bg-opacity-90'} text-center`} >{data?.isBlocked ? 'Booked' : 'Available'}</p>
                            </div>

                            <h1 className="font-bold uppercase text-2xl mb-5 kanit-bold">{data?.vehicleName} <br /><span className='text-xl text-yellow-400 opacity-100 kanit-semibold '>Premium {data?.seat} seater sedan</span></h1>
                            <p className="text-md kanit-regular">
                                {data?.desc}

                            </p>
                            <div className="mt-5 ">
                                <CustomsButtons image={data ? data.images : ''} secondFunction={() => ''} first='View Image' second='Book now' />
                            </div>

                            <div className=" mt-5 flex flex-col justify-between">
                                <p className='text-md mt-2 kanit-regular '>Fuel : <span className='text-yellow-400 opacity-100'>{data?.fuel}</span></p>
                                <p className='text-md mt-2 kanit-regular'>Seats :<span className='text-yellow-400 opacity-100'> {data?.seat}</span></p>
                                <p className='text-md mt-2 kanit-regular'>Starting 100 km : <span className='text-yellow-400 opacity-100'>₹ {data?.startingPrice} /-</span></p>
                                <p className='text-md mt-2 kanit-regular'>Price /km : <span className='text-yellow-400 opacity-100'>₹ {data?.price} /-</span></p>
                                <p className='text-md mt-5 kanit-regular text-orange-500'>Please Note  : <span className='text-white opacity-100'>  For the First 100 km the price will be  <span className='text-yellow-400 opacity-100'>₹ {data?.startingPrice} /-</span> and for additional each km it will be charged <span className='text-yellow-400 opacity-100'>₹ {data?.price} /-</span> .</span></p>

                            </div>
                        </div>

                        <div className='mt-10 flex justify-evenly'>
                            <FaClock color='red' size={30} />
                            <FaLeaf color='green' size={30} />
                            <FaSnowflake color='skyblue' size={30} />
                        </div>
                    </div>
                </div>
            </div>
            {/* <VehiclesSection count={4} /> */}
        </div>




    );
};

export default MainContent;
