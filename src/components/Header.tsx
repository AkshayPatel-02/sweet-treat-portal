
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthHeader from './AuthHeader';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      isScrolled ? 'bg-background/70 backdrop-blur-md shadow-sm' : 'bg-background/80 backdrop-blur-md'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold font-serif text-bakery-800">Sweet <span className="text-bakery-500">Treats</span></h1>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-foreground hover:text-bakery-500 font-medium transition-colors">Home</Link>
            <Link to="/user" className="text-foreground hover:text-bakery-500 font-medium transition-colors">Menu</Link>
            <a href="#about" className="text-foreground hover:text-bakery-500 font-medium transition-colors">About</a>
            <a href="#contact" className="text-foreground hover:text-bakery-500 font-medium transition-colors">Contact</a>
          </nav>
          
          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="rounded-full p-2">
              <ShoppingBag className="h-5 w-5" />
            </Button>
            <AuthHeader />
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button variant="ghost" className="rounded-full p-2">
              <ShoppingBag className="h-5 w-5" />
            </Button>
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
              <Link to="/" className="text-foreground hover:text-bakery-500 font-medium transition-colors px-4 py-2">Home</Link>
              <Link to="/user" className="text-foreground hover:text-bakery-500 font-medium transition-colors px-4 py-2">Menu</Link>
              <a href="#about" className="text-foreground hover:text-bakery-500 font-medium transition-colors px-4 py-2">About</a>
              <a href="#contact" className="text-foreground hover:text-bakery-500 font-medium transition-colors px-4 py-2">Contact</a>
              <div className="flex px-4 mt-4">
                <AuthHeader />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
