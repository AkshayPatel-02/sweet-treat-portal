
import React from 'react';
import Header from '@/components/Header';
import AuthHeader from '@/components/AuthHeader';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import FeaturedProducts from '@/components/FeaturedProducts';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import CallToAction from '@/components/CallToAction';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex justify-between items-center p-4 md:p-6 bg-white shadow-sm">
        <Header />
        <AuthHeader />
      </div>
      <main className="flex-grow">
        <HeroSection />
        <FeaturedProducts />
        <AboutSection />
        <ContactSection />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
