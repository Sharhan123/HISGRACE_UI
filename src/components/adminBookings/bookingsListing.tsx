import React, {  useEffect, useState } from 'react';
import { IbookingRes } from '../../interfaces';
import { showAlert } from '../../redux/slices/alertSlice';
import { useDispatch } from 'react-redux';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import ReactDatePicker from 'react-datepicker';
import { bookingStatus, getBookings } from '../../services/bookingsServices';
import BookingDetails from '../customUI/bookingDetails';



const RecordTable: React.FC = () => {
    const [data, setdata] = useState<IbookingRes[]>([])
    const [showData, setShowData] = useState<IbookingRes[]>([])
    const [showLoading, setShowLoading] = useState(false)
    const [selected, setSelected] = useState('Active')
    const [open,setOpen] = useState(false)
    const fetch = async () => {
        try {
            setShowLoading(true)
            const res = await getBookings()
            setdata(res.data.data)
            const filtered = res.data.data.filter((item: IbookingRes) => (item.status === selected))
            setShowData(filtered)
            setShowLoading(false)
        } catch (err:any) {
            dispatch(showAlert({color:"red",content:err.message}))
            console.log(err)
        }
    }
    const dispatch = useDispatch()
    useEffect(() => {


        fetch()


    }, [])
   
   



    const handleCancel = async (id:any)=>{
        try{
             await bookingStatus({id:id,status:'Cancelled'})
             fetch()
             setSelected('Cancelled')
        }catch(err:any){
            console.log(err);
            dispatch(showAlert({color:"red",content:err.message}))

        }
    }

    useEffect(() => {
        const filtered = data.filter((item: IbookingRes) => (item.status === selected))
        setShowData(filtered)
    }, [selected])

    return (
        <>
            {
                showLoading && (
                    <div
                        role="dialog"
                        id="modal-example"
                        aria-hidden="false"
                        style={{ display: 'flex' }}
                        className="modal fixed top-0 left-0 z-50 w-screen h-screen bg-black/30 flex items-center flex-col justify-center p-6 fade"
                        tabIndex={-1}
                    >
                        <div className="border-t-transparent border-solid animate-spin  rounded-full border-custom border-8 h-20 w-20"></div>

                    </div>
                )
            }

            <section className="container px-4 mx-auto">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <div>
                        <div className="flex mt-5 items-center gap-x-3">
                            <h2 className="text-2xl font-medium text-gray-800 ">Vehicles</h2>
                            <span className="px-3 py-1 text-sm text-custom bg-blue-100 rounded-full ">Active</span>
                        </div>
                    </div>


                </div>
                <div className="mt-6  md:flex md:items-center md:justify-between">
                    <div className="grid grid-cols-4 w-full overflow-hidden bg-white border divide-x rounded-lg  rtl:flex-row-reverse ">


                        <button onClick={() => setSelected('Active')} className={`px-5  py-2 text-xs kanit-regular ${selected === 'Active' ? 'bg-custom text-white' : ''} text-blue-600 transition-colors duration-200 sm:text-sm `}>
                            ACTIVE
                        </button>
                        <button onClick={() => setSelected('Cancelled')} className={`px-5  py-2 text-xs kanit-regular ${selected === 'Cancelled' ? 'bg-red-600 text-white' : ''} text-red-500 transition-colors duration-200 sm:text-sm `}>
                            CANCELLED
                        </button>
                        <button onClick={() => setSelected('Completed')} className={`px-5  py-2 text-xs kanit-regular ${selected === 'Completed' ? 'bg-green text-white' : ''} text-green transition-colors duration-200 sm:text-sm `}>
                            COMPLETED
                        </button>

                        <button onClick={() => setSelected('pending')} className={`px-5  py-2 text-xs uppercase kanit-regular ${selected === 'pending' ? 'bg-blue-600 text-white' : ''} text-blue-500 transition-colors duration-200 sm:text-sm `}>
                            CANCELLATION REQUESTS
                        </button>
                    </div>

                    
                </div>
                <div className="flex flex-col mt-6">
                    <div className="-mx-4 -my-2 overflow-x-auto scroll-hidden  sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden border border-gray-200  md:rounded-lg">
                                <table className="min-w-full   divide-y  divide-gray-200 ">
                                    <thead className="bg-gray-100  ">
                                        <tr>
                                            <th scope="col" className="text-center py-3.5 px-4 text-lg kanit-medium  font-normal  rtl:text-right text-black ">
                                                Itenary
                                            </th>
                                            <th scope="col" className="text-center py-3.5 px-4 text-lg kanit-medium  font-normal  rtl:text-right text-black ">
                                                Booking Name
                                            </th>



                                            <th scope="col" className="px-4 py-3.5 text-lg kanit-medium font-normal text-center rtl:text-right text-black ">Contact No.</th>
                                            <th scope="col" className="px-4 py-3.5 text-lg kanit-medium font-normal text-center rtl:text-right text-black ">Date</th>
                                            <th scope="col" className="px-4 py-3.5 text-lg kanit-medium font-normal text-center rtl:text-right text-black">
                                                Vehicle
                                            </th>
                                            <th scope="col" className="text-center kanit-medium px-12 py-3.5 text-lg font-normal  rtl:text-right text-black ">
                                                Amount
                                            </th>

                                            <th scope="col" colSpan={2} className="px-4 py-3.5 text-lg kanit-medium font-normal text-center rtl:text-right text-black ">Actions</th>
                                            


                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-500 ">
                                        {showData && showData.length > 0 ? (
                                            showData.map((item, index) => (
                                                <>
                                                <BookingDetails showModal={open} booking={item} close={()=>setOpen(false)}/>
                                                <tr key={index}>

                                                    <td className="px-4 py-4 text-sm font-medium whitespace-nowrap text-center">
                                                        <div>
                                                            <h2 className="text-xl text-start kanit-regular text-black">{item.from.name || item.from.city} <CompareArrowsIcon className='text-blue-600 mr-2 ml-2' /> {item.to.name || item.to.city}</h2>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 text-sm font-medium text-center whitespace-nowrap">
                                                        <div>
                                                            <h2 className="text-md kanit-regular bg-slate-800 px-2 rounded text-white">{item.pickupDetails.bookingName}</h2>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 text-sm font-medium text-center whitespace-nowrap">
                                                        <div>
                                                            <h2 className="text-lg kanit-regular px-2 rounded text-yellow-500">{item.pickupDetails.mobile}</h2>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 text-sm font-medium whitespace-nowrap text-center">
                                                        <div>
                                                            <ReactDatePicker
                                                                selected={item.period.date}
                                                                onChange={() => ''}
                                                                disabled
                                                                dateFormat="dd MMM yy"
                                                                className="text-red-600 text-center kanit-regular text-lg outline-none bg-transparent"


                                                            />
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 text-sm font-medium whitespace-nowrap text-center">
                                                        <div>
                                                            <h2 className="text-xl kanit-regular text-black">{item.vehicle.vehicleName}</h2>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 text-sm font-medium whitespace-nowrap text-center">
                                                        <div>
                                                            <h2 className="text-xl kanit-regular text-black">₹ {item.totalPrice}</h2>
                                                        </div>
                                                    </td>
                                                    {
                                                        selected === 'pending'?(
                                                            <td className=" text-sm font-medium whitespace-nowrap text-center">
                                                        <div>
                                                            <button onClick={()=>handleCancel(item._id)} className={`text-md px-2 w-full h-8 rounded-md text-white bg-red-600 kanit-regular `}>Confirm Cancel</button>
                                                        </div>
                                                    </td>
                                                        ):(

                                                    <td className=" text-sm font-medium whitespace-nowrap text-center">
                                                        <div>
                                                            <button className={`text-md px-2 w-full h-8 rounded-md  kanit-regular  ${selected === 'Cancelled' ?'text-red-600 border border-red-600':''} ${selected === 'Completed' ?'text-green border border-green':''} ${selected === 'Active' ?'text-blue-500 border border-blue-500':''}  `}>{item.status}</button>
                                                        </div>
                                                    </td>
                                                        )
                                                    }
                                                    <td className="px-4 py-4 text-sm font-medium whitespace-nowrap text-center">
                                                        <div>
                                                            <button onClick={()=>setOpen(true)} className="text-md w-full h-8 px-2 rounded-md bg-orange-600 kanit-regular text-white">View details</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                                </>
                                            ))

                                        ) : (
                                            <tr>
                                                <td colSpan={8} className="px-4 py-4 text-sm font-medium text-center">
                                                    No datas available
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>


                                </table>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}








export default RecordTable;
