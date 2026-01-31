import React from 'react';
import { Button } from './Button.tsx';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useFunnel } from '../context/FunnelContext.tsx';

export const Hero: React.FC = () => {
  const { openFunnel } = useFunnel();

  return (
    <section id="hero" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-brand-50 via-white to-blue-50/50" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-brand-100 text-brand-800 text-sm font-semibold mb-6 border border-brand-200 shadow-sm">
              <span className="relative flex h-3 w-3 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-600"></span>
              </span>
              Accepting New Practices
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Focus on Patients, <br />
              <span className="text-brand-600">We'll Handle the Payments.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-lg">
              Maximize revenue and minimize administrative stress with CMBS Inc. We provide comprehensive medical billing solutions tailored to your practice.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Button onClick={openFunnel} className="group px-8">
                See if you qualify for a free analysis
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>
                Explore Services
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm text-gray-500 font-medium">
              <div className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-accent-500 mr-2" />
                <span>HIPAA Compliant</span>
              </div>
              <div className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-accent-500 mr-2" />
                <span>Certified Specialists</span>
              </div>
              <div className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-accent-500 mr-2" />
                <span>Increased Collections</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-brand-900/10">
              <img 
                src="https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&q=80&w=1000" 
                alt="Medical Professional Working at Desk" 
                className="w-full h-auto object-cover grayscale"
              />
              <div className="absolute inset-0 bg-brand-900/10 mix-blend-multiply"></div>
              
              <div className="absolute bottom-6 left-6 bg-white p-4 rounded-lg shadow-xl max-w-xs">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-full text-green-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold">Average Revenue Increase</p>
                    <p className="text-lg font-bold text-gray-900">20% - 30%</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -z-10 top-10 -right-10 w-72 h-72 bg-brand-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
            <div className="absolute -z-10 -bottom-10 -left-10 w-72 h-72 bg-brand-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};