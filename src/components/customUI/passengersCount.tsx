import React, { useState } from 'react'
interface props {
    open: boolean
    close: () => void
    count:(data:{adult:number,child:number})=>void
}
const PassengersCount: React.FC<props> = ({ open, close,count }) => {
    const [adult, setAdult] = useState(0)
    const [child, setChild] = useState(0)
    return (
        <div className={`fixed  inset-0 ${open ? 'flex' : 'hidden'} justify-center items-center bg-gray-800 bg-opacity-50 z-50`}>
            <div className='bg-white rounded-lg p-4 w-full max-w-md'>
                <div className='mt-5 flex items-center  justify-between mb-4'>
                    <h1 className='text-center text-lg kanit-regular'>Select No.of passengers</h1>

                    <div className="relative flex items-center mt-4 md:mt-0">


                        <button onClick={() => {
                           
                            close()
                        }} className='bg-red-500 px-5 py-2 rounded-md text-white kanit-regular'>close</button>
                    </div>



                </div>
                <h1 className='text-start kanit-light'>Adults</h1>
                <div className='mt-5 flex items-center  justify-evenly mb-4'>
                    <p onClick={() => {
                        if (adult > 0) {

                            setAdult(adult - 1)
                        }
                    }} className='text-white cursor-pointer kanit-regular text-lg rounded-md w-16 text-center bg-red-600 px-3 '>-</p>
                    <p className='text-black kanit-light text-xl  px-3  '>{adult} </p>
                    <p onClick={() => setAdult(adult + 1)} className='text-white cursor-pointer kanit-light rounded-md bg-custom w-16 text-center text-xl  px-3 '>+</p>
                </div>
                <h1 className='text-start kanit-light mt-5'>Child (Below 7 yr old)</h1>
                <div className='mt-5 flex items-center  justify-evenly mb-4'>
                    <p onClick={() => {
                        if (child > 0) {

                            setChild(child - 1)
                        }
                    }} className='text-white cursor-pointer rounded-md kanit-regular text-lg w-16 text-center bg-red-600 px-3 '>-</p>

                    <p className='text-black kanit-light text-xl  px-3  '>{child}</p>
                    <p onClick={() => setChild(child + 1)} className='text-white cursor-pointer kanit-light rounded-md bg-custom w-16 text-center text-xl  px-3 '>+</p>
                </div>
                <div className="relative flex items-center justify-center mt-10  ">

                <button onClick={() => {
                     count({adult:adult,child:child})
                    close()
                }} className='bg-green px-5 py-2   rounded-md text-white kanit-regular'>Confirm</button>
                </div>
            </div>
        </div>
    )
}

export default PassengersCount
