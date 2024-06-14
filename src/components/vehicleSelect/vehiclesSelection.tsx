import React, { useEffect, useState } from 'react'
import { IbookingAuth, IreviewRes, IvehicleRes } from '../../interfaces'
import { getBookingVehicles, getReviews } from '../../services/vehicleService'
import ModalImage from '../customUI/imageModal'
import { useSelector } from 'react-redux'
import { backBookingData, selectBookingData, setBookingData } from '../../redux/slices/bookingSice'
import DriverSelection from './driverSelection'
import { useDispatch } from 'react-redux'
import { showAlert } from '../../redux/slices/alertSlice'
import Review from '../customUI/reviewShow'

const VehicleSelection: React.FC = () => {
    const [vehicles, setVehicles] = useState<IvehicleRes[]>([])
    const [show, setShow] = useState(false)
    const [image, setImage] = useState('')
    const [driver,setDriver] = useState(false)
    const [reviews,setReveiws] = useState<IreviewRes[]>([])
    const booking:IbookingAuth = useSelector(selectBookingData)
    const dispatch = useDispatch()
    useEffect(() => {
        const fetch = async () => {
            try {
                let dates:any 
                const res1 = await getReviews();
                    
                    const reviews = res1.data.data.filter((item: IreviewRes) => item.vehicle === true);
                    setReveiws(reviews)
                    
                if(booking.type === 'one-way'){
                    dates = {startingDate:booking.period.date,endingDate:booking.period.date,type:booking.type}
                }else{
                    dates = {startingDate:booking.period.date,endingDate:booking.returnDate,type:booking.type}
                }
                const res = await getBookingVehicles(dates)
                const arr: [] = res.data.data.filter((item:IvehicleRes)=>item.seat >= (booking.person.adult + booking.person.child))
                
                setVehicles(arr)
            } catch (err:any) { 
                console.error('Error fetching data:', err);
                if(err.response.data){ 
                    dispatch(showAlert({content:err.response.data.message,color:'red'}))
                    return 
                }
                dispatch(showAlert({content:err.message,color:'red'}))

            }

        }
        fetch()

    }, [])
    const getDays = (startingDate:any,returnDate:any)=>{
        const timeDifference = returnDate - startingDate
            
        return  timeDifference / (1000 * 60 * 60 * 24); 
    }

    const handleSubmit = (item:IvehicleRes)=>{
        let price = 0
        if(booking.type === 'round-way' && booking.returnDate){
           const days =  getDays(booking.period.date,booking.returnDate)
           if((booking.distance/1000) < 100){
            price = ((Math.floor(booking.distance /1000))  * item.price + 100) * days 
           }else{
            price = Math.round((item.startingPrice + ((Math.floor(booking.distance /1000) )-100 )  * item.price + 100) * days )
           }
            price = (booking.distance/1000) < 100 ? ((Math.floor(booking.distance /1000))  * item.price + 100) * days : (item.startingPrice + ((Math.floor(booking.distance /1000) )-100 )  * item.price + 100) * days      
         }else{
            price = (booking.distance/1000) < 100 ? ((Math.floor(booking.distance /1000))  * item.price + 100)  : (item.startingPrice + ((Math.floor(booking.distance /1000) )-100 )  * item.price + 100)   
        }
        const data = {
            ...booking,
            vehicle:item._id,
            totalKm:Math.floor(booking.distance/1000) <100 ?Math.floor(booking.distance/1000):Math.floor(booking.distance/1000) *2,
            totalPrice:price
        }
        localStorage.setItem('booking',JSON.stringify(data))
        dispatch(setBookingData(data))
        
        setDriver(true)
    }
    const getRate = (data:IvehicleRes)=>{
       const rdata = reviews.filter((item)=>item.vehicleId._id === data._id)
        if (rdata.length === 0) {
            return 0;
        }

        const total = rdata.reduce((acc: number, review: IreviewRes) => acc + review.rating, 0);
        console.log(total, 'done');

        return Math.round(total / reviews.length)
        }

    
    return (
        <div className='bg-white h-auto  flex flex-col justify-center items-center'>
            <ModalImage closeModal={() => setShow(false)} open={show} image={image} />
            <DriverSelection open={driver} close={()=>setDriver(false)} /> 
            <div className='flex container mt-5 mb-5'>
                <button onClick={() => {
                    // localStorage.removeItem('booking')
                    dispatch(backBookingData())
                    
                }} className="  bg-red-500 kanit-regular w-fit  opacity-100 hover:opacity-100 text-white hover:text-gray-900 rounded-md px-10 py-2 ">
                    Back
                </button>

                <h1 className='kanit-regular text-xl text-custom mx-auto'>Choose your vehicles </h1>
            </div>

            <div className="bg-white h-fit container mx-auto overflow-y-auto shadow-sm rounded-2xl px-20 pt-10 pb-20 mt-4  flex flex-col ">
                {

                    vehicles && vehicles[0] ? (
                        vehicles.map((item, index) => ( 
                            <div key={index} className='mt-5 border rounded-lg border-custom lg:h-44 md:h-auto h-auto '>
                                <div className='h-2/6 hidden md: lg:hiddengrid lg:grid-cols-5  rounded-t-lg bg-custom'>
                                    <div className='col-span-1 flex justify-center items-center rounded-t-md '>
                                        <span className='text-white text-lg kanit-light text-start'>Vehicle </span>
                                    </div>
                                    <div className='col-span-1 flex justify-start items-center  '>
                                        <span className='text-white text-lg kanit-light text-center'>vehicle detail</span>
                                    </div>
                                    <div className='col-span-1 flex justify-start items-center  '>
                                        <span className='text-white text-lg kanit-light text-center'>Itinerary</span>
                                    </div>
                                    <div className='col-span-1 flex justify-start items-center  '>
                                        <span className='text-white text-lg kanit-light text-center'>Price</span>
                                    </div>
                                    <div className='col-span-1 flex justify-center items-center rounded-t-md '>
                                        <span className='text-white text-lg kanit-light text-center'>Book</span>
                                    </div>

                                </div>
                                <div className='h-auto grid md:grid-rows-5 grid-rows-5 lg:grid-cols-5 '>
                                    <div className='col-span-1 flex flex-col justify-evenly  items-center'>

                                        <p className='kanit-regular lg:text-xl md:text-md'>{item.vehicleName}</p>
                                        {/* <p className='kanit-regular text-red-600 underline text-md '>View Details</p> */}
                                        <Review rate={getRate(item)} totalStars={5} />
                                    </div>
                                    <div className='col-span-1 flex flex-col justify-evenly  lg:items-start md:items-center items-center'>

                                        <p className='kanit-regular lg:text-md md:text-sm'>{item.seat} seater {item.type}</p>
                                        <p className='kanit-regular lg:text-md md:text-sm'>{item.fuel} comfort vehicle</p>
                                        <button onClick={() => {
                                            setImage(item.images)
                                            setShow(true)
                                        }} className="  bg-yellow-500 kanit-light lg:text-sm md:text-xs w-fit  opacity-100 hover:opacity-100 text-white hover:text-gray-900 rounded lg:px-2 md:px-1 md:py-0 lg:py-1 px-1 py-1 mb-2 ">
                                            view image
                                        </button>
                                    </div>
                                    <div className='col-span-1 flex flex-col justify-evenly  lg:items-start md:items-center items-center'>

                                        <p className='kanit-regular lg:text-md md:text-sm'>From : {booking.from.name || booking.from.city }</p>
                                        <p className='kanit-regular lg:text-md md:text-sm'>To : {booking.to.name || booking.to.city }</p>
                                        <p className='kanit-regular lg:text-md md:text-sm'>distance : {booking.distance/1000} km</p>
                                    </div>
                                    <div className='col-span-1 flex flex-col justify-evenly md:items-center items-center lg:items-start'>
                                        {
                                            (booking.distance/1000 ) < 100 ?(
                                                <>
                                                <p className='kanit-regular lg:text-xl md:text-md text-blue-600'>Estimate Price : ₹ {((Math.floor(booking.distance /1000)    )  * item.price )<500 ? 500:((Math.floor(booking.distance /1000)    )  * item.price + 100 )}</p>
                                                <p className='kanit-regular lg:text-md md:text-sm '>Price /KM : ₹ {item.price} + <span className='text-sm kanit-regular text-red-950'>extra charge ₹100</span></p>
                                                <p className='kanit-regular lg:text-md md:text-sm '>Total KM : {Math.floor(booking.distance/1000) *2} km</p>
                                                </>
                                            ):(
                                                <>
                                                <p className='kanit-regular lg:text-xl md:text-md text-blue-600'>Estimate Price : ₹ {item.startingPrice + ((Math.floor(booking.distance /1000))-100 )  * item.price + 100}</p>
                                                <p className='kanit-regular lg:text-md md:text-sm '>Price details : ₹ {item.startingPrice} upto 100 km + <span className='text-sm kanit-regular text-orange-400'> ₹{item.price} extra / km</span></p>
                                                <p className='kanit-regular lg:text-md md:text-sm '>Total KM : {Math.floor(booking.distance/1000) } km</p>
                                                </>
                                            )
                                        }
                                       
                                    </div>
                                    <div className='col-span-1 flex flex-col justify-evenly  items-center'>

                            <button onClick={() => {
                                handleSubmit(item)
                                            
                                        }} className="  bg-blue-600 kanit-light md:text-xs lg:text-sm w-fit  opacity-100 hover:opacity-100 text-white hover:text-gray-900 rounded-md lg:px-10 md:px-5 px-5 lg:py-2 md:py-1  py-2mb-2 ">
                                            select vehicle
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p></p>
                    )
                }
            </div>
        </div>
    )
}

export default VehicleSelection
