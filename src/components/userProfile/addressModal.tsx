import React, { useEffect, useState } from 'react'
import { Iaddress, IuserEdit, IuserRes } from '../../interfaces'
import { error } from 'console'
import { useDispatch } from 'react-redux'
import { showAlert } from '../../redux/slices/alertSlice'
import { updateAddress, updateProfile } from '../../services/userServices'
import { statesInIndia } from '../../constants/states'
interface props {
  open: boolean
  close: () => void
  data: IuserRes | undefined
  reload:()=>void
}

const AddressModal: React.FC<props> = ({ open, close, data,reload }) => {
  const dispatch = useDispatch()
  const [submitData, setSubmitData] = useState<Iaddress>()
  const [errors, setErrors] = useState<{
    locality: string,
    city: string,
    house: string,
    state: string,
    pincode: string
  }>()
  useEffect(() => {
    setSubmitData(data?.address);
  }, [data])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSubmitData((prevData) => ({
      ...prevData!,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {

    // if (!submitData?.locality || submitData?.locality.length < 4) {
    //   setErrors({
    //     locality: 'Locality should be at least 4 characters',
    //     city: '',
    // house: '',
    // state: '',
    // pincode: ''
    //   })
    //   return
    // }


    
    // if (!submitData?.house || submitData?.house.length < 4) {
    //   setErrors({
    //     locality:'',
    //     city: '',
    // house: 'Please enter a house or appartment',
    // state: '',
    // pincode: ''
    //   })
    //   return
    // }

    // if(!submitData?.city || submitData.city.length <4){
    //     setErrors({
    //       locality:'',
    //     city: 'city must be at least 4 characters',
    // house: '',
    // state: '',
    // pincode: ''
    //     })
    //     return;
      
    // }

    
    // if (!submitData?.pincode || !parseInt(submitData.pincode) ) {
    //   setErrors({
    //     locality:'',
    //     city: 'city must be at least 4 characters',
    // house: '',
    // state: '',
    // pincode: 'Pincode must be at least 6 characters'
    //   })
    //   return
    // }
    

    try{
      const res = await updateAddress(submitData)
      reload()
      dispatch(showAlert({head:'Hisgrace Account updated',content:'Your account details had been updated successfully',color:'blue'}))
      close()

    }catch(err:any){
      console.log(err);
      
      // dispatch(showAlert({head:'Hisgrace Profile Update Incompleted',content:err.response.data.message,color:'red'}))

      close()
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
      <div className="bg-custom h-11/12 overflow-auto shadow-md rounded px-20 pt-10 pb-20 mb-4 flex flex-col my-2">
        <button onClick={() => close()} className="ml-auto bg-red-500 kanit-regular w-fit  opacity-100 hover:opacity-100 text-white hover:text-gray-900 rounded-md px-10 py-2 ">
          Close
        </button>
        <h1 className='text-2xl kanit-regular mb-6 text-white'>User Address</h1>
        <div className="-mx-3 md:flex mb-6">
          <div className="md:w-full px-3 mb-6 md:mb-0">
            <label className="block text-start uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-first-name">
              Locality Place
            </label>
            <input
              onChange={handleChange}
              value={submitData?.locality} className={` ${errors?.locality ? 'border border-red-600' : ''} appearance-none block w-full bg-grey-lighter text-black border border-red rounded py-3 px-4 mb-3`} id="grid-first-name" name='locality' type="text" placeholder="Please enter your name" />
            <p className="text-red-500 text-sm">{errors?.locality}</p>
          </div>

        </div>
        <div className="-mx-3 md:flex mb-6">
          <div className="md:w-full   px-3">
            <label className="block text-start uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-password">
               House / Appartment 
            </label>
            <input
              onChange={handleChange}
              name='house'
              value={submitData?.house} className={` ${errors?.house ? 'border  border-red-600' : ''} appearance-none block w-full bg-grey-lighter text-black border border-red rounded py-3 px-4 mb-3`} id="grid-password" type="text" placeholder='Enter your email address' />
            <p className="text-red-500 text-sm  ">{errors?.house}</p>

          </div>
        </div>

        <div className="-mx-3 md:flex mb-6">
          <div className="md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block text-start uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-city">
              City
            </label>
            <input
              onChange={handleChange}
              name='city'
              value={submitData?.city} className={` ${errors?.city ? 'border border-red-600' : ''} block w-full bg-grey-lighter text-black   rounded py-3 px-4`} id="grid-city" type="text" placeholder="Provide your age" />
            <p className="text-red-500 text-sm">{errors?.city}</p>
          </div>
          <div className="md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-state">
              State
            </label>
            <div className="relative">
              <select
              required
                onChange={handleChange}
                name='state'
                value={submitData?.state} className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-black py-3 px-4 pr-8 rounded" id="grid-state">
                <option value={''}>Select State</option>
                {
                    statesInIndia.map((item,index)=>(
                        <option key={index} value={item}>{item}</option>

                    ))
                }
              </select>
              <div className="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-black">
                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
              </div>
            </div>
          </div>
    
        </div>
        <div className="-mx-3 md:flex mb-6">
          <div className="md:w-full px-3">
            <label className="block text-start uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-password">
              Pincode
            </label>
            <input
              onChange={handleChange}
              name='pincode'
              value={submitData?.pincode} className={` ${errors?.pincode ? 'border border-red-600' : ''} appearance-none block w-full bg-grey-lighter text-black border border-grey-lighter rounded py-3 px-4 mb-3`} id="grid-password" type="tel" placeholder='Enter your mobile number ' />
            <p className="text-red-500 text-sm">{errors?.pincode}</p>

          </div>
        </div>
        {/* <div className="-mx-3 md:flex mb-6">
          <div className="md:w-full px-3">
            <label className="block text-start uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-password">
              Alternative Phone No.
            </label>
            <input
              onChange={handleChange}
              name='secondaryMobile'
              value={submitData?.secondaryMobile} className={` ${errors?.secondaryMobile ? 'border border-red-600' : ''} appearance-none block w-full bg-grey-lighter text-black border border-grey-lighter rounded py-3 px-4 mb-3`} id="grid-password" type="tel" placeholder='Enter your mobile number ' />
                            <p className="text-red-500 text-sm">{errors?.secondaryMobile}</p>

          </div>
        </div> */}
        <button onClick={handleSubmit} className=" bg-orange-500 kanit-regular  opacity-100 hover:opacity-100 text-white hover:text-gray-900 rounded-md px-10 py-2 ">
          Set Address
        </button>



      </div>

    </div>

  )
}

export default AddressModal
