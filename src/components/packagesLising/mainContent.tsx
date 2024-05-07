import React, { ChangeEvent, useEffect, useState } from 'react'
import ListingCard from './listingCard'
import {  IpackageRes, Ivehicle } from '../../interfaces'
import SidebarMenu from '../vehicleListing/filter'
import Footer from '../customUI/Footer'
import { getPackages } from '../../services/packageService'
const MainContent: React.FC = () => {
    const [data, setData] = useState<IpackageRes[]>([]);
    const [showData, setShowData] = useState<IpackageRes[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [filter,setFilter] = useState('')
    const [search,setSearch] = useState('')
    const [available,setAvailable] = useState<boolean | string>('')
    const itemsPerPage = 4; 

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const res = await getPackages();
                setData(res.data.data);
                setShowData(res.data.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchVehicles();
    }, []);

    const handleFilter = (e: string) => {
        let filteredData
        if(search){
            const arr = data.filter((item) =>
                item.title.toLowerCase().includes(search)
            );
            filteredData = arr.filter((item) => item.vehicle.type === e);
        }else{
            filteredData = data.filter((item) => item.vehicle.type === e);
        }
        setFilter(e) 
        setShowData(filteredData);
        setCurrentPage(1);
    };

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toLowerCase()
        let filteredData
        if(filter){
            const arr = data.filter((item)=>item.vehicle.type === filter)
            filteredData = arr.filter((item) =>
                item.title.toLowerCase().includes(value)
        );
    }else{
        filteredData = data.filter((item)=>item.title.toLowerCase().includes(value))
    }
        setSearch(value)
        setShowData(filteredData);
        setCurrentPage(1); 
    };

    const handleAvailability = (e:boolean)=>{
        const val = e
        let filteredData:IpackageRes[]=[]
        if(search || filter){
            if(search && filter){
                const arr = data.filter((item) =>item.title.toLowerCase().includes(search))
                const arr2 = arr.filter((item) => item.vehicle.type === filter)
                filteredData = arr2.filter((item)=>item.isAvailable === val)
                
            }else if(search && !filter){
                const arr = data.filter((item) =>item.title.toLowerCase().includes(search))
                filteredData = arr.filter((item)=>item.isAvailable === val)

            }else if(filter && !search){
                const arr = data.filter((item) =>item.vehicle.type === filter)
                filteredData = arr.filter((item)=>item.isAvailable === val)
            }

        }else{
            filteredData = data.filter((item)=>item.isAvailable === val)
        }
        setAvailable(val)
        setShowData(filteredData)
        setCurrentPage(1)
    }

    const totalPages = Math.ceil(showData.length / itemsPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = showData.slice(startIndex, endIndex);

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };
    return (
           <div className='h-screen'>
                        <SidebarMenu handleAvailability={(e)=>handleAvailability(e)} filter={filter} handleSearch={handleSearch} clear={()=>{setShowData(data)
                            setFilter('')
                        }} handleFilter={(e)=>handleFilter(e)}/>

        <div className='h-4/6 '>
            


            {currentItems.length > 0 ? (
                <div className="py-5 grid grid-cols-4 gap-10 container mx-auto">
                    {currentItems.map((item, index) => (
                        <ListingCard key={index} datas={item} />
                    ))}
                </div>
            ) : (
                <h6 className="text-center text-lg kanit-regular text-black">No Vehicles</h6>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-5">
                    <nav className="flex space-x-2" aria-label="Pagination">
                        <button
                            onClick={handlePrevPage}
                            className="relative inline-flex items-center px-4 py-2 text-sm bg-gradient-to-r from-red-500 to-red-700 border border-fuchsia-100 hover:border-violet-100 text-white font-semibold cursor-pointer leading-5 rounded-md transition duration-150 ease-in-out focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10"
                        >
                            Prev
                        </button>
                        
                        {pageNumbers.map((page) => (
                <button
                    key={page}
                    onClick={() => {setCurrentPage(page)
                        
                    }}
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${
                        currentPage === page
                            ? 'bg-custom text-white'
                            : 'bg-white text-gray-700 hover:bg-custom hover:text-white'
                    } border border-gray-200 hover:border-violet-100 cursor-pointer leading-5 rounded-md transition duration-150 ease-in-out focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10`}
                >
                    {page}
                </button>
            ))}
                        <button
                            onClick={handleNextPage}
                            className="relative inline-flex items-center px-4 py-2 text-sm bg-gradient-to-r from-custom to-blue-950 border border-fuchsia-100 hover:border-violet-100 text-white font-semibold cursor-pointer leading-5 rounded-md transition duration-150 ease-in-out focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10"
                        >
                            Next
                        </button>
                    </nav>
                </div>
            )}
        </div>
           <Footer/>

        </div>
    )
}

export default MainContent
