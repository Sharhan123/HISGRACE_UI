import React, {  useEffect, useState } from 'react';
import {  IpackageBookingRes } from '../../interfaces';
import { showAlert } from '../../redux/slices/alertSlice';
import { useDispatch } from 'react-redux';
import ReactDatePicker from 'react-datepicker';
import { PackagebookingStatus, getPackageBookings } from '../../services/packageBooking';



const RecordTable: React.FC = () => {
    const [data, setdata] = useState<IpackageBookingRes[]>([])
    const [showData, setShowData] = useState<IpackageBookingRes[]>([])
    const [showLoading, setShowLoading] = useState(false)
    const [selected, setSelected] = useState('Active')

    const fetch = async () => {  
        try {
            setShowLoading(true)
            const res = await getPackageBookings()
            setdata(res.data.data)
            const filtered = res.data.data.filter((item: IpackageBookingRes) => (item.status === selected))
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

    useEffect(() => {
        const filtered = data.filter((item: IpackageBookingRes) => (item.status === selected))
        setShowData(filtered)
    }, [selected])

const setStatus = async (id:any,status:string)=>{
    try{
         await PackagebookingStatus({id:id,status:status})
        fetch()
    }catch(err:any){
        console.log(err);
        dispatch(showAlert({content:err.message,color:'red'}))
        
    }
}

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
                            <h2 className="text-2xl font-medium text-gray-800 ">Package Bookings</h2>
                            <span className="px-3 py-1 text-sm text-custom bg-blue-100 rounded-full ">Active</span>
                        </div>
                        {/* <h3 className="mt-10 text-md text-black text-xl kanit-regular">Filter Bookings</h3> */}
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
                        <button onClick={() => setSelected('Pending')} className={`px-5  py-2 text-xs uppercase kanit-regular ${selected === 'Pending' ? 'bg-blue-600 text-white' : ''} text-blue-500 transition-colors duration-200 sm:text-sm `}>
                            PACKAGE REQUESTS
                        </button>
                    </div>

                    {/* <div className="relative flex items-center mt-4 md:mt-0">

                        <div className="relative w-full min-w-[300px] h-10">
                            <input  className="peer w-full h-full bg-transparent text-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-500" placeholder="" />
                            <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal peer-placeholder-shown:text-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-blue-500 before:border-blue-gray-200 peer-focus:before:border-blue-500 after:border-blue-gray-200 peer-focus:after:border-blue-500">Search here</label>
                        </div>
                    </div> */}
                </div>
                <div className="flex flex-col mt-6">
                    <div className="-mx-4 -my-2 overflow-x-auto scroll-hidden  sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden border border-gray-200  md:rounded-lg">
                                <table className="min-w-full   divide-y  divide-gray-200 ">
                                    <thead className="bg-gray-100  ">
                                        <tr>
                                            <th scope="col" className="text-center py-3.5 px-4 text-lg kanit-medium  font-normal  rtl:text-right text-black ">
                                                Date
                                            </th>
                                            <th scope="col" className="text-center py-3.5 px-4 text-lg kanit-medium  font-normal  rtl:text-right text-black ">
                                                Booking Name
                                            </th>



                                            <th scope="col" className="px-4 py-3.5 text-lg kanit-medium font-normal text-center rtl:text-right text-black ">Contact No.</th>
                                            <th scope="col" className="px-4 py-3.5 text-lg kanit-medium font-normal text-center rtl:text-right text-black ">Package</th>
                                            <th scope="col" className="px-4 py-3.5 text-lg kanit-medium font-normal text-center rtl:text-right text-black">
                                                Vehicle
                                            </th>
                                            <th scope="col" className="text-center kanit-medium px-12 py-3.5 text-lg font-normal  rtl:text-right text-black ">
                                                Amount
                                            </th>

                                            <th scope="col" colSpan={2} className="px-4 py-3.5 text-lg kanit-medium font-normal text-center rtl:text-right text-black ">Actions</th>
                                            {/* <th scope="col" className="px-4 py-3.5 text-lg kanit-medium font-normal text-center rtl:text-right text-black ">Delete</th> */}
                                            {/* <th scope="col" className="px-4 py-3.5 text-lg kanit-medium font-normal text-center rtl:text-right text-black ">Status</th> */}



                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-500 ">
                                        {showData && showData.length > 0 ? (
                                            showData.map((item, index) => (
                                                <>
                                                {/* <BookingDetails showModal={open} booking={item} close={()=>setOpen(false)}/> */}
                                                <tr key={index}>
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
                                                            <h2 className="text-xl text-start kanit-regular text-black">{item.pickupDetails.bookingName}</h2>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 text-sm font-medium text-center whitespace-nowrap">
                                                        <div>
                                                            <h2 className="text-md kanit-regular bg-slate-800 px-2 rounded text-white">{item.pickupDetails.mobile}</h2>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 text-sm font-medium text-center whitespace-nowrap">
                                                        <div>
                                                            <h2 className="text-md kanit-regular bg-slate-800 px-2 rounded text-white">{item.package.title}</h2>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 text-sm font-medium text-center whitespace-nowrap">
                                                        <div>
                                                            <h2 className="text-lg kanit-regular px-2 rounded text-yellow-500">{item.package.vehicle.vehicleName}</h2>
                                                        </div>
                                                    </td>
                                    
                                                    <td className="px-4 py-4 text-sm font-medium whitespace-nowrap text-center">
                                                        <div>
                                                            <h2 className="text-xl kanit-regular text-black">₹ {item.package.total}</h2>
                                                        </div>
                                                    </td>
                                                    
                                                    {
                                                        selected === 'Pending'?(
                                                            <>
                                                            <td className=" text-sm font-medium whitespace-nowrap text-center">
                                                        <div>
                                                            <button onClick={()=>setStatus(item._id,'Rejected')} className={`text-md px-2 w-full h-8 rounded-md text-white bg-red-600 kanit-regular `}>Reject</button>
                                                        </div>
                                                    </td>
                                                            <td className=" text-sm font-medium whitespace-nowrap text-center">
                                                        <div>
                                                            <button onClick={()=>setStatus(item._id,'Active')} className={`text-md px-2 w-full h-8 rounded-md text-white bg-green kanit-regular `}>Confirm</button>
                                                        </div>
                                                    </td>
                                                    </>
                                                        ):(
                                                            <>
                                                    <td className=" text-sm font-medium whitespace-nowrap text-center">
                                                        <div>
                                                            <button className={`text-md px-2 w-full h-8 rounded-md  kanit-regular ${selected === 'Pending'?'text-blue-600 border border-blue-600':''}  ${selected === 'Cancelled' ?'text-red-600 border border-red-600':''} ${selected === 'Completed' ?'text-green border border-green':''} ${selected === 'Active' ?'text-blue-500 border border-blue-500':''}  `}>{item.status}</button>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 text-sm font-medium whitespace-nowrap text-center">
                                                        <div>
                                                            <button  className="text-md w-full h-8 px-2 rounded-md bg-orange-600 kanit-regular text-white">View details</button>
                                                        </div>
                                                    </td>
                                                    </>
                                                        )
                                                    }
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
