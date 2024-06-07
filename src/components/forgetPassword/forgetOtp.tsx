import React, {  useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { forgetVerify } from '../../services/userServices';

const ForgetOtp: React.FC = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const [err, setErr] = useState('');

 


const email = localStorage.getItem('email')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!value) {
      setErr('Please enter an OTP number');
      return;
    }

    const data = {
      value: value,
      email:email
    };

    try {
       await forgetVerify(data);
      navigate('/resetPassword');
    } catch (err: any) {
      if (err.response && err.response.data) {
        setErr(err.response.data.message);
      } else {
        console.log(err);
      }
    }
  };
  return (
    <div className="bg-custom min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-4">
          
        </div>
        <h2 className="text-2xl font-bold mb-4 text-center">Forget Password </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="otp"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className={`border ${err ? 'border-red-500' : ''} block w-full rounded-md py-1.5 pl-7 pr-20 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6`}
              placeholder="Enter your OTP"
            />
            {err && <p className="text-red-500 text-xs ml-2">{err}</p>}
          </div>

          <button type="submit" className="bg-custom text-white px-6 py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
            Verify OTP
          </button>

         
        </form>
      </div>
    </div>
  );
};

export default ForgetOtp;
