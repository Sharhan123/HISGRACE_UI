import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getVehicles } from '../../services/vehicleService';
import { IpackageRes } from '../../interfaces';
import { FaClock, FaLeaf, FaSnowflake } from 'react-icons/fa';
import { getPackages } from '../../services/packageService';
import CustomsButtons from '../customUI/customsButtons';
import { setPackage } from '../../redux/slices/packageBookingSlice';
import { useDispatch } from 'react-redux';
import DateSelection from '../packageBooking/DateSelection';

const MainContent: React.FC = () => {
    const [data, setData] = useState<IpackageRes>()
    const [selectDate,setSelectDate] = useState(false)
    //     const location = useLocation();
    //   const searchParams = new URLSearchParams(location.search);
    //   const id = searchParams.get('id')
    const { id } = useParams()
    useEffect(() => {
        const fetch = async () => {

            try {
                const vData = await getPackages()



                const datas = [...vData.data.data]

                if (id) {

                    const unique = datas.filter((item: any) => item._id == id
                    )
                    console.log(unique);
                    setData(unique[0])
                }

            } catch (err) {
                console.log(err);

            }
        }
        fetch()


    }, [id])
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handlePackage = ()=>{
        setSelectDate(true)
        }
        const confirmBooking = (date:any)=>{
            const changeData = {
                ...date,
                package:data?._id
            }
            localStorage.setItem('package',JSON.stringify(changeData))
            dispatch(setPackage(changeData))
            navigate('/packageBooking')
        }
    return (
        <div >
            <DateSelection confirm={(data:any)=>confirmBooking(data)} close={()=>setSelectDate(false)} open={selectDate}/>
            <div className="w-full max-w-5xl mt-10 rounded-3xl  bg-custom \ shadow-2xl   p-10 lg:p-20 mx-auto text-gray-800 relative md:text-left">
                <div className="md:flex items-center -mx-10">
                    <div className="w-full  md:w-1/2 px-10 mb-10 md:mb-0">
                        <div className="relative">
                            <img
                                src={data?.image}
                                className="w-full relative z-10 rounded-2xl"
                                alt=""
                            />
                            <div className="border-4 border-yellow-200 absolute top-10 bottom-10 left-10 right-10 z-0"></div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 px-10 ">
                        <div className="mb-10 text-white">
                            <h1 className="font-bold uppercase text-2xl mb-5 kanit-bold">{data?.title} <br /><span className='text-xl text-yellow-400 opacity-100 kanit-semibold '> {data?.location}</span></h1>
                            <p className="text-md kanit-regular">
                                {data?.desc}.

                            </p>
                            <div className="mt-5  flex justify-start items-start">
                                <CustomsButtons first='View Image' secondFunction={() => handlePackage()} second='Book Now' image={data ? data.image : ''} />
                            </div>

                            <div className=" mt-5 flex flex-col justify-between">
                                <p className='text-md mt-2 kanit-regular '>Vehicle : <span className='text-yellow-400 opacity-100'>{data?.vehicle.vehicleName}</span></p>
                                <p className='text-md mt-2 kanit-regular'>Days :<span className='text-yellow-400 opacity-100'> {data?.days} days and {data ? data.days - 1 : ''}nights  </span></p>
                                <p className='text-md mt-2 kanit-regular'>Price /Day : <span className='text-yellow-400 opacity-100'>₹ {data?.perDay} /-</span></p>
                                <p className='text-md mt-2 kanit-regular'>Total Price : <span className='text-yellow-400 opacity-100'>₹ {data?.total} /-</span></p>
                                {/* <p className='text-md mt-5 kanit-regular text-orange-500'>Please Note  : <span className='text-white opacity-100'>  For the First 100 km the price will be  <span className='text-yellow-400 opacity-100'>₹ {data?.startingPrice} /-</span> and for additional each km it will be charged <span className='text-yellow-400 opacity-100'>₹ {data?.price} /-</span> .</span></p> */}

                            </div>
                        </div>

                        {/* <div className='mt-10 flex justify-evenly'>
                            <FaClock color='red'size={30} /> 
                            <FaLeaf color='green' size={30} />
                            <FaSnowflake color='skyblue' size={30} />
                        </div> */}
                    </div>
                </div>
            </div>
            {/* <VehiclesSection count={4} /> */}
        </div>




    );
};

export default MainContent;
