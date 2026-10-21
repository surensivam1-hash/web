'use client';

import React from 'react';
import { SERVICES_DATA } from '@/lib/data';
import {
  Stethoscope,
  HeartPulse,
  Baby,
  Users,
  Activity,
  ShieldCheck,
  ArrowRight,
  Check,
  Clock,
  UserCheck,
} from 'lucide-react';
import { motion } from 'motion/react';

interface ServicesProps {
  onBookService: (serviceId: string, serviceTitle: string) => void;
}

export function Services({ onBookService }: ServicesProps) {
  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Stethoscope':
        return <Stethoscope className="w-6 h-6 text-teal-700" />;
      case 'HeartPulse':
        return <HeartPulse className="w-6 h-6 text-rose-600" />;
      case 'Baby':
        return <Baby className="w-6 h-6 text-pink-600" />;
      case 'Users':
        return <Users className="w-6 h-6 text-sky-700" />;
      case 'Activity':
        return <Activity className="w-6 h-6 text-indigo-600" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-emerald-600" />;
      default:
        return <Stethoscope className="w-6 h-6 text-teal-700" />;
    }
  };

  const getServiceDoctorTag = (serviceId: string) => {
    switch (serviceId) {
      case 'general-family-medicine':
        return 'Lead: Dr. S. Kandeepan';
      case 'cardiology-chronic-care':
        return 'Lead: Dr. K. Tharmarajah';
      case 'pediatrics-child-health':
        return 'Lead: Dr. Priyadharshini Sivakumar';
      case 'womens-health-maternity':
        return 'Lead: Dr. Ananya Balasubramaniam';
      default:
        return 'Consultant Team Available';
    }
  };

  return (
    <section id="services" className="py-20 lg:py-28 bg-gradient-to-b from-slate-50/80 via-white to-slate-50/80 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3">
              <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse" />
              <span>Medical Services</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-slate-900 tracking-[-0.02em] leading-tight text-balance">
              Comprehensive Healthcare Under One Roof
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
              Specialized diagnostic and outpatient services designed to support your family’s ongoing health and well-being.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-slate-200 text-slate-700 text-xs font-bold shadow-2xs self-start md:self-auto">
            <Clock className="w-4 h-4 text-teal-600" />
            <span>Session Duration: 20–30 mins</span>
          </div>
        </div>

        {/* 6-Card Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {SERVICES_DATA.map((service, index) => {
            const doctorTag = getServiceDoctorTag(service.id);

            return (
              <motion.div
                key={service.id}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                className="group relative flex flex-col justify-between p-7 sm:p-8 rounded-3xl bg-white border border-slate-200 hover:border-teal-400 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div>
                  {/* Service Icon & Number */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-50 via-sky-50 to-white border border-teal-100/80 group-hover:scale-105 group-hover:border-teal-300 flex items-center justify-center transition-all duration-300 shadow-2xs">
                      {getServiceIcon(service.iconName)}
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-400 px-2.5 py-1 bg-slate-50 rounded-lg border border-slate-100">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Doctor Lead Tag */}
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-teal-800 bg-teal-50/80 px-2.5 py-0.5 rounded-full mb-3 border border-teal-200/60">
                    <UserCheck className="w-3 h-3 text-teal-600 shrink-0" />
                    <span>{doctorTag}</span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-900 transition-colors mb-2.5 leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                    {service.description}
                  </p>

                  {/* Key highlights */}
                  <div className="space-y-2.5 border-t border-slate-100 pt-5 mb-6">
                    {service.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action */}
                <button
                  type="button"
                  onClick={() => onBookService(service.id, service.title)}
                  className="inline-flex items-center justify-between w-full pt-4 border-t border-slate-100 text-xs font-bold text-teal-700 group-hover:text-teal-900 cursor-pointer"
                  aria-label={`Book appointment for ${service.title}`}
                >
                  <span className="underline-offset-4 group-hover:underline">
                    Schedule This Consultation
                  </span>
                  <div className="w-7 h-7 rounded-full bg-teal-50 group-hover:bg-teal-700 group-hover:text-white flex items-center justify-center transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
