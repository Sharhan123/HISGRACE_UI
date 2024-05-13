import React, { useEffect, useRef } from 'react'
import './style.css'
import Lottie from 'lottie-web';
import animationData from '../../assets/loader.json'
interface props{
    open:boolean
}

const Loader:React.FC<props> = ({open})=> {
    const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const anim = Lottie.loadAnimation({
      container: containerRef.current as Element,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: animationData,
    });

    return () => {
      anim.destroy(); 
    };
  }, []);

 
    return (

       

        <div
            role="dialog"
            id="modal-example"
            aria-hidden="true"
            // style={{ display: 'none'  }}
            className={` ${open?'flex':'hidden'}  modal fixed top-0 left-0 z-50 w-screen h-screen bg-slate-200  items-center flex-col justify-center p-6 fade`}
            tabIndex={-1}
        >
          
          <div className='h-[25rem]' ref={containerRef} ></div>
          </div>

            
        
        
    )
}

export default Loader
