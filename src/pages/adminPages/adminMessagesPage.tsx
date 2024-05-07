import React from 'react'
import AdminChat from '../../components/adminMessages.tsx/mainConten'
import { Socket } from 'socket.io-client'

const AdminMessagesPage:React.FC = ()=> {
  return (
    <>
     <AdminChat /> 
    </>
  )
}

export default AdminMessagesPage
