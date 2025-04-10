
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, ShoppingBag, User } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-background/95 backdrop-blur-sm sticky top-0 z-50 border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <h1 className="text-2xl font-bold font-serif text-bakery-800">Sweet <span className="text-bakery-500">Treats</span></h1>
          </a>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="/" className="text-foreground hover:text-bakery-500 font-medium transition-colors">Home</a>
            <a href="#menu" className="text-foreground hover:text-bakery-500 font-medium transition-colors">Menu</a>
            <a href="#about" className="text-foreground hover:text-bakery-500 font-medium transition-colors">About</a>
            <a href="#contact" className="text-foreground hover:text-bakery-500 font-medium transition-colors">Contact</a>
          </nav>
          
          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="rounded-full p-2">
              <ShoppingBag className="h-5 w-5" />
            </Button>
            <Button className="bg-bakery-500 hover:bg-bakery-600 rounded-full">
              <User className="h-5 w-5 mr-2" /> Login
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              className="p-2" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 mt-2 border-t">
            <nav className="flex flex-col space-y-4">
              <a href="/" className="text-foreground hover:text-bakery-500 font-medium transition-colors px-4 py-2">Home</a>
              <a href="#menu" className="text-foreground hover:text-bakery-500 font-medium transition-colors px-4 py-2">Menu</a>
              <a href="#about" className="text-foreground hover:text-bakery-500 font-medium transition-colors px-4 py-2">About</a>
              <a href="#contact" className="text-foreground hover:text-bakery-500 font-medium transition-colors px-4 py-2">Contact</a>
              <div className="flex space-x-4 mt-4 px-4">
                <Button variant="ghost" className="rounded-full p-2">
                  <ShoppingBag className="h-5 w-5" />
                </Button>
                <Button className="bg-bakery-500 hover:bg-bakery-600 rounded-full">
                  <User className="h-5 w-5 mr-2" /> Login
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
