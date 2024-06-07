import React, { ChangeEvent, useEffect, useState } from 'react'
import ListingCard from './ListingCard'
import {   IvehicleRes } from '../../interfaces'
import { getVehicles } from '../../services/vehicleService'
import SidebarMenu from './filter'
import Footer from '../customUI/Footer'
import { showAlert } from '../../redux/slices/alertSlice'
import { useDispatch } from 'react-redux'
import Loader from '../customUI/loader'
const MainContent: React.FC = () => {
    const [data, setData] = useState<IvehicleRes[]>([]);
    const [showData, setShowData] = useState<IvehicleRes[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [filter,setFilter] = useState('')
    const [search,setSearch] = useState('')
    const [load,setLoad] = useState(false)
    const itemsPerPage = 4; 
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchVehicles = async () => {
            try {

                const res = await getVehicles();
                setData(res.data.data);
                setShowData(res.data.data);
            } catch (err:any) { 
                console.error('Error fetching data:', err);
                if(err.response.data){ 
                    dispatch(showAlert({content:err.response.data.message,color:'red'}))
                    return 
                }
                dispatch(showAlert({content:err.message,color:'red'}))

            }
        };
        setLoad(true)
        fetchVehicles();
        setLoad(false)
    }, []);

    const handleFilter = (e: string) => {
        let filteredData
        if(search){
            const arr = data.filter((item) =>
                item.vehicleName.toLowerCase().includes(search)
            );
            filteredData = arr.filter((item) => item.type === e);
        }else{
            filteredData = data.filter((item) => item.type === e);
        }
        setFilter(e) 
        setShowData(filteredData);
        setCurrentPage(1);
    };

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toLowerCase()
        let filteredData
        if(filter){
            const arr = data.filter((item)=>item.type === filter)
            filteredData = arr.filter((item) =>
                item.vehicleName.toLowerCase().includes(value)
        );
    }else{
        filteredData = data.filter((item)=>item.vehicleName.toLowerCase().includes(value))
    }
        setSearch(value)
        setShowData(filteredData);
        setCurrentPage(1); 
    };

    const handleAvailability = (e:boolean)=>{
        const val = e
        let filteredData:IvehicleRes[]=[]
        if(search || filter){
            if(search && filter){
                const arr = data.filter((item) =>item.vehicleName.toLowerCase().includes(search))
                const arr2 = arr.filter((item) => item.type === filter)
                filteredData = arr2.filter((item)=>item.isBlocked === val)
                
            }else if(search && !filter){
                const arr = data.filter((item) =>item.vehicleName.toLowerCase().includes(search))
                filteredData = arr.filter((item)=>item.isBlocked === val)

            }else if(filter && !search){
                const arr = data.filter((item) =>item.type === filter)
                filteredData = arr.filter((item)=>item.isBlocked === val)
            }

        }else{
            filteredData = data.filter((item)=>item.isBlocked === val)
        }
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
            <Loader open={load} />
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
