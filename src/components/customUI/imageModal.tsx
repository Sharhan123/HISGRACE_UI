import React from 'react';

interface props {
    image: string,
    open:boolean,
    closeModal:()=>void
    
}

const ModalImage: React.FC<props> = ({ open, image,closeModal }) => {
    

    return (

        <div className="flex justify-center">

            <div className="[&_[x-cloak]]:hidden" x-data="{ modalOpen: false }">
                
                {open && (
                    <div
                        className="fixed inset-0 z-[99999] bg-black bg-opacity-50 transition-opacity"
                        onClick={closeModal}
                    ></div>
                )}

                {open && (
                    <div
                        id="modal"
                        onClick={closeModal}
                        className="fixed inset-0 z-[99999] flex px-4 md:px-6 py-6 justify-center items-center"
                    >
                        <div className="max-w-xl mx-auto">
                            <div className="h-auto shadow-2xl bg-black overflow-hidden">

                                <img

                                    src={image}
                                    className=" object-contain w-full max-h-fit"
                                    alt="Modal image"
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>

    );
};

export default ModalImage;
