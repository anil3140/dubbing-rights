'use client';

import { useState } from 'react';
import { TITLES, DEAL_REQUESTS, USERS, User, UserStatus } from '@/lib/dummyData';

type Section = 'dashboard' | 'users' | 'titles' | 'deals';

const STATUS_STYLES: Record<string, string> = {
  'Pending': 'badge-pending',
  'In Review': 'badge-review',
  'Accepted': 'badge-accepted',
  'Rejected': 'badge-rejected',
};

export default function AdminView() {
  const [section, setSection] = useState<Section>('dashboard');
  const [users, setUsers] = useState<User[]>(USERS);

  const approve = (id: string) => setUsers(u => u.map(x => x.id === id ? { ...x, status: 'Approved' as UserStatus } : x));
  const reject = (id: string) => setUsers(u => u.filter(x => x.id !== id));

  const pendingUsers = users.filter(u => u.status === 'Pending');
  const totalDealValue = DEAL_REQUESTS.reduce((s, d) => s + d.budget, 0);

  const navItems = [
    { key: 'dashboard' as Section, icon: '📊', label: 'Dashboard' },
    { key: 'users' as Section, icon: '👥', label: 'Users', count: users.length },
    { key: 'titles' as Section, icon: '🎬', label: 'Titles', count: TITLES.length },
    { key: 'deals' as Section, icon: '🤝', label: 'Deals', count: DEAL_REQUESTS.length },
  ];

  return (
    <div style={{ background: 'var(--bg-base)', minHeight: '100vh', display: 'flex' }}>
      
      {/* ============================================
          SIDEBAR — Desktop
          ============================================ */}
      <aside style={{
        width: '260px',
        background: 'var(--bg-surface)',
        borderRight: '1px solid var(--border-subtle)',
        position: 'fixed',
        top: '64px',
        bottom: 0,
        left: 0,
        display: 'none',
        flexDirection: 'column',
        zIndex: 30
      }} className="admin-sidebar">
        
        {/* Profile */}
        <div style={{ padding: '28px', borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              background: 'linear-gradient(135deg, var(--accent-blue), #1d4ed8)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ color: '#fff', fontWeight: 700, fontSize: '14px' }}>SA</span>
            </div>
            <div>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Super Admin</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>admin@dubbingrights.com</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {navItems.map(item => (
              <button
                key={item.key}
                onClick={() => setSection(item.key)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 16px',
                  borderRadius: '12px',
                  border: section === item.key ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid transparent',
                  background: section === item.key ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                  color: section === item.key ? 'var(--accent-blue)' : 'var(--text-secondary)',
                  fontWeight: 600,
                  fontSize: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '18px' }}>{item.icon}</span>
                  {item.label}
                </span>
                {item.count !== undefined && (
                  <span style={{
                    padding: '2px 10px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: 700,
                    background: section === item.key ? 'rgba(59, 130, 246, 0.2)' : 'var(--bg-elevated)',
                    color: section === item.key ? 'var(--accent-blue)' : 'var(--text-muted)'
                  }}>
                    {item.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </nav>

        {/* Status */}
        <div style={{ padding: '20px', borderTop: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Platform Status</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--status-accepted)' }}>
              <span style={{ width: '8px', height: '8px', background: 'var(--status-accepted)', borderRadius: '50%', animation: 'pulse-glow 2s infinite' }} />
              Online
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Pending Approvals</span>
            <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--status-pending)' }}>{pendingUsers.length}</span>
          </div>
        </div>
      </aside>

      {/* ============================================
          MOBILE NAV
          ============================================ */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'var(--bg-surface)',
        borderTop: '1px solid var(--border-subtle)',
        zIndex: 40,
        display: 'flex'
      }} className="admin-mobile-nav">
        {navItems.map(item => (
          <button
            key={item.key}
            onClick={() => setSection(item.key)}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              padding: '14px 8px',
              background: 'none',
              border: 'none',
              color: section === item.key ? 'var(--accent-blue)' : 'var(--text-muted)',
              fontSize: '11px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <span style={{ fontSize: '20px' }}>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </div>

      {/* ============================================
          MAIN CONTENT
          ============================================ */}
      <main style={{
        flex: 1,
        marginLeft: '0',
        padding: '40px 24px 100px'
      }} className="admin-main">
        <div className="container-wide">

          {/* DASHBOARD */}
          {section === 'dashboard' && (
            <>
              <div style={{ marginBottom: '48px' }}>
                <span className="badge badge-blue" style={{ marginBottom: '12px' }}>Admin Panel</span>
                <h1 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-primary)' }}>
                  Platform Dashboard
                </h1>
              </div>

              {/* Stats */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '20px',
                marginBottom: '48px'
              }}>
                {[
                  { icon: '🎬', value: TITLES.length.toString(), label: 'Titles Listed', color: 'var(--accent-orange)' },
                  { icon: '👥', value: users.length.toString(), label: 'Users', sub: `${users.filter(u => u.status === 'Approved').length} approved`, color: 'var(--accent-blue)' },
                  { icon: '📬', value: DEAL_REQUESTS.length.toString(), label: 'Deal Requests', sub: `${DEAL_REQUESTS.filter(d => d.status === 'Pending').length} pending`, color: 'var(--status-pending)' },
                  { icon: '💰', value: `$${(totalDealValue / 1000).toFixed(0)}K`, label: 'Total Value', color: 'var(--status-accepted)' },
                ].map((stat, i) => (
                  <div key={i} className="card-flat" style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                      <span style={{ fontSize: '28px' }}>{stat.icon}</span>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: stat.color, textTransform: 'uppercase', letterSpacing: '1px' }}>{stat.label}</span>
                    </div>
                    <div style={{ fontSize: '36px', fontWeight: 800, color: stat.color }}>{stat.value}</div>
                    {stat.sub && <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>{stat.sub}</div>}
                  </div>
                ))}
              </div>

              {/* Panels */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
                
                {/* Recent Deals */}
                <div className="card-flat" style={{ overflow: 'hidden' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', borderBottom: '1px solid var(--border-subtle)' }}>
                    <h3 style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Recent Deal Requests</h3>
                    <button onClick={() => setSection('deals')} style={{ background: 'none', border: 'none', color: 'var(--accent-blue)', fontWeight: 600, fontSize: '14px', cursor: 'pointer' }}>
                      View All →
                    </button>
                  </div>
                  <div>
                    {DEAL_REQUESTS.map((d, i) => (
                      <div key={d.id} style={{
                        padding: '16px 20px',
                        borderBottom: i < DEAL_REQUESTS.length - 1 ? '1px solid var(--border-subtle)' : 'none'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{d.buyer}</span>
                              <span className={`badge ${STATUS_STYLES[d.status]}`}>{d.status}</span>
                            </div>
                            <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{d.titleName} · {d.rightsRequested}</div>
                          </div>
                          <span style={{ fontWeight: 700, color: 'var(--accent-orange)' }}>${d.budget.toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pending Approvals */}
                <div className="card-flat" style={{ overflow: 'hidden' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', borderBottom: '1px solid var(--border-subtle)' }}>
                    <h3 style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Pending Approvals</h3>
                    {pendingUsers.length > 0 && (
                      <span className="badge badge-pending">{pendingUsers.length} waiting</span>
                    )}
                  </div>
                  {pendingUsers.length === 0 ? (
                    <div style={{ padding: '60px 20px', textAlign: 'center' }}>
                      <span style={{ fontSize: '36px', display: 'block', marginBottom: '12px' }}>✅</span>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>All caught up!</div>
                      <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>No pending approvals.</div>
                    </div>
                  ) : (
                    <div>
                      {pendingUsers.map((u, i) => (
                        <div key={u.id} style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '14px',
                          padding: '16px 20px',
                          borderBottom: i < pendingUsers.length - 1 ? '1px solid var(--border-subtle)' : 'none'
                        }}>
                          <div style={{
                            width: '40px',
                            height: '40px',
                            background: 'var(--bg-elevated)',
                            borderRadius: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 700,
                            fontSize: '13px',
                            color: 'var(--text-muted)'
                          }}>
                            {u.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{u.name}</div>
                            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{u.company} · {u.role}</div>
                          </div>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button onClick={() => approve(u.id)} style={{
                              padding: '8px 14px',
                              background: 'rgba(16, 185, 129, 0.15)',
                              border: '1px solid rgba(16, 185, 129, 0.3)',
                              borderRadius: '8px',
                              color: 'var(--status-accepted)',
                              fontWeight: 600,
                              fontSize: '12px',
                              cursor: 'pointer'
                            }}>Approve</button>
                            <button onClick={() => reject(u.id)} style={{
                              padding: '8px 14px',
                              background: 'rgba(239, 68, 68, 0.1)',
                              border: '1px solid rgba(239, 68, 68, 0.3)',
                              borderRadius: '8px',
                              color: 'var(--status-rejected)',
                              fontWeight: 600,
                              fontSize: '12px',
                              cursor: 'pointer'
                            }}>Reject</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Activity */}
              <div className="card-flat" style={{ marginTop: '24px', padding: '24px' }}>
                <h3 style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '20px' }}>Recent Activity</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {[
                    { icon: '🆕', text: 'New title "Iron Dynasty" listed by Dynasty Media', time: '2 hours ago', color: 'var(--accent-teal)' },
                    { icon: '📬', text: 'NetflixEMEA submitted deal request for Iron Dynasty', time: '3 hours ago', color: 'var(--accent-blue)' },
                    { icon: '✅', text: 'User "Sarah Chen" was approved', time: '5 hours ago', color: 'var(--status-accepted)' },
                    { icon: '💰', text: 'Deal accepted: The Last Frontier to Prime Video ($30K)', time: '1 day ago', color: 'var(--accent-orange)' },
                  ].map((a, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                      <span style={{ fontSize: '20px' }}>{a.icon}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{a.text}</div>
                        <div style={{ fontSize: '12px', color: a.color, marginTop: '2px' }}>{a.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* USERS */}
          {section === 'users' && (
            <>
              <div style={{ marginBottom: '48px' }}>
                <span className="badge badge-blue" style={{ marginBottom: '12px' }}>User Management</span>
                <h1 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-primary)' }}>
                  Registered Users
                </h1>
                <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>
                  {users.length} total · {pendingUsers.length} pending approval
                </p>
              </div>

              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Company</th>
                      <th>Role</th>
                      <th>Country</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{
                              width: '40px',
                              height: '40px',
                              background: 'var(--bg-elevated)',
                              borderRadius: '10px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 700,
                              fontSize: '13px',
                              color: 'var(--text-muted)'
                            }}>
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{user.name}</div>
                              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td style={{ color: 'var(--text-primary)' }}>{user.company}</td>
                        <td>
                          <span className={`badge ${user.role === 'Buyer' ? 'badge-orange' : 'badge-teal'}`}>
                            {user.role}
                          </span>
                        </td>
                        <td style={{ color: 'var(--text-muted)' }}>{user.country}</td>
                        <td>
                          <span className={`badge ${user.status === 'Approved' ? 'badge-accepted' : 'badge-pending'}`}>
                            {user.status}
                          </span>
                        </td>
                        <td>
                          {user.status === 'Pending' ? (
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button onClick={() => approve(user.id)} style={{
                                padding: '8px 14px',
                                background: 'rgba(16, 185, 129, 0.15)',
                                border: '1px solid rgba(16, 185, 129, 0.3)',
                                borderRadius: '8px',
                                color: 'var(--status-accepted)',
                                fontWeight: 600,
                                fontSize: '12px',
                                cursor: 'pointer'
                              }}>Approve</button>
                              <button onClick={() => reject(user.id)} style={{
                                padding: '8px 14px',
                                background: 'rgba(239, 68, 68, 0.1)',
                                border: '1px solid rgba(239, 68, 68, 0.3)',
                                borderRadius: '8px',
                                color: 'var(--status-rejected)',
                                fontWeight: 600,
                                fontSize: '12px',
                                cursor: 'pointer'
                              }}>Reject</button>
                            </div>
                          ) : (
                            <button style={{
                              padding: '8px 14px',
                              background: 'none',
                              border: '1px solid var(--border-medium)',
                              borderRadius: '8px',
                              color: 'var(--text-muted)',
                              fontWeight: 500,
                              fontSize: '13px',
                              cursor: 'pointer'
                            }}>View</button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* TITLES */}
          {section === 'titles' && (
            <>
              <div style={{ marginBottom: '48px' }}>
                <span className="badge badge-blue" style={{ marginBottom: '12px' }}>Content Management</span>
                <h1 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-primary)' }}>
                  All Titles
                </h1>
                <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>
                  {TITLES.length} titles in the marketplace
                </p>
              </div>

              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Seller</th>
                      <th>Rights</th>
                      <th>Price</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TITLES.map(title => (
                      <tr key={title.id}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                            <img 
                              src={title.poster} 
                              alt={title.name}
                              style={{ width: '40px', height: '56px', objectFit: 'cover', borderRadius: '8px' }}
                            />
                            <div>
                              <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{title.name}</div>
                              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{title.genre} · {title.year}</div>
                            </div>
                          </div>
                        </td>
                        <td style={{ color: 'var(--text-muted)' }}>{title.seller}</td>
                        <td>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                            {title.rightsAvailable.slice(0, 2).map(r => (
                              <span key={r} className="badge badge-teal">{r.replace('Rights', '').trim()}</span>
                            ))}
                          </div>
                        </td>
                        <td style={{ fontWeight: 700, color: 'var(--text-primary)' }}>${title.price.toLocaleString()}</td>
                        <td>
                          <span className="badge badge-accepted">Active</span>
                        </td>
                        <td>
                          <button style={{
                            padding: '8px 14px',
                            background: 'none',
                            border: '1px solid rgba(239, 68, 68, 0.3)',
                            borderRadius: '8px',
                            color: 'var(--status-rejected)',
                            fontWeight: 500,
                            fontSize: '13px',
                            cursor: 'pointer'
                          }}>Unpublish</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* DEALS */}
          {section === 'deals' && (
            <>
              <div style={{ marginBottom: '48px' }}>
                <span className="badge badge-blue" style={{ marginBottom: '12px' }}>Deal Management</span>
                <h1 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-primary)' }}>
                  All Deal Requests
                </h1>
                <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>
                  {DEAL_REQUESTS.length} requests · ${totalDealValue.toLocaleString()} total value
                </p>
              </div>

              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Buyer</th>
                      <th>Title</th>
                      <th>Rights</th>
                      <th>Territory</th>
                      <th>Budget</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {DEAL_REQUESTS.map(deal => (
                      <tr key={deal.id}>
                        <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{deal.buyer}</td>
                        <td style={{ color: 'var(--text-muted)' }}>{deal.titleName}</td>
                        <td>
                          <span className="badge badge-teal">{deal.rightsRequested}</span>
                        </td>
                        <td style={{ color: 'var(--text-muted)' }}>{deal.territory}</td>
                        <td style={{ fontWeight: 700, color: 'var(--accent-orange)' }}>${deal.budget.toLocaleString()}</td>
                        <td style={{ color: 'var(--text-muted)', fontSize: '13px' }}>{deal.createdAt}</td>
                        <td>
                          <span className={`badge ${STATUS_STYLES[deal.status]}`}>{deal.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

        </div>
      </main>

      {/* Responsive Styles */}
      <style>{`
        @media (min-width: 1024px) {
          .admin-sidebar { display: flex !important; }
          .admin-mobile-nav { display: none !important; }
          .admin-main { margin-left: 260px !important; padding-bottom: 40px !important; }
        }
      `}</style>
    </div>
  );
}
