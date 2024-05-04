import React, { useEffect, useState } from 'react';
import './otp.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/slices/authSlice';
import { resendOtp, verifyotp } from '../../services/userServices';

const Otp: React.FC = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const [err, setErr] = useState('');
  const [timer, setTimer] = useState(60);
  const [resendVisible, setResendVisible] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    
    return () => {
      clearInterval(countdown);
    };
  }, []); 

  useEffect(() => {
    
    if (timer === 0) {
      setResendVisible(true);
    }
  }, [timer]); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!value) {
      setErr('Please enter an OTP number');
      return;
    }

    const data = {
      value: value
    };

    try {
      const res = await verifyotp(data);
      const rToken = res.token;
      localStorage.setItem('token', rToken);
      dispatch(loginSuccess(rToken));
      navigate('/');
    } catch (err: any) {
      if (err.response && err.response.data) {
        setErr(err.response.data.message);
      } else {
        console.log(err);
      }
    }
  };

  const handleResendOtp = async () => {
    try {
      await resendOtp()
      setTimer(60);
      setResendVisible(false);
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
          <p className="text-xl font-semibold">
            {Math.floor(timer / 60).toString().padStart(2, '0')}:
            {(timer % 60).toString().padStart(2, '0')}
          </p>
        </div>
        <h2 className="text-2xl font-bold mb-4 text-center">OTP</h2>
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

          {resendVisible && (
            <a className="text-blue-500 px-6 py-3 rounded-md cursor-pointer" onClick={handleResendOtp}>
              Resend OTP
            </a>
          )}
        </form>
      </div>
    </div>
  );
};

export default Otp;
