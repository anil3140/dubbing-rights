'use client';

import { useRole, Role } from '@/context/RoleContext';
import { useState } from 'react';
import AnimatedLogo from './AnimatedLogo';

export default function TopNav() {
  const { role, setRole } = useRole();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-xl border-b border-black/5 h-16 shadow-sm">
      <div className="flex items-center justify-between h-full px-4 sm:px-6 lg:px-8 max-w-screen-2xl mx-auto gap-4">

        {/* Brand */}
        <a href="/" className="flex items-center shrink-0 group">
          <AnimatedLogo className="h-12 sm:h-14 lg:h-16 w-auto transition-transform duration-200 group-hover:scale-105" />
        </a>

        {/* Search — desktop only */}
        <div className="hidden xl:flex items-center bg-gray-100 px-3 py-2 rounded-lg gap-2 w-56 border border-gray-200 shrink-0">
          <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input className="bg-transparent border-none text-sm focus:ring-0 focus:outline-none text-gray-800 placeholder-gray-400 w-full" placeholder="Search catalogs..." type="text" />
        </div>

        {/* Nav links — large screens only */}
        <div className="hidden lg:flex items-center gap-5 font-semibold text-sm shrink-0">
          {['Marketplace', 'How It Works', 'Licensing', 'Support'].map(link => (
            <a key={link} className="text-gray-600 hover:text-[#F98110] transition-colors whitespace-nowrap" href="#">{link}</a>
          ))}
        </div>

        {/* Role Switcher */}
        <div className="flex items-center gap-2 shrink-0 ml-auto lg:ml-0">
          <span className="text-xs text-gray-400 font-semibold uppercase tracking-widest hidden sm:block whitespace-nowrap">View as:</span>
          <div className="flex rounded-lg border border-gray-200 overflow-hidden bg-gray-50">
            {(['Buyer', 'Seller', 'Admin'] as Role[]).map((r, i) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                  i > 0 ? 'border-l border-gray-200' : ''
                } ${
                  role === r
                    ? r === 'Buyer' ? 'bg-[#F98110] text-white'
                    : r === 'Seller' ? 'bg-emerald-500 text-white'
                    : 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
