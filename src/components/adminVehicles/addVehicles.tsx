import React, { ChangeEvent, ChangeEventHandler, useCallback, useRef, useState } from 'react';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import { addVehicle } from '../../services/vehicleService';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showAlert } from '../../redux/slices/alertSlice';
interface ModalProps {
    reload: () => void;
    loader: () => void
    hide: () => void
}


const Modal: React.FC<ModalProps> = ({ reload, loader, hide }) => {
    const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>('');
    const cropperRef = useRef<HTMLImageElement>(null);
    const [croppedImage, setCroppedImage] = useState<string>('');
    const [showModal, setShowModal] = useState<boolean>(false);
    const [name, setName] = useState('')
    const [type, setType] = useState('SEDAN')
    const [fuel, setFuel] = useState('')
    const [seat, setSeat] = useState(0)
    const [sprice, setSprice] = useState('')
    const [price, setPrice] = useState('')
    const [desc, setDesc] = useState('')
    const [selectedFiles, setSelectedFiles] = useState('');
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [file, setFile] = useState('')
    const [button,setButton] = useState(true)

    const [nameErr, setNameErr] = useState('')
    const [seatErr, setSeatErr] = useState('')
    const [fuelErr, setFuelErr] = useState('')
    const [priceErr, setPriceErr] = useState('')
    const [spriceErr, setSpriceErr] = useState('')
    const [descErr, setDescErr] = useState('')
    const [gErr, setGErr] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSubmit = async () => {
        console.log(selectedFiles)

        if (!name.trim()) {
            setNameErr('Please provide a vehicle name')
            return
        }
        if (!fuel.trim()) {
            setFuelErr('Please provide a fuel type')
            return
        }
        if (seat === 0) {
            setSeatErr('Please provide your vehicle seat capacity')
            return
        }
        if (!sprice || parseInt(sprice) < 0) {
            setSpriceErr('Please provide your vehicle charge')
            return
        }
        if (!price || parseInt(price) < 0) {
            setPriceErr('Please provide your vehicle charge')
            return
        }
        if (!desc.trim()) {
            setSeatErr('Please provide your vehicle description')
            return
        }

        const data = {
            name: name,
            type: type,
            fuel: fuel,
            seat: seat,
            sprice: parseFloat(sprice),
            price: parseFloat(price),
            desc: desc,
            image: croppedImage
        }

        loader()
        setShowModal(false)
        try {
            const res = await addVehicle(data)
            hide()
            reload()
        } catch (err:any) {
            console.log(err);
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

    const handleCropImage = () => {
        if (cropperRef.current) {
            const cropper = new Cropper(cropperRef.current, {
                aspectRatio: 1,
                viewMode: 2,
                crop: () => {
                    const canvas = cropper.getCroppedCanvas();
                    if (canvas) {
                        setCroppedImage(canvas.toDataURL('image/jpeg'));
                    }
                },
            });
        }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            const file = e.target.files[0];

            reader.onload = () => {
                setImageSrc(reader.result);
            };

            reader.readAsDataURL(file);
        }
    };

    const handleCompleteCrop = () => {
        setSelectedFiles(croppedImage)
        setImageSrc('')
        setButton(false)
    };

    const handleRemoveImage = () => {
        setImageSrc('');
        setCroppedImage('');
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
                    Add Vehicle
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
                            <label htmlFor="input-group-1" className="block mb-2 text-sm font-medium text-black text-start">vehicle Name</label>
                            <div className="relative mb-6">

                                <input onChange={(e) => { setName(e.target.value) }} value={name} type="text" name='name' id="input-group-1" className={`bg-gray-50 border border-gray-300 text-gray-900 ${nameErr ? 'border-red-500' : ''} text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5   `} placeholder="Vehicle name" />
                                <p className='text-red-500 kanit-regular text-start ml-2'>{nameErr}</p>
                            </div>
                            <label htmlFor="input-group-1" className="block mb-2 text-sm font-medium text-black text-start">vehicle Type</label>
                            <div className="relative mb-6">

                                <select name="type" onChange={(e) => {
                                    setType(e.target.value)
                                }}
                                    value={type}
                                    className="text-black  p-4 w-full border-2 border-gray-300 mb-5 rounded-md">
                                    <option value='SEDAN' selected>SEDAN</option>
                                    <option value='SUV'>SUV</option>
                                    <option value='HATCHBACK'>HATCHBACK</option>
                                    <option value='VAN'>VAN</option>
                                    <option value='BUS'>BUS</option>
                                </select>
                            </div>
                            <label htmlFor="input-group-1" className="block mb-2 text-sm font-medium text-black text-start">seat capacity</label>
                            <div className="relative mb-6">

                                <input value={seat} type="number" onChange={(e) => setSeat(parseInt(e.target.value))} name='seat' id="input-group-1" className={`bg-gray-50 border ${seatErr ? 'border-red-500' : 'border-gray-300'}  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5   " placeholder="seat capacity`} />
                                <p className='text-red-500 kanit-regular text-start ml-2'>{seatErr}</p>
                            </div>

                            <label htmlFor="input-group-1" className="block mb-2 text-sm font-medium text-black text-start">Fuel Type</label>
                            <div className="relative mb-6">

                                <input value={fuel} type="text" name='fuel' onChange={(e) => { setFuel(e.target.value) }} id="input-group-1" className={`bg-gray-50 border ${fuelErr ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 `} placeholder="Fuel type" />
                                <p className='text-red-500 kanit-regular text-start ml-2'>{fuelErr}</p>
                            </div>

                            <label htmlFor="input-group-1" className="block mb-2 text-sm font-medium text-black text-start">Price - 100km</label>
                            <div className="relative mb-6">

                                <input value={sprice} type="number" name='sprice' onChange={(e) => setSprice(e.target.value)} id="input-group-1" className={`bg-gray-50 border ${spriceErr ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 `} placeholder="Price for first 100 km" />
                                <p className='text-red-500 kanit-regular text-start ml-2'>{spriceErr}</p>
                            </div>

                            <label htmlFor="input-group-1" className="block mb-2 text-sm font-medium text-black text-start">Price/km</label>
                            <div className="relative mb-6">

                                <input value={price} type="number" name='price' onChange={(e) => setPrice(e.target.value)} id="input-group-1" className={`bg-gray-50 border ${priceErr ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 `} placeholder="Price for each km" />
                                <p className='text-red-500 kanit-regular text-start ml-2'>{priceErr}</p>
                            </div>

                            <label htmlFor="input-group-1" className="block mb-2 text-sm font-medium text-black text-start">vehicle Description</label>
                            <div className="relative mb-6">

                                <input value={desc} type="text" name='desc' onChange={(e) => {
                                    setDesc(e.target.value)
                                }} id="input-group-1" className={`bg-gray-50 border ${descErr ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5`} placeholder="A description for vehicle" />
                                <p className='text-red-500 kanit-regular text-start ml-2'>{descErr}</p>
                            </div>

                            <label htmlFor="input-group-1" className="block mb-2 text-sm font-medium text-black text-start">vehicle Images</label>
                            <div className="relative mb-6">

                                <input type="file" accept="image/*"
                                    onChange={
                                        handleFileChange
                                         
                                    } name='image'
                                    id="input-image"
                                    required
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5   " placeholder="A description for vehicle" />

                            </div>

                            {imageSrc && (
                <div className="mt-4">
                    <img ref={cropperRef} src={imageSrc.toString()} alt="Upload Preview" style={{ maxWidth: '50%' }} onLoad={handleCropImage} />
                </div>
            )}

            {croppedImage && (
                <div className="mt-4">
                    <h2 className="text-lg font-medium text-black">Cropped Image Preview</h2>
                    <img src={croppedImage} alt="Cropped Image" style={{ maxWidth: '50%' }} />
                    <div>
                        {button?
                        <button onClick={handleCompleteCrop} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mr-2">
                            Complete
                        </button>
                        :
                        <button onClick={handleRemoveImage} className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md">
                            Delete
                        </button>
                        }
                    </div>
                </div>
            )}

                            {/* {imagePreviews.length > 0 && (
                                <div className="image-preview">
                                    {imagePreviews.map((preview, index) => (
                                        <div key={index} className="preview-item">
                                            <img src={preview} className='max-h-48' onClick={handleRemoveImage} alt={`Preview ${index}`} />
                                           
                                        </div>
                                    ))}
                                </div>
                            )} */}


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
                                <span className="flex items-center justify-center space-x-2">Add Vehicle</span>
                            </button>
                        </footer>



                    </article>
                </div>
            )}




        </>
    );
};

export default Modal;
