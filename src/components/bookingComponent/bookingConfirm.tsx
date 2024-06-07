import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { statesInIndia } from '../../constants/states';
import { useSelector } from 'react-redux';
import { selectBookingData, setBookingData } from '../../redux/slices/bookingSice';
import { IbookingOver, IdriverRes, Ipickup, IuserRes, IvehicleRes } from '../../interfaces';
import { getVehicles } from '../../services/vehicleService';
import { getDrivers } from '../../services/driverService';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import DatePicker from 'react-datepicker';
import '../customUI/style.css'
import { getUser } from '../../services/userServices';
import { loadStripe } from '@stripe/stripe-js';
import { useDispatch } from 'react-redux';
import { sendPayment } from '../../services/bookingsServices';
import { showAlert } from '../../redux/slices/alertSlice';


const BookingConfirm: React.FC = () => {
    const navigate = useNavigate()
    const [vehicle, setVehicle] = useState<IvehicleRes>()
    const [driver, setDriver] = useState<IdriverRes>()
    const [user, setUser] = useState<IuserRes>()
    const [pickup, setPickup] = useState<Ipickup>({
        bookingName: user ? user.name : "",
        email: user ? user.email : "",
        mobile: !user ? '' : user.mobile,
        address: '',
        city: '',
        postCode: '',
        state: ''
    })
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        mobile: '',
        address: '',
        city: '',
        postcode: '',
        state: ''
    })
    const booking: IbookingOver = useSelector(selectBookingData)
    const dispatch = useDispatch()
    useEffect(() => {
        const fetch = async () => {

            try {
                const res = await getVehicles()
                const dres = await getDrivers()
                const user = await getUser()
                const arr: [] = res.data.data
                const arr1: [] = dres.data.data
                setVehicle(arr.find((item: IvehicleRes) => item._id === booking.vehicle))
                setDriver(arr1.find((item: IdriverRes) => item._id === booking.driver))
                setUser(user.data.data)
                setPickup(prev => ({ ...prev, bookingName: user.data.data.name, email: user.data.data.email, mobile: user.data.data.mobile }))

            } catch (err) {
                console.log(err);

            }
        }
        fetch()
    }, [])

    const makePayment = async () => {
        setErrors({
            name: '',
            email: '',
            mobile: '',
            address: '',
            postcode: '',
            state: '',
            city: ''
        })
        if (!pickup.bookingName || pickup.bookingName.trim().length < 4 || !/^[A-Za-z\s]+$/.test(pickup.bookingName)) {
            setErrors(prev => ({
                ...prev,
                name: 'Booking name should be at least 4 characters and contain only letters',
            }));
        }

        if (!pickup.state) {
            setErrors(prev => ({
                ...prev,
                state: 'State is required',

            }))
        }

        if (pickup.mobile && !/^\d{10}$/.test(pickup.mobile)) {
            setErrors(prev => ({
                ...prev,
                mobile: "Mobile number must be 10 digits"
            }))

        }

        if (
            pickup.email &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(pickup.email.trim())
        ) {
            setErrors(prev => ({
                ...prev,
                email: 'Invalid email address format ',

            }))

        }
        if (!pickup.email) {
            setErrors(prev => ({
                ...prev,
                email: 'Email address is required',

            }))

        }
        if (!pickup.city || !/^[A-Za-z\s]+$/.test(pickup.city)) {
            setErrors(prev => ({
                ...prev,
                city: 'City is required only should be letters'
            }))
        }
        if (!pickup.mobile || pickup.mobile.length<10 || /^0+$/.test(pickup.mobile)) {
            setErrors(prev => ({
                ...prev,
                mobile: 'Mobile number should be at least 10 digits long and cannot be all zeros',
            }));
        }

        if (
            !pickup.postCode &&
            !/^\d+$/.test(pickup.postCode)) {
            setErrors(prev => ({
                ...prev,
                postcode: 'Postcode must contain only numbers',

            }))

        }

        if (!pickup.address) {
            console.log(pickup.address);
            
            setErrors(prev => ({
                ...prev,
                address: 'Please enter your pickup address',

            }))
            return 
        }


        
        try{
            const data = {
                ...booking,
                show:false,
                pickupDetails:pickup,
                
            }
        const stripe = await loadStripe("pk_test_51PArKOSD9IJSI7QIT2swcNPhcepglgkr4iOH6LiSnTaLmjCY1RomN6uHA7djWeOAWfhzIzkWyyglyEP8jknh4fRU00rGATCGQL")

        const res = await sendPayment(data)
        const session = res.data.session
        
        const result = stripe?.redirectToCheckout({
            sessionId:session
        })
        console.log(typeof result);
        
        localStorage.setItem('booking',JSON.stringify(data))
        dispatch(setBookingData(data))
        

        
        
        
    }catch(err:any){
        console.log(err);
        if(err.response.data.message){

            dispatch(showAlert({content:err.response.data.message,color:'red'}))
            return 
        }
        dispatch(showAlert({content:err.message,color:'red'}))

    }

    }
    return (
        <div className='h-screen'>
            <div className="scroll-hidden bg-custom h-full container mx-auto overflow-auto shadow-md rounded-2xl px-20 pt-10 pb-20 mb-4 flex flex-col my-2">
                <div className='flex container items-center mt-2 mb-2'>
                    <button onClick={() => navigate('/choosevehicle')} className="  bg-red-500 kanit-regular w-fit  opacity-100 hover:opacity-100 text-white hover:text-gray-900 rounded-md px-10 py-2 ">
                        Back
                    </button>

                    <h1 className='kanit-regular text-xl text-white mx-auto'>Confirm your Booking </h1>
                </div>
                <div className='container h-auto  border rounded-lg mt-5'>
                    <div className='flex justify-between'>
                        <div className="w-2/6 md:flex mt-5">
                            <div className="w-full px-3 mb-6 md:mb-0">
                                <label className="block text-start uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-first-name">
                                    Booking Name
                                </label>
                                <input
                                    value={pickup.bookingName}
                                    onChange={(e) => setPickup(prev => ({ ...prev, bookingName: e.target.value }))}
                                    className={` ${errors.name ? 'border border-red-500' : ''} appearance-none block w-full bg-grey-lighter text-black border border-red rounded py-3 px-4 mb-3`} id="grid-first-name" name='name' type="text" placeholder="Please enter your name" />
                                <p className="text-red-500 text-sm">{errors.name}</p>
                            </div>

                        </div>
                        <div className="w-2/6 md:flex mt-5">
                            <div className="w-full px-3 mb-6 md:mb-0">
                                <label className="block text-start uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-first-name">
                                    Email address
                                </label>
                                <input
                                    value={pickup.email}
                                    onChange={(e) => setPickup(prev => ({ ...prev, email: e.target.value }))}
                                    className={`${errors.email ? 'border border-red-500' : ''} appearance-none block w-full bg-grey-lighter text-black border border-red rounded py-3 px-4 mb-3`} id="grid-first-name" name='name' type="text" placeholder="Please enter your name" />
                                <p className="text-red-500 text-sm">{errors.email}</p>
                            </div>

                        </div>
                        <div className="w-2/6 md:flex mt-5">
                            <div className="w-full px-3 mb-6 md:mb-0">
                                <label className="block text-start uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-first-name">
                                    Mobile No.
                                </label>
                                <input
                                    value={pickup.mobile}
                                    onChange={(e) => setPickup(prev => ({ ...prev, mobile: e.target.value }))}
                                    className={`${errors.mobile ? 'border border-red-500' : ''} appearance-none block w-full bg-grey-lighter text-black border border-red rounded py-3 px-4 mb-3`} id="grid-first-name" name='name' type="text" placeholder="Please enter your name" />
                                <p className="text-red-500 text-sm">{errors.mobile}</p>
                            </div>

                        </div>
                    </div>
                    <div className='flex justify-between'>

                        <div className="w-2/6 md:flex mt-5">
                            <div className="w-full px-3 mb-6 md:mb-0">
                                <label className="block text-start uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-first-name">
                                    city
                                </label>
                                <input
                                    value={pickup.city}
                                    onChange={(e) => setPickup(prev => ({ ...prev, city: e.target.value }))}
                                    className={`${errors.city ? 'border border-red-500' : ''} appearance-none block w-full bg-grey-lighter text-black border border-red rounded py-3 px-4 mb-3`} id="grid-first-name" name='name' type="text" placeholder="Please enter your name" />
                                <p className="text-red-500 text-sm">{errors.city}</p>
                            </div>

                        </div>
                        <div className="w-2/6 md:flex mt-5">
                            <div className="w-full px-3 mb-6 md:mb-0">
                                <label className="block text-start uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="state-dropdown">
                                    State
                                </label>
                                <select
                                    id="state-dropdown"
                                    className={`${errors.state ? 'border border-red-500' : ''} appearance-none block w-full bg-grey-lighter text-black border border-red rounded py-3 px-4 mb-3`}
                                    value={pickup.state}
                                    onChange={(e) => setPickup(prev => ({ ...prev, state: e.target.value }))}
                                >
                                    <option value="">Select a state</option>
                                    {statesInIndia.map((state, index) => (
                                        <option key={index} value={state}>
                                            {state}
                                        </option>
                                    ))}
                                </select>
                                <p className="text-red-500 text-sm">{errors.state}</p>
                            </div>

                        </div>
                        <div className="w-2/6 md:flex mt-5">
                            <div className="w-full px-3 mb-6 md:mb-0">
                                <label className="block text-start uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-first-name">
                                    Post code
                                </label>
                                <input
                                    value={pickup.postCode}
                                    onChange={(e) => setPickup(prev => ({ ...prev, postCode: e.target.value }))}
                                    className={`${errors.postcode ? 'border border-red-500' : ''} appearance-none block w-full bg-grey-lighter text-black border border-red rounded py-3 px-4 mb-3`} id="grid-first-name" name='name' type="text" placeholder="Please enter your name" />
                                <p className="text-red-500 text-sm">{errors.postcode}</p>
                            </div>

                        </div>
                    </div>
                    <div className='flex justify-between'>
                        <div className="w-full md:flex mt-5">
                            <div className="w-full px-3 mb-6 md:mb-0">
                                <label className="block text-start uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-first-name">
                                    Pick up address
                                </label>
                                <textarea value={pickup.address} onChange={(e)=>setPickup(prev=>({...prev,address:e.target.value}))} className={`${errors.address ? 'border border-red-500' : ''} appearance-none block w-full bg-grey-lighter text-black border border-red rounded py-3 px-4 mb-3`} name="description" >

                                </textarea>
                                <p className="text-red-500 text-sm">{errors.address}</p>

                            </div>

                        </div>
                    </div>



                </div>

                <div className='container grid gap-5 grid-cols-2 h-auto    rounded-lg mt-5'>

                    <div className=' h-full grid border rounded-lg grid-rows-7 px-3 py-3'>
                        <h1 className='text-yellow-400 kanit-regular text-lg'> Vehicle Details </h1>
                        <span className=' kanit-regular text-md text-white text-start '>
                            Vehicle Name : {vehicle?.vehicleName}
                        </span>
                        <span className='kanit-regular text-md text-white text-start '>
                            Vehicle Type : Premium {vehicle?.type}
                        </span>
                        <span className='kanit-regular text-md text-white text-start '>
                            Seat :  {vehicle?.seat} seater
                        </span>
                        <h1 className='text-yellow-400 kanit-regular text-lg'> Driver Details </h1>
                        <span className='kanit-regular text-md text-white text-start '>
                            Driver Name : {driver?.driverName}
                        </span>
                        <span className='kanit-regular text-md text-white text-start '>
                            Driver Experiance : {driver?.exp} /yr
                        </span>
                    </div>
                    <div className=' h-full grid border rounded-lg grid-rows-7 px-3 py-3'>
                        <h1 className='text-yellow-400 kanit-regular text-lg'> Trip Details </h1>
                        <span className=' kanit-regular  text-md text-white text-start '>
                            Itenary : <span className='kanit-medium  px-1 rounded-md text-lg'>{booking.from.name || booking.from.city}<CompareArrowsIcon className='text-green ml-2 mr-2' /> {booking.to.name || booking.to.city}</span>
                        </span>
                        <span className='kanit-regular text-md text-white text-start '>
                            Total KM : {booking.totalKm} KM
                        </span>
                        <span className='kanit-regular text-md text-white text-start '>
                            Trip Date : <DatePicker
                                disabled
                                onChange={() => ''}
                                selected={booking.period.date}
                                dateFormat="dd MMM yyyy"
                                className="text-white  kanit-regular text-lg outline-none bg-transparent"

                            />
                        </span>
                        {
                            booking.type === 'round-way' && (
                                <span className='kanit-regular text-md text-white text-start '>
                            Return Date : <DatePicker
                                disabled
                                onChange={() => ''}
                                selected={booking.returnDate}
                                dateFormat="dd MMM yyyy"
                                className="text-white  kanit-regular text-lg outline-none bg-transparent"

                            />
                        </span>
                            )
                        }
                        
                        <span className='kanit-regular text-md text-white text-start '>
                            Trip Time : {booking.period.time}
                        </span>
                        <span className='kanit-regular text-md text-white text-start '>
                            Estimate Amount  : <span className='kanit-medium text-yellow-400 px-1 rounded-md text-lg'>₹ {booking.totalPrice} /- </span> <span className='text-sm kanit-light'>(Price given is an estimate according to trip you can get exact price from admin <span className='text-red-400'>+91 9847109700 </span>) </span>
                        </span>
                        <span className='kanit-regular text-md text-white text-start '>
                            Advance For Booking  : <span className='kanit-medium text-yellow-400 px-1 rounded-md text-lg'>₹ {Math.round(Math.max(500,0.3 * booking.totalPrice))} /- </span>
                        </span>
                    </div>



                    <div onClick={makePayment} className='h-10 text-center cursor-pointer flex items-center justify-center kanit-medium text-lg   w-full col-span-2 rounded text-white bg-blue-600'>
                        Make Advance Payment
                    </div>
                </div>




            </div>
        </div>
    )
}

export default BookingConfirm
