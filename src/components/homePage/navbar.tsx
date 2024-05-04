import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Info from '@mui/icons-material/AccountCircle';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Image from '../../assets/logo.jpg'
import {  jwtDecode } from 'jwt-decode';
import { Itoken } from '../../interfaces';
import HomeIcon from '@mui/icons-material/Home';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import RouteIcon from '@mui/icons-material/Route';
import TourIcon from '@mui/icons-material/Tour';
import MessageIcon from '@mui/icons-material/Message';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const state = useSelector((state: RootState) => state.auth.token ?? null);
    const [data,setData] = useState<Itoken>()
    
    const [isOpen, setIsOpen] = useState(false);

    useEffect(()=>{
        if(state){

            const decoded = jwtDecode<Itoken>(state)
            console.log(decoded);
            setData(decoded)
                             
        }
    },[])
    const navigateSignIn = () => {
        navigate('/signin-signup');
    };

    return (
        <>
            <header>
                <input
                    type="checkbox"
                    name="hbr"
                    id="hbr"
                    className="hbr peer"
                    hidden
                    aria-hidden="true"
                    checked={isOpen}
                    onChange={() => setIsOpen(!isOpen)}
                />
                <nav className={` w-full bg-custom backdrop-blur navbar shadow-2xl shadow-gray-600/5  `}>
                    <div className="xl:container m-auto px-6 md:px-12 lg:px-6">
                        <div className="flex flex-wrap items-center justify-between gap-6 md:py-2 md:gap-0 lg:py-2">
                            <div className="w-full  items-center flex justify-between lg:w-auto">
                                {/* <img src={Image} className='h-10 ' /> */}
                                <TravelExploreIcon fontSize={'large'} className='text-yellow-400 '/>
                                <h1 className='text-white kanit-medium text-3xl ml-5'>HISGRACE CABS</h1>
                                {/* <a className="relative z-10 text-white flex items-center justify-between" href="#" aria-label="logo">
                                    <img className='max-h-12 lg:max-h-16 rounded-lg ' src={Image} />
                                    <h1 className='text-2xl lg:text-4xl ml-5 kanit-regular'>HISGRACE CABS</h1>
                                </a> */}
                                <label htmlFor="hbr" className="peer-checked:hamburger block relative z-20 p-6 -mr-6 cursor-pointer lg:hidden">
                                    <div aria-hidden="true" className="m-auto h-0.5 w-5 rounded bg-gray-900 dark:bg-gray-300 transition duration-300"></div>
                                    <div aria-hidden="true" className="m-auto mt-2 h-0.5 w-5 rounded bg-gray-900 dark:bg-gray-300 transition duration-300"></div>
                                </label>
                            </div>
                            <div className={`navmenu w-full flex-wrap justify-end items-center mb-8 lg:mb-0 md:mb-0  space-y-8 p-6 rounded-3xl  shadow-gray-300/20   ${isOpen ? 'lg:flex lg:w-full' : 'hidden lg:flex lg:w-auto lg:space-y-0'}`}>
                                <div className=" lg:pr-4">
                                    <ul className="  lg:text-sm lg:flex lg:space-y-0">
                                        <li>
                                            <a href="/" className="text-white text-md kanit-medium flex  justify-between items-center bg-gradient-to-r from-red-600 to-red-900 rounded-md px-5 py-2 transition ">
                                                <HomeIcon fontSize= {'small'} className='text-white text-xs'/>
                                                <span className='kanit-regular ml-1 text-md'>Home</span>
                                            </a>
                                        </li>
                                        <li>
                                        <li>
                                            <a href="/vehicles" className="ml-5 text-md text-black kanit-medium flex  justify-between items-center bg-gradient-to-r from-white to-slate-200 rounded-md px-5 py-2 transition hover:text-primary dark:hover:text-primaryLight">
                                            <LocalTaxiIcon fontSize= {'small'} className='text-black text-xs'/>
                                                <span className='kanit-regular ml-1 text-md'>Vehicles</span>
                                            </a>
                                        </li>
                                        </li>
                                        <li>
                                        <a href="/services" className="ml-5 text-md text-black kanit-medium flex  bg-gradient-to-r from-white to-slate-200 rounded-md px-5 py-2 transition hover:text-primary dark:hover:text-primaryLight">
                                        <RouteIcon fontSize= {'small'} className='text-black text-xs'/>
                                                <span className='kanit-regular ml-1 text-md'>Services</span>
                                            </a>
                                            

                                        </li>
                                        <li>
                                        <a href="/packages" className=" ml-5 text-md text-black kanit-medium flex justify-between items-center bg-gradient-to-r from-white to-slate-200 rounded-md px-5 py-2 transition hover:text-primary dark:hover:text-primaryLight">
                                        <TourIcon fontSize= {'small'} className='text-black text-xs'/>
                                                <span className='kanit-regular ml-1 text-md'>Packages</span>
                                            </a>

                                        </li>
                                        <li>
                                            <a href="" className=" ml-5 text-md text-black kanit-medium flex justify-between   items-center bg-gradient-to-r from-white to-slate-200 rounded-md px-5 py-2 transition hover:text-primary dark:hover:text-primaryLight">
                                            <MessageIcon fontSize= {'small'} className='text-black text-xs'/>

                                                <span className='kanit-regular ml-1 text-md'>Chat</span>
                                            </a>

                                        </li>
                                    </ul>
                                </div>
                                <div className="w-full text-white  space-y-2 border-primary/10 dark:border-gray-700 flex flex-col justify-center items-center -ml-1 hidden md:block lg:block sm:flex-row lg:space-y-0 md:w-max lg:border-l ">
                                    {
                                        data ? (
                                            <a href="/profile" className="relative flex h-9 ml-auto items-center justify-center sm:px-6 before:absolute before:inset-0 before:rounded-full focus:before:bg-sky-600/10 dark:focus:before:bg-sky-400/10 before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95">
                                                <span className="relative text-md kanit-medium text-primary dark:text-primaryLight"><Info /> {data.name}</span>
                                            </a>
                                        ) : (
                                            <a href="/signin-signup" className="relative flex h-9 ml-auto items-center justify-center sm:px-6 before:absolute before:inset-0 before:rounded-full focus:before:bg-sky-600/10 dark:focus:before:bg-sky-400/10 before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95">
                                                <span className="relative text-sm font-semibold text-primary dark:text-primaryLight"><Info /> Signin</span>
                                            </a>
                                        )
                                    }



                                </div>
                            </div>

                        </div>

                    </div>

                </nav>

            </header>
        </>
    );
};

export default Navbar;
