import React from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
const  AdminNavbar:React.FC = ()=> {
  const navigate = useNavigate()
  return (
    <>
    <nav className="lg:block md:hidden hidden w-full max-w-full bg-transparent text-white shadow-none rounded-xl transition-all px-0 py-1">
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize">
          <nav aria-label="breadcrumb" className="w-max">
            <ol className="flex flex-wrap items-center w-full bg-opacity-60 rounded-md bg-transparent p-0 transition-all">
              <li className="flex items-center text-blue-gray-900 antialiased font-sans text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-light-blue-500">
                <a href="#">
                  <p className="block antialiased font-sans text-sm leading-normal text-blue-900 font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100">dashboard</p>
                </a>
                <span className="text-gray-500 text-sm antialiased font-sans font-normal leading-normal mx-2 pointer-events-none select-none">/</span>
              </li>
              <li className="flex items-center text-blue-900 antialiased font-sans text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-blue-500">
                <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">home</p>
              </li>
            </ol>
          </nav>
          <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-gray-900">home</h6>
        </div>
        <div className="flex items-center">
          <div className="mr-auto md:mr-4 md:w-56">
            
            </div>
            <button className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 grid xl:hidden" type="button">
            <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" stroke-width="3" className="h-6 w-6 text-blue-gray-500">
                <path fill-rule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clip-rule="evenodd"></path>
              </svg>
            </span>
          </button>
            <button onClick={()=>localStorage.removeItem('driver')} className="middle none font-sans font-bold center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-red-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 hidden items-center gap-1 px-4 xl:flex" type="button">
              <LogoutIcon className='text-red-500' />
              Logout </button>
           
           
          
         
          
          
          </div>
          </div>
          </nav>

          <nav className=' lg:hidden md:block grid grid-cols-3 gap-5 w-full h-auto px-2 py-5 bg-custom  items-center justify-around'>
            <button onClick={()=>navigate('/admin/dashboard')} className='px-2 h-fit py-1 text-sm kanit-regular rounded bg-white '>
              Dashboard
            </button>
            <button onClick={()=>navigate('/admin/vehicles')} className='px-2 h-fit py-1 text-sm kanit-regular rounded bg-white '>
              Vehicles
            </button>
            <button onClick={()=>navigate('/admin/packages')} className='px-2 h-fit py-1 text-sm kanit-regular rounded bg-white '>
              Packages
            </button>
            <button onClick={()=>navigate('/admin/users')} className='px-2 h-fit py-1 text-sm kanit-regular rounded bg-white '>
              Users
            </button>
            <button onClick={()=>navigate('/admin/bookings')} className='px-2 h-fit py-1 text-sm kanit-regular rounded bg-white '>
              Bookings
            </button>
            <button onClick={()=>navigate('/admin/dashboard')} className='px-2 h-fit py-1 text-sm kanit-regular rounded bg-white '>
              Packages Bookings
            </button>
            <button onClick={()=>navigate('/admin/chats')} className='px-2 h-fit py-1 text-sm kanit-regular rounded bg-white '>
              Chat
            </button>
            <button onClick={()=>navigate('/admin/reviews')} className='px-2 h-fit py-1 text-sm kanit-regular rounded bg-white '>
              Reviews
            </button>
            <button onClick={()=>{
                localStorage.removeItem('admin')

                navigate('/admin')
            }} className='px-2 text-white h-fit py-1 text-sm kanit-regular rounded bg-red-500 '>
              Logout
            </button>
            </nav>
            </>
  )
}

export default AdminNavbar