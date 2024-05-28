import React, { ChangeEvent,  useEffect, useRef, useState } from 'react';
import {  getVehicles } from '../../services/vehicleService';
import { useNavigate } from 'react-router-dom';
import { addPackage } from '../../services/packageService';
import { Ivehicle } from '../../interfaces';
import { showAlert } from '../../redux/slices/alertSlice';
import { useDispatch } from 'react-redux';

interface ModalProps {
    reload: () => void; 
    loader:()=>void
    hide:()=> void
}

const Modal: React.FC<ModalProps> = ({  reload ,loader,hide }) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [vehicles,setVehicles] = useState<Ivehicle[]>([])
    const [name, setName] = useState('')
    const [car, setCar] = useState('')
   const [location,setLocation]=useState('')
    const [days, setDays] = useState(0)
    const [dayPrice, setDayPrice] = useState('')
    const [price, setPrice] = useState('')
    const [desc, setDesc] = useState('')
    const [selectedFiles, setSelectedFiles] = useState('');
    const [imagePreviews, setImagePreviews] = useState<string[]>([]); 
    const [file,setFile] = useState('')

    const [nameErr, setNameErr] = useState('')
    const [daysErr, setDaysErr] = useState('')
    const [priceErr, setPriceErr] = useState('')
    const [spriceErr, setSpriceErr] = useState('')
    const [descErr, setDescErr] = useState('')
    const [locationErr,setLocationErr] = useState('')
    const [typeErr, setTypeErr] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(()=>{
        const fetch = async ()=>{
            try{
                loader()
                const res = await getVehicles()

                console.log(res.data.vehicles);
                hide()
                setVehicles(res.data.data) 
            }catch(err:any){
                console.log(err);
                dispatch(showAlert({color:"red",content:err.message}))

            }
        }
        fetch()
    },[])

    const handleSubmit = async () => {
        console.log(selectedFiles)

        if (!name.trim()) {
            setNameErr('Please provide a vehicle name')
            if(inputRef.current){
                inputRef.current.focus()
            }
            return
        }
        if (!location.trim()) {
            setLocationErr('Please provide locations')
            return
        }
        
        if (days === 0) {
            setDaysErr('Please provide your days count ')
            return
        }
        if (!dayPrice || parseInt(dayPrice) < 0) {
            setSpriceErr('Please provide your vehicle charge')
            return
        }
        if (!price || parseInt(price) < 0) {
            setPriceErr('Please provide your vehicle charge')
            return
        }
        if(!car){
            setTypeErr('Please provide your vehicle ')
            return 
        }
        if (!desc.trim()) {
            setDescErr('Please provide your vehicle description')
            return
        }

        const data = {
            title: name,
            car: car,
            days: days,
            total: parseFloat(price),
            perDay: parseFloat(dayPrice),
            location:location,
            desc: desc,
            image: selectedFiles
        }
        setShowModal(false)
        loader()
        try {
            const res = await addPackage(data)
            
            hide()
            reload()
        } catch (err:any) {
            console.log(err)
            dispatch(showAlert({color:"red",content:err.message}))

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
            const files =Array.from(e.target.files)
            const previews = files.map((file) => URL.createObjectURL(file));
            setImagePreviews(previews)
            const file = e.target.files[0];
            setFile(file.name) 
            const reader = new FileReader();

            reader.onload = (event) => {
                const base64String = event.target?.result as string;
                setSelectedFiles(base64String)
            };

            reader.readAsDataURL(file)
        }
    };
    const handleRemoveImage = () => {
        if (selectedFiles) {
          
          setSelectedFiles('');
          
          setImagePreviews([]);
          const fileInput = document.getElementById('input-group-1') as HTMLInputElement;
          fileInput.files =null;
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
                    Add Package
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
                        className="modal-content flex w-2/6 h-5/6 flex-col overflow-auto  relative m-0 rounded-md bg-white sm:my-16"
                        aria-labelledby="modal-title"
                        aria-describedby="modal-body"
                    >




                        <header className="flex p-4 items-center justify-between">
                            <h2 className="m-0 text-xl font-medium max-w-[calc(100%_-_3rem)]">Add Vehicle</h2>
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
                            <label htmlFor="input-group-1" className="block mb-2 text-sm font-medium text-black text-start">Title</label>
                            <div className="relative mb-6">

                                <input ref={inputRef} onChange={(e) => { setName(e.target.value) }} value={name} type="text" name='name' id="input-group-1" className={`bg-gray-50 border border-gray-300 text-gray-900 ${nameErr ? 'border-red-500 ' : ''} text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5   `} placeholder="Package title " />
                                <p className='text-red-500 kanit-regular text-start ml-2'>{nameErr}</p>
                            </div>
                            <label htmlFor="input-group-1" className="block mb-2 text-sm font-medium text-black text-start">vehicle </label>
                            <div className="relative mb-6">

                                <select name="type" required onChange={(e) => {
                                    setCar(e.target.value)
                                }}
                                    value={car}
                                    className={`text-black  p-4 w-full border-2 ${typeErr?'border-red-500':'border-gray-300'} mb-5 rounded-md`}>
                                    <option value={''}>Select vehicle</option>
                                    {vehicles.map((vehicleName, index) => (
                    <option key={index} value={vehicleName._id.toString()}>
                        {vehicleName.vehicleName}
                    </option>
                ))}
                                        
                                    
                                   
                                </select>
                                <p className='text-red-500 kanit-regular text-start ml-2'>{typeErr}</p>

                            </div>
                            <label htmlFor="input-group-1" className="block mb-2 text-sm font-medium text-black text-start">Days</label>
                            <div className="relative mb-6">

                                <input value={days} type="number" min={1}  onChange={(e) => setDays(parseInt(e.target.value))} name='seat' id="input-group-1" className={`bg-gray-50 border ${daysErr ? 'border-red-500' : 'border-gray-300'}  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5`} placeholder='Enter the count of days ' />
                                <p className='text-red-500 kanit-regular text-start ml-2'>{daysErr}</p>
                            </div>
                            <label htmlFor="input-group-1" className="block mb-2 text-sm font-medium text-black text-start">Locations</label>
                            <div className="relative mb-6">

                                <input value={location} type="text" required  onChange={(e) => setLocation(e.target.value)} name='seat' id="input-group-1" className={`bg-gray-50 border ${locationErr ? 'border-red-500' : 'border-gray-300'}  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5`} placeholder='Enter the locations covering seprate by `-` ' />
                                <p className='text-red-500 kanit-regular text-start ml-2'>{locationErr}</p>
                            </div>

                            

                            <label htmlFor="input-group-1" className="block mb-2 text-sm font-medium text-black text-start">Total Price</label>
                            <div className="relative mb-6">

                                <input value={price} type="number" min={1} name='sprice' onChange={(e) => setPrice(e.target.value)} id="input-group-1" className={`bg-gray-50 border ${priceErr ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 `} placeholder="Enter your total amount" />
                                <p className='text-red-500 kanit-regular text-start ml-2'>{priceErr}</p>
                            </div>

                            <label htmlFor="input-group-1" className="block mb-2 text-sm font-medium text-black text-start">Price/day</label>
                            <div className="relative mb-6">

                                <input value={dayPrice} type="number" min={1} name='price' onChange={(e) => setDayPrice(e.target.value)} id="input-group-1" className={`bg-gray-50 border ${spriceErr ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 `} placeholder="Enter the price for per day " />
                                <p className='text-red-500 kanit-regular text-start ml-2'>{spriceErr}</p>
                            </div>

                            <label htmlFor="input-group-1" className="block mb-2 text-sm font-medium text-black text-start">Package Description</label>
                            <div className="relative mb-6">

                                <input value={desc} type="text" name='desc' onChange={(e) => {
                                    setDesc(e.target.value)
                                }} id="input-group-1" className={`bg-gray-50 border ${descErr ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5`} placeholder="A description for package includes the plan " />
                                <p className='text-red-500 kanit-regular text-start ml-2'>{descErr}</p>
                            </div>

                            <label htmlFor="input-group-1" className="block mb-2 text-sm font-medium text-black text-start">Package Images</label>
                            <div className="relative mb-6">

                                <input type="file" accept="image/*"
                                    onChange={handleFileChange} name='image'   id="input-group-1" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 "  />
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
                                className="flex items-center justify-center px-4 font-medium bg-gray-200 text-black h-9 rounded-md  md hover:bg-gray-300 transition-all duration-300"
                                onClick={closeModal}
                            >
                                <span className="flex items-center justify-center space-x-2">Close</span>
                            </button>
                            <button

                                onClick={handleSubmit}
                                type="button"
                                className="flex items-center justify-center px-4 font-medium bg-violet-700 text-white h-9 rounded-md  md hover:bg-violet-800 transition-all duration-300"
                            >
                                <span className="flex items-center justify-center space-x-2">Add Package</span>
                            </button>
                        </footer>



                    </article>
                </div>
            )}




        </>
    );
};

export default Modal;
