
import React from 'react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

const AboutSection = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: textRef, isVisible: textVisible } = useScrollAnimation();
  const { ref: imageRef, isVisible: imageVisible } = useScrollAnimation();

  return (
    <section id="about" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2">
            <div 
              ref={titleRef as React.RefObject<HTMLDivElement>} 
              className={`transition-all duration-1000 transform ${
                titleVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Our Sweet Story</h2>
              <div className="w-20 h-1 bg-bakery-500 mb-6"></div>
            </div>
            <div 
              ref={textRef as React.RefObject<HTMLDivElement>}
              className={`space-y-4 transition-all duration-1000 delay-300 transform ${
                textVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              <p className="text-muted-foreground">
                Founded in 2010, Sweet Treats Bakery began as a small family-owned shop dedicated to creating 
                delicious, handcrafted desserts made from the finest ingredients.
              </p>
              <p className="text-muted-foreground">
                Every day, our pastry chefs wake up early to prepare fresh, mouthwatering treats that bring joy 
                to our community. From classic recipes passed down through generations to innovative 
                creations that push the boundaries of flavor, we take pride in every item that leaves our kitchen.
              </p>
              <p className="text-muted-foreground">
                Our commitment to quality extends beyond our ingredients to the warm, welcoming experience we 
                provide. We believe in creating not just desserts, but moments of happiness that bring people together.
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2 mt-8 md:mt-0">
            <div 
              ref={imageRef as React.RefObject<HTMLDivElement>}
              className={`rounded-lg overflow-hidden shadow-lg transition-all duration-1000 delay-500 transform ${
                imageVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
              }`}
            >
              <img 
                src="https://images.unsplash.com/photo-1568254183919-78a4f43a2877?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80" 
                alt="Bakery interior with pastry chefs working" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
