import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { getItineraries, getLocations, Itinerary } from '../services/api';
import ItineraryCard from '../components/ItineraryCard';
import { MapPin, Search, X } from 'lucide-react';

const ItinerariesPage: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<string | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch itineraries based on selected location
  const { 
    data: itineraries, 
    isLoading: isLoadingItineraries, 
    isError: isErrorItineraries 
  } = useQuery(
    ['itineraries', selectedLocation], 
    () => getItineraries(selectedLocation),
    { keepPreviousData: true }
  );

  // Fetch all available locations
  const { 
    data: locations, 
    isLoading: isLoadingLocations 
  } = useQuery('locations', getLocations);

  // Filter itineraries based on search query
  const filteredItineraries = itineraries?.filter(itinerary => 
    itinerary.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    itinerary.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    itinerary.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Reset search when location changes
  useEffect(() => {
    setSearchQuery('');
  }, [selectedLocation]);

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Explore Our Itineraries</h1>
        <p className="text-gray-600 max-w-3xl">
          Discover expert-crafted travel itineraries for your Thailand adventure. Browse our selection of 
          pre-planned trips for Phuket, Krabi, and combined destinations.
        </p>
      </div>

      {/* Filters and search */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <div className="relative sm:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MapPin className="h-5 w-5 text-gray-400" />
          </div>
          <select
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:border-blue-500 focus:ring-blue-500"
            value={selectedLocation || ''}
            onChange={(e) => setSelectedLocation(e.target.value === 'all' ? undefined : e.target.value)}
          >
            <option value="all">All Locations</option>
            {locations?.map((location, index) => (
              <option key={index} value={location}>{location}</option>
            ))}
          </select>
        </div>

        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search itineraries..."
            className="pl-10 pr-10 py-2 border border-gray-300 rounded-md w-full focus:border-blue-500 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setSearchQuery('')}
            >
              <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>
      </div>

      {/* Loading state */}
      {(isLoadingItineraries || isLoadingLocations) && (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading itineraries...</p>
        </div>
      )}

      {/* Error state */}
      {isErrorItineraries && (
        <div className="text-center py-12 bg-red-50 rounded-lg">
          <p className="text-red-600 mb-2 font-semibold">Failed to load itineraries</p>
          <p className="text-gray-600">Please try again later or check your connection.</p>
        </div>
      )}

      {/* Empty state */}
      {filteredItineraries?.length === 0 && !isLoadingItineraries && !isErrorItineraries && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600 mb-2 font-semibold">No itineraries found</p>
          <p className="text-gray-500">Try changing your search or filters.</p>
        </div>
      )}

      {/* Itinerary grid */}
      {filteredItineraries && filteredItineraries.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItineraries.map((itinerary: Itinerary) => (
            <ItineraryCard
              key={itinerary.id}
              id={itinerary.id}
              title={itinerary.title}
              description={itinerary.description || ''}
              location={itinerary.location}
              numNights={itinerary.num_nights}
              price={itinerary.price || 0}
              imageUrl={itinerary.image_url || 'https://images.pexels.com/photos/753626/pexels-photo-753626.jpeg'}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ItinerariesPage;