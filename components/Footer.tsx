'use client';

import React from 'react';
import { CLINIC_INFO } from '@/lib/data';
import { HeartPulse, Phone, MapPin, Clock, MessageCircle, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigateToSection: (sectionId: string) => void;
}

export function Footer({ onNavigateToSection }: FooterProps) {
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
                  {CLINIC_INFO.name}
                </span>
                <span className="text-xs text-slate-400">
                  Jaffna, Northern Province, Sri Lanka
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Caring for families across Jaffna and Northern Sri Lanka with professional bilingual medical services.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              {[
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'About' },
                { id: 'services', label: 'Services' },
                { id: 'doctors', label: 'Doctors' },
                { id: 'appointment', label: 'Appointment' },
                { id: 'contact', label: 'Contact' },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => onNavigateToSection(item.id)}
                    className="hover:text-teal-400 transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact & Emergency */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Clinic Contact & Help
            </h4>
            
            <div className="space-y-2 text-xs sm:text-sm text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>{CLINIC_INFO.address}</span>
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
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 pb-6 border-b border-slate-800">
          <p>
            &copy; {year} {CLINIC_INFO.name}. All rights reserved.
          </p>

          <p className="text-center md:text-right max-w-xl text-[11px] text-slate-500 leading-normal">
            This web prototype demonstrates a modern medical clinic interface for Northern Sri Lanka. Medical information provided here is for general health literacy and informational purposes only.
          </p>
        </div>

        {/* Developer Credit */}
        <div className="pt-6 text-center text-xs text-slate-500">
          Developed by EdGrow Tech (PVT) LTD
        </div>

      </div>
    </footer>
  );
}
