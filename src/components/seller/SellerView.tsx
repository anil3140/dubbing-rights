'use client';

import { useState } from 'react';
import { TITLES, DEAL_REQUESTS, DealRequest } from '@/lib/dummyData';

const MY_TITLES = TITLES.filter(t => t.sellerId === 'seller-1');

const STATUS_STYLES: Record<string, string> = {
  'Pending': 'badge-pending',
  'In Review': 'badge-review',
  'Accepted': 'badge-accepted',
  'Rejected': 'badge-rejected',
};

export default function SellerView() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const myDeals = DEAL_REQUESTS.filter(d => MY_TITLES.some(t => t.name === d.titleName));
  const totalValue = myDeals.reduce((sum, d) => sum + d.budget, 0);
  const pendingCount = myDeals.filter(d => d.status === 'Pending').length;

  return (
    <div style={{ background: '#fafafa', minHeight: '100vh' }}>
      
      {/* ============================================
          HEADER
          ============================================ */}
      <section style={{ padding: '60px 0 80px' }}>
        <div className="container-wide">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '24px' }}>
            <div>
              <span className="badge badge-teal" style={{ marginBottom: '12px' }}>Seller Dashboard</span>
              <h1 style={{ fontSize: '36px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
                Welcome back, Horizon Films
              </h1>
              <p style={{ color: 'var(--text-secondary)' }}>
                Manage your listings and track incoming license requests.
              </p>
            </div>
            <button className="btn-primary" onClick={() => setShowAddModal(true)}>
              <span>+</span> Add New Title
            </button>
          </div>
        </div>
      </section>

      {/* ============================================
          STATS
          ============================================ */}
      <section style={{ marginTop: '-40px', marginBottom: '80px' }}>
        <div className="container-wide">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '20px'
          }}>
            {[
              { icon: '🎬', value: MY_TITLES.length.toString(), label: 'Active Listings', color: 'var(--accent-teal)' },
              { icon: '📬', value: myDeals.length.toString(), label: 'Deal Requests', sub: `${pendingCount} pending`, color: 'var(--accent-orange)' },
              { icon: '💰', value: `$${(totalValue / 1000).toFixed(0)}K`, label: 'Potential Value', color: 'var(--status-accepted)' },
            ].map((stat, i) => (
              <div key={i} className="card-flat" style={{
                padding: '28px',
                display: 'flex',
                alignItems: 'center',
                gap: '20px'
              }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  background: `${stat.color}15`,
                  borderRadius: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px'
                }}>
                  {stat.icon}
                </div>
                <div>
                  <div style={{ fontSize: '28px', fontWeight: 800, color: stat.color }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                    {stat.label}
                    {stat.sub && <span style={{ marginLeft: '8px', color: 'var(--text-muted)' }}>· {stat.sub}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          MY LISTINGS
          ============================================ */}
      <section style={{ marginBottom: '80px' }}>
        <div className="container-wide">
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '24px' }}>
            My Listings
          </h2>

          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Rights Available</th>
                  <th>Territories</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {MY_TITLES.map(title => (
                  <tr key={title.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <img 
                          src={title.poster} 
                          alt={title.name}
                          style={{ width: '48px', height: '64px', objectFit: 'cover', borderRadius: '8px' }}
                        />
                        <div>
                          <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{title.name}</div>
                          <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{title.genre} · {title.year}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {title.rightsAvailable.slice(0, 2).map(r => (
                          <span key={r} className="badge badge-teal">{r}</span>
                        ))}
                        {title.rightsAvailable.length > 2 && (
                          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>+{title.rightsAvailable.length - 2}</span>
                        )}
                      </div>
                    </td>
                    <td style={{ color: 'var(--text-secondary)' }}>{title.territories.slice(0, 2).join(', ')}</td>
                    <td style={{ fontWeight: 700, color: 'var(--accent-orange)' }}>${title.price.toLocaleString()}</td>
                    <td>
                      <span className="badge badge-accepted">Active</span>
                    </td>
                    <td>
                      <button style={{
                        background: 'none',
                        border: '1px solid var(--border-medium)',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        color: 'var(--text-secondary)',
                        cursor: 'pointer',
                        fontSize: '13px',
                        fontWeight: 500
                      }}>
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ============================================
          DEAL REQUESTS
          ============================================ */}
      <section style={{ marginBottom: '80px' }}>
        <div className="container-wide">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)' }}>
              Incoming Requests
            </h2>
            <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
              {myDeals.length} total requests
            </span>
          </div>

          {myDeals.length === 0 ? (
            <div className="card-flat" style={{ padding: '80px', textAlign: 'center' }}>
              <span style={{ fontSize: '48px', display: 'block', marginBottom: '16px' }}>📭</span>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                No requests yet
              </h3>
              <p style={{ color: 'var(--text-muted)' }}>
                Incoming license requests will appear here.
              </p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '20px'
            }}>
              {myDeals.map(deal => (
                <DealCard key={deal.id} deal={deal} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ============================================
          ADD TITLE MODAL
          ============================================ */}
      {showAddModal && (
        <AddTitleModal 
          onClose={() => setShowAddModal(false)}
          onSubmit={() => {
            setShowAddModal(false);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 4000);
          }}
        />
      )}

      {showToast && (
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
          <span>Title added successfully!</span>
          <button onClick={() => setShowToast(false)} style={{ background: 'none', border: 'none', color: '#000', cursor: 'pointer', opacity: 0.7 }}>✕</button>
        </div>
      )}
    </div>
  );
}

/* ============================================
   DEAL CARD COMPONENT
   ============================================ */
function DealCard({ deal }: { deal: DealRequest }) {
  return (
    <div className="card-flat" style={{ overflow: 'hidden' }}>
      <div style={{
        height: '4px',
        background: deal.status === 'Pending' ? 'var(--status-pending)' :
                    deal.status === 'In Review' ? 'var(--status-review)' :
                    deal.status === 'Accepted' ? 'var(--status-accepted)' : 'var(--status-rejected)'
      }} />
      <div style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div>
            <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '17px' }}>{deal.buyer}</div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{deal.createdAt}</div>
          </div>
          <span className={`badge ${STATUS_STYLES[deal.status]}`}>{deal.status}</span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
          marginBottom: '20px'
        }}>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Title</div>
            <div style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{deal.titleName}</div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Rights</div>
            <span className="badge badge-teal">{deal.rightsRequested}</span>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Territory</div>
            <div style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{deal.territory}</div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Budget</div>
            <div style={{ fontWeight: 700, color: 'var(--accent-orange)', fontSize: '18px' }}>${deal.budget.toLocaleString()}</div>
          </div>
        </div>

        {deal.message && (
          <div style={{
            padding: '14px',
            background: 'var(--bg-elevated)',
            borderRadius: '10px',
            borderLeft: '3px solid var(--accent-teal)',
            marginBottom: '20px'
          }}>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', fontStyle: 'italic', lineHeight: 1.6 }}>
              "{deal.message}"
            </p>
          </div>
        )}

        {deal.status === 'Pending' && (
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn-primary" style={{ flex: 1, padding: '12px' }}>Accept</button>
            <button className="btn-secondary" style={{ flex: 1, padding: '12px' }}>Decline</button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================================
   ADD TITLE MODAL COMPONENT
   ============================================ */
function AddTitleModal({ onClose, onSubmit }: { onClose: () => void; onSubmit: () => void }) {
  const [form, setForm] = useState({
    title: '',
    year: '',
    genre: '',
    synopsis: '',
    rights: [] as string[],
    price: ''
  });

  const RIGHTS_OPTIONS = ['Dubbing', 'SVOD', 'Theatrical', 'Digital', 'VOD', 'AVOD'];

  const toggleRight = (r: string) => {
    setForm(prev => ({
      ...prev,
      rights: prev.rights.includes(r) 
        ? prev.rights.filter(x => x !== r)
        : [...prev.rights, r]
    }));
  };

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
        maxWidth: '540px',
        width: '100%',
        padding: '40px',
        maxHeight: '90vh',
        overflow: 'auto'
      }}>
        <div style={{ marginBottom: '32px' }}>
          <span className="badge badge-teal" style={{ marginBottom: '12px' }}>New Listing</span>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)' }}>
            Add New Title
          </h2>
        </div>

        <form onSubmit={e => { e.preventDefault(); onSubmit(); }} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
              Title
            </label>
            <input 
              required
              type="text"
              className="input"
              placeholder="Film title"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                Year
              </label>
              <input 
                required
                type="number"
                className="input"
                placeholder="2024"
                value={form.year}
                onChange={e => setForm({ ...form, year: e.target.value })}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                Genre
              </label>
              <input 
                required
                type="text"
                className="input"
                placeholder="Action / Drama"
                value={form.genre}
                onChange={e => setForm({ ...form, genre: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
              Synopsis
            </label>
            <textarea 
              required
              className="input"
              rows={3}
              placeholder="Brief description of the film..."
              value={form.synopsis}
              onChange={e => setForm({ ...form, synopsis: e.target.value })}
              style={{ resize: 'none' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
              Rights Available
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {RIGHTS_OPTIONS.map(r => (
                <button
                  key={r}
                  type="button"
                  onClick={() => toggleRight(r)}
                  style={{
                    padding: '10px 16px',
                    borderRadius: '10px',
                    border: form.rights.includes(r) 
                      ? '2px solid var(--accent-teal)' 
                      : '1px solid var(--border-medium)',
                    background: form.rights.includes(r) 
                      ? 'rgba(20, 184, 166, 0.15)' 
                      : 'var(--bg-elevated)',
                    color: form.rights.includes(r) 
                      ? 'var(--accent-teal)' 
                      : 'var(--text-secondary)',
                    fontWeight: 600,
                    fontSize: '13px',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
              Asking Price (USD)
            </label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontWeight: 600 }}>$</span>
              <input 
                required
                type="number"
                className="input"
                placeholder="50,000"
                value={form.price}
                onChange={e => setForm({ ...form, price: e.target.value })}
                style={{ paddingLeft: '36px' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
            <button type="button" className="btn-secondary" onClick={onClose} style={{ flex: 1 }}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" style={{ flex: 1 }}>
              Add Title
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
