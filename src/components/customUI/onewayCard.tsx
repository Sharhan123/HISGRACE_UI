import React, {  useState } from 'react'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GroupIcon from '@mui/icons-material/Group';
import LocationInfo from '../customUI/locationDetails';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { TextField } from '@mui/material';
import PassengersCount from './passengersCount';
import { useDispatch } from 'react-redux';
import { showAlert } from '../../redux/slices/alertSlice';
import { IbookingAuth, Ilocation } from '../../interfaces';
import { matrix } from '../../services/autoComplete';
import { setBookingData } from '../../redux/slices/bookingSice';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import MyLocationIcon from '@mui/icons-material/MyLocation';



const OnewayCard: React.FC = () => {
    const [isTimePickerOpen, setIsTimePickerOpen] = useState<boolean>(false);
    const [open, setOpen] = useState(false)
    const [selectedFrom, setSelectedFrom] = useState<Ilocation>()
    const [selectedTo, setSelectedTo] = useState<Ilocation>()
    const [returnDate,setReturnDate] = useState<Date>(new Date())
    const [type, setType] = useState<string>('')
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [selectedTime, setSelectedTime] = useState<string>('12:00');
    const [pOpen, setPopen] = useState(false)
    const [selected, setSelected] = useState('one-way')
    const [count, setCount] = useState<{ adult: number, child: number }>({ adult: 0, child: 0 })
    const token = useSelector((state: RootState) => state.auth.token)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const close = () => {
        setOpen(false)
    }

    const handleTextClick = () => {
        setIsTimePickerOpen(true);
    };

    const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedTime(event.target.value);
        setIsTimePickerOpen(false)
    };


    const handleDateChange = (date:any) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); 
if(selected ==='round-way'){

    if (returnDate < date) {
        dispatch(showAlert({color:'red',content:'Return date should be after the selected date.'}));
        return
    }
}
        if (date < today) {
            dispatch(showAlert({content:'You can\'t select a date before today.',color:'red'}));
        } else {
            setSelectedDate(date);
        }

    };

    const handleReturnDate = (date:any) => {
        if (selectedDate && date < selectedDate) {
            dispatch(showAlert({color:'red',content:'Return date should be after the selected date.'}));
        } else {
            setReturnDate(date);
        }
    };

    const getTimePeriod = (time: any) => {
        const hour = parseInt(time.split(':')[0], 10);
        return hour >= 12 ? 'PM' : 'AM';
    };

    const handleSelectCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                
                const apiKey = '2b1a504c63e94715aa252ab8128c20b3'; 
                const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${apiKey}`;
    
                try {
                    const response = await fetch(url);
                    const data = await response.json();
                    
                    if (data.results && data.results.length > 0) {
                        const result = data.results[0];
                        const location: Ilocation = {
                            city: result.components.city || '',
                            name: result.components.name || result.components.county,
                            address_line1: result.components.road || '',
                            address_line2: result.components.suburb || '',
                            country: result.components.country || '',
                            country_code: result.components.country_code || '',
                            county: result.components.county || '',
                            formatted: result.formatted || '',
                            lat: result.geometry.lat,
                            lon: result.geometry.lng,
                            place_id: result.annotations.OSM.place_id || '',
                            postcode: result.components.postcode || '',
                            state: result.components.state || '',
                            state_code: result.components.state_code || ''
                        };
    
                        console.log(location,'location'); 
                        setSelectedFrom(location)
                    }
                } catch (error) {
                    console.error('Error fetching location data:', error);
                }
            }, (error) => {
                console.error('Error getting current location:', error);
            });
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    };
    

    const handleBooking = async () => {
        if (!token) {
            dispatch(showAlert({ content: 'Please login to your account for booking', color: "red" }))
            return
        }
        if (!selectedFrom) {
            dispatch(showAlert({ head: 'Hisgrace Booking Incomplete', content: 'Please select a FROM location to complete your booking', color: 'red' }))
            return
        }
        if (!selectedTo) {
            dispatch(showAlert({ head: 'Hisgrace Booking Incomplete', content: 'Please select a TO location to complete your booking', color: 'red' }))
            return
        }

        if (selectedFrom.place_id === selectedTo.place_id) {
            dispatch(showAlert({ head: 'Hisgrace Booking Incomplete', content: 'Please select different  TO location both locations are same .', color: 'red' }))
            return
        }

        if (!selectedDate) {
            dispatch(showAlert({ head: 'Hisgrace Booking Incomplete', content: 'Please select a date for your trip ', color: 'red' }))
            return
        }
        if(selected === 'round-way' && !returnDate){
            dispatch(showAlert({ head: 'Hisgrace Booking Incomplete', content: 'Please select a return date for your round way trip ', color: 'red' }))
            return
        }
        if (!selectedTime) {
            dispatch(showAlert({ head: 'Hisgrace Booking Incomplete', content: 'Please select a time for your trip ', color: 'red' }))
            return
        }
        if (count.adult < 1) {
            dispatch(showAlert({ head: 'Hisgrace Booking Incomplete', content: 'Please select a adult for your trip ', color: 'red' }))
            return
        }

        const response = await matrix({ lon: selectedFrom?.lon, lat: selectedFrom?.lat }, { lon: selectedTo?.lon, lat: selectedTo?.lat })
        let data:IbookingAuth
        if(selected === 'round-way'){
            data = {
                from: selectedFrom,
                to: selectedTo,
            period: {
                time: selectedTime,
                date: selectedDate
            },
            distance: response[0][0].distance,
            person: count,
            type: selected,
            returnDate:returnDate,
            show:true
        }
        }else{
            data = {
                from: selectedFrom,
                to: selectedTo,
            period: {
                time: selectedTime,
                date: selectedDate
            },
            distance: response[0][0].distance,
            person: count,
            type: selected,
            show:true
        }
        }
        localStorage.setItem('booking', JSON.stringify(data))

        dispatch(setBookingData(data))
        navigate('/choosevehicle')
    }

    return (
        <div className='h-screen py-5 px-5 w-full mx-auto'>
    <LocationInfo close={close} selectedFrom={(data: Ilocation) => setSelectedFrom(data)} type={type} selectedTo={(data: Ilocation) => setSelectedTo(data)} open={open} />
    <PassengersCount count={(data: { adult: number, child: number }) => {
                setCount(data)
                console.log(data)
            }
            } open={pOpen} close={() => setPopen(false)} />
            <div className='drop-shadow-md bg-custom overflow-auto px-5 flex flex-col justify-evenly items-center  border rounded container mx-auto h-full'>
                <div className='w-full bg-white h-auto rounded-sm grid grid-rows-6'>
                    <span className=' col-span-1 py-2 flex pl-5 border-b items-center gap-5 '>
                        <div onClick={() => setSelected('one-way')} className='cursor-pointer flex gap-2 items-center'>
                            <span className={`h-4 w-4 ${selected === 'one-way' ? 'bg-red-600' : ''} border rounded-full`}></span>
                            <label className='kanit-regular' htmlFor="oneWay">One-way</label>
                        </div>
                        <div onClick={() => setSelected('round-way')} className='cursor-pointer flex gap-2 items-center'>
                            <span className={`h-4 w-4 ${selected === 'round-way' ? 'bg-red-600' : ''} border rounded-full`}></span>
                            <label className='kanit-regular' htmlFor="roundTrip">Round-trip</label>
                        </div>
                    </span>
                    <span className={`grid ${selected === 'one-way' ? 'lg:grid-cols-5 md:grid-cols-5 gap-5' : 'lg:grid-cols-6 md:grid-cols-6 gap-4'} row-span-4`}>
                        <div className='lg:border-r md:border-r border-b  flex flex-col ml-5  items-start justify-evenly col-span-1'>

                            <div onClick={() => {
                                setType('from')
                                setOpen(true)
                            }} className='flex  w-full justify-between'>
                                <p className='cursor-pointer kanit-light text-md text-black'>From</p>

                            </div>
                            <div className='cursor-pointer flex items-center' >

                                <span onClick={() => {
                                    setType('from')
                                    setOpen(true)
                                }} className='text-black kanit-regular text-lg'>{selectedFrom ? selectedFrom.name || selectedFrom.city : 'Select From Location'}</span>
                                <MyLocationIcon onClick={handleSelectCurrentLocation} className='text-green ml-8' />
                            </div>
                            <div className='flex '>
                                <span className='text-black kanit-light text-sm '>
                                    [{selectedFrom ? selectedFrom.formatted : ''}]
                                </span>

                            </div>
                        </div>
                        <div className='lg:border-r md:border-r border-b flex flex-col ml-5  items-start justify-evenly col-span-1'>

                     <div className='flex  w-full justify-between'>

                        <p onClick={() => {
                            setType('to')
                            setOpen(true)
                        }} className='cursor-pointer kanit-light text-md text-black'>To</p>

                    </div>
                    <div className='cursor-pointer flex items-center' >
                        <span onClick={
                            () => {
                                setType('to')
                                setOpen(true)
                            }
                        } className='text-black kanit-regular text-lg'>{selectedTo ? selectedTo.name || selectedTo.city : 'Select To Location'}</span>

                    </div>
                    <div className='flex '>
                        <span className='text-black kanit-light text-sm '>
                            [{selectedTo ? selectedTo.formatted : ''}]
                        </span>

                    </div>
                </div>
                <div className="lg:border-r md:border-r border-b flex flex-col ml-5 lg:items-center md:items-center items-start justify-evenly col-span-1">
                     <div className="flex ">
                         <CalendarMonthIcon color="success" />
                         <p className="kanit-light ml-5 text-md text-black">Pick up date</p>
                     </div>
                     <div className='flex items-center justify-center '>

                         <DatePicker
                            selected={selectedDate}
                            onChange={handleDateChange}
                            dateFormat="dd MMM yy"
                            className="text-black md:text-center text-start lg:text-center kanit-regular text-lg outline-none bg-transparent"
                            popperPlacement="bottom-start"
                            popperModifiers={[
                                {
                                    name: 'offset',
                                    options: {
                                        offset: [0, 10],
                                    },
                                    fn: (data) => ({
                                        ...data,

                                    }),
                                },
                            ]}
                        />
                    </div>
                    <div className="flex">
                        <span className="text-black kanit-regular text-md">
                            {selectedDate ? selectedDate.toLocaleDateString('en-GB', { weekday: 'long' }) : ''}
                        </span>
                    </div>
                </div>
                {
                    selected === 'round-way' && (
                        <div className="lg:border-r md:border-r border-b flex flex-col ml-5 md:items-center items-start lg:items-center justify-evenly col-span-1">
                    <div className="flex ">
                        <CalendarMonthIcon color="success" />
                        <p className="kanit-light ml-5 text-md text-black">Return date</p>
                    </div>
                    <div className='flex items-center justify-center '>

                        <DatePicker
                            selected={returnDate}
                            onChange={handleReturnDate}
                            dateFormat="dd MMM yy"
                            className="text-black lg:text-center text-start md:text-center kanit-regular text-lg outline-none bg-transparent"
                            popperPlacement="bottom-start"
                            popperModifiers={[
                                {
                                    name: 'offset',
                                    options: {
                                        offset: [0, 10],
                                    },
                                    fn: (data) => ({
                                        ...data,

                                    }),
                                },
                            ]}
                        />
                    </div>
                    <div className="flex">
                        <span className="text-black kanit-regular text-md">
                            {returnDate ? returnDate.toLocaleDateString('en-GB', { weekday: 'long' }) : ''}
                        </span>
                    </div>
                </div>
                    )
                }

<div className="lg:border-r md:border-r border-b flex flex-col ml-5 lg:items-center items-start md:items-center justify-evenly col-span-1">
                    <div className="flex" onClick={handleTextClick}>
                        <AccessTimeIcon color="info" />
                        <p className="kanit-light ml-5 text-md text-black cursor-pointer">Pick up time</p>
                    </div>
                     {isTimePickerOpen ? (
                        <TextField
                       
                            id="time"
                            label="Time"
                            type="time"
                            color='info'
                            focused
                            value={selectedTime}
                            onChange={handleTimeChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            sx={{
                                color: 'black'
                            }}
                            inputProps={{
                                step: 300,
                                color: '#ffff'
                            }}
                        />
                    ) : (
                        <div  onClick={handleTextClick} className="flex">
                            <span className="text-black kanit-regular text-lg">{
                                selectedTime

                            }</span>
                        </div>
                    )}
                    <div className="flex">
                        <span className="text-black kanit-regular text-md">
                            {getTimePeriod(selectedTime)}
                        </span>
                    </div>
                </div>
                <div className=' flex flex-col ml-5 lg:items-center items-start md:items-center justify-evenly col-span-1'>

                     <div className='flex   '>
                     <GroupIcon color='error' />
                         <p onClick={() => setPopen(true)} className='kanit-light ml-5 text-md text-black'>No of passengers</p>

                     </div>
                     <div onClick={() => setPopen(true)} className='cursor-pointer flex items-center' >
                         <span className='text-black kanit-regular text-lg'>{count.adult} adults</span>

                     </div>
                     <div className='flex '>
                         <span className='text-black kanit-regular text-md '>
                             {count.child} childs
                         </span>

                     </div>
                </div>
                    </span>
                    <div onClick={handleBooking} className='row-span-1 border-t flex flex-col mt-2'>
                <button className=" bg-red-600 kanit-regular h-full  opacity-100 hover:opacity-100 text-white hover:text-white  px-10 py-2 ">
                    Book your Trip
                 </button>
             </div>
                </div>
                
                <p className='kanit-light text-left text-white text-lg '>Note : Please note in this booking card you are able to book as two types one is <span className='kanit-medium text-yellow-400'>One-Way</span> and the other one is <span className='kanit-medium text-yellow-400'>Round-Way</span>.In one-way trip you can book our vehicle
                    for traveling from a location to a location (eg:Malappuram to Kozhikode) and if you are slecting option round trip it means  that you can book a vehicle from a location to a location and also you can select multiple days means stay or slecting
                    the same starting date and ending date means going and return back to your place.
                    <span className='kanit-medium text-yellow-200'> Important thing that our vehicle is from kottakkal, Malappuram Dist , Kerala so the prices will be according to that the price showing in the website will be only estimate you can get the exact price by chating with admin or contact <span className='text-yellow-400'>9847109700.</span></span>
                </p>
            </div>
        </div>
        // <div className='w-10/12 mt-5 rounded-lg flex flex-col justify-between mx-auto h-2/6 bg-custom'>
        //     
        //     <div className='h-1/6 flex border-b  items-center justify-start '>
        //         <p  className='text-xs ml-5 text-yellow-400 kanit-light'>One Way Trip </p>
        //         <p onClick={() => setSelected('round-way')} className='text-xs ml-5 text-yellow-400 kanit-light'>Round Trip </p>
        //     </div>
        //     <div className={`h-3/6 grid mt-2 ${selected === 'one-way' ? 'grid-cols-5' : 'grid-cols-6'} `}>
        //         
        //         
        //        
        //         

        //         
        //         


        //     </div>
        //     
        // </div>
    )
}
 
export default OnewayCard
