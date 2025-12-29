'use client';
import { useState } from 'react';

/* ---------------- MOCK DATA (replace with Prisma later) ---------------- */

const referralUrl =
  'https://claritycapitalinvest.com/register?invite=pTmOzYZsV';

const referralTree = {
  id: 'DN',
  name: "It's Me (David Nwabueze)",
  children: [
    {
      id: 'SS',
      name: 'Sdfsdf Sdfsd',
      stats: {
        deposit: 0,
        invest: 0,
        roi: 0,
      },
      children: [],
    },
  ],
};

/* --------------------------------------------------------------------- */

export default function ReferralPage() {
  const [copied, setCopied] = useState(false);

  const copyUrl = () => {
    navigator.clipboard.writeText(referralUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* ================= Referral URL ================= */}
      <div className="bg-[#062f44] border border-white/10 rounded-xl p-6 text-white">
        <h2 className="text-sm font-semibold mb-4">
          Referral URL and Tree
        </h2>

        <div className="flex flex-col md:flex-row gap-3">
          <input
            readOnly
            value={referralUrl}
            className={inputClass}
          />
          <button
            onClick={copyUrl}
            className="px-6 py-2 rounded text-xs font-semibold bg-pink-600 hover:bg-pink-500 transition"
          >
            {copied ? 'Copied!' : 'Copy Url'}
          </button>
        </div>

        <p className="text-xs text-slate-300 mt-2">
          1 people are joined by using this URL
        </p>

        {/* ================= Referral Tree ================= */}
        <div className="mt-10 flex justify-center">
          <ReferralNode node={referralTree} root />
        </div>
      </div>

      {/* ================= Referral Logs ================= */}
      <div className="bg-[#062f44] border border-white/10 rounded-xl p-6 text-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm font-semibold">
            All Referral Logs
          </h2>

          <span className="px-3 py-1 rounded-full text-xs bg-pink-600">
            Referral Profit: 0 USD
          </span>
        </div>

        <div className="bg-[#083b52] border border-white/10 rounded-lg p-4 text-xs text-slate-300">
          No referral transactions found
        </div>
      </div>
    </div>
  );
}

/* ================= TREE COMPONENT ================= */

function ReferralNode({ node, root }) {
  return (
    <div className="flex flex-col items-center relative">
      {/* Connector */}
      {!root && (
        <div className="absolute -top-8 w-px h-8 bg-white/20" />
      )}

      {/* Avatar */}
      <div className="w-12 h-12 rounded-full bg-pink-600 text-white flex items-center justify-center text-sm font-bold z-10">
        {node.id}
      </div>

      {/* Label */}
      <div className="mt-2 px-3 py-1 rounded bg-indigo-500 text-xs text-white">
        {node.name}
      </div>

      {/* Stats */}
      {node.stats && (
        <div className="mt-2 px-3 py-1 rounded bg-indigo-600/80 text-[11px] text-white text-center">
          Deposit ${node.stats.deposit}, Invest ${node.stats.invest}, ROI Profit ${node.stats.roi}
        </div>
      )}

      {/* Children */}
      {node.children && node.children.length > 0 && (
        <div className="mt-8 flex gap-10 relative">
          {/* Horizontal line */}
          <div className="absolute top-0 left-1/2 w-full h-px bg-white/20 -translate-x-1/2" />

          {node.children.map((child, i) => (
            <ReferralNode key={i} node={child} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ================= STYLES ================= */

const inputClass =
  'w-full bg-[#041f2e] border border-white/20 rounded-md px-4 py-3 text-sm text-white outline-none';
