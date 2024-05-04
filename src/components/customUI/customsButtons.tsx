import React, { useState } from 'react'
import ModalImage from './imageModal'

interface props{
    first:string
    second:string
    image:string
    secondFunction:()=>void
}

const CustomsButtons:React.FC<props> = ({first,second,secondFunction,image})=>{
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };
    return (
    <div className=" flex justify-start items-start">
        <ModalImage closeModal={closeModal} open={modalOpen} image={image} />
                                <button onClick={openModal} className=" bg-white kanit-regular  opacity-100 hover:opacity-100 text-black hover:text-gray-900 rounded-md px-5 py-2 font-semibold">
                                   {first} 
                                </button>
                                <button onClick={secondFunction} className="bg-red-600 ml-5 kanit-regular opacity-100 hover:opacity-100 text-white hover:text-gray-900 rounded-md px-5 py-2 font-semibold">
                                    <i className="mdi mdi-cart -ml-2 mr-2"></i> {second}
                                </button>
                            </div>
  )
}

export default CustomsButtons
