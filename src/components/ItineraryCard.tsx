import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, DollarSign } from 'lucide-react';

interface ItineraryCardProps {
  id: number;
  title: string;
  description: string;
  location: string;
  numNights: number;
  price: number;
  imageUrl: string;
}

const ItineraryCard: React.FC<ItineraryCardProps> = ({
  id,
  title,
  description,
  location,
  numNights,
  price,
  imageUrl,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="h-48 overflow-hidden">
        <img 
          src={imageUrl || 'https://images.pexels.com/photos/753626/pexels-photo-753626.jpeg'} 
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{location}</span>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-gray-600">
            <Clock className="h-4 w-4 mr-1" />
            <span>{numNights} {numNights === 1 ? 'night' : 'nights'}</span>
          </div>
          
          <div className="flex items-center text-gray-800 font-semibold">
            <DollarSign className="h-4 w-4 mr-1" />
            <span>${price}</span>
          </div>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
        
        <Link 
          to={`/itineraries/${id}`}
          className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ItineraryCard;