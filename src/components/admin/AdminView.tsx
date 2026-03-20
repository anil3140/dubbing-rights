'use client';

import { useState } from 'react';
import { TITLES, DEAL_REQUESTS, USERS, User, UserStatus } from '@/lib/dummyData';

type AdminSection = 'dashboard' | 'users' | 'titles' | 'deals';

const STATUS_COLORS: Record<string, string> = {
  Pending: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
  'In Review': 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  Accepted: 'bg-green-500/15 text-green-400 border-green-500/30',
  Rejected: 'bg-red-500/15 text-red-400 border-red-500/30',
};

const STATUS_DOT: Record<string, string> = {
  Pending: 'bg-yellow-400',
  'In Review': 'bg-blue-400',
  Accepted: 'bg-green-400',
  Rejected: 'bg-red-400',
};

export default function AdminView() {
  const [section, setSection] = useState<AdminSection>('dashboard');
  const [users, setUsers] = useState<User[]>(USERS);

  const approveUser = (id: string) => {
    setUsers(u => u.map(user => user.id === id ? { ...user, status: 'Approved' as UserStatus } : user));
  };
  const rejectUser = (id: string) => {
    setUsers(u => u.filter(user => user.id !== id));
  };

  const navItems: { key: AdminSection; label: string; icon: string; count?: number }[] = [
    { key: 'dashboard', label: 'Dashboard', icon: '📊' },
    { key: 'users', label: 'Users', icon: '👥', count: users.length },
    { key: 'titles', label: 'Titles', icon: '🎬', count: TITLES.length },
    { key: 'deals', label: 'Deals', icon: '🤝', count: DEAL_REQUESTS.length },
  ];

  const totalDealValue = DEAL_REQUESTS.reduce((sum, d) => sum + d.budget, 0);
  const pendingUsers = users.filter(u => u.status === 'Pending');

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex">

      {/* Sidebar */}
      <aside className="w-64 bg-[#131313] border-r border-[#574335]/20 fixed top-16 bottom-0 flex flex-col">
        {/* Profile */}
        <div className="px-6 py-6 border-b border-[#574335]/20">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 bg-[#60a5fa]/20 border border-[#60a5fa]/30 rounded-lg flex items-center justify-center">
              <span className="text-[#60a5fa] font-black text-xs">SA</span>
            </div>
            <div>
              <p className="text-sm font-bold text-[#E5E2E1]">Super Admin</p>
              <p className="text-xs text-[#DEC1AF]">admin@dubbingrights.com</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-1 px-3 py-4 flex-1">
          {navItems.map(item => (
            <button
              key={item.key}
              onClick={() => setSection(item.key)}
              className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold text-left transition-all ${
                section === item.key
                  ? 'bg-[#60a5fa]/15 text-[#60a5fa] border border-[#60a5fa]/20'
                  : 'text-[#DEC1AF] hover:bg-[#1c1b1b] hover:text-[#E5E2E1] border border-transparent'
              }`}
            >
              <span className="flex items-center gap-3">
                <span className="text-base">{item.icon}</span>
                {item.label}
              </span>
              {item.count !== undefined && (
                <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                  section === item.key ? 'bg-[#60a5fa]/20 text-[#60a5fa]' : 'bg-[#201f1f] text-[#DEC1AF]'
                }`}>
                  {item.count}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Bottom status */}
        <div className="px-6 py-5 border-t border-[#574335]/20">
          <div className="space-y-2.5">
            {[
              { label: 'Platform Status', value: '🟢 Operational' },
              { label: 'Pending Approvals', value: `${pendingUsers.length} users` },
            ].map(s => (
              <div key={s.label} className="flex justify-between items-center">
                <span className="text-xs text-[#DEC1AF]">{s.label}</span>
                <span className="text-xs font-semibold text-[#E5E2E1]">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-64 flex-1 p-8 min-h-screen">

        {/* DASHBOARD */}
        {section === 'dashboard' && (
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-black tracking-tighter text-[#E5E2E1]">Admin Dashboard</h1>
              <p className="text-[#DEC1AF] mt-1 text-sm">Platform overview and key metrics</p>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
              {[
                { label: 'Titles Listed', value: TITLES.length.toString(), sub: 'Active in marketplace', color: 'text-[#F98110]', border: 'border-[#F98110]/20', bg: 'bg-[#F98110]/5' },
                { label: 'Registered Users', value: users.length.toString(), sub: `${users.filter(u => u.status === 'Approved').length} approved`, color: 'text-[#60a5fa]', border: 'border-[#60a5fa]/20', bg: 'bg-[#60a5fa]/5' },
                { label: 'Deal Requests', value: DEAL_REQUESTS.length.toString(), sub: `${DEAL_REQUESTS.filter(d => d.status === 'Pending').length} pending`, color: 'text-yellow-400', border: 'border-yellow-400/20', bg: 'bg-yellow-400/5' },
                { label: 'Total Deal Value', value: `$${(totalDealValue / 1000).toFixed(0)}k`, sub: 'Across all requests', color: 'text-[#4ade80]', border: 'border-[#4ade80]/20', bg: 'bg-[#4ade80]/5' },
              ].map(s => (
                <div key={s.label} className={`rounded-2xl p-6 border ${s.border} ${s.bg} bg-[#1c1b1b]`}>
                  <p className={`text-4xl font-black ${s.color} mb-1.5 leading-tight`}>{s.value}</p>
                  <p className="text-sm font-bold text-[#E5E2E1] mb-0.5">{s.label}</p>
                  <p className="text-xs text-[#DEC1AF]">{s.sub}</p>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Deal Requests */}
              <div className="bg-[#1c1b1b] border border-[#574335]/20 rounded-2xl overflow-hidden">
                <div className="px-6 py-5 border-b border-[#574335]/20 flex items-center justify-between">
                  <h3 className="font-black text-[#E5E2E1]">Recent Deal Requests</h3>
                  <button onClick={() => setSection('deals')} className="text-xs text-[#F98110] font-bold hover:underline">View all →</button>
                </div>
                <div className="divide-y divide-[#574335]/10">
                  {DEAL_REQUESTS.map(d => (
                    <div key={d.id} className="px-6 py-4 flex items-center justify-between hover:bg-[#201f1f]/50 transition-colors">
                      <div className="min-w-0 mr-4">
                        <p className="text-sm font-bold text-[#E5E2E1] truncate">{d.buyer}</p>
                        <p className="text-xs text-[#DEC1AF] truncate">{d.titleName} &bull; {d.rightsRequested}</p>
                        <p className="text-xs text-[#F98110] font-semibold">${d.budget.toLocaleString()}</p>
                      </div>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold rounded-lg border whitespace-nowrap shrink-0 ${STATUS_COLORS[d.status]}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[d.status]}`}></span>
                        {d.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pending Approvals */}
              <div className="bg-[#1c1b1b] border border-[#574335]/20 rounded-2xl overflow-hidden">
                <div className="px-6 py-5 border-b border-[#574335]/20 flex items-center justify-between">
                  <h3 className="font-black text-[#E5E2E1]">Pending Approvals</h3>
                  {pendingUsers.length > 0 && (
                    <span className="bg-yellow-400/20 text-yellow-400 border border-yellow-400/30 text-xs font-bold px-2 py-1 rounded-lg">
                      {pendingUsers.length} waiting
                    </span>
                  )}
                </div>
                {pendingUsers.length === 0 ? (
                  <div className="px-6 py-10 text-center">
                    <p className="text-2xl mb-2">✅</p>
                    <p className="text-sm font-semibold text-[#E5E2E1]">All caught up!</p>
                    <p className="text-xs text-[#DEC1AF] mt-1">No pending approvals.</p>
                  </div>
                ) : (
                  <div className="divide-y divide-[#574335]/10">
                    {pendingUsers.map(u => (
                      <div key={u.id} className="px-6 py-4 flex items-center justify-between hover:bg-[#201f1f]/50 transition-colors">
                        <div className="min-w-0 mr-4">
                          <p className="text-sm font-bold text-[#E5E2E1]">{u.name}</p>
                          <p className="text-xs text-[#DEC1AF]">{u.company} &bull; {u.role} &bull; {u.country}</p>
                          <p className="text-xs text-[#DEC1AF]/60 truncate">{u.email}</p>
                        </div>
                        <div className="flex gap-2 shrink-0">
                          <button onClick={() => approveUser(u.id)}
                            className="px-3 py-2 bg-[#4ade80]/15 text-[#4ade80] text-xs font-bold rounded-lg border border-[#4ade80]/30 hover:bg-[#4ade80]/25 transition-colors">
                            Approve
                          </button>
                          <button onClick={() => rejectUser(u.id)}
                            className="px-3 py-2 bg-red-500/10 text-red-400 text-xs font-bold rounded-lg border border-red-500/25 hover:bg-red-500/20 transition-colors">
                            Reject
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* USERS */}
        {section === 'users' && (
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-black tracking-tighter text-[#E5E2E1]">Users</h1>
              <p className="text-[#DEC1AF] mt-1 text-sm">{users.length} registered accounts &bull; {pendingUsers.length} awaiting approval</p>
            </div>
            <div className="bg-[#1c1b1b] border border-[#574335]/20 rounded-2xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#574335]/20 bg-[#131313]/50">
                    {['User', 'Company', 'Role', 'Country', 'Status', 'Actions'].map(h => (
                      <th key={h} className="text-left px-6 py-4 text-xs font-bold text-[#DEC1AF] uppercase tracking-widest">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, i) => (
                    <tr key={user.id} className={`${i < users.length - 1 ? 'border-b border-[#574335]/10' : ''} hover:bg-[#201f1f]/50 transition-colors`}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-[#201f1f] rounded-lg flex items-center justify-center shrink-0 border border-[#574335]/30">
                            <span className="text-[#DEC1AF] font-bold text-xs">{user.name.split(' ').map(n => n[0]).join('')}</span>
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-[#E5E2E1] text-sm">{user.name}</p>
                            <p className="text-xs text-[#DEC1AF] truncate max-w-[150px]">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-[#E5E2E1]">{user.company}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 text-[10px] font-bold rounded-lg border ${
                          user.role === 'Buyer'
                            ? 'bg-[#F98110]/10 text-[#F98110] border-[#F98110]/20'
                            : 'bg-[#60a5fa]/10 text-[#60a5fa] border-[#60a5fa]/20'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-[#DEC1AF]">{user.country}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold rounded-lg border ${
                          user.status === 'Approved'
                            ? 'bg-[#4ade80]/10 text-[#4ade80] border-[#4ade80]/20'
                            : 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'Approved' ? 'bg-[#4ade80]' : 'bg-yellow-400'}`}></span>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {user.status === 'Pending' ? (
                          <div className="flex gap-2">
                            <button onClick={() => approveUser(user.id)}
                              className="px-3 py-2 bg-[#4ade80]/15 text-[#4ade80] text-xs font-bold rounded-lg border border-[#4ade80]/30 hover:bg-[#4ade80]/25 transition-colors">
                              Approve
                            </button>
                            <button onClick={() => rejectUser(user.id)}
                              className="px-3 py-2 bg-red-500/10 text-red-400 text-xs font-bold rounded-lg border border-red-500/25 hover:bg-red-500/20 transition-colors">
                              Reject
                            </button>
                          </div>
                        ) : (
                          <button className="px-3 py-2 border border-[#574335]/30 text-[#DEC1AF] text-xs font-bold rounded-lg hover:bg-[#201f1f] transition-colors">
                            View Profile
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TITLES */}
        {section === 'titles' && (
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-black tracking-tighter text-[#E5E2E1]">Titles</h1>
              <p className="text-[#DEC1AF] mt-1 text-sm">{TITLES.length} titles in the marketplace</p>
            </div>
            <div className="bg-[#1c1b1b] border border-[#574335]/20 rounded-2xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#574335]/20 bg-[#131313]/50">
                    {['Title', 'Seller', 'Rights Available', 'Price', 'Status', 'Action'].map(h => (
                      <th key={h} className="text-left px-6 py-4 text-xs font-bold text-[#DEC1AF] uppercase tracking-widest">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TITLES.map((title, i) => (
                    <tr key={title.id} className={`${i < TITLES.length - 1 ? 'border-b border-[#574335]/10' : ''} hover:bg-[#201f1f]/50 transition-colors`}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img src={title.poster} alt={title.name} className="w-9 h-12 object-cover rounded-lg shrink-0" />
                          <div className="min-w-0">
                            <p className="font-bold text-[#E5E2E1] text-sm leading-snug">{title.name}</p>
                            <p className="text-xs text-[#DEC1AF]">{title.genre} &bull; {title.year}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-[#DEC1AF] whitespace-nowrap">{title.seller}</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1.5">
                          {title.rightsAvailable.map(r => (
                            <span key={r} className="px-2 py-1 bg-[#F98110]/10 text-[#F98110] text-[10px] font-bold rounded-lg border border-[#F98110]/15 whitespace-nowrap">
                              {r}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-black text-[#F98110] text-sm whitespace-nowrap">${title.price.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#4ade80]/10 text-[#4ade80] text-[10px] font-bold rounded-lg border border-[#4ade80]/20">
                          <span className="w-1.5 h-1.5 bg-[#4ade80] rounded-full"></span>
                          {title.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="px-3 py-2 border border-red-500/30 text-red-400 text-xs font-bold rounded-lg hover:bg-red-500/10 transition-colors whitespace-nowrap">
                          Unpublish
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* DEALS */}
        {section === 'deals' && (
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-black tracking-tighter text-[#E5E2E1]">Deal Requests</h1>
              <p className="text-[#DEC1AF] mt-1 text-sm">{DEAL_REQUESTS.length} active deal requests &bull; ${totalDealValue.toLocaleString()} total value</p>
            </div>
            <div className="bg-[#1c1b1b] border border-[#574335]/20 rounded-2xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#574335]/20 bg-[#131313]/50">
                    {['Buyer', 'Title', 'Rights', 'Territory', 'Budget', 'Date', 'Status'].map(h => (
                      <th key={h} className="text-left px-6 py-4 text-xs font-bold text-[#DEC1AF] uppercase tracking-widest">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {DEAL_REQUESTS.map((deal, i) => (
                    <tr key={deal.id} className={`${i < DEAL_REQUESTS.length - 1 ? 'border-b border-[#574335]/10' : ''} hover:bg-[#201f1f]/50 transition-colors`}>
                      <td className="px-6 py-4">
                        <p className="font-bold text-[#E5E2E1] text-sm">{deal.buyer}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-[#DEC1AF] max-w-[140px]">
                        <p className="truncate">{deal.titleName}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 bg-[#F98110]/10 text-[#F98110] text-[10px] font-bold rounded-lg border border-[#F98110]/15 whitespace-nowrap">
                          {deal.rightsRequested}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-[#DEC1AF] whitespace-nowrap">{deal.territory}</td>
                      <td className="px-6 py-4 font-black text-[#F98110] text-sm whitespace-nowrap">${deal.budget.toLocaleString()}</td>
                      <td className="px-6 py-4 text-xs text-[#DEC1AF] whitespace-nowrap">{deal.createdAt}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-[10px] font-bold rounded-lg border whitespace-nowrap ${STATUS_COLORS[deal.status]}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[deal.status]}`}></span>
                          {deal.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
