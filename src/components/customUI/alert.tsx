// Alert.tsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import WarningIcon from '@mui/icons-material/Report';
import { RootState } from '../../redux/store';
import { hideAlert } from '../../redux/slices/alertSlice';
import not from '../../assets/notification.mp3'
interface Props {
  close: () => void;
}

const Alert: React.FC = () => {
  const { show, head, content, color } = useSelector((state: RootState) => state.alert);
  const dispatch = useDispatch();

  useEffect(() => {
    if(show){

        const audio = new Audio(not); 
        audio.play();
    }
    setTimeout(()=>{
      dispatch(hideAlert());
    },10000)
    
  },[show]);

  const handleDismiss = () => {
    dispatch(hideAlert());
    close();
  };

  return (
    <div className={`modal fixed bottom-3 right-0 z-50 w-auto h-auto  flex-col justify-end p-6 fade ${show ? 'flex' : 'hidden'}`}>
      <div className="rounded-lg bg-white py-3 px-3 text-start leading-5 text-black">
        <div className="flex items-center justify-between">
          <WarningIcon className={`text-${color}-600 text-${color}`} />
          <p className="text-md ml-5 kanit-regular text-start">{content}</p>

          <button onClick={handleDismiss} className="rounded-lg p-1 text-black">
            <svg xmlns="http://www.w3.org/2000/svg" className="ml-5 h-6 w-6" fill="black" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default Alert;
