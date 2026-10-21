'use client';

import React, { useState, useEffect } from 'react';
import { CLINIC_INFO } from '@/lib/data';
import { Menu, X, Phone, Calendar, HeartPulse, Clock, ShieldCheck, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  onNavigateToBooking: () => void;
}

export function Header({ onNavigateToBooking }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const sections = ['home', 'about', 'services', 'doctors', 'appointment', 'contact'];
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const scrollPosition = window.scrollY + 120;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on Escape key press
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const navHeight = 90;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - navHeight,
        behavior: 'smooth',
      });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Utility Bar: Emergency & Working Hours */}
      <div className="bg-slate-900 text-slate-300 text-[11px] sm:text-xs py-1.5 px-3 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-4 truncate">
            <span className="inline-flex items-center gap-1.5 text-teal-400 font-medium text-[11px] sm:text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse shrink-0" />
              <span className="truncate">Outpatient Clinic Open Today</span>
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-slate-400">
              <Clock className="w-3 h-3 text-slate-400" />
              <span>Mon–Sat: 7:30 AM – 8:00 PM</span>
            </span>
            <span className="hidden lg:inline-flex items-center gap-1 text-slate-400">
              <MapPin className="w-3 h-3 text-slate-400" />
              <span>Hospital Road, Jaffna</span>
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 shrink-0 text-slate-400 text-[11px] sm:text-xs">
            <div className="hidden sm:flex items-center gap-1.5 text-rose-300">
              <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
              <span>National Ambulance:</span>
              <a href="tel:1990" className="font-bold text-white hover:text-rose-200 underline font-mono">
                1990
              </a>
            </div>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <a
              href={`tel:${CLINIC_INFO.phonePrimary.replace(/\s+/g, '')}`}
              className="hover:text-white transition-colors flex items-center gap-1 font-mono text-slate-300 font-medium"
            >
              <Phone className="w-3 h-3 text-teal-400 shrink-0" />
              <span>{CLINIC_INFO.phonePrimary}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navigation */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200/90 py-2.5 sm:py-3'
            : 'bg-white/90 backdrop-blur-xs border-b border-slate-200/60 py-3 sm:py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2 sm:gap-4 md:gap-8">
            
            {/* Brand Identity */}
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, 'home')}
              className="flex items-center gap-2 sm:gap-3.5 group min-w-0 flex-1 sm:flex-initial focus-visible:outline-2 focus-visible:outline-teal-600 rounded-xl p-0.5 sm:p-1"
              aria-label="Nalam Health Clinic Home"
            >
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-teal-700 via-teal-600 to-sky-600 p-[1px] shadow-sm group-hover:shadow transition-all duration-300 shrink-0">
                <div className="w-full h-full bg-gradient-to-br from-teal-700 to-sky-800 rounded-xl flex items-center justify-center text-white">
                  <HeartPulse className="w-4 h-4 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform duration-200" />
                </div>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm sm:text-lg lg:text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-teal-800 transition-colors truncate">
                  {CLINIC_INFO.name}
                </span>
                <span className="text-[9px] sm:text-[11px] font-semibold text-slate-500 tracking-wide truncate">
                  Jaffna · Northern Sri Lanka
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7 text-[13.5px] font-semibold" aria-label="Main Navigation">
              {[
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'About' },
                { id: 'services', label: 'Services' },
                { id: 'doctors', label: 'Doctors' },
                { id: 'appointment', label: 'Appointment' },
                { id: 'contact', label: 'Contact' },
              ].map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className={`relative py-1 transition-all ${
                      isActive
                        ? 'text-teal-800 font-bold after:w-full'
                        : 'text-slate-600 hover:text-teal-800 after:w-0 hover:after:w-full'
                    } after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-teal-700 after:transition-all after:duration-200`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>

            {/* Right Action Zone */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Primary Action Button: Book Appointment */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={onNavigateToBooking}
                className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-teal-700 to-sky-700 hover:from-teal-800 hover:to-sky-800 rounded-xl shadow-xs hover:shadow-md transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-teal-600 min-h-[40px]"
              >
                <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Book Appointment</span>
                <span className="sm:hidden">Book</span>
              </motion.button>

              {/* Mobile Menu Button with guaranteed >=44px touch target */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden inline-flex items-center justify-center w-11 h-11 p-2 rounded-xl text-slate-700 hover:text-teal-800 hover:bg-slate-100 transition-colors focus-visible:outline-2 focus-visible:outline-teal-600 cursor-pointer"
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-nav-menu"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Dropdown Navigation */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                id="mobile-nav-menu"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="lg:hidden border-t border-slate-200 mt-2 pt-2.5 pb-2 space-y-1 overflow-hidden"
              >
                {[
                  { id: 'home', label: 'Home' },
                  { id: 'about', label: 'About' },
                  { id: 'services', label: 'Services' },
                  { id: 'doctors', label: 'Doctors' },
                  { id: 'appointment', label: 'Appointment' },
                  { id: 'contact', label: 'Contact' },
                ].map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className="block px-3.5 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:bg-teal-50 hover:text-teal-900 transition-colors min-h-[44px] flex items-center"
                  >
                    {item.label}
                  </a>
                ))}

                <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                  <a
                    href={`tel:${CLINIC_INFO.phonePrimary.replace(/\s+/g, '')}`}
                    className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-teal-800"
                  >
                    <Phone className="w-3.5 h-3.5 text-teal-600" />
                    <span>{CLINIC_INFO.phonePrimary}</span>
                  </a>
                  <div className="px-3.5 text-[11px] text-slate-500">
                    142 Hospital Road, Jaffna, Sri Lanka
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Backdrop overlay for mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] z-40 lg:hidden"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </>
  );
}
