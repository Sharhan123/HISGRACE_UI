import React, { useState ,useEffect} from 'react'
import Navbar from '../../components/homePage/navbar'
import Home from '../../components/homePage/home'
import { useSelector } from 'react-redux'
import { handleLogout } from '../../services/userServices'
import { RootState } from '../../redux/store'
import { useDispatch } from 'react-redux'
const HomePage:React.FC = ()=> {
  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch()
  useEffect(()=>{
    if(!token){
      handleLogout(dispatch)
    }
  },[])
  return(
    
<>
<Navbar/>
<Home />

</>
  )
}

export default HomePage