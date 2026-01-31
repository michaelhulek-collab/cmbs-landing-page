import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './Button.tsx';
import { useFunnel } from '../context/FunnelContext.tsx';

const SwirlLogoFallback = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 100 100" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g transform="translate(50,50)">
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <path
          key={angle}
          d="M 0,-48 
             C 18,-48 38,-35 48,-5 
             C 42,-22 22,-38 0,-38 
             C -22,-38 -42,-22 -48,-5
             C -38,-35 -18,-48 0,-48 Z"
          transform={`rotate(${angle})`}
        />
      ))}
    </g>
  </svg>
);

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [useFallback, setUseFallback] = useState(false);
  const { openFunnel } = useFunnel();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center cursor-pointer group" onClick={() => scrollToSection('hero')}>
            <div className="relative h-12 w-12 md:h-14 md:w-14 rounded-lg bg-[#002147] overflow-hidden flex items-center justify-center shadow-lg transition-all duration-300 group-hover:shadow-brand-900/20 group-hover:scale-105">
              {!useFallback ? (
                <img 
                  src="/logo.png" 
                  alt="CMBS Logo" 
                  className="h-full w-full object-contain p-0.5"
                  onError={() => setUseFallback(true)}
                />
              ) : (
                <SwirlLogoFallback className="h-10 w-10 text-white" />
              )}
            </div>
            <div className="ml-3 flex flex-col justify-center">
              <span className="text-xl md:text-2xl font-bold tracking-tight leading-none text-brand-900">
                CMBS <span className="text-brand-600">Inc.</span>
              </span>
              <span className="text-[9px] md:text-[10px] uppercase tracking-[0.15em] font-bold text-gray-500 mt-1">
                Complete Medical Billing Solutions
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-10">
            {['Services', 'About', 'Testimonials'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`text-sm font-bold tracking-wide uppercase hover:text-brand-600 transition-colors ${
                  isScrolled ? 'text-gray-700' : 'text-gray-800'
                }`}
              >
                {item}
              </button>
            ))}
            <Button 
              variant="primary" 
              className={!isScrolled ? 'bg-[#002147] hover:bg-brand-800 border-none text-white' : ''}
              onClick={openFunnel}
            >
              Get Free Analysis
            </Button>
          </nav>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-brand-600 p-2 transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-2xl border-t border-gray-100">
          <div className="px-4 pt-2 pb-8 space-y-1">
            {['Services', 'About', 'Testimonials'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="block w-full text-left px-4 py-5 text-base font-bold text-gray-700 hover:text-brand-600 hover:bg-gray-50 rounded-lg transition-all"
              >
                {item}
              </button>
            ))}
            <div className="pt-6 px-4">
              <Button fullWidth onClick={() => { setIsMobileMenuOpen(false); openFunnel(); }} className="py-4 shadow-xl">
                Get Free Analysis
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};