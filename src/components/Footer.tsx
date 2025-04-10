
import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-cream-100 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold font-serif text-bakery-800 mb-4">Sweet <span className="text-bakery-500">Treats</span></h3>
            <p className="text-muted-foreground mb-4">
              Delightful pastries, cakes, and chocolates made with love. Pre-order your favorite treats for special occasions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-bakery-500 hover:text-bakery-700 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-bakery-500 hover:text-bakery-700 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-bakery-500 hover:text-bakery-700 transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          {/* Links */}
          <div>
            <h4 className="font-serif font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-foreground hover:text-bakery-500 transition-colors">Home</a></li>
              <li><a href="#menu" className="text-foreground hover:text-bakery-500 transition-colors">Menu</a></li>
              <li><a href="#about" className="text-foreground hover:text-bakery-500 transition-colors">About Us</a></li>
              <li><a href="#contact" className="text-foreground hover:text-bakery-500 transition-colors">Contact</a></li>
              <li><a href="#" className="text-foreground hover:text-bakery-500 transition-colors">Login</a></li>
              <li><a href="#" className="text-foreground hover:text-bakery-500 transition-colors">Register</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="font-serif font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-bakery-500 mr-2 mt-1" />
                <span>123 Bakery Street, Sweet Town, ST 12345</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-bakery-500 mr-2" />
                <span>(123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-bakery-500 mr-2" />
                <span>hello@sweettreats.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Sweet Treats. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
