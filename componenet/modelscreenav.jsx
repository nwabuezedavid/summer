'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const items = [
  {
    href: '/dashboard',
    icon: 'fa-th-large',
    label: 'Dashboard',
  },
  {
    href: '/all-schema',
    icon: 'fa-layer-group',
    label: 'Schema',
  },
  {
    href: '/add-money',
    icon: 'fa-wallet',
    label: 'Add Money',
  },
  {
    href: '/send-money',
    icon: 'fa-paper-plane',
    label: 'Send',
  },
  {
    href: '/withdraw',
    icon: 'fa-arrow-down',
    label: 'Withdraw',
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-3 left-0 right-0 z-50 px-3 sm:hidden">
      <nav className="flex h-14 rounded-2xl bg-[#0b3448] border border-white/10 shadow-md overflow-hidden">
        {items.map((item, index) => {
          const active = pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex-1 flex flex-col items-center justify-center gap-0.5
                text-[11px] transition-all duration-200
                ${
                  active
                    ? 'bg-white/10 text-orange-400'
                    : 'text-slate-300 hover:bg-white/5 hover:text-orange-300'
                }
                ${index !== items.length - 1 ? 'border-r border-white/10' : ''}
              `}
            >
              <i
                className={`fa ${item.icon} text-base ${
                  active ? 'scale-110' : ''
                }`}
              />
              <span className="leading-none">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
