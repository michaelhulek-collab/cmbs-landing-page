import React from 'react';
import { Check } from 'lucide-react';

export const Features: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-brand-900 text-white relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-500 rounded-full mix-blend-overlay filter blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Partner with CMBS Inc?</h2>
            <p className="text-brand-100 text-lg mb-8 leading-relaxed">
              We aren't just a billing service; we are your financial partners. With years of specialized experience, we understand the complexities of modern healthcare reimbursement.
            </p>
            
            <div className="space-y-4">
              {[
                "Certified Professionals (CMBS) working on your accounts.",
                "99% Initial Clean Claim Rate.",
                "No hidden fees or startup costs.",
                "Customized solutions for specialized practices.",
                "Dedicated account manager for personal support."
              ].map((item, idx) => (
                <div key={idx} className="flex items-start">
                  <div className="flex-shrink-0 bg-brand-800 rounded-full p-1 mt-1">
                    <Check className="h-4 w-4 text-accent-500" />
                  </div>
                  <span className="ml-4 text-gray-200">{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
             <div className="absolute inset-0 bg-accent-500 rounded-2xl transform rotate-3 opacity-20"></div>
             <img 
               src="https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=800" 
               alt="Medical Professional at Computer" 
               className="relative rounded-2xl shadow-2xl border border-brand-700 w-full h-auto object-cover grayscale"
             />
             
             <div className="absolute -bottom-6 -right-6 bg-white text-gray-900 p-6 rounded-xl shadow-xl max-w-xs hidden md:block">
               <p className="font-heading font-bold text-4xl text-brand-600 mb-2">15+</p>
               <p className="text-sm font-medium text-gray-600">Years of Excellence in Medical Billing & Coding</p>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};