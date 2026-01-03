import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Trip, Itinerary, Expense, TripWithDetails } from '@/types/database';
import { trips as initialTrips, itineraries as initialItineraries, expenses as initialExpenses, bookings } from '@/data/mockData';
import { useAuth } from './AuthContext';

interface TripContextType {
  trips: Trip[];
  getUserTrips: () => Trip[];
  getTripById: (tripId: string) => TripWithDetails | undefined;
  addTrip: (trip: Omit<Trip, 'trip_id'>) => Trip;
  updateTrip: (tripId: string, updates: Partial<Trip>) => void;
  deleteTrip: (tripId: string) => void;
  addItinerary: (itinerary: Omit<Itinerary, 'itinerary_id'>) => void;
  updateItinerary: (itineraryId: string, updates: Partial<Itinerary>) => void;
  deleteItinerary: (itineraryId: string) => void;
  getItinerariesForTrip: (tripId: string) => Itinerary[];
  addExpense: (expense: Omit<Expense, 'expense_id'>) => void;
  updateExpense: (expenseId: string, updates: Partial<Expense>) => void;
  getExpenseForTrip: (tripId: string) => Expense | undefined;
}

const TripContext = createContext<TripContextType | undefined>(undefined);

export const TripProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [trips, setTrips] = useState<Trip[]>(initialTrips);
  const [itineraries, setItineraries] = useState<Itinerary[]>(initialItineraries);
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);

  const getUserTrips = (): Trip[] => {
    if (!user) return [];
    return trips.filter(trip => trip.user_id === user.user_id);
  };

  const getTripById = (tripId: string): TripWithDetails | undefined => {
    const trip = trips.find(t => t.trip_id === tripId);
    if (!trip) return undefined;

    return {
      ...trip,
      itineraries: itineraries.filter(i => i.trip_id === tripId),
      expense: expenses.find(e => e.trip_id === tripId) || null,
      bookings: bookings.filter(b => b.trip_id === tripId),
    };
  };

  const addTrip = (tripData: Omit<Trip, 'trip_id'>): Trip => {
    const newTrip: Trip = {
      ...tripData,
      trip_id: `trip_${Date.now()}`,
    };
    setTrips(prev => [...prev, newTrip]);
    return newTrip;
  };

  const updateTrip = (tripId: string, updates: Partial<Trip>) => {
    setTrips(prev => prev.map(trip => 
      trip.trip_id === tripId ? { ...trip, ...updates } : trip
    ));
  };

  const deleteTrip = (tripId: string) => {
    setTrips(prev => prev.filter(trip => trip.trip_id !== tripId));
    setItineraries(prev => prev.filter(i => i.trip_id !== tripId));
    setExpenses(prev => prev.filter(e => e.trip_id !== tripId));
  };

  const addItinerary = (itineraryData: Omit<Itinerary, 'itinerary_id'>) => {
    const newItinerary: Itinerary = {
      ...itineraryData,
      itinerary_id: `itin_${Date.now()}`,
    };
    setItineraries(prev => [...prev, newItinerary]);
  };

  const updateItinerary = (itineraryId: string, updates: Partial<Itinerary>) => {
    setItineraries(prev => prev.map(i => 
      i.itinerary_id === itineraryId ? { ...i, ...updates } : i
    ));
  };

  const deleteItinerary = (itineraryId: string) => {
    setItineraries(prev => prev.filter(i => i.itinerary_id !== itineraryId));
  };

  const getItinerariesForTrip = (tripId: string): Itinerary[] => {
    return itineraries.filter(i => i.trip_id === tripId).sort((a, b) => a.day_number - b.day_number);
  };

  const addExpense = (expenseData: Omit<Expense, 'expense_id'>) => {
    const newExpense: Expense = {
      ...expenseData,
      expense_id: `exp_${Date.now()}`,
    };
    setExpenses(prev => [...prev, newExpense]);
  };

  const updateExpense = (expenseId: string, updates: Partial<Expense>) => {
    setExpenses(prev => prev.map(e => 
      e.expense_id === expenseId ? { ...e, ...updates } : e
    ));
  };

  const getExpenseForTrip = (tripId: string): Expense | undefined => {
    return expenses.find(e => e.trip_id === tripId);
  };

  return (
    <TripContext.Provider value={{
      trips,
      getUserTrips,
      getTripById,
      addTrip,
      updateTrip,
      deleteTrip,
      addItinerary,
      updateItinerary,
      deleteItinerary,
      getItinerariesForTrip,
      addExpense,
      updateExpense,
      getExpenseForTrip,
    }}>
      {children}
    </TripContext.Provider>
  );
};

export const useTrips = () => {
  const context = useContext(TripContext);
  if (context === undefined) {
    throw new Error('useTrips must be used within a TripProvider');
  }
  return context;
};
