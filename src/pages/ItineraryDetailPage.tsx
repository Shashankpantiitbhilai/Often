import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getItineraryById } from '../services/api';
import { Clock, MapPin, Calendar, DollarSign, ChevronLeft } from 'lucide-react';
import DayTimeline from '../components/DayTimeline';
import LocationMap from '../components/LocationMap';

const ItineraryDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const itineraryId = parseInt(id || '0', 10);

  const { data: itinerary, isLoading, isError } = useQuery(
    ['itinerary', itineraryId],
    () => getItineraryById(itineraryId),
    {
      enabled: !!itineraryId,
    }
  );

  // Map locations based on the itinerary
  const getMapLocations = () => {
    if (!itinerary) return [];

    // Default coordinates for regions in Thailand
    const coordinates: { [key: string]: [number, number] } = {
      'Phuket': [7.9519, 98.3381],
      'Krabi': [8.0863, 98.9062],
      'Phuket & Krabi': [8.0191, 98.6221], // Midpoint between the two
      'default': [8.0191, 98.6221] // Fallback
    };

    const locations = [];
    
    // Add main location
    locations.push({
      name: itinerary.location,
      position: coordinates[itinerary.location] || coordinates['default'],
      description: 'Main destination'
    });

    // Add hotel locations from days if they have unique names
    const hotelNames = new Set();
    itinerary.days.forEach(day => {
      if (day.hotel && !hotelNames.has(day.hotel.hotel.name)) {
        hotelNames.add(day.hotel.hotel.name);
        locations.push({
          name: day.hotel.hotel.name,
          position: coordinates[day.hotel.hotel.location] || coordinates['default'],
          description: `Hotel in ${day.hotel.hotel.location}`
        });
      }
    });

    return locations;
  };

  // Get center coordinates for the map
  const getMapCenter = (): [number, number] => {
    if (!itinerary) return [8.0191, 98.6221]; // Default to middle of Phuket/Krabi area

    // Default coordinates for regions
    const coordinates: { [key: string]: [number, number] } = {
      'Phuket': [7.9519, 98.3381],
      'Krabi': [8.0863, 98.9062],
      'Phuket & Krabi': [8.0191, 98.6221], // Midpoint
      'default': [8.0191, 98.6221]
    };

    return coordinates[itinerary.location] || coordinates['default'];
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (isError || !itinerary) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Itinerary Not Found</h2>
        <p className="text-gray-600 mb-8">The itinerary you're looking for doesn't exist or couldn't be loaded.</p>
        <Link 
          to="/itineraries" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <ChevronLeft className="h-5 w-5 mr-1" /> Back to Itineraries
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back button */}
      <div className="mb-6">
        <Link 
          to="/itineraries" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <ChevronLeft className="h-5 w-5 mr-1" /> Back to Itineraries
        </Link>
      </div>
      
      {/* Hero section */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="md:flex">
          {/* Image */}
          <div className="md:w-1/2 h-64 md:h-auto">
            <img 
              src={itinerary.image_url || 'https://images.pexels.com/photos/753626/pexels-photo-753626.jpeg'} 
              alt={itinerary.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Content */}
          <div className="md:w-1/2 p-6 md:p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{itinerary.title}</h1>
            
            <div className="flex flex-wrap gap-y-3 gap-x-6 mb-6 text-gray-600">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                <span>{itinerary.location}</span>
              </div>
              
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                <span>{itinerary.num_nights} {itinerary.num_nights === 1 ? 'night' : 'nights'}</span>
              </div>
              
              {itinerary.price && (
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-2 text-blue-600" />
                  <span>${itinerary.price}</span>
                </div>
              )}
            </div>
            
            <p className="text-gray-700 mb-6">{itinerary.description}</p>
            
            {itinerary.is_recommended && (
              <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                Recommended
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Map */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Location</h2>
        <div className="bg-white rounded-lg shadow-md overflow-hidden p-4">
          <LocationMap 
            locations={getMapLocations()}
            center={getMapCenter()}
            zoom={10}
          />
        </div>
      </div>
      
      {/* Day-by-day timeline */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Day-by-Day Itinerary</h2>
        
        <div className="space-y-6">
          {itinerary.days
            .sort((a, b) => a.day_number - b.day_number)
            .map(day => (
              <DayTimeline
                key={day.id}
                dayNumber={day.day_number}
                hotel={day.hotel}
                transfers={day.transfers}
                activities={day.activities}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ItineraryDetailPage;