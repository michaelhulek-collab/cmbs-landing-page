import React from 'react';
import { SectionHeading } from './SectionHeading.tsx';
import { FileText, DollarSign, Activity, Users, ShieldCheck, BarChart3 } from 'lucide-react';
import { ServiceItem } from '../types.ts';

const services: ServiceItem[] = [
  {
    title: "Claims Management",
    description: "Expert handling of electronic and paper claims submission with a focus on error reduction and rapid reimbursement.",
    icon: FileText
  },
  {
    title: "Revenue Cycle Management",
    description: "End-to-end RCM solutions that optimize your financial workflow from patient intake to final payment.",
    icon: DollarSign
  },
  {
    title: "Practice Consulting",
    description: "Strategic operational analysis to identify bottlenecks and implement efficient, profitable workflows.",
    icon: Activity
  },
  {
    title: "Credentialing Services",
    description: "We handle the tedious paperwork to keep your providers in-network and compliant with payers.",
    icon: ShieldCheck
  },
  {
    title: "Patient Billing & Support",
    description: "Professional patient statement generation and a compassionate support team to handle billing inquiries.",
    icon: Users
  },
  {
    title: "Reporting & Analytics",
    description: "Detailed monthly reports providing transparency into your practice's financial health and performance.",
    icon: BarChart3
  }
];

export const Services: React.FC = () => {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="Comprehensive Billing Solutions" 
          subtitle="We take care of the details so you can take care of your patients."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-brand-100 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-brand-50 rounded-lg flex items-center justify-center text-brand-600 mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
                <service.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};