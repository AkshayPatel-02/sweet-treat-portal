
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

const ContactSection = () => {
  const { ref: formRef, isVisible: formVisible } = useScrollAnimation(0.1);
  const { ref: contactRef, isVisible: contactVisible } = useScrollAnimation(0.1);

  return (
    <section id="contact" className="section-padding bg-cream-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-bakery-800 mb-4">Get in Touch</h2>
          <p className="text-muted-foreground">
            Have questions about our treats or custom orders? Reach out to us, and we'll get back to you as soon as possible.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div 
            ref={formRef as React.RefObject<HTMLDivElement>}
            className={`bg-white p-8 rounded-lg shadow-md transition-all duration-700 transform ${
              formVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <h3 className="text-xl font-bold mb-4">Send us a Message</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <Input id="name" placeholder="Your name" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <Input id="email" type="email" placeholder="Your email" />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <Input id="subject" placeholder="Subject" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <Textarea id="message" placeholder="Your message" rows={4} />
              </div>
              <Button className="w-full bg-bakery-500 hover:bg-bakery-600">Send Message</Button>
            </form>
          </div>
          
          <div 
            ref={contactRef as React.RefObject<HTMLDivElement>}
            className={`flex flex-col justify-center transition-all duration-700 transform ${
              contactVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-2">Visit Our Bakery</h3>
              <p className="text-muted-foreground mb-4">
                Come see us and try our fresh treats at our bakery.
              </p>
              <div className="flex items-start mb-2">
                <svg className="w-5 h-5 text-bakery-500 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>123 Sweet Street, Bakery Town, BT 12345</span>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-2">Opening Hours</h3>
              <div className="grid grid-cols-2 gap-2">
                <div>Monday - Friday</div>
                <div>7:00 AM - 7:00 PM</div>
                <div>Saturday</div>
                <div>8:00 AM - 6:00 PM</div>
                <div>Sunday</div>
                <div>9:00 AM - 3:00 PM</div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-2">Contact Information</h3>
              <div className="flex items-center mb-2">
                <svg className="w-5 h-5 text-bakery-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span>(123) 456-7890</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-bakery-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span>info@sweettreats.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
