import React from 'react'



interface BoardingPassProps {
  image: string;
  title: string;
  location: string;
}

const BoardingPass: React.FC<BoardingPassProps> = ({ image, title, location }) => {
  return (
   
        <div className="flex flex-col container  items-center justify-center">
          <div className="bg-white h-full relative drop-shadow-2xl rounded-[35px]  p-4 ">
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
                <div className="flex items-center justify-between">
                  <div className="flex items-center my-1">
                    <span className="mr-3 rounded-full bg-white w-8 h-8">
                      {/* <img src={image} alt="Airline Logo" className="h-8 p-1" /> */}
                    </span>
                    <h2 className="font-medium">{title}</h2>
                  </div>
                  <div className="ml-auto text-blue-800">{location}</div>
                </div>
                <div className="border-b border-dashed border-b-2 my-5"></div>
                <div className="flex items-center">
                  <div className="flex flex-col">
                    <div className="flex-auto text-xs text-gray-400 my-1">
                      <span className="mr-1">MO</span><span>19 22</span>
                    </div>
                    <div className="w-full flex-none text-lg text-blue-800 font-bold leading-none">COK</div>
                    <div className="text-xs">Cochin</div>
                  </div>
                  <div className="flex flex-col mx-auto">
                    {/* <img src={image} alt="Airline Logo" className="w-20 p-1" /> */}
                  </div>
                  <div className="flex flex-col">
                    <div className="flex-auto text-xs text-gray-400 my-1">
                      <span className="mr-1">MO</span><span>19 22</span>
                    </div>
                    <div className="w-full flex-none text-lg text-blue-800 font-bold leading-none">DXB</div>
                    <div className="text-xs">Dubai</div>
                  </div>
                </div>
                <div className="border-b border-dashed border-b-2 my-5 pt-5">
                 
                </div>
                <div className="flex items-center mb-5 p-5 text-sm">
                  <div className="flex flex-col">
                    <span className="text-sm">Flight</span>
                    <div className="font-semibold">Airbus A380</div>
                  </div>
                  <div className="flex flex-col ml-auto">
                    <span className="text-sm">Gate</span>
                    <div className="font-semibold">B3</div>
                  </div>
                </div>
                <div className="flex items-center mb-4 px-5">
                  <div className="flex flex-col text-sm">
                    <span>Board</span>
                    <div className="font-semibold">11:50 AM</div>
                  </div>
                  <div className="flex flex-col mx-auto text-sm">
                    <span>Departs</span>
                    <div className="font-semibold">11:30 AM</div>
                  </div>
                  <div className="flex flex-col text-sm">
                    <span>Arrived</span>
                    <div className="font-semibold">2:00 PM</div>
                  </div>
                </div>
                <div className="border-b border-dashed border-b-2 my-5 pt-5">
                 
                </div>
                <div className="flex items-center px-5 pt-3 text-sm">
                  <div className="flex flex-col">
                    <span>Passenger</span>
                    <div className="font-semibold">Ajimon</div>
                  </div>
                  <div className="flex flex-col mx-auto">
                    <span>Class</span>
                    <div className="font-semibold">Economy</div>
                  </div>
                  <div className="flex flex-col">
                    <span>Seat</span>
                    <div className="font-semibold">12E</div>
                  </div>
                </div>
                <div className="flex flex-col py-5 justify-center text-sm">
                  <h6 className="font-bold text-center">Boarding Pass</h6>
                  <div className="barcode h-14 w-0 inline-block mt-4 relative left-auto"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
     
  );
};



const  Success:React.FC = ()=> {
  return (
    <div className='h-[100vh] bg-custom flex items-center'>
<div className='h-4/5 py-10 bg-white w-2/6 rounded-md container mx-auto flex items-center'>

    <div  className="mx-auto   relative flex justify-center h-[580px] w-[280px] border border-4 border-black  bg-white"
    style={{borderRadius:'35px', boxShadow: '10px 10px 5px 12px rgb(209, 218, 218)' }}>
    {/* <div className='flex mt-3 justify-center items-center'> */}
    {/* </div> */}
    <BoardingPass image='' location='Kottakkal' title='Kottakkal to Kozhikode'/>
    <span className="border ml-2 absolute mx-auto top-2 border-black bg-black w-16 h-4  rounded-xl "></span>


    <span className="absolute -right-2 top-20 border border-4 border-black h-10 rounded-md"></span>
    <span className="absolute -left-2 top-20   border-4 border-black h-6  rounded-md"></span>
    <span className="absolute -left-2 top-32   border-4 border-black h-24 rounded-md"></span>
    <span className="border ml-2 absolute bottom-1 border-black bg-black w-20 h-1  rounded-xl "></span>

</div>
        </div>
        </div>
  )
}

export default Success
