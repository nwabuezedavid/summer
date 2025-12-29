'use client';
import { useState } from 'react';

export default function SendMoneyPage() {
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="bg-[#062f44] border border-white/10 rounded-xl p-6 text-white">
        {/* Steps */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Step
            active
            step="01"
            title="Payment Details"
            subtitle="Enter your payment details"
          />
          <Step
            step="02"
            title="Success"
            subtitle="Successfully Payment"
          />
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* User Email */}
          <Field label="User Email">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="User Email"
              className={inputClass}
            />
          </Field>

          {/* Amount */}
          <Field label="Enter Amount">
            <div className="flex">
              <input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter Amount"
                className={`${inputClass} rounded-r-none`}
              />
              <span className={suffixClass}>USD</span>
            </div>
            <p className="text-xs text-red-400 mt-1">
              Minimum 10 USD and Maximum 5000 USD
            </p>
          </Field>
        </div>

        {/* Note */}
        <Field label="Send Money Note (Optional)">
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Send Money Note"
            rows={4}
            className={`${inputClass} resize-none`}
          />
        </Field>

        {/* Action */}
        <div className="mt-6">
          <button className="px-8 py-3 rounded-full text-xs font-semibold bg-gradient-to-r from-pink-600 to-orange-500 hover:opacity-90 transition">
            SEND MONEY →
          </button>
        </div>
      </div>
    </div>
  );
}


function Step({ step, title, subtitle, active }) {
  return (
    <div
      className={`relative rounded-lg border p-4 ${
        active
          ? 'border-lime-400 bg-[#083b52]'
          : 'border-white/10 bg-[#041f2e]'
      }`}
    >
      <span
        className={`absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
          active ? 'bg-lime-400 text-black' : 'bg-slate-600 text-white'
        }`}
      >
        {step}
      </span>
      <p className="text-sm font-semibold">{title}</p>
      <p className="text-xs text-slate-300 mt-1">{subtitle}</p>
    </div>
  );
}

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

/* Styles */
const inputClass =
  'w-full bg-[#041f2e] border border-white/20 rounded-md px-4 py-3 text-sm text-white placeholder-slate-400 outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/40 hover:border-white/30';

const suffixClass =
  'flex items-center px-4 bg-[#041f2e] border border-l-0 border-white/20 rounded-r-md text-xs text-slate-300';
