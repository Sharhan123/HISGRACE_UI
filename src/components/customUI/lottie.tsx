import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import animationData from '../../assets/Animation - 1715165361315.json'; 

const LottieAnimation:React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const anim = lottie.loadAnimation({
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

  return <div className='h-36' ref={containerRef} />;
};

export default LottieAnimation;
