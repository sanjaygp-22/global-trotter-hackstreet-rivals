import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useTrips } from '@/contexts/TripContext';
import { Mail, Calendar, MapPin, Plane, TrendingUp, Loader2 } from 'lucide-react';
import { format } from 'date-fns';

const Profile = () => {
  const { user, isLoading, logout } = useAuth();
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
  const completedTrips = userTrips.filter(t => t.status === 'completed');
  const citiesVisited = new Set(completedTrips.map(t => t.destination_city));

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
            My Profile
          </h1>
          <p className="text-muted-foreground">
            View and manage your account
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="md:col-span-1">
            <CardContent className="pt-6 text-center">
              <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary/20">
                <AvatarImage src={user.avatar_url} alt={user.name} />
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <h2 className="font-display text-2xl font-bold mb-1">{user.name}</h2>
              <p className="text-muted-foreground mb-4">{user.email}</p>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                Member since {format(new Date(user.created_at), 'MMMM yyyy')}
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Travel Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-primary/5 rounded-xl">
                  <Plane className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold">{userTrips.length}</div>
                  <div className="text-sm text-muted-foreground">Total Trips</div>
                </div>
                <div className="text-center p-4 bg-success/5 rounded-xl">
                  <TrendingUp className="w-8 h-8 mx-auto mb-2 text-success" />
                  <div className="text-2xl font-bold">{completedTrips.length}</div>
                  <div className="text-sm text-muted-foreground">Completed</div>
                </div>
                <div className="text-center p-4 bg-secondary/10 rounded-xl">
                  <MapPin className="w-8 h-8 mx-auto mb-2 text-secondary" />
                  <div className="text-2xl font-bold">{citiesVisited.size}</div>
                  <div className="text-sm text-muted-foreground">Cities Visited</div>
                </div>
                <div className="text-center p-4 bg-info/5 rounded-xl">
                  <Mail className="w-8 h-8 mx-auto mb-2 text-info" />
                  <div className="text-2xl font-bold">{userTrips.filter(t => t.status === 'planned').length}</div>
                  <div className="text-sm text-muted-foreground">Upcoming</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Info */}
          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Full Name</div>
                  <div className="font-medium">{user.name}</div>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Email Address</div>
                  <div className="font-medium">{user.email}</div>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">User ID</div>
                  <div className="font-mono text-sm">{user.user_id}</div>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Account Created</div>
                  <div className="font-medium">{format(new Date(user.created_at), 'PPP')}</div>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <Button variant="destructive" onClick={logout}>
                  Sign Out
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
