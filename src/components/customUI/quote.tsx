import React from 'react';
import './style.css'; // Import custom CSS file for component styling

interface props{
    name?:string
}

const QuoteComponent: React.FC<props> = ({name}) => {
    return (
        <section className="component bg-custom rounded-md p-10 mx-1 md:mx-10">
            <blockquote className="relative text-white text-center p-10 w-full m-1">
                <span className="quote-text">
                    It’s good to meet you, <span className='font-bold text-lg text-yellow-400'><span className='text-lg fond-bold text-white'>Mr/Mrs. </span> {name}</span>. Thankyou for choosing <span className='font-bold text-yellow-400 text-lg'>HISGRACE CABS </span> 
                    We are providing the best journey experiance with our premium cars and kind drivers  .
                </span>
                <cite className='text-yellow-500'>-Embrace your journey with HISGRACE</cite>
                
            </blockquote>
        </section>
    );
};

export default QuoteComponent;
