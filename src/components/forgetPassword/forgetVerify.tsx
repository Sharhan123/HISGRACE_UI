import React, {  useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { resetPassword } from '../../services/userServices';


const ForgetVerify: React.FC = () => {
    const [pass, setPass] = useState('')
    const [cpass, setCpass] = useState('')
    
    const [passErr, setPassErr] = useState('')
    const [cpassErr, setCpassErr] = useState('')
    

    const navigate = useNavigate()

    useEffect(()=>{
        localStorage.removeItem('otp')  
    },[])

    const handleSubmit = async () => {
        setPassErr('')
        setCpassErr('')

        if (!pass.trim()) {
            setPassErr('Please enter your new password')
            return
        }
        if(pass.length < 4){
            setPassErr('Minimum password must be at least 4 characters')
        }

        if(!cpass.trim()){
            setCpassErr('Please confirm your password')
            return
        }
        if(cpass !== pass){
            setCpassErr('Your confirm password is incorrect')
            return 
        }
        const email = localStorage.getItem('email')

        const data = {
            pass,
            cpass,
            email
        }

        try {
            const res = await resetPassword(data)
            localStorage.removeItem('email')
            navigate(`/signin-signup`)
        } catch (err) {
            console.log(err);

        }




    }

    return (
        <> 
                <div
                    role="dialog"
                    id="modal-example"
                    aria-hidden="false"
                    style={{ display: 'flex' }}
                    className="modal fixed top-0 left-0 z-50 w-screen h-screen bg-black/30 flex items-center flex-col justify-center p-6 fade"
                    tabIndex={-1}
                >
                    <div className="absolute top-0 left-0 z-[0] w-full h-full" tabIndex={-1}></div>

                    <article
                        className="modal-content flex w-2/6 h-auto flex-col overflow-auto  relative m-0 rounded-md bg-white sm:my-16"
                        aria-labelledby="modal-title"
                        aria-describedby="modal-body"
                    >




                        <header className="flex p-4 items-center justify-between">
                            <h2 className="m-0 text-xl font-medium max-w-[calc(100%_-_3rem)]">Reset your password</h2>
                            <button
                                type="button"
                                className="flex items-center justify-center w-8 h-8 rounded-full bg-transparent transition-colors duration-300 hover:bg-black/10"
                                onClick={()=>navigate('/signin-signup')}
                                aria-label="Close"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="22"
                                    height="22"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#000000"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    style={{ '--size': '32rem' } as React.CSSProperties}
                                >
                                    <line x1="18" y1="6" x2="6" y2="18" ></line>
                                    <line x1="6" y1="6" x2="18" y2="18" ></line>
                                </svg>
                            </button>
                        </header>
                        <main className="relative flex-[1_1_auto] p-4 w-full " >
                            <label htmlFor="input-group-1" className="block mb-2 text-sm font-medium text-black text-start">New Password</label>
                            <div className="relative mb-6">

                                <input onChange={(e) => { setPass(e.target.value) }} value={pass} type="text" name='name' id="input-group-1" className={`bg-gray-50 border border-gray-300 text-gray-900 ${passErr ? 'border-red-500' : ''} text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5   `} placeholder="New Password" />
                                <p className='text-red-500 kanit-regular text-start ml-2'>{passErr}</p>
                            </div>
                            <label htmlFor="input-group-1" className="block mb-2 text-sm font-medium text-black text-start">Confirm Password</label>
                            <div className="relative mb-6">

                                <input onChange={(e) => { setCpass(e.target.value) }} value={cpass} type="text" name='name' id="input-group-1" className={`bg-gray-50 border border-gray-300 text-gray-900 ${cpassErr ? 'border-red-500' : ''} text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5   `} placeholder="Confirm New Password" />
                                <p className='text-red-500 kanit-regular text-start ml-2'>{cpassErr}</p>
                            </div>
                           

                        </main>

                        <footer className="flex flex-shrink-0 flex-wrap items-center justify-end flex-row p-4 gap-1" >
                            
                            <button

                                onClick={handleSubmit}
                                type="button"
                                className="flex items-center justify-center px-4 font-medium bg-violet-700 text-white h-9 rounded-md rounded md hover:bg-violet-800 transition-all duration-300"
                            >
                                <span className="flex items-center justify-center space-x-2">Submit</span>
                            </button>
                        </footer>



                    </article>
                </div>
          




        </>
    );
};

export default ForgetVerify;
