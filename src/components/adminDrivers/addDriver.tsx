import React, { ChangeEvent, ChangeEventHandler, useState } from 'react';

import { addVehicle } from '../../services/vehicleService';
import { useNavigate } from 'react-router-dom';
import { Idriver } from '../../interfaces';
import { addDriver } from '../../services/driverService';
import Alert from '../customUI/alert';
import { showAlert } from '../../redux/slices/alertSlice';
import { useDispatch } from 'react-redux';


interface ModalProps {
    reload: () => void;
    loader: () => void
    hide: () => void
}


const Modal: React.FC<ModalProps> = ({loader,reload,hide}) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [imagePreviews, setImagePreviews] = useState<string[]>([])
    const [errors, setErrors] = useState<{ name: string, age: string, mobile: string, exp: string, driverBata: string }>()
    const [driver, setDriver] = useState<Idriver>({
        name: '',
        vehicles: ['SEDAN'],
        age: '',
        gender: '',
        exp: '',
        driverBata: '',
        mobile: '',
        image: ''
    })
    const navigate = useNavigate()
   const dispatch = useDispatch()

    const handleSubmit = async () => {
        if (driver?.name.trim().length < 4) {
            setErrors(
                {
                    name: 'Name must be at least 4 characters long',
                    age: '',
                    mobile: '',
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
                    exp: 'Please provide a valid experiance it should be greater than zero',
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
                    exp: '',
                    driverBata: 'Pplease provide a valid driver bata amount it should be greater than zero '
                }
            )
            return
        }
        setShowModal(false)
        loader()
        const data = {
            name: driver.name,
            vehicles: driver.vehicles,
            age: driver.age,
            gender: driver.gender,
            exp: parseInt(driver.exp),
            image: driver.image,
            mobile: driver.mobile,
            driverBata: driver.driverBata
        }

        try{
            const res = await addDriver(data)
            hide()
            reload()
            dispatch(showAlert({head:"Hisgrace Admin Driver Added",content:'A new driver successfully added to hisgrace application.',color:'green'}))

        }catch(err:any){
            console.log(err);
            
            hide()
            if(err.response.data.role === 'mobile'){
                setShowModal(true)
                setErrors({
                    name:'',
                    age:'',
                    mobile:err.response.data.message,
                    exp:'',
                    driverBata:""
                })
            }
        }


    }


    const closeModal = () => {
        setShowModal(false);
        document.body.style.overflow = '';
        document.body.classList.remove('astroui-modal-open');
    };

    const openModal = () => {
        setShowModal(true);
        document.body.style.overflow = 'hidden';
        document.body.classList.add('astroui-modal-open');
    };


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


    return (
        <>
        
            <button
                data-toggle="modal"
                type="button"
                className=""
                onClick={openModal}
            >
                <span className="flex items-center justify-center space-x-2">
                    Add Driver
                </span>
            </button>

            {showModal && (
                <div
                    role="dialog"
                    id="modal-example"
                    aria-hidden="false"
                    style={{ display: 'flex' }}
                    className="modal fixed top-0 left-0 z-50 w-screen h-screen bg-black/30 flex items-center flex-col justify-center p-6 fade"
                    tabIndex={-1}
                >
                    <div className="absolute top-0 left-0 z-[0] w-full h-full" tabIndex={-1}></div>

                    <article
                        className="modal-content flex w-4/6 lg:w-2/6 h-5/6 flex-col overflow-auto  relative m-0 rounded-md bg-white sm:my-16"
                        aria-labelledby="modal-title"
                        aria-describedby="modal-body"
                    >




                        <header className="flex p-4 items-center justify-between">
                            <h2 className="m-0 text-xl font-medium max-w-[calc(100%_-_3rem)]">Modal title</h2>
                            <button
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
                            </button>
                        </header>
                        <main className="relative flex-[1_1_auto] p-4 w-full " >
                            <label htmlFor="input-group-1" className="block mb-2 text-sm font-medium text-black text-start">Driver Name</label>
                            <div className="relative mb-6">

                                <input onChange={(e) => { setDriver(prev => ({ ...prev, name: e.target.value })) }} value={driver.name} type="text" name='name' id="input-group-1" className={`bg-gray-50 border border-gray-300 text-gray-900 ${errors?.name ? 'border-red-500' : ''} text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5   `} placeholder="Driver name" />
                                <p className='text-red-500 kanit-regular text-start ml-2'>{errors?.name}</p>
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
                                type="button"
                                className="flex items-center justify-center px-4 font-medium bg-gray-200 text-black h-9 rounded-md rounded md hover:bg-gray-300 transition-all duration-300"
                                onClick={closeModal}
                            >
                                <span className="flex items-center justify-center space-x-2">Close</span>
                            </button>
                            <button

                                onClick={handleSubmit}
                                type="button"
                                className="flex items-center justify-center px-4 font-medium bg-violet-700 text-white h-9 rounded-md rounded md hover:bg-violet-800 transition-all duration-300"
                            >
                                <span className="flex items-center justify-center space-x-2">Add Driver</span>
                            </button>
                        </footer>



                    </article>
                </div>
            )}




        </>
    );
};

export default Modal;
