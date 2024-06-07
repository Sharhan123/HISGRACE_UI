import React, { useState } from 'react';

interface StarRatingProps {
  totalStars?: number;
  onRatingChange?: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ totalStars = 5, onRatingChange }) => {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);

  const handleClick = (ratingValue: number) => {
    setRating(ratingValue);
    if (onRatingChange) {
      onRatingChange(ratingValue);
    }
  };

  const handleMouseEnter = (ratingValue: number) => {
    setHoverRating(ratingValue);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  return (
    <div className="flex">
      {Array.from({ length: totalStars }, (_, index) => {
        const starValue = index + 1;
        return (
          <svg
            key={starValue}
            className={`w-10 h-8 mx-auto cursor-pointer ${
              (hoverRating || rating) >= starValue ? 'text-yellow-500' : 'text-gray-400'
            }`}
            fill="currentColor"
            viewBox="0 0 24 24"
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => handleMouseEnter(starValue)}
            onMouseLeave={handleMouseLeave}
          >
            <path d="M12 .587l3.668 7.429L24 9.753l-6 5.845L19.336 24 12 20.065 4.664 24 6 15.598l-6-5.845 8.332-1.737z" />
          </svg>
        );
      })}
    </div>
  );
};

export default StarRating;
