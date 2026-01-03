import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTrips } from '@/contexts/TripContext';
import { Layout } from '@/components/layout/Layout';
import { TripCard } from '@/components/cards/TripCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Plane, Loader2 } from 'lucide-react';

const Trips = () => {
  const { user, isLoading } = useAuth();
  const { getUserTrips } = useTrips();
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
  const ongoingTrips = userTrips.filter(t => t.status === 'ongoing');
  const completedTrips = userTrips.filter(t => t.status === 'completed');

  const renderTrips = (trips: typeof userTrips) => {
    if (trips.length === 0) {
      return (
        <Card className="border-dashed border-2 border-border">
          <CardContent className="py-12 text-center">
            <Plane className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No trips in this category</h3>
            <p className="text-muted-foreground mb-4">Start planning your next adventure!</p>
            <Button asChild>
              <Link to="/create-trip">
                <Plus className="mr-2 w-4 h-4" />
                Create New Trip
              </Link>
            </Button>
          </CardContent>
        </Card>
      );
    }

    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trips.map((trip, index) => (
          <div key={trip.trip_id} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
            <TripCard trip={trip} />
          </div>
        ))}
      </div>
    );
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              My Trips
            </h1>
            <p className="text-muted-foreground">
              Manage and view all your travel plans
            </p>
          </div>
          <Button asChild className="mt-4 md:mt-0">
            <Link to="/create-trip">
              <Plus className="mr-2 w-4 h-4" />
              New Trip
            </Link>
          </Button>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="all">All ({userTrips.length})</TabsTrigger>
            <TabsTrigger value="planned">Planned ({plannedTrips.length})</TabsTrigger>
            <TabsTrigger value="ongoing">Ongoing ({ongoingTrips.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedTrips.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            {renderTrips(userTrips)}
          </TabsContent>

          <TabsContent value="planned">
            {renderTrips(plannedTrips)}
          </TabsContent>

          <TabsContent value="ongoing">
            {renderTrips(ongoingTrips)}
          </TabsContent>

          <TabsContent value="completed">
            {renderTrips(completedTrips)}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Trips;
