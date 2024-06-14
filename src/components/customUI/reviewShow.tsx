import React from 'react';

interface StarRatingProps {
  totalStars?: number;
  rate:number
}

const Review: React.FC<StarRatingProps> = ({ totalStars = 5,rate}) => {
  return (
    <div className="flex mt-5 gap-1 rounded w-fit px-2 py-1">
      {Array.from({ length: totalStars }, (_, index) => {
        const starValue = index + 1;
        return (
          <svg
            key={starValue}
            className={`h-5  cursor-pointer ${
              rate >= starValue ? 'text-yellow-400' : 'text-gray-400'
            }`}
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 .587l3.668 7.429L24 9.753l-6 5.845L19.336 24 12 20.065 4.664 24 6 15.598l-6-5.845 8.332-1.737z" />
          </svg>
        );
      })}

    </div>
  );
};

export default Review;
