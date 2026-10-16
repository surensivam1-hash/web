'use client';

import React from 'react';
import { Language } from '@/lib/types';
import { CLINIC_AMENITIES, TRANSLATIONS } from '@/lib/data';
import {
  Accessibility,
  Wind,
  FlaskConical,
  Pill,
  Zap,
  Lock,
  Building2,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';
import { motion } from 'motion/react';

interface FacilitiesProps {
  language: Language;
}

export function Facilities({ language }: FacilitiesProps) {
  const t = TRANSLATIONS[language];

  const getAmenityIcon = (iconName: string) => {
    switch (iconName) {
      case 'Accessibility':
        return <Accessibility className="w-6 h-6 text-teal-700" />;
      case 'Wind':
        return <Wind className="w-6 h-6 text-sky-700" />;
      case 'FlaskConical':
        return <FlaskConical className="w-6 h-6 text-teal-700" />;
      case 'Pill':
        return <Pill className="w-6 h-6 text-pink-600" />;
      case 'Zap':
        return <Zap className="w-6 h-6 text-amber-600" />;
      case 'Lock':
        return <Lock className="w-6 h-6 text-teal-700" />;
      default:
        return <Building2 className="w-6 h-6 text-teal-700" />;
    }
  };

  return (
    <section id="facilities" className="py-20 lg:py-28 bg-gradient-to-b from-slate-50/50 via-white to-slate-50/50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3">
            <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse" />
            <span>{t.amenitiesHeading}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-slate-900 tracking-[-0.02em] leading-tight text-balance">
            {t.amenitiesTitle}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            {t.amenitiesSubtitle}
          </p>
        </div>

        {/* 6-Grid Facilities Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {CLINIC_AMENITIES.map((amenity, index) => {
            const title = language === 'ta' ? amenity.titleTa : amenity.titleEn;
            const description = language === 'ta' ? amenity.descriptionTa : amenity.descriptionEn;

            return (
              <motion.div
                key={amenity.id}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 hover:border-teal-400 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-teal-50/80 border border-teal-100 flex items-center justify-center">
                      {getAmenityIcon(amenity.iconName)}
                    </div>
                    <span className="text-[11px] font-mono font-bold text-slate-400 px-2 py-0.5 bg-slate-50 rounded-md border border-slate-100">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                    {title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {description}
                  </p>
                </div>

                <div className="pt-4 mt-5 border-t border-slate-100 flex items-center gap-2 text-xs text-teal-700 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                  <span>{language === 'ta' ? 'கிளினிக் தர உறுதிப்பாடு' : 'Verified Clinical Facility'}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
