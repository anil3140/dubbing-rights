'use client';

import { useState } from 'react';
import { TITLES, DEAL_REQUESTS, USERS, User, UserStatus } from '@/lib/dummyData';

type Section = 'dashboard' | 'users' | 'titles' | 'deals';

const STATUS_CONFIG: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  Pending:     { bg: 'bg-amber-500/10',   text: 'text-amber-400',   border: 'border-amber-500/30', dot: 'bg-amber-400' },
  'In Review': { bg: 'bg-blue-500/10',    text: 'text-blue-400',    border: 'border-blue-500/30',  dot: 'bg-blue-400' },
  Accepted:    { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30', dot: 'bg-emerald-400' },
  Rejected:    { bg: 'bg-red-500/10',     text: 'text-red-400',     border: 'border-red-500/30',   dot: 'bg-red-400' },
};

export default function AdminView() {
  const [section, setSection] = useState<Section>('dashboard');
  const [users, setUsers] = useState<User[]>(USERS);

  const approve = (id: string) => setUsers(u => u.map(x => x.id === id ? { ...x, status: 'Approved' as UserStatus } : x));
  const reject = (id: string) => setUsers(u => u.filter(x => x.id !== id));

  const pendingUsers = users.filter(u => u.status === 'Pending');
  const totalDealValue = DEAL_REQUESTS.reduce((s, d) => s + d.budget, 0);

  const navItems = [
    { key: 'dashboard' as Section, icon: '📊', label: 'Dashboard' },
    { key: 'users' as Section, icon: '👥', label: 'Users', count: users.length },
    { key: 'titles' as Section, icon: '🎬', label: 'Titles', count: TITLES.length },
    { key: 'deals' as Section, icon: '🤝', label: 'Deals', count: DEAL_REQUESTS.length },
  ];

  return (
    <div className="bg-[#0a0a0a] min-h-screen flex">
      
      {/* Sidebar — Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#111] border-r border-white/5 fixed top-16 bottom-0 z-30">
        {/* Profile */}
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-sm">SA</span>
            </div>
            <div>
              <p className="font-semibold text-white">Super Admin</p>
              <p className="text-xs text-white/40">admin@dubbingrights.com</p>
            </div>
          </div>
        </div>
        
        {/* Nav */}
        <nav className="flex-1 p-4">
          <div className="space-y-1">
            {navItems.map(item => (
              <button
                key={item.key}
                onClick={() => setSection(item.key)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  section === item.key
                    ? 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
                    : 'text-white/60 hover:bg-white/5 hover:text-white border border-transparent'
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className="text-lg">{item.icon}</span>
                  {item.label}
                </span>
                {item.count !== undefined && (
                  <span className={`px-2 py-0.5 rounded-md text-xs font-bold ${
                    section === item.key ? 'bg-blue-500/20 text-blue-400' : 'bg-white/10 text-white/50'
                  }`}>
                    {item.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </nav>
        
        {/* Status */}
        <div className="p-6 border-t border-white/5">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/40">Platform Status</span>
              <span className="flex items-center gap-2 text-emerald-400">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                Online
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/40">Pending Approvals</span>
              <span className="text-amber-400 font-semibold">{pendingUsers.length}</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#111] border-t border-white/10">
        <div className="flex">
          {navItems.map(item => (
            <button
              key={item.key}
              onClick={() => setSection(item.key)}
              className={`flex-1 flex flex-col items-center gap-1 py-4 text-xs font-medium transition-colors ${
                section === item.key ? 'text-blue-400' : 'text-white/50'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="lg:ml-64 flex-1 p-6 lg:p-10 pb-24 lg:pb-10">
        
        {/* DASHBOARD */}
        {section === 'dashboard' && (
          <div>
            <div className="mb-10">
              <p className="text-sm text-blue-400 font-semibold uppercase tracking-widest mb-2">Admin Panel</p>
              <h1 className="text-3xl sm:text-4xl font-bold text-white">Platform Dashboard</h1>
            </div>

            {/* Stats Grid */}
            <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
              {[
                { icon: '🎬', value: TITLES.length.toString(), label: 'Titles Listed', sub: 'Active in marketplace', color: 'text-orange-400', glow: 'from-orange-500/10' },
                { icon: '👥', value: users.length.toString(), label: 'Registered Users', sub: `${users.filter(u => u.status === 'Approved').length} approved`, color: 'text-blue-400', glow: 'from-blue-500/10' },
                { icon: '📬', value: DEAL_REQUESTS.length.toString(), label: 'Deal Requests', sub: `${DEAL_REQUESTS.filter(d => d.status === 'Pending').length} pending`, color: 'text-amber-400', glow: 'from-amber-500/10' },
                { icon: '💰', value: `$${(totalDealValue / 1000).toFixed(0)}K`, label: 'Total Deal Value', sub: 'Across all requests', color: 'text-emerald-400', glow: 'from-emerald-500/10' },
              ].map(s => (
                <div key={s.label} className={`relative bg-[#141414] border border-white/5 rounded-2xl p-6 overflow-hidden`}>
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${s.glow} to-transparent blur-2xl`} />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl">{s.icon}</span>
                      <span className={`text-xs font-semibold ${s.color} uppercase tracking-widest`}>{s.label}</span>
                    </div>
                    <p className={`text-4xl font-black ${s.color} mb-1`}>{s.value}</p>
                    <p className="text-white/40 text-sm">{s.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Panels Grid */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Deals */}
              <div className="bg-[#141414] border border-white/5 rounded-2xl overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                  <h3 className="font-bold text-white">Recent Deal Requests</h3>
                  <button onClick={() => setSection('deals')} className="text-sm text-blue-400 font-medium hover:text-blue-300">View All →</button>
                </div>
                <div className="divide-y divide-white/5">
                  {DEAL_REQUESTS.map(d => {
                    const s = STATUS_CONFIG[d.status];
                    return (
                      <div key={d.id} className="px-6 py-4 hover:bg-white/[0.02] transition-colors">
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <p className="font-semibold text-white">{d.buyer}</p>
                              <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 ${s.bg} ${s.text} text-[10px] font-bold rounded-full border ${s.border}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`}></span>
                                {d.status}
                              </span>
                            </div>
                            <p className="text-white/40 text-sm truncate">{d.titleName} · {d.rightsRequested}</p>
                          </div>
                          <p className="text-orange-400 font-bold shrink-0">${d.budget.toLocaleString()}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Pending Approvals */}
              <div className="bg-[#141414] border border-white/5 rounded-2xl overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                  <h3 className="font-bold text-white">Pending Approvals</h3>
                  {pendingUsers.length > 0 && (
                    <span className="px-3 py-1 bg-amber-500/15 text-amber-400 text-xs font-bold rounded-full border border-amber-500/30">
                      {pendingUsers.length} waiting
                    </span>
                  )}
                </div>
                {pendingUsers.length === 0 ? (
                  <div className="px-6 py-16 text-center">
                    <span className="text-4xl mb-4 block">✅</span>
                    <p className="text-white font-semibold mb-1">All caught up!</p>
                    <p className="text-white/40 text-sm">No pending approvals.</p>
                  </div>
                ) : (
                  <div className="divide-y divide-white/5">
                    {pendingUsers.map(u => (
                      <div key={u.id} className="px-6 py-4 hover:bg-white/[0.02] transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                            <span className="text-white/60 font-bold text-sm">{u.name.split(' ').map(n => n[0]).join('')}</span>
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-semibold text-white">{u.name}</p>
                            <p className="text-white/40 text-sm truncate">{u.company} · {u.role}</p>
                          </div>
                          <div className="flex gap-2 shrink-0">
                            <button onClick={() => approve(u.id)} className="px-4 py-2 bg-emerald-500/15 text-emerald-400 text-sm font-semibold rounded-lg border border-emerald-500/30 hover:bg-emerald-500/25">Approve</button>
                            <button onClick={() => reject(u.id)} className="px-4 py-2 bg-red-500/10 text-red-400 text-sm font-semibold rounded-lg border border-red-500/30 hover:bg-red-500/20">Reject</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Activity Feed */}
            <div className="mt-6 bg-[#141414] border border-white/5 rounded-2xl p-6">
              <h3 className="font-bold text-white mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {[
                  { icon: '🆕', text: 'New title "Iron Dynasty" listed by Dynasty Media', time: '2 hours ago', color: 'text-teal-400' },
                  { icon: '📬', text: 'NetflixEMEA submitted deal request for Iron Dynasty', time: '3 hours ago', color: 'text-blue-400' },
                  { icon: '✅', text: 'User "Sarah Chen" was approved', time: '5 hours ago', color: 'text-emerald-400' },
                  { icon: '💰', text: 'Deal accepted: The Last Frontier to Prime Video ($30K)', time: '1 day ago', color: 'text-orange-400' },
                ].map((a, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <span className="text-xl">{a.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-white/80 text-sm">{a.text}</p>
                      <p className={`text-xs ${a.color} mt-0.5`}>{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* USERS */}
        {section === 'users' && (
          <div>
            <div className="mb-10">
              <p className="text-sm text-blue-400 font-semibold uppercase tracking-widest mb-2">User Management</p>
              <h1 className="text-3xl sm:text-4xl font-bold text-white">Registered Users</h1>
              <p className="text-white/40 mt-2">{users.length} total · {pendingUsers.length} pending approval</p>
            </div>

            <div className="bg-[#141414] border border-white/5 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/5">
                      {['User', 'Company', 'Role', 'Country', 'Status', 'Actions'].map(h => (
                        <th key={h} className="text-left px-6 py-4 text-xs font-semibold text-white/40 uppercase tracking-widest">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, i) => (
                      <tr key={user.id} className={`${i < users.length - 1 ? 'border-b border-white/5' : ''} hover:bg-white/[0.02] transition-colors`}>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                              <span className="text-white/60 font-bold text-sm">{user.name.split(' ').map(n => n[0]).join('')}</span>
                            </div>
                            <div>
                              <p className="font-semibold text-white">{user.name}</p>
                              <p className="text-white/40 text-sm">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5 text-white">{user.company}</td>
                        <td className="px-6 py-5">
                          <span className={`px-3 py-1 text-xs font-semibold rounded-lg ${
                            user.role === 'Buyer' 
                              ? 'bg-orange-500/15 text-orange-400 border border-orange-500/30'
                              : 'bg-teal-500/15 text-teal-400 border border-teal-500/30'
                          }`}>{user.role}</span>
                        </td>
                        <td className="px-6 py-5 text-white/60">{user.country}</td>
                        <td className="px-6 py-5">
                          <span className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-bold rounded-full ${
                            user.status === 'Approved' 
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                              : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                          }`}>
                            <span className={`w-2 h-2 rounded-full ${user.status === 'Approved' ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          {user.status === 'Pending' ? (
                            <div className="flex gap-2">
                              <button onClick={() => approve(user.id)} className="px-4 py-2 bg-emerald-500/15 text-emerald-400 text-sm font-semibold rounded-lg border border-emerald-500/30 hover:bg-emerald-500/25">Approve</button>
                              <button onClick={() => reject(user.id)} className="px-4 py-2 bg-red-500/10 text-red-400 text-sm font-semibold rounded-lg border border-red-500/30 hover:bg-red-500/20">Reject</button>
                            </div>
                          ) : (
                            <button className="px-4 py-2 border border-white/10 text-white/60 text-sm font-medium rounded-lg hover:bg-white/5">View</button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TITLES */}
        {section === 'titles' && (
          <div>
            <div className="mb-10">
              <p className="text-sm text-blue-400 font-semibold uppercase tracking-widest mb-2">Content Management</p>
              <h1 className="text-3xl sm:text-4xl font-bold text-white">All Titles</h1>
              <p className="text-white/40 mt-2">{TITLES.length} titles in the marketplace</p>
            </div>

            <div className="bg-[#141414] border border-white/5 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/5">
                      {['Title', 'Seller', 'Rights', 'Price', 'Status', 'Action'].map(h => (
                        <th key={h} className="text-left px-6 py-4 text-xs font-semibold text-white/40 uppercase tracking-widest">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {TITLES.map((title, i) => (
                      <tr key={title.id} className={`${i < TITLES.length - 1 ? 'border-b border-white/5' : ''} hover:bg-white/[0.02] transition-colors`}>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-4">
                            <img src={title.poster} alt={title.name} className="w-10 h-14 object-cover rounded-lg" />
                            <div>
                              <p className="font-semibold text-white">{title.name}</p>
                              <p className="text-white/40 text-sm">{title.genre} · {title.year}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5 text-white/60">{title.seller}</td>
                        <td className="px-6 py-5">
                          <div className="flex flex-wrap gap-1.5">
                            {title.rightsAvailable.slice(0, 2).map(r => (
                              <span key={r} className="px-2 py-1 bg-teal-500/10 text-teal-400 text-[10px] font-semibold rounded-md border border-teal-500/20">
                                {r.replace('Rights', '').trim()}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-5 text-white font-bold">${title.price.toLocaleString()}</td>
                        <td className="px-6 py-5">
                          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 text-emerald-400 text-xs font-bold rounded-full border border-emerald-500/30">
                            <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                            Active
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <button className="px-4 py-2 border border-red-500/30 text-red-400 text-sm font-medium rounded-lg hover:bg-red-500/10">Unpublish</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* DEALS */}
        {section === 'deals' && (
          <div>
            <div className="mb-10">
              <p className="text-sm text-blue-400 font-semibold uppercase tracking-widest mb-2">Deal Management</p>
              <h1 className="text-3xl sm:text-4xl font-bold text-white">All Deal Requests</h1>
              <p className="text-white/40 mt-2">{DEAL_REQUESTS.length} requests · ${totalDealValue.toLocaleString()} total value</p>
            </div>

            <div className="bg-[#141414] border border-white/5 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/5">
                      {['Buyer', 'Title', 'Rights', 'Territory', 'Budget', 'Date', 'Status'].map(h => (
                        <th key={h} className="text-left px-6 py-4 text-xs font-semibold text-white/40 uppercase tracking-widest">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {DEAL_REQUESTS.map((deal, i) => {
                      const s = STATUS_CONFIG[deal.status];
                      return (
                        <tr key={deal.id} className={`${i < DEAL_REQUESTS.length - 1 ? 'border-b border-white/5' : ''} hover:bg-white/[0.02] transition-colors`}>
                          <td className="px-6 py-5 font-semibold text-white">{deal.buyer}</td>
                          <td className="px-6 py-5 text-white/60">{deal.titleName}</td>
                          <td className="px-6 py-5">
                            <span className="px-3 py-1 bg-teal-500/10 text-teal-400 text-xs font-semibold rounded-lg border border-teal-500/20">
                              {deal.rightsRequested}
                            </span>
                          </td>
                          <td className="px-6 py-5 text-white/60">{deal.territory}</td>
                          <td className="px-6 py-5 text-orange-400 font-bold">${deal.budget.toLocaleString()}</td>
                          <td className="px-6 py-5 text-white/40 text-sm">{deal.createdAt}</td>
                          <td className="px-6 py-5">
                            <span className={`inline-flex items-center gap-2 px-3 py-1.5 ${s.bg} ${s.text} text-xs font-bold rounded-full border ${s.border}`}>
                              <span className={`w-2 h-2 rounded-full ${s.dot}`}></span>
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
          </div>
        )}

      </main>
    </div>
  );
}
