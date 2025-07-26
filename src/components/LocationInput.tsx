import React, { useState } from 'react';
import { MapPin, Navigation, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface LocationInputProps {
  pickup: string;
  destination: string;
  onPickupChange: (value: string) => void;
  onDestinationChange: (value: string) => void;
  onCurrentLocation: () => void;
}

const LocationInput = ({ 
  pickup, 
  destination, 
  onPickupChange, 
  onDestinationChange, 
  onCurrentLocation 
}: LocationInputProps) => {
  const [focused, setFocused] = useState<'pickup' | 'destination' | null>(null);

  const recentLocations = [
    { name: "Home", address: "123 Main Street, Downtown", type: "home" },
    { name: "Work", address: "456 Business Plaza, Corporate District", type: "work" },
    { name: "Airport", address: "International Airport Terminal 1", type: "airport" }
  ];

  return (
    <div className="bg-card rounded-xl shadow-card p-6 space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-3 h-3 rounded-full bg-primary animate-pulse"></div>
        <h3 className="text-lg font-semibold text-foreground">Where to?</h3>
      </div>

      {/* Pickup Location */}
      <div className="relative">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-primary"></div>
          <div className="flex-1">
            <input
              type="text"
              placeholder="Pickup location"
              value={pickup}
              onChange={(e) => onPickupChange(e.target.value)}
              onFocus={() => setFocused('pickup')}
              onBlur={() => setFocused(null)}
              className={cn(
                "w-full px-4 py-3 bg-muted rounded-lg border border-border transition-all duration-300",
                "placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary",
                focused === 'pickup' && "ring-2 ring-primary border-primary shadow-elegant"
              )}
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onCurrentLocation}
            className="text-primary hover:bg-primary/10"
          >
            <Navigation className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3 py-2">
        <div className="w-6 h-px bg-border ml-1.5"></div>
        <div className="w-2 h-2 rounded-full bg-border"></div>
        <div className="flex-1 h-px bg-border"></div>
      </div>

      {/* Destination */}
      <div className="relative">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full border-2 border-primary bg-background"></div>
          <div className="flex-1">
            <input
              type="text"
              placeholder="Where to?"
              value={destination}
              onChange={(e) => onDestinationChange(e.target.value)}
              onFocus={() => setFocused('destination')}
              onBlur={() => setFocused(null)}
              className={cn(
                "w-full px-4 py-3 bg-muted rounded-lg border border-border transition-all duration-300",
                "placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary",
                focused === 'destination' && "ring-2 ring-primary border-primary shadow-elegant"
              )}
            />
          </div>
        </div>
      </div>

      {/* Recent Locations */}
      {(focused === 'pickup' || focused === 'destination') && (
        <div className="mt-4 space-y-2 animate-in slide-in-from-top-2 duration-300">
          <h4 className="text-sm font-medium text-muted-foreground px-2">Recent locations</h4>
          {recentLocations.map((location, index) => (
            <button
              key={index}
              className="w-full flex items-center gap-3 p-3 hover:bg-muted rounded-lg transition-colors duration-200"
              onClick={() => {
                if (focused === 'pickup') {
                  onPickupChange(location.address);
                } else if (focused === 'destination') {
                  onDestinationChange(location.address);
                }
                setFocused(null);
              }}
            >
              <div className="p-2 bg-primary/10 rounded-lg">
                <Clock className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 text-left">
                <div className="font-medium text-foreground">{location.name}</div>
                <div className="text-sm text-muted-foreground">{location.address}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationInput;