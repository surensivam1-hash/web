'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Doctor, Language, ConfirmedBooking } from '@/lib/types';
import { DOCTORS_DATA, AVAILABLE_SLOTS, TRANSLATIONS, CLINIC_INFO } from '@/lib/data';
import {
  validatePhoneNumber,
  validateAppointmentDate,
  getTodayDateString,
  generateBookingReference,
  generateIcsCalendarContent,
} from '@/lib/appointment-utils';
import {
  Calendar,
  Clock,
  User,
  Phone,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Download,
  Printer,
  RotateCcw,
  ShieldAlert,
  Loader2,
  Stethoscope,
  MapPin,
  Sparkles,
  QrCode,
  Check,
  Copy,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AppointmentBookingProps {
  language: Language;
  selectedDoctorId: string;
  onDoctorChange: (id: string) => void;
  prefillMessage?: string;
}

export function AppointmentBooking({
  language,
  selectedDoctorId,
  onDoctorChange,
  prefillMessage,
}: AppointmentBookingProps) {
  const t = TRANSLATIONS[language];
  const todayStr = getTodayDateString();

  // Form states
  const [patientName, setPatientName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [appointmentDate, setAppointmentDate] = useState(todayStr);
  const [selectedSlot, setSelectedSlot] = useState(AVAILABLE_SLOTS[0].id);
  const [message, setMessage] = useState(prefillMessage || '');

  // Sync prefill message if passed from external trigger (e.g. Service card)
  const [prevPrefill, setPrevPrefill] = useState(prefillMessage);
  if (prefillMessage && prefillMessage !== prevPrefill) {
    setPrevPrefill(prefillMessage);
    setMessage(prefillMessage);
  }

  // Validation & UI states
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<ConfirmedBooking | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);

  const handleCopyReference = () => {
    if (confirmedBooking?.referenceId) {
      navigator.clipboard.writeText(confirmedBooking.referenceId);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2000);
    }
  };

  const selectedDoctor = DOCTORS_DATA.find((d) => d.id === selectedDoctorId) || DOCTORS_DATA[0];
  const selectedSlotObj = AVAILABLE_SLOTS.find((s) => s.id === selectedSlot) || AVAILABLE_SLOTS[0];

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!patientName.trim()) {
      newErrors.patientName = language === 'ta' ? 'நோயாளி பெயர் அவசியமானது.' : 'Patient full name is required.';
    } else if (patientName.trim().length < 2) {
      newErrors.patientName = language === 'ta' ? 'குறைந்தது 2 எழுத்துக்கள் தேவை.' : 'Name must be at least 2 characters.';
    }

    const phoneValidation = validatePhoneNumber(phoneNumber);
    if (!phoneValidation.isValid) {
      newErrors.phoneNumber = phoneValidation.errorMessage || 'Please provide a valid phone number.';
    }

    if (!selectedDoctorId) {
      newErrors.doctorId = language === 'ta' ? 'தயவுசெய்து ஒரு மருத்துவரைத் தெரிவு செய்யவும்.' : 'Please select a doctor.';
    }

    const dateValidation = validateAppointmentDate(appointmentDate);
    if (!dateValidation.isValid) {
      newErrors.appointmentDate = dateValidation.errorMessage || 'Invalid appointment date.';
    }

    if (!selectedSlot) {
      newErrors.slot = language === 'ta' ? 'ஒரு நேரத்தைத் தெரிவு செய்யவும்.' : 'Please choose an available time slot.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate instant scheduling desk verification
    setTimeout(() => {
      const slotLabel = language === 'ta' ? selectedSlotObj.timeTa : selectedSlotObj.timeEn;

      const booking: ConfirmedBooking = {
        referenceId: generateBookingReference('NLM'),
        patientName: patientName.trim(),
        phoneNumber: phoneNumber.trim(),
        doctor: selectedDoctor,
        appointmentDate,
        timeSlot: slotLabel,
        message: message.trim() || undefined,
        bookingTimestamp: new Date().toLocaleString(),
      };

      setConfirmedBooking(booking);
      setIsSubmitting(false);
    }, 600);
  };

  const handleReset = () => {
    setConfirmedBooking(null);
    setPatientName('');
    setPhoneNumber('');
    setAppointmentDate(todayStr);
    setSelectedSlot(AVAILABLE_SLOTS[0].id);
    setMessage('');
    setErrors({});
  };

  const handleDownloadCalendar = () => {
    if (!confirmedBooking) return;
    const doctorName = language === 'ta' ? confirmedBooking.doctor.nameTa : confirmedBooking.doctor.nameEn;
    const content = generateIcsCalendarContent({
      title: `Clinic Consultation with ${doctorName} (Demo)`,
      description: `Appointment reference: ${confirmedBooking.referenceId}. Demo booking at Nalam Health Clinic Jaffna. Patient: ${confirmedBooking.patientName}. Contact: ${CLINIC_INFO.phonePrimary}. Note: Simulated demonstration.`,
      location: CLINIC_INFO.addressEn,
      dateStr: confirmedBooking.appointmentDate,
      timeSlotStr: confirmedBooking.timeSlot,
    });

    const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `nalam-appointment-${confirmedBooking.referenceId}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrintSlip = () => {
    window.print();
  };

  return (
    <section id="appointment" className="py-20 lg:py-28 bg-gradient-to-b from-slate-50/60 via-sky-50/30 to-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-700 mb-2.5">
            <span className="w-2 h-2 rounded-full bg-teal-600" />
            <span>{t.bookingHeading}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            {t.bookingTitle}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            {t.bookingSubtitle}
          </p>
        </div>

        {/* Demo Notice Banner */}
        <div className="mb-10 p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-950 flex items-start gap-3.5 text-xs sm:text-sm shadow-2xs">
          <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-0.5 leading-relaxed">
            <span className="font-extrabold">{language === 'ta' ? 'மாதிரி செயல்முறை அறிவிப்பு:' : 'Frontend Prototype Notice:'}</span>{' '}
            <span>{t.bookingDisclaimerNotice}</span>
          </div>
        </div>

        {/* Confirmed Slip State vs Booking Form */}
        {confirmedBooking ? (
          /* Confirmation Slip Screen with Medical Receipt Card */
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="max-w-3xl mx-auto bg-white rounded-3xl border-2 border-teal-600 shadow-xl overflow-hidden p-6 sm:p-10"
          >
            {/* Confirmation Header */}
            <div className="flex items-start justify-between pb-6 border-b border-slate-100 gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                    {t.successTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    {t.successSubtitle}
                  </p>
                </div>
              </div>

              {/* Reference Badge with Copy */}
              <div className="text-right shrink-0">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                  {t.successRef}
                </span>
                <div className="flex items-center gap-1.5 mt-0.5 justify-end">
                  <span className="font-mono text-base sm:text-lg font-extrabold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-lg border border-teal-200">
                    {confirmedBooking.referenceId}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyReference}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
                    title={language === 'ta' ? 'குறியீட்டை பிரதி செய்க' : 'Copy Reference Code'}
                    aria-label="Copy Reference Code"
                  >
                    {copiedRef ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Slip Details Grid */}
            <div className="py-6 grid grid-cols-1 sm:grid-cols-2 gap-6 border-b border-slate-100 text-sm">
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  {t.successDoctor}
                </span>
                <p className="text-base font-extrabold text-slate-900">
                  {language === 'ta' ? confirmedBooking.doctor.nameTa : confirmedBooking.doctor.nameEn}
                </p>
                <p className="text-xs text-teal-700 font-semibold">
                  {language === 'ta' ? confirmedBooking.doctor.specializationTa : confirmedBooking.doctor.specializationEn}
                </p>
              </div>

              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  {t.successDate}
                </span>
                <p className="text-base font-extrabold text-slate-900">
                  {confirmedBooking.appointmentDate}
                </p>
                <p className="text-xs font-semibold text-slate-600">
                  {confirmedBooking.timeSlot}
                </p>
              </div>

              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  {t.successPatient}
                </span>
                <p className="font-extrabold text-slate-900">
                  {confirmedBooking.patientName}
                </p>
              </div>

              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  {t.successContact}
                </span>
                <p className="font-mono font-bold text-slate-900">
                  {confirmedBooking.phoneNumber}
                </p>
              </div>

              {confirmedBooking.message && (
                <div className="sm:col-span-2">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                    {language === 'ta' ? 'குறிப்பு' : 'Patient Message / Reason'}
                  </span>
                  <p className="text-slate-700 bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 text-xs sm:text-sm">
                    {confirmedBooking.message}
                  </p>
                </div>
              )}
            </div>

            {/* Prototype Reminder */}
            <div className="my-6 p-4 rounded-2xl bg-sky-50 border border-sky-200 text-sky-950 text-xs sm:text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-sky-700 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                {t.successNote}
              </p>
            </div>

            {/* Actions: Download .ics, Print, Book Another */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleDownloadCalendar}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
                  title="Download iCalendar file"
                >
                  <Download className="w-4 h-4 text-slate-600" />
                  <span>{t.successAddToCalendar}</span>
                </button>

                <button
                  type="button"
                  onClick={handlePrintSlip}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
                  title="Print this consultation slip"
                >
                  <Printer className="w-4 h-4 text-slate-600" />
                  <span>{t.successPrintSlip}</span>
                </button>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{t.successBookAnother}</span>
              </button>
            </div>
          </motion.div>
        ) : (
          /* Interactive 2-Column Booking Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 7 Cols: The Booking Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-9">
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                
                {/* Row 1: Patient Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="patientName" className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-2">
                      {t.formFullName} <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        id="patientName"
                        value={patientName}
                        onChange={(e) => {
                          setPatientName(e.target.value);
                          if (errors.patientName) {
                            setErrors((prev) => ({ ...prev, patientName: '' }));
                          }
                        }}
                        placeholder={t.formFullNamePlaceholder}
                        className={`block w-full pl-10 pr-4 py-3 text-sm rounded-xl border ${
                          errors.patientName ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300 bg-white'
                        } text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors shadow-2xs`}
                        required
                      />
                    </div>
                    {errors.patientName && (
                      <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.patientName}</span>
                      </p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label htmlFor="phoneNumber" className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-2">
                      {t.formPhone} <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Phone className="w-4 h-4" />
                      </div>
                      <input
                        type="tel"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => {
                          setPhoneNumber(e.target.value);
                          if (errors.phoneNumber) {
                            setErrors((prev) => ({ ...prev, phoneNumber: '' }));
                          }
                        }}
                        placeholder={t.formPhonePlaceholder}
                        className={`block w-full pl-10 pr-4 py-3 text-sm rounded-xl border ${
                          errors.phoneNumber ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300 bg-white'
                        } text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors shadow-2xs`}
                        required
                      />
                    </div>
                    {errors.phoneNumber ? (
                      <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.phoneNumber}</span>
                      </p>
                    ) : (
                      <p className="mt-1.5 text-[11px] text-slate-500">
                        {t.formPhoneHint}
                      </p>
                    )}
                  </div>
                </div>

                {/* Row 2: Doctor Selection */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="doctorSelect" className="block text-xs font-extrabold uppercase tracking-wider text-slate-700">
                      {t.formSelectDoctor} <span className="text-rose-500">*</span>
                    </label>
                    <span className="text-[11px] text-teal-700 font-semibold hidden sm:inline">
                      {language === 'ta' ? '4 நிபுணர்கள் உள்ளனர்' : '4 Specialists available'}
                    </span>
                  </div>

                  {/* Visual Doctor Quick Select Tiles */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                    {DOCTORS_DATA.map((doc) => {
                      const isSelected = selectedDoctorId === doc.id;
                      return (
                        <button
                          key={doc.id}
                          type="button"
                          onClick={() => {
                            onDoctorChange(doc.id);
                            if (errors.doctorId) {
                              setErrors((prev) => ({ ...prev, doctorId: '' }));
                            }
                          }}
                          className={`p-2 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-2 ${
                            isSelected
                              ? 'bg-teal-50 border-teal-500 ring-2 ring-teal-200 shadow-2xs'
                              : 'bg-slate-50 border-slate-200/80 hover:bg-white hover:border-slate-300'
                          }`}
                        >
                          <div className="relative w-8 h-8 rounded-lg overflow-hidden shrink-0 border border-slate-200">
                            <Image
                              src={doc.photoUrl}
                              alt={doc.nameEn}
                              fill
                              className="object-cover"
                              sizes="32px"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="text-[11px] font-bold text-slate-900 truncate leading-tight">
                              {language === 'ta' ? doc.nameTa.split(' ')[1] || doc.nameTa : doc.nameEn.split(' ')[1] || doc.nameEn}
                            </p>
                            <p className="text-[9px] text-teal-700 truncate font-semibold">
                              {language === 'ta' ? doc.specializationTa.split(' ')[0] : doc.specializationEn.split(' ')[0]}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Stethoscope className="w-4 h-4" />
                    </div>
                    <select
                      id="doctorSelect"
                      value={selectedDoctorId}
                      onChange={(e) => {
                        onDoctorChange(e.target.value);
                        if (errors.doctorId) {
                          setErrors((prev) => ({ ...prev, doctorId: '' }));
                        }
                      }}
                      className={`block w-full pl-10 pr-10 py-3 text-sm rounded-xl border ${
                        errors.doctorId ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300 bg-white'
                      } text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors shadow-2xs`}
                      required
                    >
                      <option value="">{t.formDoctorPrompt}</option>
                      {DOCTORS_DATA.map((doc) => (
                        <option key={doc.id} value={doc.id}>
                          {language === 'ta' ? doc.nameTa : doc.nameEn} — {language === 'ta' ? doc.specializationTa : doc.specializationEn}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.doctorId && (
                    <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.doctorId}</span>
                    </p>
                  )}
                </div>

                {/* Row 3: Appointment Date (Prevents past dates) */}
                <div>
                  <label htmlFor="appointmentDate" className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-2">
                    {t.formDate} <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <input
                      type="date"
                      id="appointmentDate"
                      min={todayStr}
                      value={appointmentDate}
                      onChange={(e) => {
                        setAppointmentDate(e.target.value);
                        if (errors.appointmentDate) {
                          setErrors((prev) => ({ ...prev, appointmentDate: '' }));
                        }
                      }}
                      className={`block w-full pl-10 pr-4 py-3 text-sm rounded-xl border ${
                        errors.appointmentDate ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300 bg-white'
                      } text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors shadow-2xs`}
                      required
                    />
                  </div>
                  {errors.appointmentDate && (
                    <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.appointmentDate}</span>
                    </p>
                  )}
                </div>

                {/* Row 4: Available Time Slots */}
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-2.5">
                    {t.formTimeSlot} <span className="text-rose-500">*</span>
                  </label>
                  
                  {/* Morning Slots */}
                  <div className="mb-4">
                    <p className="text-xs font-bold text-slate-500 mb-2 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-teal-600" />
                      <span>{t.formMorningSlots}</span>
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {AVAILABLE_SLOTS.filter((s) => s.period === 'morning').map((slot) => {
                        const isSelected = selectedSlot === slot.id;
                        return (
                          <button
                            key={slot.id}
                            type="button"
                            onClick={() => {
                              setSelectedSlot(slot.id);
                              if (errors.slot) {
                                setErrors((prev) => ({ ...prev, slot: '' }));
                              }
                            }}
                            className={`px-3 py-2.5 text-xs font-bold rounded-xl border text-center transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-gradient-to-r from-teal-700 to-sky-700 text-white border-teal-700 shadow-xs ring-2 ring-teal-200'
                                : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-teal-300 hover:bg-white'
                            }`}
                          >
                            {language === 'ta' ? slot.timeTa : slot.timeEn}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Evening Slots */}
                  <div>
                    <p className="text-xs font-bold text-slate-500 mb-2 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-sky-600" />
                      <span>{t.formEveningSlots}</span>
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {AVAILABLE_SLOTS.filter((s) => s.period === 'evening').map((slot) => {
                        const isSelected = selectedSlot === slot.id;
                        return (
                          <button
                            key={slot.id}
                            type="button"
                            onClick={() => {
                              setSelectedSlot(slot.id);
                              if (errors.slot) {
                                setErrors((prev) => ({ ...prev, slot: '' }));
                              }
                            }}
                            className={`px-3 py-2.5 text-xs font-bold rounded-xl border text-center transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-gradient-to-r from-teal-700 to-sky-700 text-white border-teal-700 shadow-xs ring-2 ring-teal-200'
                                : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-teal-300 hover:bg-white'
                            }`}
                          >
                            {language === 'ta' ? slot.timeTa : slot.timeEn}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {errors.slot && (
                    <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.slot}</span>
                    </p>
                  )}
                </div>

                {/* Row 5: Optional message */}
                <div>
                  <label htmlFor="patientMessage" className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-2">
                    {t.formMessage}
                  </label>
                  <div className="relative">
                    <div className="absolute top-3.5 left-3.5 pointer-events-none text-slate-400">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <textarea
                      id="patientMessage"
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={t.formMessagePlaceholder}
                      className="block w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors shadow-2xs"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <motion.button
                    whileTap={{ scale: 0.99 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 text-base font-extrabold text-white bg-gradient-to-r from-teal-700 to-sky-700 hover:from-teal-800 hover:to-sky-800 active:bg-teal-900 disabled:bg-slate-400 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-teal-600"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>{t.formSubmitting}</span>
                      </>
                    ) : (
                      <>
                        <Calendar className="w-5 h-5" />
                        <span>{t.formSubmit}</span>
                      </>
                    )}
                  </motion.button>
                </div>

              </form>
            </div>

            {/* Right 5 Cols: Live Consultation Preview Card */}
            <div className="lg:col-span-5 sticky top-28 space-y-4">
              <div className="rounded-3xl bg-white border border-slate-200/90 shadow-sm p-6 space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-800 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                    <span>{language === 'ta' ? 'நேரலை முன்பதிவு முன்னோட்டம்' : 'Live Booking Summary'}</span>
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400">Jaffna OPD Desk</span>
                </div>

                {/* Doctor mini profile */}
                <div className="flex items-center gap-3.5">
                  <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                    <Image
                      src={selectedDoctor.photoUrl}
                      alt={selectedDoctor.nameEn}
                      fill
                      className="object-cover"
                      sizes="56px"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="text-base font-extrabold text-slate-900 leading-tight">
                      {language === 'ta' ? selectedDoctor.nameTa : selectedDoctor.nameEn}
                    </h4>
                    <p className="text-xs text-teal-700 font-semibold mt-0.5">
                      {language === 'ta' ? selectedDoctor.specializationTa : selectedDoctor.specializationEn}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {language === 'ta' ? selectedDoctor.experienceTa : selectedDoctor.experienceEn}
                    </p>
                  </div>
                </div>

                {/* Selected Details List */}
                <div className="space-y-3 pt-3 border-t border-slate-100 text-xs">
                  <div className="flex items-center justify-between py-1">
                    <span className="text-slate-500 font-medium">{language === 'ta' ? 'திகதி:' : 'Date:'}</span>
                    <span className="font-bold text-slate-800 font-mono">{appointmentDate}</span>
                  </div>

                  <div className="flex items-center justify-between py-1">
                    <span className="text-slate-500 font-medium">{language === 'ta' ? 'நேர இடைவெளி:' : 'Time Slot:'}</span>
                    <span className="font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
                      {language === 'ta' ? selectedSlotObj.timeTa : selectedSlotObj.timeEn}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-1">
                    <span className="text-slate-500 font-medium">{language === 'ta' ? 'அமைவிடம்:' : 'Location:'}</span>
                    <span className="font-bold text-slate-800">Hospital Road, Jaffna</span>
                  </div>

                  <div className="flex items-center justify-between py-1">
                    <span className="text-slate-500 font-medium">{language === 'ta' ? 'ஆலோசனை அறை:' : 'Consultation Desk:'}</span>
                    <span className="font-bold text-slate-800">OPD Room 01 (Ground Floor)</span>
                  </div>
                </div>

                {/* Reassurance points */}
                <div className="p-3.5 rounded-2xl bg-teal-50/70 border border-teal-100 text-teal-900 space-y-1.5 text-xs">
                  <div className="flex items-center gap-2 font-bold">
                    <Check className="w-3.5 h-3.5 text-teal-700" />
                    <span>{language === 'ta' ? 'தாய்மொழி வழி கனிவான கவனிப்பு' : 'Bilingual Mother-Tongue Consultation'}</span>
                  </div>
                  <p className="text-[11px] text-teal-800 leading-relaxed">
                    {language === 'ta'
                      ? 'மருத்துவ விபரங்கள் மற்றும் மருந்துச் சீட்டுகள் முழுமையாகத் தமிழில் விளக்கப்படும்.'
                      : 'Prescriptions and lifestyle advice discussed clearly in Tamil or English.'}
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
