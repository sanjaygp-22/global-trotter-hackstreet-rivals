import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTrips } from '@/contexts/TripContext';
import { Layout } from '@/components/layout/Layout';
import { TripCard } from '@/components/cards/TripCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Plus, MapPin, Calendar, DollarSign, Plane, 
  TrendingUp, Map, Hotel, ArrowRight 
} from 'lucide-react';
import { Loader2 } from 'lucide-react';

const Dashboard = () => {
  const { user, isLoading } = useAuth();
  const { getUserTrips, trips } = useTrips();
  const navigate = useNavigate();

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

  if (!user) return null;

  const userTrips = getUserTrips();
  const plannedTrips = userTrips.filter(t => t.status === 'planned');
  const completedTrips = userTrips.filter(t => t.status === 'completed');
  const upcomingTrip = plannedTrips[0];

  const stats = [
    { 
      label: 'Total Trips', 
      value: userTrips.length, 
      icon: Plane, 
      color: 'text-primary',
      bgColor: 'bg-primary/10' 
    },
    { 
      label: 'Upcoming', 
      value: plannedTrips.length, 
      icon: Calendar, 
      color: 'text-info',
      bgColor: 'bg-info/10' 
    },
    { 
      label: 'Completed', 
      value: completedTrips.length, 
      icon: TrendingUp, 
      color: 'text-success',
      bgColor: 'bg-success/10' 
    },
    { 
      label: 'Cities Visited', 
      value: new Set(completedTrips.map(t => t.destination_city)).size, 
      icon: MapPin, 
      color: 'text-secondary',
      bgColor: 'bg-secondary/10' 
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
            Welcome back, {user.name.split(' ')[0]}! 👋
          </h1>
          <p className="text-muted-foreground">
            Ready for your next adventure? Let's plan something amazing.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label} className="border-border/50">
              <CardContent className="p-4 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card className="border-border/50 hover:border-primary/30 transition-colors cursor-pointer group" onClick={() => navigate('/create-trip')}>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-hero flex items-center justify-center group-hover:scale-105 transition-transform">
                <Plus className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Create New Trip</h3>
                <p className="text-sm text-muted-foreground">Start planning your next journey</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 hover:border-primary/30 transition-colors cursor-pointer group" onClick={() => navigate('/hotels')}>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-sunset flex items-center justify-center group-hover:scale-105 transition-transform">
                <Hotel className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Find Hotels</h3>
                <p className="text-sm text-muted-foreground">Discover great accommodations</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 hover:border-primary/30 transition-colors cursor-pointer group" onClick={() => navigate('/map')}>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-info/10 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Map className="w-7 h-7 text-info" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Explore Map</h3>
                <p className="text-sm text-muted-foreground">View destinations on map</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Trip Highlight */}
        {upcomingTrip && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-2xl font-bold">Upcoming Trip</h2>
              <Button variant="ghost" asChild>
                <Link to={`/trips/${upcomingTrip.trip_id}`}>
                  View Details
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
            <Card className="overflow-hidden border-border/50">
              <div className="md:flex">
                <div className="md:w-1/3 h-48 md:h-auto">
                  <img
                    src={upcomingTrip.cover_image || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800'}
                    alt={upcomingTrip.trip_name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6 md:w-2/3">
                  <h3 className="font-display text-2xl font-bold mb-2">{upcomingTrip.trip_name}</h3>
                  <div className="flex flex-wrap gap-4 text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      {upcomingTrip.source_city} → {upcomingTrip.destination_city}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(upcomingTrip.start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(upcomingTrip.end_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button asChild>
                      <Link to={`/trips/${upcomingTrip.trip_id}/itinerary`}>
                        Build Itinerary
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link to={`/trips/${upcomingTrip.trip_id}/budget`}>
                        <DollarSign className="mr-2 w-4 h-4" />
                        Budget
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>
        )}

        {/* Recent Trips */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-2xl font-bold">Your Trips</h2>
            <Button variant="outline" asChild>
              <Link to="/trips">
                View All
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
          
          {userTrips.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userTrips.slice(0, 3).map((trip, index) => (
                <div key={trip.trip_id} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <TripCard trip={trip} />
                </div>
              ))}
            </div>
          ) : (
            <Card className="border-dashed border-2 border-border">
              <CardContent className="py-12 text-center">
                <Plane className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No trips yet</h3>
                <p className="text-muted-foreground mb-4">Start planning your first adventure!</p>
                <Button asChild>
                  <Link to="/create-trip">
                    <Plus className="mr-2 w-4 h-4" />
                    Create Your First Trip
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
