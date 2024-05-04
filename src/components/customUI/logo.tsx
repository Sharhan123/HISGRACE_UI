import React from 'react'
import Image from '../../assets/HISGRACE-logos_transparent.png'
const HISGRACE:React.FC = ()=> {
  return (
    <div style={{

        backgroundImage: `url(${Image})`,
        backgroundSize: 'cover',  // or 'contain' depending on your design
        backgroundPosition: 'center',
        height: '60%',  // 50% of the viewport height
        width: '30%',   // 20% of the viewport width

    }}>
        </div>
    )
  }
  export default HISGRACE