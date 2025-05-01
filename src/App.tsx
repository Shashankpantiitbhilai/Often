import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ItinerariesPage from './pages/ItinerariesPage';
import ItineraryDetailPage from './pages/ItineraryDetailPage';
import CreateItineraryPage from './pages/CreateItineraryPage';
import RecommendationsPage from './pages/RecommendationsPage';

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/itineraries" element={<ItinerariesPage />} />
              <Route path="/itineraries/:id" element={<ItineraryDetailPage />} />
              <Route path="/create" element={<CreateItineraryPage />} />
              <Route path="/recommendations" element={<RecommendationsPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;