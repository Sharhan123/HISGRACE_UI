import React, { useEffect } from 'react'
import Modal from './registerForm'

const  MainContent:React.FC = ()=> {
  useEffect(()=>{
    document.body.style.overflowY = 'hidden'

    return ()=>{document.body.style.overflowY = ''}
  },[])
  return (
    <div className=' h-screen bg-gradient-to-br from-custom to-indigo-900'>
      <Modal />
    </div>
  )
}

export default MainContent
