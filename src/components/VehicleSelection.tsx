import React, { useState } from 'react';
import { Car, Users, Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface VehicleType {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  price: string;
  eta: string;
  capacity: number;
  rating: number;
  features: string[];
}

interface VehicleSelectionProps {
  selectedVehicle: string;
  onVehicleSelect: (vehicleId: string) => void;
}

const VehicleSelection = ({ selectedVehicle, onVehicleSelect }: VehicleSelectionProps) => {
  const vehicles: VehicleType[] = [
    {
      id: 'economy',
      name: 'Economy',
      description: 'Affordable rides',
      icon: <Car className="w-6 h-6" />,
      price: '$12.50',
      eta: '3 min',
      capacity: 4,
      rating: 4.8,
      features: ['AC', 'Music']
    },
    {
      id: 'comfort',
      name: 'Comfort',
      description: 'Extra legroom',
      icon: <Car className="w-6 h-6" />,
      price: '$18.75',
      eta: '5 min',
      capacity: 4,
      rating: 4.9,
      features: ['AC', 'Music', 'Premium']
    },
    {
      id: 'suv',
      name: 'SUV',
      description: 'Spacious ride',
      icon: <Car className="w-6 h-6" />,
      price: '$25.00',
      eta: '7 min',
      capacity: 6,
      rating: 4.9,
      features: ['AC', 'Music', 'Extra Space']
    },
    {
      id: 'premium',
      name: 'Premium',
      description: 'Luxury experience',
      icon: <Car className="w-6 h-6" />,
      price: '$35.00',
      eta: '8 min',
      capacity: 4,
      rating: 5.0,
      features: ['AC', 'WiFi', 'Luxury']
    }
  ];

  return (
    <div className="bg-card rounded-xl shadow-card p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-3 h-3 rounded-full bg-secondary animate-pulse"></div>
        <h3 className="text-lg font-semibold text-foreground">Choose your ride</h3>
      </div>

      <div className="space-y-3">
        {vehicles.map((vehicle) => (
          <button
            key={vehicle.id}
            onClick={() => onVehicleSelect(vehicle.id)}
            className={cn(
              "w-full p-4 rounded-lg border-2 transition-all duration-300 text-left",
              "hover:shadow-card hover:scale-[1.02] active:scale-[0.98]",
              selectedVehicle === vehicle.id
                ? "border-primary bg-primary/5 shadow-elegant"
                : "border-border bg-background hover:border-primary/50"
            )}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={cn(
                  "p-3 rounded-lg transition-colors duration-300",
                  selectedVehicle === vehicle.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}>
                  {vehicle.icon}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-foreground">{vehicle.name}</h4>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-muted-foreground">{vehicle.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{vehicle.description}</p>
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>{vehicle.capacity}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{vehicle.eta}</span>
                    </div>
                    <div className="flex gap-1">
                      {vehicle.features.map((feature, index) => (
                        <span key={index} className="px-2 py-1 bg-muted rounded text-xs">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className={cn(
                  "text-lg font-bold transition-colors duration-300",
                  selectedVehicle === vehicle.id ? "text-primary" : "text-foreground"
                )}>
                  {vehicle.price}
                </div>
                <div className="text-xs text-muted-foreground">
                  {vehicle.eta} away
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {selectedVehicle && (
        <div className="mt-6 p-4 bg-gradient-subtle rounded-lg border border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-foreground">Estimated fare</h4>
              <p className="text-sm text-muted-foreground">Including taxes and fees</p>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-primary">
                {vehicles.find(v => v.id === selectedVehicle)?.price}
              </div>
              <div className="text-xs text-muted-foreground">Final price</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleSelection;