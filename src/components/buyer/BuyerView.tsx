'use client';

import { useState } from 'react';
import { TITLES, Title } from '@/lib/dummyData';

const RIGHTS_OPTIONS = ['All Rights', 'Dubbing', 'SVOD', 'Theatrical', 'Digital', 'VOD'];
const GENRE_OPTIONS = ['All Genres', 'Action / Thriller', 'Adventure / Drama', 'History / Epic', 'Sci-Fi / Action', 'Drama / War', 'Horror / Thriller', 'Romance / Drama'];

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
    <div style={{ background: 'var(--bg-base)', minHeight: '100vh' }}>
      
      {/* ============================================
          HERO SECTION
          ============================================ */}
      <section style={{ 
        position: 'relative',
        paddingTop: '80px',
        paddingBottom: '100px',
        overflow: 'hidden'
      }}>
        {/* Background Image */}
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0
        }}>
          <img 
            src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1920&q=80" 
            alt=""
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.12
            }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(10,10,10,0.5), rgba(10,10,10,0.9), rgba(10,10,10,1))'
          }} />
        </div>

        {/* Content */}
        <div className="container-wide" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            
            {/* Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              background: 'rgba(249, 129, 16, 0.1)',
              border: '1px solid rgba(249, 129, 16, 0.25)',
              borderRadius: '100px',
              marginBottom: '32px'
            }}>
              <span style={{
                width: '8px',
                height: '8px',
                background: 'var(--accent-orange)',
                borderRadius: '50%',
                animation: 'pulse-glow 2s ease-in-out infinite'
              }} />
              <span style={{
                fontSize: '12px',
                fontWeight: 700,
                color: 'var(--accent-orange)',
                textTransform: 'uppercase',
                letterSpacing: '1.5px'
              }}>
                B2B Film Rights Marketplace
              </span>
            </div>

            {/* Headline */}
            <h1 style={{
              fontSize: 'clamp(40px, 6vw, 64px)',
              fontWeight: 800,
              lineHeight: 1.1,
              marginBottom: '24px'
            }}>
              <span style={{ color: 'var(--text-primary)' }}>Global Film Rights.</span>
              <br />
              <span style={{ color: 'var(--accent-orange)' }}>Seamlessly Traded.</span>
            </h1>

            {/* Subheadline */}
            <p style={{
              fontSize: '18px',
              color: 'var(--text-secondary)',
              maxWidth: '600px',
              margin: '0 auto 40px',
              lineHeight: 1.7
            }}>
              Discover premium catalogs from independent distributors worldwide. 
              Secure dubbing, SVOD, and theatrical rights in one place.
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn-primary">
                Explore Marketplace
                <span>→</span>
              </button>
              <button className="btn-secondary">
                List Your Catalog
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          TRUST BAR
          ============================================ */}
      <section style={{
        background: 'var(--bg-surface)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)'
      }}>
        <div className="container-wide">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1px'
          }}>
            {[
              { icon: '🎬', value: '10,000+', label: 'Titles Available' },
              { icon: '🔒', value: 'Secure Escrow', label: 'Payment Protection' },
              { icon: '🌍', value: '24/7 Support', label: 'Global Coverage' },
              { icon: '✓', value: 'Verified Network', label: 'Trusted Partners' },
            ].map((stat, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '28px 24px',
                borderLeft: i > 0 ? '1px solid var(--border-subtle)' : 'none'
              }}>
                <span style={{ fontSize: '32px' }}>{stat.icon}</span>
                <div>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          FILM CATALOG
          ============================================ */}
      <section className="section-spacing">
        <div className="container-wide">
          
          {/* Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '24px',
            marginBottom: '48px'
          }}>
            <div>
              <span className="badge badge-orange" style={{ marginBottom: '12px' }}>Featured Inventory</span>
              <h2 style={{ fontSize: '36px', fontWeight: 800, color: 'var(--text-primary)' }}>
                Browse Film Catalog
              </h2>
              <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
                {filtered.length} titles available for licensing
              </p>
            </div>
            
            {/* Filters */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <select 
                className="input select"
                value={selectedRights}
                onChange={e => setSelectedRights(e.target.value)}
                style={{ width: '160px' }}
              >
                {RIGHTS_OPTIONS.map(r => <option key={r}>{r}</option>)}
              </select>
              <select 
                className="input select"
                value={selectedGenre}
                onChange={e => setSelectedGenre(e.target.value)}
                style={{ width: '180px' }}
              >
                {GENRE_OPTIONS.map(g => <option key={g}>{g}</option>)}
              </select>
            </div>
          </div>

          {/* Film Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px'
          }}>
            {filtered.map((title) => (
              <FilmCard 
                key={title.id} 
                title={title} 
                onView={() => setSelectedTitle(title)}
                onRequest={() => { setSelectedTitle(title); setShowRequest(true); }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          HOW IT WORKS
          ============================================ */}
      <section style={{
        background: 'var(--bg-surface)',
        borderTop: '1px solid var(--border-subtle)',
        padding: '120px 0'
      }}>
        <div className="container-wide">
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <span className="badge badge-orange" style={{ marginBottom: '12px' }}>Simple Process</span>
            <h2 style={{ fontSize: '36px', fontWeight: 800, color: 'var(--text-primary)' }}>
              How It Works
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '32px',
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            {[
              { num: '01', icon: '🔍', title: 'Discover', desc: 'Browse verified film catalogs from distributors worldwide. Filter by rights type, genre, and territory.' },
              { num: '02', icon: '🤝', title: 'Negotiate', desc: 'Submit license requests directly to content owners. Discuss terms and pricing in our secure platform.' },
              { num: '03', icon: '✅', title: 'Close', desc: 'Finalize deals with protected escrow payments. Get instant access to licensed content.' },
            ].map((step, i) => (
              <div key={i} className="card-flat" style={{ padding: '40px 32px', textAlign: 'center' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  background: 'rgba(249, 129, 16, 0.1)',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 24px',
                  fontSize: '28px'
                }}>
                  {step.icon}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--accent-orange)', fontWeight: 700, marginBottom: '8px' }}>
                  STEP {step.num}
                </div>
                <h3 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>
                  {step.title}
                </h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          CTA SECTION
          ============================================ */}
      <section className="section-spacing">
        <div className="container-wide">
          <div className="card-flat" style={{
            padding: '80px 48px',
            textAlign: 'center',
            background: 'linear-gradient(135deg, var(--bg-card), var(--bg-elevated))',
            border: '1px solid var(--border-medium)'
          }}>
            <h2 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '16px' }}>
              Ready to expand your global distribution?
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 32px', fontSize: '17px' }}>
              Join the growing network of distributors and content owners streamlining film rights management.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn-primary">Apply for Access</button>
              <button className="btn-secondary">Contact Sales</button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          FOOTER
          ============================================ */}
      <footer style={{
        borderTop: '1px solid var(--border-subtle)',
        padding: '32px 0'
      }}>
        <div className="container-wide">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                background: 'var(--accent-orange)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{ color: '#000', fontWeight: 800, fontSize: '11px' }}>DR</span>
              </div>
              <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>DubbingRights</span>
            </div>
            <div style={{ display: 'flex', gap: '24px', fontSize: '14px', color: 'var(--text-muted)' }}>
              <span>© 2025 DubbingRights</span>
              <a href="#" style={{ color: 'inherit' }}>Privacy</a>
              <a href="#" style={{ color: 'inherit' }}>Terms</a>
              <a href="#" style={{ color: 'inherit' }}>Support</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ============================================
          MODALS
          ============================================ */}
      {selectedTitle && !showRequest && (
        <TitleModal 
          title={selectedTitle} 
          onClose={() => setSelectedTitle(null)}
          onRequest={() => setShowRequest(true)}
        />
      )}

      {selectedTitle && showRequest && (
        <RequestModal 
          title={selectedTitle}
          onClose={() => { setShowRequest(false); setSelectedTitle(null); }}
          onSubmit={() => {
            setShowRequest(false);
            setSelectedTitle(null);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 4000);
          }}
        />
      )}

      {showToast && <Toast onClose={() => setShowToast(false)} />}
    </div>
  );
}

/* ============================================
   FILM CARD COMPONENT
   ============================================ */
function FilmCard({ title, onView, onRequest }: { title: Title; onView: () => void; onRequest: () => void }) {
  return (
    <div className="card" style={{ overflow: 'hidden' }}>
      {/* Poster */}
      <div style={{ position: 'relative', aspectRatio: '2/3' }}>
        <img 
          src={title.poster} 
          alt={title.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
        
        {/* Price Badge */}
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          padding: '8px 14px',
          background: 'linear-gradient(135deg, var(--accent-orange), #e67300)',
          borderRadius: '10px',
          fontWeight: 800,
          fontSize: '14px',
          color: '#000',
          boxShadow: '0 4px 12px rgba(249, 129, 16, 0.4)'
        }}>
          ${(title.price / 1000).toFixed(0)}K
        </div>

        {/* Rights Badges */}
        <div style={{
          position: 'absolute',
          bottom: '12px',
          left: '12px',
          right: '12px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '6px'
        }}>
          {title.rightsAvailable.slice(0, 2).map((r) => (
            <span key={r} style={{
              padding: '5px 10px',
              background: 'rgba(0, 0, 0, 0.75)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '6px',
              fontSize: '10px',
              fontWeight: 700,
              color: 'var(--accent-teal)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              {r.replace('Rights', '').trim()}
            </span>
          ))}
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
          {title.name}
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '16px' }}>
          {title.genre} · {title.year}
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '28px',
              height: '28px',
              background: 'var(--bg-elevated)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px'
            }}>🎬</div>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{title.seller}</span>
          </div>
          <button 
            onClick={onView}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--accent-orange)',
              fontWeight: 600,
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            View →
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================================
   TITLE MODAL COMPONENT
   ============================================ */
function TitleModal({ title, onClose, onRequest }: { title: Title; onClose: () => void; onRequest: () => void }) {
  return (
    <div onClick={onClose} style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.9)',
      backdropFilter: 'blur(8px)',
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px'
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-medium)',
        borderRadius: '24px',
        maxWidth: '900px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'auto'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr' }}>
          {/* Left - Poster & Video */}
          <div style={{ padding: '32px', borderRight: '1px solid var(--border-subtle)' }}>
            <img 
              src={title.poster}
              alt={title.name}
              style={{
                width: '100%',
                aspectRatio: '2/3',
                objectFit: 'cover',
                borderRadius: '16px',
                marginBottom: '20px'
              }}
            />
            <div style={{
              aspectRatio: '16/9',
              background: 'var(--bg-elevated)',
              borderRadius: '12px',
              overflow: 'hidden'
            }}>
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Screener"
                style={{ width: '100%', height: '100%', border: 'none' }}
                allowFullScreen
              />
            </div>
          </div>

          {/* Right - Details */}
          <div style={{ padding: '32px' }}>
            <button onClick={onClose} style={{
              position: 'absolute',
              top: '24px',
              right: '24px',
              background: 'var(--bg-elevated)',
              border: 'none',
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              fontSize: '18px'
            }}>✕</button>

            <span className="badge badge-orange" style={{ marginBottom: '12px' }}>
              {title.rightsAvailable[0]}
            </span>
            <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
              {title.name}
            </h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
              {title.genre} · {title.year} · {title.country}
            </p>

            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '32px' }}>
              {title.synopsis}
            </p>

            {/* Details Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '20px',
              marginBottom: '32px'
            }}>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
                  Available Rights
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {title.rightsAvailable.map(r => (
                    <span key={r} className="badge badge-teal">{r}</span>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
                  Territories
                </div>
                <div style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                  {title.territories.join(', ')}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
                  Asking Price
                </div>
                <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--accent-orange)' }}>
                  ${title.price.toLocaleString()}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
                  Listed By
                </div>
                <div style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                  {title.seller}
                </div>
              </div>
            </div>

            <button className="btn-primary" onClick={onRequest} style={{ width: '100%' }}>
              Request License →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================
   REQUEST MODAL COMPONENT
   ============================================ */
function RequestModal({ title, onClose, onSubmit }: { title: Title; onClose: () => void; onSubmit: () => void }) {
  const [form, setForm] = useState({ rightsType: '', territory: '', budget: '', message: '' });

  return (
    <div onClick={onClose} style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.9)',
      backdropFilter: 'blur(8px)',
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px'
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-medium)',
        borderRadius: '24px',
        maxWidth: '480px',
        width: '100%',
        padding: '40px'
      }}>
        <div style={{ marginBottom: '32px' }}>
          <span className="badge badge-orange" style={{ marginBottom: '12px' }}>License Request</span>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)' }}>
            {title.name}
          </h2>
        </div>

        <form onSubmit={e => { e.preventDefault(); onSubmit(); }} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
              Rights Type
            </label>
            <select 
              required
              className="input select"
              value={form.rightsType}
              onChange={e => setForm({ ...form, rightsType: e.target.value })}
            >
              <option value="">Select rights type...</option>
              {title.rightsAvailable.map(r => <option key={r}>{r}</option>)}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
              Territory
            </label>
            <select 
              required
              className="input select"
              value={form.territory}
              onChange={e => setForm({ ...form, territory: e.target.value })}
            >
              <option value="">Select territory...</option>
              {title.territories.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
              Budget (USD)
            </label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontWeight: 600 }}>$</span>
              <input 
                required
                type="number"
                className="input"
                placeholder="50,000"
                value={form.budget}
                onChange={e => setForm({ ...form, budget: e.target.value })}
                style={{ paddingLeft: '36px' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
              Message
            </label>
            <textarea 
              required
              className="input"
              rows={3}
              placeholder="Introduce your company and licensing intent..."
              value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })}
              style={{ resize: 'none' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
            <button type="button" className="btn-secondary" onClick={onClose} style={{ flex: 1 }}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" style={{ flex: 1 }}>
              Send Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ============================================
   TOAST COMPONENT
   ============================================ */
function Toast({ onClose }: { onClose: () => void }) {
  return (
    <div style={{
      position: 'fixed',
      bottom: '32px',
      left: '50%',
      transform: 'translateX(-50%)',
      background: 'var(--status-accepted)',
      color: '#000',
      padding: '16px 24px',
      borderRadius: '14px',
      fontWeight: 700,
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      boxShadow: '0 8px 32px rgba(16, 185, 129, 0.3)',
      zIndex: 200
    }}>
      <span>✓</span>
      <span>Request sent successfully! The seller will contact you shortly.</span>
      <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#000', cursor: 'pointer', opacity: 0.7 }}>✕</button>
    </div>
  );
}
