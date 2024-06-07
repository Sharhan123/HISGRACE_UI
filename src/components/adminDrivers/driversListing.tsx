import React, { useEffect, useState } from 'react';

import { IdriverRes,   } from '../../interfaces';
import DeleteItemModal from '../customUI/deleteModal';
import BlockModalItem from '../customUI/blockCard';
import { showAlert } from '../../redux/slices/alertSlice';
import { useDispatch } from 'react-redux';
import { blockAndUnblock, deleteDriver, getDrivers, updateRequest } from '../../services/driverService';



const RecordTable: React.FC = () => {
    const [data, setdata] = useState<IdriverRes[] | null>([])
    const [showData, setShowData] = useState<IdriverRes[] | null>([])
    const [showLoading, setShowLoading] = useState(false)
    const [selected,setSelected] = useState('active')

    const fetch = async () => {
        try {
            setShowLoading(true)
            const res = await getDrivers()
            setdata(res.data.data)
            const filtered = res.data.data.filter((item:IdriverRes)=>item.status === selected)
            setShowData(filtered)
            setShowLoading(false)
        } catch (err:any) {
            console.log(err)
            dispatch(showAlert({color:"red",content:err.message}))
        }
    }
    const dispatch = useDispatch()
    useEffect(() => {


        fetch()


    }, [])

    useEffect(()=>{
        let filtered:any = []
         filtered = data?.filter((item)=>item.status === selected)
        setShowData(filtered)
        
    },[selected])
    const onDelete = async (id: any) => {
        try {
            await deleteDriver(id)
            fetch()
        } catch (err:any) {
            console.log(err)
            dispatch(showAlert({color:"red",content:err.message}))
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

    const handleRequest = async (id:any,status:string)=>{
        try{
              await updateRequest({id,status})
            setSelected('active')
        }catch(err){
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
                            <h2 className="text-2xl font-medium text-gray-800 ">Drivers</h2>
                            <span className="px-3 py-1 text-sm text-blue-600 bg-blue-100 rounded-full ">Active</span>
                        </div>
                        <h3 className="mt-10 text-md text-black text-xl kanit-regular">Filter Drivers</h3>
                    </div>
                    

                </div>
                <div className="mt-6  md:flex md:items-center md:justify-between">
                    <div className="grid grid-cols-2 w-full overflow-hidden bg-white border divide-x rounded-lg  rtl:flex-row-reverse ">


                        <button onClick={() => setSelected('active')} className={`px-5  py-2 text-xs kanit-regular ${selected === 'active' ? 'bg-custom text-white' : ''} text-blue-600 transition-colors duration-200 sm:text-sm `}>
                            ACTIVE
                        </button>
                        <button onClick={() => setSelected('verified')} className={`px-5  py-2 text-xs kanit-regular ${selected === 'verified' ? 'bg-red-600 text-white' : ''} text-red-500 transition-colors duration-200 sm:text-sm `}>
                            REGISTRATION REQUESTS
                        </button>
                       
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

                                            {/* <th scope="col" className="px-4 py-3.5 text-lg kanit-medium font-normal text-center rtl:text-right text-black ">Edit</th> */}
                                            <th scope="col" colSpan={2} className="px-4  py-3.5 text-lg kanit-medium font-normal text-center rtl:text-right text-black ">Actions</th>
                                            {/* <th scope="col" className="px-4 py-3.5 text-lg kanit-medium font-normal text-center rtl:text-right text-black ">Status</th> */}



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
                                                   
                                                    {
                                                        item.status === 'verified'?(
                                                            <>
                                                            <td className="px-4 py-4 text-sm font-medium whitespace-nowrap text-center">
                                                        <div>
                                                            <button onClick={()=>handleRequest(item._id,'rejected')} className="text-md w-20 h-8 rounded-md bg-red-800 kanit-regular text-white">
                                                                Reject
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 text-sm font-medium whitespace-nowrap text-center">
                                                        <div>
                                                            <button onClick={()=>handleRequest(item._id,'active')} className="text-md w-full h-8 rounded-md bg-blue-800 kanit-regular text-white">Approve</button>
                                                        </div>
                                                    </td>
                                                    </>
                                                        ):(
                                                            <>
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
                                                    </>
                                                        )
                                                    }
                                                    
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
