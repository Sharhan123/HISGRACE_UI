import React from 'react';
import {   IvehicleRes } from '../../interfaces';
import { useNavigate } from 'react-router-dom';

const ListingCard: React.FC<{datas:IvehicleRes}> = ({datas}) => {
    const navigate = useNavigate()  

    return (
        <div className="flex flex-col bg-custom shadow-md rounded-md items-center">
                
                <div
                style={{
                    backgroundImage: `url(${datas.images})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
                 className={`h-80 w-full opacity-70   rounded-t-md`}>
                
                </div>
                
                <div className="w-full h-px overflow-hidden relative bg-gray-200 "></div>
                <div onClick={()=>navigate(`/vehicle?id=${datas.id}`)} className="cursor-pointer flex-col justify-between items-center p-4 w-full">
                    <div className='w-full flex justify-between items-center'>
                        <h1 className='text-white kanit-bold text-lg uppercase'>{datas.vehicleName.length < 30 ?datas.vehicleName:datas.vehicleName.slice(0,30)}</h1>
                        <p className={`h-5 w-auto px-1 rounded-md text-xs  kanit-regular flex items-center justify-center text-white ${datas.isBlocked ? 'bg-red-600' : 'bg-green bg-opacity-90'} text-center`}>
                            {
                                datas.isBlocked?'Blocked':'Available'
                            }
                        </p>
                        </div>
                    <div className='w-full flex justify-between items-center'>
                    <h1 className='text-yellow-400 kanit-medium  text-sm uppercase '>Premium {datas.seat} seater {datas.type}</h1>
                    <h1 className='text-yellow-400 kanit-medium text-sm uppercase '>₹ {datas.price} /-</h1>
                    
                        </div>
                </div>
            </div>
    );
};

export default ListingCard;
