import React from 'react'
import './style.css'
interface props{
    open:boolean
}

const Loader:React.FC<props> = ({open})=> {
    
    return (

       

        <div
            role="dialog"
            id="modal-example"
            aria-hidden="true"
            // style={{ display: 'none'  }}
            className={` ${open?'flex':'hidden'}  modal fixed top-0 left-0 z-50 w-screen h-screen bg-black/30  items-center flex-col justify-center p-6 fade`}
            tabIndex={-1}
        >
          
        <div className={`loader-second mt-10 text-6xl text-amber-900 kanit-bolder `}>

        </div>
        </div>

            
        
        
    )
}

export default Loader
