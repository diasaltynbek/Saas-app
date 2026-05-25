import React from 'react';
import { Card, ProgressBar, SectionHeader } from '../components/ui';
import { METRIC_CARDS, SPRINT_PROGRESS, ACTIVITY_ITEMS, USERS, MONTHLY_TREND } from '../data/mockData';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from 'recharts';

// ─── Sparkline bar ────────────────────────────────────────────────────────────
function SparkBar({ heights, color }: { heights: number[]; color: string }) {
  const max = Math.max(...heights);
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 32, marginTop: 10 }}>
      {heights.map((h, i) => (
        <div
          key={i}
          style={{
            flex: 1, borderRadius: '2px 2px 0 0', minWidth: 4,
            height: `${(h / max) * 100}%`,
            background: i === heights.length - 1 ? color : `${color}55`,
            transition: 'height 0.6s ease',
          }}
        />
      ))}
    </div>
  );
}

// ─── Custom tooltip ───────────────────────────────────────────────────────────
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'var(--bg-elevated)', border: '1px solid var(--border-hov)',
      borderRadius: 8, padding: '8px 12px', fontSize: 12, fontFamily: 'var(--font-body)',
    }}>
      <div style={{ color: 'var(--text-tertiary)', marginBottom: 6, fontWeight: 600 }}>{label}</div>
      {payload.map((p: any) => (
        <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: p.color }} />
          <span style={{ color: 'var(--text-secondary)' }}>{p.name}:</span>
          <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{p.value}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Stat card ────────────────────────────────────────────────────────────────
function StatCard({ card }: { card: typeof METRIC_CARDS[number] }) {
  return (
    <div style={{
      background: 'var(--surface)', border: '1px solid var(--border)',
      borderRadius: 12, padding: '18px 20px', position: 'relative',
      overflow: 'hidden', cursor: 'default',
      transition: 'border-color 0.2s, transform 0.2s',
    }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-hov)'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; }}
    >
      {/* Glow blob */}
      <div style={{
        position: 'absolute', top: -20, right: -20,
        width: 80, height: 80, borderRadius: '50%',
        background: card.color, opacity: 0.06,
        pointerEvents: 'none',
      }} />

      <div style={{ fontSize: 22, marginBottom: 10 }}>{card.icon}</div>
      <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6 }}>
        {card.label}
      </div>
      <div style={{ fontFamily: 'var(--font-head)', fontSize: 26, fontWeight: 700, color: 'var(--text-primary)' }}>
        {card.value}
      </div>
      <div style={{ fontSize: 11, color: card.changeType === 'up' ? 'var(--green)' : 'var(--rose)', marginTop: 4, display: 'flex', alignItems: 'center', gap: 3 }}>
        {card.changeType === 'up' ? '↑' : '↓'} {Math.abs(card.change)}% vs last week
      </div>
      {card.sparkline && <SparkBar heights={card.sparkline} color={card.color} />}
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
export function DashboardPage() {
  const userMap = Object.fromEntries(USERS.map(u => [u.id, u]));

  return (
    <div className="page-enter">
      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 24 }}>
        {METRIC_CARDS.map(card => <StatCard key={card.label} card={card} />)}
      </div>

      {/* Trend chart + sprint progress */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16, marginBottom: 24 }}>
        <Card>
          <SectionHeader
            title="Productivity Trend"
            action={
              <div style={{ display: 'flex', gap: 14 }}>
                {[{ label: 'Tasks', color: '#7c6fff' }, { label: 'Velocity', color: '#00d4aa' }].map(l => (
                  <span key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'var(--text-secondary)' }}>
                    <span style={{ width: 20, height: 2, background: l.color, display: 'inline-block', borderRadius: 1 }} />
                    {l.label}
                  </span>
                ))}
              </div>
            }
          />
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={MONTHLY_TREND} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
              <defs>
                <linearGradient id="gTasks" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7c6fff" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#7c6fff" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gVelocity" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00d4aa" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#00d4aa" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: 'var(--text-tertiary)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--text-tertiary)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="tasks"    name="Tasks"    stroke="#7c6fff" strokeWidth={2} fill="url(#gTasks)"    dot={false} />
              <Area type="monotone" dataKey="velocity" name="Velocity" stroke="#00d4aa" strokeWidth={2} fill="url(#gVelocity)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <SectionHeader title="Sprint 12 Progress" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {SPRINT_PROGRESS.map(p => (
              <div key={p.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                  <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{p.label}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>{p.value}%</span>
                </div>
                <ProgressBar value={p.value} color={p.color} />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Activity + team load */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <Card>
          <SectionHeader title="Recent Activity" action={<span style={{ fontSize: 11, color: 'var(--brand-light)', cursor: 'pointer' }}>View all</span>} />
          <div>
            {ACTIVITY_ITEMS.map(item => (
              <div key={item.id} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: item.dotColor, marginTop: 6, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    <strong style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{item.userName}</strong>
                    {' '}{item.message}{item.entityName ? <> "<em style={{ fontStyle: 'normal', color: 'var(--text-primary)' }}>{item.entityName}</em>"</> : null}
                  </div>
                  <div style={{ fontSize: 10, color: 'var(--text-tertiary)', marginTop: 2 }}>{item.timestamp}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <SectionHeader title="Team Workload" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {USERS.filter(u => u.id !== 'me').map((u, i) => {
              const load = [72, 58, 85, 45, 38][i] ?? 60;
              return (
                <div key={u.id} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 26, height: 26, borderRadius: '50%', background: u.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 9, fontWeight: 700, color: 'white', flexShrink: 0,
                  }}>{u.initials}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{u.name}</span>
                      <span style={{ fontSize: 10, color: 'var(--text-tertiary)' }}>{Math.floor(load / 15)} tasks</span>
                    </div>
                    <ProgressBar value={load} color={u.color} />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
