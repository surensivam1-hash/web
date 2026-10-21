export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  qualifications: string;
  experience: string;
  consultationDays: string;
  languages: string;
  photoUrl: string;
  bio: string;
}

export interface MedicalService {
  id: string;
  iconName: string;
  title: string;
  description: string;
  highlights: string[];
}

export interface TimeSlot {
  id: string;
  time: string;
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
  name: string;
  tagline: string;
  address: string;
  phonePrimary: string;
  phoneSecondary: string;
  whatsappNumber: string;
  whatsappDisplay: string;
  email: string;
  hours: {
    weekdays: string;
    saturday: string;
    sunday: string;
    emergencyNote: string;
  };
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'appointments' | 'lab' | 'languages' | 'location';
}

export interface ClinicAmenity {
  id: string;
  title: string;
  description: string;
  iconName: string;
}
