// Relational Database Types for Global Trotter
// Following SQL-style schema design

export interface User {
  user_id: string;
  name: string;
  email: string;
  password: string;
  avatar_url?: string;
  created_at: string;
}

export interface Trip {
  trip_id: string;
  user_id: string; // FK → Users.user_id
  trip_name: string;
  source_city: string;
  destination_city: string;
  start_date: string;
  end_date: string;
  transport_mode: 'flight' | 'train' | 'bus' | 'car';
  status: 'planned' | 'ongoing' | 'completed';
  cover_image?: string;
}

export interface Itinerary {
  itinerary_id: string;
  trip_id: string; // FK → Trips.trip_id
  day_number: number;
  city: string;
  activities: string[];
}

export interface Expense {
  expense_id: string;
  trip_id: string; // FK → Trips.trip_id
  transport_cost: number;
  hotel_cost: number;
  food_cost: number;
  misc_cost: number;
  total_cost: number;
}

export interface Hotel {
  hotel_id: string;
  city: string;
  hotel_name: string;
  price_per_night: number;
  rating: number;
  amenities: string[];
  image_url?: string;
}

export interface Booking {
  booking_id: string;
  trip_id: string; // FK → Trips.trip_id
  booking_type: 'flight' | 'train' | 'hotel' | 'bus';
  booking_url: string;
  provider: string;
}

// Relationship Types
export interface TripWithDetails extends Trip {
  itineraries: Itinerary[];
  expense: Expense | null;
  bookings: Booking[];
}
