'use client';
import { sedMoney } from '@/action/sedmoney';
import PageHeader from '@/componenet/header';
import { useState } from 'react';
import { toast } from 'sonner';

export default function SendMoneyForm() {
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
   const [btn, setbtn] = useState(false);
const handleeven = async ()=>{
    setbtn(true)

  sedMoney({
    email:email,
    amount:amount,
    note:note || null,
  })
  .then(e=> {
    
    toast.info(e)
    setbtn(false)

  } )
  .catch(ex=> {
    
    toast.info(ex )
    setbtn(true)

  })
}

  return (
    <div className="w-full bg-[#062f44] border border-white/10 rounded-xl p-6 text-white">
      {/* Top Row */}
                  <PageHeader
        title="Send Money"
        actionLabel="Send Money log"
        actionHref="/send-money-log"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Email */}
        <Field label="User Email">
          <input
            type="email"
            placeholder="User Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
        </Field>

        {/* Enter Amount */}
        <Field label="Enter Amount">
          <div className="flex">
            <input
              type="number"
              placeholder="Enter Amount"
              value={amount}
            required

              onChange={(e) => setAmount(e.target.value)}
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
      <div className="mt-6">
        <Field label="Send Money Note (Optional)">
          <textarea
            rows={4}
            placeholder="Send Money Note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className={`${inputClass} resize-none`}
          />
        </Field>
      <button
          onClick={handleeven}
          type=''
          disabled={!email || !amount || btn}
          className={`px-8 py-3 rounded-full mt-4 text-xs font-semibold transition ${
            email && amount 
              ? 'bg-gradient-to-r from-pink-600 to-orange-500 hover:opacity-90'
              : 'bg-slate-600 cursor-not-allowed'
          }`}
        >
          PROCEED TO PAYMENT →
        </button>
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

const suffixClass =
  'flex items-center px-4 bg-[#041f2e] border border-l-0 border-white/20 rounded-r-md text-xs text-slate-300';
