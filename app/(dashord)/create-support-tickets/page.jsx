'use client';
import { createSupportTicket } from '@/action/tablelog';
import Link from 'next/link';
 

export default function Page() {
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

        {/* FORM */}
        <form action={createSupportTicket} className="space-y-5">

          <Field label="Ticket Title">
            <input
              name="title"
              required
              placeholder="Ticket Title"
              className={inputClass}
            />
          </Field>

          <Field label="Ticket Description">
            <textarea
              name="description"
              required
              rows={5}
              placeholder="Describe your issue"
              className={`${inputClass} resize-none`}
            />
          </Field>

          {/* Attach Image */}
          <div>
            <label className="text-xs font-medium text-slate-300 mb-2 block">
              Attach Image (optional)
            </label>

            <div className="relative border-2 border-dashed border-white/20 rounded-lg p-8 flex flex-col items-center justify-center hover:border-indigo-400 transition cursor-pointer">
              <input
                type="file"
                name="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
              />

              <i className="fa fa-cloud-upload text-2xl text-slate-400 mb-2" />
              <p className="text-xs text-slate-300">
                Click to upload image
              </p>
            </div>
          </div>

          {/* Action */}
          <button
            type="submit"
            className="px-8 py-3 rounded-full text-xs font-semibold bg-gradient-to-r from-pink-600 to-orange-500 hover:opacity-90 transition"
          >
            ADD NEW TICKET →
          </button>
        </form>
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

const inputClass =
  'w-full bg-[#041f2e] border border-white/20 rounded-md px-4 py-3 text-sm text-white placeholder-slate-400 outline-none focus:border-indigo-500';
