'use client';

import { useRole, Role } from '@/context/RoleContext';

export default function TopNav() {
  const { role, setRole } = useRole();

  const roleColors: Record<Role, string> = {
    Buyer: 'text-[#F98110]',
    Seller: 'text-[#4ade80]',
    Admin: 'text-[#60a5fa]',
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#131313]/90 backdrop-blur-xl border-b border-[#574335]/20">
      <div className="flex justify-between items-center h-18 px-8 py-4 max-w-[1920px] mx-auto">
        {/* Brand */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#F98110] rounded-lg flex items-center justify-center">
              <span className="text-black font-black text-sm">DR</span>
            </div>
            <span className="text-xl font-black tracking-tighter text-[#E5E2E1]">
              Dubbing<span className="text-[#F98110]">Rights</span>
            </span>
          </div>
          {/* Search - hidden on small screens */}
          <div className="hidden lg:flex items-center bg-[#201f1f] px-4 py-2 rounded-lg gap-3 min-w-[280px] border border-[#574335]/30">
            <svg className="w-4 h-4 text-[#DEC1AF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              className="bg-transparent border-none text-sm focus:ring-0 focus:outline-none text-[#E5E2E1] placeholder-[#DEC1AF]/50 w-full"
              placeholder="Search film catalogs..."
              type="text"
            />
          </div>
        </div>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-8 font-semibold tracking-tight text-sm">
          <a className="text-[#E5E2E1] hover:text-[#F98110] transition-colors" href="#">Marketplace</a>
          <a className="text-[#E5E2E1] hover:text-[#F98110] transition-colors" href="#">How It Works</a>
          <a className="text-[#E5E2E1] hover:text-[#F98110] transition-colors" href="#">Licensing</a>
          <a className="text-[#E5E2E1] hover:text-[#F98110] transition-colors" href="#">Support</a>
        </div>

        {/* Role Switcher */}
        <div className="flex items-center gap-4">
          <span className="text-xs text-[#DEC1AF] font-semibold uppercase tracking-widest hidden md:block">
            Demo View:
          </span>
          <div className="flex bg-[#201f1f] rounded-lg border border-[#574335]/30 overflow-hidden">
            {(['Buyer', 'Seller', 'Admin'] as Role[]).map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`px-4 py-2 text-sm font-bold transition-all ${
                  role === r
                    ? r === 'Buyer'
                      ? 'bg-[#F98110] text-black'
                      : r === 'Seller'
                      ? 'bg-[#4ade80] text-black'
                      : 'bg-[#60a5fa] text-black'
                    : 'text-[#DEC1AF] hover:text-[#E5E2E1]'
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
