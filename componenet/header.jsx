'use client';

import Link from 'next/link';

export default function PageHeader({
  title,
  actionLabel,
  actionHref,
  hideAction = false,
}) {
  return (
    <div className="w-full bg-[#062f44] border-b border-white/10 rounded-xl px-4 py-3 flex items-center justify-between mb-6">
      {/* Title */}
      <h1 className="text-sm font-semibold text-white">
        {title}
      </h1>

      {/* Optional Action Button */}
      {!hideAction && actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="px-4 py-1.5 rounded text-xs font-semibold bg-pink-600 hover:bg-pink-500 transition"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
