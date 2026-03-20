'use client';

import { useState } from 'react';
import { TITLES, DEAL_REQUESTS, DealRequest } from '@/lib/dummyData';

const SELLER_TITLES = TITLES.filter(t => t.sellerId === 'seller-1');

const STATUS_STYLE: Record<string, { pill: string; dot: string }> = {
  Pending:    { pill: 'bg-yellow-500/15 text-yellow-300 border-yellow-500/30', dot: 'bg-yellow-300' },
  'In Review':{ pill: 'bg-blue-500/15 text-blue-300 border-blue-500/30',      dot: 'bg-blue-300'   },
  Accepted:   { pill: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30', dot: 'bg-emerald-300' },
  Rejected:   { pill: 'bg-red-500/15 text-red-400 border-red-500/30',         dot: 'bg-red-400'    },
};

function Toast({ msg }: { msg: string }) {
  return (
    <div className="fixed bottom-6 right-6 z-[100] bg-[#4ade80] text-black px-5 py-3.5 rounded-xl font-bold shadow-2xl flex items-center gap-3 max-w-xs">
      <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
      </svg>
      <span className="text-sm">{msg}</span>
    </div>
  );
}

function AddTitleModal({ onClose, onSubmit }: { onClose: () => void; onSubmit: () => void }) {
  const [rights, setRights] = useState<string[]>([]);
  const allRights = ['SVOD', 'AVOD', 'Dubbing', 'Theatrical', 'Digital Rights'];
  const toggleRight = (r: string) => setRights(prev => prev.includes(r) ? prev.filter(x => x !== r) : [...prev, r]);
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6 overflow-y-auto" onClick={onClose}>
      <div className="bg-[#1c1b1b] rounded-t-2xl sm:rounded-2xl p-6 sm:p-8 w-full sm:max-w-lg border border-[#574335]/30 shadow-2xl sm:my-8" onClick={e => e.stopPropagation()}>
        <div className="mb-5">
          <h3 className="text-lg font-black text-[#E5E2E1]">Add New Title</h3>
          <p className="text-sm text-[#DEC1AF] mt-0.5">List a new film in the marketplace</p>
        </div>
        <form onSubmit={e => { e.preventDefault(); onSubmit(); onClose(); }} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#DEC1AF] uppercase tracking-widest mb-1.5">Title</label>
              <input required placeholder="e.g. Midnight Protocol" className="w-full bg-[#131313] border border-[#574335]/50 rounded-xl px-4 py-3 text-[#E5E2E1] text-sm focus:outline-none focus:border-[#F98110]" />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#DEC1AF] uppercase tracking-widest mb-1.5">Year</label>
              <input required type="number" placeholder="2024" className="w-full bg-[#131313] border border-[#574335]/50 rounded-xl px-4 py-3 text-[#E5E2E1] text-sm focus:outline-none focus:border-[#F98110]" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-[#DEC1AF] uppercase tracking-widest mb-1.5">Genre</label>
            <input required placeholder="e.g. Action / Thriller" className="w-full bg-[#131313] border border-[#574335]/50 rounded-xl px-4 py-3 text-[#E5E2E1] text-sm focus:outline-none focus:border-[#F98110]" />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#DEC1AF] uppercase tracking-widest mb-1.5">Synopsis</label>
            <textarea required rows={3} placeholder="Brief description..." className="w-full bg-[#131313] border border-[#574335]/50 rounded-xl px-4 py-3 text-[#E5E2E1] text-sm focus:outline-none focus:border-[#F98110] resize-none" />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#DEC1AF] uppercase tracking-widest mb-1.5">Poster URL</label>
            <input placeholder="https://..." className="w-full bg-[#131313] border border-[#574335]/50 rounded-xl px-4 py-3 text-[#E5E2E1] text-sm focus:outline-none focus:border-[#F98110]" />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#DEC1AF] uppercase tracking-widest mb-1.5">YouTube Screener URL</label>
            <input placeholder="https://www.youtube.com/embed/..." className="w-full bg-[#131313] border border-[#574335]/50 rounded-xl px-4 py-3 text-[#E5E2E1] text-sm focus:outline-none focus:border-[#F98110]" />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#DEC1AF] uppercase tracking-widest mb-2">Rights Available</label>
            <div className="flex flex-wrap gap-2">
              {allRights.map(r => (
                <button type="button" key={r} onClick={() => toggleRight(r)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${rights.includes(r) ? 'bg-[#F98110] text-black border-[#F98110]' : 'bg-[#131313] text-[#DEC1AF] border-[#574335]/40 hover:border-[#F98110]/50'}`}>
                  {r}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-[#DEC1AF] uppercase tracking-widest mb-1.5">Asking Price (USD)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#DEC1AF]">$</span>
              <input required type="number" placeholder="45,000" className="w-full bg-[#131313] border border-[#574335]/50 rounded-xl pl-8 pr-4 py-3 text-[#E5E2E1] text-sm focus:outline-none focus:border-[#F98110]" />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-3 border border-[#574335]/50 rounded-xl text-[#DEC1AF] text-sm font-bold hover:bg-[#201f1f]">Cancel</button>
            <button type="submit" className="flex-1 py-3 bg-[#F98110] text-black rounded-xl text-sm font-extrabold hover:brightness-110">Publish Title →</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function DealCard({ deal }: { deal: DealRequest }) {
  const s = STATUS_STYLE[deal.status] ?? STATUS_STYLE.Pending;
  return (
    <div className="bg-[#1c1b1b] border border-[#574335]/20 rounded-xl p-5 flex flex-col gap-4 hover:border-[#574335]/40 transition-colors">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-black text-[#E5E2E1] text-base truncate">{deal.buyer}</p>
          <p className="text-sm text-[#DEC1AF] truncate mt-0.5">{deal.titleName}</p>
        </div>
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-lg border shrink-0 ${s.pill}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`}></span>
          {deal.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {[
          { label: 'Rights', value: deal.rightsRequested },
          { label: 'Budget', value: `$${deal.budget.toLocaleString()}`, highlight: true },
          { label: 'Territory', value: deal.territory },
          { label: 'Received', value: deal.createdAt },
        ].map(({ label, value, highlight }) => (
          <div key={label} className="bg-[#131313] rounded-lg p-3">
            <p className="text-[10px] text-[#DEC1AF] uppercase tracking-widest mb-1">{label}</p>
            <p className={`text-sm font-bold truncate ${highlight ? 'text-[#F98110]' : 'text-[#E5E2E1]'}`}>{value}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#131313] rounded-lg p-3">
        <p className="text-xs text-[#DEC1AF]/80 italic leading-relaxed line-clamp-2">&ldquo;{deal.message}&rdquo;</p>
      </div>

      <div className="flex gap-2 mt-auto">
        <button className="flex-1 py-2.5 border border-[#574335]/40 rounded-lg text-xs font-bold text-[#DEC1AF] hover:bg-[#201f1f] transition-colors">View Details</button>
        <button className="flex-1 py-2.5 bg-[#F98110] text-black rounded-lg text-xs font-extrabold hover:brightness-110">Respond</button>
      </div>
    </div>
  );
}

export default function SellerView() {
  const [showAdd, setShowAdd] = useState(false);
  const [toast, setToast] = useState('');

  const fire = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 4000); };

  return (
    <div className="bg-[#0A0A0A]">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-bold text-[#DEC1AF] uppercase tracking-widest mb-1">Seller Dashboard</p>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tighter text-[#E5E2E1]">
              Welcome back, <span className="text-[#F98110]">Horizon Films</span>
            </h1>
          </div>
          <button onClick={() => setShowAdd(true)}
            className="inline-flex items-center gap-2 bg-[#F98110] text-black px-5 py-3 rounded-xl font-extrabold text-sm hover:brightness-110 transition-all shadow-lg shadow-[#F98110]/20 self-start sm:self-auto shrink-0">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
            Add New Title
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {[
            { label: 'Active Listings', value: '3', sub: 'In the marketplace', color: 'text-[#F98110]', border: 'border-[#F98110]/20', bg: 'bg-[#F98110]/5' },
            { label: 'Pending Requests', value: '2', sub: 'Awaiting your response', color: 'text-yellow-400', border: 'border-yellow-400/20', bg: 'bg-yellow-400/5' },
            { label: 'Total Deal Value', value: '$125,000', sub: 'Across all active deals', color: 'text-[#4ade80]', border: 'border-[#4ade80]/20', bg: 'bg-[#4ade80]/5' },
          ].map(s => (
            <div key={s.label} className={`rounded-xl p-5 sm:p-6 border ${s.border} ${s.bg} bg-[#1c1b1b]`}>
              <p className={`text-3xl sm:text-4xl font-black ${s.color} mb-1 leading-tight`}>{s.value}</p>
              <p className="text-sm font-bold text-[#E5E2E1]">{s.label}</p>
              <p className="text-xs text-[#DEC1AF] mt-0.5">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Listings */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-black text-[#E5E2E1]">My Listings</h2>
            <span className="text-xs text-[#DEC1AF] bg-[#1c1b1b] border border-[#574335]/30 rounded-lg px-3 py-1.5 font-semibold">{SELLER_TITLES.length} titles</span>
          </div>

          {/* Mobile cards */}
          <div className="sm:hidden flex flex-col gap-3">
            {SELLER_TITLES.map(title => (
              <div key={title.id} className="bg-[#1c1b1b] border border-[#574335]/20 rounded-xl p-4 flex gap-3">
                <img src={title.poster} alt={title.name} className="w-12 h-16 object-cover rounded-lg shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-[#E5E2E1] text-sm">{title.name}</p>
                  <p className="text-xs text-[#DEC1AF] mt-0.5">{title.genre} · {title.year}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {title.rightsAvailable.map(r => (
                      <span key={r} className="px-2 py-0.5 bg-[#F98110]/10 text-[#F98110] text-[9px] font-bold rounded border border-[#F98110]/20">{r}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-black text-[#F98110] text-sm">${title.price.toLocaleString()}</span>
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#4ade80]/10 text-[#4ade80] text-[10px] font-bold rounded border border-[#4ade80]/25">
                      <span className="w-1.5 h-1.5 bg-[#4ade80] rounded-full"></span>{title.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop table */}
          <div className="hidden sm:block bg-[#1c1b1b] border border-[#574335]/20 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#574335]/20 bg-[#131313]/40">
                  <th className="text-left px-5 py-4 text-xs font-bold text-[#DEC1AF] uppercase tracking-widest">Title</th>
                  <th className="text-left px-5 py-4 text-xs font-bold text-[#DEC1AF] uppercase tracking-widest hidden lg:table-cell">Rights</th>
                  <th className="text-left px-5 py-4 text-xs font-bold text-[#DEC1AF] uppercase tracking-widest">Price</th>
                  <th className="text-left px-5 py-4 text-xs font-bold text-[#DEC1AF] uppercase tracking-widest">Status</th>
                  <th className="text-left px-5 py-4 text-xs font-bold text-[#DEC1AF] uppercase tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody>
                {SELLER_TITLES.map((title, i) => (
                  <tr key={title.id} className={`${i < SELLER_TITLES.length - 1 ? 'border-b border-[#574335]/10' : ''} hover:bg-[#201f1f]/50 transition-colors`}>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img src={title.poster} alt={title.name} className="w-10 h-14 object-cover rounded-lg shrink-0" />
                        <div className="min-w-0">
                          <p className="font-bold text-[#E5E2E1] text-sm">{title.name}</p>
                          <p className="text-xs text-[#DEC1AF]">{title.genre} · {title.year} · {title.country}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 hidden lg:table-cell">
                      <div className="flex flex-wrap gap-1.5">
                        {title.rightsAvailable.map(r => (
                          <span key={r} className="px-2 py-1 bg-[#F98110]/10 text-[#F98110] text-[10px] font-bold rounded border border-[#F98110]/15 whitespace-nowrap">{r}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-5 py-4 font-black text-[#F98110] whitespace-nowrap">${title.price.toLocaleString()}</td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#4ade80]/10 text-[#4ade80] text-xs font-bold rounded-lg border border-[#4ade80]/25">
                        <span className="w-1.5 h-1.5 bg-[#4ade80] rounded-full"></span>{title.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        <button className="px-3 py-1.5 border border-[#574335]/40 rounded-lg text-xs font-bold text-[#DEC1AF] hover:bg-[#201f1f] transition-colors whitespace-nowrap">Edit</button>
                        <button className="px-3 py-1.5 border border-red-500/30 rounded-lg text-xs font-bold text-red-400 hover:bg-red-500/10 transition-colors whitespace-nowrap">Unpublish</button>
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
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-black text-[#E5E2E1]">Deal Requests</h2>
            <span className="text-xs text-[#DEC1AF] bg-[#1c1b1b] border border-[#574335]/30 rounded-lg px-3 py-1.5 font-semibold">{DEAL_REQUESTS.length} requests</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {DEAL_REQUESTS.map(deal => <DealCard key={deal.id} deal={deal} />)}
          </div>
        </div>

      </div>

      {showAdd && <AddTitleModal onClose={() => setShowAdd(false)} onSubmit={() => fire('Title published successfully!')} />}
      {toast && <Toast msg={toast} />}
    </div>
  );
}
