'use client';

import { useState } from 'react';
import { TITLES, Title } from '@/lib/dummyData';

const RIGHTS_OPTIONS = ['All Rights', 'LATAM Dubbing', 'EU SVOD', 'Global VOD', 'MENA Rights', 'Theatrical', 'APAC Dubbing', 'Digital Rights', 'US SVOD', 'MENA Dubbing', 'EU Theatrical', 'LATAM Rights', 'Global SVOD', 'Dubbing Rights'];
const GENRE_OPTIONS = ['All Genres', 'Action / Thriller', 'Adventure / Drama', 'History / Epic', 'Sci-Fi / Action', 'Drama / War', 'Horror / Thriller', 'Romance / Drama', 'Action / Historical'];

function RightsBadge({ label }: { label: string }) {
  const isOrange = label.toLowerCase().includes('dubbing') || label.toLowerCase().includes('theatrical');
  return (
    <span className={`inline-block px-2.5 py-1 text-[11px] font-bold uppercase rounded-md whitespace-nowrap ${
      isOrange ? 'bg-[#F98110] text-black' : 'bg-[#2a2a2a]/90 text-[#E5E2E1] border border-[#574335]/40'
    }`}>
      {label}
    </span>
  );
}

function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div className="fixed bottom-8 right-8 z-[100] bg-[#4ade80] text-black px-6 py-4 rounded-xl font-bold shadow-2xl flex items-center gap-3">
      <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
      </svg>
      <span>Request sent! The seller will contact you shortly.</span>
      <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100 text-lg leading-none">✕</button>
    </div>
  );
}

function RequestModal({ title, onClose, onSubmit }: { title: Title; onClose: () => void; onSubmit: () => void }) {
  const [form, setForm] = useState({ rightsType: '', territory: '', budget: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6" onClick={onClose}>
      <div className="bg-[#1c1b1b] rounded-2xl p-8 max-w-md w-full border border-[#574335]/30 shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="mb-6">
          <h3 className="text-xl font-black text-[#E5E2E1]">Request License</h3>
          <p className="text-sm text-[#DEC1AF] mt-1">for <span className="text-[#F98110] font-semibold">{title.name}</span></p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-[#DEC1AF] uppercase tracking-widest mb-2">Rights Type</label>
            <select required value={form.rightsType} onChange={e => setForm({ ...form, rightsType: e.target.value })}
              className="w-full bg-[#131313] border border-[#574335]/50 rounded-xl px-4 py-3 text-[#E5E2E1] text-sm focus:outline-none focus:border-[#F98110] transition-colors">
              <option value="">Select rights type...</option>
              {title.rightsAvailable.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-[#DEC1AF] uppercase tracking-widest mb-2">Territory</label>
            <select required value={form.territory} onChange={e => setForm({ ...form, territory: e.target.value })}
              className="w-full bg-[#131313] border border-[#574335]/50 rounded-xl px-4 py-3 text-[#E5E2E1] text-sm focus:outline-none focus:border-[#F98110] transition-colors">
              <option value="">Select territory...</option>
              {title.territories.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-[#DEC1AF] uppercase tracking-widest mb-2">Budget (USD)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#DEC1AF] font-semibold">$</span>
              <input required type="number" placeholder="35,000" value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })}
                className="w-full bg-[#131313] border border-[#574335]/50 rounded-xl pl-8 pr-4 py-3 text-[#E5E2E1] text-sm focus:outline-none focus:border-[#F98110] transition-colors" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-[#DEC1AF] uppercase tracking-widest mb-2">Message to Seller</label>
            <textarea required rows={4} placeholder="Introduce your company and acquisition intent..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
              className="w-full bg-[#131313] border border-[#574335]/50 rounded-xl px-4 py-3 text-[#E5E2E1] text-sm focus:outline-none focus:border-[#F98110] resize-none transition-colors" />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 px-4 py-3 border border-[#574335]/50 rounded-xl text-[#DEC1AF] text-sm font-bold hover:bg-[#201f1f] transition-colors">
              Cancel
            </button>
            <button type="submit"
              className="flex-1 px-4 py-3 bg-[#F98110] text-black rounded-xl text-sm font-extrabold hover:brightness-110 transition-all">
              Send Request →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function TitleModal({ title, onClose, onRequest }: { title: Title; onClose: () => void; onRequest: () => void }) {
  return (
    <div className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 overflow-y-auto" onClick={onClose}>
      <div className="bg-[#131313] rounded-2xl max-w-3xl w-full border border-[#574335]/30 shadow-2xl my-8 overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="grid md:grid-cols-5">
          {/* Poster — 2 cols */}
          <div className="md:col-span-2 relative min-h-[280px]">
            <img src={title.poster} alt={title.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#131313]/30 hidden md:block" />
            <button onClick={onClose}
              className="absolute top-4 right-4 bg-black/70 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-black transition-colors text-sm font-bold">
              ✕
            </button>
          </div>

          {/* Details — 3 cols */}
          <div className="md:col-span-3 p-8 flex flex-col gap-5 overflow-y-auto max-h-[85vh]">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold text-[#F98110] uppercase tracking-widest">{title.country}</span>
                <span className="text-[#574335]">•</span>
                <span className="text-xs font-bold text-[#DEC1AF] uppercase tracking-widest">{title.year}</span>
                <span className="text-[#574335]">•</span>
                <span className="text-xs font-bold text-[#DEC1AF] uppercase tracking-widest">{title.genre}</span>
              </div>
              <h2 className="text-2xl font-black text-[#E5E2E1] leading-tight">{title.name}</h2>
              <p className="text-xs text-[#DEC1AF] mt-1">Listed by <span className="font-semibold text-[#E5E2E1]">{title.seller}</span></p>
            </div>

            <p className="text-sm text-[#E5E2E1]/75 leading-relaxed">{title.synopsis}</p>

            {/* Screener */}
            <div>
              <p className="text-xs font-bold text-[#DEC1AF] uppercase tracking-widest mb-2">Screener Preview</p>
              <div className="aspect-video rounded-xl overflow-hidden bg-black border border-[#574335]/20">
                <iframe src={title.screenerUrl} className="w-full h-full" allowFullScreen title="screener" />
              </div>
            </div>

            {/* Rights */}
            <div>
              <p className="text-xs font-bold text-[#DEC1AF] uppercase tracking-widest mb-3">Available Rights</p>
              <div className="flex flex-wrap gap-2">
                {title.rightsAvailable.map(r => <RightsBadge key={r} label={r} />)}
              </div>
            </div>

            {/* Territories */}
            <div>
              <p className="text-xs font-bold text-[#DEC1AF] uppercase tracking-widest mb-3">Territories</p>
              <div className="flex flex-wrap gap-2">
                {title.territories.map(t => (
                  <span key={t} className="px-3 py-1.5 bg-[#201f1f] text-[#E5E2E1] text-xs font-semibold rounded-lg border border-[#574335]/30">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Price & CTA */}
            <div className="mt-auto pt-4 border-t border-[#574335]/20">
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
              <button onClick={onRequest}
                className="w-full bg-[#F98110] text-black py-4 rounded-xl font-extrabold text-base hover:brightness-110 transition-all">
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
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const filtered = TITLES.filter(t => {
    const rightsMatch = selectedRights === 'All Rights' || t.rightsAvailable.some(r => r === selectedRights);
    const genreMatch = selectedGenre === 'All Genres' || t.genre === selectedGenre;
    return rightsMatch && genreMatch;
  });

  return (
    <div className="min-h-screen bg-[#0A0A0A]">

      {/* Hero */}
      <section className="relative h-[580px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1600&q=80"
            className="w-full h-full object-cover opacity-25"
            alt="cinema background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/30 via-[#0A0A0A]/60 to-[#0A0A0A]" />
        </div>
        <div className="relative z-10 text-center px-8 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#F98110]/15 border border-[#F98110]/30 rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 bg-[#F98110] rounded-full"></span>
            <span className="text-xs font-bold text-[#F98110] uppercase tracking-widest">B2B Film Rights Marketplace</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-[#E5E2E1] mb-5 leading-[0.95]">
            Global Film Rights.<br />
            <span className="text-[#F98110]">Seamlessly Traded.</span>
          </h1>
          <p className="text-lg md:text-xl text-[#DEC1AF] font-medium mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover premium catalogs from independent distributors worldwide. Secure dubbing, SVOD, and theatrical rights in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#F98110] text-black px-8 py-4 rounded-xl font-extrabold text-base hover:brightness-110 transition-all shadow-lg shadow-[#F98110]/20">
              Explore Marketplace →
            </button>
            <button className="bg-[#1c1b1b] text-[#E5E2E1] px-8 py-4 rounded-xl font-extrabold text-base hover:bg-[#2a2a2a] transition-all border border-[#574335]/40">
              List Your Catalog
            </button>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-[#1c1b1b] border-y border-[#574335]/20">
        <div className="max-w-screen-xl mx-auto grid grid-cols-2 md:grid-cols-4 py-8 px-8">
          {[
            { value: '10,000+', label: 'Titles Available' },
            { value: 'Secure Escrow', label: 'Financial Protection' },
            { value: '24/7 Support', label: 'Global Assistance' },
            { value: 'Verified', label: 'Global Buyer Network' },
          ].map((s, i) => (
            <div key={s.label} className={`flex flex-col items-center justify-center gap-1.5 text-center px-6 py-4 ${i > 0 ? 'border-l border-[#574335]/20' : ''}`}>
              <span className="text-2xl font-black text-[#F98110] tracking-tighter">{s.value}</span>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#DEC1AF]">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Marketplace */}
      <section className="py-16 px-8 max-w-screen-xl mx-auto">

        {/* Section header + filters */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-2">
            <div>
              <h2 className="text-3xl font-black tracking-tighter text-[#E5E2E1]">Featured Inventory</h2>
              <p className="text-[#DEC1AF] mt-1 text-sm">
                {filtered.length} title{filtered.length !== 1 ? 's' : ''} available for licensing
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <select
                value={selectedRights}
                onChange={e => setSelectedRights(e.target.value)}
                className="bg-[#1c1b1b] border border-[#574335]/40 rounded-xl px-4 py-2.5 text-[#E5E2E1] text-sm focus:outline-none focus:border-[#F98110] transition-colors min-w-[160px]"
              >
                {RIGHTS_OPTIONS.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
              <select
                value={selectedGenre}
                onChange={e => setSelectedGenre(e.target.value)}
                className="bg-[#1c1b1b] border border-[#574335]/40 rounded-xl px-4 py-2.5 text-[#E5E2E1] text-sm focus:outline-none focus:border-[#F98110] transition-colors min-w-[160px]"
              >
                {GENRE_OPTIONS.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
              {(selectedRights !== 'All Rights' || selectedGenre !== 'All Genres') && (
                <button
                  onClick={() => { setSelectedRights('All Rights'); setSelectedGenre('All Genres'); }}
                  className="px-4 py-2.5 text-sm text-[#DEC1AF] hover:text-[#F98110] transition-colors font-semibold border border-[#574335]/30 rounded-xl hover:border-[#F98110]/40"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Cards grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24 text-[#DEC1AF]">
            <p className="text-lg font-semibold mb-2">No titles match your filters.</p>
            <p className="text-sm">Try adjusting or clearing the filters above.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(title => (
              <div
                key={title.id}
                onClick={() => setSelectedTitle(title)}
                className="group cursor-pointer bg-[#1c1b1b] rounded-2xl overflow-hidden border border-[#574335]/20 hover:border-[#F98110]/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40"
              >
                {/* Poster */}
                <div className="relative aspect-[2/3] overflow-hidden">
                  <img
                    src={title.poster}
                    alt={title.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />

                  {/* Rights badges — bottom of poster */}
                  <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5">
                    {title.rightsAvailable.map(r => <RightsBadge key={r} label={r} />)}
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <h4 className="font-bold text-[#E5E2E1] text-base mb-1 leading-snug">{title.name}</h4>
                  <p className="text-xs text-[#DEC1AF] mb-3">{title.genre} &bull; {title.year} &bull; {title.country}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-[#574335]/20">
                    <div>
                      <p className="text-[10px] text-[#DEC1AF] uppercase tracking-wide">Asking Price</p>
                      <p className="text-[#F98110] font-black text-base">${title.price.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-[#DEC1AF] uppercase tracking-wide">Seller</p>
                      <p className="text-xs font-semibold text-[#E5E2E1] truncate max-w-[100px]">{title.seller}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* How It Works */}
      <section className="py-20 px-8 max-w-screen-xl mx-auto border-t border-[#574335]/15">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-black tracking-tighter text-[#E5E2E1] mb-3">How It Works</h2>
          <p className="text-[#DEC1AF] max-w-xl mx-auto">Three steps from discovery to licensed deal.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { step: '01', title: 'Discover', icon: '🔍', desc: 'Browse verified film catalogs from distributors worldwide. Filter by rights type, genre, territory, and budget.' },
            { step: '02', title: 'Negotiate', icon: '🤝', desc: 'Submit a license request directly to the rights holder. Specify territory, rights type, and your budget in minutes.' },
            { step: '03', title: 'Close', icon: '✍️', desc: 'Finalize deal terms, execute the license agreement, and receive your content files securely.' },
          ].map(s => (
            <div key={s.step} className="bg-[#1c1b1b] border border-[#574335]/20 rounded-2xl p-8 hover:border-[#F98110]/30 transition-colors">
              <div className="text-3xl mb-4">{s.icon}</div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-black text-[#F98110] uppercase tracking-widest">{s.step}</span>
                <h3 className="text-xl font-black text-[#E5E2E1]">{s.title}</h3>
              </div>
              <p className="text-sm text-[#DEC1AF] leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-8">
        <div className="max-w-screen-md mx-auto bg-[#1c1b1b] border border-[#574335]/20 p-16 rounded-2xl text-center relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#F98110]/10 blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#F98110]/8 blur-[80px] pointer-events-none" />
          <h2 className="text-4xl font-black tracking-tighter text-[#E5E2E1] mb-4 relative">
            Ready to expand your global distribution?
          </h2>
          <p className="text-[#DEC1AF] text-base mb-10 relative max-w-md mx-auto leading-relaxed">
            Join the growing network of distributors and content owners streamlining film rights management globally.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative">
            <button className="bg-[#F98110] text-black px-10 py-4 rounded-xl font-extrabold text-base hover:brightness-110 transition-all shadow-lg shadow-[#F98110]/20">
              Apply for Access
            </button>
            <button className="border border-[#574335]/50 text-[#E5E2E1] px-10 py-4 rounded-xl font-extrabold text-base hover:bg-[#201f1f] transition-all">
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#574335]/20 bg-[#0A0A0A] py-10 px-8">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <span className="text-base font-black text-[#E5E2E1]">Dubbing<span className="text-[#F98110]">Rights</span></span>
            <p className="text-xs text-[#DEC1AF] mt-1">© 2025 DubbingRights. All rights reserved. Global Film Rights Marketplace.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-xs text-[#DEC1AF]">
            {['Privacy Policy', 'Terms of Service', 'Cookie Settings', 'Licensing Standards', 'Support'].map(l => (
              <a key={l} href="#" className="hover:text-[#F98110] transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </footer>

      {/* Modals */}
      {selectedTitle && !showRequestModal && (
        <TitleModal
          title={selectedTitle}
          onClose={() => setSelectedTitle(null)}
          onRequest={() => setShowRequestModal(true)}
        />
      )}
      {selectedTitle && showRequestModal && (
        <RequestModal
          title={selectedTitle}
          onClose={() => { setShowRequestModal(false); setSelectedTitle(null); }}
          onSubmit={() => { setShowToast(true); setTimeout(() => setShowToast(false), 4000); }}
        />
      )}
      {showToast && <Toast message="" onClose={() => setShowToast(false)} />}
    </div>
  );
}
