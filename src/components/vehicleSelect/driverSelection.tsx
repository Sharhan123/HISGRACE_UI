import React, { useEffect, useState } from 'react'
import { IdriverRes, IreviewRes } from '../../interfaces'
import { useDispatch } from 'react-redux'
import { showAlert } from '../../redux/slices/alertSlice'
import { getDrivers } from '../../services/driverService'
import { selectBookingData, setBookingData } from '../../redux/slices/bookingSice'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getReviews } from '../../services/vehicleService'
import Review from '../customUI/reviewShow'
interface props {
    open: boolean
    close: () => void
    //   data: IuserRes | undefined
    //   reload:()=>void
}

const DriverSelection: React.FC<props> = ({ open, close }) => {
    const dispatch = useDispatch()
    const [data, setData] = useState<IdriverRes[]>()
    const [reviews,setReveiws] = useState<IreviewRes[]>([])
    const booking = useSelector(selectBookingData)
    const navigate = useNavigate()
    useEffect(() => {
        const fetch = async () => {
            try {

                const res = await getDrivers()
                setData(res.data.data)
                const res1 = await getReviews();
                console.log(res1.data.data);
                
                const reviews = res1.data.data.filter((item: IreviewRes) => item.vehicle === false);
                setReveiws(reviews)
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
    const getRate = (data:IdriverRes)=>{
        const rdata = reviews.filter((item)=>item.driverId._id === data._id)
         if (rdata.length === 0) {
             return 0;
         }
 
         const total = rdata.reduce((acc: number, review: IreviewRes) => acc + review.rating, 0);
         console.log(total, 'done');
 
         return Math.round(total / reviews.length)
         }
    const handleSubmit = async (id: any) => {
        const data = {
            ...booking,
            driver: id
        }
        localStorage.setItem('booking', JSON.stringify(data))
        dispatch(setBookingData(data))
        close()
        navigate('/cofirmBooking')
    }

    return (

        <div
            role="dialog"
            id="modal-example"
            aria-hidden="true"
            // style={{ display: 'none'  }}
            className={` ${open ? 'flex' : 'hidden'} modal fixed top-0 left-0 z-50 w-screen h-screen bg-black/30  items-center flex-col justify-center p-6 fade`}
            tabIndex={-1}
        >
            <div className="bg-custom h-11/12  overflow-auto shadow-md rounded px-20 pt-10 pb-20 mb-4 flex flex-col my-2">
                <div className='flex justify-between container mt-5 mb-5'>
                    <h1 className='kanit-regular text-xl text-white '>Choose Driver </h1>
                    <button onClick={() => close()} className="  bg-red-500 kanit-regular w-fit  opacity-100 hover:opacity-100 text-white hover:text-gray-900 rounded-md px-5 py-1 ">
                        close
                    </button>

                </div>
                <div className="bg-white h-fit w-full mx-auto overflow-y-auto shadow-sm rounded-2xl px-20 pt-10 pb-20 mt-4  flex flex-col ">
                    {

                        data && data[0] ? (
                            data.map((item, index) => (


                                <div key={index} className='w-full mt-5 border rounded-lg border-custom lg:h-44 md:h-hauto h-auto '>
                                    <div className='h-2/6 hidden  md:grid lg:grid lg:grid-cols-5  rounded-t-lg bg-custom'>
                                        <div className='col-span-1 flex justify-center items-center rounded-t-md '>
                                            <span className='text-white text-lg kanit-light text-start'>Image  </span>
                                        </div>
                                        <div className='col-span-1 flex justify-start items-center  '>
                                            <span className='text-white text-lg kanit-light text-center'>Driver Name</span>
                                        </div>
                                        <div className='col-span-1 flex justify-start items-center  '>
                                            <span className='text-white text-lg kanit-light text-center'>Experiance</span>
                                        </div>
                                        <div className='col-span-1 flex justify-start items-center  '>
                                            <span className='text-white text-lg kanit-light text-center'>Age</span>
                                        </div>
                                        <div className='col-span-1 flex justify-center items-center rounded-t-md '>
                                            <span className='text-white text-lg kanit-light text-center'>Book</span>
                                        </div>

                                    </div>
                                    <div className='h-4/6  grid grid-cols-6'>
                                        <div className='col-span-1 flex flex-col justify-evenly  items-center'>
                                            <div className="relative w-16 h-16">
                                                <img src={item.image} alt="Innova" className="w-full h-full object-cover rounded-md" />
                                            </div>                                    </div>
                                        <div className='col-span-1 flex flex-col justify-evenly  items-start'>

                                            <p className='kanit-regular text-md '>{item.driverName}</p>

                                        </div>
                                        <div className='col-span-1 flex flex-col justify-evenly  items-center'>

                                            <p className='kanit-regular text-md '>{item.exp} yr</p>

                                        </div>
                                        <div className='col-span-1 flex flex-col justify-evenly  items-start'>

                                            <p className='kanit-regular text-md '>{item.age}</p>

                                        </div>
                                        <div className='col-span-1 flex flex-col justify-evenly  items-start'>

                                            <Review rate={getRate(item)} totalStars={5}/>

                                        </div>

                                        <div className='col-span-1 flex flex-col justify-evenly items-center'>

                                            <button onClick={() => handleSubmit(item._id)} className="  bg-blue-600 kanit-light text-sm mr-4  opacity-100 hover:opacity-100 text-white hover:text-gray-900 rounded-md px-5 py-2 mb-2 ">
                                                select driver
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

        </div>

    )
}

export default DriverSelection
