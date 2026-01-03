import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Globe, MapPin, Calendar, DollarSign, Hotel, Plane, 
  ArrowRight, Star, Users, Shield, Sparkles
} from 'lucide-react';

const Index = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: MapPin,
      title: 'Trip Planning',
      description: 'Create detailed itineraries with day-by-day activities and destinations.',
    },
    {
      icon: DollarSign,
      title: 'Budget Tracking',
      description: 'Estimate and track your travel expenses to stay within budget.',
    },
    {
      icon: Hotel,
      title: 'Hotel Discovery',
      description: 'Find and compare hotels near your destination with ease.',
    },
    {
      icon: Plane,
      title: 'Easy Booking',
      description: 'Quick access to popular booking platforms for flights, trains, and more.',
    },
  ];

  const testimonials = [
    {
      name: 'Priya S.',
      location: 'Mumbai',
      text: 'Global Trotter made planning my Goa trip so much easier. The budget tracker is a lifesaver!',
      rating: 5,
    },
    {
      name: 'Rahul K.',
      location: 'Delhi',
      text: 'Love the itinerary builder. I could plan each day of my Rajasthan tour perfectly.',
      rating: 5,
    },
    {
      name: 'Anita M.',
      location: 'Bangalore',
      text: 'The hotel recommendations were spot on. Found amazing deals for my Kerala trip!',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero min-h-[90vh] flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/3 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center">
                <Globe className="w-8 h-8" />
              </div>
              <span className="font-display text-4xl font-bold">Global Trotter</span>
            </div>
            
            <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight mb-6">
              Plan Your Dream<br />
              <span className="text-white/90">Journey Today</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-2xl mx-auto">
              Your all-in-one travel companion. Plan trips, track budgets, discover hotels, 
              and book tickets - all in one beautiful app.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {user ? (
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 px-8" asChild>
                  <Link to="/dashboard">
                    Go to Dashboard
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              ) : (
                <>
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90 px-8" asChild>
                    <Link to="/auth?mode=signup">
                      Get Started Free
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8" asChild>
                    <Link to="/auth">
                      Sign In
                    </Link>
                  </Button>
                </>
              )}
            </div>

            <div className="mt-16 flex items-center justify-center gap-8 text-white/70">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>10K+ Users</span>
              </div>
              <div className="flex items-center gap-2">
                <Plane className="w-5 h-5" />
                <span>50K+ Trips</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-white/70" />
                <span>4.9 Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need to<br />Plan Your Perfect Trip
            </h2>
            <p className="text-muted-foreground text-lg">
              From planning to booking, we've got you covered with all the tools you need.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={feature.title} 
                className="border-border/50 hover:border-primary/30 hover:shadow-lg transition-all group animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Loved by Travelers
            </h2>
            <p className="text-muted-foreground text-lg">
              See what our users are saying about their experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={testimonial.name} 
                className="border-border/50 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-foreground mb-4">"{testimonial.text}"</p>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-medium">{testimonial.name[0]}</span>
                    </div>
                    <div>
                      <div className="font-medium">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <Sparkles className="w-12 h-12 mx-auto mb-6 opacity-80" />
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
            Ready to Start Your Adventure?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-xl mx-auto">
            Join thousands of travelers who plan their trips with Global Trotter.
          </p>
          {!user && (
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 px-8" asChild>
              <Link to="/auth?mode=signup">
                Create Free Account
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-foreground text-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Globe className="w-6 h-6" />
              <span className="font-display text-xl font-bold">Global Trotter</span>
            </div>
            <p className="text-sm text-background/70">
              © 2025 Global Trotter. Built for travelers, by travelers.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <a href="#" className="hover:text-background/80 transition-colors">Privacy</a>
              <a href="#" className="hover:text-background/80 transition-colors">Terms</a>
              <a href="#" className="hover:text-background/80 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
