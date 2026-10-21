import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-900 px-4">
      <h2 className="text-3xl font-extrabold mb-2">Page Not Found</h2>
      <p className="text-slate-600 mb-6 text-center max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-xl shadow-md transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
}
