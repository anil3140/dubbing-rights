'use client';

import { useState } from 'react';
import { TITLES, DEAL_REQUESTS, DealRequest } from '@/lib/dummyData';

const SELLER_TITLES = TITLES.filter(t => t.sellerId === 'seller-1');

const STATUS_CONFIG: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  Pending:     { bg: 'bg-amber-500/10',   text: 'text-amber-400',   border: 'border-amber-500/30', dot: 'bg-amber-400' },
  'In Review': { bg: 'bg-blue-500/10',    text: 'text-blue-400',    border: 'border-blue-500/30',  dot: 'bg-blue-400' },
  Accepted:    { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30', dot: 'bg-emerald-400' },
  Rejected:    { bg: 'bg-red-500/10',     text: 'text-red-400',     border: 'border-red-500/30',   dot: 'bg-red-400' },
};

function Toast({ msg }: { msg: string }) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] bg-emerald-500 text-black px-6 py-4 rounded-2xl font-bold shadow-2xl flex items-center gap-3">
      <div className="w-6 h-6 bg-black/20 rounded-full flex items-center justify-center">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      {msg}
    </div>
  );
}

function StatCard({ icon, value, label, sublabel, color }: { icon: string; value: string; label: string; sublabel: string; color: string }) {
  return (
    <div className={`bg-[#161616] border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors`}>
      <div className="flex items-start justify-between mb-4">
        <span className="text-3xl">{icon}</span>
        <span className={`text-xs font-semibold ${color} uppercase tracking-widest`}>{label}</span>
      </div>
      <p className={`text-4xl font-black ${color} mb-1`}>{value}</p>
      <p className="text-white/40 text-sm">{sublabel}</p>
    </div>
  );
}

function DealCard({ deal }: { deal: DealRequest }) {
  const status = STATUS_CONFIG[deal.status] || STATUS_CONFIG.Pending;
  
  return (
    <div className={`bg-[#161616] border-l-4 ${status.border} rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-colors`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <p className="text-lg font-bold text-white">{deal.buyer}</p>
          <p className="text-white/50 text-sm">{deal.titleName}</p>
        </div>
        <span className={`inline-flex items-center gap-2 px-3 py-1.5 ${status.bg} ${status.text} text-xs font-bold rounded-full border ${status.border}`}>
          <span className={`w-2 h-2 rounded-full ${status.dot}`}></span>
          {deal.status}
        </span>
      </div>
      
      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        {[
          { label: 'Rights', value: deal.rightsRequested, highlight: false },
          { label: 'Budget', value: `$${deal.budget.toLocaleString()}`, highlight: true },
          { label: 'Territory', value: deal.territory, highlight: false },
          { label: 'Received', value: deal.createdAt, highlight: false },
        ].map(item => (
          <div key={item.label} className="bg-black/30 rounded-xl p-3">
            <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">{item.label}</p>
            <p className={`text-sm font-semibold ${item.highlight ? 'text-orange-400' : 'text-white'}`}>{item.value}</p>
          </div>
        ))}
      </div>
      
      {/* Quote */}
      <div className="bg-black/20 rounded-xl p-4 mb-5">
        <p className="text-white/50 text-sm italic line-clamp-2">&ldquo;{deal.message}&rdquo;</p>
      </div>
      
      {/* Actions */}
      <div className="flex gap-3">
        <button className="flex-1 py-3 border border-white/10 rounded-xl text-white/70 text-sm font-semibold hover:bg-white/5 transition-colors">
          View Details
        </button>
        <button className="flex-1 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-black rounded-xl text-sm font-bold hover:shadow-lg hover:shadow-orange-500/25 transition-all">
          Respond
        </button>
      </div>
    </div>
  );
}

function AddTitleModal({ onClose, onSubmit }: { onClose: () => void; onSubmit: () => void }) {
  const [rights, setRights] = useState<string[]>([]);
  const allRights = ['SVOD', 'AVOD', 'Dubbing', 'Theatrical', 'Digital'];
  const toggleRight = (r: string) => setRights(prev => prev.includes(r) ? prev.filter(x => x !== r) : [...prev, r]);
  
  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto" onClick={onClose}>
      <div className="bg-[#1a1a1a] rounded-3xl p-8 w-full max-w-lg border border-white/10 shadow-2xl my-8" onClick={e => e.stopPropagation()}>
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-xs text-teal-400 font-semibold uppercase tracking-widest mb-1">New Listing</p>
            <h3 className="text-xl font-bold text-white">Add Film Title</h3>
          </div>
          <button onClick={onClose} className="text-white/50 hover:text-white text-xl">✕</button>
        </div>
        
        <form onSubmit={e => { e.preventDefault(); onSubmit(); onClose(); }} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-white/50 uppercase tracking-widest mb-2">Title</label>
              <input required placeholder="Film name" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-teal-500/50" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-white/50 uppercase tracking-widest mb-2">Year</label>
              <input required type="number" placeholder="2024" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-teal-500/50" />
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-semibold text-white/50 uppercase tracking-widest mb-2">Genre</label>
            <input required placeholder="e.g. Action / Thriller" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-teal-500/50" />
          </div>
          
          <div>
            <label className="block text-xs font-semibold text-white/50 uppercase tracking-widest mb-2">Synopsis</label>
            <textarea required rows={3} placeholder="Brief description..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-teal-500/50 resize-none" />
          </div>
          
          <div>
            <label className="block text-xs font-semibold text-white/50 uppercase tracking-widest mb-3">Rights Available</label>
            <div className="flex flex-wrap gap-2">
              {allRights.map(r => (
                <button type="button" key={r} onClick={() => toggleRight(r)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
                    rights.includes(r) 
                      ? 'bg-teal-500/20 text-teal-400 border-teal-500/50' 
                      : 'bg-white/5 text-white/60 border-white/10 hover:border-white/20'
                  }`}>
                  {r}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-semibold text-white/50 uppercase tracking-widest mb-2">Asking Price (USD)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">$</span>
              <input required type="number" placeholder="50,000" className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-3.5 text-white focus:outline-none focus:border-teal-500/50" />
            </div>
          </div>
          
          <div className="flex gap-3 pt-3">
            <button type="button" onClick={onClose} className="flex-1 py-3.5 border border-white/10 rounded-xl text-white/70 font-semibold hover:bg-white/5">Cancel</button>
            <button type="submit" className="flex-1 py-3.5 bg-gradient-to-r from-teal-500 to-teal-600 text-black rounded-xl font-bold hover:shadow-lg hover:shadow-teal-500/25">Publish Title</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function SellerView() {
  const [showAdd, setShowAdd] = useState(false);
  const [toast, setToast] = useState('');

  const fire = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 4000); };

  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      <div className="section-container py-10">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
          <div>
            <p className="text-sm text-teal-400 font-semibold uppercase tracking-widest mb-2">Seller Dashboard</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-white">
              Welcome back, <span className="text-orange-400">Horizon Films</span>
            </h1>
          </div>
          <button onClick={() => setShowAdd(true)}
            className="inline-flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-black rounded-xl font-bold shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-shadow self-start lg:self-auto">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            Add New Title
          </button>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-5 mb-12">
          <StatCard icon="📋" value="3" label="Active" sublabel="Titles in marketplace" color="text-orange-400" />
          <StatCard icon="⏳" value="2" label="Pending" sublabel="Awaiting your response" color="text-amber-400" />
          <StatCard icon="💰" value="$125K" label="Deal Value" sublabel="Across all active deals" color="text-emerald-400" />
        </div>

        {/* My Listings */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-white">My Listings</h2>
              <p className="text-white/40 text-sm">{SELLER_TITLES.length} active titles</p>
            </div>
          </div>
          
          <div className="bg-[#141414] border border-white/5 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="text-left px-6 py-4 text-xs font-semibold text-white/40 uppercase tracking-widest">Title</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-white/40 uppercase tracking-widest hidden lg:table-cell">Rights</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-white/40 uppercase tracking-widest">Price</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-white/40 uppercase tracking-widest">Status</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-white/40 uppercase tracking-widest">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {SELLER_TITLES.map((title, i) => (
                    <tr key={title.id} className={`${i < SELLER_TITLES.length - 1 ? 'border-b border-white/5' : ''} hover:bg-white/[0.02] transition-colors`}>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <img src={title.poster} alt={title.name} className="w-12 h-16 object-cover rounded-lg" />
                          <div>
                            <p className="font-semibold text-white">{title.name}</p>
                            <p className="text-white/40 text-sm">{title.genre} · {title.year}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 hidden lg:table-cell">
                        <div className="flex flex-wrap gap-2">
                          {title.rightsAvailable.map(r => (
                            <span key={r} className="px-3 py-1 bg-teal-500/10 text-teal-400 text-xs font-semibold rounded-lg border border-teal-500/20">
                              {r.replace('Rights', '').trim()}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-xl font-bold text-white">${title.price.toLocaleString()}</span>
                      </td>
                      <td className="px-6 py-5">
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 text-emerald-400 text-xs font-bold rounded-full border border-emerald-500/30">
                          <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex gap-2">
                          <button className="px-4 py-2 border border-white/10 rounded-lg text-white/70 text-sm font-medium hover:bg-white/5">Edit</button>
                          <button className="px-4 py-2 border border-red-500/30 rounded-lg text-red-400 text-sm font-medium hover:bg-red-500/10">Unpublish</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Deal Requests */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-white">Deal Requests</h2>
              <p className="text-white/40 text-sm">{DEAL_REQUESTS.length} incoming requests</p>
            </div>
          </div>
          
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {DEAL_REQUESTS.map(deal => <DealCard key={deal.id} deal={deal} />)}
          </div>
        </div>

      </div>

      {showAdd && <AddTitleModal onClose={() => setShowAdd(false)} onSubmit={() => fire('Title published successfully!')} />}
      {toast && <Toast msg={toast} />}
    </div>
  );
}
