'use client';

import { useState } from 'react';
import { TITLES, DEAL_REQUESTS, DealRequest } from '@/lib/dummyData';

const SELLER_TITLES = TITLES.filter(t => t.sellerId === 'seller-1');

const STATUS_COLORS: Record<string, string> = {
  Pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  'In Review': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  Accepted: 'bg-green-500/20 text-green-400 border-green-500/30',
  Rejected: 'bg-red-500/20 text-red-400 border-red-500/30',
};

function Toast({ message }: { message: string }) {
  return (
    <div className="fixed bottom-8 right-8 z-[100] bg-[#4ade80] text-black px-6 py-4 rounded-xl font-bold shadow-2xl flex items-center gap-3">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
      </svg>
      {message}
    </div>
  );
}

function AddTitleModal({ onClose, onSubmit }: { onClose: () => void; onSubmit: () => void }) {
  const [form, setForm] = useState({
    title: '', year: '', genre: '', synopsis: '', posterUrl: '', screenerUrl: '',
    rights: [] as string[], price: '',
  });

  const allRights = ['SVOD', 'AVOD', 'Dubbing', 'Theatrical', 'Digital Rights'];

  const toggleRight = (r: string) => {
    setForm(f => ({
      ...f,
      rights: f.rights.includes(r) ? f.rights.filter(x => x !== r) : [...f.rights, r],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 overflow-y-auto" onClick={onClose}>
      <div className="bg-[#1c1b1b] rounded-xl p-8 max-w-lg w-full border border-[#574335]/30 my-8" onClick={e => e.stopPropagation()}>
        <h3 className="text-xl font-black mb-6 text-[#E5E2E1]">Add New Title</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#DEC1AF] uppercase tracking-widest mb-1">Title Name</label>
              <input required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
                className="w-full bg-[#201f1f] border border-[#574335]/40 rounded-lg px-3 py-2.5 text-[#E5E2E1] text-sm focus:outline-none focus:border-[#F98110]" />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#DEC1AF] uppercase tracking-widest mb-1">Year</label>
              <input required type="number" value={form.year} onChange={e => setForm({ ...form, year: e.target.value })}
                className="w-full bg-[#201f1f] border border-[#574335]/40 rounded-lg px-3 py-2.5 text-[#E5E2E1] text-sm focus:outline-none focus:border-[#F98110]" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-[#DEC1AF] uppercase tracking-widest mb-1">Genre</label>
            <input required value={form.genre} onChange={e => setForm({ ...form, genre: e.target.value })} placeholder="e.g. Action / Thriller"
              className="w-full bg-[#201f1f] border border-[#574335]/40 rounded-lg px-3 py-2.5 text-[#E5E2E1] text-sm focus:outline-none focus:border-[#F98110]" />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#DEC1AF] uppercase tracking-widest mb-1">Synopsis</label>
            <textarea required rows={3} value={form.synopsis} onChange={e => setForm({ ...form, synopsis: e.target.value })}
              className="w-full bg-[#201f1f] border border-[#574335]/40 rounded-lg px-3 py-2.5 text-[#E5E2E1] text-sm focus:outline-none focus:border-[#F98110] resize-none" />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#DEC1AF] uppercase tracking-widest mb-1">Poster Image URL</label>
            <input value={form.posterUrl} onChange={e => setForm({ ...form, posterUrl: e.target.value })} placeholder="https://..."
              className="w-full bg-[#201f1f] border border-[#574335]/40 rounded-lg px-3 py-2.5 text-[#E5E2E1] text-sm focus:outline-none focus:border-[#F98110]" />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#DEC1AF] uppercase tracking-widest mb-1">YouTube Screener URL</label>
            <input value={form.screenerUrl} onChange={e => setForm({ ...form, screenerUrl: e.target.value })} placeholder="https://www.youtube.com/embed/..."
              className="w-full bg-[#201f1f] border border-[#574335]/40 rounded-lg px-3 py-2.5 text-[#E5E2E1] text-sm focus:outline-none focus:border-[#F98110]" />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#DEC1AF] uppercase tracking-widest mb-2">Rights Available</label>
            <div className="flex flex-wrap gap-2">
              {allRights.map(r => (
                <button type="button" key={r} onClick={() => toggleRight(r)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                    form.rights.includes(r)
                      ? 'bg-[#F98110] text-black border-[#F98110]'
                      : 'bg-[#201f1f] text-[#DEC1AF] border-[#574335]/40 hover:border-[#F98110]/50'
                  }`}>
                  {r}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-[#DEC1AF] uppercase tracking-widest mb-1">Asking Price (USD)</label>
            <input required type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })}
              className="w-full bg-[#201f1f] border border-[#574335]/40 rounded-lg px-3 py-2.5 text-[#E5E2E1] text-sm focus:outline-none focus:border-[#F98110]" />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-3 border border-[#574335]/40 rounded-lg text-[#DEC1AF] text-sm font-bold hover:bg-[#201f1f] transition-colors">Cancel</button>
            <button type="submit" className="flex-1 px-4 py-3 bg-[#F98110] text-black rounded-lg text-sm font-extrabold hover:brightness-110 transition-all">Publish Title</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function DealCard({ deal }: { deal: DealRequest }) {
  return (
    <div className="bg-[rgba(28,27,27,0.7)] border border-[#574335]/20 rounded-xl p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="font-bold text-[#E5E2E1]">{deal.buyer}</p>
          <p className="text-sm text-[#DEC1AF]">{deal.titleName}</p>
        </div>
        <span className={`px-2.5 py-1 text-xs font-bold rounded-lg border ${STATUS_COLORS[deal.status]}`}>
          {deal.status}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <p className="text-xs text-[#DEC1AF]">Rights</p>
          <p className="text-sm font-semibold text-[#E5E2E1]">{deal.rightsRequested}</p>
        </div>
        <div>
          <p className="text-xs text-[#DEC1AF]">Budget</p>
          <p className="text-sm font-semibold text-[#F98110]">${deal.budget.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs text-[#DEC1AF]">Territory</p>
          <p className="text-sm font-semibold text-[#E5E2E1]">{deal.territory}</p>
        </div>
        <div>
          <p className="text-xs text-[#DEC1AF]">Received</p>
          <p className="text-sm font-semibold text-[#E5E2E1]">{deal.createdAt}</p>
        </div>
      </div>
      <p className="text-xs text-[#DEC1AF]/70 italic mb-4 line-clamp-2">&ldquo;{deal.message}&rdquo;</p>
      <div className="flex gap-2">
        <button className="flex-1 px-3 py-2 border border-[#574335]/40 rounded-lg text-xs font-bold text-[#DEC1AF] hover:bg-[#201f1f] transition-colors">View Details</button>
        <button className="flex-1 px-3 py-2 bg-[#F98110] text-black rounded-lg text-xs font-bold hover:brightness-110 transition-all">Respond</button>
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
    <div className="min-h-screen bg-[#0A0A0A] pt-8">
      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <p className="text-[#DEC1AF] text-sm mb-1">Seller Dashboard</p>
            <h1 className="text-3xl font-black tracking-tighter text-[#E5E2E1]">Welcome back, <span className="text-[#F98110]">Horizon Films</span></h1>
          </div>
          <button onClick={() => setShowAddModal(true)}
            className="bg-[#F98110] text-black px-6 py-3 rounded-lg font-extrabold hover:brightness-110 transition-all flex items-center gap-2">
            <span className="text-xl leading-none">+</span> Add New Title
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {[
            { label: 'Active Listings', value: '3', color: 'text-[#F98110]' },
            { label: 'Pending Requests', value: '2', color: 'text-yellow-400' },
            { label: 'Total Deal Value', value: '$125k', color: 'text-[#4ade80]' },
          ].map(s => (
            <div key={s.label} className="bg-[rgba(28,27,27,0.7)] border border-[#574335]/20 rounded-xl p-6">
              <p className={`text-3xl font-black ${s.color} mb-1`}>{s.value}</p>
              <p className="text-sm text-[#DEC1AF] font-semibold">{s.label}</p>
            </div>
          ))}
        </div>

        {/* My Listings */}
        <div className="mb-12">
          <h2 className="text-xl font-black text-[#E5E2E1] mb-6 tracking-tight">My Listings</h2>
          <div className="bg-[rgba(28,27,27,0.7)] border border-[#574335]/20 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#574335]/20">
                  <th className="text-left px-6 py-4 text-xs font-bold text-[#DEC1AF] uppercase tracking-widest">Title</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-[#DEC1AF] uppercase tracking-widest hidden md:table-cell">Rights Available</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-[#DEC1AF] uppercase tracking-widest">Price</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-[#DEC1AF] uppercase tracking-widest">Status</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-[#DEC1AF] uppercase tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody>
                {SELLER_TITLES.map((title, i) => (
                  <tr key={title.id} className={`${i < SELLER_TITLES.length - 1 ? 'border-b border-[#574335]/10' : ''} hover:bg-[#201f1f]/50 transition-colors`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={title.poster} alt={title.name} className="w-10 h-14 object-cover rounded" />
                        <div>
                          <p className="font-bold text-[#E5E2E1] text-sm">{title.name}</p>
                          <p className="text-xs text-[#DEC1AF]">{title.genre} • {title.year}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <div className="flex flex-wrap gap-1.5">
                        {title.rightsAvailable.map(r => (
                          <span key={r} className="px-2 py-0.5 bg-[#F98110]/15 text-[#F98110] text-[10px] font-bold rounded border border-[#F98110]/20">{r}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-black text-[#F98110]">${title.price.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 bg-[#4ade80]/15 text-[#4ade80] text-xs font-bold rounded border border-[#4ade80]/30">
                        {title.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="px-3 py-1.5 border border-[#574335]/40 rounded text-xs font-bold text-[#DEC1AF] hover:bg-[#201f1f] transition-colors">Edit</button>
                        <button className="px-3 py-1.5 border border-red-500/30 rounded text-xs font-bold text-red-400 hover:bg-red-500/10 transition-colors">Unpublish</button>
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
          <h2 className="text-xl font-black text-[#E5E2E1] mb-6 tracking-tight">Deal Requests</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
