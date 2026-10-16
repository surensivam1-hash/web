'use client';

import React, { useState } from 'react';
import { Language, FaqItem } from '@/lib/types';
import { CLINIC_FAQS, TRANSLATIONS } from '@/lib/data';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PatientFaqProps {
  language: Language;
}

export function PatientFaq({ language }: PatientFaqProps) {
  const t = TRANSLATIONS[language];
  const [openFaqId, setOpenFaqId] = useState<string | null>(CLINIC_FAQS[0]?.id || null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  const filteredFaqs = CLINIC_FAQS.filter((faq) => {
    if (activeCategory === 'all') return true;
    return faq.category === activeCategory;
  });

  return (
    <section id="faq" className="py-20 lg:py-28 bg-white border-t border-slate-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-700 mb-2.5">
            <HelpCircle className="w-4 h-4 text-teal-600" />
            <span>{t.faqHeading}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            {t.faqTitle}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            {t.faqSubtitle}
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 mb-10">
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-full transition-all cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-teal-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {language === 'ta' ? 'அனைத்து வினாக்களும்' : 'All Topics'}
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('appointments')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-full transition-all cursor-pointer ${
              activeCategory === 'appointments'
                ? 'bg-teal-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {language === 'ta' ? 'முன்பதிவு' : 'Appointments'}
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('lab')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-full transition-all cursor-pointer ${
              activeCategory === 'lab'
                ? 'bg-teal-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {language === 'ta' ? 'ஆய்வகம் & ஈசிஜி' : 'Lab & ECG'}
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('languages')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-full transition-all cursor-pointer ${
              activeCategory === 'languages'
                ? 'bg-teal-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {language === 'ta' ? 'பேசும் மொழிகள்' : 'Languages'}
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('location')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-full transition-all cursor-pointer ${
              activeCategory === 'location'
                ? 'bg-teal-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {language === 'ta' ? 'அமைவிடம் & தரிப்பிடம்' : 'Location & Parking'}
          </button>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {filteredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            const question = language === 'ta' ? faq.questionTa : faq.questionEn;
            const answer = language === 'ta' ? faq.answerTa : faq.answerEn;

            return (
              <div
                key={faq.id}
                className="rounded-2xl bg-slate-50/80 border border-slate-200/80 overflow-hidden transition-colors hover:border-slate-300"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-2 focus-visible:outline-teal-600"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                    {question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-teal-50 border-teal-300 text-teal-700' : 'text-slate-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 font-normal">
                        {answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
