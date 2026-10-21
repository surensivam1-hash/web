import { ClinicInfo, Doctor, MedicalService, TimeSlot, FaqItem, ClinicAmenity } from './types';

export const CLINIC_INFO: ClinicInfo = {
  name: 'Nalam Health Clinic',
  tagline: 'Trusted Healthcare for Your Family in Northern Sri Lanka',
  address: '142 Hospital Road, Jaffna, Northern Province, Sri Lanka',
  phonePrimary: '+94 21 222 4500',
  phoneSecondary: '+94 77 123 4567',
  whatsappNumber: '94771234567',
  whatsappDisplay: '+94 77 123 4567',
  email: 'care@nalamclinic-jaffna.lk',
  hours: {
    weekdays: 'Monday – Friday: 7:30 AM – 8:00 PM',
    saturday: 'Saturday: 7:30 AM – 6:30 PM',
    sunday: 'Sunday: 8:00 AM – 1:00 PM',
    emergencyNote: 'For acute emergencies, call 1990 (Suwa Seriya) or visit Teaching Hospital Jaffna ER immediately.',
  },
};

export const DOCTORS_DATA: Doctor[] = [
  {
    id: 'dr-kandeepan',
    name: 'Dr. S. Kandeepan',
    specialization: 'Consultant Physician & Family Medicine Specialist',
    qualifications: 'MBBS (Jaffna), MD (Colombo), MRCP (UK) [Demo Placeholder]',
    experience: '16+ years clinical practice in Northern Sri Lanka',
    consultationDays: 'Mon, Tue, Thu, Sat (8:30 AM – 1:00 PM & 4:30 PM – 7:30 PM)',
    languages: 'Tamil, English, Sinhala',
    photoUrl: '/images/doctor_kandeepan.jpg',
    bio: 'Dedicated to comprehensive preventive health, managing diabetes, hypertension, and providing compassionate family primary care for Jaffna residents.',
  },
  {
    id: 'dr-priya',
    name: 'Dr. Priyadharshini Sivakumar',
    specialization: 'Consultant Pediatrician & Child Health Specialist',
    qualifications: 'MBBS (Peradeniya), DCH (Colombo), MD (Pediatrics) [Demo Placeholder]',
    experience: '12+ years in child wellness and newborn care',
    consultationDays: 'Mon, Wed, Fri, Sat (9:00 AM – 1:30 PM)',
    languages: 'Tamil, English',
    photoUrl: '/images/doctor_priya.jpg',
    bio: 'Specializes in neonatal care, developmental milestones, childhood immunizations, and gentle pediatric treatments that put young children and parents at ease.',
  },
  {
    id: 'dr-tharmarajah',
    name: 'Dr. K. Tharmarajah',
    specialization: 'Senior Consultant Cardiologist & Chronic Disease Specialist',
    qualifications: 'MBBS (Colombo), MD (Medicine), FCCP, FRCP [Demo Placeholder]',
    experience: '20+ years in cardiovascular disease management',
    consultationDays: 'Tue, Thu, Fri (4:00 PM – 8:00 PM)',
    languages: 'Tamil, English',
    photoUrl: '/images/doctor_tharmarajah.jpg',
    bio: 'Focuses on cardiac prevention, echocardiography review, blood pressure control, and personalized lifestyle counseling tailored to Northern Sri Lankan diets.',
  },
  {
    id: 'dr-ananya',
    name: 'Dr. Ananya Balasubramaniam',
    specialization: 'Consultant Obstetrician & Women’s Health Specialist',
    qualifications: 'MBBS (Jaffna), MS (Obs & Gynae), MRCOG (UK) [Demo Placeholder]',
    experience: '14+ years in maternal-fetal care and women’s wellness',
    consultationDays: 'Mon, Wed, Sat (8:30 AM – 12:30 PM & 4:00 PM – 7:00 PM)',
    languages: 'Tamil, English, Sinhala',
    photoUrl: '/images/doctor_ananya.jpg',
    bio: 'Empowering women with comprehensive antenatal care, post-natal guidance, cervical screenings, and personalized gynecological care in a safe, confidential environment.',
  },
];

export const SERVICES_DATA: MedicalService[] = [
  {
    id: 'general-family-medicine',
    iconName: 'Stethoscope',
    title: 'General & Family Practice',
    description: 'Comprehensive outpatient care, fever clinic, routine check-ups, and coordinated medical attention for patients of all generations.',
    highlights: ['Acute Illness Treatment', 'Routine Physicals', 'Referral Coordination'],
  },
  {
    id: 'cardiology-chronic-care',
    iconName: 'HeartPulse',
    title: 'Chronic Disease & Heart Care',
    description: 'Rigorous management of diabetes mellitus, hypertension, cholesterol disorders, and early cardiovascular risk factor screening.',
    highlights: ['Blood Sugar Profiling', 'ECG Monitoring', 'Dietary & Lifestyle Guidance'],
  },
  {
    id: 'pediatrics-child-health',
    iconName: 'Baby',
    title: 'Pediatrics & Child Wellness',
    description: 'Gentle medical care for infants and children, regular growth monitoring, immunization guidance, and pediatric infection management.',
    highlights: ['Growth & Nutrition Tracking', 'Vaccination Support', 'Pediatric Consultations'],
  },
  {
    id: 'womens-health-maternity',
    iconName: 'Users',
    title: 'Women’s Health & Maternity',
    description: 'Compassionate care covering antenatal check-ups, postnatal recovery, fertility counseling, and routine gynecological screenings.',
    highlights: ['Antenatal Check-ups', 'Well-Woman Checkups', 'Reproductive Health Advice'],
  },
  {
    id: 'diagnostic-lab-ecg',
    iconName: 'Activity',
    title: 'Diagnostic Lab & Testing',
    description: 'Fast and reliable in-house diagnostic blood testing, rapid dengue & malaria panels, urine analysis, and digitized 12-lead ECG.',
    highlights: ['Same-Day Lab Reports', 'Digital 12-Lead ECG', 'Fasting Blood Panels'],
  },
  {
    id: 'elderly-preventive-care',
    iconName: 'ShieldCheck',
    title: 'Geriatric & Preventive Care',
    description: 'Holistic care for elderly family members, joint pain management, mobility support, medication reconciliation, and wellness counseling.',
    highlights: ['Mobility Assessment', 'Prescription Audits', 'Home Care Guidance'],
  },
];

export const AVAILABLE_SLOTS: TimeSlot[] = [
  { id: 'm1', time: '08:30 AM – 09:00 AM', period: 'morning', available: true },
  { id: 'm2', time: '09:00 AM – 09:30 AM', period: 'morning', available: true },
  { id: 'm3', time: '10:00 AM – 10:30 AM', period: 'morning', available: true },
  { id: 'm4', time: '11:00 AM – 11:30 AM', period: 'morning', available: true },
  { id: 'e1', time: '04:30 PM – 05:00 PM', period: 'evening', available: true },
  { id: 'e2', time: '05:30 PM – 06:00 PM', period: 'evening', available: true },
  { id: 'e3', time: '06:30 PM – 07:00 PM', period: 'evening', available: true },
  { id: 'e4', time: '07:00 PM – 07:30 PM', period: 'evening', available: true },
];

export const CLINIC_AMENITIES: ClinicAmenity[] = [
  {
    id: 'ramp',
    title: 'Step-Free Wheelchair Access',
    description: 'Dedicated ramp access from Hospital Road and wide corridors designed for senior citizens and mobility-impaired patients.',
    iconName: 'Accessibility',
  },
  {
    id: 'lounge',
    title: 'Air-Conditioned Waiting Hall',
    description: 'Clean, sanitized seating with filtered drinking water, high ventilation standards, and peaceful environment.',
    iconName: 'Wind',
  },
  {
    id: 'lab',
    title: 'On-Site Diagnostic Phlebotomy',
    description: 'Rapid blood panels, cholesterol profiling, and digital 12-lead ECG with same-day printed and WhatsApp reports.',
    iconName: 'FlaskConical',
  },
  {
    id: 'pharmacy',
    title: 'Essential Outpatient Pharmacy',
    description: 'Stocking approved cardiovascular, antibiotic, pediatric, and daily wellness medications with clear labeling.',
    iconName: 'Pill',
  },
  {
    id: 'generator',
    title: 'Uninterrupted Generator Power',
    description: 'Dedicated backup diesel generator ensuring ECG machines, laboratory coolers, and medical lighting stay operational.',
    iconName: 'Zap',
  },
  {
    id: 'privacy',
    title: 'Confidential Consultation Chambers',
    description: 'Sound-insulated rooms ensuring patient privacy, comprehensive physical examinations, and unhurried doctor consultations.',
    iconName: 'Lock',
  },
];

export const CLINIC_FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'appointments',
    question: 'Do I need an advance appointment or can I walk in directly?',
    answer: 'Advance booking is strongly recommended to reserve your consultation slot and reduce waiting time. However, walk-in patients with acute fevers, sudden ailments, or minor injuries are warmly accepted at our triage reception desk throughout clinic hours.',
  },
  {
    id: 'faq-2',
    category: 'lab',
    question: 'How quickly are laboratory test and ECG reports delivered?',
    answer: 'Routine blood sugar, lipid profiles, urine full reports, and 12-lead digital ECGs are completed on the same day within 1 to 3 hours. Reports can be collected in print or sent directly to your phone via WhatsApp upon request.',
  },
  {
    id: 'faq-3',
    category: 'languages',
    question: 'Which languages are spoken during consultations?',
    answer: 'All our specialist consultants and clinical support staff speak fluent English and Tamil, ensuring comfortable and completely understood clinical discussions.',
  },
  {
    id: 'faq-4',
    category: 'location',
    question: 'What should I bring for my first clinic appointment?',
    answer: 'Please bring your previous prescription slips, hospital clinic books, recent lab or scan reports, and a list of any ongoing medications. Having this history helps our doctors optimize your personalized care.',
  },
  {
    id: 'faq-5',
    category: 'location',
    question: 'Where is the clinic located and is vehicle parking available?',
    answer: 'We are situated at 142 Hospital Road, Jaffna, just minutes from the Teaching Hospital Jaffna. Dedicated customer car and two-wheeler parking is available directly in front of the clinic premises.',
  },
];
