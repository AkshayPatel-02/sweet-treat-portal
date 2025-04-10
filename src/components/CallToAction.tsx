
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const CallToAction = () => {
  return (
    <section className="bg-bakery-100 py-20">
      <div className="container mx-auto px-4 text-center max-w-4xl">
        <h2 className="text-bakery-800 mb-6">Ready to Order Your Sweet Treats?</h2>
        <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
          Pre-order your favorite cakes, pastries, and chocolates for your special occasions.
          Our treats are freshly made just for you!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="btn-bakery">
            Pre-order Now <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button variant="outline" className="btn-outline">
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
