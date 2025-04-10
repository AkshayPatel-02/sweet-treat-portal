
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import * as THREE from 'three';

const HeroSection = () => {
  const canvasRef = useRef<HTMLDivElement>(null);

  // This is a placeholder for the 3D cake model
  // In a real implementation, we would load a 3D model and create a more complex scene
  useEffect(() => {
    if (!canvasRef.current) return;

    // Basic Three.js setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    canvasRef.current.appendChild(renderer.domElement);
    
    // Create a simple cake representation (as a placeholder)
    // In real implementation, you would load a proper 3D model
    const cakeBase = new THREE.Mesh(
      new THREE.CylinderGeometry(2, 2, 1, 32),
      new THREE.MeshLambertMaterial({ color: 0xf8d7da })
    );
    
    const cakeTop = new THREE.Mesh(
      new THREE.CylinderGeometry(1.8, 1.8, 0.7, 32),
      new THREE.MeshLambertMaterial({ color: 0xf5b8bd })
    );
    cakeTop.position.y = 0.85;
    
    const cakeBerry = new THREE.Mesh(
      new THREE.SphereGeometry(0.3, 32, 16),
      new THREE.MeshLambertMaterial({ color: 0xdc3545 })
    );
    cakeBerry.position.y = 1.7;
    cakeBerry.position.x = 0.5;
    
    const cakeBerry2 = new THREE.Mesh(
      new THREE.SphereGeometry(0.2, 32, 16),
      new THREE.MeshLambertMaterial({ color: 0xdc3545 })
    );
    cakeBerry2.position.y = 1.6;
    cakeBerry2.position.x = -0.4;
    
    const cakeGroup = new THREE.Group();
    cakeGroup.add(cakeBase);
    cakeGroup.add(cakeTop);
    cakeGroup.add(cakeBerry);
    cakeGroup.add(cakeBerry2);
    
    scene.add(cakeGroup);
    
    // Add light
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 1);
    scene.add(light);
    
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    camera.position.z = 6;
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      cakeGroup.rotation.y += 0.005;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      if (!canvasRef.current) return;
      
      camera.aspect = canvasRef.current.clientWidth / canvasRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (canvasRef.current) {
        canvasRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <section className="hero-gradient min-h-[90vh] flex items-center relative overflow-hidden">
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-xl">
            <h1 className="text-bakery-800 mb-4">
              Delicious Treats, <span className="text-bakery-500">Made to Order</span>
            </h1>
            <p className="text-lg mb-8">
              Indulge in our handcrafted cakes, pastries, and chocolates. Pre-order your favorite treats for any special occasion and experience bakery magic at your doorstep.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="btn-bakery">
                Explore Menu <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" className="btn-outline">
                Learn More
              </Button>
            </div>
          </div>
          
          <div className="flex justify-center items-center">
            <div 
              ref={canvasRef} 
              className="w-full h-[400px] md:h-[500px] cake-shadow animate-float"
            ></div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-[5%] w-20 h-20 bg-bakery-200 rounded-full opacity-50 animate-pulse"></div>
      <div className="absolute bottom-20 left-[10%] w-12 h-12 bg-cream-300 rounded-full opacity-40 animate-bounce"></div>
      <div className="absolute top-[30%] left-[5%] w-16 h-16 bg-mint-200 rounded-full opacity-30 animate-pulse"></div>
    </section>
  );
};

export default HeroSection;
