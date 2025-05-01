import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

// Types for API responses
export interface Itinerary {
  id: number;
  title: string;
  description: string | null;
  location: string;
  num_nights: number;
  price: number | null;
  image_url: string | null;
  is_recommended: boolean;
}

export interface Hotel {
  id: number;
  name: string;
  location: string;
  address: string | null;
  description: string | null;
  rating: number | null;
  price_per_night: number | null;
  image_url: string | null;
}

export interface Activity {
  id: number;
  name: string;
  location: string;
  description: string | null;
  duration_hours: number | null;
  price: number | null;
  image_url: string | null;
}

export interface Transfer {
  id: number;
  from_location: string;
  to_location: string;
  departure_time: string;
  arrival_time: string;
  transfer_type: string;
  price: number | null;
  notes: string | null;
}

export interface DayActivity {
  id: number;
  activity: Activity;
  start_time: string;
  end_time: string;
  notes: string | null;
}

export interface HotelBooking {
  id: number;
  hotel: Hotel;
}

export interface Day {
  id: number;
  day_number: number;
  hotel: HotelBooking | null;
  transfers: Transfer[];
  activities: DayActivity[];
}

export interface ItineraryDetail extends Itinerary {
  days: Day[];
}

// API service functions
export const getItineraries = async (location?: string) => {
  const params = location ? { location } : {};
  const response = await axios.get<Itinerary[]>(`${API_URL}/itineraries`, { params });
  return response.data;
};

export const getItineraryById = async (id: number) => {
  const response = await axios.get<ItineraryDetail>(`${API_URL}/itineraries/${id}`);
  return response.data;
};

export const getLocations = async () => {
  const response = await axios.get<string[]>(`${API_URL}/locations`);
  return response.data;
};

export const getRecommendations = async (nights: number) => {
  const response = await axios.get<Itinerary[]>(`${API_URL}/recommendations/${nights}`);
  return response.data;
};

export const getHotels = async (location?: string) => {
  const params = location ? { location } : {};
  const response = await axios.get<Hotel[]>(`${API_URL}/hotels`, { params });
  return response.data;
};

export const getActivities = async (location?: string) => {
  const params = location ? { location } : {};
  const response = await axios.get<Activity[]>(`${API_URL}/activities`, { params });
  return response.data;
};

// Create new itinerary
export const createItinerary = async (itinerary: any) => {
  console.log(API_URL,"apu",itinerary)
  const response = await axios.post(`${API_URL}/itineraries`, itinerary);
  return response.data;
};