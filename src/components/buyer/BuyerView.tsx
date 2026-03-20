'use client';

import { useState } from 'react';
import { TITLES, Title } from '@/lib/dummyData';

const RIGHTS_OPTIONS = ['All Rights', 'LATAM Dubbing', 'EU SVOD', 'Global VOD', 'MENA Rights', 'Theatrical', 'APAC Dubbing', 'Digital Rights', 'US SVOD', 'MENA Dubbing', 'EU Theatrical', 'LATAM Rights', 'Global SVOD', 'Dubbing Rights'];
const GENRE_OPTIONS = ['All Genres', 'Action / Thriller', 'Adventure / Drama', 'History / Epic', 'Sci-Fi / Action', 'Drama / War', 'Horror / Thriller', 'Romance / Drama', 'Action / Historical'];

function Badge({ label, variant = 'orange' }: { label: string; variant?: 'orange' | 'dark' }) {
  // Shorten long labels for card display
  const short = label.replace('Dubbing', 'Dub').replace('Theatrical', 'Theatre').replace('Digital Rights', 'Digital').replace('Rights', '').replace('Global ', '').trim();
  return (
    <span className={`inline-block px-2 py-0.5 text-[9px] font-bold uppercase rounded whitespace-nowrap leading-5 max-w-full overflow-hidden text-ellipsis ${
      variant === 'orange' ? 'bg-[#F98110] text-black' : 'bg-black/60 text-[#E5E2E1] border border-white/10'
    }`}>
      {short}
    </span>
  );
}

function Toast({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed bottom-6 right-6 z-[100] bg-[#4ade80] text-black px-5 py-3.5 rounded-xl font-bold shadow-2xl flex items-center gap-3 max-w-sm">
      <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
      </svg>
      <span className="text-sm">Request sent! The seller will contact you shortly.</span>
      <button onClick={onClose} className="ml-auto opacity-70 hover:opacity-100 shrink-0">✕</button>
    </div>
  );
}

function RequestModal({ title, onClose, onSubmit }: { title: Title; onClose: () => void; onSubmit: () => void }) {
  const [form, setForm] = useState({ rightsType: '', territory: '', budget: '', message: '' });
  return (
    <div className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6" onClick={onClose}>
      <div className="bg-[#1c1b1b] rounded-t-2xl sm:rounded-2xl p-6 sm:p-8 w-full sm:max-w-md border border-[#574335]/30 shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="mb-5">
          <h3 className="text-lg font-black text-[#E5E2E1]">Request License</h3>
          <p className="text-sm text-[#DEC1AF] mt-0.5">for <span className="text-[#F98110] font-semibold">{title.name}</span></p>
        </div>
        <form onSubmit={e => { e.preventDefault(); onSubmit(); onClose(); }} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#DEC1AF] uppercase tracking-widest mb-1.5">Rights Type</label>
            <select required value={form.rightsType} onChange={e => setForm({ ...form, rightsType: e.target.value })}
              className="w-full bg-[#131313] border border-[#574335]/50 rounded-xl px-4 py-3 text-[#E5E2E1] text-sm focus:outline-none focus:border-[#F98110]">
              <option value="">Select rights type...</option>
              {title.rightsAvailable.map(r => <option key={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-[#DEC1AF] uppercase tracking-widest mb-1.5">Territory</label>
            <select required value={form.territory} onChange={e => setForm({ ...form, territory: e.target.value })}
              className="w-full bg-[#131313] border border-[#574335]/50 rounded-xl px-4 py-3 text-[#E5E2E1] text-sm focus:outline-none focus:border-[#F98110]">
              <option value="">Select territory...</option>
              {title.territories.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-[#DEC1AF] uppercase tracking-widest mb-1.5">Budget (USD)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#DEC1AF]">$</span>
              <input required type="number" placeholder="35,000" value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })}
                className="w-full bg-[#131313] border border-[#574335]/50 rounded-xl pl-8 pr-4 py-3 text-[#E5E2E1] text-sm focus:outline-none focus:border-[#F98110]" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-[#DEC1AF] uppercase tracking-widest mb-1.5">Message</label>
            <textarea required rows={3} placeholder="Introduce your company and acquisition intent..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
              className="w-full bg-[#131313] border border-[#574335]/50 rounded-xl px-4 py-3 text-[#E5E2E1] text-sm focus:outline-none focus:border-[#F98110] resize-none" />
          </div>
          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose} className="flex-1 py-3 border border-[#574335]/50 rounded-xl text-[#DEC1AF] text-sm font-bold hover:bg-[#201f1f]">Cancel</button>
            <button type="submit" className="flex-1 py-3 bg-[#F98110] text-black rounded-xl text-sm font-extrabold hover:brightness-110">Send Request →</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function TitleModal({ title, onClose, onRequest }: { title: Title; onClose: () => void; onRequest: () => void }) {
  return (
    <div className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6 overflow-y-auto" onClick={onClose}>
      <div className="bg-[#131313] rounded-t-2xl sm:rounded-2xl w-full sm:max-w-3xl border border-[#574335]/30 shadow-2xl sm:my-8 overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="sm:grid sm:grid-cols-5">
          {/* Poster */}
          <div className="sm:col-span-2 relative h-52 sm:h-auto">
            <img src={title.poster} alt={title.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-[#131313]/80 to-transparent" />
            <button onClick={onClose} className="absolute top-3 right-3 bg-black/70 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold hover:bg-black z-10">✕</button>
          </div>
          {/* Details */}
          <div className="sm:col-span-3 p-6 sm:p-8 flex flex-col gap-4 overflow-y-auto max-h-[70vh] sm:max-h-[85vh]">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-xs font-bold text-[#F98110] uppercase tracking-widest">{title.country}</span>
                <span className="text-[#574335]/60">•</span>
                <span className="text-xs text-[#DEC1AF]">{title.year}</span>
                <span className="text-[#574335]/60">•</span>
                <span className="text-xs text-[#DEC1AF]">{title.genre}</span>
              </div>
              <h2 className="text-2xl font-black text-[#E5E2E1] leading-tight">{title.name}</h2>
              <p className="text-xs text-[#DEC1AF] mt-1">by <span className="font-semibold text-[#E5E2E1]">{title.seller}</span></p>
            </div>
            <p className="text-sm text-[#E5E2E1]/70 leading-relaxed">{title.synopsis}</p>
            {/* Screener */}
            <div>
              <p className="text-xs font-bold text-[#DEC1AF] uppercase tracking-widest mb-2">Screener</p>
              <div className="aspect-video rounded-xl overflow-hidden bg-black border border-[#574335]/20">
                <iframe src={title.screenerUrl} className="w-full h-full" allowFullScreen title="screener" />
              </div>
            </div>
            {/* Rights */}
            <div>
              <p className="text-xs font-bold text-[#DEC1AF] uppercase tracking-widest mb-2">Available Rights</p>
              <div className="flex flex-wrap gap-2">
                {title.rightsAvailable.map(r => (
                  <span key={r} className="px-3 py-1.5 bg-[#F98110]/10 text-[#F98110] text-xs font-bold rounded-lg border border-[#F98110]/20">{r}</span>
                ))}
              </div>
            </div>
            {/* Price + CTA */}
            <div className="pt-4 border-t border-[#574335]/20 mt-auto">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs text-[#DEC1AF]">Asking Price</p>
                  <p className="text-3xl font-black text-[#F98110]">${title.price.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-[#DEC1AF]">Rights Holder</p>
                  <p className="text-sm font-bold text-[#E5E2E1]">{title.seller}</p>
                </div>
              </div>
              <button onClick={onRequest} className="w-full bg-[#F98110] text-black py-4 rounded-xl font-extrabold text-base hover:brightness-110">Request License →</button>
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
    const rm = selectedRights === 'All Rights' || t.rightsAvailable.some(r => r === selectedRights);
    const gm = selectedGenre === 'All Genres' || t.genre === selectedGenre;
    return rm && gm;
  });

  return (
    <div className="bg-[#0A0A0A]">
      {/* Hero */}
      <section className="relative flex items-center justify-center py-20 sm:py-24">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1600&q=80" className="w-full h-full object-cover opacity-20" alt="" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/40 via-[#0A0A0A]/60 to-[#0A0A0A]" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto w-full">
          <div className="inline-flex items-center gap-2 bg-[#F98110]/15 border border-[#F98110]/30 rounded-full px-4 py-1.5 mb-5">
            <span className="w-2 h-2 bg-[#F98110] rounded-full"></span>
            <span className="text-xs font-bold text-[#F98110] uppercase tracking-widest">B2B Film Rights Marketplace</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter text-[#E5E2E1] mb-4 leading-[0.95]">
            Global Film Rights.<br /><span className="text-[#F98110]">Seamlessly Traded.</span>
          </h1>
          <p className="text-base sm:text-lg text-[#DEC1AF] mb-8 max-w-xl mx-auto leading-relaxed">
            Discover premium catalogs from independent distributors worldwide. Secure dubbing, SVOD, and theatrical rights in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="bg-[#F98110] text-black px-8 py-3.5 rounded-xl font-extrabold text-sm hover:brightness-110 transition-all shadow-lg shadow-[#F98110]/20">
              Explore Marketplace →
            </button>
            <button className="bg-[#1c1b1b] text-[#E5E2E1] px-8 py-3.5 rounded-xl font-extrabold text-sm hover:bg-[#2a2a2a] transition-all border border-[#574335]/40">
              List Your Catalog
            </button>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-[#1c1b1b] border-y border-[#574335]/20">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              { value: '10,000+', label: 'Titles Available' },
              { value: 'Secure Escrow', label: 'Financial Protection' },
              { value: '24/7 Support', label: 'Global Assistance' },
              { value: 'Verified', label: 'Global Buyer Network' },
            ].map((s, i) => (
              <div key={s.label} className={`flex flex-col items-center justify-center gap-1 text-center py-6 px-4 ${i > 0 ? 'border-l border-[#574335]/20' : ''}`}>
                <span className="text-xl sm:text-2xl font-black text-[#F98110] tracking-tighter">{s.value}</span>
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-[#DEC1AF]">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marketplace */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto">
        {/* Header + Filters */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tighter text-[#E5E2E1]">Featured Inventory</h2>
              <p className="text-[#DEC1AF] text-sm mt-1">{filtered.length} title{filtered.length !== 1 ? 's' : ''} available for licensing</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex gap-2 w-full sm:w-auto">
                <select value={selectedRights} onChange={e => setSelectedRights(e.target.value)}
                  className="bg-[#1c1b1b] border border-[#574335]/40 rounded-xl px-3 py-2.5 text-[#E5E2E1] text-sm focus:outline-none focus:border-[#F98110] flex-1 sm:flex-none min-w-0">
                  {RIGHTS_OPTIONS.map(r => <option key={r}>{r}</option>)}
                </select>
                <select value={selectedGenre} onChange={e => setSelectedGenre(e.target.value)}
                  className="bg-[#1c1b1b] border border-[#574335]/40 rounded-xl px-3 py-2.5 text-[#E5E2E1] text-sm focus:outline-none focus:border-[#F98110] flex-1 sm:flex-none min-w-0">
                  {GENRE_OPTIONS.map(g => <option key={g}>{g}</option>)}
                </select>
                {(selectedRights !== 'All Rights' || selectedGenre !== 'All Genres') && (
                  <button onClick={() => { setSelectedRights('All Rights'); setSelectedGenre('All Genres'); }}
                    className="px-3 py-2.5 text-sm text-[#DEC1AF] hover:text-[#F98110] font-semibold border border-[#574335]/30 rounded-xl hover:border-[#F98110]/40 shrink-0">
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-[#DEC1AF]">
            <p className="text-lg font-semibold mb-2">No titles match your filters.</p>
            <p className="text-sm">Try adjusting or clearing the filters above.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {filtered.map(title => (
              <div key={title.id} onClick={() => setSelectedTitle(title)}
                className="group cursor-pointer bg-[#1c1b1b] rounded-xl overflow-hidden border border-[#574335]/20 hover:border-[#F98110]/40 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/40">
                {/* Poster */}
                <div className="relative overflow-hidden" style={{ paddingBottom: '150%' }}>
                  <img src={title.poster} alt={title.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/10 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2 flex flex-wrap gap-1">
                    {title.rightsAvailable.slice(0, 2).map(r => (
                      <Badge key={r} label={r} variant={r.toLowerCase().includes('dubbing') || r.toLowerCase().includes('theatrical') ? 'orange' : 'dark'} />
                    ))}
                  </div>
                </div>
                {/* Info */}
                <div className="p-3 sm:p-4">
                  <h4 className="font-bold text-[#E5E2E1] text-sm leading-snug mb-0.5 truncate">{title.name}</h4>
                  <p className="text-xs text-[#DEC1AF] mb-2.5 truncate">{title.genre} · {title.year} · {title.country}</p>
                  <div className="flex items-center justify-between pt-2.5 border-t border-[#574335]/20">
                    <p className="text-[#F98110] font-black text-sm leading-none">${title.price.toLocaleString()}</p>
                    <span className="text-[10px] text-[#DEC1AF] bg-[#131313] px-2 py-1 rounded font-semibold truncate max-w-[100px]">{title.seller}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* How It Works */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto border-t border-[#574335]/15">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tighter text-[#E5E2E1] mb-2">How It Works</h2>
          <p className="text-[#DEC1AF] text-sm">Three steps from discovery to licensed deal.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            { step: '01', title: 'Discover', icon: '🔍', desc: 'Browse verified film catalogs from distributors worldwide. Filter by rights type, genre, territory, and budget range.' },
            { step: '02', title: 'Negotiate', icon: '🤝', desc: 'Submit a license request directly to the rights holder. Specify territory, rights type, and your budget in minutes.' },
            { step: '03', title: 'Close', icon: '✍️', desc: 'Finalize deal terms, execute the license agreement, and receive your content files securely.' },
          ].map(s => (
            <div key={s.step} className="bg-[#1c1b1b] border border-[#574335]/20 rounded-xl p-6 hover:border-[#F98110]/30 transition-colors">
              <div className="text-2xl mb-3">{s.icon}</div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-black text-[#F98110] uppercase tracking-widest">{s.step}</span>
                <h3 className="text-lg font-black text-[#E5E2E1]">{s.title}</h3>
              </div>
              <p className="text-sm text-[#DEC1AF] leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto bg-[#1c1b1b] border border-[#574335]/20 p-10 sm:p-14 rounded-2xl text-center relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-48 h-48 bg-[#F98110]/10 blur-[60px] pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-[#F98110]/8 blur-[60px] pointer-events-none" />
          <h2 className="text-2xl sm:text-3xl font-black tracking-tighter text-[#E5E2E1] mb-3 relative">Ready to expand your global distribution?</h2>
          <p className="text-[#DEC1AF] text-sm mb-8 relative max-w-md mx-auto leading-relaxed">
            Join the growing network of distributors and content owners streamlining film rights management globally.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center relative">
            <button className="bg-[#F98110] text-black px-8 py-3.5 rounded-xl font-extrabold text-sm hover:brightness-110 transition-all shadow-lg shadow-[#F98110]/20">Apply for Access</button>
            <button className="border border-[#574335]/50 text-[#E5E2E1] px-8 py-3.5 rounded-xl font-extrabold text-sm hover:bg-[#201f1f] transition-all">Contact Sales</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#574335]/20 bg-[#0A0A0A] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <span className="text-base font-black text-[#E5E2E1]">Dubbing<span className="text-[#F98110]">Rights</span></span>
            <p className="text-xs text-[#DEC1AF] mt-1">© 2025 DubbingRights. Global Film Rights Marketplace.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-xs text-[#DEC1AF]">
            {['Privacy Policy', 'Terms of Service', 'Licensing', 'Support'].map(l => (
              <a key={l} href="#" className="hover:text-[#F98110] transition-colors">{l}</a>
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
    </div>
  );
}
