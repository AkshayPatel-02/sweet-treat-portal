
import React from 'react';

const AboutSection = () => {
  return (
    <section id="about" className="section-padding bg-cream-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1556910096-5a4b33d8cfae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="Bakery Chef" 
              className="rounded-2xl shadow-xl"
            />
          </div>
          <div>
            <h2 className="text-bakery-800 mb-4">Our Sweet Story</h2>
            <p className="mb-4">
              Sweet Treats Bakery began with a passion for creating delightful moments through the art of baking. Founded in 2018 by pastry chef Maria Rodriguez, our bakery has grown from a small home kitchen to a beloved local establishment.
            </p>
            <p className="mb-4">
              We believe in using only the freshest, highest quality ingredients in all of our creations. Each cake, pastry, and chocolate is handcrafted with attention to detail and a commitment to excellence.
            </p>
            <p className="mb-8">
              Our pre-order system ensures that each treat is made specially for you, guaranteeing freshness and allowing for custom requests. We take pride in being part of your special moments and celebrations.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-bakery-500 mb-2">1000+</div>
                <div className="text-sm text-muted-foreground">Happy Customers</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-bakery-500 mb-2">50+</div>
                <div className="text-sm text-muted-foreground">Unique Recipes</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-bakery-500 mb-2">5</div>
                <div className="text-sm text-muted-foreground">Years of Passion</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
