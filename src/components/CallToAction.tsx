
import React from 'react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

const CallToAction = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section 
      ref={ref as React.RefObject<HTMLElement>} 
      className={`bg-bakery-500 text-white py-20 transition-all duration-1000 transform ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
    >
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Treat Yourself?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Pre-order your favorite treats today and experience the magic of our freshly baked goods.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button className="bg-white text-bakery-500 hover:bg-cream-100">Order Now</Button>
          <Button variant="outline" className="border-white text-white hover:bg-bakery-600">View Menu</Button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
