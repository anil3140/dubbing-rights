'use client';

import { useState } from 'react';
import { TITLES, DEAL_REQUESTS, USERS, User, UserStatus } from '@/lib/dummyData';

type Section = 'dashboard' | 'users' | 'titles' | 'deals';

const STATUS_STYLE: Record<string, { pill: string; dot: string }> = {
  Pending:    { pill: 'bg-yellow-500/15 text-yellow-300 border-yellow-500/30', dot: 'bg-yellow-300' },
  'In Review':{ pill: 'bg-blue-500/15 text-blue-300 border-blue-500/30',      dot: 'bg-blue-300'   },
  Accepted:   { pill: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30', dot: 'bg-emerald-300' },
  Rejected:   { pill: 'bg-red-500/15 text-red-400 border-red-500/30',         dot: 'bg-red-400'    },
};

export default function AdminView() {
  const [section, setSection] = useState<Section>('dashboard');
  const [users, setUsers] = useState<User[]>(USERS);
  const [mobileNav, setMobileNav] = useState(false);

  const approve = (id: string) => setUsers(u => u.map(x => x.id === id ? { ...x, status: 'Approved' as UserStatus } : x));
  const reject  = (id: string) => setUsers(u => u.filter(x => x.id !== id));

  const pendingUsers = users.filter(u => u.status === 'Pending');
  const totalDealValue = DEAL_REQUESTS.reduce((s, d) => s + d.budget, 0);

  const navItems = [
    { key: 'dashboard' as Section, label: 'Dashboard', icon: '📊' },
    { key: 'users'     as Section, label: 'Users',     icon: '👥', count: users.length },
    { key: 'titles'    as Section, label: 'Titles',    icon: '🎬', count: TITLES.length },
    { key: 'deals'     as Section, label: 'Deals',     icon: '🤝', count: DEAL_REQUESTS.length },
  ];

  return (
    <div className="bg-[#0A0A0A] flex">

      {/* Sidebar — desktop */}
      <aside className="hidden lg:flex flex-col w-56 xl:w-64 bg-[#131313] border-r border-[#574335]/20 fixed top-16 bottom-0 overflow-y-auto z-30">
        <div className="px-5 py-5 border-b border-[#574335]/20">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-[#60a5fa]/15 border border-[#60a5fa]/30 rounded-lg flex items-center justify-center shrink-0">
              <span className="text-[#60a5fa] font-black text-xs">SA</span>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-[#E5E2E1] truncate">Super Admin</p>
              <p className="text-xs text-[#DEC1AF] truncate">admin@dubbingrights.com</p>
            </div>
          </div>
        </div>
        <nav className="flex flex-col gap-1 px-3 py-4 flex-1">
          {navItems.map(item => (
            <button key={item.key} onClick={() => setSection(item.key)}
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold text-left transition-all ${
                section === item.key
                  ? 'bg-[#60a5fa]/15 text-[#60a5fa] border border-[#60a5fa]/20'
                  : 'text-[#DEC1AF] hover:bg-[#1c1b1b] hover:text-[#E5E2E1] border border-transparent'
              }`}>
              <span className="flex items-center gap-2.5">
                <span>{item.icon}</span>
                {item.label}
              </span>
              {item.count !== undefined && (
                <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${section === item.key ? 'bg-[#60a5fa]/20 text-[#60a5fa]' : 'bg-[#201f1f] text-[#DEC1AF]'}`}>
                  {item.count}
                </span>
              )}
            </button>
          ))}
        </nav>
        <div className="px-5 py-4 border-t border-[#574335]/20">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs gap-2"><span className="text-[#DEC1AF] shrink-0">Platform</span><span className="text-[#4ade80] font-semibold">🟢 Online</span></div>
            <div className="flex justify-between items-center text-xs gap-2"><span className="text-[#DEC1AF] shrink-0">Pending</span><span className="text-[#E5E2E1] font-semibold shrink-0">{pendingUsers.length} waiting</span></div>
          </div>
        </div>
      </aside>

      {/* Mobile nav bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#131313] border-t border-[#574335]/20 flex">
        {navItems.map(item => (
          <button key={item.key} onClick={() => setSection(item.key)}
            className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs font-bold transition-colors ${
              section === item.key ? 'text-[#60a5fa]' : 'text-[#DEC1AF]'
            }`}>
            <span className="text-lg leading-none">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </div>

      {/* Main */}
      <main className="lg:ml-56 xl:ml-64 flex-1 px-4 sm:px-6 lg:px-8 py-8 pb-24 lg:pb-8 min-w-0 min-h-screen">

        {/* DASHBOARD */}
        {section === 'dashboard' && (
          <div>
            <div className="mb-7">
              <h1 className="text-2xl sm:text-3xl font-black tracking-tighter text-[#E5E2E1]">Admin Dashboard</h1>
              <p className="text-[#DEC1AF] text-sm mt-1">Platform overview and key metrics</p>
            </div>

            <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Titles Listed',     value: String(TITLES.length),         sub: 'Active in marketplace',                     color: 'text-[#F98110]',  border: 'border-[#F98110]/20',  bg: 'bg-[#F98110]/5'  },
                { label: 'Registered Users',  value: String(users.length),          sub: `${users.filter(u=>u.status==='Approved').length} approved`, color: 'text-[#60a5fa]', border: 'border-[#60a5fa]/20', bg: 'bg-[#60a5fa]/5' },
                { label: 'Deal Requests',     value: String(DEAL_REQUESTS.length),  sub: `${DEAL_REQUESTS.filter(d=>d.status==='Pending').length} pending`, color: 'text-yellow-400', border: 'border-yellow-400/20', bg: 'bg-yellow-400/5' },
                { label: 'Total Deal Value',  value: `$${(totalDealValue/1000).toFixed(0)}k`, sub: 'Across all requests',             color: 'text-[#4ade80]',  border: 'border-[#4ade80]/20',  bg: 'bg-[#4ade80]/5'  },
              ].map(s => (
                <div key={s.label} className={`rounded-xl p-4 sm:p-5 border ${s.border} ${s.bg} bg-[#1c1b1b]`}>
                  <p className={`text-3xl sm:text-4xl font-black ${s.color} mb-1 leading-tight`}>{s.value}</p>
                  <p className="text-xs sm:text-sm font-bold text-[#E5E2E1]">{s.label}</p>
                  <p className="text-xs text-[#DEC1AF] mt-0.5 hidden sm:block">{s.sub}</p>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-5">
              {/* Recent Deals */}
              <div className="bg-[#1c1b1b] border border-[#574335]/20 rounded-xl overflow-hidden">
                <div className="px-5 py-4 border-b border-[#574335]/20 flex items-center justify-between">
                  <h3 className="font-black text-[#E5E2E1] text-sm">Recent Deal Requests</h3>
                  <button onClick={() => setSection('deals')} className="text-xs text-[#F98110] font-bold hover:underline shrink-0">View all →</button>
                </div>
                <div className="divide-y divide-[#574335]/10">
                  {DEAL_REQUESTS.map(d => {
                    const ss = STATUS_STYLE[d.status];
                    return (
                      <div key={d.id} className="px-5 py-4 flex items-center gap-4 hover:bg-[#201f1f]/50 transition-colors">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-0.5">
                            <p className="text-sm font-bold text-[#E5E2E1]">{d.buyer}</p>
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[9px] font-bold rounded-md border whitespace-nowrap shrink-0 ${ss.pill}`}>
                              <span className={`w-1 h-1 rounded-full ${ss.dot}`}></span>
                              {d.status}
                            </span>
                          </div>
                          <p className="text-xs text-[#DEC1AF]">{d.titleName}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] text-[#DEC1AF] bg-[#201f1f] px-2 py-0.5 rounded">{d.rightsRequested}</span>
                            <span className="text-xs text-[#F98110] font-bold">${d.budget.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Pending Approvals */}
              <div className="bg-[#1c1b1b] border border-[#574335]/20 rounded-xl overflow-hidden">
                <div className="px-5 py-4 border-b border-[#574335]/20 flex items-center justify-between">
                  <h3 className="font-black text-[#E5E2E1] text-sm">Pending Approvals</h3>
                  {pendingUsers.length > 0 && (
                    <span className="bg-yellow-400/15 text-yellow-400 border border-yellow-400/30 text-xs font-bold px-2 py-1 rounded-lg shrink-0">{pendingUsers.length} waiting</span>
                  )}
                </div>
                {pendingUsers.length === 0 ? (
                  <div className="px-5 py-10 text-center">
                    <p className="text-2xl mb-2">✅</p>
                    <p className="text-sm font-semibold text-[#E5E2E1]">All caught up!</p>
                    <p className="text-xs text-[#DEC1AF] mt-1">No pending approvals.</p>
                  </div>
                ) : (
                  <div className="divide-y divide-[#574335]/10">
                    {pendingUsers.map(u => (
                      <div key={u.id} className="px-5 py-4 flex items-center justify-between gap-4 hover:bg-[#201f1f]/50 transition-colors">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-bold text-[#E5E2E1]">{u.name}</p>
                          <p className="text-xs text-[#DEC1AF] truncate">{u.company} · {u.role} · {u.country}</p>
                        </div>
                        <div className="flex gap-2 shrink-0">
                          <button onClick={() => approve(u.id)} className="px-3 py-1.5 bg-[#4ade80]/15 text-[#4ade80] text-xs font-bold rounded-lg border border-[#4ade80]/30 hover:bg-[#4ade80]/25 whitespace-nowrap">Approve</button>
                          <button onClick={() => reject(u.id)}  className="px-3 py-1.5 bg-red-500/10 text-red-400 text-xs font-bold rounded-lg border border-red-500/25 hover:bg-red-500/20 whitespace-nowrap">Reject</button>
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
            <div className="mb-7">
              <h1 className="text-2xl sm:text-3xl font-black tracking-tighter text-[#E5E2E1]">Users</h1>
              <p className="text-sm text-[#DEC1AF] mt-1">{users.length} registered · {pendingUsers.length} awaiting approval</p>
            </div>

            {/* Mobile cards */}
            <div className="lg:hidden flex flex-col gap-3">
              {users.map(user => (
                <div key={user.id} className="bg-[#1c1b1b] border border-[#574335]/20 rounded-xl p-4">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 bg-[#201f1f] rounded-lg flex items-center justify-center shrink-0 border border-[#574335]/30">
                        <span className="text-[#DEC1AF] font-bold text-xs">{user.name.split(' ').map(n=>n[0]).join('')}</span>
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-[#E5E2E1] text-sm">{user.name}</p>
                        <p className="text-xs text-[#DEC1AF] truncate">{user.company}</p>
                      </div>
                    </div>
                    <span className={`inline-flex items-center gap-1 px-2 py-1 text-[10px] font-bold rounded-lg border shrink-0 ${
                      user.status === 'Approved' ? 'bg-[#4ade80]/10 text-[#4ade80] border-[#4ade80]/20' : 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20'
                    }`}>{user.status}</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-[#DEC1AF]">
                    <span className={`px-2 py-1 text-[10px] font-bold rounded border ${user.role === 'Buyer' ? 'bg-[#F98110]/10 text-[#F98110] border-[#F98110]/20' : 'bg-[#60a5fa]/10 text-[#60a5fa] border-[#60a5fa]/20'}`}>{user.role}</span>
                    <span>{user.country}</span>
                  </div>
                  {user.status === 'Pending' && (
                    <div className="flex gap-2 mt-3">
                      <button onClick={() => approve(user.id)} className="flex-1 py-2 bg-[#4ade80]/15 text-[#4ade80] text-xs font-bold rounded-lg border border-[#4ade80]/30">Approve</button>
                      <button onClick={() => reject(user.id)}  className="flex-1 py-2 bg-red-500/10 text-red-400 text-xs font-bold rounded-lg border border-red-500/25">Reject</button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Desktop table */}
            <div className="hidden lg:block bg-[#1c1b1b] border border-[#574335]/20 rounded-xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#574335]/20 bg-[#131313]/40">
                    {['User', 'Company', 'Role', 'Country', 'Status', 'Actions'].map(h => (
                      <th key={h} className="text-left px-5 py-4 text-xs font-bold text-[#DEC1AF] uppercase tracking-widest">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, i) => (
                    <tr key={user.id} className={`${i < users.length - 1 ? 'border-b border-[#574335]/10' : ''} hover:bg-[#201f1f]/50 transition-colors`}>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-[#201f1f] rounded-lg flex items-center justify-center shrink-0 border border-[#574335]/30">
                            <span className="text-[#DEC1AF] font-bold text-xs">{user.name.split(' ').map(n=>n[0]).join('')}</span>
                          </div>
                          <div>
                            <p className="font-bold text-[#E5E2E1] text-sm">{user.name}</p>
                            <p className="text-xs text-[#DEC1AF]">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-sm font-semibold text-[#E5E2E1]">{user.company}</td>
                      <td className="px-5 py-4">
                        <span className={`px-2.5 py-1 text-[10px] font-bold rounded-lg border ${user.role === 'Buyer' ? 'bg-[#F98110]/10 text-[#F98110] border-[#F98110]/20' : 'bg-[#60a5fa]/10 text-[#60a5fa] border-[#60a5fa]/20'}`}>{user.role}</span>
                      </td>
                      <td className="px-5 py-4 text-sm text-[#DEC1AF]">{user.country}</td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold rounded-lg border ${user.status === 'Approved' ? 'bg-[#4ade80]/10 text-[#4ade80] border-[#4ade80]/20' : 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20'}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'Approved' ? 'bg-[#4ade80]' : 'bg-yellow-400'}`}></span>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        {user.status === 'Pending' ? (
                          <div className="flex gap-2">
                            <button onClick={() => approve(user.id)} className="px-3 py-1.5 bg-[#4ade80]/15 text-[#4ade80] text-xs font-bold rounded-lg border border-[#4ade80]/30 hover:bg-[#4ade80]/25">Approve</button>
                            <button onClick={() => reject(user.id)}  className="px-3 py-1.5 bg-red-500/10 text-red-400 text-xs font-bold rounded-lg border border-red-500/25 hover:bg-red-500/20">Reject</button>
                          </div>
                        ) : (
                          <button className="px-3 py-1.5 border border-[#574335]/30 text-[#DEC1AF] text-xs font-bold rounded-lg hover:bg-[#201f1f]">View</button>
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
            <div className="mb-7">
              <h1 className="text-2xl sm:text-3xl font-black tracking-tighter text-[#E5E2E1]">Titles</h1>
              <p className="text-sm text-[#DEC1AF] mt-1">{TITLES.length} titles in the marketplace</p>
            </div>

            {/* Mobile */}
            <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
              {TITLES.map(title => (
                <div key={title.id} className="bg-[#1c1b1b] border border-[#574335]/20 rounded-xl p-4 flex gap-3">
                  <img src={title.poster} alt={title.name} className="w-10 h-14 object-cover rounded-lg shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-[#E5E2E1] text-sm truncate">{title.name}</p>
                    <p className="text-xs text-[#DEC1AF]">{title.seller}</p>
                    <p className="text-sm font-black text-[#F98110] mt-1">${title.price.toLocaleString()}</p>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {title.rightsAvailable.map(r => (
                        <span key={r} className="px-1.5 py-0.5 bg-[#F98110]/10 text-[#F98110] text-[9px] font-bold rounded border border-[#F98110]/15">{r}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop table */}
            <div className="hidden lg:block bg-[#1c1b1b] border border-[#574335]/20 rounded-xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#574335]/20 bg-[#131313]/40">
                    {['Title', 'Seller', 'Rights', 'Price', 'Status', 'Action'].map(h => (
                      <th key={h} className="text-left px-5 py-4 text-xs font-bold text-[#DEC1AF] uppercase tracking-widest">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TITLES.map((title, i) => (
                    <tr key={title.id} className={`${i < TITLES.length - 1 ? 'border-b border-[#574335]/10' : ''} hover:bg-[#201f1f]/50 transition-colors`}>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <img src={title.poster} alt={title.name} className="w-9 h-12 object-cover rounded-lg shrink-0" />
                          <div>
                            <p className="font-bold text-[#E5E2E1] text-sm">{title.name}</p>
                            <p className="text-xs text-[#DEC1AF]">{title.genre} · {title.year}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-sm text-[#DEC1AF] whitespace-nowrap">{title.seller}</td>
                      <td className="px-5 py-4">
                        <div className="flex flex-wrap gap-1">
                          {title.rightsAvailable.map(r => (
                            <span key={r} className="px-2 py-1 bg-[#F98110]/10 text-[#F98110] text-[10px] font-bold rounded border border-[#F98110]/15 whitespace-nowrap">{r}</span>
                          ))}
                        </div>
                      </td>
                      <td className="px-5 py-4 font-black text-[#F98110] text-sm whitespace-nowrap">${title.price.toLocaleString()}</td>
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#4ade80]/10 text-[#4ade80] text-[10px] font-bold rounded-lg border border-[#4ade80]/20">
                          <span className="w-1.5 h-1.5 bg-[#4ade80] rounded-full"></span>{title.status}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <button className="px-3 py-1.5 border border-red-500/30 text-red-400 text-xs font-bold rounded-lg hover:bg-red-500/10 whitespace-nowrap">Unpublish</button>
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
            <div className="mb-7">
              <h1 className="text-2xl sm:text-3xl font-black tracking-tighter text-[#E5E2E1]">Deal Requests</h1>
              <p className="text-sm text-[#DEC1AF] mt-1">{DEAL_REQUESTS.length} requests · ${totalDealValue.toLocaleString()} total value</p>
            </div>

            {/* Mobile cards */}
            <div className="lg:hidden flex flex-col gap-3">
              {DEAL_REQUESTS.map(deal => {
                const ss = STATUS_STYLE[deal.status];
                return (
                  <div key={deal.id} className="bg-[#1c1b1b] border border-[#574335]/20 rounded-xl p-4">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <p className="font-bold text-[#E5E2E1] text-sm">{deal.buyer}</p>
                        <p className="text-xs text-[#DEC1AF]">{deal.titleName}</p>
                      </div>
                      <span className={`inline-flex items-center gap-1 px-2 py-1 text-[10px] font-bold rounded-lg border shrink-0 ${ss.pill}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${ss.dot}`}></span>
                        {deal.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div><span className="text-[#DEC1AF]">Rights:</span> <span className="text-[#E5E2E1] font-semibold">{deal.rightsRequested}</span></div>
                      <div><span className="text-[#DEC1AF]">Budget:</span> <span className="text-[#F98110] font-bold">${deal.budget.toLocaleString()}</span></div>
                      <div><span className="text-[#DEC1AF]">Territory:</span> <span className="text-[#E5E2E1]">{deal.territory}</span></div>
                      <div><span className="text-[#DEC1AF]">Date:</span> <span className="text-[#E5E2E1]">{deal.createdAt}</span></div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Desktop table */}
            <div className="hidden lg:block bg-[#1c1b1b] border border-[#574335]/20 rounded-xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#574335]/20 bg-[#131313]/40">
                    {['Buyer', 'Title', 'Rights', 'Territory', 'Budget', 'Date', 'Status'].map(h => (
                      <th key={h} className="text-left px-5 py-4 text-xs font-bold text-[#DEC1AF] uppercase tracking-widest">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {DEAL_REQUESTS.map((deal, i) => {
                    const ss = STATUS_STYLE[deal.status];
                    return (
                      <tr key={deal.id} className={`${i < DEAL_REQUESTS.length - 1 ? 'border-b border-[#574335]/10' : ''} hover:bg-[#201f1f]/50 transition-colors`}>
                        <td className="px-5 py-4 font-bold text-[#E5E2E1] text-sm whitespace-nowrap">{deal.buyer}</td>
                        <td className="px-5 py-4 text-sm text-[#DEC1AF] max-w-[160px]"><p className="truncate">{deal.titleName}</p></td>
                        <td className="px-5 py-4"><span className="px-2.5 py-1 bg-[#F98110]/10 text-[#F98110] text-[10px] font-bold rounded-lg border border-[#F98110]/15 whitespace-nowrap">{deal.rightsRequested}</span></td>
                        <td className="px-5 py-4 text-sm text-[#DEC1AF] whitespace-nowrap">{deal.territory}</td>
                        <td className="px-5 py-4 font-black text-[#F98110] text-sm whitespace-nowrap">${deal.budget.toLocaleString()}</td>
                        <td className="px-5 py-4 text-xs text-[#DEC1AF] whitespace-nowrap">{deal.createdAt}</td>
                        <td className="px-5 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-[10px] font-bold rounded-lg border whitespace-nowrap ${ss.pill}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${ss.dot}`}></span>
                            {deal.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
