'use client';

import { useRole, Role } from '@/context/RoleContext';

export default function TopNav() {
  const { role, setRole } = useRole();

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#131313]/95 backdrop-blur-xl border-b border-[#574335]/20">
      <div className="flex justify-between items-center h-16 px-6 max-w-screen-2xl mx-auto">

        {/* Brand */}
        <div className="flex items-center gap-6 min-w-0">
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 bg-[#F98110] rounded-lg flex items-center justify-center">
              <span className="text-black font-black text-xs">DR</span>
            </div>
            <span className="text-lg font-black tracking-tighter text-[#E5E2E1] whitespace-nowrap">
              Dubbing<span className="text-[#F98110]">Rights</span>
            </span>
          </div>

          {/* Search */}
          <div className="hidden lg:flex items-center bg-[#1c1b1b] px-3 py-2 rounded-lg gap-2 w-64 border border-[#574335]/30">
            <svg className="w-4 h-4 text-[#DEC1AF] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              className="bg-transparent border-none text-sm focus:ring-0 focus:outline-none text-[#E5E2E1] placeholder-[#DEC1AF]/40 w-full"
              placeholder="Search film catalogs..."
              type="text"
            />
          </div>
        </div>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-6 font-semibold text-sm shrink-0">
          {['Marketplace', 'How It Works', 'Licensing', 'Support'].map(link => (
            <a key={link} className="text-[#DEC1AF] hover:text-[#F98110] transition-colors whitespace-nowrap" href="#">
              {link}
            </a>
          ))}
        </div>

        {/* Role Switcher */}
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-xs text-[#DEC1AF]/60 font-semibold uppercase tracking-widest hidden lg:block whitespace-nowrap">
            View as:
          </span>
          <div className="flex rounded-lg border border-[#574335]/40 overflow-hidden bg-[#1c1b1b]">
            {(['Buyer', 'Seller', 'Admin'] as Role[]).map((r, i) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`px-4 py-2 text-sm font-bold transition-all whitespace-nowrap ${
                  i > 0 ? 'border-l border-[#574335]/40' : ''
                } ${
                  role === r
                    ? r === 'Buyer'
                      ? 'bg-[#F98110] text-black'
                      : r === 'Seller'
                      ? 'bg-[#4ade80] text-black'
                      : 'bg-[#60a5fa] text-black'
                    : 'text-[#DEC1AF] hover:text-[#E5E2E1] hover:bg-[#2a2a2a]'
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
