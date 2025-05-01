import React from 'react';
import { MapPin, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">TravelPlanner</h3>
            <p className="text-gray-300 mb-4">
              Planning your perfect Thailand trip made easy. Discover curated itineraries for Phuket, Krabi, and beyond.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
              <li><a href="/itineraries" className="text-gray-300 hover:text-white transition-colors">Itineraries</a></li>
              <li><a href="/recommendations" className="text-gray-300 hover:text-white transition-colors">Get Recommendations</a></li>
              <li><a href="/create" className="text-gray-300 hover:text-white transition-colors">Create Itinerary</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-gray-300" />
                <span className="text-gray-300">123 Traveler St, Bangkok, Thailand</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-gray-300" />
                <a href="mailto:info@travelplanner.com" className="text-gray-300 hover:text-white transition-colors">info@travelplanner.com</a>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-gray-300" />
                <a href="tel:+6611234567" className="text-gray-300 hover:text-white transition-colors">+66 1 123 4567</a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} TravelPlanner. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;