import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import { Iuser, IuserRes } from '../../interfaces';
import { blockUser, getUsers } from '../../services/adminService';
import BlockModalItem from '../customUI/blockCard';
import { showAlert } from '../../redux/slices/alertSlice';
import { useDispatch } from 'react-redux';



const RecordTable: React.FC = () => {
    const [data, setdata] = useState<IuserRes[] | null>([])

    const dispatch = useDispatch()
    const naviagate = useNavigate()
    const fetch = async () => {
        try {

            const res = await getUsers()
            setdata(res.data.users)
        } catch (err: any) {
            console.log(err)
            dispatch(showAlert({ color: "red", content: err.message }))

        }
    }

    useEffect(() => {

        fetch()

    }, [])

    const handleBlock = async (id: any) => {
        try {




            const res = await blockUser(id)
            if (res) {
                fetch()
            }


        } catch (err:any) {
            dispatch(showAlert({color:"red",content:err.message}))
            console.log(err);
        }
    }






    return (
        <section className="container px-4 mx-auto">
            <div className="sm:flex sm:items-center sm:justify-between">
                <div>
                    <div className="flex mt-5 items-center gap-x-3">
                        <h2 className="text-2xl font-medium text-gray-800 ">Users</h2>
                        <span className="px-3 py-1 text-sm text-blue-600 bg-blue-100 rounded-full ">Active</span>
                    </div>

                </div>


            </div>
            <div className="mt-6 md:flex md:items-center md:justify-between">

                <div className="relative flex items-center mt-4 md:mt-0">
                    <span className="absolute">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mx-3 text-gray-400 dark:text-gray-600">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </span>
                    <input type="text" placeholder="Search" className="block w-full py-1.5 pr-5 text-gray-700 bg-white   rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5  " />
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
                                            No.
                                        </th>
                                        <th scope="col" className="text-center py-3.5 px-4 text-lg kanit-medium  font-normal  rtl:text-right text-black ">
                                            UserName
                                        </th>

                                        <th scope="col" className="text-center kanit-medium px-12 py-3.5 text-lg font-normal  rtl:text-right text-black ">
                                            Email
                                        </th>



                                        <th scope="col" className="px-4 py-3.5 text-lg kanit-medium font-normal text-center rtl:text-right text-black ">Block/UnBlock</th>



                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y  divide-gray-500 ">
                                    {data && (data.map((item, index) => (
                                        <tr key={index} >

                                            <td className="px-4 py-4 text-sm font-medium text-center whitespace-nowrap">
                                                <div>
                                                    <h2 className="text-xl kanit-regular text-black">{index + 1}</h2>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm font-medium whitespace-nowrap text-center">
                                                <div>
                                                    <h2 className="text-xl kanit-regular text-black">{item.name}</h2>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm font-medium whitespace-nowrap text-center">
                                                <div>
                                                    <h2 className="text-xl kanit-regular bg-yellow-400  rounded-md text-black">{item.email}</h2>
                                                </div>
                                            </td>




                                            <td className="px-4 py-4 text-sm   font-medium whitespace-nowrap text-center ">
                                                <div>
                                                    <button className={`text-md w-full h-8 rounded-md ${item.isBlocked ? 'bg-red-800' : 'bg-blue-800'} kanit-regular text-white`}>
                                                        <BlockModalItem itemName='User' blocked={item.isBlocked} onDelete={() => handleBlock(item._id)} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>

                                    ))
                                    )
                                    }




                                </tbody>

                            </table>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}








export default RecordTable;
