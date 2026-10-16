export type Language = 'en' | 'ta';

export interface Doctor {
  id: string;
  nameEn: string;
  nameTa: string;
  specializationEn: string;
  specializationTa: string;
  qualifications: string;
  experienceEn: string;
  experienceTa: string;
  consultationDaysEn: string;
  consultationDaysTa: string;
  languagesEn: string;
  languagesTa: string;
  photoUrl: string;
  bioEn: string;
  bioTa: string;
}

export interface MedicalService {
  id: string;
  iconName: string;
  titleEn: string;
  titleTa: string;
  descriptionEn: string;
  descriptionTa: string;
  highlightsEn: string[];
  highlightsTa: string[];
}

export interface TimeSlot {
  id: string;
  timeEn: string;
  timeTa: string;
  period: 'morning' | 'evening';
  available: boolean;
}

export interface AppointmentFormData {
  patientName: string;
  phoneNumber: string;
  doctorId: string;
  appointmentDate: string;
  timeSlot: string;
  message?: string;
}

export interface ConfirmedBooking {
  referenceId: string;
  patientName: string;
  phoneNumber: string;
  doctor: Doctor;
  appointmentDate: string;
  timeSlot: string;
  message?: string;
  bookingTimestamp: string;
}

export interface ClinicInfo {
  nameEn: string;
  nameTa: string;
  taglineEn: string;
  taglineTa: string;
  addressEn: string;
  addressTa: string;
  phonePrimary: string;
  phoneSecondary: string;
  whatsappNumber: string;
  whatsappDisplay: string;
  email: string;
  hoursEn: {
    weekdays: string;
    saturday: string;
    sunday: string;
    emergencyNote: string;
  };
  hoursTa: {
    weekdays: string;
    saturday: string;
    sunday: string;
    emergencyNote: string;
  };
}

export interface FaqItem {
  id: string;
  questionEn: string;
  questionTa: string;
  answerEn: string;
  answerTa: string;
  category: 'appointments' | 'lab' | 'languages' | 'location';
}

export interface ClinicAmenity {
  id: string;
  titleEn: string;
  titleTa: string;
  descriptionEn: string;
  descriptionTa: string;
  iconName: string;
}
