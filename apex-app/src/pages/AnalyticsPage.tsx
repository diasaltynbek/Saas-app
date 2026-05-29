import { Card, ProgressBar, SectionHeader } from '../components/ui';
import { WEEKLY_CHART_DATA, CATEGORY_BREAKDOWN, USERS } from '../data/mockData';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, 
} from 'recharts';

// ─── Custom tooltip ───────────────────────────────────────────────────────────
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'var(--bg-elevated)', border: '1px solid var(--border-hov)',
      borderRadius: 8, padding: '8px 12px', fontSize: 12,
    }}>
      <div style={{ color: 'var(--text-tertiary)', marginBottom: 5, fontWeight: 600 }}>{label}</div>
      {payload.map((p: any) => (
        <div key={p.name} style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 2 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: p.color }} />
          <span style={{ color: 'var(--text-secondary)' }}>{p.name}:</span>
          <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{p.value}</span>
        </div>
      ))}
    </div>
  );
}

// ─── KPI stat ─────────────────────────────────────────────────────────────────
function KpiCard({ label, value, change, color }: { label: string; value: string; change: string; color: string }) {
  const up = change.startsWith('+');
  return (
    <div style={{
      background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12,
      padding: '16px 20px', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', top: -16, right: -16, width: 60, height: 60, borderRadius: '50%', background: color, opacity: 0.08 }} />
      <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8 }}>{label}</div>
      <div style={{ fontFamily: 'var(--font-head)', fontSize: 24, fontWeight: 700, color: 'var(--text-primary)' }}>{value}</div>
      <div style={{ fontSize: 11, color: up ? 'var(--green)' : 'var(--rose)', marginTop: 3, display: 'flex', alignItems: 'center', gap: 3 }}>
        {up ? '↑' : '↓'} {change} vs last sprint
      </div>
    </div>
  );
}

// ─── Donut segment ────────────────────────────────────────────────────────────
function DonutChart({ value, color, size = 72 }: { value: number; color: string; size?: number }) {
  const r = 28, circ = 2 * Math.PI * r;
  const offset = circ * (1 - value / 100);
  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width={size} height={size} viewBox="0 0 64 64" style={{ position: 'absolute' }}>
        <circle cx="32" cy="32" r={r} fill="none" stroke="var(--border)" strokeWidth={6} />
        <circle
          cx="32" cy="32" r={r} fill="none" stroke={color} strokeWidth={6}
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%', transition: 'stroke-dashoffset 1s ease' }}
        />
      </svg>
      <span style={{ fontFamily: 'var(--font-head)', fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', zIndex: 1 }}>
        {value}%
      </span>
    </div>
  );
}

// ─── Analytics page ───────────────────────────────────────────────────────────
export function AnalyticsPage() {
  const teamMembers = USERS.filter(u => u.id !== 'me');
  // Deterministic "random" performance scores
  const scores = [82, 67, 91, 58, 74];

  return (
    <div className="page-enter">
      {/* KPI row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Sprint Velocity',   value: '84 pts',  change: '+12%', color: '#7c6fff' },
          { label: 'Completion Rate',   value: '91%',     change: '+5%',  color: '#00d4aa' },
          { label: 'Avg Cycle Time',    value: '2.3 days',change: '-0.5d',color: '#60a5fa' },
          { label: 'Bug Escape Rate',   value: '0.8%',    change: '-0.2%',color: '#4ade80' },
        ].map(k => <KpiCard key={k.label} {...k} />)}
      </div>

      {/* Tasks over time + category breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 16, marginBottom: 24 }}>
        <Card>
          <SectionHeader
            title="Tasks Over Time"
            action={
              <div style={{ display: 'flex', gap: 12 }}>
                {[{ l: 'Created', c: '#7c6fff' }, { l: 'Completed', c: '#00d4aa' }, { l: 'Hours', c: '#ffb347' }].map(x => (
                  <span key={x.l} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--text-secondary)' }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: x.c, display: 'inline-block' }} />
                    {x.l}
                  </span>
                ))}
              </div>
            }
          />
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={WEEKLY_CHART_DATA} barGap={3} margin={{ left: -15, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="label" tick={{ fill: 'var(--text-tertiary)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--text-tertiary)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="created"   name="Created"   fill="rgba(124,111,255,0.5)" radius={[3,3,0,0]} />
              <Bar dataKey="completed" name="Completed" fill="#00d4aa"               radius={[3,3,0,0]} />
              <Bar dataKey="hours"     name="Hours"     fill="rgba(255,179,71,0.4)"  radius={[3,3,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <SectionHeader title="By Category" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {CATEGORY_BREAKDOWN.map(c => (
              <div key={c.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                  <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{c.label}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>{c.value}%</span>
                </div>
                <ProgressBar value={c.value} color={c.color} />
              </div>
            ))}
          </div>
          {/* Legend */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16 }}>
            {CATEGORY_BREAKDOWN.map(c => (
              <div key={c.label} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: c.color }} />
                <span style={{ fontSize: 10, color: 'var(--text-tertiary)' }}>{c.label}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Team performance */}
      <Card>
        <SectionHeader title="Team Performance" action={<span style={{ fontSize: 11, color: 'var(--brand-light)' }}>Sprint 12</span>} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 14 }}>
          {teamMembers.map((m, i) => (
            <div key={m.id} style={{
              textAlign: 'center', padding: '18px 12px',
              background: 'var(--surface-hov)', borderRadius: 10,
              border: '1px solid var(--border)', transition: 'border-color 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = m.color)}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
            >
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
                <DonutChart value={scores[i]} color={m.color} size={68} />
              </div>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>
                {m.name.split(' ')[0]}
              </div>
              <div style={{ fontSize: 10, color: 'var(--text-tertiary)', marginBottom: 8 }}>{m.role}</div>
              <div style={{
                display: 'inline-flex', fontSize: 10, fontWeight: 600,
                padding: '2px 8px', borderRadius: 6,
                background: `${m.color}18`, color: m.color,
              }}>
                {[8, 6, 10, 5, 7][i]} tasks
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
