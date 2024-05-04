import React from 'react';
import HISGRACE from './logo';
import { FaWhatsapp, FaInstagram, FaFacebook,FaTwitter } from 'react-icons/fa'; // Import icons from react-icons library

const Footer: React.FC = () => {
  return (
    <div className="bg-custom ">
      <div className="flex flex-col mx-3 bg-custom rounded-lg">
        <div className="w-full draggable">
          <div className="container flex flex-col mx-auto">
            <div className="flex flex-col items-center w-full my-20">
              <span className="mb-8">
                <h1 className='text-4xl kanit-bold text-white'>HISGRACE CABS</h1>
              </span>
              <div className="flex flex-col items-center gap-6 mb-8">
                <div className="flex flex-wrap items-center justify-center gap-5 lg:gap-12 gap-y-3 lg:flex-nowrap text-dark-grey-900">
                  <a href="javascript:void(0)" className="text-gray-200 hover:text-gray-900">About</a>
                  <a href="javascript:void(0)" className="text-gray-200 hover:text-gray-900">Features</a>
                  <a href="javascript:void(0)" className="text-gray-200 hover:text-gray-900">Blog</a>
                  <a href="javascript:void(0)" className="text-gray-200 hover:text-gray-900">Resources</a>
                  <a href="javascript:void(0)" className="text-gray-200 hover:text-gray-900">Partners</a>
                  <a href="javascript:void(0)" className="text-gray-200 hover:text-gray-900">Help</a>
                  <a href="javascript:void(0)" className="text-gray-200 hover:text-gray-900">Terms</a>
                </div>
                <div className="social-icons w-2/6 flex justify-between">
        <a href="https://wa.me/your-whatsapp-number" target="_blank" rel="noopener noreferrer">
          <FaWhatsapp style={{ fontSize: '24px', color:'green' }} /> {/* Adjust the icon size here */}
        </a>
        <a href="https://www.instagram.com/your-instagram-id" target="_blank" rel="noopener noreferrer">
          <FaInstagram style={{ fontSize: '24px' ,color:'orangered'}} /> {/* Adjust the icon size here */}
        </a>
        <a href="https://www.facebook.com/your-facebook-page" target="_blank" rel="noopener noreferrer">
          <FaFacebook style={{ fontSize: '24px', color:'blue' }} /> {/* Adjust the icon size here */}
        </a>
        <a href="https://www.facebook.com/your-facebook-page" target="_blank" rel="noopener noreferrer">
          <FaTwitter style={{ fontSize: '24px',color:'skyblue' }} /> {/* Adjust the icon size here */}
        </a>
        {/* Add more social icons as needed */}
      </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
