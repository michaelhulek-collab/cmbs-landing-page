import React from 'react';
import { SectionHeading } from './SectionHeading.tsx';
import { Quote } from 'lucide-react';
import { TestimonialItem } from '../types.ts';

const testimonials: TestimonialItem[] = [
  {
    quote: "Since switching to CMBS Inc., our collections have increased by 25% and our denials have dropped significantly. Their team acts as a true extension of our office.",
    author: "Dr. Sarah Mitchell",
    role: "Medical Director",
    clinic: "Mitchell Family Medicine"
  },
  {
    quote: "The peace of mind I have knowing my billing is compliant and being handled by experts is invaluable. It lets me focus 100% on my patients.",
    author: "Dr. James Chen",
    role: "Cardiologist",
    clinic: "Heart Health Center"
  },
  {
    quote: "Professional, responsive, and incredibly knowledgeable. The detailed monthly reports help us understand exactly where our practice stands financially.",
    author: "Amanda Richardson",
    role: "Practice Manager",
    clinic: "Advanced Dermatology"
  }
];

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="Trusted by Providers" 
          subtitle="See what medical professionals are saying about our partnership."
        />

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <div 
              key={index}
              className="bg-gray-50 p-8 rounded-2xl relative"
            >
              <Quote className="absolute top-8 left-8 h-8 w-8 text-brand-200 fill-brand-200" />
              <div className="relative z-10 pt-6">
                <p className="text-gray-700 italic mb-6 leading-relaxed">
                  "{item.quote}"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-brand-600 rounded-full flex items-center justify-center text-white font-bold">
                    {item.author.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-bold text-gray-900">{item.author}</p>
                    <p className="text-xs text-gray-500">{item.role}, {item.clinic}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};