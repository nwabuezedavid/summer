"use client";

import { investAction } from "@/action/invest";
 
import { investclientside } from "./investclientside";
import { useEffect, useState } from "react";
import { toast } from "sonner";
 

export default   function Page({ params }) {

const [data, setdata] = useState({})

  useEffect(() => {
    investclientside( params )
    .then(e=>setdata(e))
    
    
    
  }, [ ])
  
 
 
 
const handlesubmit =  async (e)=>{
   e.preventDefault();

  const res = await investAction(new FormData(e.currentTarget));

  if (res?.error) {
    toast.error(res.error); // ✅ client-only
  } else {
    toast.success("Investment successful");
  }
   
}
  return (
    <div className="w-full bg-[#062f44] max-sm:pb-[190px] overflow-auto h-full p-6 text-white rounded-xl border border-white/10">

      {/* Header */}
      <h2 className="text-sm font-semibold mb-6 border-b border-white/10 pb-3">
        Review and Confirm Investment
      </h2>

      {/* FORM (POST ACTION) */}
      <form onSubmit={handlesubmit}  method="post" className="space-y-4 text-sm">

        {/* Hidden Plan ID */}
        <input type="hidden" name="planId" value={data.plan?.id} />

        <Row
          label="Selected Plan:"
          value={<Value text={data.plan?.name} highlight />}
        />

        <Row label="Profit Holiday:" value={<Value text="No" />} />

        <Row
          label="Investment Range:"
          value={
            <Value
              text={`Minimum ${data?.minAmount} USD - Maximum ${
                data.maxAmount ?? "Unlimited"
              } USD`}
              highlight
            />
          }
        />

        <Row
          label="Enter Amount:"
          value={
            <div className="flex">
              <input
                name="amount"
                type="number"
                min={Number(data?.minAmount)}
                max={Number(data?.maxAmount) ?? undefined}
                required
                placeholder="Enter amount"
                className="input rounded-r-none p-3 border-b border-white outline-none w-full"
              />
              <span className="px-4 flex items-center bg-[#041f2e] border border-l-0 border-white/20 rounded-r text-xs">
                USD
              </span>
            </div>
          }
        />

        <Row
          label="Select Wallet:"
          value={
            <select
              name="wallet"
              required
              className="input outline-none border-none border-b border-white"
            >
              <option className="text-black" value="MAIN">
                Main Wallet
              </option>
              <option className="text-black" value="PROFIT">
                Profit Wallet
              </option>
            </select>
          }
        />

        <Row
          label="Return of Interest:"
          value={<Value text={`Daily ${Number(data.plan?.profitPercent)}%`} />}
        />

        <Row
          label="Number of Period:"
          value={<Value text={`${Number(data.plan?.durationDays)} Time`} />}
        />

        <Row label="Capital Back:" value={<Value text="Yes" />} />
        <Row label="Total Investment Amount:" value={<Value text="Calculated on submit" />} />

        {/* Buttons */}
        <div className="flex gap-4 mt-8">
          <button
            type="submit"
            className="px-6 py-2 rounded-full text-xs font-semibold bg-gradient-to-r from-pink-600 to-orange-500 hover:opacity-90 transition"
          >
            ✓ INVEST NOW
          </button>

          <button
            type="button"
            
            className="px-6 py-2 rounded-full text-xs font-semibold bg-white text-black hover:bg-slate-200 transition"
          >
            CANCEL
          </button>
        </div>
      </form>
    </div>
  );
}

/* ---------------- REUSABLE COMPONENTS ---------------- */

function Row({ label, value }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 items-center border-b border-white/10 pb-3 gap-2">
      <span className="text-slate-300">{label}</span>
      <div className="md:col-span-2">{value}</div>
    </div>
  );
}

function Value({ text, highlight }) {
  return (
    <span className={`text-sm ${highlight ? "text-cyan-400" : "text-white"}`}>
      {text}
    </span>
  );
}
