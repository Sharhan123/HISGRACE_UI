import React, { ChangeEvent, useState } from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import RvHookupIcon from '@mui/icons-material/RvHookup';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventBusyIcon from '@mui/icons-material/EventBusy';
interface props{
    handleFilter:(e:string)=>void 
    handleSearch:(e: ChangeEvent<HTMLInputElement>)=>void
    clear:()=>void
    filter:string
    handleAvailability:(e:boolean) =>void
}
const SidebarMenu: React.FC<props> = ({clear,handleSearch,handleAvailability,filter,handleFilter}) => {
    const [showDashboardMenu, setShowDashboardMenu] = useState(false);
    const [showUIElementsMenu, setShowUIElementsMenu] = useState(false);
   

    const handleMenuToggle = (menuType: string) => {
        switch (menuType) {
            case 'dashboard':
                setShowDashboardMenu(!showDashboardMenu);
                break;
            case 'uiElements':
                setShowUIElementsMenu(!showUIElementsMenu);
                break;
           
            default:
                break;
        }
    };
    

    return (
            <div className="py-3 px-5 flex flex-col sm:flex-col lg:flex-row md:flex-col lg:gap-0 gap-3 justify-evenly bg-white rounded shadow-xl">
                <div className="  w-fit overflow-hidden bg-white border divide-x rounded-lg  rtl:flex-row-reverse ">
                    

                    <button onClick={() => handleFilter('SUV')} className={`px-5 py-2 text-xs ${filter ==='SUV'?'bg-custom text-white':'text-black'} font-medium  transition-colors duration-200 sm:text-sm `}>
                                SUV
                            </button>
                            <button onClick={() => handleFilter('SEDAN')} className={`${filter ==='SEDAN'?'bg-custom text-white':'text-black'} px-5 py-2 text-xs font-medium text-black transition-colors duration-200 sm:text-sm `}>
                                SEDAN
                            </button>
                            <button onClick={() => handleFilter('VAN')} className={` ${filter ==='VAN'?'bg-custom text-white':'text-black'} px-5 py-2 text-xs font-medium text-black transition-colors duration-200 sm:text-sm `}>
                                VAN
                            </button>
                            <button onClick={() => handleFilter('HATCHBACK')} className={` ${filter ==='HATCHBACK'?'bg-custom text-white':'text-black'} px-5 py-2 text-xs font-medium text-black transition-colors duration-200 sm:text-sm `}>
                                HATCHBACK
                            </button>
                            <button onClick={() => handleFilter('BUS')} className={` ${filter ==='BUS'?'bg-custom text-white':'text-black'} px-5 py-2 text-xs font-medium text-black transition-colors duration-200 sm:text-sm `}>
                                BUS
                            </button>
                            <button onClick={clear}  className="px-5 py-2 w-full lg:w-fit  bg-red-700 text-xs font-medium text-white transition-colors duration-200 sm:text-sm ">
                                Clear Filters
                            </button>
                    </div>
                    <div className="relative flex items-center mt-4 md:mt-0">
                <div className="relative  min-w-[300px] h-10">
                            <input onChange={handleSearch} className="peer w-full h-full bg-transparent text-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-500" placeholder="" />
                            <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal peer-placeholder-shown:text-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-blue-500 before:border-blue-gray-200 peer-focus:before:border-blue-500 after:border-blue-gray-200 peer-focus:after:border-blue-500">Search here</label>
                        </div>
                        </div>
                <div className="-mx-1 ">
                    <ul className="flex justify-between w-full flex-wrap items-center h-10">
                        <li className="block relative">
                            <span
                                
                                className="flex items-center h-10 kanit-regular text-sm  px-4 rounded cursor-pointer no-underline hover:no-underline transition-colors duration-100 mx-1 border text-blue-600 "
                                onClick={() => handleMenuToggle('dashboard')}
                            >
                                <FilterListIcon/>
                                <span>Sort</span>
                                <span className="ml-2"> <i className="mdi mdi-chevron-down"></i> </span>
                            </span>
                            {showDashboardMenu && (
                                <div className="bg-white shadow-md rounded border border-gray-300 text-sm absolute top-auto left-auto lg:right-5  right-auto min-w-full w-56 z-30 mt-1">
                                    <ul className="list-reset">
                                        <li>
                                            <span
                                                
                                                className="px-4 py-2 kanit-regular flex w-full text-red-500 items-start hover:bg-gray-100 no-underline hover:no-underline transition-colors duration-100 cursor-pointer"
                                            >
                                                <ArrowDownwardIcon />
                                                Low Price
                                            </span>
                                        </li>
                                        <li>
                                            <span   
                                                
                                                className="px-4 kanit-regular text-emerald-600 py-2 flex w-full items-start hover:bg-gray-100 no-underline hover:no-underline transition-colors duration-100 cursor-pointer"
                                            >
                                                <ArrowUpwardIcon/>
                                                High Price
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </li>
                        {/* Other menu items */}
                    </ul>
                </div>
                <div className="-mx-1">
                    <ul className="flex justify-between w-full flex-wrap items-center h-10">
                        <li className="block relative">
                            <span
                                
                                className="flex items-center h-10 kanit-regular text-sm  px-4 rounded cursor-pointer no-underline hover:no-underline transition-colors duration-100 mx-1 border text-orange-600 "
                                onClick={() => handleMenuToggle('uiElements')}
                            >
                                <RvHookupIcon/>
                                <span>Availability</span>
                                <span className="ml-2"> <i className="mdi mdi-chevron-down"></i> </span>
                            </span>
                            {showUIElementsMenu && (
                                <div className="bg-white shadow-md rounded border border-gray-300 text-sm absolute top-auto left-auto lg:right-5 right-auto min-w-full w-56 z-30 mt-1">
                                    <ul className="list-reset">
                                        <li onClick={()=>handleAvailability(false)}>
                                            <span
                                                
                                                className="px-4 py-2 kanit-regular flex w-full text-emerald-600 items-start hover:bg-gray-100 no-underline hover:no-underline transition-colors duration-100 cursor-pointer"
                                            >
                                                <EventAvailableIcon />
                                                Available
                                            </span>
                                        </li>
                                        <li onClick={()=>handleAvailability(true)}>
                                            <span   
                                                
                                                className="px-4 kanit-regular text-red-500 py-2 flex w-full items-start hover:bg-gray-100 no-underline hover:no-underline transition-colors duration-100 cursor-pointer"
                                            >
                                                <EventBusyIcon/>
                                                Booked
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </li>
                        {/* Other menu items */}
                    </ul>
                </div>
            </div>
        
    );
};

export default SidebarMenu;
