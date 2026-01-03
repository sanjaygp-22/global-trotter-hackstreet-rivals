import { User, Trip, Itinerary, Expense, Hotel, Booking } from '@/types/database';

// Users Table
export const users: User[] = [
  {
    user_id: 'usr_001',
    name: 'Rahul Sharma',
    email: 'rahul@example.com',
    password: 'password123',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    created_at: '2024-01-15',
  },
  {
    user_id: 'usr_002',
    name: 'Priya Patel',
    email: 'priya@example.com',
    password: 'password123',
    created_at: '2024-02-20',
  },
];

// Trips Table
export const trips: Trip[] = [
  {
    trip_id: 'trip_001',
    user_id: 'usr_001',
    trip_name: 'Goa Beach Vacation',
    source_city: 'Mumbai',
    destination_city: 'Goa',
    start_date: '2025-02-15',
    end_date: '2025-02-20',
    transport_mode: 'flight',
    status: 'planned',
    cover_image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800',
  },
  {
    trip_id: 'trip_002',
    user_id: 'usr_001',
    trip_name: 'Rajasthan Heritage Tour',
    source_city: 'Delhi',
    destination_city: 'Jaipur',
    start_date: '2025-03-01',
    end_date: '2025-03-07',
    transport_mode: 'train',
    status: 'planned',
    cover_image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800',
  },
  {
    trip_id: 'trip_003',
    user_id: 'usr_001',
    trip_name: 'Kerala Backwaters',
    source_city: 'Bangalore',
    destination_city: 'Kochi',
    start_date: '2024-12-10',
    end_date: '2024-12-15',
    transport_mode: 'bus',
    status: 'completed',
    cover_image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800',
  },
];

// Itineraries Table
export const itineraries: Itinerary[] = [
  {
    itinerary_id: 'itin_001',
    trip_id: 'trip_001',
    day_number: 1,
    city: 'Goa',
    activities: ['Arrive at Goa Airport', 'Check-in to hotel', 'Explore Calangute Beach', 'Dinner at beachside shack'],
  },
  {
    itinerary_id: 'itin_002',
    trip_id: 'trip_001',
    day_number: 2,
    city: 'Goa',
    activities: ['Visit Fort Aguada', 'Water sports at Baga Beach', 'Shopping at Anjuna Flea Market'],
  },
  {
    itinerary_id: 'itin_003',
    trip_id: 'trip_001',
    day_number: 3,
    city: 'Goa',
    activities: ['Dudhsagar Falls trip', 'Spice plantation visit', 'Evening cruise on Mandovi River'],
  },
  {
    itinerary_id: 'itin_004',
    trip_id: 'trip_002',
    day_number: 1,
    city: 'Jaipur',
    activities: ['Arrive at Jaipur', 'Visit Hawa Mahal', 'Explore City Palace'],
  },
  {
    itinerary_id: 'itin_005',
    trip_id: 'trip_002',
    day_number: 2,
    city: 'Jaipur',
    activities: ['Amber Fort visit', 'Elephant ride', 'Nahargarh Fort sunset'],
  },
];

// Expenses Table
export const expenses: Expense[] = [
  {
    expense_id: 'exp_001',
    trip_id: 'trip_001',
    transport_cost: 8000,
    hotel_cost: 15000,
    food_cost: 5000,
    misc_cost: 3000,
    total_cost: 31000,
  },
  {
    expense_id: 'exp_002',
    trip_id: 'trip_002',
    transport_cost: 3500,
    hotel_cost: 21000,
    food_cost: 7000,
    misc_cost: 5000,
    total_cost: 36500,
  },
  {
    expense_id: 'exp_003',
    trip_id: 'trip_003',
    transport_cost: 2500,
    hotel_cost: 12000,
    food_cost: 4000,
    misc_cost: 2000,
    total_cost: 20500,
  },
];

// Hotels Table
export const hotels: Hotel[] = [
  {
    hotel_id: 'htl_001',
    city: 'Goa',
    hotel_name: 'Taj Fort Aguada Resort',
    price_per_night: 8500,
    rating: 4.8,
    amenities: ['Pool', 'Spa', 'Beach Access', 'Restaurant', 'WiFi'],
    image_url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
  },
  {
    hotel_id: 'htl_002',
    city: 'Goa',
    hotel_name: 'W Goa',
    price_per_night: 12000,
    rating: 4.9,
    amenities: ['Pool', 'Spa', 'Private Beach', 'Bar', 'Gym'],
    image_url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400',
  },
  {
    hotel_id: 'htl_003',
    city: 'Goa',
    hotel_name: 'Holiday Inn Goa',
    price_per_night: 4500,
    rating: 4.2,
    amenities: ['Pool', 'Restaurant', 'WiFi', 'Parking'],
    image_url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400',
  },
  {
    hotel_id: 'htl_004',
    city: 'Jaipur',
    hotel_name: 'Rambagh Palace',
    price_per_night: 25000,
    rating: 4.9,
    amenities: ['Pool', 'Spa', 'Heritage', 'Restaurant', 'Garden'],
    image_url: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400',
  },
  {
    hotel_id: 'htl_005',
    city: 'Jaipur',
    hotel_name: 'ITC Rajputana',
    price_per_night: 7500,
    rating: 4.5,
    amenities: ['Pool', 'Spa', 'Restaurant', 'WiFi', 'Gym'],
    image_url: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400',
  },
  {
    hotel_id: 'htl_006',
    city: 'Kochi',
    hotel_name: 'Taj Malabar Resort',
    price_per_night: 9000,
    rating: 4.7,
    amenities: ['Pool', 'Spa', 'Waterfront', 'Restaurant', 'Yoga'],
    image_url: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400',
  },
];

// Bookings Table
export const bookings: Booking[] = [
  {
    booking_id: 'book_001',
    trip_id: 'trip_001',
    booking_type: 'flight',
    booking_url: 'https://www.makemytrip.com/flights/',
    provider: 'MakeMyTrip',
  },
  {
    booking_id: 'book_002',
    trip_id: 'trip_001',
    booking_type: 'hotel',
    booking_url: 'https://www.makemytrip.com/hotels/',
    provider: 'MakeMyTrip',
  },
  {
    booking_id: 'book_003',
    trip_id: 'trip_002',
    booking_type: 'train',
    booking_url: 'https://www.irctc.co.in/',
    provider: 'IRCTC',
  },
];

// Booking Providers
export const bookingProviders = {
  flight: [
    { name: 'MakeMyTrip', url: 'https://www.makemytrip.com/flights/', logo: '✈️' },
    { name: 'Goibibo', url: 'https://www.goibibo.com/flights/', logo: '🛫' },
    { name: 'Cleartrip', url: 'https://www.cleartrip.com/flights', logo: '🌐' },
  ],
  train: [
    { name: 'IRCTC', url: 'https://www.irctc.co.in/', logo: '🚂' },
    { name: 'ConfirmTkt', url: 'https://www.confirmtkt.com/', logo: '🎫' },
  ],
  bus: [
    { name: 'RedBus', url: 'https://www.redbus.in/', logo: '🚌' },
    { name: 'AbhiBus', url: 'https://www.abhibus.com/', logo: '🚍' },
  ],
  hotel: [
    { name: 'MakeMyTrip Hotels', url: 'https://www.makemytrip.com/hotels/', logo: '🏨' },
    { name: 'Booking.com', url: 'https://www.booking.com/', logo: '🛏️' },
    { name: 'OYO Rooms', url: 'https://www.oyorooms.com/', logo: '🏠' },
  ],
};

// Popular Cities for autocomplete
export const popularCities = [
  'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Ahmedabad',
  'Jaipur', 'Goa', 'Kochi', 'Udaipur', 'Agra', 'Varanasi', 'Shimla', 'Manali', 
  'Darjeeling', 'Ooty', 'Rishikesh', 'Amritsar', 'Mysore', 'Jodhpur', 'Srinagar',
];
