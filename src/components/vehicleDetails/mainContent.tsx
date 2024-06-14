import React, { useEffect, useState } from 'react';
import './style.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { getReviews, getVehicles, setVehicleReview } from '../../services/vehicleService';
import { IreviewRes, IvehicleRes } from '../../interfaces';
import { FaClock, FaLeaf, FaSnowflake } from 'react-icons/fa';
import CustomsButtons from '../customUI/customsButtons';
import { showAlert } from '../../redux/slices/alertSlice';
import { useDispatch } from 'react-redux';
import Review from '../customUI/reviewShow';
import ReviewModal from '../customUI/reviewModal';

const MainContent: React.FC = () => {
    const [data, setData] = useState<IvehicleRes>()
    const [rate, setRate] = useState<number>(0)
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [review, setReview] = useState(false)
    const [reviewData, setReviewData] = useState<{
        driverId: any,
        vehicle: boolean,
        review: string,
        rating: number
        vehicleId: any
    }>({
        rating: 0,
        driverId: '',
        vehicle: true,
        review: '',
        vehicleId: ''
    })


    

    const handleReviewSubmit = async (rate: number, review: string) => {
        setReviewData(prev => ({ ...prev, rating: rate, review: review }))
        const data = { vehicle: true, review: review, rating: rate, vehicleId: reviewData.vehicleId }
        try {
            await setVehicleReview(data)
            setReview(false)
            setReviewData({
                rating: 0, vehicle: true, review: '', driverId: '', vehicleId: ''
            })
        } catch (err: any) {
            if (err.response.data.message) {
                dispatch(showAlert({ content: err.response.data.message, color: 'red' }))
                return
            }
            dispatch(showAlert({ content: err.message, color: 'red' }))

        }
    }
    useEffect(() => {
        const fetch = async () => {

            try {
                const vData = await getVehicles()
                const datas = [...vData.data.data]

                if (id) {

                    const unique = datas.filter((item: IvehicleRes) => item.id === parseFloat(id))
                    setData(unique[0])
                    const res = await getReviews();
                    
                    const reviews = res.data.data.filter((item: IreviewRes) => item.vehicle === true && item.vehicleId._id === unique[0]._id);

                    if (reviews.length === 0) {
                        return 0;
                    }

                    const total = reviews.reduce((acc: number, review: IreviewRes) => acc + review.rating, 0);
                    console.log(total, 'done');

                    setRate(Math.round(total / reviews.length))
                }

            } catch (err: any) {
                console.error('Error fetching data:', err);
                if (err.response.data) {
                    dispatch(showAlert({ content: err.response.data.message, color: 'red' }))
                    return
                }
                dispatch(showAlert({ content: err.message, color: 'red' }))

            }
        }


        fetch()


    }, [])

    return (
        <div >
            <ReviewModal showModal={review} close={() => setReview(false)} submit={(rate: number, review: string) => handleReviewSubmit(rate, review)} />
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
                                <CustomsButtons image={data ? data.images : ''} secondFunction={() => navigate('/services')} first='View Image' second='Book now' />
                            </div>

                            <div className=" mt-5 flex flex-col justify-between">
                                <p className='text-md mt-2 kanit-regular '>Fuel : <span className='text-yellow-400 opacity-100'>{data?.fuel}</span></p>
                                <p className='text-md mt-2 kanit-regular'>Seats :<span className='text-yellow-400 opacity-100'> {data?.seat}</span></p>
                                <p className='text-md mt-2 kanit-regular'>Starting 100 km : <span className='text-yellow-400 opacity-100'>₹ {data?.startingPrice} /-</span></p>
                                <p className='text-md mt-2 kanit-regular'>Price /km : <span className='text-yellow-400 opacity-100'>₹ {data?.price} /-</span></p>
                                <p className='text-md mt-5 kanit-regular text-orange-500'>Please Note  : <span className='text-white opacity-100'>  For the First 100 km the price will be  <span className='text-yellow-400 opacity-100'>₹ {data?.startingPrice} /-</span> and for additional each km it will be charged <span className='text-yellow-400 opacity-100'>₹ {data?.price} /-</span> .</span></p>

                            </div>
                            <div className='flex justify-between items-center'>

                                <Review rate={rate} totalStars={5} />
                                <button
                                    onClick={() => {
                                        setReview(true)
                                        setReviewData(prev => ({ ...prev, vehicleId: data?._id }))
                                    }}
                                    className='px-2 py-1 bg-green text-sm rounded-sm ro kanit-regular'>Review Vehicle</button>
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
