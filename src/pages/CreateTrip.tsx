import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTrips } from '@/contexts/TripContext';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { popularCities } from '@/data/mockData';
import { Plane, Train, Bus, Car, CalendarIcon, MapPin, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const transportModes = [
  { value: 'flight', label: 'Flight', icon: Plane },
  { value: 'train', label: 'Train', icon: Train },
  { value: 'bus', label: 'Bus', icon: Bus },
  { value: 'car', label: 'Car', icon: Car },
] as const;

const CreateTrip = () => {
  const { user, isLoading: authLoading } = useAuth();
  const { addTrip } = useTrips();
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tripName, setTripName] = useState('');
  const [sourceCity, setSourceCity] = useState('');
  const [destinationCity, setDestinationCity] = useState('');
  const [transportMode, setTransportMode] = useState<'flight' | 'train' | 'bus' | 'car'>('flight');
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [sourceSuggestions, setSourceSuggestions] = useState<string[]>([]);
  const [destSuggestions, setDestSuggestions] = useState<string[]>([]);
  const [showSourceSuggestions, setShowSourceSuggestions] = useState(false);
  const [showDestSuggestions, setShowDestSuggestions] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  const filterCities = (query: string) => {
    if (!query) return [];
    return popularCities.filter(city => 
      city.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5);
  };

  const handleSourceChange = (value: string) => {
    setSourceCity(value);
    setSourceSuggestions(filterCities(value));
    setShowSourceSuggestions(true);
  };

  const handleDestChange = (value: string) => {
    setDestinationCity(value);
    setDestSuggestions(filterCities(value));
    setShowDestSuggestions(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!tripName || !sourceCity || !destinationCity || !startDate || !endDate) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (startDate > endDate) {
      toast.error('End date must be after start date');
      return;
    }

    if (!user) return;

    setIsSubmitting(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newTrip = addTrip({
      user_id: user.user_id,
      trip_name: tripName,
      source_city: sourceCity,
      destination_city: destinationCity,
      start_date: startDate.toISOString().split('T')[0],
      end_date: endDate.toISOString().split('T')[0],
      transport_mode: transportMode,
      status: 'planned',
      cover_image: `https://source.unsplash.com/800x600/?${encodeURIComponent(destinationCity)},travel`,
    });

    setIsSubmitting(false);
    toast.success('Trip created successfully!');
    navigate(`/trips/${newTrip.trip_id}`);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
            Create New Trip
          </h1>
          <p className="text-muted-foreground">
            Plan your next adventure by filling in the details below.
          </p>
        </div>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Trip Details</CardTitle>
            <CardDescription>
              Tell us about your upcoming journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Trip Name */}
              <div className="space-y-2">
                <Label htmlFor="tripName">Trip Name *</Label>
                <Input
                  id="tripName"
                  placeholder="e.g., Goa Beach Vacation"
                  value={tripName}
                  onChange={(e) => setTripName(e.target.value)}
                />
              </div>

              {/* Source & Destination */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2 relative">
                  <Label htmlFor="source">From *</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="source"
                      placeholder="Source City"
                      className="pl-10"
                      value={sourceCity}
                      onChange={(e) => handleSourceChange(e.target.value)}
                      onFocus={() => setShowSourceSuggestions(true)}
                      onBlur={() => setTimeout(() => setShowSourceSuggestions(false), 200)}
                    />
                  </div>
                  {showSourceSuggestions && sourceSuggestions.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-card border border-border rounded-lg shadow-lg">
                      {sourceSuggestions.map((city) => (
                        <button
                          key={city}
                          type="button"
                          className="w-full px-4 py-2 text-left hover:bg-muted transition-colors first:rounded-t-lg last:rounded-b-lg"
                          onClick={() => {
                            setSourceCity(city);
                            setShowSourceSuggestions(false);
                          }}
                        >
                          {city}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-2 relative">
                  <Label htmlFor="destination">To *</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                    <Input
                      id="destination"
                      placeholder="Destination City"
                      className="pl-10"
                      value={destinationCity}
                      onChange={(e) => handleDestChange(e.target.value)}
                      onFocus={() => setShowDestSuggestions(true)}
                      onBlur={() => setTimeout(() => setShowDestSuggestions(false), 200)}
                    />
                  </div>
                  {showDestSuggestions && destSuggestions.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-card border border-border rounded-lg shadow-lg">
                      {destSuggestions.map((city) => (
                        <button
                          key={city}
                          type="button"
                          className="w-full px-4 py-2 text-left hover:bg-muted transition-colors first:rounded-t-lg last:rounded-b-lg"
                          onClick={() => {
                            setDestinationCity(city);
                            setShowDestSuggestions(false);
                          }}
                        >
                          {city}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Transport Mode */}
              <div className="space-y-2">
                <Label>Mode of Transport *</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {transportModes.map((mode) => (
                    <button
                      key={mode.value}
                      type="button"
                      onClick={() => setTransportMode(mode.value)}
                      className={cn(
                        "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all",
                        transportMode === mode.value
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <mode.icon className="w-6 h-6" />
                      <span className="text-sm font-medium">{mode.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dates */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>End Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !endDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        disabled={(date) => date < (startDate || new Date())}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Submit */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => navigate('/dashboard')}
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    'Create Trip'
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CreateTrip;
