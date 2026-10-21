import type {Metadata} from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css'; // Global styles

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plus-jakarta',
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  'https://ais-pre-hxj7ugqfujma44vefqq3px-677450898615.asia-southeast1.run.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Nalam Medical Clinic - Northern Sri Lanka (Jaffna)',
  description: 'Modern, compassionate healthcare website for the Tamil-speaking community in Northern Sri Lanka (Jaffna), featuring bilingual support, qualified Tamil doctor profiles, online appointment booking, and clinic information.',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  keywords: [
    'Nalam Medical Clinic',
    'Jaffna Clinic',
    'Tamil Doctors Sri Lanka',
    'Hospital Road Jaffna',
    'Doctor appointment Jaffna',
    'Healthcare Northern Sri Lanka',
  ],
  openGraph: {
    title: 'Nalam Medical Clinic - Northern Sri Lanka (Jaffna)',
    description: 'Trusted healthcare for your family in Jaffna. Qualified Tamil doctor profiles, outpatient services, and instant demonstration appointments.',
    url: '/',
    siteName: 'Nalam Health Clinic',
    locale: 'en_LK',
    type: 'website',
    images: [
      {
        url: '/images/hero_clinic.jpg',
        width: 1376,
        height: 768,
        alt: 'Nalam Medical Clinic consultation in Jaffna with compassionate doctor and family',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nalam Medical Clinic - Northern Sri Lanka (Jaffna)',
    description: 'Trusted healthcare for your family in Jaffna. Qualified Tamil doctor profiles, outpatient services, and instant demonstration appointments.',
    images: ['/images/hero_clinic.jpg'],
  },
};

const clinicStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'MedicalClinic',
  name: 'Nalam Health Clinic',
  description:
    'Modern, compassionate outpatient healthcare in Jaffna, Northern Sri Lanka, featuring bilingual English & Tamil consultations, specialist doctors, and diagnostic care.',
  url: siteUrl,
  telephone: '+94212224500',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '142 Hospital Road',
    addressLocality: 'Jaffna',
    addressRegion: 'Northern Province',
    postalCode: '40000',
    addressCountry: 'LK',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 9.6615,
    longitude: 80.0255,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '07:30',
      closes: '20:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday'],
      opens: '07:30',
      closes: '18:30',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Sunday'],
      opens: '08:00',
      closes: '13:00',
    },
  ],
  availableService: [
    { '@type': 'MedicalTherapy', name: 'General & Family Practice' },
    { '@type': 'MedicalTherapy', name: 'Pediatrics & Child Wellness' },
    { '@type': 'MedicalTherapy', name: 'Cardiology & Chronic Disease Care' },
    { '@type': 'MedicalTherapy', name: 'Women’s Health & Maternity' },
    { '@type': 'MedicalTest', name: 'In-House Diagnostic Lab & 12-Lead ECG' },
  ],
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${plusJakarta.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicStructuredData) }}
        />
      </head>
      <body className="antialiased text-slate-900 bg-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

