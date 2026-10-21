'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Doctor } from '@/lib/types';
import { DOCTORS_DATA } from '@/lib/data';
import {
  Calendar,
  GraduationCap,
  Briefcase,
  Clock,
  Languages as LanguagesIcon,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Award,
  Stethoscope,
  HeartPulse,
  Baby,
  Activity,
  X,
  UserCheck,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DoctorsProps {
  onSelectDoctor: (doctorId: string) => void;
}

type CardTab = 'overview' | 'qualifications' | 'schedule';

export function Doctors({ onSelectDoctor }: DoctorsProps) {
  const [activeTabs, setActiveTabs] = useState<Record<string, CardTab>>({
    'dr-kandeepan': 'overview',
    'dr-priya': 'overview',
    'dr-tharmarajah': 'overview',
    'dr-ananya': 'overview',
  });
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [modalDoctor, setModalDoctor] = useState<Doctor | null>(null);

  const setDoctorTab = (docId: string, tab: CardTab) => {
    setActiveTabs((prev) => ({ ...prev, [docId]: tab }));
  };

  const filteredDoctors = DOCTORS_DATA.filter((doc) => {
    if (selectedFilter === 'all') return true;
    return doc.id === selectedFilter;
  });

  const getDoctorIcon = (docId: string) => {
    switch (docId) {
      case 'dr-kandeepan':
        return <Stethoscope className="w-3.5 h-3.5 text-teal-600" />;
      case 'dr-priya':
        return <Baby className="w-3.5 h-3.5 text-pink-600" />;
      case 'dr-tharmarajah':
        return <HeartPulse className="w-3.5 h-3.5 text-rose-600" />;
      case 'dr-ananya':
        return <Activity className="w-3.5 h-3.5 text-indigo-600" />;
      default:
        return <Stethoscope className="w-3.5 h-3.5 text-teal-600" />;
    }
  };

  const filterOptions = [
    { id: 'all', label: 'All Doctors (4)' },
    { id: 'dr-kandeepan', label: 'Family Medicine' },
    { id: 'dr-priya', label: 'Pediatrics' },
    { id: 'dr-tharmarajah', label: 'Cardiology' },
    { id: 'dr-ananya', label: 'Women’s Health' },
  ];

  return (
    <section id="doctors" className="py-20 lg:py-28 bg-gradient-to-b from-white via-slate-50/50 to-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3">
              <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse" />
              <span>Expert Doctors</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-slate-900 tracking-[-0.02em] leading-tight text-balance">
              Experienced Medical Professionals
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
              Our caring doctors bring recognized clinical qualifications, deep community understanding, and gentle bedside manner.
            </p>
          </div>

          {/* Specialty Filter Segmented Control */}
          <div className="flex items-center gap-1.5 p-1.5 bg-slate-100/90 rounded-2xl border border-slate-200 self-start md:self-auto overflow-x-auto max-w-full shadow-2xs" role="tablist" aria-label="Specialty Filter">
            {filterOptions.map((opt) => {
              const isSelected = selectedFilter === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedFilter(opt.id)}
                  className={`relative px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap z-10 ${
                    isSelected
                      ? 'text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="filterActivePill"
                      className="absolute inset-0 bg-white rounded-xl shadow-xs -z-10"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    />
                  )}
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 4 Doctors Elevated Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {filteredDoctors.map((doctor) => {
            const currentTab = activeTabs[doctor.id] || 'overview';

            return (
              <motion.div
                key={doctor.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="group flex flex-col justify-between rounded-3xl bg-white border border-slate-200 hover:border-teal-400/90 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div>
                  {/* Doctor Portrait Header */}
                  <div className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden">
                    <Image
                      src={doctor.photoUrl}
                      alt={`Portrait of ${doctor.name}, ${doctor.specialization}`}
                      fill
                      className="object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/25 to-transparent opacity-95" />
                    
                    {/* Floating Specialty & Verification Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                      <div className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider text-teal-800 shadow-xs border border-white/60">
                        {getDoctorIcon(doctor.id)}
                        <span>Verified Specialist</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => setModalDoctor(doctor)}
                        className="bg-slate-900/70 hover:bg-slate-900 backdrop-blur-md text-white p-1.5 rounded-full transition-colors cursor-pointer"
                        title="View Full Profile"
                        aria-label={`View full profile of ${doctor.name}`}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Floating Doctor Name on Image Overlay */}
                    <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
                      <h3 className="text-lg font-bold leading-tight drop-shadow-xs tracking-tight">
                        {doctor.name}
                      </h3>
                      <p className="text-xs text-teal-200 font-medium mt-0.5 opacity-90">
                        {doctor.languages}
                      </p>
                    </div>
                  </div>

                  {/* Doctor Details Body */}
                  <div className="p-5 space-y-4">
                    {/* Specialization & Experience */}
                    <div>
                      <p className="text-xs font-extrabold uppercase tracking-wider text-teal-700 leading-snug line-clamp-1">
                        {doctor.specialization}
                      </p>
                      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 mt-1.5">
                        <Briefcase className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                        <span className="truncate">{doctor.experience}</span>
                      </div>
                    </div>

                    {/* Interactive Tab Switcher on Card */}
                    <div className="relative flex items-center gap-1 p-1 bg-slate-100/80 rounded-xl border border-slate-200/70" role="tablist" aria-label={`${doctor.name} information tabs`}>
                      <button
                        type="button"
                        role="tab"
                        id={`tab-${doctor.id}-overview`}
                        aria-controls={`panel-${doctor.id}-overview`}
                        aria-selected={currentTab === 'overview'}
                        onClick={() => setDoctorTab(doctor.id, 'overview')}
                        className={`relative flex-1 py-1 text-[11px] font-bold rounded-lg transition-colors cursor-pointer text-center z-10 ${
                          currentTab === 'overview'
                            ? 'text-teal-900'
                            : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        {currentTab === 'overview' && (
                          <motion.div
                            layoutId={`tabIndicator-${doctor.id}`}
                            className="absolute inset-0 bg-white rounded-lg shadow-2xs -z-10"
                            transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                          />
                        )}
                        Bio
                      </button>
                      <button
                        type="button"
                        role="tab"
                        id={`tab-${doctor.id}-qualifications`}
                        aria-controls={`panel-${doctor.id}-qualifications`}
                        aria-selected={currentTab === 'qualifications'}
                        onClick={() => setDoctorTab(doctor.id, 'qualifications')}
                        className={`relative flex-1 py-1 text-[11px] font-bold rounded-lg transition-colors cursor-pointer text-center z-10 ${
                          currentTab === 'qualifications'
                            ? 'text-teal-900'
                            : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        {currentTab === 'qualifications' && (
                          <motion.div
                            layoutId={`tabIndicator-${doctor.id}`}
                            className="absolute inset-0 bg-white rounded-lg shadow-2xs -z-10"
                            transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                          />
                        )}
                        Degrees
                      </button>
                      <button
                        type="button"
                        role="tab"
                        id={`tab-${doctor.id}-schedule`}
                        aria-controls={`panel-${doctor.id}-schedule`}
                        aria-selected={currentTab === 'schedule'}
                        onClick={() => setDoctorTab(doctor.id, 'schedule')}
                        className={`relative flex-1 py-1 text-[11px] font-bold rounded-lg transition-colors cursor-pointer text-center z-10 ${
                          currentTab === 'schedule'
                            ? 'text-teal-900'
                            : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        {currentTab === 'schedule' && (
                          <motion.div
                            layoutId={`tabIndicator-${doctor.id}`}
                            className="absolute inset-0 bg-white rounded-lg shadow-2xs -z-10"
                            transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                          />
                        )}
                        Hours
                      </button>
                    </div>

                    {/* Tab Panes */}
                    <div
                      id={`panel-${doctor.id}-${currentTab}`}
                      role="tabpanel"
                      aria-labelledby={`tab-${doctor.id}-${currentTab}`}
                      className="min-h-[96px] text-xs"
                    >
                      {currentTab === 'overview' && (
                        <div className="animate-in fade-in-50 duration-200">
                          <p className="text-slate-600 leading-relaxed line-clamp-4">
                            {doctor.bio}
                          </p>
                          <button
                            type="button"
                            onClick={() => setModalDoctor(doctor)}
                            className="mt-2 text-[11px] font-bold text-teal-700 hover:text-teal-900 inline-flex items-center gap-1 cursor-pointer"
                          >
                            <span>Read more details</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      )}

                      {currentTab === 'qualifications' && (
                        <div className="space-y-2 animate-in fade-in-50 duration-200 text-slate-600">
                          <div className="flex items-start gap-2">
                            <GraduationCap className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                            <div>
                              <span className="font-semibold text-slate-800 block">Qualifications:</span>
                              <span className="text-[11px] text-slate-600 leading-tight">{doctor.qualifications}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 pt-1 border-t border-slate-100 text-[11px]">
                            <LanguagesIcon className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                            <span>Languages: {doctor.languages}</span>
                          </div>
                        </div>
                      )}

                      {currentTab === 'schedule' && (
                        <div className="space-y-1.5 animate-in fade-in-50 duration-200 text-slate-600">
                          <div className="flex items-start gap-2">
                            <Clock className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                            <div>
                              <span className="font-semibold text-slate-800 block">Consultation Hours:</span>
                              <span className="text-[11px] text-slate-600 leading-relaxed">{doctor.consultationDays}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5 text-[11px] text-teal-700 font-semibold pt-1">
                            <CheckCircle2 className="w-3 h-3 text-teal-600" />
                            <span>Regular Outpatient Clinic</span>
                          </div>
                        </div>
                      )}
                    </div>

                  </div>
                </div>

                {/* Book With Doctor CTA Button */}
                <div className="p-5 pt-0">
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => onSelectDoctor(doctor.id)}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-bold text-teal-800 bg-teal-50/90 hover:bg-gradient-to-r hover:from-teal-700 hover:to-sky-700 hover:text-white border border-teal-200 rounded-2xl transition-all duration-200 cursor-pointer shadow-2xs hover:shadow-md focus-visible:outline-2 focus-visible:outline-teal-600"
                    aria-label={`Book appointment with ${doctor.name}`}
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book with {doctor.name.split(' ')[1] || doctor.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-0.5 opacity-80" />
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Respectful Disclaimer Banner */}
        <div className="mt-12 p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3.5 text-xs text-slate-600">
          <span className="font-bold text-slate-800">Notice on Doctor Information:</span> Doctor profiles, qualifications, and schedules are illustrative placeholders for this medical clinic website template. In production, configure with verified Sri Lanka Medical Council (SLMC) credentials.
        </div>

      </div>

      {/* Full Doctor Profile Modal */}
      <AnimatePresence>
        {modalDoctor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-doctor-title"
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto"
            >
              <button
                type="button"
                onClick={() => setModalDoctor(null)}
                className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden shrink-0 border border-slate-200 shadow-sm">
                  <Image
                    src={modalDoctor.photoUrl}
                    alt={modalDoctor.name}
                    fill
                    className="object-cover"
                    sizes="128px"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="text-center sm:text-left space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-[10px] font-bold uppercase tracking-wider">
                    <UserCheck className="w-3 h-3 text-teal-600" />
                    <span>Northern Sri Lanka Consultant</span>
                  </div>
                  <h3 id="modal-doctor-title" className="text-xl font-bold text-slate-900">
                    {modalDoctor.name}
                  </h3>
                  <p className="text-sm font-semibold text-teal-700">
                    {modalDoctor.specialization}
                  </p>
                  <p className="text-xs text-slate-500">
                    Languages: {modalDoctor.languages}
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4 text-xs sm:text-sm text-slate-600 border-t border-slate-100 pt-5">
                <div>
                  <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-teal-600" />
                    <span>Clinical Background & Approach</span>
                  </h4>
                  <p className="leading-relaxed text-slate-600">
                    {modalDoctor.bio}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="font-bold text-slate-800 block text-xs">Qualifications</span>
                    <span className="text-xs text-slate-600 mt-0.5 block">{modalDoctor.qualifications}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="font-bold text-slate-800 block text-xs">Experience</span>
                    <span className="text-xs text-slate-600 mt-0.5 block">{modalDoctor.experience}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-teal-50/60 border border-teal-200 text-xs">
                  <span className="font-bold text-teal-900 block flex items-center gap-1.5 mb-1">
                    <Clock className="w-3.5 h-3.5 text-teal-700" />
                    <span>Consultation Hours</span>
                  </span>
                  <span className="text-slate-700">
                    {modalDoctor.consultationDays}
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalDoctor(null)}
                  className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-800 rounded-xl transition-colors cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const docId = modalDoctor.id;
                    setModalDoctor(null);
                    onSelectDoctor(docId);
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book an Appointment</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
