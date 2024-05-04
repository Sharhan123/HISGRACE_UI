import React, { useState } from 'react';

const Dropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const toggleSubDir = (check: number) => {
    const subList1 = document.getElementById('sublist1');
    const subList2 = document.getElementById('sublist2');
    const subList3 = document.getElementById('sublist3');

    switch (check) {
      case 1:
        if (subList1) subList1.classList.remove('hidden');
        if (subList2) subList2.classList.add('hidden');
        if (subList3) subList3.classList.add('hidden');
        break;
      case 2:
        if (subList1) subList1.classList.add('hidden');
        if (subList2) subList2.classList.remove('hidden');
        if (subList3) subList3.classList.add('hidden');
        break;
      case 3:
        if (subList1) subList1.classList.add('hidden');
        if (subList2) subList2.classList.add('hidden');
        if (subList3) subList3.classList.remove('hidden');
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <button
        className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 focus:bg-gray-100 w-64 p-4 shadow rounded bg-white text-sm font-medium leading-none text-gray-800 flex items-center justify-between cursor-pointer"
        onClick={toggleDropdown}
      >
        Channels
        <div>
          {isOpen ? (
            <div id="close">
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 0.666664L0.333333 5.33333H9.66667L5 0.666664Z" fill="#1F2937" />
              </svg>
            </div>
          ) : (
            <div id="open">
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 5.33333L9.66667 0.666656H0.333333L5 5.33333Z" fill="#1F2937" />
              </svg>
            </div>
          )}
        </div>
      </button>

      {isOpen && (
        <div className="w-64 mt-2 p-4 bg-white shadow rounded" id="dropdown">
          <div className="flex items-center justify-between">
            {/* Example subdirectory 1 */}
            <div className="flex items-center">
              <svg
                role="button"
                aria-label="dropdown"
                tabIndex={0}
                onClick={() => toggleSubDir(1)}
                className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 rounded-md"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4.5 3L7.5 6L4.5 9" stroke="#4B5563" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="pl-4 flex items-center">
                <div className="bg-gray-100 dark:bg-gray-800 border rounded-sm border-gray-200 dark:border-gray-700 w-3 h-3 flex flex-shrink-0 justify-center items-center relative">
                  <input aria-labelledby="fb1" type="checkbox" className="focus:opacity-100 checkbox opacity-0 absolute cursor-pointer w-full h-full" />
                  <div className="check-icon hidden bg-indigo-700 text-white rounded-sm">
                    <svg
                      className="icon icon-tabler icon-tabler-check"
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <path d="M5 12l5 5l10 -10" />
                    </svg>
                  </div>
                </div>
                <p id="fb1" className="focus:outline-none text-sm leading-normal ml-2 text-gray-800">
                  Facebook
                </p>
              </div>
            </div>
            <p className="focus:outline-none w-8 text-xs leading-3 text-right text-indigo-700">2,381</p>
          </div>

          {/* Additional subdirectories can be similarly added */}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
