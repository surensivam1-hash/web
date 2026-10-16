'use client';

import React, { useState, useEffect } from 'react';
import { Language } from '@/lib/types';
import { CLINIC_INFO, TRANSLATIONS } from '@/lib/data';
import { Menu, X, Phone, Calendar, HeartPulse, Clock, ShieldCheck, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onNavigateToBooking: () => void;
}

export function Header({ language, onLanguageChange, onNavigateToBooking }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const t = TRANSLATIONS[language];

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

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      const navHeight = 90;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - navHeight,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      {/* Top Utility Bar: Emergency & Working Hours */}
      <div className="bg-slate-900 text-slate-300 text-[11px] sm:text-xs py-1.5 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 truncate">
            <span className="inline-flex items-center gap-1.5 text-teal-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
              <span>{language === 'ta' ? 'வெளிநோயாளர் பிரிவு இயங்குகிறது' : 'Outpatient Clinic Open Today'}</span>
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

          <div className="flex items-center gap-4 shrink-0 text-slate-400">
            <div className="hidden sm:flex items-center gap-1.5 text-rose-300">
              <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
              <span>{language === 'ta' ? 'அவசர உதவிக்கு:' : 'National Ambulance:'}</span>
              <a href="tel:1990" className="font-bold text-white hover:text-rose-200 underline font-mono">
                1990
              </a>
            </div>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <a
              href={`tel:${CLINIC_INFO.phonePrimary.replace(/\s+/g, '')}`}
              className="hover:text-white transition-colors flex items-center gap-1 font-mono text-slate-300 font-medium"
            >
              <Phone className="w-3 h-3 text-teal-400" />
              <span>{CLINIC_INFO.phonePrimary}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navigation */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200/90 py-3'
            : 'bg-white/90 backdrop-blur-xs border-b border-slate-200/60 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 md:gap-8">
            
            {/* Brand Identity */}
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, 'home')}
              className="flex items-center gap-3.5 group shrink-0 focus-visible:outline-2 focus-visible:outline-teal-600 rounded-xl p-1"
              aria-label="Nalam Health Clinic Home"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-teal-700 via-teal-600 to-sky-600 p-[1px] shadow-sm group-hover:shadow transition-all duration-300">
                <div className="w-full h-full bg-gradient-to-br from-teal-700 to-sky-800 rounded-xl flex items-center justify-center text-white">
                  <HeartPulse className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-teal-800 transition-colors">
                  {language === 'ta' ? CLINIC_INFO.nameTa : CLINIC_INFO.nameEn}
                </span>
                <span className="text-[11px] font-semibold text-slate-500 tracking-wide">
                  {language === 'ta' ? 'யாழ்ப்பாணம் · Jaffna Healthcare' : 'Jaffna · Northern Sri Lanka'}
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7 text-[13.5px] font-semibold" aria-label="Main Navigation">
              {[
                { id: 'home', label: t.navHome },
                { id: 'about', label: t.navAbout },
                { id: 'services', label: t.navServices },
                { id: 'doctors', label: t.navDoctors },
                { id: 'appointment', label: t.navAppointment },
                { id: 'contact', label: t.navContact },
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
            <div className="flex items-center gap-3 shrink-0">
              {/* Language Switcher */}
              <div className="flex items-center bg-slate-100 rounded-lg p-1 border border-slate-200/90 shadow-2xs">
                <button
                  type="button"
                  onClick={() => onLanguageChange('en')}
                  className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                    language === 'en'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                  aria-label="Switch to English language"
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => onLanguageChange('ta')}
                  className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                    language === 'ta'
                      ? 'bg-white text-teal-800 shadow-xs'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                  aria-label="தமிழுக்கு மாற்றவும் (Switch to Tamil)"
                >
                  தமிழ்
                </button>
              </div>

              {/* Primary Action Button: Book Appointment */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={onNavigateToBooking}
                className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-teal-700 to-sky-700 hover:from-teal-800 hover:to-sky-800 rounded-xl shadow-xs hover:shadow-md transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-teal-600"
              >
                <Calendar className="w-4 h-4" />
                <span className="hidden sm:inline">{t.bookAppointmentBtn}</span>
                <span className="sm:hidden">{language === 'ta' ? 'முன்பதிவு' : 'Book'}</span>
              </motion.button>

              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden inline-flex items-center justify-center p-2 rounded-xl text-slate-700 hover:text-teal-800 hover:bg-slate-100 transition-colors focus-visible:outline-2 focus-visible:outline-teal-600"
                aria-expanded={mobileMenuOpen}
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
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="lg:hidden border-t border-slate-200 mt-3 pt-3 pb-2 space-y-1 overflow-hidden"
              >
                <a
                  href="#home"
                  onClick={(e) => handleNavClick(e, 'home')}
                  className="block px-3.5 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-teal-50 hover:text-teal-900 transition-colors"
                >
                  {t.navHome}
                </a>
                <a
                  href="#about"
                  onClick={(e) => handleNavClick(e, 'about')}
                  className="block px-3.5 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-teal-50 hover:text-teal-900 transition-colors"
                >
                  {t.navAbout}
                </a>
                <a
                  href="#services"
                  onClick={(e) => handleNavClick(e, 'services')}
                  className="block px-3.5 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-teal-50 hover:text-teal-900 transition-colors"
                >
                  {t.navServices}
                </a>
                <a
                  href="#doctors"
                  onClick={(e) => handleNavClick(e, 'doctors')}
                  className="block px-3.5 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-teal-50 hover:text-teal-900 transition-colors"
                >
                  {t.navDoctors}
                </a>
                <a
                  href="#appointment"
                  onClick={(e) => handleNavClick(e, 'appointment')}
                  className="block px-3.5 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-teal-50 hover:text-teal-900 transition-colors"
                >
                  {t.navAppointment}
                </a>
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, 'contact')}
                  className="block px-3.5 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-teal-50 hover:text-teal-900 transition-colors"
                >
                  {t.navContact}
                </a>

                <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                  <a
                    href={`tel:${CLINIC_INFO.phonePrimary.replace(/\s+/g, '')}`}
                    className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-teal-800"
                  >
                    <Phone className="w-3.5 h-3.5 text-teal-600" />
                    <span>{CLINIC_INFO.phonePrimary}</span>
                  </a>
                  <div className="px-3 text-[11px] text-slate-500">
                    142 Hospital Road, Jaffna, Sri Lanka
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>
    </>
  );
}
