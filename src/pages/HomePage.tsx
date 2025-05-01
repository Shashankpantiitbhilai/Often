import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Map, Calendar, Sun } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 md:w-2/3">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
              Discover the perfect Thailand itinerary
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Expert-crafted travel plans for Phuket, Krabi and beyond. Customize your journey or 
              get personalized recommendations.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link 
                to="/itineraries" 
                className="bg-white text-blue-700 px-6 py-3 rounded-md font-medium text-center hover:bg-blue-50 transition-colors"
              >
                Explore Itineraries
              </Link>
              <Link 
                to="/recommendations" 
                className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-md font-medium text-center hover:bg-white/10 transition-colors"
              >
                Get Recommendations
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative background elements */}
        <div className="absolute bottom-0 right-0 w-1/3 h-full bg-opacity-20 hidden md:block">
          <div className="absolute inset-0 bg-white opacity-10 transform -skew-x-12"></div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Plan your perfect Thailand adventure</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-blue-50 p-6 rounded-lg text-center">
              <div className="bg-blue-100 p-3 rounded-full inline-flex mb-4">
                <Search className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Find Inspiration</h3>
              <p className="text-gray-600">Discover curated itineraries designed by local experts.</p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg text-center">
              <div className="bg-blue-100 p-3 rounded-full inline-flex mb-4">
                <Map className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Plan Your Route</h3>
              <p className="text-gray-600">Island hopping, mainland exploration, or a mix of both.</p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg text-center">
              <div className="bg-blue-100 p-3 rounded-full inline-flex mb-4">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Personalized Schedule</h3>
              <p className="text-gray-600">Day-by-day itineraries tailored to your travel duration.</p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg text-center">
              <div className="bg-blue-100 p-3 rounded-full inline-flex mb-4">
                <Sun className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Local Experiences</h3>
              <p className="text-gray-600">Authentic activities and hidden gems for every region.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Destinations Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">Popular Destinations</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            From pristine beaches to lush mountains, Thailand offers diverse landscapes and experiences for every type of traveler.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-lg overflow-hidden shadow-md bg-white transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="h-64 overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg" 
                  alt="Phuket" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 text-gray-900">Phuket</h3>
                <p className="text-gray-600 mb-4">
                  Thailand's largest island offers stunning beaches, luxury resorts, and vibrant nightlife. 
                  Explore Old Town's colonial architecture or take day trips to nearby islands.
                </p>
                <Link 
                  to="/itineraries" 
                  className="text-blue-600 font-medium hover:text-blue-800 transition-colors"
                >
                  Browse Phuket Itineraries →
                </Link>
              </div>
            </div>
            
            <div className="rounded-lg overflow-hidden shadow-md bg-white transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="h-64 overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/753626/pexels-photo-753626.jpeg" 
                  alt="Krabi" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 text-gray-900">Krabi</h3>
                <p className="text-gray-600 mb-4">
                  Famous for its dramatic limestone cliffs, pristine beaches and turquoise waters. 
                  Enjoy rock climbing, island hopping, or relaxing at hot springs.
                </p>
                <Link 
                  to="/itineraries" 
                  className="text-blue-600 font-medium hover:text-blue-800 transition-colors"
                >
                  Browse Krabi Itineraries →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to plan your Thailand adventure?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Let us help you create the perfect itinerary for your trip duration.
          </p>
          <Link 
            to="/recommendations" 
            className="bg-white text-blue-700 px-8 py-3 rounded-md font-medium hover:bg-blue-50 inline-block transition-colors"
          >
            Get Custom Recommendations
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;