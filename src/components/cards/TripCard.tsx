import { Link } from 'react-router-dom';
import { Trip } from '@/types/database';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Plane, Train, Bus, Car, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface TripCardProps {
  trip: Trip;
  className?: string;
}

const transportIcons = {
  flight: Plane,
  train: Train,
  bus: Bus,
  car: Car,
};

const statusColors = {
  planned: 'bg-info/10 text-info border-info/20',
  ongoing: 'bg-success/10 text-success border-success/20',
  completed: 'bg-muted text-muted-foreground border-muted',
};

export const TripCard = ({ trip, className }: TripCardProps) => {
  const TransportIcon = transportIcons[trip.transport_mode];
  
  const formatDateRange = () => {
    const start = format(new Date(trip.start_date), 'MMM d');
    const end = format(new Date(trip.end_date), 'MMM d, yyyy');
    return `${start} - ${end}`;
  };

  return (
    <Card className={cn(
      "group overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg",
      className
    )}>
      <div className="relative h-48 overflow-hidden">
        <img
          src={trip.cover_image || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800'}
          alt={trip.trip_name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <Badge 
          variant="outline" 
          className={cn("absolute top-3 right-3 border", statusColors[trip.status])}
        >
          {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
        </Badge>
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-xl font-display font-bold text-white line-clamp-1">
            {trip.trip_name}
          </h3>
        </div>
      </div>
      
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4 text-primary" />
          <span className="font-medium">{trip.source_city}</span>
          <ArrowRight className="w-3 h-3" />
          <span className="font-medium">{trip.destination_city}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{formatDateRange()}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <TransportIcon className="w-4 h-4" />
            <span className="capitalize">{trip.transport_mode}</span>
          </div>
        </div>
        
        <Button asChild className="w-full" variant="outline">
          <Link to={`/trips/${trip.trip_id}`}>
            View Details
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};
