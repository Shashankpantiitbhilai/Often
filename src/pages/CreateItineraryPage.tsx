import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Clock, MapPin, Hotel, Calendar, AlertCircle } from 'lucide-react';
import axios from 'axios';

interface FormData {
  title: string;
  description: string;
  location: string;
  num_nights: number;
  price: number;
  image_url: string;
  days: {
    day_number: number;
    hotel?: {
      hotel_id: number;
    };
    transfers: {
      from_location: string;
      to_location: string;
      departure_time: string;
      arrival_time: string;
      transfer_type: string;
      price: number;
      notes?: string;
    }[];
    activities: {
      activity_id: number;
      start_time: string;
      end_time: string;
      notes?: string;
    }[];
  }[];
}

const CreateItineraryPage: React.FC = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormData>();
  
  const createItineraryMutation = useMutation(
    async (data: FormData) => {
      const response = await axios.post('http://localhost:8000/api/itineraries', data);
      console.log(response, data, "jjj")
      return response.data;
    },
    {
      onSuccess: (data) => {
        navigate(`/itineraries/${data.id}`);
      },
    }
  );

  const onSubmit = (data: FormData) => {
    const formattedData = {
      ...data,
      days: data.days.map((day, index) => ({
        ...day,
        day_number: index + 1, // Add day_number field here
        transfers: day.transfers.map((transfer) => ({
          ...transfer,
          departure_time: transfer.departure_time || '12:00', // Provide default time if not provided
          arrival_time: transfer.arrival_time || '14:00', // Provide default time if not provided
          transfer_type: transfer.transfer_type || 'bus', // Provide default transfer type if not provided
        })),
      })),
    };

    createItineraryMutation.mutate(formattedData);
  };

  const numNights = watch('num_nights') || 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Create New Itinerary</h1>
        
        {createItineraryMutation.isError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <div className="flex items-center text-red-800">
              <AlertCircle className="h-5 w-5 mr-2" />
              <span>Error creating itinerary. Please try again.</span>
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              {...register('title', { required: 'Title is required' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Phuket Adventure - 5 Days"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              {...register('description')}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe the itinerary..."
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  {...register('location', { required: 'Location is required' })}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Phuket"
                />
              </div>
              {errors.location && (
                <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Number of Nights
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  {...register('num_nights', { 
                    required: 'Number of nights is required',
                    min: { value: 1, message: 'Minimum 1 night' },
                    max: { value: 30, message: 'Maximum 30 nights' }
                  })}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 5"
                />
              </div>
              {errors.num_nights && (
                <p className="mt-1 text-sm text-red-600">{errors.num_nights.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
                <input
                  type="number"
                  {...register('price', { 
                    required: 'Price is required',
                    min: { value: 0, message: 'Price cannot be negative' }
                  })}
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 1000"
                />
              </div>
              {errors.price && (
                <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <input
                type="url"
                {...register('image_url')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Daily Schedule</h2>
            {[...Array(numNights)].map((_, index) => (
              <div key={index} className="mb-8 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Day {index + 1}</h3>
                
                {/* Hotel section */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center">
                      <Hotel className="h-5 w-5 mr-1" />
                      <span>Hotel</span>
                    </div>
                  </label>
                  <input
                    type="number"
                    {...register(`days.${index}.hotel.hotel_id`)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Hotel ID"
                  />
                </div>
                
                {/* Transfers section */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Transfers</h4>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        {...register(`days.${index}.transfers.0.from_location`)}
                        className="px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="From"
                      />
                      <input
                        type="text"
                        {...register(`days.${index}.transfers.0.to_location`)}
                        className="px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="To"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <input
                        type="time"
                        {...register(`days.${index}.transfers.0.departure_time`)}
                        className="px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="Departure Time"
                      />
                      <input
                        type="time"
                        {...register(`days.${index}.transfers.0.arrival_time`)}
                        className="px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="Arrival Time"
                      />
                      <input
                        type="text"
                        {...register(`days.${index}.transfers.0.transfer_type`)}
                        className="px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="Transfer Type"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Activities section */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Activities</h4>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="number"
                        {...register(`days.${index}.activities.0.activity_id`)}
                        className="px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="Activity ID"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="time"
                          {...register(`days.${index}.activities.0.start_time`)}
                          className="px-3 py-2 border border-gray-300 rounded-md"
                        />
                        <input
                          type="time"
                          {...register(`days.${index}.activities.0.end_time`)}
                          className="px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={createItineraryMutation.isLoading}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {createItineraryMutation.isLoading ? 'Creating...' : 'Create Itinerary'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateItineraryPage;
