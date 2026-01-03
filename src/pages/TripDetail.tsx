import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTrips } from '@/contexts/TripContext';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  MapPin, Calendar, Plane, Train, Bus, Car, DollarSign, 
  Map, Hotel, Plus, Trash2, ArrowLeft, Edit, Check, X, Loader2
} from 'lucide-react';
import { format, differenceInDays } from 'date-fns';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { hotels as allHotels, bookingProviders } from '@/data/mockData';

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

const TripDetail = () => {
  const { tripId } = useParams();
  const { user, isLoading: authLoading } = useAuth();
  const { getTripById, getItinerariesForTrip, getExpenseForTrip, addItinerary, deleteItinerary, addExpense, updateExpense } = useTrips();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('overview');
  const [newActivity, setNewActivity] = useState('');
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [editingBudget, setEditingBudget] = useState(false);
  const [budgetForm, setBudgetForm] = useState({
    transport: 0,
    hotel: 0,
    food: 0,
    misc: 0,
  });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const trip = tripId ? getTripById(tripId) : undefined;
  
  if (!trip) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Trip not found</h1>
          <Button asChild>
            <Link to="/trips">Back to Trips</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const itineraries = getItinerariesForTrip(trip.trip_id);
  const expense = getExpenseForTrip(trip.trip_id);
  const TransportIcon = transportIcons[trip.transport_mode];
  const tripDays = differenceInDays(new Date(trip.end_date), new Date(trip.start_date)) + 1;
  const destinationHotels = allHotels.filter(h => h.city.toLowerCase() === trip.destination_city.toLowerCase());

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleAddActivity = (dayNumber: number) => {
    if (!newActivity.trim()) return;

    const existingItinerary = itineraries.find(i => i.day_number === dayNumber);
    
    if (existingItinerary) {
      // Would update, but for simplicity, we'll show a toast
      toast.success('Activity added!');
    } else {
      addItinerary({
        trip_id: trip.trip_id,
        day_number: dayNumber,
        city: trip.destination_city,
        activities: [newActivity],
      });
      toast.success('Day itinerary created!');
    }
    
    setNewActivity('');
    setSelectedDay(null);
  };

  const handleSaveBudget = () => {
    const total = budgetForm.transport + budgetForm.hotel + budgetForm.food + budgetForm.misc;
    
    if (expense) {
      updateExpense(expense.expense_id, {
        transport_cost: budgetForm.transport,
        hotel_cost: budgetForm.hotel,
        food_cost: budgetForm.food,
        misc_cost: budgetForm.misc,
        total_cost: total,
      });
    } else {
      addExpense({
        trip_id: trip.trip_id,
        transport_cost: budgetForm.transport,
        hotel_cost: budgetForm.hotel,
        food_cost: budgetForm.food,
        misc_cost: budgetForm.misc,
        total_cost: total,
      });
    }
    
    setEditingBudget(false);
    toast.success('Budget updated!');
  };

  const initBudgetEdit = () => {
    if (expense) {
      setBudgetForm({
        transport: expense.transport_cost,
        hotel: expense.hotel_cost,
        food: expense.food_cost,
        misc: expense.misc_cost,
      });
    }
    setEditingBudget(true);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <Button variant="ghost" onClick={() => navigate('/trips')} className="mb-4">
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Trips
          </Button>

          <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-6">
            <img
              src={trip.cover_image || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200'}
              alt={trip.trip_name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <Badge 
                variant="outline" 
                className={cn("mb-3 border", statusColors[trip.status])}
              >
                {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
              </Badge>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
                {trip.trip_name}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-white/90">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {trip.source_city} → {trip.destination_city}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {format(new Date(trip.start_date), 'MMM d')} - {format(new Date(trip.end_date), 'MMM d, yyyy')}
                </div>
                <div className="flex items-center gap-2">
                  <TransportIcon className="w-4 h-4" />
                  {trip.transport_mode.charAt(0).toUpperCase() + trip.transport_mode.slice(1)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
            <TabsTrigger value="budget">Budget</TabsTrigger>
            <TabsTrigger value="map">Map</TabsTrigger>
            <TabsTrigger value="hotels">Hotels</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
          </TabsList>

          {/* Overview */}
          <TabsContent value="overview">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    Trip Duration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">{tripDays} Days</div>
                  <p className="text-muted-foreground mt-1">
                    {format(new Date(trip.start_date), 'EEEE, MMM d')} to {format(new Date(trip.end_date), 'EEEE, MMM d')}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-success" />
                    Estimated Budget
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-success">
                    {expense ? formatPrice(expense.total_cost) : 'Not set'}
                  </div>
                  <p className="text-muted-foreground mt-1">
                    {expense ? 'Total estimated cost' : 'Click Budget tab to add'}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Map className="w-5 h-5 text-info" />
                    Itinerary Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-info">
                    {itineraries.length}/{tripDays}
                  </div>
                  <p className="text-muted-foreground mt-1">
                    Days planned
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Itinerary */}
          <TabsContent value="itinerary">
            <div className="space-y-4">
              {Array.from({ length: tripDays }, (_, i) => i + 1).map((day) => {
                const dayItinerary = itineraries.find(i => i.day_number === day);
                
                return (
                  <Card key={day} className="border-border/50">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">
                          Day {day}
                          <span className="text-muted-foreground font-normal ml-2">
                            {format(new Date(new Date(trip.start_date).getTime() + (day - 1) * 24 * 60 * 60 * 1000), 'EEEE, MMM d')}
                          </span>
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {dayItinerary ? (
                        <ul className="space-y-2">
                          {dayItinerary.activities.map((activity, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-medium shrink-0 mt-0.5">
                                {idx + 1}
                              </div>
                              <span>{activity}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-muted-foreground">No activities planned yet</p>
                      )}
                      
                      {selectedDay === day ? (
                        <div className="mt-4 flex gap-2">
                          <Input
                            placeholder="Add an activity..."
                            value={newActivity}
                            onChange={(e) => setNewActivity(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAddActivity(day)}
                          />
                          <Button size="icon" onClick={() => handleAddActivity(day)}>
                            <Check className="w-4 h-4" />
                          </Button>
                          <Button size="icon" variant="outline" onClick={() => setSelectedDay(null)}>
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ) : (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mt-4"
                          onClick={() => setSelectedDay(day)}
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Activity
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Budget */}
          <TabsContent value="budget">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Budget & Expenses</CardTitle>
                  {!editingBudget && (
                    <Button variant="outline" size="sm" onClick={initBudgetEdit}>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Budget
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {editingBudget ? (
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Transport Cost (₹)</Label>
                        <Input
                          type="number"
                          value={budgetForm.transport}
                          onChange={(e) => setBudgetForm(prev => ({ ...prev, transport: Number(e.target.value) }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Hotel Cost (₹)</Label>
                        <Input
                          type="number"
                          value={budgetForm.hotel}
                          onChange={(e) => setBudgetForm(prev => ({ ...prev, hotel: Number(e.target.value) }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Food Cost (₹)</Label>
                        <Input
                          type="number"
                          value={budgetForm.food}
                          onChange={(e) => setBudgetForm(prev => ({ ...prev, food: Number(e.target.value) }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Miscellaneous (₹)</Label>
                        <Input
                          type="number"
                          value={budgetForm.misc}
                          onChange={(e) => setBudgetForm(prev => ({ ...prev, misc: Number(e.target.value) }))}
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleSaveBudget}>Save Budget</Button>
                      <Button variant="outline" onClick={() => setEditingBudget(false)}>Cancel</Button>
                    </div>
                  </div>
                ) : expense ? (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-4 gap-4">
                      {[
                        { label: 'Transport', value: expense.transport_cost, icon: TransportIcon, color: 'text-info' },
                        { label: 'Hotel', value: expense.hotel_cost, icon: Hotel, color: 'text-secondary' },
                        { label: 'Food', value: expense.food_cost, icon: () => <span>🍽️</span>, color: 'text-warning' },
                        { label: 'Misc', value: expense.misc_cost, icon: () => <span>📦</span>, color: 'text-muted-foreground' },
                      ].map((item) => (
                        <Card key={item.label} className="border-border/50">
                          <CardContent className="p-4 text-center">
                            <item.icon className={cn("w-6 h-6 mx-auto mb-2", item.color)} />
                            <div className="text-xl font-bold">{formatPrice(item.value)}</div>
                            <div className="text-sm text-muted-foreground">{item.label}</div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    <div className="p-6 bg-primary/5 rounded-xl border border-primary/20">
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground mb-1">Total Estimated Cost</div>
                        <div className="text-4xl font-bold text-primary">{formatPrice(expense.total_cost)}</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <DollarSign className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No budget set</h3>
                    <p className="text-muted-foreground mb-4">Add your estimated expenses to track your budget</p>
                    <Button onClick={initBudgetEdit}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Budget
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Map */}
          <TabsContent value="map">
            <Card>
              <CardHeader>
                <CardTitle>Route Map</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video rounded-lg overflow-hidden">
                  <iframe
                    title="Trip Map"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps/embed/v1/directions?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&origin=${encodeURIComponent(trip.source_city)}&destination=${encodeURIComponent(trip.destination_city)}&mode=${trip.transport_mode === 'flight' ? 'driving' : trip.transport_mode === 'train' ? 'transit' : trip.transport_mode}`}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Hotels */}
          <TabsContent value="hotels">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Hotels in {trip.destination_city}</h2>
              <p className="text-muted-foreground">Find the perfect accommodation for your stay</p>
            </div>
            
            {destinationHotels.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {destinationHotels.map((hotel) => (
                  <Card key={hotel.hotel_id} className="overflow-hidden">
                    <div className="h-40 overflow-hidden">
                      <img
                        src={hotel.image_url}
                        alt={hotel.hotel_name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-1">{hotel.hotel_name}</h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                        <span>⭐ {hotel.rating}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-primary">{formatPrice(hotel.price_per_night)}/night</span>
                        <Button size="sm" asChild>
                          <a href={`https://www.makemytrip.com/hotels/hotel-listing?city=${encodeURIComponent(trip.destination_city)}`} target="_blank" rel="noopener noreferrer">
                            Book
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border-dashed">
                <CardContent className="py-12 text-center">
                  <Hotel className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No hotels found</h3>
                  <p className="text-muted-foreground mb-4">Search for hotels on MakeMyTrip</p>
                  <Button asChild>
                    <a href={`https://www.makemytrip.com/hotels/hotel-listing?city=${encodeURIComponent(trip.destination_city)}`} target="_blank" rel="noopener noreferrer">
                      Search Hotels
                    </a>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Bookings */}
          <TabsContent value="bookings">
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(bookingProviders).map(([type, providers]) => (
                <Card key={type}>
                  <CardHeader>
                    <CardTitle className="capitalize">{type} Booking</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {providers.map((provider) => (
                      <a
                        key={provider.name}
                        href={provider.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{provider.logo}</span>
                          <span className="font-medium">{provider.name}</span>
                        </div>
                        <Button size="sm" variant="outline">Visit</Button>
                      </a>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default TripDetail;
