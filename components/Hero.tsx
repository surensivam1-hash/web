'use client';

import React from 'react';
import Image from 'next/image';
import { CLINIC_INFO } from '@/lib/data';
import {
  Calendar,
  ArrowRight,
  ShieldCheck,
  Stethoscope,
  HeartHandshake,
  MapPin,
  MessageCircle,
  PhoneCall,
} from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onBookClick: () => void;
  onExploreServicesClick: () => void;
}

export function Hero({ onBookClick, onExploreServicesClick }: HeroProps) {
  return (
    <section
      id="home"
      className="relative pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden bg-gradient-to-b from-teal-50/40 via-sky-50/20 to-white"
    >
      {/* Subtle ambient medical glow background */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none opacity-40 blur-3xl -z-10 bg-gradient-to-tr from-teal-200/40 via-sky-200/30 to-transparent"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 2-column Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Headlines & Action CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Location & Heritage Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50/90 border border-teal-200/80 text-teal-900 text-xs font-bold tracking-wide shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse" />
              <span>Jaffna · Northern Province, Sri Lanka</span>
              <span className="text-teal-300">/</span>
              <span className="text-teal-700 font-semibold">Family Medical Practice</span>
            </div>

            {/* Main Headline & Subtitle */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-[52px] font-extrabold text-slate-900 tracking-[-0.03em] leading-[1.12] text-balance">
                Trusted Healthcare for Your Family in Jaffna
              </h1>
              <p className="text-lg sm:text-xl font-bold text-teal-800 tracking-tight leading-snug">
                Compassionate Outpatient Care & Specialist Consultations
              </p>
            </div>

            {/* Supporting Description */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
              Providing modern, patient-centered outpatient medical services, expert consultations, and routine in-house diagnostic care for families across Northern Sri Lanka.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={onBookClick}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 text-sm sm:text-base font-bold text-white bg-gradient-to-r from-teal-700 via-teal-700 to-sky-700 hover:from-teal-800 hover:to-sky-800 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-teal-600"
              >
                <Calendar className="w-5 h-5 text-teal-200" />
                <span>Book an Appointment</span>
                <ArrowRight className="w-4 h-4 transition-transform" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={onExploreServicesClick}
                className="inline-flex items-center justify-center gap-2 px-5 py-4 text-sm sm:text-base font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 hover:border-slate-400 rounded-2xl shadow-2xs transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-teal-600"
              >
                <Stethoscope className="w-5 h-5 text-teal-600" />
                <span>View Medical Services</span>
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={`https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${encodeURIComponent('Hello Nalam Clinic, I would like to inquire about outpatient clinic timings in Jaffna.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-4 text-sm font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-300/80 rounded-2xl transition-colors shadow-2xs"
                aria-label="Direct WhatsApp message"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp</span>
              </motion.a>
            </div>

            {/* Subtle disclaimer & trust marker */}
            <div className="pt-2 text-xs text-slate-500 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0" />
              <span>Bilingual consultations in English & Tamil · Routine in-house lab & ECG diagnostic support</span>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/90 bg-slate-100 aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] group">
              <Image
                src="/images/hero_clinic.jpg"
                alt="Nalam Medical Clinic consultation in Jaffna with compassionate doctor and family"
                fill
                priority
                quality={85}
                className="object-cover group-hover:scale-102 transition-transform duration-700"
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 480px, 490px"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/15 to-transparent pointer-events-none" />

              {/* Floating clinic accreditation chip */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-100 shadow-sm flex items-center gap-2 text-[11px] font-bold text-slate-800">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>OPD Open Today · Jaffna</span>
              </div>

              {/* Floating quick phone action */}
              <a
                href={`tel:${CLINIC_INFO.phonePrimary.replace(/\s+/g, '')}`}
                className="absolute top-4 right-4 bg-slate-900/80 hover:bg-slate-900 backdrop-blur-md text-white px-2.5 py-1.5 rounded-full border border-white/20 text-[10px] font-bold flex items-center gap-1.5 transition-colors"
                title="Call Desk"
              >
                <PhoneCall className="w-3 h-3 text-teal-300" />
                <span>Call Desk</span>
              </a>

              {/* Bottom location badge inside image */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-slate-100/90 flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <p className="text-[10px] font-extrabold uppercase tracking-widest text-teal-800">
                    Clinic Location
                  </p>
                  <p className="text-sm font-extrabold text-slate-900 leading-tight">
                    142 Hospital Road, Jaffna
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Near Jaffna Teaching Hospital
                  </p>
                </div>
                <div className="text-right border-l border-slate-200/80 pl-4 shrink-0">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    Emergency
                  </p>
                  <a
                    href="tel:1990"
                    className="text-base font-extrabold text-sky-800 hover:text-sky-900 font-mono block"
                  >
                    1990
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 4-Item Proof / Trust Indicator Strip */}
        <div className="mt-14 pt-8 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-md hover:border-teal-300 transition-all duration-200">
            <div className="flex items-center gap-2 text-teal-700 mb-1.5">
              <Stethoscope className="w-5 h-5 shrink-0" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-teal-800">01. Specialists</span>
            </div>
            <p className="text-sm font-bold text-slate-900">
              4 Senior Consultant Specialists
            </p>
            <p className="text-xs text-slate-500 mt-0.5">
              Family, Pediatric, Women & Cardiac Care
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-md hover:border-teal-300 transition-all duration-200">
            <div className="flex items-center gap-2 text-teal-700 mb-1.5">
              <HeartHandshake className="w-5 h-5 shrink-0" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-teal-800">02. Bilingual</span>
            </div>
            <p className="text-sm font-bold text-slate-900">
              Mother-Tongue & English Care
            </p>
            <p className="text-xs text-slate-500 mt-0.5">
              In-depth discussions in English & Tamil
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-md hover:border-teal-300 transition-all duration-200">
            <div className="flex items-center gap-2 text-teal-700 mb-1.5">
              <ShieldCheck className="w-5 h-5 shrink-0" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-teal-800">03. Diagnostics</span>
            </div>
            <p className="text-sm font-bold text-slate-900">
              In-House Diagnostics
            </p>
            <p className="text-xs text-slate-500 mt-0.5">
              Routine lab work & 12-lead ECG support
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-md hover:border-teal-300 transition-all duration-200">
            <div className="flex items-center gap-2 text-teal-700 mb-1.5">
              <MapPin className="w-5 h-5 shrink-0" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-teal-800">04. Location</span>
            </div>
            <p className="text-sm font-bold text-slate-900">
              Hospital Rd, Jaffna
            </p>
            <p className="text-xs text-slate-500 mt-0.5">
              Minutes from Jaffna Teaching Hospital
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
