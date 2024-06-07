import React, { useState } from 'react'
import StarRating from '../userProfile/reviewStar';
interface props{
showModal:boolean
close:()=>void
submit:(review:number)=>void
// booking:IbookingRes
}

const ReviewModal:React.FC<props> = ({showModal,close,submit})=>{
    const [rate,setRate] = useState(0)
      const handleRatingChange = (rating:number)=>{
        console.log(rating);
        setRate(rating)
      }
      
  return (
    <>
    {
       showModal && (
 
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30" >
              <div className="bg-white grid grid-rows-3 h-auto rounded-lg p-6 w-1/5 ">
                <h1 className='text-md items-start justify-between kanit-regular flex'>
                    <span>Rate the Vehicle</span>  
                    <button onClick={()=>{
                      close()
                      setRate(0)
                    }} className='kanit-regular text-red-500'>
                      close
                    </button>
                </h1>
                <span className='ml-auto kanit-regular text-custom text-md'>{rate}/5.0</span>
                <StarRating  onRatingChange={handleRatingChange} />
                <span className='mt-8 flex justify-center items-center '>
                  <button onClick={()=>submit(rate)} className='px-4 py-2 text-white rounded bg-green text-sm kanit-regular'>
                    Submit
                  </button>
                  </span>
                </div>
                </div>
    ) 
    }
    </>
  )
}

export default ReviewModal
