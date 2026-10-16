'use client';

import React, { useState } from 'react';
import { X, Copy, Check, Terminal, Globe, Code2, Sliders, Shield } from 'lucide-react';

interface CustomizationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CustomizationModal({ isOpen, onClose }: CustomizationModalProps) {
  const [activeTab, setActiveTab] = useState<'local' | 'github' | 'netlify' | 'custom'>('local');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in-50 duration-200">
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 id="modal-title" className="text-lg font-bold text-slate-900">
                Clinic Customization & Deployment Guide
              </h3>
              <p className="text-xs text-slate-500">
                Instructions for running locally, deploying to Netlify/GitHub, and updating clinic data
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 px-6 gap-2 bg-slate-50/50">
          <button
            type="button"
            onClick={() => setActiveTab('local')}
            className={`py-3 px-3 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'local'
                ? 'border-teal-700 text-teal-800'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            1. Run Locally
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('github')}
            className={`py-3 px-3 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'github'
                ? 'border-teal-700 text-teal-800'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            2. Push to GitHub
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('netlify')}
            className={`py-3 px-3 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'netlify'
                ? 'border-teal-700 text-teal-800'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            3. Deploy to Netlify
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('custom')}
            className={`py-3 px-3 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'custom'
                ? 'border-teal-700 text-teal-800'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            4. Edit Clinic & Doctors
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 space-y-5 text-sm text-slate-700">
          {activeTab === 'local' && (
            <div className="space-y-4">
              <p className="text-slate-600">
                To run this project on your computer using Node.js (v18+ or v20+ recommended):
              </p>

              <div className="space-y-3">
                <div className="relative bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-xs">
                  <div className="flex justify-between items-center pb-2 mb-2 border-b border-slate-800">
                    <span className="text-slate-400">Terminal Commands</span>
                    <button
                      type="button"
                      onClick={() =>
                        copyToClipboard('git clone <your-repo-url>\ncd <repo-name>\nnpm install\nnpm run dev', 1)
                      }
                      className="inline-flex items-center gap-1 text-slate-400 hover:text-white"
                    >
                      {copiedIndex === 1 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedIndex === 1 ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <code>
                    # 1. Install dependencies<br />
                    npm install<br /><br />
                    # 2. Start the Next.js development server<br />
                    npm run dev<br /><br />
                    # 3. Open in browser at http://localhost:3000
                  </code>
                </div>

                <div className="p-3.5 rounded-xl bg-teal-50 border border-teal-200 text-xs text-teal-900">
                  <strong>Zero-database setup:</strong> This prototype is purely frontend-driven and runs immediately without setting up PostgreSQL, MongoDB, or Firebase!
                </div>
              </div>
            </div>
          )}

          {activeTab === 'github' && (
            <div className="space-y-4">
              <p className="text-slate-600">
                Pushing your codebase to GitHub makes continuous deployment with Netlify or Vercel automatic:
              </p>

              <div className="relative bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-xs">
                <div className="flex justify-between items-center pb-2 mb-2 border-b border-slate-800">
                  <span className="text-slate-400">Git Setup & Push</span>
                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(
                        'git init\ngit add .\ngit commit -m "Initial commit of Nalam Clinic website"\ngit branch -M main\ngit remote add origin https://github.com/<your-username>/nalam-clinic.git\ngit push -u origin main',
                        2
                      )
                    }
                    className="inline-flex items-center gap-1 text-slate-400 hover:text-white"
                  >
                    {copiedIndex === 2 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedIndex === 2 ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <code>
                  git init<br />
                  git add .<br />
                  git commit -m &quot;Initial commit: Nalam Medical Clinic website&quot;<br />
                  git branch -M main<br />
                  git remote add origin https://github.com/&lt;your-username&gt;/nalam-clinic.git<br />
                  git push -u origin main
                </code>
              </div>
            </div>
          )}

          {activeTab === 'netlify' && (
            <div className="space-y-4">
              <p className="text-slate-600">
                Deploying to Netlify is fully automated with Next.js 15:
              </p>

              <ol className="list-decimal pl-5 space-y-2 text-xs sm:text-sm">
                <li>Log in to <a href="https://app.netlify.com" target="_blank" rel="noreferrer" className="text-teal-700 font-semibold underline">Netlify</a>.</li>
                <li>Click <strong>&quot;Add new site&quot; &rarr; &quot;Import an existing project&quot;</strong> and select your GitHub repository.</li>
                <li>Netlify will automatically detect Next.js. Keep default settings:
                  <ul className="list-disc pl-5 mt-1 text-slate-600 font-mono text-xs">
                    <li>Build command: <code>npm run build</code></li>
                    <li>Publish directory: <code>.next</code></li>
                  </ul>
                </li>
                <li>Click <strong>Deploy site</strong>. Netlify will provision SSL and provide a live URL in ~1 minute.</li>
              </ol>

              <div className="p-3.5 rounded-xl bg-sky-50 border border-sky-200 text-xs text-sky-950">
                <strong>Custom Domain:</strong> In Netlify Site Settings &rarr; Domain Management, you can connect your own domain (e.g., <code>nalamclinic-jaffna.lk</code>).
              </div>
            </div>
          )}

          {activeTab === 'custom' && (
            <div className="space-y-4">
              <p className="text-slate-600">
                The entire website is designed so all clinic information lives in one centralized configuration file:
              </p>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-xs sm:text-sm">
                <div className="flex items-start gap-2.5">
                  <Code2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">File: <code>/lib/data.ts</code></strong>
                    <p className="text-slate-600 text-xs mt-0.5">
                      Contains <code>CLINIC_INFO</code> (clinic name, address, phone numbers, WhatsApp, opening hours), <code>DOCTORS_DATA</code> (names, qualifications, experience, photos), and <code>SERVICES_DATA</code>.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Shield className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">Updating Doctor Photos & Credentials:</strong>
                    <p className="text-slate-600 text-xs mt-0.5">
                      Place verified doctor headshots in <code>/public/images/</code> and set their Sri Lanka Medical Council (SLMC) credentials in <code>DOCTORS_DATA</code> in <code>lib/data.ts</code>.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Globe className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">Bilingual Translations:</strong>
                    <p className="text-slate-600 text-xs mt-0.5">
                      All Tamil and English copy is organized side-by-side in <code>TRANSLATIONS.en</code> and <code>TRANSLATIONS.ta</code>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-slate-50 border-t border-slate-200 px-6 py-3 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
}
