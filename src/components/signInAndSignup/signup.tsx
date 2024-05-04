import React, { useState, FormEvent } from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
import './signup.css';
import Image from '../../assets/HISGRACE-logos_transparent.png'
import axiosWithAuth from '../../services/axiosConfig';
interface SignUpProps { }
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/slices/authSlice';
import { register } from '../../services/userServices';
import Forget from '../forgetPassword/forgetPassword';
import { showAlert } from '../../redux/slices/alertSlice';
const SignUp: React.FC<SignUpProps> = () => {

  const [value, setValue] = useState('')
  const [className, setClass] = useState<string>('');
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [pass, setPass] = useState<string>('')
  const [cpass, setCpass] = useState<string>('')

  const [emailErr, setEmailErr] = useState('')
  const [passErr, setPassErr] = useState('')
  const [nameErr, setNameErr] = useState('')
  const [cpassErr, setCpassErr] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    function isValidEmail(email: string) {
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return pattern.test(email);
    }
    if (!name) {
      setNameErr('Please provide a user name')

    }
    if (/\d/.test(name)) {
      setNameErr('Name cannot contain numbers')
      return 
    }
  
    if (name.length < 4) {
      setNameErr('Name must be at least 4 characters long')
      return 
    }
    if (!email || !isValidEmail(email)) {
      setEmailErr('Please enter a valid email address')
    }
    if (!pass) {
      setPassErr('Please provide a password')
    }
    if(pass.length < 4 ){
      setPassErr('Password should atleast 4')
      return
    }
    if (!cpass) {
      setCpassErr('Please confirm your password')
      return
    }
   

    const data = { name: name, email: email, password: pass, cpassword: cpass }

    try {

      const response = await register(data)
      localStorage.setItem('token', response.token);
      console.log(response.token);
      navigate('/otp');

    } catch (err: any) {
      if (err.response && err.response.data) {
        console.log(err.response.data);
        if (err.response.data.role === 'email') {
          setEmailErr(err.response.data.message);

        }
        if (err.response.data.role === 'password') {
          setPassErr(err.response.data.message)
        }
      } else {
        console.log(err);
      }
    }
  }

  const handleSigninSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    function isValidEmail(email: string) {
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return pattern.test(email);
    }
    if (!email || !isValidEmail(email)) {
      setEmailErr('Please enter a valid email address')
    }
    if (!pass) {
      setPassErr('Please provide a password')
    }
    const data = { email: email, password: pass }
    try {

      const response = await axiosWithAuth.post('/user/verifylogin', data);

      if (response.status === 200) {
        localStorage.setItem('token', response.data.authData.refreshToken);
        dispatch(loginSuccess(response.data.authData.refreshToken))
        dispatch(showAlert({head:'Successfully Logged IN',content:'You are successfull logged in to Hisgrace, now you can proceed with your bookings.',color:'green'}))
        navigate('/');
      }
    } catch (err: any) {
      if (err.response && err.response.data) {
        console.log(err.response.data);
        if (err.response.data.authData.role === 'email') {

          setEmailErr(err.response.data.authData.message);
        }
        if (err.response.data.authData.role === 'password') {
          setPassErr(err.response.data.authData.message)
        }
      } else {
        console.log(err);
      }
    }

  }




  const handleSignup = () => {
    setClass('sign-up-mode');
  };

  const handleSignin = () => {
    setClass('');
  };


  return (
    <div className={`container-login ${className}`}>
      <div className="forms-container">
        <div className="signin-signup">

          <form onSubmit={handleSigninSubmit} className="sign-in-form">
            {value && (
              <div className="mb-4">
                <p className='text-red-500 '>* {value}</p>
              </div>
            )}
            <h2 className="title">Sign in</h2>
            <div className={`input-field ${emailErr ? 'border-red-500' : ''} border`}>
              <i className="fas fa-user"></i>
              <input type="text" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Username" />
            </div>
            <p className='text-xs kanit-regular text-red-600'>{emailErr}</p>

            <div className={`input-field ${passErr ? 'border-red-500' : ''} border`}>
              <i className="fas fa-lock"></i>
              <input onChange={(e) => setPass(e.target.value)} value={pass} type="password" placeholder="Password" />
            </div>
            <p className='text-xs kanit-regular text-red-600'>{passErr}</p>

            <p onClick={() => navigate('/forgetPassword')} className='text-sm kanit-regular text-blue-600 text-end'>Forget password ?</p>
            <button className="btn transparent" id="sign-up-btn">
              Sign In
            </button>
            <p onClick={handleSignup} className="social-text" style={{ color: 'blue', cursor: 'pointer' }}>Are you new user? Register</p>
            {/* <div className="social-media">
              <a href="#" className="social-icon">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-google"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div> */}
          </form>
          <form onSubmit={handleSignupSubmit} className="sign-up-form">
            {value && (
              <div className="mb-4">
                <p className='text-red-500 '>* {value}</p>
              </div>
            )}


            <h2 className="title">Sign up</h2>
            <div className={`input-field ${nameErr ? 'border-red-500' : ''} border`}>
              <i className="fas fa-user"></i>
              <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Username" name='name' />

            </div>
            <p className='text-xs kanit-regular text-red-600'>{nameErr}</p>
            <div className={`input-field ${emailErr ? 'border-red-500' : ''} border`}>
              <i className="fas fa-envelope"></i>
              <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Email" name='email' />
            </div>
            <p className='text-xs kanit-regular text-red-600'>{emailErr}</p>
            <div className={`input-field ${passErr ? 'border-red-500' : ''} border`}>
              <i className="fas fa-lock"></i>
              <input type="password" onChange={(e) => setPass(e.target.value)} value={pass} placeholder="Password" name='password' />

            </div>
            <p className='text-xs kanit-regular text-red-600'>{passErr}</p>
            <div className={`input-field ${cpassErr ? 'border-red-500' : ''} border`}>
              <i className="fas fa-lock"></i>
              <input type="password" onChange={(e) => setCpass(e.target.value)} value={cpass} placeholder="Confirm Password" name='cpassword' />

            </div>
            <p className='text-xs kanit-regular text-red-600'>{cpassErr}</p>
            <button className="btn transparent" id="sign-up-btn">
              Sign Up
            </button>
            <p onClick={handleSignin} className="social-text" style={{ color: 'blue', cursor: 'pointer' }}>Already signed in ? Login</p>

            <button className="" style={{}} id="sign-up-btn">
              <i className="fab fa-google" style={{ color: 'red' }}></i>
            </button>

          </form>
        </div>
      </div>

      <div className="panels-container">

        <div className="panel left-panel">
          <div className="content">
            <img src={Image} alt="" />

          </div>
          <img src={Image} className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us ?</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              laboriosam ad deleniti.
            </p>
            <button
              onClick={handleSignin}
              className="btn transparent"
              id="sign-in-btn"
            >
              Sign in
            </button>
          </div>
          <img src="img/register.svg" className="image" alt="" />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
