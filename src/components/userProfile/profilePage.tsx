import React from 'react'
import { IuserRes } from '../../interfaces'
import QuoteComponent from '../customUI/quote'

interface props {
    user:IuserRes | undefined
    setEdit:()=>void
    setAddress:()=>void
}

const ProfilePage:React.FC<props> = ({user,setEdit,setAddress})=> {
    
  return (
    <div className="flex flex-col h-full items-center justify-evenly bg-custom text-center text-md overflow-auto shadow-md">
            <QuoteComponent name={user?.name} />
            <section className="component h-auto w-11/12 gap-5 grid grid-cols-2 rounded-md p-2  ">

              <div style={{boxShadow:""}} className='bg-white shadow col-span-2  shadow-white  rounded-md'>
                <h1 className='kanit-regular  text-custom text-xl mt-3 '>User Details</h1>
                <div className=' p-5 mx-1 mb-2 flex  justify-between items-start md:mx-10'>
                  <h1 className='text-xl mt-3 kanit-light text-custom'>Full Name : {user?.name}</h1>
                  <h1 className='text-xl mt-3 kanit-light text-custom'>Email : {user?.email}</h1>
                  <h1 className='text-xl mt-3 kanit-light text-custom'>Mobile Number : {user?.mobile ? user.mobile : 'Nill'}</h1>
                  
                </div>
                <div className=' p-5 mx-1 mb-2 flex  justify-between items-start md:mx-10'>
                  <h1 className='text-xl mt-3 kanit-light text-custom'>secondary Number : {user?.secondaryMobile ? user.secondaryMobile : 'NILL'}</h1>
                <h1 className='text-xl mt-3 kanit-light text-custom'>Age : {user?.age ? user.age : 'Nill'}</h1>
                  <h1 className='text-xl mt-3 kanit-light text-custom'>Gender : {user?.gender ? user.gender : 'NILL'}</h1>
                  <h1 className='text-xl mt-3 kanit-light text-custom'>Language : {user?.language ? user.language : 'NILL'}</h1>
                  
                </div>
                <button onClick={() => {
                  setEdit()
                }} className="mb-5  bg-custom kanit-regular  opacity-100 hover:opacity-100 text-white hover:text-gray-900 rounded-md px-10 py-2 ">
                  Edit Profile
                </button>
              </div>

              {/* <div className='bg-white rounded-md'>
                <h1 className='kanit-regular text-xl mt-3 text-custom'>Address Details</h1>
                <div className=' p-5 mx-1 mb-2 flex flex-col justify-between items-center md:mx-10'>
                  <div className=' p-5 mx-1 mb-2 flex flex-col justify-between items-start md:mx-10'>
                  <h1 className='text-xl mt-3 kanit-light text-custom'>Locality : {user?.address?.locality}</h1>
                  <h1 className='text-xl mt-3 kanit-light text-custom'>Houser/Appartment  : {user?.address?.house}</h1>
                  <h1 className='text-xl mt-3 kanit-light text-custom'>City : {user?.address?.city}</h1>
                  <h1 className='text-xl mt-3 kanit-light text-custom'>State : {user?.address?.state}</h1>
                  <h1 className='text-xl mt-3 kanit-light text-custom'>Pincode : {user?.address?.pincode}</h1>
                  

                </div>
                  <button onClick={() => {
                    setAddress()
                  }} className="mt-5  bg-custom kanit-regular  opacity-100 hover:opacity-100 text-white hover:text-gray-900 rounded-md px-10 py-2 ">
                    Setup address
                  </button>
                </div>
              </div> */}
            </section>
          </div>
  )
}

export default ProfilePage
