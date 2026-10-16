'use client';

import React, { useState } from 'react';
import { DOCTORS_DATA } from '@/lib/data';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Services } from '@/components/Services';
import { Facilities } from '@/components/Facilities';
import { Doctors } from '@/components/Doctors';
import { AppointmentBooking } from '@/components/AppointmentBooking';
import { PatientFaq } from '@/components/PatientFaq';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { CustomizationModal } from '@/components/CustomizationModal';

export default function Home() {
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>(DOCTORS_DATA[0]?.id || '');
  const [prefillMessage, setPrefillMessage] = useState<string>('');
  const [customizationModalOpen, setCustomizationModalOpen] = useState<boolean>(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 85;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - navHeight,
        behavior: 'smooth',
      });
    }
  };

  const handleSelectDoctor = (doctorId: string) => {
    setSelectedDoctorId(doctorId);
    scrollToSection('appointment');
  };

  const handleBookService = (serviceName: string) => {
    setPrefillMessage(`Interested in: ${serviceName} consultation`);
    scrollToSection('appointment');
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-teal-100 selection:text-teal-900">
      {/* 1. Sticky Navigation Header */}
      <Header
        onNavigateToBooking={() => scrollToSection('appointment')}
      />

      <main className="flex-1">
        {/* 2. Hero Section */}
        <Hero
          onBookClick={() => scrollToSection('appointment')}
          onExploreServicesClick={() => scrollToSection('services')}
        />

        {/* 3. About the Clinic Section */}
        <About />

        {/* 4. Medical Services Section */}
        <Services
          onBookService={handleBookService}
        />

        {/* 5. Clinical Amenities & Facilities Section */}
        <Facilities />

        {/* 6. Doctors Section */}
        <Doctors
          onSelectDoctor={handleSelectDoctor}
        />

        {/* 7. Appointment Booking Section */}
        <AppointmentBooking
          selectedDoctorId={selectedDoctorId}
          onDoctorChange={setSelectedDoctorId}
          prefillMessage={prefillMessage}
        />

        {/* 8. Patient FAQ Section */}
        <PatientFaq />

        {/* 9. Contact Section */}
        <Contact />
      </main>

      {/* 10. Footer */}
      <Footer
        onOpenCustomizationGuide={() => setCustomizationModalOpen(true)}
        onNavigateToSection={scrollToSection}
      />

      {/* 11. Customization & Deployment Guide Modal */}
      <CustomizationModal
        isOpen={customizationModalOpen}
        onClose={() => setCustomizationModalOpen(false)}
      />
    </div>
  );
}
