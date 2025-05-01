import React from 'react';
import { Clock, MapPin, Hotel, Car, Plane, Ship, DollarSign } from 'lucide-react';

interface Activity {
  id: number;
  activity: {
    id: number;
    name: string;
    location: string;
    description: string | null;
    duration_hours: number | null;
    price: number | null;
    image_url: string | null;
  };
  start_time: string;
  end_time: string;
  notes: string | null;
}

interface Hotel {
  id: number;
  hotel: {
    id: number;
    name: string;
    location: string;
    address: string | null;
    description: string | null;
    rating: number | null;
    price_per_night: number | null;
    image_url: string | null;
  };
}

interface Transfer {
  id: number;
  from_location: string;
  to_location: string;
  departure_time: string;
  arrival_time: string;
  transfer_type: string;
  price: number | null;
  notes: string | null;
}

interface DayTimelineProps {
  dayNumber: number;
  hotel?: Hotel | null;
  transfers: Transfer[];
  activities: Activity[];
}

const DayTimeline: React.FC<DayTimelineProps> = ({
  dayNumber,
  hotel,
  transfers,
  activities,
}) => {
  // Sort all events chronologically
  const events = [
    ...transfers.map(t => ({
      type: 'transfer',
      time: t.departure_time,
      data: t,
    })),
    ...activities.map(a => ({
      type: 'activity',
      time: a.start_time,
      data: a,
    })),
  ].sort((a, b) => {
    // Convert time strings to comparable values
    const timeA = a.time.split(':').map(Number);
    const timeB = b.time.split(':').map(Number);
    
    if (timeA[0] !== timeB[0]) return timeA[0] - timeB[0];
    return timeA[1] - timeB[1];
  });

  // Get the appropriate icon for transfer type
  const getTransferIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'car':
        return <Car className="h-5 w-5 text-gray-600" />;
      case 'plane':
      case 'flight':
        return <Plane className="h-5 w-5 text-gray-600" />;
      case 'ferry':
      case 'boat':
        return <Ship className="h-5 w-5 text-gray-600" />;
      default:
        return <Car className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Day {dayNumber}</h3>
      
      {hotel && (
        <div className="mb-6 p-4 border border-blue-100 rounded-lg bg-blue-50">
          <div className="flex items-start">
            <Hotel className="h-5 w-5 text-blue-600 mt-1 mr-2" />
            <div>
              <h4 className="font-semibold text-blue-900">{hotel.hotel.name}</h4>
              <p className="text-blue-700 text-sm">{hotel.hotel.address}</p>
              <div className="flex items-center mt-1">
                <MapPin className="h-4 w-4 text-blue-500 mr-1" />
                <span className="text-blue-600 text-sm">{hotel.hotel.location}</span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="space-y-6">
        {events.length > 0 ? (
          events.map((event, index) => (
            <div key={index} className="relative pl-8 pb-6 border-l-2 border-gray-200 last:border-l-0">
              {/* Timeline dot */}
              <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-blue-600"></div>
              
              {event.type === 'transfer' && (
                <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold text-amber-800 flex items-center">
                      {getTransferIcon(event.data.transfer_type)}
                      <span className="ml-2">{event.data.transfer_type} Transfer</span>
                    </span>
                    <span className="text-amber-700 font-mono">
                      {event.data.departure_time} - {event.data.arrival_time}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <div className="text-amber-800">From: {event.data.from_location}</div>
                      <div className="text-amber-800">To: {event.data.to_location}</div>
                    </div>
                    
                    {event.data.price && (
                      <div className="flex items-center text-amber-900 font-semibold">
                        <DollarSign className="h-4 w-4 mr-1" />
                        {event.data.price}
                      </div>
                    )}
                  </div>
                  
                  {event.data.notes && (
                    <p className="mt-2 text-sm text-amber-700">{event.data.notes}</p>
                  )}
                </div>
              )}
              
              {event.type === 'activity' && (
                <div className="bg-teal-50 p-4 rounded-lg border border-teal-100">
                  <div className="flex justify-between mb-2">
                    <h4 className="font-semibold text-teal-800">{event.data.activity.name}</h4>
                    <span className="text-teal-700 font-mono">
                      {event.data.start_time} - {event.data.end_time}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-sm text-teal-700 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{event.data.activity.location}</span>
                    <Clock className="h-4 w-4 ml-3 mr-1" />
                    <span>{event.data.activity.duration_hours} hours</span>
                  </div>
                  
                  <p className="text-sm text-teal-800 mb-2">{event.data.activity.description}</p>
                  
                  <div className="flex items-center justify-between">
                    {event.data.notes && (
                      <p className="text-sm text-teal-700">{event.data.notes}</p>
                    )}
                    
                    {event.data.activity.price && (
                      <div className="flex items-center text-teal-900 font-semibold">
                        <DollarSign className="h-4 w-4 mr-1" />
                        {event.data.activity.price}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic">No scheduled activities for this day.</p>
        )}
      </div>
    </div>
  );
};

export default DayTimeline;