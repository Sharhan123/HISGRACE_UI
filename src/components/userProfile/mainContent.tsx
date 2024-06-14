import React, { ChangeEvent, useEffect, useRef, useState } from 'react';

import { getUser, handleLogout, updateImage } from '../../services/userServices';
import { Itoken, IuserRes } from '../../interfaces';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { jwtDecode } from 'jwt-decode';
import Loader from '../customUI/loader';
import UserModal from '../customUI/modalUser';
import { showAlert } from '../../redux/slices/alertSlice';
import { useDispatch } from 'react-redux';
import { selectBookingData } from '../../redux/slices/bookingSice';
import ProfilePage from './profilePage'; 
import BookingsPage from './bookingsPage';
import { useNavigate } from 'react-router-dom';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import PackageBookingsPage from './packageBookings';




const Profile: React.FC = () => {
  const dispatch = useDispatch()
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selected,setSelected] = useState('profile')
  const [showModal, setShowModal] = useState(false)
  const [edit, setEdit] = useState(false)
  const [user, setUser] = useState<IuserRes>()
  let image = ''
  const navigate = useNavigate()
  const token = useSelector((state: RootState) => state.auth.token);
  const fetch = async () => {
    if (token) {
      setOpen(true)
      const data: Itoken = jwtDecode(token)
      if (data) {
        try {
          const res = await getUser()
          setUser(res.data.data)
          setProfile(res.data.data.profile)
          setOpen(false)
        } catch (err) {
          console.log(err);
          setOpen(false)
        }
      }
    }

  }
  const booking =  useSelector(selectBookingData)
  useEffect(() => {
    
    console.log(booking);

    fetch()
    document.body.style.overflowY = 'hidden'
    return ()=>{
      document.body.style.overflowY = ''
    }
  }, [])

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const [open, setOpen] = React.useState(false);
  const [selectedFiles, setSelectedFiles] = useState('')
  const [profile, setProfile] = useState('')
  
  const handleFile = async (e: ChangeEvent<HTMLInputElement>) => {

    if (e.target.files && e.target.files.length > 0) {


      const file = e.target.files[0];

      const reader = new FileReader();

      reader.onload = (event) => {
        image = event.target?.result as string;
        setSelectedFiles(image)
      };

      reader.readAsDataURL(file)
      setShowModal(true)
    }
  }

  const handleClose = () => {
    setSelectedFiles('')
    setShowModal(false)
  }
  
  const handleImageSubmit = async () => {
    try {
      setOpen(true)
      const res = await updateImage({ image: selectedFiles, id: user?._id })
      setProfile(res.data.data.profile)
      dispatch(showAlert({ head: 'Profile Image Updated successfuly', content: 'Your profile picture has been updated successfuly', color: 'green' }))
      setOpen(false)
    } catch (err:any) { 
      console.error('Error fetching data:', err);
      if(err.response.data){ 
          dispatch(showAlert({content:err.response.data.message,color:'red'}))
          return 
      }
      dispatch(showAlert({content:err.message,color:'red'}))

  }
  }

  return (
    <>
      <UserModal close={() => setEdit(false)} reload={fetch} data={user} open={edit} />
      <Loader open={open} />
      <div className="flex min-h-screen flex-row bg-gray-100 text-white">

        <div className="flex items-center justify-center h-screen">
          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75" onClick={() => setShowModal(false)}>
              <div className="bg-white rounded-lg flex flex-col items-center p-6 max-w-sm w-full">
                <div className="flex items-center justify-center h-12 w-12 bg-red-100 rounded-full">
                  <svg
                    width="64px"
                    height="64px"
                    className="h-6 w-6 text-blue-600"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#ef4444"
                    strokeWidth="0.456"
                  >
                    <path
                      fill="blue"
                      d="M12 7.25C12.4142 7.25 12.75 7.58579 12.75 8V13C12.75 13.4142 12.4142 13.75 12 13.75C11.5858 13.75 11.25 13.4142 11.25 13V8C11.25 7.58579 11.5858 7.25 12 7.25Z"
                    />
                    <path fill="blue" d="M12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z" />
                    <path
                      fill="blue"
                      d="M8.2944 4.47643C9.36631 3.11493 10.5018 2.25 12 2.25C13.4981 2.25 14.6336 3.11493 15.7056 4.47643C16.7598 5.81544 17.8769 7.79622 19.3063 10.3305L19.7418 11.1027C20.9234 13.1976 21.8566 14.8523 22.3468 16.1804C22.8478 17.5376 22.9668 18.7699 22.209 19.8569C21.4736 20.9118 20.2466 21.3434 18.6991 21.5471C17.1576 21.75 15.0845 21.75 12.4248 21.75H11.5752C8.91552 21.75 6.84239 21.75 5.30082 21.5471C3.75331 21.3434 2.52637 20.9118 1.79099 19.8569C1.03318 18.7699 1.15218 17.5376 1.65314 16.1804C2.14334 14.8523 3.07658 13.1977 4.25818 11.1027L4.69361 10.3307C6.123 7.79629 7.24019 5.81547 8.2944 4.47643ZM9.47297 5.40432C8.49896 6.64148 7.43704 8.51988 5.96495 11.1299L5.60129 11.7747C4.37507 13.9488 3.50368 15.4986 3.06034 16.6998C2.6227 17.8855 2.68338 18.5141 3.02148 18.9991C3.38202 19.5163 4.05873 19.8706 5.49659 20.0599C6.92858 20.2484 8.9026 20.25 11.6363 20.25H12.3636C15.0974 20.25 17.0714 20.2484 18.5034 20.0599C19.9412 19.8706 20.6179 19.5163 20.9785 18.9991C21.3166 18.5141 21.3773 17.8855 20.9396 16.6998C20.4963 15.4986 19.6249 13.9488 18.3987 11.7747L18.035 11.1299C16.5629 8.51987 15.501 6.64148 14.527 5.40431C13.562 4.17865 12.8126 3.75 12 3.75C11.1874 3.75 10.4379 4.17865 9.47297 5.40432Z"
                    />
                  </svg>

                </div>
                <h3 className="text-lg text-center font-medium leading-6 text-gray-900">Upload Image </h3>
                <div className="mt-4 text-center">
                  <img src={selectedFiles} alt="" className="mt-5 mx-auto w-44 h-44 object-cover" />

                </div>
                <div className="mt-5   sm:mt-6">

                  <button
                    onClick={handleClose

                    }
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleImageSubmit}
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Upload
                  </button>
                </div>
              </div>
            </div>
          )}


        </div>
        {/* Sidebar */}
        <aside
          className={`sidebar w-80 flex flex-col justify-around transform bg-custom p-4 transition-transform duration-150 ease-in ${open ? 'translate-x-0' : '-translate-x-full'
            } md:translate-x-0 md:shadow-md`}
        >
          <div>

            <p className='kanit-medium text-2xl text-white text-center '>HISGRACE CABS</p>
          </div>
          <div className="my-4 w-full border-b-1 border-indigo-100 text-center">
            <span className="font-mono text-xl font-bold tracking-widest">
              <li className="flex items-center flex-col">
                {
                  profile?(

                    <img src={profile} alt="" className="rounded-full w-52 h-52 object-cover" />
                  ):(
                    <div className='rounded-full w-52 h-52 flex justify-center items-center bg-gray-400 text-'>No Image</div>
                  )
                }
                <button onClick={handleButtonClick} className=" mt-5 text-sm w-auto px-2 h-8 rounded-md bg-orange-600 kanit-light text-white">update Image</button>
                <input
                  ref={fileInputRef}
                  className="hidden"
                  type="file"
                  onChange={(e) => {
                    handleFile(e)
                  }
                  }
                />
              </li>
            </span>
          </div>
          <div className="my-4">



            <span onClick={()=>setSelected('profile')} aria-label="dashboard" className={`cursor-pointer kanit-regular relative px-4 py-3 flex items-center space-x-4 rounded-lg   ${selected ==='profile'? 'text-black bg-white':'' } `}>
              <i className="fas fa-user"></i>
              <span className="-mr-1 font-medium">Profile</span>
            </span>
            

            <span onClick={()=>setSelected('bookings')} className={`px-4 py-3  cursor-pointer kanit-regular flex items-center space-x-4 rounded-md  ${selected ==='bookings'?'bg-white text-black':'' } group`}>
              <i className="fas fa-exchange-alt"></i>
              <span>Bookings</span>
            </span>
            <span onClick={()=>setSelected('packages')}  className={`px-4 cursor-pointer py-3 flex items-center kanit-regular space-x-4 rounded-md ${selected ==='packages'?'bg-white text-black':'' } group`}>
              <i className="fas fa-store"></i>
              <span>Packages</span>
            </span>

            
            <span onClick={()=>navigate('/')} className="px-4 py-3 flex items-center cursor-pointer kanit-regular space-x-4 rounded-md text-white group">
              <KeyboardReturnIcon/>
              <span> Home</span>
            </span>
          </div>
          <a onClick={()=>{

            handleLogout(dispatch)
            
          }
            } className="px-4 py-3 flex cursor-pointer kanit-regular items-center space-x-4 rounded-md bg-gradient-to-r from-red-700 to-red-500 text-white group">
            <i className="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </a>


        </aside>

        {/* Main Content */}
        <main
          className={`main w-full flex flex-grow flex-col p-4 transition-all duration-150 ease-in  ${open ? 'ml-0' : '-ml-48'
            } md:ml-0`}
        >
          {
            selected === 'profile'&&(
   
              <ProfilePage  user={user}  setEdit={()=>setEdit(true)} /> 
            ) 
          }
          {
            selected === 'bookings'&&(
              <BookingsPage/>
            ) 
          }
          {
            selected === 'packages'&&(
              <PackageBookingsPage/>
            )
          }
        </main>
      </div>
    </>
  );
};


export default Profile;
