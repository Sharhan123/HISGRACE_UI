import React, { useEffect, useState } from 'react'
import { clearPackage, selectPackageData } from '../../redux/slices/packageBookingSlice'
import { useNavigate } from 'react-router-dom'
import { statesInIndia } from '../../constants/states';
import { useSelector } from 'react-redux';
import { selectBookingData, setBookingData } from '../../redux/slices/bookingSice';
import { IbookingOver, IdriverRes, IpackageBooking, IpackageRes, Ipickup, IuserRes, IvehicleRes } from '../../interfaces';
import { getVehicles } from '../../services/vehicleService';
import { getDrivers } from '../../services/driverService';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import DatePicker from 'react-datepicker';
import '../customUI/style.css'
import { getUser } from '../../services/userServices';
import { loadStripe } from '@stripe/stripe-js';
import { useDispatch } from 'react-redux';
import { sendPayment } from '../../services/bookingsServices';
import { findById } from '../../services/packageService';
import { showAlert } from '../../redux/slices/alertSlice';


const PackageBooking: React.FC = () => {
    const navigate = useNavigate()
    const [packages, setPackage] = useState<IpackageRes>()
    // const [driver, setDriver] = useState<IdriverRes>()
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
    const booking: IpackageBooking = useSelector(selectPackageData)
    const dispatch = useDispatch()
    useEffect(() => {
        const fetch = async () => {

            try {
                const res = await findById(booking.package)
                const user = await getUser()
                const arr = res.data.data
                setPackage(arr)
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
        if (!pickup.bookingName || pickup.bookingName.length < 4) {
            setErrors(prev => ({
                ...prev,
                name: 'Booking name should be at least 4 characters',

            }))

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
        if (!pickup.city) {
            setErrors(prev => ({
                ...prev,
                city: 'City number is required'
            }))
        }
        if (!pickup.mobile) {
            setErrors(prev => ({
                ...prev,
                mobile: 'Mobile number is required',

            }))


        }

        if (
            pickup.postCode &&
            !/^\d+$/.test(pickup.postCode)
        ) {
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


        const data = {
            ...booking,
            pickupDetails:pickup
        }
        localStorage.setItem('booking',JSON.stringify(data))
        dispatch(setBookingData(data))
        try{
        const stripe = await loadStripe("pk_test_51PArKOSD9IJSI7QIT2swcNPhcepglgkr4iOH6LiSnTaLmjCY1RomN6uHA7djWeOAWfhzIzkWyyglyEP8jknh4fRU00rGATCGQL")

        const res = await sendPayment(data)
        const session = res.data.session
        
        const result = stripe?.redirectToCheckout({
            sessionId:session
        })
        localStorage.removeItem('booking')
        dispatch(setBookingData(null))

        
        
        
    } catch (err:any) { 
        console.error('Error fetching data:', err);
        if(err.response.data){ 
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
                    <button onClick={() => {
                        localStorage.removeItem('package')
                        dispatch(clearPackage())
                        navigate('/packages')
                        }} className="  bg-red-500 kanit-regular w-fit  opacity-100 hover:opacity-100 text-white hover:text-gray-900 rounded-md px-10 py-2 ">
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
                        <h1 className='text-yellow-400 kanit-regular text-lg'> Package Details </h1>
                        <span className=' kanit-light text-md text-white text-start '>
                            Package  : {packages?.title}
                        </span>
                        <span className='kanit-light text-md text-white text-start '>
                            Locations : {packages?.location}
                        </span>
                        <span className='kanit-light text-md text-white text-start '>
                            Days :  {packages?.days} Days & {packages?.days?(packages?.days)-1:''} Nights
                        </span>
                        <h1 className='text-yellow-400 kanit-regular text-lg'> Vehicle Details </h1>
                        <span className='kanit-light text-md text-white text-start '>
                            Vehicle Name : {packages?.vehicle.vehicleName}
                        </span>
                        <span className='kanit-light text-md text-white text-start '>
                            Details : Premium {packages?.vehicle.type} {packages?.vehicle.seat} seater
                        </span>
                    </div>
                    <div className=' h-full grid border rounded-lg grid-rows-7 px-3 py-3'>
                        <h1 className='text-yellow-400 kanit-light text-lg'> Trip Details </h1>
                        <span className=' kanit-light  text-md text-white text-start '>
                            Itenary : ({packages?.title}) Package 
                        </span>
                        <span className='kanit-light text-md text-white text-start '>
                           <span className='flex items-center gap-2'> Trip Date : <DatePicker
                                disabled
                                onChange={() => ''}
                                selected={booking.period.date}
                                dateFormat="dd MMM yyyy"
                                className="text-white  kanit-light text-lg outline-none bg-transparent"

                            />
                            </span>
                        </span>
                        
                        
                        <span className='kanit-light text-md text-white text-start '>
                            Trip Time : {booking.period.time} {booking.period.meridian}
                        </span>
                        <span className='kanit-light text-md text-white text-start '>
                            Estimate Price : ₹ {packages?.total}  + <span className='kanit-light text-yellow-400'> the charge of distance from your location to vehicle's location</span>
                        </span>
                        <span className='kanit-light text-md text-white text-start '>
                            Advance For Booking  : <span className='kanit-regular text-yellow-400 px-1 rounded-md text-lg'>₹ {Math.max(500,0.3 * (packages?.total?packages?.total:1))} /- </span>
                        </span>
                    </div>



                    <div onClick={makePayment} className='h-10 text-center flex items-center justify-center kanit-medium text-lg   w-full col-span-2 rounded text-white bg-blue-600'>
                        Make Advance Payment
                    </div>
                </div>




            </div>
            {/* <h1>Hellloooo</h1> */}
        </div>
    )
}

export default PackageBooking
