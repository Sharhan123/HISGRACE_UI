import React from 'react'
import './style.css'
interface props{
    open:boolean
}

const MainLoader:React.FC<props> = ({open})=> {
    return (

       

        <div
            role="dialog"
            id="modal-example"
            aria-hidden="true"
            // style={{ display: 'none'  }}
            className={` ${open?'flex':'hidden'}  modal fixed top-0 left-0 z-50 w-screen h-screen bg-custom  items-center flex-col justify-center p-6 fade`}
            tabIndex={-1}
        >
            <h1 className='text-4xl text-white kanit-medium'>HISGRACE</h1>
        <div className={`loader mt-5   text-3xl text-white kanit-bolder `}>

        </div>
        </div>

            
        
        
    )
}

export default MainLoader
