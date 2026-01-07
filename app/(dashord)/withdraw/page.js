'use client';
import { withdrawAction } from '@/action/withdrwal';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';

export default function WithdrawMoneyPage() {
  const [method, setMethod] = useState('');
  const [amount, setAmount] = useState('');
  const [btn, setbtn] = useState(false);
const handle = async (e)=>  {
  setbtn(true)
  if (!method || !amount  ) {

      toast.error(
       'Please select a wallet, enter amount  .'
      );
  setbtn(false)

      return;
    }

   
   e.preventDefault();
    
  const res = await withdrawAction(new FormData(e.currentTarget));

  if (res?.error) {
    toast.error(res.error);
     setbtn(false)
     // ✅ client-only
  } else {
    toast.success("withdrawal process");
  setbtn(true)
    
  }
 
}
  return (
    <form onSubmit={handle} className="max-w-6xl mx-auto p-4">
      <div className="bg-[#062f44] border border-white/10 rounded-xl p-6 text-white">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-3">
          <h2 className="text-sm font-semibold">Withdraw Money</h2>
          <Link href={'/withdraw-log'} className="px-4 py-1.5 rounded text-xs font-semibold bg-pink-600 hover:bg-pink-500">
            WITHDRAW LOG
          </Link>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Withdraw Method */}
          <Field label="Withdraw Account">
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className={inputClass}
              name='method'
              required
            >
              <option value="">Withdraw Method</option>
              <option>BTC</option>
              <option>ETH</option>
              <option>USDT</option>
              <option>BNB</option>
              <option>TRX</option>
            </select>
          </Field>

          {/* Amount */}
          <Field label="Amount">
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={inputClass}
              name='amount'
            />
          </Field>
        </div>

        {/* Details */}
        <div className="bg-[#041f2e] border border-white/10 rounded-lg p-4 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-slate-300">Withdraw Amount</span>
            <span className="font-medium">{amount || 0} USD</span>
          </div>
        </div>

        {/* Action */}
        <button disabled={btn} type='submit' className="px-8 py-3 rounded-full text-xs font-semibold bg-gradient-to-r from-pink-600 to-orange-500 hover:opacity-90 transition">
        {!btn ?'  WITHDRAW MONEY →' :'Requesting'}
        </button>
      </div>
    </form>
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
