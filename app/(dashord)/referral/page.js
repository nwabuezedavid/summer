"use client";

import { getReferralTree } from "@/action/referral";
import { useEffect, useState } from "react"; 

export default function ReferralPage() {
  const [data, setData] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    getReferralTree().then(setData);
  }, []);

  if (!data) {
    return (
      <div className="text-white p-6 text-center">
        Loading referral tree...
      </div>
    );
  }

  const copyUrl = () => {
    navigator.clipboard.writeText(data.referralUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Referral URL */}
      <div className="bg-[#062f44] border border-white/10 rounded-xl p-6 text-white">
        <h2 className="text-sm font-semibold mb-4">
          Referral URL and Tree
        </h2>

        <div className="flex gap-3">
          <input readOnly value={data.referralUrl} className="w-full p-2 "   />
          <button
            onClick={copyUrl}
            className="px-6 py-2 rounded text-xs font-semibold bg-pink-600"
          >
            {copied ? "Copied!" : "Copy Url"}
          </button>
        </div>

        <div className="mt-10 flex justify-center">
          <ReferralNode node={data.tree} root />
        </div>
      </div>
    </div>
  );
}


function ReferralNode({ node, root }) {
  return (
    <div className="flex flex-col items-center relative">
      {!root && (
        <div className="absolute -top-8 w-px h-8 bg-white/20" />
      )}

      <div className="w-12 h-12 rounded-full bg-pink-600 text-white flex items-center justify-center text-sm font-bold z-10">
        {node.name[0].toUpperCase()}
      </div>

      <div className="mt-2 px-3 py-1 rounded bg-indigo-500 text-xs">
        {node.name}
      </div>

      {node.stats && (
        <div className="mt-2 px-3 py-1 rounded bg-indigo-600/80 text-[11px] text-center">
          Deposit ${node.stats.deposit} | Invest ${node.stats.invest} | ROI ${node.stats.roi}
        </div>
      )}

      {node.children?.length > 0 && (
        <div className="mt-8 flex gap-10 relative">
          <div className="absolute top-0 left-1/2 w-full h-px bg-white/20 -translate-x-1/2" />
          {node.children.map((child) => (
            <ReferralNode key={child.id} node={child} />
          ))}
        </div>
      )}
    </div>
  );
}
