import React, { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { IdriverRes } from '../../interfaces'
import { findDriver } from '../../services/driverService'
import PendingPage from '../driverRegister/pendingPage'
import Rejected from '../driverRegister/rejected'
import { Navigate, useNavigate } from 'react-router-dom'
import MainContent from './dashboard'
import Dashboard from './dashboard'
const Aprooval:React.FC = ()=> {
    const [driver,setDriver] = useState<IdriverRes>()
    const navigate = useNavigate()
  const fetch = async ()=>{
    try{
        const token = localStorage.getItem('driver')
        if(token){

            const decoded:any = jwtDecode(token)

                const res = await findDriver(decoded.id)
                setDriver(res.data.data)
                console.log(res.data.data,'driver');
                 
        }
    }catch(err){
        console.log(err);
        
    }
  }
    useEffect(()=>{
        fetch()
    document.body.style.overflowY = 'hidden'
    return ()=>{document.body.style.overflowY = ''}
  },[])

    return (
    <>
    {
        driver?.status ==='verified' && (
            <PendingPage driver={driver}/>
        )
    }
    {
        driver?.status ==='rejected' && (
            <Rejected driver={driver}/>
        )
    }
    {
        driver?.status === 'active' && (
            <Dashboard/>
           
        )
    }
    </>
  )
}

export default Aprooval
