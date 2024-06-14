import React, { useState } from 'react'
import StarRating from '../userProfile/reviewStar';
interface props{
showModal:boolean
close:()=>void
submit:(rate:number,review:string)=>void
// booking:IbookingRes
}

const ReviewModal:React.FC<props> = ({showModal,close,submit})=>{
    const [rate,setRate] = useState(0)
    const [review,setReview] = useState('')
    const [err,setErr] = useState('')
      const handleRatingChange = (rating:number)=>{
        console.log(rating);
        setRate(rating)
      }

      const handleSubmit = ()=>{
        if(review.trim().length < 6){
          setErr('Please a write a review more tha 6 characters')
          return 
        }
        submit(rate,review)
      }
      
  return (
    <>
    {
       showModal && (
 
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30" >
              <div className="bg-white grid grid-rows-3 h-auto rounded-lg p-6 w-1/5 ">
                <h1 className='text-md items-start justify-between kanit-regular flex'>
                    <span>Rate the Trip</span>  
                    <button onClick={()=>{
                      close()
                      setRate(0)
                    }} className='kanit-regular text-red-500'>
                      close
                    </button>
                </h1>
                <span className='ml-auto kanit-regular text-custom text-md'>{rate}/5.0</span>
                <StarRating  onRatingChange={handleRatingChange} />
                <input value={review} onChange={(e)=>setReview(e.target.value)} type='text' className='border-gray-500 border rounded mt-5 px-2 py-2' placeholder='Write your review' />
                <p className='text-red-600 kanit-regular text-xs'>{err}</p>
                <span className='mt-8 flex justify-center items-center '>
                  <button onClick={handleSubmit} className='px-4 py-2 text-white rounded bg-green text-sm kanit-regular'>
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
