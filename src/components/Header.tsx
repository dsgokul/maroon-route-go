import React from 'react';
import { Menu, Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="bg-card shadow-card border-b border-border">
      <div className="max-w-md mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" className="text-foreground">
            <Menu className="w-5 h-5" />
          </Button>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">R</span>
            </div>
            <div className="text-left">
              <h1 className="text-lg font-bold text-foreground">RideApp</h1>
              <p className="text-xs text-muted-foreground">Premium rides</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-foreground relative">
              <Bell className="w-5 h-5" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full"></div>
            </Button>
            <Button variant="ghost" size="icon" className="text-foreground">
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;