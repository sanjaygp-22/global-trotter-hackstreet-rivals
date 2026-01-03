import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { bookingProviders } from '@/data/mockData';
import { ExternalLink, Loader2 } from 'lucide-react';

const Bookings = () => {
  const { user, isLoading } = useAuth();
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

  const bookingCategories = [
    { key: 'flight', title: 'Flight Bookings', description: 'Book domestic and international flights', icon: '✈️' },
    { key: 'train', title: 'Train Bookings', description: 'Reserve train tickets across India', icon: '🚂' },
    { key: 'bus', title: 'Bus Bookings', description: 'Book bus tickets for intercity travel', icon: '🚌' },
    { key: 'hotel', title: 'Hotel Bookings', description: 'Find and book accommodations', icon: '🏨' },
  ] as const;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
            Travel Bookings
          </h1>
          <p className="text-muted-foreground">
            Quick access to popular travel booking platforms
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {bookingCategories.map((category) => (
            <Card key={category.key} className="border-border/50 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <span className="text-3xl">{category.icon}</span>
                  <div>
                    <h3 className="text-xl">{category.title}</h3>
                    <p className="text-sm font-normal text-muted-foreground">{category.description}</p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {bookingProviders[category.key].map((provider) => (
                  <a
                    key={provider.name}
                    href={provider.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-3xl">{provider.logo}</span>
                      <div>
                        <span className="font-medium text-lg">{provider.name}</span>
                        <p className="text-sm text-muted-foreground">Click to visit</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Visit
                    </Button>
                  </a>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Bookings;
