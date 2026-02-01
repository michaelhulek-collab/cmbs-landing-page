import React, { useState } from 'react';
import { SectionHeading } from './SectionHeading.tsx';
import { Button } from './Button.tsx';
import { Send, Phone, Mail, MapPin } from 'lucide-react';

// TODO: REPLACE THIS URL WITH YOUR DEPLOYED GOOGLE APPS SCRIPT WEB APP URL
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxZVAbJwdRsV0ZfSy9sreehasyRqdi2NxuPEJSdap2z1YKlWh4F-e97Svi9ltIca1462A/exec";

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    practice: '',
    email: '',
    phone: '',
    needs: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 10);
    let formatted = raw;
    if (raw.length > 6) {
      formatted = `(${raw.slice(0, 3)}) ${raw.slice(3, 6)}-${raw.slice(6)}`;
    } else if (raw.length > 3) {
      formatted = `(${raw.slice(0, 3)}) ${raw.slice(3)}`;
    }
    setFormData(prev => ({ ...prev, phone: formatted }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Using URLSearchParams is often more reliable for Google Apps Script execution
    const params = new URLSearchParams();
    params.append('formType', 'Contact Inquiry');
    params.append('submittedAt', new Date().toLocaleString());
    params.append('name', formData.name);
    params.append('practice', formData.practice);
    params.append('email', formData.email);
    params.append('phone', formData.phone);
    params.append('needs', formData.needs);

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: params,
        mode: 'no-cors'
      });
      
      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('idle');
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <section id="contact" className="py-24 bg-brand-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="Get Your Free Practice Analysis" 
          subtitle="Ready to optimize your revenue cycle? Fill out the form below to schedule a consultation with our experts."
        />

        <div className="grid lg:grid-cols-5 gap-0 bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          
          {/* Contact Info Sidebar */}
          <div className="lg:col-span-2 bg-brand-900 text-white p-8 md:p-12 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-6">Contact Us</h3>
              <p className="text-brand-100 mb-8">
                Have questions about our services? Our team is ready to help your practice thrive.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-brand-800 rounded-lg p-3">
                    <Phone className="h-6 w-6 text-accent-500" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-semibold text-brand-300 uppercase tracking-wider">Phone</p>
                    <p className="text-lg font-medium text-white">(814) 466-5090</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-brand-800 rounded-lg p-3">
                    <Mail className="h-6 w-6 text-accent-500" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-semibold text-brand-300 uppercase tracking-wider">Email</p>
                    <p className="text-lg font-medium text-white">mhulek@cmbsinc.net</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-brand-800 rounded-lg p-3">
                    <MapPin className="h-6 w-6 text-accent-500" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-semibold text-brand-300 uppercase tracking-wider">Office</p>
                    <p className="text-lg font-medium text-white">3945 S Atherton St<br/>Suite A<br/>State College, PA 16801</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-brand-800">
              <p className="text-sm text-brand-400">
                &copy; {new Date().getFullYear()} CMBS Inc. All rights reserved.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3 p-8 md:p-12">
            {status === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-10">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <Send className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">Request Received!</h3>
                <p className="text-gray-600 max-w-md text-lg">
                  Thank you for reaching out. A specialist from our team will review your information and contact you within 24 hours.
                </p>
                <Button 
                  className="mt-8 px-10" 
                  onClick={() => setStatus('idle')}
                  variant="outline"
                >
                  Send Another Request
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:bg-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                      placeholder="Dr. John Smith"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="practice" className="block text-sm font-semibold text-gray-700 mb-2">Practice Name</label>
                    <input
                      type="text"
                      id="practice"
                      name="practice"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:bg-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                      placeholder="Smith Family Practice"
                      value={formData.practice}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:bg-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:bg-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                      placeholder="(555) 123-4567"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="needs" className="block text-sm font-semibold text-gray-700 mb-2">How can we help?</label>
                  <select
                    id="needs"
                    name="needs"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:bg-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                    value={formData.needs}
                    onChange={handleChange}
                  >
                    <option value="">Select a Service of Interest</option>
                    <option value="billing">Medical Billing</option>
                    <option value="analysis">Practice Analysis/Consulting</option>
                    <option value="credentialing">Credentialing</option>
                    <option value="other">Other Inquiry</option>
                  </select>
                </div>

                <div className="pt-4">
                  <Button 
                    type="submit" 
                    fullWidth 
                    disabled={status === 'submitting'}
                    className="py-4 text-lg"
                  >
                    {status === 'submitting' ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      "Schedule My Free Consultation"
                    )}
                  </Button>
                  <p className="text-xs text-center text-gray-500 mt-6 px-4">
                    Your information is secure. We respect your privacy and adhere to HIPAA guidelines. By submitting this form, you agree to be contacted by our specialists.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};