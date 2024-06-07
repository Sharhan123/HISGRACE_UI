import React, { useEffect, useState } from 'react'
import { IuserEdit, IuserRes } from '../../interfaces'
import { useDispatch } from 'react-redux'
import { showAlert } from '../../redux/slices/alertSlice'
import { updateProfile } from '../../services/userServices'
interface props {
  open: boolean
  close: () => void
  data: IuserRes | undefined
  reload:()=>void
}

const UserModal: React.FC<props> = ({ open, close, data,reload }) => { 
  const dispatch = useDispatch()
  const [submitData, setSubmitData] = useState<IuserEdit>()
  const [errors, setErrors] = useState<{
    name: string,
    email: string,
    age: string,
    mobile: string,
    secondaryMobile: string
  }>()
  useEffect(() => {
    setSubmitData({
      _id: data?._id,
      name: data ? data.name : '',
      email: data ? data.email : '',
      mobile: data?.mobile,
      secondaryMobile: data?.secondaryMobile,
      age: data ? data.age : '',
      gender: data?.gender,
      language: data?.language,

    });
  }, [data])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSubmitData((prevData) => ({
      ...prevData!,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {

    if (!submitData?.name || submitData?.name.length < 4 || !/^[A-Za-z\s]+$/.test(submitData?.name)) {
      setErrors({
        name: 'Name should be at least 4 characters and it should not be Numbers or special characters',
        email: '',
        age: ''
        , mobile: '',
        secondaryMobile: ''
      })
      return
    }


    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!submitData?.email || !emailPattern.test(submitData?.email)) {
      setErrors({
        name: '',
        email: 'Invalid email address format provided',
        age: ''
        , mobile: '',
        secondaryMobile: ''
      })
      return
    }

    if(submitData?.age){
    const age = parseInt(submitData?.age as string);
    console.log(age);
    
      if (isNaN(age) || age <= 0) {
        setErrors({
          name: '',
          email: '',
          age: 'Age must be a valid number greater than 0'
          , mobile: '',
          secondaryMobile: ''
        })
        return;
      }
    }

    const mobilePattern = /^[1-9]\d{9}$/;
    if (submitData?.mobile && !mobilePattern.test(submitData?.mobile)) {
      setErrors({
        name: '',
        email: '',
        age: ''
        , mobile: 'Mobile number must be 10 digits and not all zeros',
        secondaryMobile: ''
      })
      return
    }
    if (submitData?.secondaryMobile && !mobilePattern.test(submitData?.secondaryMobile)) {
      setErrors({
        name: '',
        email: '',
        age: ''
        , mobile: 'Mobile number must be 10 digits and not all zeros',
        secondaryMobile: ''
      })
      return
    }

    try{
       await updateProfile(submitData)
      reload()
      setErrors({name:'',email:'',mobile:'',secondaryMobile:'',age:''})
      dispatch(showAlert({head:'Hisgrace Account updated',content:'Your account details had been updated successfully',color:'blue'}))
      close()

    }catch(err:any){
      
      dispatch(showAlert({head:'Hisgrace Profile Update Incompleted',content:err.response.data.message,color:'red'}))

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
        <h1 className='text-2xl kanit-regular mb-6 text-white'>User Details</h1>
        <div className="-mx-3 md:flex mb-6">
          <div className="md:w-full px-3 mb-6 md:mb-0">
            <label className="block text-start uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-first-name">
              UserName
            </label>
            <input
              onChange={handleChange}
              value={submitData?.name} className={` ${errors?.name ? 'border border-red-600' : ''} appearance-none block w-full bg-grey-lighter text-black border border-red rounded py-3 px-4 mb-3`} id="grid-first-name" name='name' type="text" placeholder="Please enter your name" />
            <p className="text-red-500 text-sm">{errors?.name}</p>
          </div>

        </div>
        <div className="-mx-3 md:flex mb-6">
          <div className="md:w-full   px-3">
            <label className="block text-start uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-password">
              Email Address - <span className='kanit-light text-yellow-400'>Remember your email address of this account will be chnaged </span>
            </label>
            <input
              onChange={handleChange}
              name='email'
              value={submitData?.email} className={` ${errors?.email ? 'border  border-red-600' : ''} appearance-none block w-full bg-grey-lighter text-black border border-red rounded py-3 px-4 mb-3`} id="grid-password" type="text" placeholder='Enter your email address' />
            <p className="text-red-500 text-sm  ">{errors?.email}</p>

          </div>
        </div>

        <div className="-mx-3 md:flex mb-6">
          <div className="md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block text-start uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-city">
              Age
            </label>
            <input
              onChange={handleChange}
              name='age'
              value={submitData?.age} className={` ${errors?.age ? 'border border-red-600' : ''} block w-full bg-grey-lighter text-black   rounded py-3 px-4`} id="grid-city" type="text" placeholder="Provide your age" />
            <p className="text-red-500 text-sm">{errors?.age}</p>
          </div>
          <div className="md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-state">
              Gender
            </label>
            <div className="relative">
              <select
                onChange={handleChange}
                name='gender'
                value={submitData?.gender} className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-black py-3 px-4 pr-8 rounded" id="grid-state">
                <option value={''}>Select your Gender</option>
                <option value={'MALE'}>Male</option>
                <option value={'FEMALE'}>Female</option>
              </select>
              <div className="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-black">
                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-zip">
              Language You can speack
            </label>
            <div className="relative">
              <select
                onChange={handleChange}
                name='language'
                value={submitData?.language} className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-black py-3 px-4 pr-8 rounded" id="grid-state">
                <option value={''}>Select your Language</option>
                <option value={'ENGLISH'}>ENGLISH</option>
                <option value={'ARABIC'}>ARABIC</option>
                <option value={'HINDI'}>HINDI</option>
                <option value={'TAMIL'}>TAMIL</option>
                <option value={'MALAYALAM'}>MALAYALAM</option>
              </select>
              <div className="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-black">
                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
              </div>
            </div>                </div>
        </div>
        <div className="-mx-3 md:flex mb-6">
          <div className="md:w-full px-3">
            <label className="block text-start uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-password">
              Phone No.
            </label>
            <input
              onChange={handleChange}
              name='mobile'
              value={submitData?.mobile} className={` ${errors?.mobile ? 'border border-red-600' : ''} appearance-none block w-full bg-grey-lighter text-black border border-grey-lighter rounded py-3 px-4 mb-3`} id="grid-password" type="tel" placeholder='Enter your mobile number ' />
            <p className="text-red-500 text-sm">{errors?.mobile}</p>

          </div>
        </div>
        <div className="-mx-3 md:flex mb-6">
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
        </div>
        <button onClick={handleSubmit} className=" bg-orange-500 kanit-regular  opacity-100 hover:opacity-100 text-white hover:text-gray-900 rounded-md px-10 py-2 ">
          Edit Profile
        </button>



      </div>

    </div>

  )
}

export default UserModal
