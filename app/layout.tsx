import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'Nalam Medical Clinic - Northern Sri Lanka (Jaffna)',
  description: 'Modern, compassionate healthcare website for the Tamil-speaking community in Northern Sri Lanka (Jaffna), featuring bilingual support, qualified Tamil doctor profiles, online appointment booking, and clinic information.',
  keywords: [
    'Nalam Medical Clinic',
    'Jaffna Clinic',
    'Tamil Doctors Sri Lanka',
    'Hospital Road Jaffna',
    'Doctor appointment Jaffna',
    'Healthcare Northern Sri Lanka',
    'நலம் மருத்துவமனை',
    'யாழ்ப்பாணம் மருத்துவர்',
  ],
  openGraph: {
    title: 'Nalam Medical Clinic - Northern Sri Lanka',
    description: 'Trusted healthcare for your family in Jaffna. Qualified Tamil doctor profiles, outpatient services, and instant demonstration appointments.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nalam Medical Clinic - Northern Sri Lanka',
    description: 'Trusted healthcare for your family in Jaffna. Qualified Tamil doctor profiles, outpatient services, and instant demonstration appointments.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased text-slate-900 bg-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
