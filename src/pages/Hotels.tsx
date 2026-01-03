import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Layout } from '@/components/layout/Layout';
import { HotelCard } from '@/components/cards/HotelCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { hotels } from '@/data/mockData';
import { Search, Loader2 } from 'lucide-react';

const Hotels = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [searchCity, setSearchCity] = useState('');
  const [sortBy, setSortBy] = useState('rating');

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/auth');
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const filteredHotels = hotels
    .filter(hotel => 
      !searchCity || hotel.city.toLowerCase().includes(searchCity.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price-low') return a.price_per_night - b.price_per_night;
      if (sortBy === 'price-high') return b.price_per_night - a.price_per_night;
      return 0;
    });

  const cities = [...new Set(hotels.map(h => h.city))];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
            Hotels & Stays
          </h1>
          <p className="text-muted-foreground">
            Find the perfect accommodation for your journey
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by city..."
              className="pl-10"
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
            />
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Highest Rating</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* City Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setSearchCity('')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              !searchCity ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            All Cities
          </button>
          {cities.map(city => (
            <button
              key={city}
              onClick={() => setSearchCity(city)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                searchCity === city ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {city}
            </button>
          ))}
        </div>

        {/* Hotels Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHotels.map((hotel, index) => (
            <div key={hotel.hotel_id} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
              <HotelCard hotel={hotel} />
            </div>
          ))}
        </div>

        {filteredHotels.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No hotels found for "{searchCity}"</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Hotels;
