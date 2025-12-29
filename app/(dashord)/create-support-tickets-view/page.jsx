'use client';
import Link from 'next/link';

export default function ViewSupportTicketPage() {
  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="bg-[#062f44] border border-white/10 rounded-xl p-6 text-white">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-3">
          <div>
            <h2 className="text-sm font-semibold">
              Ticket: Unable to withdraw funds
            </h2>
            <p className="text-xs text-slate-400">
              Ticket ID: TCK-10239 • Status: <span className="text-emerald-400">Open</span>
            </p>
          </div>

          <Link
            href="/support"
            className="px-4 py-1.5 rounded text-xs font-semibold bg-slate-700 hover:bg-slate-600 transition"
          >
            BACK TO TICKETS
          </Link>
        </div>

        {/* Ticket Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-sm">
          <Info label="Priority" value="High" color="text-red-400" />
          <Info label="Created" value="Jan 10, 2025" />
          <Info label="Last Update" value="Jan 11, 2025" />
        </div>

        {/* Conversation */}
        <div className="space-y-4 mb-6">
          {/* User Message */}
          <Message
            from="You"
            time="Jan 10, 2025 • 10:15 AM"
            text="I tried withdrawing $500 but the request is still pending after 24 hours."
            user
          />

          {/* Admin Reply */}
          <Message
            from="Support"
            time="Jan 10, 2025 • 11:40 AM"
            text="Thanks for reaching out. Please ensure your KYC is completed. Our team is reviewing your request."
          />
        </div>

        {/* Reply Box */}
        <div className="border-t border-white/10 pt-4">
          <label className="text-xs font-medium text-slate-300 mb-2 block">
            Reply to this ticket
          </label>

          <textarea
            rows={4}
            placeholder="Type your message..."
            className={inputClass}
          />

          <div className="mt-4 flex gap-3">
            <button className="px-6 py-2 rounded-full text-xs font-semibold bg-gradient-to-r from-pink-600 to-orange-500 hover:opacity-90 transition">
              SEND REPLY
            </button>

            <button className="px-6 py-2 rounded-full text-xs font-semibold bg-slate-700 hover:bg-slate-600 transition">
              CLOSE TICKET
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function Info({ label, value, color }) {
  return (
    <div className="bg-[#041f2e] border border-white/10 rounded-lg p-3">
      <p className="text-xs text-slate-400">{label}</p>
      <p className={`font-semibold ${color || 'text-white'}`}>
        {value}
      </p>
    </div>
  );
}

function Message({ from, time, text, user }) {
  return (
    <div
      className={`max-w-3xl ${
        user ? 'ml-auto text-right' : 'mr-auto text-left'
      }`}
    >
      <div
        className={`rounded-lg p-4 border ${
          user
            ? 'bg-indigo-500/10 border-indigo-500/30'
            : 'bg-[#041f2e] border-white/10'
        }`}
      >
        <p className="text-xs text-slate-400 mb-1">
          {from} • {time}
        </p>
        <p className="text-sm">{text}</p>
      </div>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const inputClass =
  'w-full bg-[#041f2e] border border-white/20 rounded-md px-4 py-3 text-sm text-white placeholder-slate-400 outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/40 hover:border-white/30 resize-none';
