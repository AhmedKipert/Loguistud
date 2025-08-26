import React, { useEffect } from 'react';
import { gsap } from 'gsap';

const SkeletonLoading = () => {
  useEffect(() => {
    // Animation GSAP pour fluidifier les apparitions
    gsap.from(".skeleton-item", {
      duration: 0.8,
      opacity: 0,
      y: 20,
      stagger: 0.1,
      ease: "power2.out"
    });
    
    // Animation continue du logo
    gsap.to(".pulse", {
      duration: 1.5,
      scale: 1.05,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut"
    });
  }, []);

  return (
    <div className="bg-gray-50">
      {/* Styles */}
      <style>
        {`
          .skeleton-item {
            position: relative;
            overflow: hidden;
            background-color: #e5e7eb;
          }
          
          .skeleton-item::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(90deg, 
                      rgba(255,255,255,0) 0%, 
                      rgba(255,255,255,0.3) 50%, 
                      rgba(255,255,255,0) 100%);
            animation: shimmer 1.5s infinite;
          }
          
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          
          .pulse {
            animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
          
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}
      </style>

      {/* Barre de navigation */}
      <nav className="bg-white shadow-sm py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-[#2C5CD5] flex items-center justify-center text-white font-bold pulse"></div>
            <div className="h-8 w-32 skeleton-item rounded"></div>
          </div>
          <div className="hidden md:flex space-x-6">
            <div className="h-8 w-20 skeleton-item rounded"></div>
            <div className="h-8 w-24 skeleton-item rounded"></div>
            <div className="h-8 w-28 skeleton-item rounded"></div>
            <div className="h-8 w-20 skeleton-item rounded"></div>
          </div>
          <div className="flex space-x-4">
            <div className="h-10 w-24 skeleton-item rounded-lg"></div>
            <div className="h-10 w-24 skeleton-item rounded-lg"></div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0 space-y-6">
            <div className="h-12 w-full skeleton-item rounded-lg"></div>
            <div className="h-12 w-3/4 skeleton-item rounded-lg"></div>
            <div className="h-6 w-full skeleton-item rounded"></div>
            <div className="h-6 w-5/6 skeleton-item rounded"></div>
            <div className="flex space-x-4 pt-4">
              <div className="h-12 w-40 skeleton-item rounded-lg"></div>
              <div className="h-12 w-32 skeleton-item rounded-lg"></div>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="h-80 w-full skeleton-item rounded-lg"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 px-6 bg-white">
        <div className="container mx-auto">
          <div className="h-10 w-1/3 skeleton-item rounded mx-auto mb-16"></div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="h-12 w-12 skeleton-item rounded-full mx-auto"></div>
              <div className="h-6 w-3/4 skeleton-item rounded mx-auto"></div>
              <div className="h-4 w-full skeleton-item rounded"></div>
              <div className="h-4 w-5/6 skeleton-item rounded"></div>
              <div className="h-4 w-2/3 skeleton-item rounded"></div>
            </div>
            
            <div className="space-y-4">
              <div className="h-12 w-12 skeleton-item rounded-full mx-auto"></div>
              <div className="h-6 w-3/4 skeleton-item rounded mx-auto"></div>
              <div className="h-4 w-full skeleton-item rounded"></div>
              <div className="h-4 w-5/6 skeleton-item rounded"></div>
              <div className="h-4 w-2/3 skeleton-item rounded"></div>
            </div>
            
            <div className="space-y-4">
              <div className="h-12 w-12 skeleton-item rounded-full mx-auto"></div>
              <div className="h-6 w-3/4 skeleton-item rounded mx-auto"></div>
              <div className="h-4 w-full skeleton-item rounded"></div>
              <div className="h-4 w-5/6 skeleton-item rounded"></div>
              <div className="h-4 w-2/3 skeleton-item rounded"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gray-100">
        <div className="container mx-auto text-center space-y-6">
          <div className="h-10 w-1/2 skeleton-item rounded mx-auto"></div>
          <div className="h-6 w-3/4 skeleton-item rounded mx-auto"></div>
          <div className="h-12 w-48 skeleton-item rounded-lg mx-auto"></div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-12 px-6">
        <div className="container mx-auto grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="h-8 w-32 skeleton-item rounded"></div>
            <div className="h-4 w-40 skeleton-item rounded"></div>
          </div>
          <div className="space-y-4">
            <div className="h-6 w-24 skeleton-item rounded"></div>
            <div className="h-4 w-32 skeleton-item rounded"></div>
            <div className="h-4 w-28 skeleton-item rounded"></div>
            <div className="h-4 w-36 skeleton-item rounded"></div>
          </div>
          <div className="space-y-4">
            <div className="h-6 w-24 skeleton-item rounded"></div>
            <div className="h-4 w-32 skeleton-item rounded"></div>
            <div className="h-4 w-28 skeleton-item rounded"></div>
            <div className="h-4 w-36 skeleton-item rounded"></div>
          </div>
          <div className="space-y-4">
            <div className="h-6 w-24 skeleton-item rounded"></div>
            <div className="h-4 w-32 skeleton-item rounded"></div>
            <div className="h-4 w-28 skeleton-item rounded"></div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SkeletonLoading;