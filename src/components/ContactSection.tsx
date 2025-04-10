
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const ContactSection = () => {
  return (
    <section id="contact" className="section-padding bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-bakery-800 mb-4">Get in Touch</h2>
          <p className="text-muted-foreground">
            Have questions about our treats or pre-ordering process? Reach out to us and we'll be happy to assist you.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <CardDescription>
                  Fill out this form and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block mb-2 text-sm">Name</label>
                      <Input id="name" placeholder="Your name" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block mb-2 text-sm">Email</label>
                      <Input id="email" type="email" placeholder="Your email" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block mb-2 text-sm">Subject</label>
                    <Input id="subject" placeholder="Subject" />
                  </div>
                  <div>
                    <label htmlFor="message" className="block mb-2 text-sm">Message</label>
                    <Textarea id="message" rows={5} placeholder="Your message" />
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-bakery-500 hover:bg-bakery-600">Send Message</Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-bakery-500 mr-3 mt-1" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-muted-foreground">123 Bakery Street, Sweet Town, ST 12345</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-bakery-500 mr-3 mt-1" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-muted-foreground">(123) 456-7890</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-bakery-500 mr-3 mt-1" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-muted-foreground">hello@sweettreats.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-bakery-500 mr-3 mt-1" />
                  <div>
                    <p className="font-medium">Opening Hours</p>
                    <p className="text-muted-foreground">Monday - Friday: 8AM - 7PM</p>
                    <p className="text-muted-foreground">Saturday: 9AM - 5PM</p>
                    <p className="text-muted-foreground">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Find Us</h3>
              <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                {/* Placeholder for Google Map - In a real implementation, you'd embed a Google Map here */}
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <p className="text-muted-foreground">Google Map will be embedded here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
