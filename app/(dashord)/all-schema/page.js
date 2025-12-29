"use server";

import prisma from '@/action/db';
import Image from 'next/image';
import Link from 'next/link';
 

export default async function InvestmentPlans() {
  const plansbd = await prisma.investmentPlan.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'asc' },
  });

  // ✅ Transform DB data into UI-friendly array
  const plans = plansbd.map(e => ({
    id: e.id,
    name: e.name,
    rate: `Daily ${e.profitPercent}%`,
    image:
      e.image ||
      '/logo.png',
    investment:
      e.maxAmount
        ? `$${e.minAmount} – $${e.maxAmount}`
        : `$${e.minAmount} – Unlimited`,
  }));

  return (
    <div className="w-full bg-[#062f44] h-full max-sm:pb-[190px] overflow-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {plans.map(plan => (
          <PlanCard key={plan.name} plan={plan} />
        ))}
      </div>
    </div>
  );
}


function PlanCard({ plan }) {
  return (
    <div className="relative bg-[#083b52] rounded-xl border border-pink-500/60 p-5 text-white flex flex-col">
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-md overflow-hidden bg-white/10">
          <Image
            src={plan.image}
            alt={plan.name}
            width={40}
            height={40}
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="font-semibold">{plan.name}</h3>
          <p className="text-xs text-yellow-400">{plan.rate}</p>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-3 text-sm mb-6">
        <Row label="Investment" value={plan.investment} badge />
        <Row label="Capital Back" value="Yes" />
        <Row label="Return Type" value="Period" />
        <Row label="Number of Period" value="1 Time" />
        <Row label="Profit Withdraw" value="Anytime" />
        <Row label="Cancel" value="Within 59 Minute" />
        <p className="text-xs text-yellow-400">* No Profit Holidays</p>
      </div>

      {/* Button */}
      <Link href={`/all-schema/${plan.id}`} className="mt-auto w-full text-center py-3 rounded-full text-xs font-semibold bg-gradient-to-r from-pink-600 to-orange-500 hover:opacity-90 transition">
        ✓ INVEST NOW
      </Link>
    </div>
  );
}

function Row({ label, value, badge }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-slate-300">{label}</span>
      {badge ? (
        <span className="px-2 py-1 text-xs rounded bg-teal-500 text-black font-medium">
          {value}
        </span>
      ) : (
        <span className="text-white text-sm">{value}</span>
      )}
    </div>
  );
}
