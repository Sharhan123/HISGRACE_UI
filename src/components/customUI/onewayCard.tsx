import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import MyLocation from '@mui/icons-material/MyLocation';
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




const OnewayCard: React.FC = () => {
    const [isTimePickerOpen, setIsTimePickerOpen] = useState<boolean>(false);
    const [open, setOpen] = useState(false)
    const [selectedFrom, setSelectedFrom] = useState<Ilocation>()
    const [selectedTo, setSelectedTo] = useState<Ilocation>()
    const [type, setType] = useState<string>('')
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [selectedTime, setSelectedTime] = useState<string>('12:00');
    const [pOpen, setPopen] = useState(false)
    const [count, setCount] = useState<{ adult: number, child: number }>({ adult: 0, child: 0 })
    const [data, setData] = useState<IbookingAuth>()
    const token = useSelector((state:RootState)=>state.auth.token)
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


    const handleDateChange = (date: Date ) => {
        setSelectedDate(date);
    };
    const getTimePeriod = (time: any) => {
        const hour = parseInt(time.split(':')[0], 10);
        return hour >= 12 ? 'PM' : 'AM';
    };

    const handleBooking = async () => {
        if(!token){
            dispatch(showAlert({content:'Please login to your account for booking',color:"red"}))
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

        if(!selectedDate){
            dispatch(showAlert({ head: 'Hisgrace Booking Incomplete', content: 'Please select a date for your trip ', color: 'red' }))
            return 
        }
        if(!selectedTime){
            dispatch(showAlert({ head: 'Hisgrace Booking Incomplete', content: 'Please select a time for your trip ', color: 'red' }))
            return 
        }
        if(count.adult <1){
            dispatch(showAlert({ head: 'Hisgrace Booking Incomplete', content: 'Please select a adult for your trip ', color: 'red' }))
            return
        }

        const response = await matrix({ lon: selectedFrom?.lon, lat: selectedFrom?.lat }, { lon: selectedTo?.lon, lat: selectedTo?.lat })
         setData({
            from:selectedFrom,
            to:selectedTo,
            period:{
                time:selectedTime,
                date:selectedDate
            },
            distance:response[0][0].distance,
            person:count
        }
        )
        localStorage.setItem('booking',JSON.stringify({
            from:selectedFrom,
            to:selectedTo,
            distance:response[0][0].distance,
            person:count,
            period:{
                time:selectedTime,
                date:selectedDate
            },
        }))

        dispatch(setBookingData({
            from:selectedFrom,
            to:selectedTo,
            distance:response[0][0].distance,
            person:count,
            period:{
                time:selectedTime,
                date:selectedDate
            },
        })) 
        navigate('/choosevehicle')
    }

    return (
        <div className='w-10/12 mt-5 rounded-lg flex flex-col justify-between mx-auto h-2/6 bg-custom'>
            <LocationInfo close={close} selectedFrom={(data: Ilocation) => setSelectedFrom(data)} type={type} selectedTo={(data: Ilocation) => setSelectedTo(data)} open={open} />
            <PassengersCount count={(data: { adult: number, child: number }) => {
                setCount(data)
                console.log(data)
            }
            } open={pOpen} close={() => setPopen(false)} />
            <div className='h-1/6 flex border-b  items-center justify-start '>
                <p className='text-xs ml-5 text-yellow-400 kanit-light'>One Way Trip - In this method you can book vehicle for one place to another the price will be calculated according to you total km so if you faces any confusions connect with admin <span className='text-blue-400'>9847109700</span></p>
            </div>
            <div className='h-3/6 grid mt-2 grid-cols-5 '>
                <div className='border-r flex flex-col  ml-5  items-start justify-evenly col-span-1'>

                    <div onClick={() => {
                        setType('from')
                        setOpen(true)
                    }} className='flex  w-full justify-between'>
                        <p className='cursor-pointer kanit-light text-md text-white'>From</p>

                    </div>
                    <div className='cursor-pointer flex items-center' >

                        <span onClick={() => {
                            setType('from')
                            setOpen(true)
                        }} className='text-white kanit-regular text-lg'>{selectedFrom ? selectedFrom.name || selectedFrom.city : 'Select From Location'}</span>
                        <MyLocation className='text-green ml-8' />
                    </div>
                    <div className='flex '>
                        <span className='text-white kanit-light text-sm '>
                            [{selectedFrom ? selectedFrom.formatted : ''}]
                        </span>

                    </div>
                </div>
                <div className='border-r flex flex-col ml-5  items-start justify-evenly col-span-1'>

                    <div className='flex  w-full justify-between'>

                        <p onClick={() => {
                            setType('to')
                            setOpen(true)
                        }} className='cursor-pointer kanit-light text-md text-white'>To</p>

                    </div>
                    <div className='cursor-pointer flex items-center' >
                        <span onClick={
                            () => {
                                setType('to')
                                setOpen(true)
                            }
                        } className='text-white kanit-regular text-lg'>{selectedTo ? selectedTo.name || selectedTo.city : 'Select To Location'}</span>

                    </div>
                    <div className='flex '>
                        <span className='text-white kanit-light text-sm '>
                            [{selectedTo ? selectedTo.formatted : ''}]
                        </span>

                    </div>
                </div>
                <div className="border-r flex flex-col ml-5 items-center justify-evenly col-span-1">
                    <div className="flex ">
                        <CalendarMonthIcon color="success" />
                        <p className="kanit-light ml-5 text-md text-white">Pick up date</p>
                    </div>
                    <div className='flex items-center justify-center '>

                        <DatePicker
                            selected={selectedDate}
                            onChange={handleDateChange}
                            dateFormat="dd MMM yy"
                            className="text-white text-center kanit-regular text-lg outline-none bg-transparent"
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
                        <span className="text-white kanit-regular text-md">
                            {selectedDate ? selectedDate.toLocaleDateString('en-GB', { weekday: 'long' }) : ''}
                        </span>
                    </div>
                </div>
                <div className="border-r  flex flex-col ml-5 items-center justify-evenly col-span-1">
                    <div className="flex" onClick={handleTextClick}>
                        <AccessTimeIcon color="info" />
                        <p className="kanit-light ml-5 text-md text-white cursor-pointer">Pick up time</p>
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
                                color: 'white'
                            }}
                            inputProps={{
                                step: 300,
                                color: '#ffff'
                            }}
                        />
                    ) : (
                        <div className="flex">
                            <span className="text-white kanit-regular text-lg">{
                                selectedTime

                            }</span>
                        </div>
                    )}
                    <div className="flex">
                        <span className="text-white kanit-regular text-md">
                            {getTimePeriod(selectedTime)}
                        </span>
                    </div>
                </div>
                <div className=' flex flex-col ml-5 items-center justify-evenly col-span-1'>

                    <div className='flex   '>
                        <GroupIcon color='error' />
                        <p onClick={() => setPopen(true)} className='kanit-light ml-5 text-md text-white'>No of passengers</p>

                    </div>
                    <div onClick={() => setPopen(true)} className='cursor-pointer flex items-center' >
                        <span className='text-white kanit-regular text-lg'>{count.adult} adults</span>

                    </div>
                    <div className='flex '>
                        <span className='text-white kanit-regular text-md '>
                            {count.child} childs
                        </span>

                    </div>
                </div>


            </div>
            <div onClick={handleBooking} className='h-1/6 border-t flex flex-col mt-2'>
                <button className=" bg-red-600 kanit-regular h-full rounded-lg opacity-100 hover:opacity-100 text-white hover:text-white  px-10 py-2 ">
                    Book your Trip
                </button>
            </div>
        </div>
    )
}

export default OnewayCard
