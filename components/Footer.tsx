'use client';

import React from 'react';
import { Language } from '@/lib/types';
import { CLINIC_INFO, TRANSLATIONS } from '@/lib/data';
import { HeartPulse, Phone, MapPin, Clock, MessageCircle, Sliders, ShieldCheck } from 'lucide-react';

interface FooterProps {
  language: Language;
  onOpenCustomizationGuide: () => void;
  onNavigateToSection: (sectionId: string) => void;
}

export function Footer({ language, onOpenCustomizationGuide, onNavigateToSection }: FooterProps) {
  const t = TRANSLATIONS[language];
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand & Mission */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-sky-600 flex items-center justify-center text-white">
                <HeartPulse className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-white block">
                  {language === 'ta' ? CLINIC_INFO.nameTa : CLINIC_INFO.nameEn}
                </span>
                <span className="text-xs text-slate-400">
                  {language === 'ta' ? 'யாழ்ப்பாணம், இலங்கை' : 'Jaffna, Northern Province, Sri Lanka'}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              {t.footerTagline}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={onOpenCustomizationGuide}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-teal-300 bg-teal-950/80 border border-teal-800 hover:bg-teal-900 rounded-lg transition-colors cursor-pointer"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>{t.customizationGuideBtn}</span>
              </button>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              {language === 'ta' ? 'இணைப்புகள்' : 'Quick Navigation'}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateToSection('home')}
                  className="hover:text-teal-400 transition-colors cursor-pointer"
                >
                  {t.navHome}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateToSection('about')}
                  className="hover:text-teal-400 transition-colors cursor-pointer"
                >
                  {t.navAbout}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateToSection('services')}
                  className="hover:text-teal-400 transition-colors cursor-pointer"
                >
                  {t.navServices}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateToSection('doctors')}
                  className="hover:text-teal-400 transition-colors cursor-pointer"
                >
                  {t.navDoctors}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateToSection('appointment')}
                  className="hover:text-teal-400 transition-colors cursor-pointer"
                >
                  {t.navAppointment}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateToSection('contact')}
                  className="hover:text-teal-400 transition-colors cursor-pointer"
                >
                  {t.navContact}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Emergency */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              {language === 'ta' ? 'தொடர்பு விபரங்கள்' : 'Clinic Contact & Help'}
            </h4>
            
            <div className="space-y-2 text-xs sm:text-sm text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>{language === 'ta' ? CLINIC_INFO.addressTa : CLINIC_INFO.addressEn}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <a href={`tel:${CLINIC_INFO.phonePrimary.replace(/\s+/g, '')}`} className="hover:text-white font-mono">
                  {CLINIC_INFO.phonePrimary}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`https://wa.me/${CLINIC_INFO.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white font-mono"
                >
                  WhatsApp: {CLINIC_INFO.whatsappDisplay}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Mon–Sat: 7:30 AM – 8:00 PM</span>
              </div>
            </div>

            {/* Emergency Hotline reminder */}
            <div className="pt-2 text-xs text-rose-300 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>National Ambulance Service: Call <strong>1990</strong> (Free in Sri Lanka)</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Medical Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {year} {language === 'ta' ? CLINIC_INFO.nameTa : CLINIC_INFO.nameEn}. {t.footerCopyright}
          </p>

          <p className="text-center md:text-right max-w-xl text-[11px] text-slate-500 leading-normal">
            {t.footerLegalNotice}
          </p>
        </div>

      </div>
    </footer>
  );
}
