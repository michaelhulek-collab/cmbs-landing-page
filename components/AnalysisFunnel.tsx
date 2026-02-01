import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft, CheckCircle2, User, Building2, Calendar, ClipboardList, TrendingUp, Mail, Briefcase, MapPin, AlertCircle } from 'lucide-react';
import { Button } from './Button.tsx';

// TODO: REPLACE THIS URL WITH YOUR DEPLOYED GOOGLE APPS SCRIPT WEB APP URL
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxZVAbJwdRsV0ZfSy9sreehasyRqdi2NxuPEJSdap2z1YKlWh4F-e97Svi9ltIca1462A/exec";

interface FunnelProps {
  isOpen: boolean;
  onClose: () => void;
}

type FunnelData = {
  practiceSize: string;
  practiceAge: string;
  billingMethod: string;
  specialty: string;
  claimVolume: string;
  practiceName: string;
  city: string;
  state: string;
  name: string;
  email: string;
  phone: string;
  role: string;
};

const INITIAL_DATA: FunnelData = {
  practiceSize: '',
  practiceAge: '',
  billingMethod: '',
  specialty: '',
  claimVolume: '',
  practiceName: '',
  city: '',
  state: '',
  name: '',
  email: '',
  phone: '',
  role: '',
};

export const AnalysisFunnel: React.FC<FunnelProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FunnelData>(INITIAL_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FunnelData, boolean>>>({});
  const [shake, setShake] = useState(false);

  const totalSteps = 7;
  const progress = (step / totalSteps) * 100;

  const handleNext = () => {
    setErrors({});
    setStep((s) => Math.min(s + 1, totalSteps));
  };
  
  const handleBack = () => {
    setErrors({});
    setStep((s) => Math.max(s - 1, 1));
  };

  const updateData = (fields: Partial<FunnelData>) => {
    setData((prev) => ({ ...prev, ...fields }));
  };

  const onFieldChange = (field: keyof FunnelData, value: string) => {
    updateData({ [field]: value });
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: false }));
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 10);
    let formatted = raw;
    if (raw.length > 6) {
      formatted = `(${raw.slice(0, 3)}) ${raw.slice(3, 6)}-${raw.slice(6)}`;
    } else if (raw.length > 3) {
      formatted = `(${raw.slice(0, 3)}) ${raw.slice(3)}`;
    }
    onFieldChange('phone', formatted);
  };

  const validateStep = (currentStep: number) => {
    const newErrors: Partial<Record<keyof FunnelData, boolean>> = {};
    let isValid = true;

    if (currentStep === 4) {
      if (!data.specialty) { newErrors.specialty = true; isValid = false; }
    }
    if (currentStep === 6) {
      if (!data.practiceName) { newErrors.practiceName = true; isValid = false; }
      if (!data.city) { newErrors.city = true; isValid = false; }
      if (!data.state) { newErrors.state = true; isValid = false; }
    }
    if (currentStep === 7) {
      if (!data.name) { newErrors.name = true; isValid = false; }
      if (!data.role) { newErrors.role = true; isValid = false; }
      if (!data.email) { newErrors.email = true; isValid = false; }
      if (!data.phone) { newErrors.phone = true; isValid = false; }
    }

    setErrors(newErrors);
    
    if (!isValid) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return false;
    }
    return true;
  };

  const handleContinue = () => {
    if (validateStep(step)) {
      handleNext();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(7)) return;

    setIsSubmitting(true);
    
    // Prepare data for Google Sheets using URLSearchParams for better reliability
    const params = new URLSearchParams();
    params.append('formType', 'Free Analysis Request');
    params.append('submittedAt', new Date().toLocaleString());
    
    Object.entries(data).forEach(([key, value]) => {
      params.append(key, value);
    });

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: params,
        mode: 'no-cors'
      });

      setIsSubmitting(false);
      setIsSuccess(true);
    } catch (error) {
      console.error("Submission Error:", error);
      setIsSubmitting(false);
      alert("There was a problem submitting your request. Please try again.");
    }
  };

  const getInputClass = (field: keyof FunnelData) => 
    `w-full p-4 rounded-xl border-2 outline-none transition-all text-gray-900 ${
      errors[field] 
        ? 'border-red-500 bg-red-50 focus:border-red-500 placeholder-red-400' 
        : 'border-gray-100 bg-gray-50 focus:border-brand-500'
    }`;

  const renderError = () => (
    <AnimatePresence>
      {Object.values(errors).some(Boolean) && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mt-4 w-full flex items-center justify-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-100 shadow-sm"
        >
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span className="font-medium">Please fill in all required fields</span>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <StepContainer icon={Building2} title="How many providers are in your practice?" subtitle="This helps us understand the scale of your operations.">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
              {['1 Provider', '2-5 Providers', '6-10 Providers', '11+ Providers'].map((opt) => (
                <OptionButton
                  key={opt}
                  selected={data.practiceSize === opt}
                  onClick={() => { updateData({ practiceSize: opt }); handleNext(); }}
                >
                  {opt}
                </OptionButton>
              ))}
            </div>
          </StepContainer>
        );
      case 2:
        return (
          <StepContainer icon={Calendar} title="How long has your practice been established?" subtitle="Newer practices often have different needs than veteran ones.">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
              {['New / Starting Soon', 'Less than 1 Year', '1-5 Years', '5+ Years'].map((opt) => (
                <OptionButton
                  key={opt}
                  selected={data.practiceAge === opt}
                  onClick={() => { updateData({ practiceAge: opt }); handleNext(); }}
                >
                  {opt}
                </OptionButton>
              ))}
            </div>
          </StepContainer>
        );
      case 3:
        return (
          <StepContainer icon={ClipboardList} title="How do you currently handle billing?" subtitle="Knowing your current process helps us identify optimization areas.">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
              {['In-House Team', 'Third-Party Service', 'Direct Physician Entry', 'None / Manual'].map((opt) => (
                <OptionButton
                  key={opt}
                  selected={data.billingMethod === opt}
                  onClick={() => { updateData({ billingMethod: opt }); handleNext(); }}
                >
                  {opt}
                </OptionButton>
              ))}
            </div>
          </StepContainer>
        );
      case 4:
        return (
          <StepContainer icon={User} title="What is your primary medical specialty?" subtitle="We specialize in various fields with tailored coding rules.">
            <select
              className={getInputClass('specialty')}
              value={data.specialty}
              onChange={(e) => onFieldChange('specialty', e.target.value)}
            >
              <option value="">Select Specialty...</option>
              <option value="Anesthesia">Anesthesia</option>
              <option value="Family Medicine">Family Medicine</option>
              <option value="Internal Medicine">Internal Medicine</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="OB/GYN">OB/GYN</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Mental Health">Mental Health / Therapy</option>
              <option value="Dermatology">Dermatology</option>
              <option value="Physical Therapy">Physical Therapy</option>
              <option value="Other">Other Specialty</option>
            </select>
            <div className="mt-16">
              <motion.div animate={shake ? { x: [0, -10, 10, -10, 10, 0] } : {}} transition={{ duration: 0.4 }}>
                <Button className="w-full py-4" onClick={handleContinue}>
                  Continue <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
              {renderError()}
            </div>
          </StepContainer>
        );
      case 5:
        return (
          <StepContainer icon={TrendingUp} title="What is your estimated monthly claim volume?" subtitle="Higher volumes benefit significantly from our expert oversight and tailored management.">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
              {['0-100 Claims', '101-500 Claims', '501-1000 Claims', '1000+ Claims'].map((opt) => (
                <OptionButton
                  key={opt}
                  selected={data.claimVolume === opt}
                  onClick={() => { updateData({ claimVolume: opt }); handleNext(); }}
                >
                  {opt}
                </OptionButton>
              ))}
            </div>
          </StepContainer>
        );
      case 6:
        return (
          <StepContainer icon={MapPin} title="Where is your practice located?" subtitle="This helps us identify regional payer trends and regulations specific to your area.">
            <div className="mt-6 space-y-4">
              <input
                type="text"
                placeholder="Practice Name"
                className={getInputClass('practiceName')}
                value={data.practiceName}
                onChange={(e) => onFieldChange('practiceName', e.target.value)}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="City / Town"
                  className={getInputClass('city')}
                  value={data.city}
                  onChange={(e) => onFieldChange('city', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="State"
                  className={getInputClass('state')}
                  value={data.state}
                  onChange={(e) => onFieldChange('state', e.target.value)}
                />
              </div>
              <div className="mt-16">
                <motion.div animate={shake ? { x: [0, -10, 10, -10, 10, 0] } : {}} transition={{ duration: 0.4 }}>
                  <Button className="w-full py-4" onClick={handleContinue}>
                    Continue <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
                {renderError()}
              </div>
            </div>
          </StepContainer>
        );
      case 7:
        return (
          <StepContainer icon={Mail} title="Where should we send your free analysis?" subtitle="Our specialists will review your data and provide a detailed report.">
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className={getInputClass('name')}
                  value={data.name}
                  onChange={(e) => onFieldChange('name', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Role within your practice"
                  className={getInputClass('role')}
                  value={data.role}
                  onChange={(e) => onFieldChange('role', e.target.value)}
                />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                className={getInputClass('email')}
                value={data.email}
                onChange={(e) => onFieldChange('email', e.target.value)}
              />
              <input
                type="tel"
                placeholder="(555) 123-4567"
                className={getInputClass('phone')}
                value={data.phone}
                onChange={handlePhoneChange}
              />
              <div className="mt-16">
                <motion.div animate={shake ? { x: [0, -10, 10, -10, 10, 0] } : {}} transition={{ duration: 0.4 }}>
                  <Button type="submit" fullWidth className="py-4 text-lg shadow-xl" disabled={isSubmitting}>
                    {isSubmitting ? 'Processing Analysis...' : 'Generate My Analysis'}
                  </Button>
                </motion.div>
                {renderError()}
              </div>
            </form>
          </StepContainer>
        );
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-900/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Progress Bar */}
            {!isSuccess && (
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gray-100">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-brand-600"
                />
              </div>
            )}

            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 transition-colors z-10"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="p-8 sm:p-12">
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-10"
                  >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                      <CheckCircle2 className="h-12 w-12" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Request Successful!</h2>
                    <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
                      Thank you, <strong>{data.name.split(' ')[0]}</strong>. Our specialist will contact you within 24 hours to review your practice's free revenue analysis.
                    </p>
                    <Button onClick={onClose} variant="outline" className="px-10">
                      Return to Site
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="mb-2 flex items-center text-xs font-bold tracking-widest text-brand-500 uppercase">
                      Step {step} of {totalSteps}
                    </div>
                    {renderStep()}
                    
                    {step > 1 && !isSuccess && (
                      <button
                        onClick={handleBack}
                        className="mt-8 flex items-center text-sm font-semibold text-gray-400 hover:text-brand-600 transition-colors relative z-20"
                      >
                        <ChevronLeft className="h-4 w-4 mr-1" /> Back
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const StepContainer: React.FC<{ icon: any, title: string, subtitle: string, children: React.ReactNode }> = ({ icon: Icon, title, subtitle, children }) => (
  <div>
    <div className="inline-flex p-3 bg-brand-50 rounded-2xl text-brand-600 mb-6">
      <Icon className="h-8 w-8" />
    </div>
    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">{title}</h2>
    <p className="text-gray-500 text-lg leading-relaxed">{subtitle}</p>
    {children}
  </div>
);

const OptionButton: React.FC<{ children: React.ReactNode, selected: boolean, onClick: () => void }> = ({ children, selected, onClick }) => (
  <button
    onClick={onClick}
    className={`p-5 rounded-2xl border-2 text-left transition-all duration-200 group flex items-center justify-between ${
      selected 
        ? 'border-brand-600 bg-brand-50 text-brand-900 shadow-md' 
        : 'border-gray-100 bg-white hover:border-brand-200 hover:bg-gray-50 text-gray-700'
    }`}
  >
    <span className="font-semibold text-lg">{children}</span>
    <ChevronRight className={`h-5 w-5 transition-transform ${selected ? 'text-brand-600 translate-x-1' : 'text-gray-300 group-hover:translate-x-1'}`} />
  </button>
);