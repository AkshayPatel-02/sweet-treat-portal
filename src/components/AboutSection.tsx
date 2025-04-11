
import React from 'react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

const AboutSection = () => {
  const { ref: ref1, isVisible: isVisible1 } = useScrollAnimation(0.1);
  const { ref: ref2, isVisible: isVisible2 } = useScrollAnimation(0.1);
  const { ref: ref3, isVisible: isVisible3 } = useScrollAnimation(0.1);

  return (
    <section id="about" className="section-padding bg-background">
      <div className="container mx-auto px-4">
        <div 
          ref={ref1 as React.RefObject<HTMLDivElement>}
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 transform ${
            isVisible1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-bakery-800 mb-4">About Sweet Treats</h2>
          <p className="text-muted-foreground">
            We are passionate about creating delicious, handcrafted treats that bring joy to your special moments. 
            Our journey started with a love for baking and has grown into a beloved local business.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            ref={ref2 as React.RefObject<HTMLDivElement>}
            className={`text-center p-6 transition-all duration-700 delay-100 transform ${
              isVisible2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="bg-cream-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-bakery-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 3.5a6.5 6.5 0 00-6.5 6.5c0 1.5.5 2.9 1.4 4l.6.8-1.2 3.5 3.5-1.2.8.6a6.5 6.5 0 009.9-5.6 6.5 6.5 0 00-6.5-6.5zm2.9 8.8l-1.1.4a3.4 3.4 0 01-2.8-.2 6 6 0 01-2.4-2.4 3.4 3.4 0 01-.2-2.8l.4-1.1a.5.5 0 01.6-.3l1.5.5a.5.5 0 01.3.7l-.3.7a.3.3 0 00-.1.2l1.3 1.3a.3.3 0 00.2 0l.7-.3a.5.5 0 01.7.3l.5 1.5a.5.5 0 01-.3.6z"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Quality Ingredients</h3>
            <p className="text-muted-foreground">
              We use only premium, locally-sourced ingredients to ensure the best taste and quality in every bite.
            </p>
          </div>
          
          <div 
            ref={ref2 as React.RefObject<HTMLDivElement>}
            className={`text-center p-6 transition-all duration-700 delay-200 transform ${
              isVisible2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="bg-mint-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-mint-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3.8 3.8a1 1 0 011.4 0L10 8.6l4.8-4.8a1 1 0 111.4 1.4L11.4 10l4.8 4.8a1 1 0 01-1.4 1.4L10 11.4l-4.8 4.8a1 1 0 01-1.4-1.4L8.6 10 3.8 5.2a1 1 0 010-1.4z"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Custom Orders</h3>
            <p className="text-muted-foreground">
              From weddings to birthdays, we create custom treats tailored to your specific occasion and preferences.
            </p>
          </div>
          
          <div 
            ref={ref3 as React.RefObject<HTMLDivElement>}
            className={`text-center p-6 transition-all duration-700 delay-300 transform ${
              isVisible3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="bg-bakery-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-bakery-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12zm1-6a1 1 0 10-2 0v2.59l-1.3-1.3a1 1 0 00-1.4 1.42l3 3a1 1 0 001.4 0l3-3a1 1 0 00-1.4-1.42L11 12.6V10z"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Fresh Daily</h3>
            <p className="text-muted-foreground">
              Every item is baked fresh daily, ensuring you receive the highest quality treats at their peak freshness.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
