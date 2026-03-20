'use client';

import { useState } from 'react';
import { TITLES, Title } from '@/lib/dummyData';

const RIGHTS_OPTIONS = ['All Rights', 'LATAM Dubbing', 'EU SVOD', 'Global VOD', 'MENA Rights', 'Theatrical', 'APAC Dubbing', 'Digital Rights', 'US SVOD', 'MENA Dubbing', 'EU Theatrical', 'LATAM Rights', 'Global SVOD', 'Dubbing Rights'];
const GENRE_OPTIONS = ['All Genres', 'Action / Thriller', 'Adventure / Drama', 'History / Epic', 'Sci-Fi / Action', 'Drama / War', 'Horror / Thriller', 'Romance / Drama', 'Action / Historical'];
const TERRITORY_OPTIONS = ['All Territories', 'Latin America', 'Europe', 'Asia Pacific', 'Middle East & North Africa', 'United States', 'Global'];

function RightsBadge({ label }: { label: string }) {
  const isOrange = label.includes('Dubbing') || label.includes('Theatrical');
  return (
    <span className={`px-2 py-0.5 text-[10px] font-black uppercase rounded ${isOrange ? 'bg-[#F98110] text-black' : 'bg-[#2a2a2a] text-[#E5E2E1]'}`}>
      {label}
    </span>
  );
}

function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div className="fixed bottom-8 right-8 z-[100] bg-[#4ade80] text-black px-6 py-4 rounded-xl font-bold shadow-2xl flex items-center gap-3 animate-fade-in">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
      </svg>
      {message}
      <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100">✕</button>
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
    <div className="fixed inset-0 z-[80] bg-black/80 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-[#1c1b1b] rounded-xl p-8 max-w-md w-full border border-[#574335]/30" onClick={e => e.stopPropagation()}>
        <h3 className="text-xl font-black mb-1 text-[#E5E2E1]">Request License</h3>
        <p className="text-sm text-[#DEC1AF] mb-6">{title.name}</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#DEC1AF] uppercase tracking-widest mb-1">Rights Type</label>
            <select required value={form.rightsType} onChange={e => setForm({ ...form, rightsType: e.target.value })}
              className="w-full bg-[#201f1f] border border-[#574335]/40 rounded-lg px-3 py-2.5 text-[#E5E2E1] text-sm focus:outline-none focus:border-[#F98110]">
              <option value="">Select rights type...</option>
              {title.rightsAvailable.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-[#DEC1AF] uppercase tracking-widest mb-1">Territory</label>
            <select required value={form.territory} onChange={e => setForm({ ...form, territory: e.target.value })}
              className="w-full bg-[#201f1f] border border-[#574335]/40 rounded-lg px-3 py-2.5 text-[#E5E2E1] text-sm focus:outline-none focus:border-[#F98110]">
              <option value="">Select territory...</option>
              {title.territories.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-[#DEC1AF] uppercase tracking-widest mb-1">Budget (USD)</label>
            <input required type="number" placeholder="e.g. 35000" value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })}
              className="w-full bg-[#201f1f] border border-[#574335]/40 rounded-lg px-3 py-2.5 text-[#E5E2E1] text-sm focus:outline-none focus:border-[#F98110]" />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#DEC1AF] uppercase tracking-widest mb-1">Message</label>
            <textarea required rows={3} placeholder="Introduce your company and intent..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
              className="w-full bg-[#201f1f] border border-[#574335]/40 rounded-lg px-3 py-2.5 text-[#E5E2E1] text-sm focus:outline-none focus:border-[#F98110] resize-none" />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-3 border border-[#574335]/40 rounded-lg text-[#DEC1AF] text-sm font-bold hover:bg-[#201f1f] transition-colors">Cancel</button>
            <button type="submit" className="flex-1 px-4 py-3 bg-[#F98110] text-black rounded-lg text-sm font-extrabold hover:brightness-110 transition-all">Send Request</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function TitleModal({ title, onClose, onRequest }: { title: Title; onClose: () => void; onRequest: () => void }) {
  return (
    <div className="fixed inset-0 z-[70] bg-black/80 flex items-center justify-center p-4 overflow-y-auto" onClick={onClose}>
      <div className="bg-[#131313] rounded-xl max-w-3xl w-full border border-[#574335]/30 my-8" onClick={e => e.stopPropagation()}>
        <div className="grid md:grid-cols-2 gap-0">
          {/* Poster */}
          <div className="relative">
            <img src={title.poster} alt={title.name} className="w-full h-64 md:h-full object-cover rounded-t-xl md:rounded-l-xl md:rounded-tr-none" />
            <button onClick={onClose} className="absolute top-4 right-4 bg-black/60 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-black transition-colors">✕</button>
          </div>
          {/* Details */}
          <div className="p-8 flex flex-col">
            <div className="mb-1">
              <span className="text-xs font-bold text-[#F98110] uppercase tracking-widest">{title.country} • {title.year}</span>
            </div>
            <h2 className="text-2xl font-black text-[#E5E2E1] mb-1">{title.name}</h2>
            <p className="text-sm text-[#DEC1AF] mb-4">{title.genre}</p>
            <p className="text-sm text-[#E5E2E1]/80 leading-relaxed mb-6">{title.synopsis}</p>

            {/* Screener */}
            <div className="mb-6">
              <p className="text-xs font-bold text-[#DEC1AF] uppercase tracking-widest mb-2">Screener</p>
              <div className="aspect-video rounded-lg overflow-hidden bg-black">
                <iframe src={title.screenerUrl} className="w-full h-full" allowFullScreen title="screener" />
              </div>
            </div>

            {/* Rights */}
            <div className="mb-4">
              <p className="text-xs font-bold text-[#DEC1AF] uppercase tracking-widest mb-2">Rights Available</p>
              <div className="flex flex-wrap gap-2">
                {title.rightsAvailable.map(r => <RightsBadge key={r} label={r} />)}
              </div>
            </div>

            {/* Seller & Price */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <p className="text-xs text-[#DEC1AF]">Listed by</p>
                <p className="text-sm font-bold text-[#E5E2E1]">{title.seller}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-[#DEC1AF]">Asking price</p>
                <p className="text-xl font-black text-[#F98110]">${title.price.toLocaleString()}</p>
              </div>
            </div>

            <button onClick={onRequest} className="w-full bg-[#F98110] text-black py-3.5 rounded-lg font-extrabold hover:brightness-110 transition-all">
              Request License →
            </button>
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
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1600&q=80" className="w-full h-full object-cover blur-sm opacity-30" alt="cinema" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/20 via-[#0A0A0A]/50 to-[#0A0A0A]" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tighter text-[#E5E2E1] mb-4 leading-[0.95]">
            Global Film Rights.<br />
            <span className="text-[#F98110]">Seamlessly Traded.</span>
          </h1>
          <p className="text-xl text-[#DEC1AF] font-medium mb-8 max-w-xl mx-auto">
            Instantly discover premium global catalogs. Secure transactions for every dubbing and VOD license.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#F98110] text-black px-10 py-4 rounded-lg font-extrabold text-lg hover:brightness-110 transition-all">
              Explore Marketplace →
            </button>
            <button className="bg-[#201f1f]/80 backdrop-blur text-[#E5E2E1] px-10 py-4 rounded-lg font-extrabold text-lg hover:bg-[#2a2a2a] transition-all border border-[#574335]/30">
              List a Catalog
            </button>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-[#1c1b1b] border-y border-[#574335]/20">
        <div className="max-w-[1920px] mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-[#574335]/20 py-8 px-8">
          {[
            { value: '10,000+', label: 'Titles Available' },
            { value: 'Secure Escrow', label: 'Financial Protection' },
            { value: '24/7 Support', label: 'Global Assistance' },
            { value: 'Verified', label: 'Global Buyer Network' },
          ].map(s => (
            <div key={s.label} className="flex flex-col items-center justify-center gap-1 text-center px-4 py-2">
              <span className="text-2xl font-black text-[#F98110] tracking-tighter">{s.value}</span>
              <span className="text-xs font-bold uppercase tracking-widest text-[#DEC1AF]">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Marketplace */}
      <section className="py-16 px-8 max-w-[1920px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-black tracking-tighter text-[#E5E2E1] mb-1">Featured Inventory</h2>
            <p className="text-[#DEC1AF]">{filtered.length} titles available for licensing</p>
          </div>
          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <select value={selectedRights} onChange={e => setSelectedRights(e.target.value)}
              className="bg-[#201f1f] border border-[#574335]/40 rounded-lg px-3 py-2 text-[#E5E2E1] text-sm focus:outline-none focus:border-[#F98110]">
              {RIGHTS_OPTIONS.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
            <select value={selectedGenre} onChange={e => setSelectedGenre(e.target.value)}
              className="bg-[#201f1f] border border-[#574335]/40 rounded-lg px-3 py-2 text-[#E5E2E1] text-sm focus:outline-none focus:border-[#F98110]">
              {GENRE_OPTIONS.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
            <button onClick={() => { setSelectedRights('All Rights'); setSelectedGenre('All Genres'); }}
              className="px-3 py-2 text-sm text-[#DEC1AF] hover:text-[#F98110] transition-colors font-semibold">
              Reset
            </button>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-24 text-[#DEC1AF]">No titles match your filters.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map(title => (
              <div key={title.id} onClick={() => setSelectedTitle(title)}
                className="group cursor-pointer bg-[rgba(28,27,27,0.7)] rounded-xl overflow-hidden border border-[#574335]/20 hover:border-[#F98110]/40 transition-all duration-300 hover:-translate-y-1">
                <div className="relative aspect-[2/3] overflow-hidden">
                  <img src={title.poster} alt={title.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5">
                    {title.rightsAvailable.map(r => <RightsBadge key={r} label={r} />)}
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-[#E5E2E1] mb-0.5 truncate">{title.name}</h4>
                  <p className="text-xs text-[#DEC1AF] mb-3">{title.genre} • {title.year}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[#F98110] font-black text-sm">${title.price.toLocaleString()}</span>
                    <span className="text-xs text-[#DEC1AF]">{title.seller}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="py-24 px-8">
        <div className="max-w-4xl mx-auto bg-[rgba(28,27,27,0.7)] border border-[#574335]/20 p-16 rounded-xl text-center relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-48 h-48 bg-[#F98110]/15 blur-[80px]" />
          <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-[#F98110]/10 blur-[80px]" />
          <h2 className="text-4xl font-black tracking-tighter mb-4 text-[#E5E2E1] relative">
            Ready to expand your global distribution?
          </h2>
          <p className="text-[#DEC1AF] text-lg mb-8 relative">Join the elite network of distributors and content owners streamlining film rights management.</p>
          <div className="flex gap-4 justify-center relative">
            <button className="bg-[#F98110] text-black px-10 py-4 rounded-lg font-extrabold text-lg shadow-2xl hover:brightness-110 transition-all">Apply for Access</button>
            <button className="border border-[#574335]/40 text-[#E5E2E1] px-10 py-4 rounded-lg font-extrabold text-lg hover:bg-[#201f1f] transition-all">Contact Sales</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#574335]/20 bg-[#0A0A0A] py-10 px-8">
        <div className="max-w-[1920px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <span className="text-lg font-black text-[#E5E2E1]">Dubbing<span className="text-[#F98110]">Rights</span></span>
            <p className="text-xs text-[#DEC1AF] mt-1">© 2025 DubbingRights. All rights reserved.</p>
          </div>
          <div className="flex gap-6 text-xs text-[#DEC1AF]">
            {['Privacy Policy', 'Terms of Service', 'Licensing', 'Support'].map(l => (
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
      {showToast && (
        <Toast message="Request sent! The seller will contact you shortly." onClose={() => setShowToast(false)} />
      )}
    </div>
  );
}
