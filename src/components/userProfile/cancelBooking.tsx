import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { bookingStatus } from '../../services/bookingsServices';
interface props {
    open:boolean
    close:()=>void
    item:any
    reload:()=>void
}
const CancelBooking:React.FC<props> = ({open,close,item,reload}) =>{
    const [selected,setSelected] = useState('')
    const handleSubmit = async (id:any)=>{
        try{
            if(!selected){
                return
            }
            const res = await bookingStatus({id:item,status:'pending'})
            close()
            reload()
        }catch(err){
            console.log(err);
            
        }
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
      <div className="bg-white h-5/6 scroll-hidden w-auto overflow-auto justify-between shadow-md rounded px-5 pt-5 pb-20 mb-4 flex flex-col my-2">
      <CloseIcon onClick={close} className='cursor-pointer text-black ml-auto'/>
        <h1 className='mt-5 text-md kanit-regular text-black'>Please select a cancellation reason </h1>
        <div className='px-5 py-2 h-full '>
            <span className='flex gap-3 mt-5 justify-start items-center'>
                <span onClick={()=>setSelected('1')} className={`${selected === '1'?'bg-blue-600':' border border-black'} cursor-pointer  rounded-full h-3 w-3`}></span>
                <span className='kanit-light text-md text-start  text-black max-w-[30rem]'>Emergencies or unforeseen events may arise, leading to the need to cancel your taxi reservation.  </span>
            </span>
            <span className='flex gap-3 mt-5 justify-start items-center'>
            <span onClick={()=>setSelected('2')} className={`${selected === '2'?'bg-blue-600':' border border-black'} cursor-pointer  rounded-full h-3 w-3`}></span>
                <span className='kanit-light text-md text-start  text-black max-w-[30rem]'>I had canceld the trip due to personal reason</span>
            </span>
            <span className='flex gap-3 mt-5 justify-start items-center'>
            <span onClick={()=>setSelected('3')} className={`${selected === '3'?'bg-blue-600':' border border-black'} cursor-pointer  rounded-full h-3 w-3`}></span>
                <span className='kanit-light text-md text-start  text-black max-w-[30rem]'>Mistakes in booking details like date, time, or location can result in the cancellation of your taxi reservation.</span>
            </span>
            <span className='flex gap-3 mt-5 justify-start items-center'>
            <span onClick={()=>setSelected('4')} className={`${selected === '4'?'bg-blue-600':' border border-black'} cursor-pointer  rounded-full h-3 w-3`}></span>
                <span className='kanit-light text-md text-start  text-black max-w-[30rem]'>Significant delays in taxi arrival may impact your travel plans, prompting you to cancel your booking.</span>
            </span>
            <span className='flex gap-3 mt-5 justify-start items-center'>
            <span onClick={()=>setSelected('5')} className={`${selected === '5'?'bg-blue-600':' border border-black'} cursor-pointer  rounded-full h-3 w-3`}></span>
                <span className='kanit-light text-md text-start  text-black max-w-[30rem]'>Adverse weather conditions such as heavy rain, snow, or storms can influence travel decisions and lead to booking cancellations.</span>
            </span>
            <span className='flex gap-3 mt-5 justify-start items-center'>
            <span onClick={()=>setSelected('6')} className={`${selected === '6'?'bg-blue-600':' border border-black'} cursor-pointer rounded-full h-3 w-3`}></span>
                <span className='kanit-light text-md text-start  text-black max-w-[30rem]'>Unexpected costs or fare changes might prompt reconsideration of your booking</span>
            </span>
            <span className='flex gap-3 mt-5 justify-start items-center'>
            <span onClick={()=>setSelected('7')} className={`${selected === '7'?'bg-blue-600':'border border-black'} cursor-pointer  rounded-full h-3 w-3`}></span>
                <span className='kanit-light text-md text-start  text-black max-w-[30rem]'>Any technical glitches during the booking process can lead to unintentional cancellations of your taxi reservation.</span>
            </span>
            <button onClick={handleSubmit} className='px-2 py-2 bg-red-600 container mt-5 kanit-regular text-white rounded'>
                Cancel Booking
            </button>

        </div>
        </div>
        </div>
  )
}

export default CancelBooking
