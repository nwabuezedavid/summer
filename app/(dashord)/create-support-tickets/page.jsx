'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function page() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="bg-[#062f44] border border-white/10 rounded-xl p-6 text-white">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-3">
          <h2 className="text-sm font-semibold">
            Add New Support Ticket
          </h2>

          <Link
            href="/support-tickets"
            className="px-4 py-1.5 rounded text-xs font-semibold bg-pink-600 hover:bg-pink-500 transition"
          >
            ALL TICKETS
          </Link>
        </div>

        {/* Ticket Title */}
        <Field label="Ticket Title">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ticket Title"
            className={inputClass}
          />
        </Field>

        {/* Description */}
        <div className="mt-5">
          <Field label="Ticket Descriptions">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your issue"
              rows={5}
              className={`${inputClass} resize-none`}
            />
          </Field>
        </div>

        {/* Attach Image */}
        <div className="mt-5">
          <label className="text-xs font-medium text-slate-300 mb-2 block">
            Attach Image
          </label>

          <div className="relative border-2 border-dashed border-white/20 rounded-lg p-8 flex flex-col items-center justify-center hover:border-indigo-400 transition cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0])}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />

            {!file ? (
              <>
                <i className="fa fa-cloud-upload text-2xl text-slate-400 mb-2" />
                <p className="text-xs text-slate-300">
                  Attach Image
                </p>
              </>
            ) : (
              <p className="text-xs text-emerald-400">
                {file.name}
              </p>
            )}
          </div>
        </div>

        {/* Action */}
        <div className="mt-6">
          <button
            disabled={!title || !description}
            className={`px-8 py-3 rounded-full text-xs font-semibold transition ${
              title && description
                ? 'bg-gradient-to-r from-pink-600 to-orange-500 hover:opacity-90'
                : 'bg-slate-600 cursor-not-allowed'
            }`}
          >
            ADD NEW TICKET →
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- HELPERS ---------------- */

function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-slate-300">
        {label}
      </label>
      {children}
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const inputClass =
  'w-full bg-[#041f2e] border border-white/20 rounded-md px-4 py-3 text-sm text-white placeholder-slate-400 outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/40 hover:border-white/30';
