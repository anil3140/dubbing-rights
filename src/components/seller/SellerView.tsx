'use client';

import { useState } from 'react';
import { TITLES, DEAL_REQUESTS, DealRequest } from '@/lib/dummyData';

const SELLER_TITLES = TITLES.filter(t => t.sellerId === 'seller-1');

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

function Toast({ message }: { message: string }) {
  return (
    <div className="fixed bottom-8 right-8 z-[100] bg-[#4ade80] text-black px-6 py-4 rounded-xl font-bold shadow-2xl flex items-center gap-3">
      <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
      </svg>
      {message}
    </div>
  );
}

function AddTitleModal({ onClose, onSubmit }: { onClose: () => void; onSubmit: () => void }) {
  const [form, setForm] = useState({
    title: '', year: '', genre: '', synopsis: '', posterUrl: '', screenerUrl: '',
    rights: [] as string[], territories: [] as string[], price: '',
  });

  const allRights = ['SVOD', 'AVOD', 'Dubbing', 'Theatrical', 'Digital Rights'];
  const allTerritories = ['Global', 'Latin America', 'Europe', 'Asia Pacific', 'Middle East & North Africa', 'United States', 'Global Digital'];

  const toggleItem = (key: 'rights' | 'territories', val: string) => {
    setForm(f => ({
      ...f,
      [key]: f[key].includes(val) ? f[key].filter(x => x !== val) : [...f[key], val],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 overflow-y-auto" onClick={onClose}>
      <div className="bg-[#1c1b1b] rounded-2xl p-8 max-w-lg w-full border border-[#574335]/30 shadow-2xl my-8" onClick={e => e.stopPropagation()}>
        <div className="mb-6">
          <h3 className="text-xl font-black text-[#E5E2E1]">Add New Title</h3>
          <p className="text-sm text-[#DEC1AF] mt-1">List a new film in the marketplace</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#DEC1AF] uppercase tracking-widest mb-2">Title Name</label>
              <input required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. Midnight Protocol"
                className="w-full bg-[#131313] border border-[#574335]/50 rounded-xl px-4 py-3 text-[#E5E2E1] text-sm focus:outline-none focus:border-[#F98110] transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#DEC1AF] uppercase tracking-widest mb-2">Year</label>
              <input required type="number" placeholder="2024" value={form.year} onChange={e => setForm({ ...form, year: e.target.value })}
                className="w-full bg-[#131313] border border-[#574335]/50 rounded-xl px-4 py-3 text-[#E5E2E1] text-sm focus:outline-none focus:border-[#F98110] transition-colors" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-[#DEC1AF] uppercase tracking-widest mb-2">Genre</label>
            <input required value={form.genre} onChange={e => setForm({ ...form, genre: e.target.value })} placeholder="e.g. Action / Thriller"
              className="w-full bg-[#131313] border border-[#574335]/50 rounded-xl px-4 py-3 text-[#E5E2E1] text-sm focus:outline-none focus:border-[#F98110] transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#DEC1AF] uppercase tracking-widest mb-2">Synopsis</label>
            <textarea required rows={3} value={form.synopsis} onChange={e => setForm({ ...form, synopsis: e.target.value })}
              placeholder="Brief description of the film..."
              className="w-full bg-[#131313] border border-[#574335]/50 rounded-xl px-4 py-3 text-[#E5E2E1] text-sm focus:outline-none focus:border-[#F98110] resize-none transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#DEC1AF] uppercase tracking-widest mb-2">Poster Image URL</label>
            <input value={form.posterUrl} onChange={e => setForm({ ...form, posterUrl: e.target.value })} placeholder="https://..."
              className="w-full bg-[#131313] border border-[#574335]/50 rounded-xl px-4 py-3 text-[#E5E2E1] text-sm focus:outline-none focus:border-[#F98110] transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#DEC1AF] uppercase tracking-widest mb-2">YouTube Screener URL</label>
            <input value={form.screenerUrl} onChange={e => setForm({ ...form, screenerUrl: e.target.value })} placeholder="https://www.youtube.com/embed/..."
              className="w-full bg-[#131313] border border-[#574335]/50 rounded-xl px-4 py-3 text-[#E5E2E1] text-sm focus:outline-none focus:border-[#F98110] transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#DEC1AF] uppercase tracking-widest mb-3">Rights Available</label>
            <div className="flex flex-wrap gap-2">
              {allRights.map(r => (
                <button type="button" key={r} onClick={() => toggleItem('rights', r)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                    form.rights.includes(r)
                      ? 'bg-[#F98110] text-black border-[#F98110]'
                      : 'bg-[#131313] text-[#DEC1AF] border-[#574335]/40 hover:border-[#F98110]/50'
                  }`}>
                  {r}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-[#DEC1AF] uppercase tracking-widest mb-3">Territories</label>
            <div className="flex flex-wrap gap-2">
              {allTerritories.map(t => (
                <button type="button" key={t} onClick={() => toggleItem('territories', t)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                    form.territories.includes(t)
                      ? 'bg-[#60a5fa]/20 text-[#60a5fa] border-[#60a5fa]/50'
                      : 'bg-[#131313] text-[#DEC1AF] border-[#574335]/40 hover:border-[#60a5fa]/40'
                  }`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-[#DEC1AF] uppercase tracking-widest mb-2">Asking Price (USD)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#DEC1AF] font-semibold">$</span>
              <input required type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} placeholder="45,000"
                className="w-full bg-[#131313] border border-[#574335]/50 rounded-xl pl-8 pr-4 py-3 text-[#E5E2E1] text-sm focus:outline-none focus:border-[#F98110] transition-colors" />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 px-4 py-3 border border-[#574335]/50 rounded-xl text-[#DEC1AF] text-sm font-bold hover:bg-[#201f1f] transition-colors">
              Cancel
            </button>
            <button type="submit"
              className="flex-1 px-4 py-3 bg-[#F98110] text-black rounded-xl text-sm font-extrabold hover:brightness-110 transition-all">
              Publish Title →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function DealCard({ deal }: { deal: DealRequest }) {
  return (
    <div className="bg-[#1c1b1b] border border-[#574335]/20 rounded-2xl p-6 hover:border-[#574335]/40 transition-colors">
      <div className="flex items-start justify-between mb-5">
        <div>
          <p className="font-black text-[#E5E2E1] text-base">{deal.buyer}</p>
          <p className="text-sm text-[#DEC1AF] mt-0.5">{deal.titleName}</p>
        </div>
        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg border shrink-0 ${STATUS_COLORS[deal.status]}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[deal.status]}`}></span>
          {deal.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-5">
        <div className="bg-[#131313] rounded-xl p-3">
          <p className="text-[10px] text-[#DEC1AF] uppercase tracking-widest mb-1">Rights</p>
          <p className="text-sm font-bold text-[#E5E2E1]">{deal.rightsRequested}</p>
        </div>
        <div className="bg-[#131313] rounded-xl p-3">
          <p className="text-[10px] text-[#DEC1AF] uppercase tracking-widest mb-1">Budget</p>
          <p className="text-sm font-bold text-[#F98110]">${deal.budget.toLocaleString()}</p>
        </div>
        <div className="bg-[#131313] rounded-xl p-3">
          <p className="text-[10px] text-[#DEC1AF] uppercase tracking-widest mb-1">Territory</p>
          <p className="text-sm font-bold text-[#E5E2E1]">{deal.territory}</p>
        </div>
        <div className="bg-[#131313] rounded-xl p-3">
          <p className="text-[10px] text-[#DEC1AF] uppercase tracking-widest mb-1">Received</p>
          <p className="text-sm font-bold text-[#E5E2E1]">{deal.createdAt}</p>
        </div>
      </div>

      <div className="bg-[#131313] rounded-xl p-3 mb-5">
        <p className="text-xs text-[#DEC1AF]/80 italic leading-relaxed line-clamp-2">&ldquo;{deal.message}&rdquo;</p>
      </div>

      <div className="flex gap-2">
        <button className="flex-1 px-4 py-2.5 border border-[#574335]/40 rounded-xl text-xs font-bold text-[#DEC1AF] hover:bg-[#201f1f] transition-colors">
          View Details
        </button>
        <button className="flex-1 px-4 py-2.5 bg-[#F98110] text-black rounded-xl text-xs font-extrabold hover:brightness-110 transition-all">
          Respond
        </button>
      </div>
    </div>
  );
}

export default function SellerView() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <div className="max-w-screen-xl mx-auto px-8 py-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <p className="text-sm text-[#DEC1AF] font-semibold mb-1 uppercase tracking-widest">Seller Dashboard</p>
            <h1 className="text-3xl font-black tracking-tighter text-[#E5E2E1]">
              Welcome back, <span className="text-[#F98110]">Horizon Films</span>
            </h1>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 bg-[#F98110] text-black px-6 py-3 rounded-xl font-extrabold hover:brightness-110 transition-all shadow-lg shadow-[#F98110]/20 self-start md:self-auto"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            Add New Title
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">
          {[
            { label: 'Active Listings', value: '3', sub: 'In the marketplace', color: 'text-[#F98110]', border: 'border-[#F98110]/20', glow: 'bg-[#F98110]/5' },
            { label: 'Pending Requests', value: '2', sub: 'Awaiting your response', color: 'text-yellow-400', border: 'border-yellow-400/20', glow: 'bg-yellow-400/5' },
            { label: 'Total Deal Value', value: '$125,000', sub: 'Across all active deals', color: 'text-[#4ade80]', border: 'border-[#4ade80]/20', glow: 'bg-[#4ade80]/5' },
          ].map(s => (
            <div key={s.label} className={`rounded-2xl p-6 border ${s.border} ${s.glow} bg-[#1c1b1b]`}>
              <p className={`text-4xl font-black ${s.color} mb-1 leading-tight`}>{s.value}</p>
              <p className="text-sm font-bold text-[#E5E2E1] mb-0.5">{s.label}</p>
              <p className="text-xs text-[#DEC1AF]">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* My Listings */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black text-[#E5E2E1] tracking-tight">My Listings</h2>
            <span className="text-xs text-[#DEC1AF] bg-[#1c1b1b] border border-[#574335]/30 rounded-lg px-3 py-1.5 font-semibold">
              {SELLER_TITLES.length} titles
            </span>
          </div>
          <div className="bg-[#1c1b1b] border border-[#574335]/20 rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#574335]/20 bg-[#131313]/50">
                  <th className="text-left px-6 py-4 text-xs font-bold text-[#DEC1AF] uppercase tracking-widest">Title</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-[#DEC1AF] uppercase tracking-widest hidden lg:table-cell">Rights Available</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-[#DEC1AF] uppercase tracking-widest">Price</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-[#DEC1AF] uppercase tracking-widest">Status</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-[#DEC1AF] uppercase tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody>
                {SELLER_TITLES.map((title, i) => (
                  <tr
                    key={title.id}
                    className={`${i < SELLER_TITLES.length - 1 ? 'border-b border-[#574335]/10' : ''} hover:bg-[#201f1f]/60 transition-colors`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img src={title.poster} alt={title.name} className="w-10 h-14 object-cover rounded-lg shrink-0" />
                        <div className="min-w-0">
                          <p className="font-bold text-[#E5E2E1] text-sm leading-snug">{title.name}</p>
                          <p className="text-xs text-[#DEC1AF] mt-0.5">{title.genre} &bull; {title.year}</p>
                          <p className="text-xs text-[#DEC1AF]/60">{title.country}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell">
                      <div className="flex flex-wrap gap-1.5">
                        {title.rightsAvailable.map(r => (
                          <span key={r} className="px-2.5 py-1 bg-[#F98110]/10 text-[#F98110] text-[10px] font-bold rounded-lg border border-[#F98110]/20 whitespace-nowrap">
                            {r}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-black text-[#F98110] text-base">${title.price.toLocaleString()}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#4ade80]/10 text-[#4ade80] text-xs font-bold rounded-lg border border-[#4ade80]/25">
                        <span className="w-1.5 h-1.5 bg-[#4ade80] rounded-full"></span>
                        {title.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="px-4 py-2 border border-[#574335]/40 rounded-lg text-xs font-bold text-[#DEC1AF] hover:bg-[#201f1f] hover:text-[#E5E2E1] transition-colors">
                          Edit
                        </button>
                        <button className="px-4 py-2 border border-red-500/30 rounded-lg text-xs font-bold text-red-400 hover:bg-red-500/10 transition-colors">
                          Unpublish
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Deal Requests */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black text-[#E5E2E1] tracking-tight">Deal Requests</h2>
            <span className="text-xs text-[#DEC1AF] bg-[#1c1b1b] border border-[#574335]/30 rounded-lg px-3 py-1.5 font-semibold">
              {DEAL_REQUESTS.length} requests
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {DEAL_REQUESTS.map(deal => <DealCard key={deal.id} deal={deal} />)}
          </div>
        </div>

      </div>

      {showAddModal && (
        <AddTitleModal
          onClose={() => setShowAddModal(false)}
          onSubmit={() => triggerToast('Title published successfully!')}
        />
      )}
      {showToast && <Toast message={toastMsg} />}
    </div>
  );
}
