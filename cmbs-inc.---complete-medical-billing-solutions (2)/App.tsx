import React from 'react';
import { Header } from './components/Header.tsx';
import { Hero } from './components/Hero.tsx';
import { Services } from './components/Services.tsx';
import { Features } from './components/Features.tsx';
import { Testimonials } from './components/Testimonials.tsx';
import { ContactForm } from './components/ContactForm.tsx';
import { Footer } from './components/Footer.tsx';
import { AnalysisFunnel } from './components/AnalysisFunnel.tsx';
import { FunnelProvider, useFunnel } from './context/FunnelContext.tsx';

const AppContent: React.FC = () => {
  const { isFunnelOpen, closeFunnel } = useFunnel();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Services />
        <Features />
        <Testimonials />
        <ContactForm />
      </main>
      <Footer />
      <AnalysisFunnel isOpen={isFunnelOpen} onClose={closeFunnel} />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <FunnelProvider>
      <AppContent />
    </FunnelProvider>
  );
};

export default App;