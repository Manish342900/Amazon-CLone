import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'; // Import icons

const StarRating = ({ rating }) => {
  const maxRating = 5;

  return (
    <div>
      {[...Array(maxRating)].map((_, index) => {
       
        if (index < Math.floor(rating)) {
          return <FaStar key={index} style={{ color: '#ffcc00' }} />;
        } else if (index < Math.ceil(rating) && rating % 1 !== 0) {
          return <FaStarHalfAlt key={index} style={{ color: '#ffcc00' }} />;
        } else {
          return <FaRegStar key={index} style={{ color: '#ffcc00' }} />;
        }
      })}
    </div>
  );
};



export default StarRating ;
