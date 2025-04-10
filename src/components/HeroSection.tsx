
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const HeroSection = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [modelLoading, setModelLoading] = useState(true);
  const [modelError, setModelError] = useState<string | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Basic Three.js setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    canvasRef.current.appendChild(renderer.domElement);
    
    // Add orbit controls for better model viewing
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1;
    
    // Setup lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    
    const backLight = new THREE.DirectionalLight(0xffffff, 0.5);
    backLight.position.set(-5, 5, -5);
    scene.add(backLight);
    
    // Create a glow effect for the model
    const createGlow = (targetObject) => {
      const glowMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xff9999, 
        transparent: true, 
        opacity: 0.15 
      });
      
      targetObject.traverse((child) => {
        if (child.isMesh) {
          const glowMesh = new THREE.Mesh(
            child.geometry.clone(),
            glowMaterial
          );
          glowMesh.position.copy(child.position);
          glowMesh.rotation.copy(child.rotation);
          glowMesh.scale.multiplyScalar(1.05);
          scene.add(glowMesh);
        }
      });
    };
    
    // Load the 3D model
    const loader = new GLTFLoader();
    
    // You need to provide the correct path to your 3D model
    // For example: '/models/strawberry_cake.glb'
    const modelPath = '/models/strawberry_cake.glb';
    
    loader.load(
      modelPath,
      (gltf) => {
        const model = gltf.scene;
        
        // Center and scale the model appropriately
        model.scale.set(1.5, 1.5, 1.5);
        
        // Position adjustments if needed
        model.position.set(0, 0, 0);
        
        // Optional: traverse the model to apply materials/textures
        model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        
        // Add the model to the scene
        scene.add(model);
        
        // Add glow effect to the model
        createGlow(model);
        
        // Update loading state
        setModelLoading(false);
        
        // Optional: fit camera to the model
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        
        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = camera.fov * (Math.PI / 180);
        let cameraDistance = maxDim / (2 * Math.tan(fov / 2));
        
        // Add some padding
        cameraDistance *= 1.5;
        
        camera.position.set(center.x, center.y, center.z + cameraDistance);
        camera.lookAt(center);
        controls.target.copy(center);
        
        controls.update();
      },
      (xhr) => {
        // Loading progress
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },
      (error) => {
        // Error handling
        console.error('Error loading model:', error);
        setModelError('Failed to load 3D model');
        setModelLoading(false);
        
        // Fallback to the simple cake representation if model loading fails
        const cakeGroup = createFallbackCake();
        scene.add(cakeGroup);
      }
    );
    
    // Fallback cake creation function
    const createFallbackCake = () => {
      const cakeGroup = new THREE.Group();
      
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
      
      cakeGroup.add(cakeBase);
      cakeGroup.add(cakeTop);
      cakeGroup.add(cakeBerry);
      cakeGroup.add(cakeBerry2);
      
      return cakeGroup;
    };
    
    // Set camera position
    camera.position.z = 6;
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      if (controls) {
        controls.update();
      }
      
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
      if (canvasRef.current && renderer.domElement) {
        canvasRef.current.removeChild(renderer.domElement);
      }
      controls.dispose();
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
              className="w-full h-[400px] md:h-[500px] cake-shadow animate-float relative"
            >
              {modelLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="loader animate-spin w-10 h-10 border-4 border-bakery-200 rounded-full border-t-bakery-500"></div>
                </div>
              )}
              {modelError && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-bakery-500">{modelError}</p>
                </div>
              )}
            </div>
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
