import React, { useState } from 'react';
import { adminSignin } from '../../services/adminService';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showAlert } from '../../redux/slices/alertSlice';

const Login: React.FC = () => {

    const [email,setEmail] = useState('')
    const  [pass,setPass] = useState('')
    const [emailErr,setEmailErr] = useState('')
    const [passErr,setPassErr] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleSubmit = async ()=>{
        if(!email){
            setEmailErr('Please provide a email for admin login');

        }
        if(!pass){
            setPassErr('please provide a password for admin login')
            return
        }

        const data = {
            email:email,
            password:pass
        }


        try{
            const res = await adminSignin(data)
            console.log(res.data.token);
            
            localStorage.setItem('admin',res.data.token)
            navigate('/admin/dashboard')
        }catch(err:any){
            if(err.response.data){
                if(err.response.data.email){
                    setEmailErr(err.response.data.email)
                    return
                }
                else if(err.response.data.password){
                    setPassErr(err.response.data.password)
                    return
                }else{
                    dispatch(showAlert({color:'red',content:err.response.data.message}))
                }
            }
        }


    }

    return (

        
        <div className="min-w-screen h-screen flex items-center justify-center px-5 py-5">
            <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden" style={{ maxWidth: '1000px' }}>
                <div className="md:flex w-full">
                    <div className="hidden md:block w-1/2 bg-custom py-10 px-10">
                        {/* SVG Image */}
                    </div>
                    <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
                        <div className="text-center mb-10">
                            <h1 className="font-bold text-3xl text-gray-900">ADMIN</h1>
                            <p>Enter your credentials to login</p>
                        </div>
                        <div>
                            <div className="flex -mx-3">
                                <div className="w-full px-3 mb-12">
                                    <label htmlFor="" className="text-xs font-semibold px-1">Email</label>
                                    <div className="flex">
                                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-email-outline text-gray-400 text-lg"></i></div>
                                        <input type="email" onChange={(e)=>{setEmail(e.target.value)}} className={`w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 ${emailErr?'border-red-500':'border-gray-200'} outline-none focus:border-indigo-500`} placeholder="" />
                                    
                                    </div>
                                        <p className='text-red-600 text-sm kanit-regular '>{emailErr}</p>
                                </div>
                            </div>
                            <div className="flex -mx-3">
                                <div className="w-full px-3 mb-12">
                                    <label htmlFor="" className="text-xs font-semibold px-1">Password</label>
                                    <div className="flex">
                                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-lock-outline text-gray-400 text-lg"></i></div>
                                        <input type="password" onChange={(e)=>setPass(e.target.value)} className={`w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 ${passErr?'border-red-500':'border-gray-200'} outline-none focus:border-indigo-500`} placeholder="************" />
                                    </div>
                                        <p className='text-red-600 text-sm kanit-regular '>{passErr}</p>
                                </div>
                            </div>
                            <div className="flex -mx-3">
                                <div className="w-full px-3 mb-5">
                                    <button className="block w-full max-w-xs mx-auto bg-custom hover:bg-custom focus:bg-custom text-white rounded-lg px-3 py-3 font-semibold" onClick={handleSubmit}>LOGIN</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       
    );
}

export default Login;
