import React, { ChangeEvent, ChangeEventHandler, useState } from 'react';

import { addVehicle } from '../../services/vehicleService';
import { useNavigate } from 'react-router-dom';
import { Idriver } from '../../interfaces';
import { addDriver, driverLogin } from '../../services/driverService';
import Alert from '../customUI/alert';
import { showAlert } from '../../redux/slices/alertSlice';
import { useDispatch } from 'react-redux';
import Loader from '../customUI/loader';
import { setFlagsFromString } from 'v8';


interface ModalProps {
    // reload: () => void;
    // loader: () => void
    // hide: () => void
}


const Modal: React.FC<ModalProps> = () => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [imagePreviews, setImagePreviews] = useState<string[]>([])
    const [login,setLogin] = useState(false)
    const [loader,setLoader]  = useState(false)
    const [errors, setErrors] = useState<{ name: string, age: string, email:string,password:string,mobile: string, exp: string, driverBata: string }>()
    
    const [driver, setDriver] = useState<Idriver>({
        name: '',
        email:'',
        vehicles: ['SEDAN'],
        age: '',
        gender: 'MALE',
        exp: '',
        driverBata: '',
        mobile: '',
        image: '',
        password:''
    })
    const navigate = useNavigate()
   const dispatch = useDispatch()

    const handleSubmit = async () => {
        if (driver?.name.trim().length < 4) {
            setErrors(
                {
                    name: 'Name must be at least 4 characters long',
                    age: '',
                    email:'',
                    mobile: '',
                    password:'',
                    exp: '',
                    driverBata: ''
                }
            )
            return
        }

        const ageNum = parseInt(driver?.age);

        if (isNaN(ageNum) || ageNum <= 0) {
            setErrors(
                {
                    name: '',
                    age: 'Please provide a valid age (must be a number greater than zero)',
                    mobile: '',
                    exp: '',
                    password:'',
                    email:'',
                    driverBata: ''
                }
            )
            return

        }


        const expNum = parseInt(driver?.exp);
        if (isNaN(expNum) || expNum <= 0) {
            setErrors(
                {
                    name: '',
                    age: '',
                    mobile: '',
                    email:'',
                    password:'',
                    exp: 'Please provide a valid experiance it should be greater than zero',
                    driverBata: ''
                }
            )
            return
        }
        function isValidEmail(email: string) {
            const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return pattern.test(email);
          }
          if (!driver.email || !isValidEmail(driver.email)) {
            setErrors(
                {
                    name: '',
                    age: '',
                    mobile: '',
                    password:'',
                    exp: '',
                    email:'Invalid email address format',
                    driverBata: ''
                }
            )
            return
          }

        const mobileNum = driver?.mobile.trim();
        if (!/^\d{10}$/.test(mobileNum) || /^0{10}$/.test(mobileNum)) {
            setErrors(
                {
                    name: '',
                    age: '',
                    mobile: 'Please provide a valid mobile number it should none zero 10 digits',
                    exp: '',
                    password:'',
                    email:'',
                    driverBata: ''
                }
            )
            return
        }

        const driverBataNum = parseInt(driver?.driverBata);
        if (isNaN(driverBataNum) || driverBataNum <= 0) {
            setErrors(
                {
                    name: '',
                    age: '',
                    mobile: '',
                    password:'',
                    email:'',
                    exp: '',
                    driverBata: 'Pplease provide a valid driver bata amount it should be greater than zero '
                }
            )
            return
        }
        setShowModal(false)
        
        const data = {
            name: driver.name,
            email:driver.email,
            vehicles: driver.vehicles,
            age: driver.age,
            gender: driver.gender,
            exp: parseInt(driver.exp),
            password:driver.password,
            image: driver.image,
            mobile: driver.mobile,
            driverBata: driver.driverBata
        }
        setLoader(true)
        try{
            const res = await addDriver(data)
            localStorage.setItem('driver',res.data.data.email)
            setLoader(true)
            navigate('/driver/verification')
            // dispatch(showAlert({head:"Hisgrace Admin Driver Added",content:'A new driver successfully added to hisgrace application.',color:'green'}))
        }catch(err:any){
            console.log(err);
            
           
            if(err.response.data.role === 'email'){
                
                setErrors({
                    name:'',
                    age:'',
                    email:err.response.data.message,
                    password:'',
                    mobile:'',
                    exp:'',
                    driverBata:""
                })
            }
        }


    }


    const handleChangeLogin = ()=>{
        setLogin(!login)
    }


    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const files = Array.from(e.target.files)
            const previews = files.map((file) => URL.createObjectURL(file));
            setImagePreviews(previews)
            const file = e.target.files[0];
            const reader = new FileReader();

            reader.onload = (event) => {
                const base64String = event.target?.result as string;
                setDriver(prev => ({
                    ...prev,
                    image: base64String
                }))
            };

            reader.readAsDataURL(file)
        }
    };
    const handleRemoveImage = () => {
        if (driver.image) {

            setDriver(prev => ({
                ...prev,
                image: ''
            }));

            setImagePreviews([]);
            const fileInput = document.getElementById('input-group-1') as HTMLInputElement;
            fileInput.files = null;
        }
    };
    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedType = event.target.value;
        const isChecked = event.target.checked;

        if (isChecked) {
            setDriver(prevTypes => ({ ...prevTypes, vehicles: [...driver.vehicles, selectedType] }))
        } else {
            setDriver(prevTypes => ({ ...prevTypes, vehicles: [...driver.vehicles.filter((item) => item !== selectedType)] }))
        }
    };

const handleLogin = async ()=>{
    try{
        function isValidEmail(email: string) {
            const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return pattern.test(email);
          }
          if (!driver.email || !isValidEmail(driver.email)) {
            setErrors(
                {
                    name: '',
                    age: '',
                    mobile: '',
                    password:'',
                    exp: '',
                    email:'Invalid email address format',
                    driverBata: ''
                }
            )
            return
          }
          if(!driver.password){
            setErrors(
                {
                    name: '',
                    age: '',
                    mobile: '',
                    password:'Please enter a valid password',
                    exp: '',
                    email:'',
                    driverBata: ''
                }
            )
            return 
          }
          const res = await driverLogin({email:driver.email,password:driver.password})
          localStorage.setItem('driver',res.data.token)
          navigate('/driver/dashboard')
    }catch(err){
        console.log(err);
        
    }
}

    return (
        <>
        
        

            
                
                   {
                    login?(
                        <div className="w-3/6 h-screen mx-auto flex items-center justify-center px-5 py-5">
            <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden" >
                <div className="md:flex w-full">
                    {/* <div className="hidden md:block w-1/2 bg-custom py-10 px-10">
                        
                    </div> */}
                    <div className="w-full md:w-2/2 py-10 px-5 md:px-10">
                        <div className="text-center mb-10">
                            <h1 className="font-bold text-3xl text-gray-900">DRIVER</h1>
                            <p onClick={()=>{
                        console.log('..............');
                        
                        handleChangeLogin()
                    }} >
                        New Driver? Register 
                    </p>
                        </div>
                        <div>
                            <div className="flex -mx-3">
                                <div className="w-full px-3 mb-12">
                                    <label htmlFor="" className="text-xs font-semibold px-1">Email</label>
                                    <div className="flex">
                                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-email-outline text-gray-400 text-lg"></i></div>
                                        <input type="email" onChange={(e) => { setDriver(prev => ({ ...prev, email: e.target.value })) }} value={driver.email} className={`w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 ${errors?.email?'border-red-500':'border-gray-200'} outline-none focus:border-indigo-500`} placeholder="" />
                                    
                                    </div>
                                        <p className='text-red-600 text-sm kanit-regular '>{errors?.email}</p>
                                </div>
                            </div>
                            <div className="flex -mx-3">
                                <div className="w-full px-3 mb-12">
                                    <label htmlFor="" className="text-xs font-semibold px-1">Password</label>
                                    <div className="flex">
                                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-lock-outline text-gray-400 text-lg"></i></div>
                                        <input type="password" onChange={(e) => { setDriver(prev => ({ ...prev, password: e.target.value })) }} value={driver.password} className={`w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 ${errors?.password?'border-red-500':'border-gray-200'} outline-none focus:border-indigo-500`} placeholder="************" />
                                    </div>
                                        <p className='text-red-600 text-sm kanit-regular '>{errors?.password}</p>
                                </div>
                            </div>
                            <div className="flex -mx-3">
                                <div className="w-full px-3 mb-5">
                                    <button  className="block w-full max-w-xs mx-auto bg-custom hover:bg-custom focus:bg-custom text-white rounded-lg px-3 py-3 font-semibold" onClick={handleLogin}>LOGIN</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
                    ):(
                        <div
                    role="dialog"
                    id="modal-example"
                    aria-hidden="false"
                    style={{ display: 'flex' }}
                    className="modal fixed top-0 left-0 z-50 w-screen h-screen  flex items-center flex-col justify-center p-6 fade"
                    tabIndex={-1}
                >
                    <div className="absolute top-0 left-0 z-[0] w-full h-full" tabIndex={-1}></div>
                    
                        <article
                        className="modal-content flex w-4/6 lg:w-3/6  flex-col no-scroll px-5 py-2 overflow-auto  relative m-0 rounded-md bg-white sm:my-16"
                        aria-labelledby="modal-title"
                        aria-describedby="modal-body"
                    >




                        <header className="flex p-4 items-center flex-col justify-center">
                            <p onClick={handleChangeLogin} className='bg-red-500 px-2 py-1  rounded text-white cursor-pointer'>Login if you are already driver</p>
                            <h2 className="m-0 text-xl kanit-medium max-w-[calc(100%_-_3rem)]">Register as New Driver</h2>
                            {/* <button
                                type="button"
                                className="flex items-center justify-center w-8 h-8 rounded-full bg-transparent transition-colors duration-300 hover:bg-black/10"
                                onClick={closeModal}
                                aria-label="Close"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="22"
                                    height="22"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#000000"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    style={{ '--size': '32rem' } as React.CSSProperties}
                                >
                                    <line x1="18" y1="6" x2="6" y2="18" ></line>
                                    <line x1="6" y1="6" x2="18" y2="18" ></line>
                                </svg>
                            </button> */}
                        </header>
                        <main className="relative flex-[1_1_auto] p-4 w-full " >
                            <label htmlFor="input-group-1" className="block mb-2 text-sm font-medium text-black text-start">Driver Name</label>
                            <div className="relative mb-6">

                                <input onChange={(e) => { setDriver(prev => ({ ...prev, name: e.target.value })) }} value={driver.name} type="text" name='name' id="input-group-1" className={`bg-gray-50 border border-gray-300 text-gray-900 ${errors?.name ? 'border-red-500' : ''} text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5   `} placeholder="Driver name" />
                                <p className='text-red-500 kanit-regular text-start ml-2'>{errors?.name}</p>
                            </div>
                            <label htmlFor="input-group-1" className="block mb-2 text-sm font-medium text-black text-start">Email address</label>
                            <div className="relative mb-6">

                                <input onChange={(e) => { setDriver(prev => ({ ...prev, email: e.target.value })) }} value={driver.email} type="text" name='email' id="input-group-1" className={`bg-gray-50 border border-gray-300 text-gray-900 ${errors?.email ? 'border-red-500' : ''} text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5   `} placeholder="Email Address" />
                                <p className='text-red-500 kanit-regular text-start ml-2'>{errors?.email}</p>
                            </div>
                            <label htmlFor="input-group-1" className="block mb-2 text-sm font-medium text-black text-start">Password</label>
                            <div className="relative mb-6">

                                <input onChange={(e) => { setDriver(prev => ({ ...prev, password: e.target.value })) }} value={driver.password} type="text" name='email' id="input-group-1" className={`bg-gray-50 border border-gray-300 text-gray-900 ${errors?.password ? 'border-red-500' : ''} text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5   `} placeholder="* * * * " />
                                <p className='text-red-500 kanit-regular text-start ml-2'>{errors?.password}</p>
                            </div>
                            <label htmlFor="input-group-1" className="block mb-2 text-sm font-medium text-black text-start">vehicle Types</label>
                            <div className="relative mb-6">

                                <div className="space-y-2 flex justify-between">
                                    <label className="inline-flex mt-1 items-center">
                                        <input
                                            type="checkbox"
                                            name="vehicle-type"
                                            value="SEDAN"
                                            checked
                                        // onChange={handleCheckboxChange}
                                        />
                                        <span className="ml-2 text-black kanit-regular">SEDAN</span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="checkbox"
                                            name="vehicle-type"
                                            value="SUV"
                                            checked={driver.vehicles.includes('SUV')}
                                            onChange={handleCheckboxChange}
                                        />
                                        <span className="ml-2 text-black kanit-regular">SUV</span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="checkbox"
                                            name="vehicle-type"
                                            value="HATCHBACK"
                                            checked={driver.vehicles.includes('HATCHBACK')}
                                            onChange={handleCheckboxChange}
                                        />
                                        <span className="ml-2 text-black kanit-regular">HATCHBACK</span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="checkbox"
                                            name="vehicle-type"
                                            value="VAN"
                                            checked={driver.vehicles.includes('VAN')}
                                            onChange={handleCheckboxChange}
                                        />
                                        <span className="ml-2 text-black kanit-regular">VAN</span>
                                    </label>
                                    <label className=" ml-2 inline-flex items-center">
                                        <input
                                            type="checkbox"
                                            name="vehicle-type"
                                            value="BUS"
                                            checked={driver.vehicles.includes('BUS')}
                                            onChange={handleCheckboxChange}
                                        />
                                        <span className="ml-2 text-black kanit-regular">BUS</span>
                                    </label>
                                </div>
                            </div>
                            <label htmlFor="input-group-1" className="block  mb-2 text-sm font-medium text-black text-start">Age </label>
                            <div className="relative mb-6">

                                <input value={driver.age} type="text" onChange={(e) => setDriver(prev => ({ ...prev, age: e.target.value }))} name='seat' id="input-group-1" className={`bg-gray-50 border ${errors?.age ? 'border-red-500' : 'border-gray-300'}  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5`}    placeholder="Please enter your age" />
                                <p className='text-red-500 kanit-regular text-start ml-2'>{errors?.age}</p>
                            </div>

                            <label htmlFor="input-group-1" className="block mb-2 text-sm font-medium text-black text-start">Gender</label>
                            <div className="relative mb-6">

                                <select name="type" onChange={(e) => {
                                    setDriver(prev => ({ ...prev, gender: e.target.value }))
                                }}
                                    value={driver.gender}
                                    className="text-black  p-4 w-full border-2 border-gray-300 mb-5 rounded-md">
                                    <option value='MALE' selected>MALE</option>
                                    <option value='FEMALE'>FEMALE</option>
                                </select>
                            </div>

                            <label htmlFor="input-group-1" className="block mb-2 text-sm font-medium text-black text-start">Mobile No.</label>
                            <div className="relative mb-6">

                                <input value={driver.mobile} type="text" name='sprice' onChange={(e) => setDriver(prev => ({ ...prev, mobile: e.target.value }))} id="input-group-1" className={`bg-gray-50 border ${errors?.mobile ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 `} placeholder="Enter drivers mobile number " />
                                <p className='text-red-500 kanit-regular text-start ml-2'>{errors?.mobile}</p>
                            </div>

                            <label htmlFor="input-group-1" className="block mb-2 text-sm font-medium text-black text-start">Experiance</label>
                            <div className="relative mb-6">

                                <input value={driver.exp} type="text" name='price' onChange={(e) => setDriver(prev => ({ ...prev, exp: e.target.value }))} id="input-group-1" className={`bg-gray-50 border ${errors?.exp ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 `} placeholder="Enter driver's experiance in years" />
                                <p className='text-red-500 kanit-regular text-start ml-2'>{errors?.exp}</p>
                            </div>

                            <label htmlFor="input-group-1" className="block mb-2 text-sm font-medium text-black text-start">Driver bata</label>
                            <div className="relative mb-6">

                                <input value={driver.driverBata} type="text" name='desc' onChange={(e) => {
                                    setDriver(prev => ({ ...prev, driverBata: e.target.value }))
                                }} id="input-group-1" className={`bg-gray-50 border ${errors?.driverBata ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5`} placeholder="A description for vehicle" />
                                <p className='text-red-500 kanit-regular text-start ml-2'>{errors?.driverBata}</p>
                            </div>

                            <label htmlFor="input-group-1" className="block mb-2 text-sm font-medium text-black text-start">Driver Image </label>
                            <div className="relative mb-6">

                                <input type="file" accept="image/*"
                                    onChange={handleFileChange} name='image' id="input-group-1" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5   " placeholder="A description for vehicle" />
                            </div>


                            {imagePreviews.length > 0 && (
                                <div className="image-preview">
                                    {imagePreviews.map((preview, index) => (
                                        <div key={index} className="preview-item">
                                            <img src={preview} className='max-h-48' onClick={handleRemoveImage} alt={`Preview ${index}`} />

                                        </div>
                                    ))}
                                </div>
                            )}


                        </main>

                        <footer className="flex flex-shrink-0 flex-wrap items-center justify-end flex-row p-4 gap-1" >
                            
                            <button

                                onClick={handleSubmit}
                                type="button"
                                className="flex items-center w-full justify-center px-4 font-medium bg-gradient-to-br from-custom to-blue-900 text-white h-9 rounded-md rounded md hover:bg-violet-800 transition-all duration-300"
                            >
                                <span className="flex items-center justify-center space-x-2">{loader?<Loader open={loader}/>:'Add Driver'}</span>
                            </button>
                        </footer>



                    </article>
                </div>
                    )
                   }
                    
            




        </>
    );
};

export default Modal;
