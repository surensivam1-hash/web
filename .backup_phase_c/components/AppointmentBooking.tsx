'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ConfirmedBooking } from '@/lib/types';
import { DOCTORS_DATA, AVAILABLE_SLOTS, CLINIC_INFO } from '@/lib/data';
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
  Loader2,
  Stethoscope,
  Sparkles,
  Check,
  Copy,
  ShieldCheck,
} from 'lucide-react';
import { motion } from 'motion/react';

interface AppointmentBookingProps {
  selectedDoctorId: string;
  onDoctorChange: (id: string) => void;
  prefillMessage?: string;
}

export function AppointmentBooking({
  selectedDoctorId,
  onDoctorChange,
  prefillMessage,
}: AppointmentBookingProps) {
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
      newErrors.patientName = 'Patient full name is required.';
    } else if (patientName.trim().length < 2) {
      newErrors.patientName = 'Name must be at least 2 characters.';
    }

    const phoneValidation = validatePhoneNumber(phoneNumber);
    if (!phoneValidation.isValid) {
      newErrors.phoneNumber = phoneValidation.errorMessage || 'Please provide a valid phone number.';
    }

    if (!selectedDoctorId) {
      newErrors.doctorId = 'Please select a doctor.';
    }

    const dateValidation = validateAppointmentDate(appointmentDate);
    if (!dateValidation.isValid) {
      newErrors.appointmentDate = dateValidation.errorMessage || 'Invalid appointment date.';
    }

    if (!selectedSlot) {
      newErrors.slot = 'Please choose an available time slot.';
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
      const booking: ConfirmedBooking = {
        referenceId: generateBookingReference('NLM'),
        patientName: patientName.trim(),
        phoneNumber: phoneNumber.trim(),
        doctor: selectedDoctor,
        appointmentDate,
        timeSlot: selectedSlotObj.time,
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
    const content = generateIcsCalendarContent({
      title: `Clinic Consultation with ${confirmedBooking.doctor.name}`,
      description: `Appointment reference: ${confirmedBooking.referenceId}. Appointment at Nalam Health Clinic Jaffna. Patient: ${confirmedBooking.patientName}. Contact: ${CLINIC_INFO.phonePrimary}. Note: Frontend prototype.`,
      location: CLINIC_INFO.address,
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
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-700 mb-2.5">
            <span className="w-2 h-2 rounded-full bg-teal-600" />
            <span>Online Appointment</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            Schedule Your Clinic Visit
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Select your preferred doctor, date, and convenient consultation slot. Instant demonstration confirmation provided.
          </p>
        </div>

        {/* Frontend Prototype Notice Banner */}
        <div className="mb-10 px-4 py-3 sm:px-5 sm:py-3.5 rounded-2xl bg-sky-50/90 border border-sky-200 shadow-2xs flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="text-xs sm:text-sm text-slate-700 leading-normal">
            <span className="font-bold text-slate-900">Frontend Prototype Notice:</span> This is a demonstration interface for Nalam Health Clinic in Jaffna. Appointment bookings are simulated for review and testing purposes.
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
                    Appointment Request Submitted
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    Here is your consultation slip. Please review your details below.
                  </p>
                </div>
              </div>

              {/* Reference Badge with Copy */}
              <div className="text-right shrink-0">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                  Reference Number
                </span>
                <div className="flex items-center gap-1.5 mt-0.5 justify-end">
                  <span className="font-mono text-base sm:text-lg font-extrabold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-lg border border-teal-200">
                    {confirmedBooking.referenceId}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyReference}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
                    title="Copy Reference Code"
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
                  Consulting Doctor
                </span>
                <p className="text-base font-extrabold text-slate-900">
                  {confirmedBooking.doctor.name}
                </p>
                <p className="text-xs text-teal-700 font-semibold">
                  {confirmedBooking.doctor.specialization}
                </p>
              </div>

              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Date & Time
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
                  Patient Name
                </span>
                <p className="font-extrabold text-slate-900">
                  {confirmedBooking.patientName}
                </p>
              </div>

              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Contact Phone
                </span>
                <p className="font-mono font-bold text-slate-900">
                  {confirmedBooking.phoneNumber}
                </p>
              </div>

              {confirmedBooking.message && (
                <div className="sm:col-span-2">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                    Patient Message / Reason
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
                Remember: This is a frontend-only prototype website without a backend database. Your appointment form has been successfully validated, but the request has not been sent to the physical clinic. Please contact the clinic directly via phone or WhatsApp for real clinical visits.
              </p>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleDownloadCalendar}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
                  title="Download iCalendar file"
                >
                  <Download className="w-4 h-4 text-slate-600" />
                  <span>Download Calendar (.ics)</span>
                </button>

                <button
                  type="button"
                  onClick={handlePrintSlip}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
                  title="Print this consultation slip"
                >
                  <Printer className="w-4 h-4 text-slate-600" />
                  <span>Print Demo Slip</span>
                </button>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Book Another Appointment</span>
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
                      Patient Full Name <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        id="patientName"
                        name="patientName"
                        autoComplete="name"
                        value={patientName}
                        onChange={(e) => {
                          setPatientName(e.target.value);
                          if (errors.patientName) {
                            setErrors((prev) => ({ ...prev, patientName: '' }));
                          }
                        }}
                        placeholder="e.g. S. Vijayaraj"
                        aria-required="true"
                        aria-invalid={!!errors.patientName}
                        aria-describedby={errors.patientName ? 'patientName-error' : undefined}
                        className={`block w-full pl-10 pr-4 py-3 text-sm rounded-xl border ${
                          errors.patientName ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300 bg-white'
                        } text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors shadow-2xs`}
                        required
                      />
                    </div>
                    {errors.patientName && (
                      <p id="patientName-error" className="mt-1.5 text-xs text-rose-600 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.patientName}</span>
                      </p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label htmlFor="phoneNumber" className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-2">
                      Phone Number <span className="text-rose-500" aria-hidden="true">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Phone className="w-4 h-4" />
                      </div>
                      <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        autoComplete="tel"
                        value={phoneNumber}
                        onChange={(e) => {
                          setPhoneNumber(e.target.value);
                          if (errors.phoneNumber) {
                            setErrors((prev) => ({ ...prev, phoneNumber: '' }));
                          }
                        }}
                        placeholder="e.g. 077 123 4567 or +94 77 123 4567"
                        aria-required="true"
                        aria-invalid={!!errors.phoneNumber}
                        aria-describedby={errors.phoneNumber ? 'phoneNumber-error' : 'phoneNumber-desc'}
                        className={`block w-full pl-10 pr-4 py-3 text-sm rounded-xl border ${
                          errors.phoneNumber ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300 bg-white'
                        } text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors shadow-2xs`}
                        required
                      />
                    </div>
                    {errors.phoneNumber ? (
                      <p id="phoneNumber-error" className="mt-1.5 text-xs text-rose-600 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.phoneNumber}</span>
                      </p>
                    ) : (
                      <p id="phoneNumber-desc" className="mt-1.5 text-[11px] text-slate-500">
                        Sri Lankan mobile format (e.g., 07X XXX XXXX)
                      </p>
                    )}
                  </div>
                </div>

                {/* Row 2: Doctor Selection */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="doctorSelect" className="block text-xs font-extrabold uppercase tracking-wider text-slate-700">
                      Select Doctor & Specialty <span className="text-rose-500" aria-hidden="true">*</span>
                    </label>
                    <span className="text-[11px] text-teal-700 font-semibold hidden sm:inline">
                      4 Specialists available
                    </span>
                  </div>

                  {/* Visual Doctor Quick Select Tiles */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3" role="group" aria-label="Quick Doctor Select">
                    {DOCTORS_DATA.map((doc) => {
                      const isSelected = selectedDoctorId === doc.id;
                      return (
                        <button
                          key={doc.id}
                          type="button"
                          aria-label={`Select ${doc.name}, ${doc.specialization}`}
                          aria-pressed={isSelected}
                          onClick={() => {
                            onDoctorChange(doc.id);
                            if (errors.doctorId) {
                              setErrors((prev) => ({ ...prev, doctorId: '' }));
                            }
                          }}
                          className={`p-2 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-2 min-h-[48px] ${
                            isSelected
                              ? 'bg-teal-50 border-teal-500 ring-2 ring-teal-200 shadow-2xs'
                              : 'bg-slate-50 border-slate-200/80 hover:bg-white hover:border-slate-300'
                          }`}
                        >
                          <div className="relative w-8 h-8 rounded-lg overflow-hidden shrink-0 border border-slate-200">
                            <Image
                              src={doc.photoUrl}
                              alt={doc.name}
                              fill
                              className="object-cover"
                              sizes="32px"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-[11px] font-bold text-slate-900 truncate leading-tight">
                              {doc.name.replace(/^Dr\.\s*/, '')}
                            </p>
                            <p className="text-[9.5px] text-teal-700 truncate font-semibold leading-tight">
                              {doc.specialization}
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
                      aria-required="true"
                      aria-invalid={!!errors.doctorId}
                      aria-describedby={errors.doctorId ? 'doctorId-error' : undefined}
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
                      <option value="">-- Please choose a doctor --</option>
                      {DOCTORS_DATA.map((doc) => (
                        <option key={doc.id} value={doc.id}>
                          {doc.name} — {doc.specialization}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.doctorId && (
                    <p id="doctorId-error" className="mt-1.5 text-xs text-rose-600 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.doctorId}</span>
                    </p>
                  )}
                </div>

                {/* Row 3: Appointment Date */}
                <div>
                  <label htmlFor="appointmentDate" className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-2">
                    Appointment Date <span className="text-rose-500" aria-hidden="true">*</span>
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
                      aria-required="true"
                      aria-invalid={!!errors.appointmentDate}
                      aria-describedby={errors.appointmentDate ? 'appointmentDate-error' : undefined}
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
                    <p id="appointmentDate-error" className="mt-1.5 text-xs text-rose-600 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.appointmentDate}</span>
                    </p>
                  )}
                </div>

                {/* Row 4: Available Time Slots */}
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-2.5">
                    Preferred Time Slot <span className="text-rose-500">*</span>
                  </label>
                  
                  {/* Morning Slots */}
                  <div className="mb-4">
                    <p className="text-xs font-bold text-slate-500 mb-2 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-teal-600" />
                      <span>Morning Sessions</span>
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2" role="group" aria-label="Morning Time Slots">
                      {AVAILABLE_SLOTS.filter((s) => s.period === 'morning').map((slot) => {
                        const isSelected = selectedSlot === slot.id;
                        return (
                          <button
                            key={slot.id}
                            type="button"
                            aria-label={`${slot.time} morning consultation slot`}
                            aria-pressed={isSelected}
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
                            {slot.time}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Evening Slots */}
                  <div>
                    <p className="text-xs font-bold text-slate-500 mb-2 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-sky-600" />
                      <span>Evening Sessions</span>
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2" role="group" aria-label="Evening Time Slots">
                      {AVAILABLE_SLOTS.filter((s) => s.period === 'evening').map((slot) => {
                        const isSelected = selectedSlot === slot.id;
                        return (
                          <button
                            key={slot.id}
                            type="button"
                            aria-label={`${slot.time} evening consultation slot`}
                            aria-pressed={isSelected}
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
                            {slot.time}
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
                    Reason for Visit or Short Message (Optional)
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
                      placeholder="e.g. Routine blood pressure check, fever, child immunization review..."
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
                        <span>Validating & Booking Slot...</span>
                      </>
                    ) : (
                      <>
                        <Calendar className="w-5 h-5" />
                        <span>Confirm Appointment</span>
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
                    <span>Live Booking Summary</span>
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400">Jaffna OPD Desk</span>
                </div>

                {/* Doctor mini profile */}
                <div className="flex items-center gap-3.5">
                  <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                    <Image
                      src={selectedDoctor.photoUrl}
                      alt={selectedDoctor.name}
                      fill
                      className="object-cover"
                      sizes="56px"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="text-base font-extrabold text-slate-900 leading-tight">
                      {selectedDoctor.name}
                    </h4>
                    <p className="text-xs text-teal-700 font-semibold mt-0.5">
                      {selectedDoctor.specialization}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {selectedDoctor.experience}
                    </p>
                  </div>
                </div>

                {/* Selected Details List */}
                <div className="space-y-3 pt-3 border-t border-slate-100 text-xs">
                  <div className="flex items-center justify-between py-1">
                    <span className="text-slate-500 font-medium">Date:</span>
                    <span className="font-bold text-slate-800 font-mono">{appointmentDate}</span>
                  </div>

                  <div className="flex items-center justify-between py-1">
                    <span className="text-slate-500 font-medium">Time Slot:</span>
                    <span className="font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
                      {selectedSlotObj.time}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-1">
                    <span className="text-slate-500 font-medium">Location:</span>
                    <span className="font-bold text-slate-800">Hospital Road, Jaffna</span>
                  </div>

                  <div className="flex items-center justify-between py-1">
                    <span className="text-slate-500 font-medium">Consultation Desk:</span>
                    <span className="font-bold text-slate-800">OPD Room 01 (Ground Floor)</span>
                  </div>
                </div>

                {/* Reassurance points */}
                <div className="p-3.5 rounded-2xl bg-teal-50/70 border border-teal-100 text-teal-900 space-y-1.5 text-xs">
                  <div className="flex items-center gap-2 font-bold">
                    <Check className="w-3.5 h-3.5 text-teal-700" />
                    <span>Bilingual Mother-Tongue & English Consultation</span>
                  </div>
                  <p className="text-[11px] text-teal-800 leading-relaxed">
                    Prescriptions and lifestyle advice discussed clearly in English or Tamil.
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
