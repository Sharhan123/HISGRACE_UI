import React, { useEffect, useState } from 'react'
import VerifiedIcon from '@mui/icons-material/Verified';
import './style.css'  

interface BoardingPassProps {
  image: string;
  title: string;
  location: string;
}

import Barcode from 'react-barcode';

interface props{
  value:any
}

const BarcodeComponent :React.FC<props> = ({ value }) => {
  return (
    <div>
      <Barcode fontSize={12} height={30} value={value} />
    </div>
  );
};



const BoardingPass: React.FC<BoardingPassProps> = () => {
  return (
   
        <div className="flex flex-col container  items-center justify-center">
          <div className="bg-white h-full w-full relative drop-shadow-2xl rounded-[45px]  p-4 ">
            <div className="flex-none sm:flex">
              <div className="relative h-32 w-32 sm:mb-0 mb-3 hidden">
                {/* <img src={image} alt={title} className="w-32 h-32 object-cover rounded-2xl" /> */}
                <a href="#" className="absolute -right-2 bottom-2 -ml-3 text-white p-1 text-xs bg-green-400 hover:bg-green-500 font-medium tracking-wider rounded-full transition ease-in duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                  </svg>
                </a>
              </div>
              <div className="flex-auto justify-evenly">
                <div className="flex items-center mt-5 justify-center">
                  
                  <VerifiedIcon className='text-green'/>
                  <h1 className='kanit-regular ml-2 text-custom'>Payment Successfull</h1>
                </div>
                <div className="border-b border-dashed border-b-2 my-5"></div>
                <div className="flex  flex-col items-start h-auto justify-between">
                  <div className="flex   justify-between flex-col">
                    <div className="flex-auto text-xs text-gray-400 my-1">
                      <span className="mr-1">From</span>
                    </div>
                    <div className="w-full flex-none text-xl  kanit-medium leading-none">Kottakkal</div>
                    {/* <div className="text-xs">Cochin</div> */}
                  </div>
                  <div className="flex flex-col mx-auto">
                    {/* <img src={image} alt="Airline Logo" className="w-20 p-1" /> */}
                  </div>
                  <div className="flex mt-2 flex-col">
                    <div className="flex-auto text-xs text-gray-400 my-1">
                      <span className="mr-1">TO</span>
                    </div>
                    <div className="w-full flex-none text-xl kanit-medium leading-none">Calicut Internation Airport</div>
                  </div>
                </div>
                <div className="border-b border-dashed mb-5 border-b-2 my-2 pt-5">
                 
                </div>
                <div className="flex items-center mb-5  text-sm">
                  <div className="flex flex-col">
                    <span className="text-sm">Vehicle</span>
                    <div className="kanit-regular">Toyota Innova Hycross</div>
                  </div>
                  <div className="flex flex-col ml-auto">
                    <span className="text-sm">Total Km</span>
                    <div className="font-semibold">283 KM</div>
                  </div>
                </div>
                <div className="flex items-center mb-4 ">
                  <div className="flex flex-col text-sm">
                    <span>Date </span>
                    <div className="font-semibold">11 FEB 24</div>
                  </div>
                  <div className="flex flex-col mx-auto text-sm">
                    <span>Time</span>
                    <div className="font-semibold">11:30AM</div>
                  </div>
                  <div className="flex flex-col text-sm">
                    <span>Total Amount</span>
                    <div className="font-semibold">₹ 2600 /-</div>
                  </div>
                </div>
                <div className="border-b border-dashed border-b-2 my-2 pt-5">
                 
                </div>
                <div className="flex items-center justify-between  pt-3 text-sm">
                  <div className="flex flex-col">
                    <span>Passenger</span>
                    <div className="font-semibold">Mohammed Sharhan</div>
                  </div>
                  
                  <div className="flex flex-col">
                    <span>Type</span>
                    <div className="font-semibold">SUV</div>
                  </div>
                </div>
                <div className="flex flex-col py-5 justify-center text-sm">
                  <h6 className="kanit-regular  text-center">Please show the QR CODE to driver Thankyou !</h6>
                  <div className="justify-center flex w-full mt-4 ">

                <BarcodeComponent  value={'#6746788'} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
     
  );
};



const  PaymentConfirmation:React.FC = ()=> {

const [popUp,setPopUp] = useState(false)
useEffect(()=>{
  setPopUp(true)
},[])
  return (
    <div style={{backgroundImage:`url(https://images.vexels.com/media/users/3/157944/isolated/lists/b6a72d46f16e457ccfacf410edc462a6-dots-grid-design.png)`}} className={`h-[100vh] bg-black/20  flex items-center`}>
{/* <div className='h-4/5 py-10  w-2/6 rounded-md container mx-auto flex items-center'> */}

<div className={`mx-auto ${popUp ? 'block' : 'hidden mb-5'}  relative flex justify-center h-[650px] w-[310px] border border-[6px]  border-custom bg-white ${popUp ? 'jump-animation' : 'hidden'}`}
         style={{borderRadius:'45px'}}>
    {/* <div className='flex mt-3 justify-center items-center'> */}
    {/* </div> */}
    <BoardingPass image='' location='Kottakkal' title='Kottakkal to Kozhikode'/>
    <span className="border ml-2 absolute mx-auto top-2 border-custom bg-custom w-16 h-4  rounded-xl "></span>


    <span className="absolute -right-2 top-20 border border-4 border-custom h-10 rounded-md"></span>
    <span className="absolute -left-2 top-20   border-4 border-custom h-6  rounded-md"></span>
    <span className="absolute -left-2 top-32   border-4 border-custom h-24 rounded-md"></span>
    <span className="border ml-2 absolute bottom-1 border-custom bg-custom w-20 h-1  rounded-xl "></span>

</div>
        {/* </div> */}
        </div>
  )
}

export default PaymentConfirmation
