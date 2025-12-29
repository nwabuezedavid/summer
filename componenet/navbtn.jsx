'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SidebarLink({ href, icon, label }) {
  const pathname = usePathname();

  const isActive =
    pathname === href || pathname.startsWith(href + '/');

  return (
    <div className="w-[80%]">
      <Link
        href={href}
        className={`
          flex items-center gap-3 p-2 text-xs uppercase rounded-full
          relative overflow-hidden transition-colors
          
          ${isActive ? 'bg-[#6b6fa3] text-white' : 'text-[#d2d4d9]'}

          after:content-[' ']
          after:absolute after:inset-0
          after:bg-white/30
          after:transition-transform after:duration-300 after:ease-out

          ${isActive ? 'after:translate-x-0' : 'after:translate-x-full'}
          hover:after:translate-x-0
        `}
      >
        <i className={icon}></i>
        <p>{label}</p>
      </Link>
    </div>
  );
}
