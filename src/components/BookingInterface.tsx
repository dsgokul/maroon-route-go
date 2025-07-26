import React, { useState } from 'react';
import { Navigation, Clock, Shield, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LocationInput from './LocationInput';
import VehicleSelection from './VehicleSelection';
import { useToast } from '@/hooks/use-toast';

const BookingInterface = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [isBooking, setIsBooking] = useState(false);
  const { toast } = useToast();

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPickup('Current Location');
          toast({
            title: "Location detected",
            description: "Using your current location as pickup point.",
          });
        },
        (error) => {
          toast({
            title: "Location error",
            description: "Unable to detect your location. Please enter manually.",
            variant: "destructive",
          });
        }
      );
    }
  };

  const handleBookRide = async () => {
    if (!pickup || !destination || !selectedVehicle) {
      toast({
        title: "Missing information",
        description: "Please fill in pickup, destination, and select a vehicle.",
        variant: "destructive",
      });
      return;
    }

    setIsBooking(true);
    
    // Simulate booking process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Ride booked successfully!",
      description: "Your driver will arrive in 3-5 minutes.",
    });
    
    setIsBooking(false);
  };

  const canBookRide = pickup && destination && selectedVehicle && !isBooking;

  return (
    <div className="max-w-md mx-auto bg-background min-h-screen">
      {/* Map Placeholder */}
      <div className="h-96 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/20"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-primary-foreground">
            <Navigation className="w-16 h-16 mx-auto mb-4 animate-float" />
            <h2 className="text-2xl font-bold mb-2">Find Your Ride</h2>
            <p className="text-primary-foreground/80">Premium transportation at your fingertips</p>
          </div>
        </div>
        
        {/* Floating cards for visual interest */}
        <div className="absolute top-8 left-8 w-12 h-12 bg-primary-foreground/20 rounded-lg backdrop-blur-sm animate-float"></div>
        <div className="absolute top-16 right-12 w-8 h-8 bg-primary-foreground/30 rounded-full backdrop-blur-sm animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-16 w-6 h-6 bg-primary-foreground/25 rounded-full backdrop-blur-sm animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Booking Form */}
      <div className="p-6 space-y-6 relative -mt-8 z-10">
        <LocationInput
          pickup={pickup}
          destination={destination}
          onPickupChange={setPickup}
          onDestinationChange={setDestination}
          onCurrentLocation={handleCurrentLocation}
        />

        {pickup && destination && (
          <div className="animate-in slide-in-from-top-4 duration-500">
            <VehicleSelection
              selectedVehicle={selectedVehicle}
              onVehicleSelect={setSelectedVehicle}
            />
          </div>
        )}

        {/* Booking Button */}
        {canBookRide && (
          <div className="animate-in slide-in-from-bottom-4 duration-500">
            <Button
              variant="hero"
              size="xl"
              onClick={handleBookRide}
              disabled={isBooking}
              className="w-full"
            >
              {isBooking ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                  Booking your ride...
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5" />
                  Book Ride Now
                </div>
              )}
            </Button>
          </div>
        )}

        {/* Safety Features */}
        <div className="grid grid-cols-2 gap-4 pt-4">
          <div className="flex items-center gap-3 p-4 bg-gradient-subtle rounded-lg border border-primary/10">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Shield className="w-4 h-4 text-primary" />
            </div>
            <div>
              <div className="font-medium text-sm text-foreground">Safe Rides</div>
              <div className="text-xs text-muted-foreground">24/7 Support</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-4 bg-gradient-subtle rounded-lg border border-primary/10">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Clock className="w-4 h-4 text-primary" />
            </div>
            <div>
              <div className="font-medium text-sm text-foreground">On Time</div>
              <div className="text-xs text-muted-foreground">Always punctual</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingInterface;