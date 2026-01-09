'use client';
import { matureInvestments } from '@/action/matureInvestments';
import { useUser } from '@/context/usecontext';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function KYCNotice({ show = true }) {
  const [visible, setVisible] = useState(show);
  const data = useUser()

useEffect(() => {
 
  matureInvestments()
  if (data.user.kycStatus == "APPREOVED") {
   console.log('kskdkdj');
    setVisible(false)
  
   }
}, [ ])

  if (!visible) return null;

  return (
    <div className="w-full max-md:hidden bg-[#083b52] border border-white/10 rounded-xl px-4 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
      {/* Left */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-yellow-500/20 text-yellow-400 flex items-center justify-center text-sm font-bold">
          ⚠
        </div>
        <p className="text-sm text-slate-200">
          Complete your <span className="font-semibold">KYC verification</span> to unlock
          withdrawals of <span className="font-semibold">$500</span> and above.
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Link href={`/kyc/`} className="px-4 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-pink-600 to-orange-500 hover:opacity-90 transition">
          SUBMIT NOW
        </Link>
        <button
          onClick={() => setVisible(false)}
          className="px-4 py-1.5 rounded-full text-xs font-semibold bg-slate-700 hover:bg-slate-600 transition"
        >
          LATER
        </button>
      </div>
    </div>
  );
}
