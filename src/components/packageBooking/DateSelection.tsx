import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import 'react-datepicker/dist/react-datepicker.css';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import { useDispatch } from 'react-redux';
import { showAlert } from '../../redux/slices/alertSlice';
interface Props {
  open: boolean;
  confirm:(data:any)=>void
  close: () => void;
}

const DateSelection: React.FC<Props> = ({ open, close ,confirm}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('12:00');
  const [meridian, setMeridian] = useState<string>('AM');
  const [adultCount, setAdultCount] = useState<number>(1);
  const [childCount, setChildCount] = useState<number>(0);
  const dispatch = useDispatch()
  const handleDateChange = (date: Date) => {
    if(date < new Date()){
      dispatch(showAlert({content:"The date should be after today.",color:"red"}))
      return 
    }
    setSelectedDate(date);

  };

  const handleConfirm = ()=>{
    const data = {
      period:{
        date:selectedDate,
        time:selectedTime,
        meridian:meridian
      },
      person:{
        adult:adultCount,
        child:childCount
      }

    }
    confirm(data)
  }

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let [hours, minutes] = e.target.value.split(':').map(Number);
    if (hours > 12) {
      hours -= 12;
      setMeridian('PM');
    } else if (hours === 12) {
      setMeridian('PM');
    } else if (hours === 0) {
      hours = 12;
      setMeridian('AM');
    } else {
      setMeridian('AM');
    }
    setSelectedTime(`${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`);
  };

  return (
    <div
      role="dialog"
      id="modal-example"
      aria-hidden="true"
      className={` ${open ? 'flex' : 'hidden'} modal fixed top-0 left-0 z-50 w-screen h-screen items-center flex-col justify-center p-6 fade`}
      tabIndex={-1}
    >
      <div className="grid-rows-4 h-56 grid w-3/6 rounded bg-white">
        <span className="border-b flex items-center justify-evenly col-span-1">
          <div className="flex">
            <CalendarMonthIcon color="success" />
            <p className="kanit-light ml-5 text-md text-black">Pick up date</p>
          </div>
          <div className="flex items-center justify-center">
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="dd MMM yy"
              className="text-black text-center kanit-regular text-lg outline-none bg-transparent"
              popperPlacement="bottom-start"
              popperModifiers={[
                {
                    name: 'offset',
                    options: {
                        offset: [0, 10],
                    },
                    fn: (data) => ({
                        ...data,

                    }),
                },
            ]}
            />
          </div>
          <div className="flex">
            <span className="text-black kanit-regular text-md">
              {selectedDate ? selectedDate.toLocaleDateString('en-GB', { weekday: 'long' }) : ''}
            </span>
          </div>
        </span>

        <span className="border-b flex items-center justify-around col-span-1">
        <div className="flex">
            <AccessAlarmsIcon color="primary" />
            <p className="kanit-light ml-5 text-md text-black">Pick up date</p>
          </div>
          <div className="flex items-center justify-center">
            <input
              type="time"
              value={selectedTime}
              onChange={handleTimeChange}
              className="text-black text-center kanit-regular text-lg outline-none bg-transparent"
            />
          </div>
          
          <div className="flex items-center justify-center">
            <select
              value={meridian}
              onChange={(e) => setMeridian(e.target.value)}
              className="text-black text-center kanit-regular text-lg outline-none bg-transparent"
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
        </span>

        <span className="flex border-b items-center justify-evenly col-span-1">
          <div className="flex">
            <p className="kanit-light ml-5 text-md text-black">Adults</p>
            <input
              type="number"
              min="1"
              value={adultCount}
              onChange={(e) => setAdultCount(Number(e.target.value))}
              className="text-black text-center kanit-regular text-lg outline-none bg-transparent ml-2"
            />
          </div>
          <div className="flex">
            <p className="kanit-light ml-5 text-md text-black">Children</p>
            <input
              type="number"
              min="0"
              value={childCount}
              onChange={(e) => setChildCount(Number(e.target.value))}
              className="text-black text-center kanit-regular text-lg outline-none bg-transparent ml-2"
            />
          </div>
        </span>
        <span className='flex items-center justify-evenly'>
          
          <button onClick={close} className='px-5 py-1 bg-red-600 rounded text-white kanit-light' >Cancel</button>
          <button onClick={handleConfirm} className='px-3 py-1 bg-custom rounded text-white kanit-light' >confirm booking</button>
        </span>
      </div>
    </div>
  );
};

export default DateSelection;
