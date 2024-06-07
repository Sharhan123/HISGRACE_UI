import React, { ChangeEvent,  useState } from 'react';
import {  updateVehicle } from '../../services/vehicleService';
import {Ivehicle } from '../../interfaces';
import { useDispatch } from 'react-redux';
import { showAlert } from '../../redux/slices/alertSlice';
interface ModalProps {
    reload: () => void; 
    loader:()=>void
    hide:()=> void
    data:Ivehicle
}


const EditVehicle: React.FC<ModalProps> = ({reload,loader,data,hide}) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [name, setName] = useState(data.vehicleName)
    const [type, setType] = useState(data.type)
    const [fuel, setFuel] = useState(data.fuel)
    const [seat, setSeat] = useState(data.seat)
    const [sprice, setSprice] = useState(data.startingPrice)
    const [price, setPrice] = useState(data.price)
    const [desc, setDesc] = useState(data.desc)
    const [selectedFiles, setSelectedFiles] = useState(data.images);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]); 
    const [changed,setChanged] = useState(false)
    const [nameErr, setNameErr] = useState('')
    const [seatErr, setSeatErr] = useState('')
    const [fuelErr, setFuelErr] = useState('')
    const [priceErr, setPriceErr] = useState('')
    const [spriceErr, setSpriceErr] = useState('')
    const [descErr, setDescErr] = useState('')
    const [fileErr, setFileErr] = useState('')

    const dispatch = useDispatch()


    const handleSubmit = async () => {
        console.log(selectedFiles)

        if (!name.trim() || name.length < 4 || !/^[A-Za-z\s]+$/.test(name)) {
            setNameErr('Name should be at least 4 characters long and contain only letters')
                return
            }
            if (!fuel.trim() || fuel.length < 4 || !/^[A-Za-z\s]+$/.test(fuel)) {
                setFuelErr('Please provide a fuel type and it should be more than 4 letters')
                return
            }
            if (seat < 3) {
                setSeatErr('Please provide your vehicle seat capacity greater than 3')
                return
            }
            if (!sprice || sprice < 100 ) {
                setSpriceErr('Please provide your vehicle charge above 100')
                return
            } 
            if (!price || price < 10 ) {
                setPriceErr('Please provide your vehicle charge above 10')
                return
            }
            if (!desc.trim() || desc.length < 15) {
                setDescErr('Please provide your vehicle description more than 5 words')
                return
            }
        if(!selectedFiles){
            setFileErr('Please select a image file')
            return
        }


        const datas = {
            id:data.id,
            name: name,
            type: type,
            fuel: fuel,
            seat: seat,
            sprice: sprice,
            price: price,
            desc: desc,
            image: selectedFiles,
            changed:changed
        }

        loader()
        setShowModal(false)
        try {
         await updateVehicle(datas)
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


    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const files =Array.from(e.target.files)
            const previews = files.map((file) => URL.createObjectURL(file));
            setImagePreviews(previews)
            const file = e.target.files[0];
            const reader = new FileReader();

            reader.onload = (event) => {
                const base64String = event.target?.result as string;
                setSelectedFiles(base64String)
                setChanged(true)
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
                    Edit Vehicle
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

                                <input value={sprice} type="number" name='sprice' onChange={(e) => setSprice(parseFloat(e.target.value))} id="input-group-1" className={`bg-gray-50 border ${spriceErr ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 `} placeholder="Price for first 100 km" />
                                <p className='text-red-500 kanit-regular text-start ml-2'>{spriceErr}</p>
                            </div>

                            <label htmlFor="input-group-1" className="block mb-2 text-sm font-medium text-black text-start">Price/km</label>
                            <div className="relative mb-6">

                                <input value={price} type="number" name='price' onChange={(e) => setPrice(parseFloat(e.target.value))} id="input-group-1" className={`bg-gray-50 border ${priceErr ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 `} placeholder="Price for each km" />
                                <p className='text-red-500 kanit-regular text-start ml-2'>{priceErr}</p>
                            </div>

                            <label htmlFor="input-group-1" className="block mb-2 text-sm font-medium text-black text-start">vehicle Description</label>
                            <div className="relative mb-6">

                                <input value={desc} type="text" name='desc' onChange={(e) => {
                                    setDesc(e.target.value)
                                }} id="input-group-1" className={`bg-gray-50 border ${descErr ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5`} placeholder="A description for vehicle" />
                                <p className='text-red-500 kanit-regular text-start ml-2'>{descErr}</p>
                            </div>

                            
                            
                            
                            {
                                selectedFiles ? (
                                    <div className="image-preview">

                                        <div className="preview-item flex items-center ">
                                            <img src={selectedFiles} className='max-h-48' onClick={handleRemoveImage} alt={`Preview`} />
                                            <button
                                                type="button"
                                                className="ml-5 flex items-center justify-center px-4 font-medium bg-red-600 text-white h-9 rounded-md  md hover:bg-gray-300 transition-all duration-300"
                                                onClick={handleRemoveImage}
                                            >
                                                <span className="flex items-center justify-center space-x-2">delete</span>
                                            </button>
                                        </div>

                                    </div>
                                ) : (
                                    <>
                                        <label htmlFor="input-group-1" className="block mb-2 text-sm font-medium text-black text-start">vehicle Images</label>
                                        <div className="relative mb-6">

                                            <input type="file" accept="image/*"
                                                onChange={handleFileChange} name='image' id="input-group-1" required className={`bg-gray-50 border ${fileErr?'border-red-500':'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5`} />
                                                                        <p className='text-red-500 kanit-regular text-start ml-2'>{fileErr}</p>

                                        </div>


                                        {imagePreviews.length > 0 && (
                                            <div className="image-preview">
                                                {imagePreviews.map((preview, index) => (
                                                    <div key={index} className="preview-item flex">
                                                        <img src={preview} className='max-h-48' onClick={handleRemoveImage} alt={`Preview ${index}`} />
                                                        <button
                                                            type="button"
                                                            className="flex items-center justify-center px-4 font-medium bg-red-600 text-black h-9 rounded-md  md hover:bg-gray-300 transition-all duration-300"
                                                            onClick={handleRemoveImage}
                                                        >
                                                            <span className="flex items-center justify-center space-x-2">Delete</span>
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </>
                                )

                            }

                        </main>

                        <footer className="flex flex-shrink-0 flex-wrap items-center justify-end flex-row p-4 gap-1" >
                            <button
                                type="button"
                                className="flex items-center justify-center px-4 font-medium bg-gray-200 text-black h-9 rounded-md  hover:bg-gray-300 transition-all duration-300"
                                onClick={closeModal}
                            >
                                <span className="flex items-center justify-center space-x-2">Close</span>
                            </button>
                            <button

                                onClick={handleSubmit}
                                type="button"
                                className="flex items-center justify-center px-4 font-medium bg-violet-700 text-white h-9 rounded-md  hover:bg-violet-800 transition-all duration-300"
                            >
                                <span className="flex items-center justify-center space-x-2">Edit Vehicle</span>
                            </button>
                        </footer>



                    </article>
                </div>
            )}




        </>
    );
};

export default EditVehicle;
