'use client';

import React from 'react';
import { Language } from '@/lib/types';
import { TRANSLATIONS } from '@/lib/data';
import { Languages, ShieldCheck, Clock, CheckCircle2, Award, HeartPulse, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface AboutProps {
  language: Language;
}

export function About({ language }: AboutProps) {
  const t = TRANSLATIONS[language];

  return (
    <section id="about" className="py-20 lg:py-28 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3">
            <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse" />
            <span>{t.aboutHeading}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-slate-900 tracking-[-0.02em] leading-tight text-balance">
            {t.aboutTitle}
          </h2>
        </div>

        {/* Narrative & Pillars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Story & Philosophy */}
          <div className="lg:col-span-6 space-y-6 text-slate-600 text-base sm:text-lg leading-relaxed">
            <p className="font-semibold text-slate-900 text-lg sm:text-xl leading-snug">
              {t.aboutP1}
            </p>
            <p className="text-slate-600 font-normal">
              {t.aboutP2}
            </p>
            <p className="text-slate-600 font-normal">
              {t.aboutP3}
            </p>

            <div className="pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    {language === 'ta' ? 'வெளிப்படையான கட்டணங்கள்' : 'Transparent Outpatient Care'}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 leading-normal">
                    {language === 'ta' ? 'மறைமுக செலவுகள் அற்ற தெளிவான மருத்துவ அணுகுமுறை' : 'Clear communication with no hidden medical fees'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    {language === 'ta' ? 'மருந்து & மாதிரி சேகரிப்பு' : 'Pharmacy & Specimen Desk'}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 leading-normal">
                    {language === 'ta' ? 'அத்தியாவசிய மருந்துகள் மற்றும் இரத்த மாதிரி பரிசோதனை' : 'Prescription counter & daily lab dispatch'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 3 Core Pillars Cards */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-2">
              {t.aboutPillarsTitle}
            </h3>

            {/* Pillar 1 */}
            <motion.div
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
              className="p-6 rounded-3xl bg-slate-50/80 border border-slate-200/80 hover:border-teal-400 hover:bg-white shadow-2xs hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
                  <Languages className="w-6 h-6" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-base font-bold text-slate-900">
                    {t.pillar1Title}
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {t.pillar1Desc}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Pillar 2 */}
            <motion.div
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
              className="p-6 rounded-3xl bg-slate-50/80 border border-slate-200/80 hover:border-teal-400 hover:bg-white shadow-2xs hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-800 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-base font-bold text-slate-900">
                    {t.pillar2Title}
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {t.pillar2Desc}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Pillar 3 */}
            <motion.div
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
              className="p-6 rounded-3xl bg-slate-50/80 border border-slate-200/80 hover:border-teal-400 hover:bg-white shadow-2xs hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-base font-bold text-slate-900">
                    {t.pillar3Title}
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {t.pillar3Desc}
                  </p>
                </div>
              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}
