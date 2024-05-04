import React from 'react';
import { IpackageRes } from '../../interfaces';
import { useNavigate } from 'react-router-dom';

const ListingCard: React.FC<{datas:IpackageRes}> = ({datas}) => {
    const navigate = useNavigate()  
    const renderedDesc = datas.desc.length < 200 ? datas.desc : `${datas.desc.slice(0, 200)}...`;

    return (
        <div className="mt-5 w-5/6 mx-auto bg-custom rounded-xl shadow-md overflow-hidden  m-3">
            <div className="md:flex">
                <div className="md:flex-shrink-0 w-1/5">
                    <img
                        className="h-full w-full object-cover "
                        src={datas.image}
                        alt="Doctor's image"
                    />
                </div>
                <div className="p-6  w-full text-white flex flex-col justify-between ">
                    <div className="flex justify-between w-full">
                        <span className='tracking-wider text-2xl text-yellow-400 opacity-100 kanit-bold'>{datas.days} Days {datas.title}</span>

                        <button onClick={()=>navigate(`/packageDetails/${datas._id}`)} className=" px-4 py-2 border border-transparent text-sm kanit-medium rounded-md text-white bg-red-600 hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    View Package Details
                    </button>
                    </div>
                    <div className="flex justify-between w-full mt-3">
                        <span className='tracking-wider text-lg text-white kanit-regualr'>Vehicle : {datas.vehicle.vehicleName}</span>
                        {/* <span className='tracking-wider text-lg text-white kanit-medium'>Days - {datas.days}</span>
                        <span className='tracking-wider text-lg text-white kanit-medium'>Nights - {datas.days-1}</span> */}

                       
                    </div>
                        
                    
                    
                   
                    <div className="flex justify-between w-full mt-3">
                    <span className='tracking-wider text-lg text-white kanit-regular'>{datas.location}</span>
                    
                    </div>
                    <p className="bg-white  p-3 rounded-lg text-lg kanit-regular text-custom mt-3">
                    {renderedDesc}
                    </p>
                    
                </div>
            </div>
        </div>
    );
};

export default ListingCard;
