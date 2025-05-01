import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { getRecommendations } from '../services/api';
import ItineraryCard from '../components/ItineraryCard';
import { Calendar, ChevronRight } from 'lucide-react';

const RecommendationsPage: React.FC = () => {
  const [nights, setNights] = useState<number>(3);
  const [error, setError] = useState<string | null>(null);

  const { 
    data: recommendations, 
    isLoading, 
    isError,
    refetch
  } = useQuery(
    ['recommendations', nights],
    () => getRecommendations(nights),
    { 
      enabled: false,
      retry: 1,
      onError: () => {
        setError(`No recommendations available for ${nights} nights. Please try a different duration.`);
      }
    }
  );

  const handleGetRecommendations = () => {
    setError(null);
    refetch();
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Get Personalized Recommendations</h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Tell us how long you're planning to stay and we'll recommend the perfect Thailand itineraries for your trip duration.
        </p>
      </div>

      {/* Selection Form */}
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 mb-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">How many nights are you planning to stay?</h2>

        <div className="space-y-6">
          <div>
            <label htmlFor="nights-input" className="block text-sm font-medium text-gray-700 mb-1">
              Number of Nights (2-8)
            </label>
            <div className="flex items-center">
              <input
                id="nights-input"
                type="range"
                min="2"
                max="8"
                value={nights}
                onChange={(e) => setNights(parseInt(e.target.value, 10))}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
              <span className="ml-4 px-4 py-2 bg-blue-100 text-blue-800 rounded-md font-medium">
                {nights} nights
              </span>
            </div>
          </div>

          <button
            onClick={handleGetRecommendations}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-medium flex items-center justify-center transition-colors"
          >
            Get Recommendations <ChevronRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Results */}
      {isLoading && (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Finding the perfect itineraries for your trip...</p>
        </div>
      )}

      {error && (
        <div className="max-w-2xl mx-auto bg-red-50 rounded-lg p-6 text-center">
          <p className="text-red-600 font-medium mb-2">{error}</p>
          <p className="text-gray-600">Please try a different number of nights or check our existing itineraries.</p>
        </div>
      )}

      {!isLoading && recommendations && recommendations.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Recommended Itineraries for {nights} Nights
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recommendations.map((itinerary) => (
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
        </div>
      )}

      {/* Helpful tips */}
      <div className="mt-16 bg-blue-50 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-blue-900 mb-4">Travel Tips</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-start">
            <Calendar className="h-6 w-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-blue-800 mb-1">Optimal Trip Duration</h4>
              <p className="text-blue-700 text-sm">
                For Thailand, 5-7 nights is ideal to explore one region thoroughly. For multiple destinations, consider 7+ nights.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <Calendar className="h-6 w-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-blue-800 mb-1">Best Time to Visit</h4>
              <p className="text-blue-700 text-sm">
                November to February offers the best weather in Phuket and Krabi with minimal rain and comfortable temperatures.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationsPage;