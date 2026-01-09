'use client';
import { walletAll } from '@/action/authaction';
import { submitDeposit } from '@/action/deposit';
import PageHeader from '@/componenet/header';
import { useState, useEffect } from 'react';
import { toast } from "sonner";
 

export default function DepositAmount() {

  
  const [gateway, setGateway] = useState('');
  const [amount, setAmount] = useState('');
  const [file, setFile] = useState(null);
 const [WALLETS, setallwallet] = useState({})
 const [loading, setLoading] = useState(true)
useEffect(() => {
 walletAll().then(e=>setallwallet(e))
 
 
 
}, [ ])
 const handleFileChange = (e) => {
  const selectedFile = e.target.files?.[0];
  if (!selectedFile) return;

  const allowedTypes = ["image/png", "image/jpeg"];
  const maxSize = 1 * 1024 * 1024; // 1MB

  // ❌ Type validation
  if (!allowedTypes.includes(selectedFile.type)) {
    toast.error("Only PNG and JPG images are allowed");
    e.target.value = "";
    setFile(null);
    return;
  }

  // ❌ Size validation
  if (selectedFile.size > maxSize) {
    toast.error("Image must be less than 1MB");
    e.target.value = "";
    setFile(null);
    return;
  }

  // ✅ Valid file
  setFile(selectedFile);
};
  const wallet = WALLETS[gateway]  

  const handleSubmit = async (e) => {
     e.preventDefault();

  if (!gateway || !amount || !file) {
    setLoading(true);
    toast.error(
      "Please select a wallet, enter amount and upload payment proof."
    );
    return;
  }

  

  try {
    const res = await submitDeposit(
      new FormData(e.currentTarget)
    );

    if (res?.error) {
      toast.error(res.error);
      setLoading(true);
    } else {
      toast.success("Deposited successfully");
      setFile(null);
      e.currentTarget.reset();
      setLoading(true);
    }
  }  
  }
 
  };

  return (
    <>
  
<form onSubmit={handleSubmit} className='!h-screen max-sm:mb-[30px]'>
  {
  }
      <div className="w-full  overflow-auto bg-[#062f44] text-white rounded-xl border border-white/10 p-6 space-y-6">
        {/* Payment + Amount */}
        <PageHeader
  title="Add Money"
  actionLabel="Add Money log"
  actionHref="/add-money-log"
/>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Payment Method */}
          <div>
            <label className={labelClass}>Payment Method</label>
            <select
              value={gateway}
              onChange={(e) => setGateway(e.target.value)}
              className={inputClass}
              name='gateway'
            >
              <option value="">— Select Gateway —</option>
              {Object.entries(WALLETS).map(([key, w]) => (
                <option key={key} value={key}>
                  {w.label}
                </option>
              ))}
            </select>
          </div>

          {/* Amount */}
          <div>
            <label className={labelClass}>Enter Amount</label>
            <div className="flex">
              <input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                name='amount'
                className={`${inputClass} rounded-r-none`}
              />
              <span className={suffixClass}>USD</span>
            </div>
            <p className="text-xs text-red-400 mt-1">
              Minimum 100 USD and Maximum 100000 USD
            </p>
          </div>
        </div>

        {/* Wallet Details */}
        {wallet && (
          <div className="space-y-4 border-t border-white/10 pt-6">
            <div>
              <p className="text-xs text-red-400 mb-1">
                {wallet.note}
              </p>
              <p className="text-sm font-mono bg-[#041f2e] border border-white/20 rounded px-4 py-3 break-all">
                {wallet.address}
              </p>
            </div>

            {/* Upload */}
            <div>
              <label className={labelClass}>
                Upload payment screenshot
              </label>
              <div className="relative border-2 border-dashed border-white/20 rounded-lg p-6 flex flex-col items-center justify-center hover:border-indigo-400 transition cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  name='file'
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />

                {!file ? (
                  <>
                    <i className="fa fa-cloud-upload text-2xl text-slate-400 mb-2" />
                    <p className="text-xs text-slate-300">
                      Click to upload payment screenshot
                    </p>
                  </>
                ) : (
                  <p className="text-xs text-emerald-400">
                    {file.name}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Action */}
        <button
          
          type='submit'
          disabled={!gateway || !amount || !file & loading}
          className={`px-8 py-3 rounded-full text-xs font-semibold transition ${
            gateway && amount && file
              ? 'bg-gradient-to-r from-pink-600 to-orange-500 hover:opacity-90'
              : 'bg-slate-600 cursor-not-allowed'
          }`}
        >
          {loading ? 'PROCEED TO PAYMENT →' :'Processing' }
         
        </button>
      </div>
      </form>
    </>
  );
}

/* ---------------- TOAST ---------------- */

function Toast({ type, message, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div
      className={`fixed top-6 right-6 z-50 w-80 rounded-lg border px-4 py-3 shadow-lg animate-slide-in ${
        type === 'success'
          ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400'
          : 'bg-red-500/10 border-red-500 text-red-400'
      }`}
    >
      <div className="flex gap-3">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
            type === 'success'
              ? 'bg-emerald-500 text-black'
              : 'bg-red-500 text-white'
          }`}
        >
          {type === 'success' ? '✓' : '!'}
        </div>

        <div className="flex-1">
          <p className="text-sm font-semibold capitalize">{type}</p>
          <p className="text-xs">{message}</p>
        </div>

        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const inputClass =
  'w-full bg-[#041f2e] border border-white/20 rounded-md px-4 py-3 text-sm text-white placeholder-slate-400 outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/40 hover:border-white/30';

const labelClass =
  'block text-xs font-medium text-slate-300 mb-1';

const suffixClass =
  'flex items-center px-4 bg-[#041f2e] border border-l-0 border-white/20 rounded-r-md text-xs text-slate-300';
