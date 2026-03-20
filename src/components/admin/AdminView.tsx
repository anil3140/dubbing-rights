'use client';

import { useState } from 'react';
import { TITLES, DEAL_REQUESTS, USERS, User, UserStatus } from '@/lib/dummyData';

type AdminSection = 'dashboard' | 'users' | 'titles' | 'deals';

const STATUS_COLORS: Record<string, string> = {
  Pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  'In Review': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  Accepted: 'bg-green-500/20 text-green-400 border-green-500/30',
  Rejected: 'bg-red-500/20 text-red-400 border-red-500/30',
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

  const navItems: { key: AdminSection; label: string; icon: string }[] = [
    { key: 'dashboard', label: 'Dashboard', icon: '📊' },
    { key: 'users', label: 'Users', icon: '👥' },
    { key: 'titles', label: 'Titles', icon: '🎬' },
    { key: 'deals', label: 'Deals', icon: '🤝' },
  ];

  const totalDealValue = DEAL_REQUESTS.reduce((sum, d) => sum + d.budget, 0);

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#131313] border-r border-[#574335]/20 flex flex-col pt-8 fixed h-full top-[72px]">
        <div className="px-6 mb-8">
          <p className="text-xs font-bold text-[#DEC1AF] uppercase tracking-widest mb-1">Admin Panel</p>
          <p className="text-sm text-[#60a5fa] font-semibold">Super Admin</p>
        </div>
        <nav className="flex flex-col gap-1 px-3">
          {navItems.map(item => (
            <button
              key={item.key}
              onClick={() => setSection(item.key)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold text-left transition-all ${
                section === item.key
                  ? 'bg-[#60a5fa]/15 text-[#60a5fa] border border-[#60a5fa]/20'
                  : 'text-[#DEC1AF] hover:bg-[#201f1f] hover:text-[#E5E2E1]'
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Sidebar stats */}
        <div className="mt-auto px-6 pb-8 border-t border-[#574335]/20 pt-6">
          <div className="space-y-3">
            <div className="flex justify-between text-xs">
              <span className="text-[#DEC1AF]">Total Titles</span>
              <span className="text-[#E5E2E1] font-bold">{TITLES.length}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-[#DEC1AF]">Active Users</span>
              <span className="text-[#E5E2E1] font-bold">{users.filter(u => u.status === 'Approved').length}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-[#DEC1AF]">Open Deals</span>
              <span className="text-[#E5E2E1] font-bold">{DEAL_REQUESTS.filter(d => d.status !== 'Accepted').length}</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-64 flex-1 p-8 pt-[88px]">

        {/* DASHBOARD */}
        {section === 'dashboard' && (
          <div>
            <h1 className="text-3xl font-black tracking-tighter text-[#E5E2E1] mb-2">Admin Dashboard</h1>
            <p className="text-[#DEC1AF] mb-10">Platform overview and key metrics</p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              {[
                { label: 'Titles Listed', value: TITLES.length.toString(), color: 'text-[#F98110]', bg: 'bg-[#F98110]/10 border-[#F98110]/20' },
                { label: 'Registered Users', value: users.length.toString(), color: 'text-[#60a5fa]', bg: 'bg-[#60a5fa]/10 border-[#60a5fa]/20' },
                { label: 'Deal Requests', value: DEAL_REQUESTS.length.toString(), color: 'text-yellow-400', bg: 'bg-yellow-400/10 border-yellow-400/20' },
                { label: 'Total Deal Value', value: `$${(totalDealValue / 1000).toFixed(0)}k`, color: 'text-[#4ade80]', bg: 'bg-[#4ade80]/10 border-[#4ade80]/20' },
              ].map(s => (
                <div key={s.label} className={`rounded-xl p-6 border ${s.bg}`}>
                  <p className={`text-4xl font-black ${s.color} mb-1`}>{s.value}</p>
                  <p className="text-sm text-[#DEC1AF] font-semibold">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Recent activity */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-[rgba(28,27,27,0.7)] border border-[#574335]/20 rounded-xl p-6">
                <h3 className="font-black text-[#E5E2E1] mb-4">Recent Deal Requests</h3>
                <div className="space-y-3">
                  {DEAL_REQUESTS.map(d => (
                    <div key={d.id} className="flex items-center justify-between py-2 border-b border-[#574335]/15 last:border-0">
                      <div>
                        <p className="text-sm font-semibold text-[#E5E2E1]">{d.buyer}</p>
                        <p className="text-xs text-[#DEC1AF]">{d.titleName} · {d.rightsRequested}</p>
                      </div>
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded border ${STATUS_COLORS[d.status]}`}>{d.status}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-[rgba(28,27,27,0.7)] border border-[#574335]/20 rounded-xl p-6">
                <h3 className="font-black text-[#E5E2E1] mb-4">Pending Approvals</h3>
                <div className="space-y-3">
                  {users.filter(u => u.status === 'Pending').map(u => (
                    <div key={u.id} className="flex items-center justify-between py-2 border-b border-[#574335]/15 last:border-0">
                      <div>
                        <p className="text-sm font-semibold text-[#E5E2E1]">{u.name}</p>
                        <p className="text-xs text-[#DEC1AF]">{u.company} · {u.role}</p>
                      </div>
                      <button onClick={() => approveUser(u.id)}
                        className="px-3 py-1 bg-[#4ade80]/20 text-[#4ade80] text-xs font-bold rounded border border-[#4ade80]/30 hover:bg-[#4ade80]/30 transition-colors">
                        Approve
                      </button>
                    </div>
                  ))}
                  {users.filter(u => u.status === 'Pending').length === 0 && (
                    <p className="text-[#DEC1AF] text-sm">No pending approvals.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* USERS */}
        {section === 'users' && (
          <div>
            <h1 className="text-3xl font-black tracking-tighter text-[#E5E2E1] mb-2">Users</h1>
            <p className="text-[#DEC1AF] mb-8">{users.length} registered accounts</p>
            <div className="bg-[rgba(28,27,27,0.7)] border border-[#574335]/20 rounded-xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#574335]/20">
                    {['Name', 'Company', 'Role', 'Country', 'Status', 'Actions'].map(h => (
                      <th key={h} className="text-left px-6 py-4 text-xs font-bold text-[#DEC1AF] uppercase tracking-widest">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, i) => (
                    <tr key={user.id} className={`${i < users.length - 1 ? 'border-b border-[#574335]/10' : ''} hover:bg-[#201f1f]/50 transition-colors`}>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-[#E5E2E1] text-sm">{user.name}</p>
                          <p className="text-xs text-[#DEC1AF]">{user.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-[#E5E2E1]">{user.company}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 text-[10px] font-bold rounded border ${
                          user.role === 'Buyer' ? 'bg-[#F98110]/15 text-[#F98110] border-[#F98110]/25' : 'bg-[#60a5fa]/15 text-[#60a5fa] border-[#60a5fa]/25'
                        }`}>{user.role}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-[#DEC1AF]">{user.country}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 text-[10px] font-bold rounded border ${
                          user.status === 'Approved'
                            ? 'bg-[#4ade80]/15 text-[#4ade80] border-[#4ade80]/25'
                            : 'bg-yellow-400/15 text-yellow-400 border-yellow-400/25'
                        }`}>{user.status}</span>
                      </td>
                      <td className="px-6 py-4">
                        {user.status === 'Pending' ? (
                          <div className="flex gap-2">
                            <button onClick={() => approveUser(user.id)}
                              className="px-3 py-1.5 bg-[#4ade80]/15 text-[#4ade80] text-xs font-bold rounded border border-[#4ade80]/30 hover:bg-[#4ade80]/25 transition-colors">
                              Approve
                            </button>
                            <button onClick={() => rejectUser(user.id)}
                              className="px-3 py-1.5 bg-red-500/15 text-red-400 text-xs font-bold rounded border border-red-500/30 hover:bg-red-500/25 transition-colors">
                              Reject
                            </button>
                          </div>
                        ) : (
                          <span className="text-xs text-[#DEC1AF]">—</span>
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
            <h1 className="text-3xl font-black tracking-tighter text-[#E5E2E1] mb-2">Titles</h1>
            <p className="text-[#DEC1AF] mb-8">{TITLES.length} titles in the marketplace</p>
            <div className="bg-[rgba(28,27,27,0.7)] border border-[#574335]/20 rounded-xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#574335]/20">
                    {['Title', 'Seller', 'Rights', 'Price', 'Status', 'Action'].map(h => (
                      <th key={h} className="text-left px-6 py-4 text-xs font-bold text-[#DEC1AF] uppercase tracking-widest">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TITLES.map((title, i) => (
                    <tr key={title.id} className={`${i < TITLES.length - 1 ? 'border-b border-[#574335]/10' : ''} hover:bg-[#201f1f]/50 transition-colors`}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img src={title.poster} alt={title.name} className="w-8 h-12 object-cover rounded" />
                          <div>
                            <p className="font-semibold text-[#E5E2E1] text-sm">{title.name}</p>
                            <p className="text-xs text-[#DEC1AF]">{title.genre} · {title.year}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-[#DEC1AF]">{title.seller}</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {title.rightsAvailable.map(r => (
                            <span key={r} className="px-1.5 py-0.5 bg-[#F98110]/10 text-[#F98110] text-[9px] font-bold rounded border border-[#F98110]/15">{r}</span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-black text-[#F98110] text-sm">${title.price.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-0.5 bg-[#4ade80]/15 text-[#4ade80] text-[10px] font-bold rounded border border-[#4ade80]/25">{title.status}</span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="px-3 py-1.5 border border-red-500/30 text-red-400 text-xs font-bold rounded hover:bg-red-500/10 transition-colors">Unpublish</button>
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
            <h1 className="text-3xl font-black tracking-tighter text-[#E5E2E1] mb-2">Deal Requests</h1>
            <p className="text-[#DEC1AF] mb-8">{DEAL_REQUESTS.length} active deal requests</p>
            <div className="bg-[rgba(28,27,27,0.7)] border border-[#574335]/20 rounded-xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#574335]/20">
                    {['Buyer', 'Title', 'Rights', 'Territory', 'Budget', 'Date', 'Status'].map(h => (
                      <th key={h} className="text-left px-6 py-4 text-xs font-bold text-[#DEC1AF] uppercase tracking-widest">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {DEAL_REQUESTS.map((deal, i) => (
                    <tr key={deal.id} className={`${i < DEAL_REQUESTS.length - 1 ? 'border-b border-[#574335]/10' : ''} hover:bg-[#201f1f]/50 transition-colors`}>
                      <td className="px-6 py-4 font-semibold text-[#E5E2E1] text-sm">{deal.buyer}</td>
                      <td className="px-6 py-4 text-sm text-[#DEC1AF]">{deal.titleName}</td>
                      <td className="px-6 py-4 text-sm text-[#E5E2E1]">{deal.rightsRequested}</td>
                      <td className="px-6 py-4 text-sm text-[#DEC1AF]">{deal.territory}</td>
                      <td className="px-6 py-4 font-black text-[#F98110] text-sm">${deal.budget.toLocaleString()}</td>
                      <td className="px-6 py-4 text-xs text-[#DEC1AF]">{deal.createdAt}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 text-[10px] font-bold rounded border ${STATUS_COLORS[deal.status]}`}>{deal.status}</span>
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
