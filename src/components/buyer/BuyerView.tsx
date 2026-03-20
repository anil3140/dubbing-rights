'use client';

import { useState } from 'react';
import { TITLES, Title } from '@/lib/dummyData';

const RIGHTS_OPTIONS = ['All Rights', 'Dubbing', 'SVOD', 'Theatrical', 'Digital Rights', 'VOD'];
const GENRE_OPTIONS = ['All Genres', 'Action / Thriller', 'Adventure / Drama', 'History / Epic', 'Sci-Fi / Action', 'Drama / War', 'Horror / Thriller', 'Romance / Drama'];

function RightsBadge({ label, variant = 'primary' }: { label: string; variant?: 'primary' | 'secondary' }) {
  const styles = variant === 'primary' 
    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-black' 
    : 'bg-white/10 text-white/90 border border-white/10';
  return (
    <span className={`inline-flex items-center px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide rounded-md ${styles}`}>
      {label}
    </span>
  );
}

function Toast({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] bg-emerald-500 text-black px-6 py-4 rounded-2xl font-bold shadow-2xl flex items-center gap-3 animate-slide-up">
      <div className="w-6 h-6 bg-black/20 rounded-full flex items-center justify-center">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <span>Request sent successfully! The seller will contact you shortly.</span>
      <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100">✕</button>
    </div>
  );
}

function RequestModal({ title, onClose, onSubmit }: { title: Title; onClose: () => void; onSubmit: () => void }) {
  const [form, setForm] = useState({ rightsType: '', territory: '', budget: '', message: '' });
  return (
    <div className="fixed inset-0 z-[80] bg-black/90 backdrop-blur-md flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-[#1a1a1a] rounded-3xl p-8 w-full max-w-md border border-white/10 shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-xs text-orange-400 font-semibold uppercase tracking-widest mb-1">License Request</p>
            <h3 className="text-xl font-bold text-white">{title.name}</h3>
          </div>
          <button onClick={onClose} className="text-white/50 hover:text-white text-xl">✕</button>
        </div>
        <form onSubmit={e => { e.preventDefault(); onSubmit(); onClose(); }} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-white/50 uppercase tracking-widest mb-2">Rights Type</label>
            <select required value={form.rightsType} onChange={e => setForm({ ...form, rightsType: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-orange-500/50 focus:bg-white/10">
              <option value="" className="bg-[#1a1a1a]">Select rights type...</option>
              {title.rightsAvailable.map(r => <option key={r} className="bg-[#1a1a1a]">{r}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-white/50 uppercase tracking-widest mb-2">Territory</label>
            <select required value={form.territory} onChange={e => setForm({ ...form, territory: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-orange-500/50 focus:bg-white/10">
              <option value="" className="bg-[#1a1a1a]">Select territory...</option>
              {title.territories.map(t => <option key={t} className="bg-[#1a1a1a]">{t}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-white/50 uppercase tracking-widest mb-2">Budget (USD)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 font-semibold">$</span>
              <input required type="number" placeholder="50,000" value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-3.5 text-white focus:outline-none focus:border-orange-500/50 focus:bg-white/10" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-white/50 uppercase tracking-widest mb-2">Message</label>
            <textarea required rows={3} placeholder="Briefly introduce your company and licensing intent..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-orange-500/50 focus:bg-white/10 resize-none" />
          </div>
          <div className="flex gap-3 pt-3">
            <button type="button" onClick={onClose} className="flex-1 py-3.5 border border-white/10 rounded-xl text-white/70 font-semibold hover:bg-white/5">Cancel</button>
            <button type="submit" className="flex-1 py-3.5 bg-gradient-to-r from-orange-500 to-orange-600 text-black rounded-xl font-bold hover:shadow-lg hover:shadow-orange-500/25">Send Request</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function TitleModal({ title, onClose, onRequest }: { title: Title; onClose: () => void; onRequest: () => void }) {
  return (
    <div className="fixed inset-0 z-[70] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto" onClick={onClose}>
      <div className="bg-[#141414] rounded-3xl w-full max-w-4xl border border-white/10 shadow-2xl my-8 overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="md:grid md:grid-cols-5">
          {/* Poster */}
          <div className="md:col-span-2 relative">
            <img src={title.poster} alt={title.name} className="w-full h-64 md:h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#141414] via-transparent to-transparent" />
            <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 bg-black/60 backdrop-blur rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-black/80">✕</button>
          </div>
          
          {/* Details */}
          <div className="md:col-span-3 p-8 flex flex-col">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 bg-orange-500/20 text-orange-400 text-xs font-bold rounded-full border border-orange-500/30">{title.country}</span>
                <span className="text-white/40 text-sm">{title.year}</span>
                <span className="text-white/40 text-sm">•</span>
                <span className="text-white/40 text-sm">{title.genre}</span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">{title.name}</h2>
              <p className="text-white/50 text-sm">Listed by <span className="text-white/80 font-medium">{title.seller}</span></p>
            </div>
            
            <p className="text-white/60 leading-relaxed mb-6">{title.synopsis}</p>
            
            {/* Screener */}
            <div className="mb-6">
              <p className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-3">🎬 Screener Preview</p>
              <div className="aspect-video rounded-2xl overflow-hidden bg-black border border-white/10">
                <iframe src={title.screenerUrl} className="w-full h-full" allowFullScreen title="screener" />
              </div>
            </div>
            
            {/* Rights */}
            <div className="mb-6">
              <p className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-3">Available Rights</p>
              <div className="flex flex-wrap gap-2">
                {title.rightsAvailable.map(r => (
                  <span key={r} className="px-4 py-2 bg-teal-500/15 text-teal-300 text-sm font-semibold rounded-lg border border-teal-500/30">{r}</span>
                ))}
              </div>
            </div>
            
            {/* Price + CTA */}
            <div className="mt-auto pt-6 border-t border-white/10">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-widest mb-1">Asking Price</p>
                  <p className="text-4xl font-black text-white">${title.price.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-white/40 uppercase tracking-widest mb-1">Rights Holder</p>
                  <p className="text-lg font-semibold text-white">{title.seller}</p>
                </div>
              </div>
              <button onClick={onRequest} className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-black rounded-xl font-bold text-lg shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-shadow">
                Request License →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BuyerView() {
  const [selectedRights, setSelectedRights] = useState('All Rights');
  const [selectedGenre, setSelectedGenre] = useState('All Genres');
  const [selectedTitle, setSelectedTitle] = useState<Title | null>(null);
  const [showRequest, setShowRequest] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const filtered = TITLES.filter(t => {
    const rm = selectedRights === 'All Rights' || t.rightsAvailable.some(r => r.toLowerCase().includes(selectedRights.toLowerCase()));
    const gm = selectedGenre === 'All Genres' || t.genre === selectedGenre;
    return rm && gm;
  });

  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1920&q=80" className="w-full h-full object-cover opacity-15" alt="" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/50 via-[#0a0a0a]/80 to-[#0a0a0a]" />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-900/10 via-transparent to-teal-900/10" />
        </div>
        
        <div className="relative section-container py-24 md:py-32 lg:py-40">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full mb-8">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
              <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">B2B Film Rights Marketplace</span>
            </div>
            
            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[0.95] mb-6">
              Global Film Rights.
              <br />
              <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">Seamlessly Traded.</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-white/60 mb-10 max-w-xl mx-auto leading-relaxed">
              Discover premium catalogs from independent distributors worldwide. Secure dubbing, SVOD, and theatrical rights in one place.
            </p>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary text-base">
                Explore Marketplace →
              </button>
              <button className="btn-secondary text-base">
                List Your Catalog
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="border-y border-white/5 bg-[#111]">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              { icon: '🎬', value: '10,000+', label: 'Titles Available' },
              { icon: '🔒', value: 'Secure Escrow', label: 'Financial Protection' },
              { icon: '🌍', value: '24/7 Support', label: 'Global Assistance' },
              { icon: '✓', value: 'Verified', label: 'Buyer Network' },
            ].map((s, i) => (
              <div key={s.label} className={`flex items-center gap-4 py-6 px-6 ${i > 0 ? 'border-l border-white/5' : ''}`}>
                <span className="text-2xl">{s.icon}</span>
                <div>
                  <p className="text-lg font-bold text-white">{s.value}</p>
                  <p className="text-xs text-white/40 uppercase tracking-widest">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marketplace */}
      <section className="py-20">
        <div className="section-container">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-sm text-orange-400 font-semibold uppercase tracking-widest mb-2">Featured Inventory</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">Browse Film Catalog</h2>
              <p className="text-white/40 mt-2">{filtered.length} title{filtered.length !== 1 ? 's' : ''} available for licensing</p>
            </div>
            
            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <select value={selectedRights} onChange={e => setSelectedRights(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-orange-500/50 min-w-[150px]">
                {RIGHTS_OPTIONS.map(r => <option key={r} className="bg-[#1a1a1a]">{r}</option>)}
              </select>
              <select value={selectedGenre} onChange={e => setSelectedGenre(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-orange-500/50 min-w-[150px]">
                {GENRE_OPTIONS.map(g => <option key={g} className="bg-[#1a1a1a]">{g}</option>)}
              </select>
              {(selectedRights !== 'All Rights' || selectedGenre !== 'All Genres') && (
                <button onClick={() => { setSelectedRights('All Rights'); setSelectedGenre('All Genres'); }}
                  className="px-4 py-3 text-orange-400 text-sm font-medium hover:text-orange-300">
                  Clear All
                </button>
              )}
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(title => (
              <div key={title.id} onClick={() => setSelectedTitle(title)}
                className="group cursor-pointer bg-[#161616] rounded-2xl overflow-hidden border border-white/5 card-hover">
                {/* Poster */}
                <div className="relative aspect-[2/3] overflow-hidden">
                  <img src={title.poster} alt={title.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
                  
                  {/* Badges */}
                  <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                    {title.rightsAvailable.slice(0, 2).map((r, i) => (
                      <RightsBadge key={r} label={r.replace('Rights', '').trim()} variant={i === 0 ? 'primary' : 'secondary'} />
                    ))}
                  </div>
                  
                  {/* Price overlay */}
                  <div className="absolute top-4 right-4 px-3 py-1.5 bg-black/70 backdrop-blur rounded-lg">
                    <p className="text-white font-bold">${(title.price / 1000).toFixed(0)}K</p>
                  </div>
                </div>
                
                {/* Info */}
                <div className="p-5">
                  <h4 className="font-bold text-white text-lg mb-1 truncate group-hover:text-orange-400 transition-colors">{title.name}</h4>
                  <p className="text-white/40 text-sm mb-4">{title.genre} · {title.year}</p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center text-xs">🎬</div>
                      <span className="text-sm text-white/60">{title.seller}</span>
                    </div>
                    <span className="text-orange-400 text-sm font-semibold">View →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 border-t border-white/5">
        <div className="section-container">
          <div className="text-center mb-16">
            <p className="text-sm text-teal-400 font-semibold uppercase tracking-widest mb-2">Simple Process</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">How It Works</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', icon: '🔍', title: 'Discover', desc: 'Browse verified film catalogs from distributors worldwide. Filter by rights type, genre, territory, and budget range.' },
              { step: '02', icon: '🤝', title: 'Negotiate', desc: 'Submit a license request directly to the rights holder. Specify territory, rights type, and your budget in minutes.' },
              { step: '03', icon: '✍️', title: 'Close', desc: 'Finalize deal terms, execute the license agreement, and receive your content files securely.' },
            ].map(s => (
              <div key={s.step} className="bg-[#141414] border border-white/5 rounded-2xl p-8 hover:border-white/10 transition-colors">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-4xl">{s.icon}</span>
                  <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">{s.step}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
                <p className="text-white/50 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="section-container">
          <div className="relative bg-gradient-to-br from-[#1a1a1a] to-[#141414] border border-white/10 rounded-3xl p-12 md:p-16 text-center overflow-hidden">
            {/* Glow effects */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-orange-500/10 blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-teal-500/10 blur-[100px] pointer-events-none" />
            
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 relative">
              Ready to expand your global distribution?
            </h2>
            <p className="text-white/50 text-lg mb-10 max-w-lg mx-auto relative">
              Join the growing network of distributors and content owners streamlining film rights management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative">
              <button className="btn-primary">Apply for Access</button>
              <button className="btn-secondary">Contact Sales</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-10">
        <div className="section-container flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
              <span className="text-black font-black text-xs">DR</span>
            </div>
            <span className="text-lg font-bold text-white">DubbingRights</span>
          </div>
          <p className="text-white/40 text-sm">© 2025 DubbingRights. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-white/40">
            {['Privacy', 'Terms', 'Support'].map(l => (
              <a key={l} href="#" className="hover:text-white transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </footer>

      {/* Modals */}
      {selectedTitle && !showRequest && (
        <TitleModal title={selectedTitle} onClose={() => setSelectedTitle(null)} onRequest={() => setShowRequest(true)} />
      )}
      {selectedTitle && showRequest && (
        <RequestModal title={selectedTitle} onClose={() => { setShowRequest(false); setSelectedTitle(null); }} onSubmit={() => { setShowToast(true); setTimeout(() => setShowToast(false), 4000); }} />
      )}
      {showToast && <Toast onClose={() => setShowToast(false)} />}
      
      <style jsx>{`
        @keyframes slide-up {
          from { opacity: 0; transform: translate(-50%, 20px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease forwards;
        }
      `}</style>
    </div>
  );
}
