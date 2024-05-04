import React, { ChangeEvent, useEffect, useState } from 'react'
import Navbar from '../homePage/navbar'
import ListingCard from '../customUI/listingCard'
import './style.css'
import { getPackages } from '../../services/packageService'
import { IpackageRes } from '../../interfaces'
const MainContent: React.FC = () => {
    const [data, setData] = useState<IpackageRes[]>([])
    const [showData,setShowData] = useState<IpackageRes[]>([])
    const fetch = async () => {
        try {
            const res = await getPackages()
            setShowData(res.data.data)
            setData(res.data.data)
        } catch (err) {
            console.log(err);

        }


    }
    useEffect(() => {
        
        fetch()
    }, [])

    const handleFilter = (e:string)=>{
        const arr = data.filter((item)=>item.vehicle.type === e)
        setShowData(arr)
    }

    const handleSearch = (e:ChangeEvent<HTMLInputElement>)=>{
        const value = e.target.value
        
            setShowData(data)
        
       
        const arr = data?.filter((item)=>item.title.toLowerCase().split('').includes(value.toLowerCase()))
        if(arr){

            setShowData(arr)
        }else{
            setShowData([])
        }
    }
    return (
        <div className='h-auto'>
            <div className="mt-6 md:flex md:items-center md:justify-evenly">
                <div className="inline-flex  overflow-hidden bg-white border divide-x rounded-lg  rtl:flex-row-reverse ">


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
                        <button onClick={()=>setShowData(data)}  className="px-5 py-2  bg-red-700 text-xs font-medium text-white transition-colors duration-200 sm:text-sm ">
                            Clear Filters
                        </button>
                </div>

                <div className="relative flex items-center mt-4 md:mt-0">
                <div className="relative w-full min-w-[300px] h-10">
                            <input onChange={handleSearch}  className="peer w-full h-full bg-transparent text-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-500" placeholder="" />
                            <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal peer-placeholder-shown:text-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-blue-500 before:border-blue-gray-200 peer-focus:before:border-blue-500 after:border-blue-gray-200 peer-focus:after:border-blue-500">Search here</label>
                        </div>
                        </div>
            </div>
            <h1 className='text-center text-custom kanit-regular text-3xl  mt-5 underline-offset-1'>Our Packages</h1>
            <div className='scroll-container   mt-5 flex flex-col items-center bg-gray-50 container mx-auto h-5/6 shadow-lg '>
                <div className='container p-5 h-4/5 '>

                    {showData && showData.length > 0 ?(showData.map((item, index) => (
                        <ListingCard key={index} datas={item} />
                    ))):(
                        <h6 className='text-center text-lg kanit-regular text-black'>No Packages </h6>

                    )
                }

                </div>
            </div>
        </div>
    )
}

export default MainContent
