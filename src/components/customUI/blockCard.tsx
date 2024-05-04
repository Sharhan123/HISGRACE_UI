import React, { useState } from 'react';

interface DeleteItemModalProps {
  itemName: string;
  onDelete: () => void;
  blocked:boolean
}

const BlockModalItem: React.FC<DeleteItemModalProps> = ({ itemName, onDelete,blocked }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const onClose = ()=>{
    setShowModal(false)
  }
  return (
    <>
    <button data-toggle="modal"
                onClick={()=>setShowModal(true)}
                className={` text-md w-full h-8 rounded-md  kanit-regular text-white ${blocked?'bg-red-600':'bg-blue-800'}`}
            >{!blocked?'Block':'UnBlock'}</button>
    <div className="flex items-center justify-center h-screen">
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <div className="flex items-center justify-center h-12 w-12 bg-red-100 rounded-full">
              <svg
                width="64px"
                height="64px"
                className="h-6 w-6 text-blue-600"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#ef4444"
                strokeWidth="0.456"
              >
                <path
                  fill="#ef4444"
                  d="M12 7.25C12.4142 7.25 12.75 7.58579 12.75 8V13C12.75 13.4142 12.4142 13.75 12 13.75C11.5858 13.75 11.25 13.4142 11.25 13V8C11.25 7.58579 11.5858 7.25 12 7.25Z"
                />
                <path fill="#ef4444" d="M12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z" />
                <path
                  fill="#ef4444"
                  d="M8.2944 4.47643C9.36631 3.11493 10.5018 2.25 12 2.25C13.4981 2.25 14.6336 3.11493 15.7056 4.47643C16.7598 5.81544 17.8769 7.79622 19.3063 10.3305L19.7418 11.1027C20.9234 13.1976 21.8566 14.8523 22.3468 16.1804C22.8478 17.5376 22.9668 18.7699 22.209 19.8569C21.4736 20.9118 20.2466 21.3434 18.6991 21.5471C17.1576 21.75 15.0845 21.75 12.4248 21.75H11.5752C8.91552 21.75 6.84239 21.75 5.30082 21.5471C3.75331 21.3434 2.52637 20.9118 1.79099 19.8569C1.03318 18.7699 1.15218 17.5376 1.65314 16.1804C2.14334 14.8523 3.07658 13.1977 4.25818 11.1027L4.69361 10.3307C6.123 7.79629 7.24019 5.81547 8.2944 4.47643ZM9.47297 5.40432C8.49896 6.64148 7.43704 8.51988 5.96495 11.1299L5.60129 11.7747C4.37507 13.9488 3.50368 15.4986 3.06034 16.6998C2.6227 17.8855 2.68338 18.5141 3.02148 18.9991C3.38202 19.5163 4.05873 19.8706 5.49659 20.0599C6.92858 20.2484 8.9026 20.25 11.6363 20.25H12.3636C15.0974 20.25 17.0714 20.2484 18.5034 20.0599C19.9412 19.8706 20.6179 19.5163 20.9785 18.9991C21.3166 18.5141 21.3773 17.8855 20.9396 16.6998C20.4963 15.4986 19.6249 13.9488 18.3987 11.7747L18.035 11.1299C16.5629 8.51987 15.501 6.64148 14.527 5.40431C13.562 4.17865 12.8126 3.75 12 3.75C11.1874 3.75 10.4379 4.17865 9.47297 5.40432Z"
                />
              </svg>
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Block {itemName}</h3>
              <div className="mt-2 text-sm text-gray-500">
                <p>
                  Are you sure you want to {!blocked?'Block':'UnBlock'} <span className="font-bold">{itemName}</span>? 
                </p>
              </div>
            </div>
            <div className="mt-5 sm:mt-6">
              <button
                onClick={onDelete}
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                {!blocked?'Block':'UnBlock'}
              </button>
              <button
                onClick={()=>{setShowModal(false)
                  onClose()
                }}
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      
    </div>
    </>

  );
};

export default BlockModalItem;
