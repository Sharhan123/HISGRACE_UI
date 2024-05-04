import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IbookingAuth, IvehicleRes } from '../../interfaces'
import { getVehicles } from '../../services/vehicleService'
import ModalImage from '../customUI/imageModal'
import { useSelector } from 'react-redux'
import { selectBookingData, setBookingData } from '../../redux/slices/bookingSice'
import DriverSelection from './driverSelection'
import { useDispatch } from 'react-redux'

const VehicleSelection: React.FC = () => {
    const [vehicles, setVehicles] = useState<IvehicleRes[]>([])
    const [show, setShow] = useState(false)
    const [image, setImage] = useState('')
    const [driver,setDriver] = useState(false)
    const navigate = useNavigate()
    const booking:IbookingAuth = useSelector(selectBookingData)
    const dispatch = useDispatch()
    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await getVehicles()
                const arr: [] = res.data.data
                setVehicles(res.data.data)
            } catch (err) {
                console.log(err);
            }

        }
        fetch()

    }, [])

    const handleSubmit = (item:IvehicleRes)=>{
        let price = 0
        if((booking.distance/1000) < 100){
            const temp = (Math.floor(booking.distance /1000))  * item.price + 100
            if(temp <500){
                price = 500
            }else{
                price = temp
            }
        }else{
            price = item.startingPrice + ((Math.floor(booking.distance /1000))-100 )  * item.price + 100
        }
        const data = {
            ...booking,
            vehicle:item._id,
            totalKm:Math.floor(booking.distance/1000) <100 ?Math.floor(booking.distance/1000):Math.floor(booking.distance/1000) *2,
            totalPrice:(booking.distance/1000) < 100 ? (Math.floor(booking.distance /1000))  * item.price + 100 : item.startingPrice + ((Math.floor(booking.distance /1000) )-100 )  * item.price + 100
        }
        localStorage.setItem('booking',JSON.stringify(data))
        dispatch(setBookingData(data))
        
        setDriver(true)
    }
    return (
        <div className='bg-white h-auto  flex flex-col justify-center items-center'>
            <ModalImage closeModal={() => setShow(false)} open={show} image={image} />
            <DriverSelection open={driver} close={()=>setDriver(false)} /> 
            <div className='flex container mt-5 mb-5'>
                <button onClick={() => {
                    localStorage.removeItem('booking')
                    dispatch(setBookingData(null))
                    
                }} className="  bg-red-500 kanit-regular w-fit  opacity-100 hover:opacity-100 text-white hover:text-gray-900 rounded-md px-10 py-2 ">
                    Back
                </button>

                <h1 className='kanit-regular text-xl text-custom mx-auto'>Choose your vehicles </h1>
            </div>

            <div className="bg-white h-fit container mx-auto overflow-y-auto shadow-sm rounded-2xl px-20 pt-10 pb-20 mt-4  flex flex-col ">
                {

                    vehicles && vehicles[0] ? (
                        vehicles.map((item, index) => (


                            <div key={index} className='mt-5 border rounded-lg border-custom h-44 '>
                                <div className='h-2/6 grid grid-cols-5 rounded-t-lg bg-custom'>
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
                                <div className='h-4/6 grid grid-cols-5'>
                                    <div className='col-span-1 flex flex-col justify-evenly  items-center'>

                                        <p className='kanit-regular text-xl '>{item.vehicleName}</p>
                                        <p className='kanit-regular text-red-600 underline text-md '>View Details</p>
                                        
                                    </div>
                                    <div className='col-span-1 flex flex-col justify-evenly  items-start'>

                                        <p className='kanit-regular text-md '>{item.seat} seater {item.type}</p>
                                        <p className='kanit-regular text-md '>{item.fuel} comfort vehicle</p>
                                        <button onClick={() => {
                                            setImage(item.images)
                                            setShow(true)
                                        }} className="  bg-yellow-500 kanit-light text-sm w-fit  opacity-100 hover:opacity-100 text-white hover:text-gray-900 rounded-md px-2 py-1 mb-2 ">
                                            view image
                                        </button>
                                    </div>
                                    <div className='col-span-1 flex flex-col justify-evenly  items-start'>

                                        <p className='kanit-regular text-md '>From : {booking.from.name || booking.from.city }</p>
                                        <p className='kanit-regular text-md '>To : {booking.to.name || booking.to.city }</p>
                                        <p className='kanit-regular text-md '>distance : {booking.distance/1000} km</p>
                                    </div>
                                    <div className='col-span-1 flex flex-col justify-evenly  items-start'>
                                        {
                                            (booking.distance/1000 ) < 100 ?(
                                                <>
                                                <p className='kanit-regular text-xl text-blue-600'>Estimate Price : ₹ {((Math.floor(booking.distance /1000)    )  * item.price )<500 ? 500:((Math.floor(booking.distance /1000)    )  * item.price + 100 )}</p>
                                                <p className='kanit-regular text-md '>Price /KM : ₹ {item.price} + <span className='text-sm kanit-regular text-red-950'>extra charge ₹100</span></p>
                                                <p className='kanit-regular text-md '>Total KM : {Math.floor(booking.distance/1000) *2} km</p>
                                                </>
                                            ):(
                                                <>
                                                <p className='kanit-regular text-xl text-blue-600'>Estimate Price : ₹ {item.startingPrice + ((Math.floor(booking.distance /1000))-100 )  * item.price + 100}</p>
                                                <p className='kanit-regular text-md '>Price details : ₹ {item.startingPrice} upto 100 km + <span className='text-sm kanit-regular text-orange-400'> ₹{item.price} extra / km</span></p>
                                                <p className='kanit-regular text-md '>Total KM : {Math.floor(booking.distance/1000) } km</p>
                                                </>
                                            )
                                        }
                                       
                                    </div>
                                    <div className='col-span-1 flex flex-col justify-evenly  items-center'>

                            <button onClick={() => {
                                handleSubmit(item)
                                            
                                        }} className="  bg-blue-600 kanit-light text-sm w-fit  opacity-100 hover:opacity-100 text-white hover:text-gray-900 rounded-md px-10 py-2 mb-2 ">
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
