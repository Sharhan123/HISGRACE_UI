import React from 'react';
import {  IpackageRes, Ivehicle, IvehicleRes } from '../../interfaces';
import { useNavigate } from 'react-router-dom';

const ListingCard: React.FC<{datas:IpackageRes}> = ({datas}) => {
    const navigate = useNavigate()  
    const renderedDesc = datas.desc.length < 200 ? datas.desc : `${datas.desc.slice(0, 200)}...`;

    return (
        <div className="flex flex-col bg-custom shadow-md rounded-md items-center">
                {/* <div className="flex items-center p-4">
                    <div className="mr-2 h-10 w-10 rounded-full overflow-hidden relative bg-gray-200"></div>
                    <div className="flex flex-col justify-between items-center">
                        <div className="mb-2 h-5 w-40 overflow-hidden relative bg-gray-200"></div>
                    </div>
                </div> */}
                <div
                style={{
                    backgroundImage: `url(${datas.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
                 className={`h-80 w-full opacity-70   rounded-t-md`}>
                
                </div>
                
                <div className="w-full h-px overflow-hidden relative bg-gray-200 "></div>
                <div onClick={()=>navigate(`/packageDetails/${datas._id}`)} className="cursor-pointer flex-col justify-between items-center p-4 w-full">
                    <div className='w-full flex justify-between items-center'>
                        <h1 className='text-white kanit-bold text-lg uppercase'>{datas.title.length < 30 ?datas.title:datas.title.slice(0,30)}</h1>
                        <p className={`h-5 w-auto px-1 rounded-md text-xs  kanit-regular flex items-center justify-center text-white ${datas.isAvailable ? 'bg-red-600' : 'bg-green bg-opacity-90'} text-center`}>
                            {
                                datas.isAvailable?'Booked':'Avaialable'
                            }
                        </p>
                        </div>
                    <h1 className='text-yellow-400  kanit-medium text-sm uppercase '>{datas.location}</h1>
                    <div className='w-full flex justify-between items-center'>
                    <h1 className='text-white kanit-medium text-sm uppercase '>₹ {datas.total} /-</h1>
                    
                        </div>
                </div>
            </div>
    );
};

export default ListingCard;
