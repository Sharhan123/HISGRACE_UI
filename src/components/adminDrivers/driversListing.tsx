import React, { ChangeEvent, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import AddRecord from './addDriver';
import { blockVehicle, deleteVehicle, getVehicles } from '../../services/vehicleService';
import { IdriverRes, Ivehicle, IvehicleRes } from '../../interfaces';
import DeleteItemModal from '../customUI/deleteModal';
import EditVehicle from './editDriver';
import BlockModalItem from '../customUI/blockCard';
import mongoose from 'mongoose';
import { showAlert } from '../../redux/slices/alertSlice';
import { useDispatch } from 'react-redux';
import { blockAndUnblock, deleteDriver, getDrivers } from '../../services/driverService';



const RecordTable: React.FC = () => {
    const [data, setdata] = useState<IdriverRes[] | null>([])
    const [showData, setShowData] = useState<IdriverRes[] | null>([])
    const [showLoading, setShowLoading] = useState(false)


    const naviagate = useNavigate()
    const fetch = async () => {
        try {
            setShowLoading(true)
            const res = await getDrivers()
            setdata(res.data.data)
            setShowData(res.data.data)
            setShowLoading(false)
        } catch (er) {
            console.log(er)
        }
    }
    const dispatch = useDispatch()
    useEffect(() => {


        fetch()


    }, [])
    const onDelete = async (id: any) => {
        try {
            await deleteDriver(id)
            fetch()
        } catch (err) {
            console.log(err)
        }
    }

    const showLoader = () => {
        setShowLoading(true)
    }
    const hideLoader = () => {
        setShowLoading(false)
    }

    const handleFilter = (value: string) => {

        const arr = data?.filter((item) => item.vehicles.includes(value))
        if (arr) {

            setShowData(arr);
        }
        else {
            setShowData([])
        }
    }
    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value

        const arr = data?.filter((item) => {
            
            const res = item.driverName.toLowerCase().split(' ')
            for(let i=0;i<res.length;i++){
                if (res[i].startsWith(value.toLowerCase())) {
                    return true; 
                  }
            }
            return false
        })
        if (arr) {

            setShowData(arr)
        } else {
            setShowData([])
        }
    }

    const onBlock = async (id: any) => {
        try {
            await blockAndUnblock(id)
            fetch()
        } catch (err) {
            console.log(err);

        }
    }


    return (
        <>
            {
                showLoading && (
                    <div
                        role="dialog"
                        id="modal-example"
                        aria-hidden="false"
                        style={{ display: 'flex' }}
                        className="modal fixed top-0 left-0 z-50 w-screen h-screen bg-black/30 flex items-center flex-col justify-center p-6 fade"
                        tabIndex={-1}
                    >
                        <div className="border-t-transparent border-solid animate-spin  rounded-full border-custom border-8 h-20 w-20"></div>

                    </div>
                )
            }

            <section className="container px-4 mx-auto">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <div>
                        <div className="flex mt-5 items-center gap-x-3">
                            <h2 className="text-2xl font-medium text-gray-800 ">Vehicles</h2>
                            <span className="px-3 py-1 text-sm text-blue-600 bg-blue-100 rounded-full ">Active</span>
                        </div>
                        <h3 className="mt-10 text-md text-black text-xl kanit-regular">Filter vehicles</h3>
                    </div>
                    <div className="flex items-center mt-4 gap-x-3 ">


                        <button className=" flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-orange-500 rounded-lg shrink-0 sm:w-auto gap-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <AddRecord reload={fetch} loader={showLoader} hide={hideLoader} />

                        </button>

                    </div>

                </div>
                <div className="mt-6 md:flex md:items-center md:justify-between">
                    <div className="inline-flex overflow-hidden bg-white border divide-x rounded-lg  rtl:flex-row-reverse ">


                        <button onClick={() => handleFilter('SUV')} className="px-5 py-2 text-xs font-medium text-black transition-colors duration-200 sm:text-sm ">
                            SUV
                        </button>
                        <button onClick={() => handleFilter('SEDAN')} className="px-5 py-2 text-xs font-medium text-black transition-colors duration-200 sm:text-sm ">
                            SEDAN
                        </button>
                        <button onClick={() => handleFilter('VAN')} className="px-5 py-2 text-xs font-medium text-black transition-colors duration-200 sm:text-sm ">
                            VAN
                        </button>
                        <button onClick={() => handleFilter('HATCHBACK')} className="px-5 py-2 text-xs font-medium text-black transition-colors duration-200 sm:text-sm ">
                            HATCHBACK
                        </button>
                        <button onClick={() => handleFilter('BUS')} className="px-5 py-2 text-xs font-medium text-black transition-colors duration-200 sm:text-sm ">
                            BUS
                        </button>
                        <button onClick={() => setShowData(data)} className="px-5 py-2  bg-red-700 text-xs font-medium text-white transition-colors duration-200 sm:text-sm ">
                            Clear Filters
                        </button>
                    </div>

                    <div className="relative flex items-center mt-4 md:mt-0">

                        <div className="relative w-full min-w-[300px] h-10">
                            <input onChange={handleSearch} className="peer w-full h-full bg-transparent text-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-500" placeholder="" />
                            <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal peer-placeholder-shown:text-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-blue-500 before:border-blue-gray-200 peer-focus:before:border-blue-500 after:border-blue-gray-200 peer-focus:after:border-blue-500">Search here</label>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col mt-6">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden border border-gray-200  md:rounded-lg">
                                <table className="min-w-full   divide-y  divide-gray-200 ">
                                    <thead className="bg-gray-100  ">
                                        <tr>
                                            <th scope="col" className="text-center py-3.5 px-4 text-lg kanit-medium  font-normal  rtl:text-right text-black ">
                                                Image
                                            </th>
                                            <th scope="col" className="text-center py-3.5 px-4 text-lg kanit-medium  font-normal  rtl:text-right text-black ">
                                                Driver Name
                                            </th>

                                            <th scope="col" className="text-center kanit-medium px-12 py-3.5 text-lg font-normal  rtl:text-right text-black ">
                                                Mobile
                                            </th>


                                            <th scope="col" className="px-4 py-3.5 text-lg kanit-medium font-normal text-center rtl:text-right text-black ">Vehicles</th>
                                            <th scope="col" className="px-4 py-3.5 text-lg kanit-medium font-normal text-center rtl:text-right text-black">
                                            Experiance
                                            </th>

                                            <th scope="col" className="px-4 py-3.5 text-lg kanit-medium font-normal text-center rtl:text-right text-black ">Edit</th>
                                            <th scope="col" className="px-4 py-3.5 text-lg kanit-medium font-normal text-center rtl:text-right text-black ">Delete</th>
                                            <th scope="col" className="px-4 py-3.5 text-lg kanit-medium font-normal text-center rtl:text-right text-black ">Status</th>



                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-500">
                                        {showData && showData.length > 0 ? (
                                            showData.map((item, index) => (
                                                <tr key={index}>
                                                    <td className="px-4 py-4 text-sm font-medium text-center whitespace-nowrap">
                                                        <div className="relative w-12 h-12">
                                                            <img src={item.image} alt="Innova" className="w-full h-full object-cover rounded-md" />
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 text-sm font-medium text-center whitespace-nowrap">
                                                        <div>
                                                            <h2 className="text-xl kanit-regular text-black">{item.driverName}</h2>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 text-sm font-medium whitespace-nowrap text-center">
                                                        <div>
                                                            <h2 className="text-xl kanit-regular text-black">{item.mobile}</h2>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 text-sm font-medium whitespace-nowrap text-center">
                                                        <div>
                                                            <h2 className="text-xl kanit-regular text-black"> {
                                                                item.vehicles.map((item)=>(
                                                                    <p className='kanit-light text-sm '>{item}</p>

                                                                ))
                                                                }
                                                                
                                                                </h2>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 text-sm font-medium whitespace-nowrap text-center">
                                                        <div>
                                                            <h2 className="text-xl kanit-regular text-green-600">{item.exp} /yr</h2>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 text-sm font-medium whitespace-nowrap text-center">
                                                        <div>
                                                            <button className="text-md w-full h-8 rounded-md bg-yellow-600 kanit-regular text-white">
                                                                <EditVehicle loader={showLoader} hide={hideLoader} reload={fetch} data={item} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 text-sm font-medium whitespace-nowrap text-center">
                                                        <div>
                                                            <button className="text-md w-20 h-8 rounded-md bg-red-800 kanit-regular text-white">
                                                                <DeleteItemModal onDelete={() => onDelete(item._id)} itemName='Driver' />
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 text-sm font-medium whitespace-nowrap text-center">
                                                        <div>
                                                            <button className="text-md w-full h-8 rounded-md bg-blue-800 kanit-regular text-white"><BlockModalItem itemName='Driver' onDelete={() => onBlock(item._id)} blocked={item.isAvailable} /></button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={8} className="px-4 py-4 text-sm font-medium text-center">
                                                    No datas available
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>


                                </table>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}








export default RecordTable;
