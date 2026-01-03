import { Hotel } from '@/types/database';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Wifi, Car, Waves, Dumbbell, Sparkles, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HotelCardProps {
  hotel: Hotel;
  className?: string;
}

const amenityIcons: Record<string, React.ReactNode> = {
  'WiFi': <Wifi className="w-3.5 h-3.5" />,
  'Parking': <Car className="w-3.5 h-3.5" />,
  'Pool': <Waves className="w-3.5 h-3.5" />,
  'Gym': <Dumbbell className="w-3.5 h-3.5" />,
  'Spa': <Sparkles className="w-3.5 h-3.5" />,
};

export const HotelCard = ({ hotel, className }: HotelCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const bookingUrl = `https://www.makemytrip.com/hotels/hotel-listing?city=${encodeURIComponent(hotel.city)}`;

  return (
    <Card className={cn(
      "group overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg",
      className
    )}>
      <div className="relative h-44 overflow-hidden">
        <img
          src={hotel.image_url || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400'}
          alt={hotel.hotel_name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full">
          <Star className="w-3.5 h-3.5 fill-accent text-accent" />
          <span className="text-sm font-medium text-white">{hotel.rating}</span>
        </div>
      </div>
      
      <CardContent className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
            {hotel.hotel_name}
          </h3>
          <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
            <MapPin className="w-3.5 h-3.5" />
            <span>{hotel.city}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1.5">
          {hotel.amenities.slice(0, 4).map((amenity) => (
            <Badge 
              key={amenity} 
              variant="secondary" 
              className="text-xs gap-1 py-0.5"
            >
              {amenityIcons[amenity] || null}
              {amenity}
            </Badge>
          ))}
          {hotel.amenities.length > 4 && (
            <Badge variant="secondary" className="text-xs py-0.5">
              +{hotel.amenities.length - 4}
            </Badge>
          )}
        </div>
        
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div>
            <span className="text-xl font-bold text-primary">{formatPrice(hotel.price_per_night)}</span>
            <span className="text-sm text-muted-foreground">/night</span>
          </div>
          <Button size="sm" asChild>
            <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
              Book Now
              <ExternalLink className="ml-1.5 w-3.5 h-3.5" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
