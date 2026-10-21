'use client';

import React, { useState } from 'react';
import { CLINIC_INFO } from '@/lib/data';
import { validatePhoneNumber } from '@/lib/appointment-utils';
import {
  MapPin,
  Phone,
  Clock,
  MessageCircle,
  AlertTriangle,
  ExternalLink,
  Send,
  CheckCircle2,
  Navigation,
} from 'lucide-react';
import { motion } from 'motion/react';

export function Contact() {
  const hours = CLINIC_INFO.hours;
  const address = CLINIC_INFO.address;

  // Simple inquiry state
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryText, setInquiryText] = useState('');
  const [inquiryPhoneError, setInquiryPhoneError] = useState('');
  const [inquirySent, setInquirySent] = useState(false);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName.trim()) return;

    const phoneVal = validatePhoneNumber(inquiryPhone);
    if (!phoneVal.isValid) {
      setInquiryPhoneError(phoneVal.errorMessage || 'Please provide a valid phone number.');
      return;
    }

    setInquiryPhoneError('');
    setInquirySent(true);
    setTimeout(() => {
      setInquirySent(false);
      setInquiryName('');
      setInquiryPhone('');
      setInquiryText('');
      setInquiryPhoneError('');
    }, 4000);
  };

  const whatsappUrl = `https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${encodeURIComponent(
    'Hello Nalam Health Clinic Jaffna, I would like to inquire about consultation hours and services.'
  )}`;

  const googleMapsDirectionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'Hospital Road, Jaffna, Sri Lanka'
  )}`;

  return (
    <section id="contact" className="py-20 lg:py-28 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-700 mb-2.5">
            <span className="w-2 h-2 rounded-full bg-teal-600" />
            <span>Contact & Location</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            Reach Us in Jaffna
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Conveniently situated on Hospital Road with easy parking, pharmacy access, and public transit links.
          </p>
        </div>

        {/* Emergency Alert Banner */}
        <div className="mb-14 p-5 sm:p-6 rounded-3xl bg-rose-50/90 border border-rose-200/90 text-rose-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-2xs">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 mt-0.5">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-rose-900">
                Medical Emergency Alert
              </h3>
              <p className="text-xs sm:text-sm text-rose-800 mt-1 max-w-3xl leading-relaxed">
                For chest pain, severe breathlessness, head trauma, or acute emergencies, call 1990 (National Free Ambulance) or proceed directly to the Emergency Treatment Unit (ETU) at Teaching Hospital Jaffna.
              </p>
            </div>
          </div>

          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="tel:1990"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white bg-rose-700 hover:bg-rose-800 rounded-xl shadow-xs transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span>Call 1990 (Suwa Seriya)</span>
          </motion.a>
        </div>

        {/* Contact Info & Hours Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Address, Phone, Hours, WhatsApp */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Address Card */}
            <div className="p-5 sm:p-7 rounded-3xl bg-slate-50/80 border border-slate-200/80">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex items-start gap-3.5 sm:gap-4 flex-1 min-w-0">
                  <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-teal-800">
                      Clinic Location
                    </h4>
                    <p className="text-base sm:text-lg font-extrabold text-slate-900 mt-0.5 break-words">
                      {address}
                    </p>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Close to Jaffna Teaching Hospital, 5 minutes from Central Bus Stand and Main Post Office
                    </p>
                  </div>
                </div>

                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-bold text-teal-800 hover:text-teal-900 bg-white border border-teal-200/90 rounded-xl hover:bg-teal-50 transition-colors shadow-2xs self-start sm:self-auto w-full sm:w-auto"
                >
                  <Navigation className="w-3.5 h-3.5 text-teal-600" />
                  <span>Get Directions (Jaffna)</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </motion.a>
              </div>
            </div>

            {/* Direct Phone & WhatsApp Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Telephone */}
              <div className="p-5 sm:p-6 rounded-3xl bg-slate-50/80 border border-slate-200/80 space-y-2.5 min-w-0">
                <div className="flex items-center gap-2.5 text-sky-800">
                  <Phone className="w-5 h-5 shrink-0" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700 truncate">
                    Phone & Inquiries
                  </span>
                </div>
                <div className="space-y-1 min-w-0">
                  <a
                    href={`tel:${CLINIC_INFO.phonePrimary.replace(/\s+/g, '')}`}
                    className="block text-base sm:text-lg font-extrabold text-slate-900 hover:text-teal-700 transition-colors font-mono tracking-tight truncate"
                  >
                    {CLINIC_INFO.phonePrimary}
                  </a>
                  <a
                    href={`tel:${CLINIC_INFO.phoneSecondary.replace(/\s+/g, '')}`}
                    className="block text-xs font-semibold text-slate-600 hover:text-teal-700 transition-colors font-mono truncate"
                  >
                    {CLINIC_INFO.phoneSecondary}
                  </a>
                </div>
              </div>

              {/* WhatsApp direct card */}
              <div className="p-6 rounded-3xl bg-emerald-50/70 border border-emerald-200 space-y-2.5">
                <div className="flex items-center gap-2.5 text-emerald-800">
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-950">
                    WhatsApp Direct Chat
                  </span>
                </div>
                <p className="text-xs text-emerald-900 leading-relaxed">
                  Chat directly with clinic desk for inquiries, fees, or test availability
                </p>
                <div className="pt-1">
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Open WhatsApp Chat</span>
                  </motion.a>
                </div>
              </div>
            </div>

            {/* Opening Hours Table */}
            <div className="p-6 sm:p-7 rounded-3xl bg-slate-50/80 border border-slate-200/80 space-y-4">
              <div className="flex items-center gap-2.5 text-slate-800">
                <Clock className="w-5 h-5 text-teal-700" />
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                  Consultation Hours
                </h4>
              </div>

              <div className="divide-y divide-slate-200/80 text-sm">
                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-slate-600">Monday – Friday</span>
                  <span className="font-bold text-slate-900 font-mono">{hours.weekdays.split(':')[1]?.trim() || '7:30 AM – 8:00 PM'}</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-slate-600">Saturday</span>
                  <span className="font-bold text-slate-900 font-mono">{hours.saturday.split(':')[1]?.trim() || '7:30 AM – 6:30 PM'}</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-slate-600">Sunday</span>
                  <span className="font-bold text-slate-900 font-mono">{hours.sunday.split(':')[1]?.trim() || '8:00 AM – 1:00 PM'}</span>
                </div>
              </div>

              <p className="text-xs text-slate-500 pt-2 border-t border-slate-200/60 leading-relaxed">
                {hours.emergencyNote}
              </p>
            </div>

          </div>

          {/* Right Column: Quick Inquiry Box */}
          <div className="lg:col-span-5 bg-slate-50/80 rounded-3xl border border-slate-200/80 p-6 sm:p-8 space-y-5">
            <div>
              <h4 className="text-base font-extrabold text-slate-900">
                Quick General Inquiry
              </h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Have a non-urgent question regarding lab timings or fee guidelines?
              </p>
            </div>

            {inquirySent ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 rounded-2xl bg-teal-50 border border-teal-200 text-teal-900 space-y-2"
              >
                <div className="flex items-center gap-2 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-teal-600" />
                  <span>Inquiry Received</span>
                </div>
                <p className="text-xs leading-relaxed">
                  Thank you! Your inquiry has been successfully validated. Please note that this is a frontend-only website, so your message has not been sent to the physical clinic. For immediate assistance, please call us directly or message via WhatsApp.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4" noValidate>
                <div>
                  <label htmlFor="inquiryName" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Your Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="inquiryName"
                    name="inquiryName"
                    autoComplete="name"
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    required
                    placeholder="e.g. S. Mathivanan"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-2xs"
                  />
                </div>

                <div>
                  <label htmlFor="inquiryPhone" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    inputMode="tel"
                    id="inquiryPhone"
                    name="inquiryPhone"
                    autoComplete="tel"
                    value={inquiryPhone}
                    onChange={(e) => {
                      setInquiryPhone(e.target.value);
                      if (inquiryPhoneError) {
                        const val = validatePhoneNumber(e.target.value);
                        if (val.isValid) {
                          setInquiryPhoneError('');
                        }
                      }
                    }}
                    required
                    placeholder="e.g. 077 123 4567 or +94 77 123 4567"
                    className={`w-full px-3.5 py-2.5 text-sm rounded-xl border ${
                      inquiryPhoneError ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300 bg-white'
                    } text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-2xs`}
                  />
                  {inquiryPhoneError && (
                    <p className="mt-1.5 text-xs text-rose-600 font-medium">
                      {inquiryPhoneError}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="inquiryText" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Your Question / Note
                  </label>
                  <textarea
                    id="inquiryText"
                    name="inquiryText"
                    rows={3}
                    value={inquiryText}
                    onChange={(e) => setInquiryText(e.target.value)}
                    placeholder="e.g. Inquiring about weekend fasting blood test timings..."
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-2xs"
                  />
                </div>

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-bold uppercase tracking-wider text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message</span>
                </motion.button>
              </form>
            )}

            <div className="pt-3 text-xs text-slate-500 border-t border-slate-200/80">
              <span className="font-bold">Email inquiries:</span>{' '}
              <a href={`mailto:${CLINIC_INFO.email}`} className="text-teal-700 font-semibold hover:underline">
                {CLINIC_INFO.email}
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
