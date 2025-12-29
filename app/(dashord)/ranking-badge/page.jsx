'use client';

import { Lock } from 'lucide-react';

const badges = [
  {
    id: 1,
    title: 'Hyip Member',
    description: 'By signing up to the account',
    icon: '🥇',
    unlocked: true,
  },
  {
    id: 2,
    title: 'Hyip Leader',
    description: 'By earning $10 from the site',
    icon: '🥈',
    unlocked: false,
  },
  {
    id: 3,
    title: 'Hyip Captain',
    description: 'By earning $200 from the site',
    icon: '🥉',
    unlocked: false,
  },
  {
    id: 4,
    title: 'Hyip Victor',
    description: 'By earning $500 from the site',
    icon: '🏅',
    unlocked: false,
  },
];

export default function page() {
  return (
    <div className="w-full bg-[#062f44] border border-white/10 rounded-xl p-6">
      {/* Header */}
      <h2 className="text-sm font-semibold text-white mb-6">
        All The Badges
      </h2>

      {/* Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {badges.map((badge) => (
          <BadgeItem key={badge.id} badge={badge} />
        ))}
      </div>
    </div>
  );
}

function BadgeItem({ badge }) {
  return (
    <div className="flex justify-center">
      <div
        className={`relative w-52 h-52 rounded-full flex flex-col items-center justify-center text-center transition
          ${
            badge.unlocked
              ? 'bg-[#1c3550] border-2 border-indigo-500'
              : 'bg-[#041f2e] border border-white/20 opacity-50'
          }`}
      >
        {/* Lock */}
        {!badge.unlocked && (
          <div className="absolute top-10">
            <Lock className="w-8 h-8 text-white/70" />
          </div>
        )}

        {/* Icon */}
        <div className="text-4xl mb-3">
          {badge.icon}
        </div>

        {/* Title */}
        <p className="text-sm font-semibold text-white">
          {badge.title}
        </p>

        {/* Description */}
        <p className="text-xs text-slate-300 mt-1 px-4">
          {badge.description}
        </p>
      </div>
    </div>
  );
}
