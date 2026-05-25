import React, { useState } from 'react';
import { useAppStore } from '../store/useAppStore';

export function LoginPage() {
  const { login } = useAppStore();
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('alex@apex.io');
  const [password, setPassword] = useState('password');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); login(); }, 800);
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--bg-base)', position: 'relative', overflow: 'hidden',
    }}>
      {/* Background glows */}
      <div style={{
        position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)',
        width: 700, height: 700, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(124,111,255,0.10) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', right: '10%',
        width: 300, height: 300, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,212,170,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Login card */}
      <div style={{
        width: 400, background: 'var(--bg-elevated)',
        border: '1px solid var(--border)', borderRadius: 20,
        padding: 40, position: 'relative', animation: 'fadeUp 0.35s ease',
        boxShadow: '0 24px 80px rgba(0,0,0,0.4)',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 10,
            background: 'linear-gradient(135deg, #7c6fff, #00d4aa)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16, fontWeight: 700, color: 'white',
          }}>⚡</div>
          <span style={{ fontFamily: 'var(--font-head)', fontSize: 20, fontWeight: 700, background: 'linear-gradient(135deg, var(--text-primary), #a78bff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Apex
          </span>
          <span style={{ marginLeft: 4, padding: '2px 7px', background: 'rgba(124,111,255,0.15)', color: 'var(--brand-light)', fontSize: 10, fontWeight: 600, borderRadius: 6 }}>
            BETA
          </span>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4, background: 'var(--surface)', padding: 4, borderRadius: 10, border: '1px solid var(--border)', marginBottom: 24 }}>
          {(['login', 'register'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                flex: 1, padding: '7px', border: 'none', borderRadius: 7, cursor: 'pointer',
                fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: tab === t ? 600 : 400,
                background: tab === t ? 'var(--surface-act)' : 'transparent',
                color: tab === t ? 'var(--text-primary)' : 'var(--text-tertiary)',
                transition: 'all 0.15s',
              }}
            >{t === 'login' ? 'Sign in' : 'Create account'}</button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {tab === 'register' && (
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 6 }}>Full Name</div>
              <input placeholder="Jane Smith" style={{
                width: '100%', padding: '10px 14px', background: 'var(--surface)',
                border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text-primary)',
                fontFamily: 'var(--font-body)', fontSize: 13, outline: 'none',
              }}
                onFocus={e => (e.target.style.borderColor = 'var(--brand)')}
                onBlur={e  => (e.target.style.borderColor = 'var(--border)')}
              />
            </div>
          )}

          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 6 }}>Email address</div>
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="you@company.com"
              style={{
                width: '100%', padding: '10px 14px', background: 'var(--surface)',
                border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text-primary)',
                fontFamily: 'var(--font-body)', fontSize: 13, outline: 'none',
              }}
              onFocus={e => (e.target.style.borderColor = 'var(--brand)')}
              onBlur={e  => (e.target.style.borderColor = 'var(--border)')}
            />
          </div>

          <div style={{ marginBottom: tab === 'login' ? 6 : 20 }}>
            <div style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 6 }}>Password</div>
            <input
              type="password" value={password} onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width: '100%', padding: '10px 14px', background: 'var(--surface)',
                border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text-primary)',
                fontFamily: 'var(--font-body)', fontSize: 13, outline: 'none',
              }}
              onFocus={e => (e.target.style.borderColor = 'var(--brand)')}
              onBlur={e  => (e.target.style.borderColor = 'var(--border)')}
            />
          </div>

          {tab === 'login' && (
            <div style={{ textAlign: 'right', marginBottom: 18 }}>
              <span style={{ fontSize: 11, color: 'var(--brand-light)', cursor: 'pointer' }}>Forgot password?</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%', padding: '11px',
              background: loading ? 'var(--surface)' : 'linear-gradient(135deg, var(--brand), #9c88ff)',
              border: 'none', borderRadius: 9, color: 'white',
              fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s', marginBottom: 16,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}
          >
            {loading ? (
              <><span style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} /> Signing in…</>
            ) : (
              tab === 'login' ? 'Sign in to Apex' : 'Create your account'
            )}
          </button>
        </form>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>or continue with</span>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        </div>

        {/* OAuth buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {[
            { label: 'Google', icon: 'G' },
            { label: 'GitHub', icon: '◆' },
          ].map(p => (
            <button
              key={p.label}
              onClick={() => { setLoading(true); setTimeout(login, 600); }}
              style={{
                padding: '9px', border: '1px solid var(--border)',
                borderRadius: 8, background: 'var(--surface)',
                color: 'var(--text-secondary)', fontFamily: 'var(--font-body)',
                fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center',
                justifyContent: 'center', gap: 7, transition: 'all 0.15s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--surface-hov)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-hov)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--surface)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; }}
            >
              <span style={{ fontWeight: 700 }}>{p.icon}</span> {p.label}
            </button>
          ))}
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', marginTop: 20, fontSize: 11, color: 'var(--text-tertiary)' }}>
          {tab === 'login'
            ? <>Don't have an account? <span style={{ color: 'var(--brand-light)', cursor: 'pointer' }} onClick={() => setTab('register')}>Sign up free</span></>
            : <>Already have an account? <span style={{ color: 'var(--brand-light)', cursor: 'pointer' }} onClick={() => setTab('login')}>Sign in</span></>
          }
        </div>
      </div>
    </div>
  );
}
