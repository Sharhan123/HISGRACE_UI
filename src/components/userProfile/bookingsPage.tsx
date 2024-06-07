import React, { useEffect, useState } from 'react'
import EmployeeTable from './table'
import {  getBookingsByuser } from '../../services/bookingsServices'
import { IbookingRes } from '../../interfaces'
import { showAlert } from '../../redux/slices/alertSlice'
import { useDispatch } from 'react-redux'

const BookingsPage: React.FC = () => {
    const [selected,setSelected] = useState('Active')
    const [data,setData] = useState<IbookingRes[]>([])
    const [showData,setShowData] = useState<IbookingRes[]>([])
    const dispatch = useDispatch()
    const fetch = async ()=>{
        try{
            const res = await getBookingsByuser()
            console.log(res,'....');
            setData(res.data.data)
            const filtered = res.data.data.filter((item:IbookingRes)=>(
                item.status === 'Active'
            ))
            setShowData(filtered)
        } catch (err:any) { 
            console.error('Error fetching data:', err);
            if(err.response.data){ 
                dispatch(showAlert({content:err.response.data.message,color:'red'}))
                return 
            }
            dispatch(showAlert({content:err.message,color:'red'}))

        }
    }
    useEffect(()=>{
        fetch()
    },[])

    useEffect(()=>{
        const filtered = data.filter((item:IbookingRes)=>(item.status === selected))
        setShowData(filtered)
        
        
    },[selected])
    return (

        <div className="flex p-1 overflow-x-hidden flex-col h-full items-center justify- bg-custom text-center text-md overflow-auto shadow-md">
        {/* <h1 className='kanit-light bg-white text-black px-3 mt-2 rounded text-xl '>Your Trip Bookings</h1> */}
        <div className="mt-6  md:flex md:items-center md:justify-between">
                    <div className="grid grid-cols-4 w-full overflow-hidden bg-white border divide-x rounded-lg  rtl:flex-row-reverse ">


                        <button onClick={()=>setSelected('Active')} className={`px-5  py-2 text-xs kanit-regular ${selected === 'Active'?'bg-custom text-white':''} text-blue-600 transition-colors duration-200 sm:text-sm `}>
                            ACTIVE
                        </button>
                        <button     onClick={()=>setSelected('Cancelled')} className={`px-5  py-2 text-xs kanit-regular ${selected === 'Cancelled'?'bg-red-600 text-white':''} text-red-500 transition-colors duration-200 sm:text-sm `}>
                            CANCELLED
                        </button>
                        <button onClick={()=>setSelected('Completed')} className={`px-5  py-2 text-xs kanit-regular ${selected === 'Completed'?'bg-green text-white':''} text-green transition-colors duration-200 sm:text-sm `}>
                            COMPLETED
                        </button>

                        <button onClick={()=>setSelected('pending')} className={`px-5  py-2 text-xs uppercase kanit-regular${selected === 'Requested' ?' text-white bg-blue-600':''} text-blue-500 transition-colors duration-200 sm:text-sm `}>
                            Cancellation Request
                        </button>
                    </div>
                    </div>
        <EmployeeTable reload={fetch} data={showData} />
        </div>
    )
}

export default BookingsPage
