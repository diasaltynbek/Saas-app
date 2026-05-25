import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { Avatar } from '../ui';
import { cx } from '../../lib/utils';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: GridIcon,    section: 'workspace' },
  { id: 'tasks',     label: 'Tasks',     icon: CheckIcon,   section: 'workspace', badge: 5 },
  { id: 'calendar',  label: 'Calendar',  icon: CalIcon,     section: 'workspace' },
  { id: 'analytics', label: 'Analytics', icon: BarIcon,     section: 'workspace' },
  { id: 'team',      label: 'Team',      icon: UsersIcon,   section: 'workspace' },
  { id: 'inbox',     label: 'Inbox',     icon: InboxIcon,   section: 'workspace', badge: 3 },
  { id: 'settings',  label: 'Settings',  icon: GearIcon,    section: 'account'   },
] as const;

export function Sidebar() {
  const { activePage, setPage, currentUser, sidebarCollapsed, toggleSidebar } = useAppStore();
  const collapsed = sidebarCollapsed;

  const workspace = NAV_ITEMS.filter(n => n.section === 'workspace');
  const account   = NAV_ITEMS.filter(n => n.section === 'account');

  return (
    <aside className={cx('sidebar', collapsed && 'collapsed')} style={{ position: 'relative' }}>
      {/* Logo */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '16px 18px', borderBottom: '1px solid var(--border)',
        flexShrink: 0, overflow: 'hidden',
      }}>
        <div style={{
          width: 28, height: 28, borderRadius: 8, flexShrink: 0,
          background: 'linear-gradient(135deg, var(--brand), var(--teal))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 13, fontWeight: 700, color: 'white',
        }}>⚡</div>
        {!collapsed && (
          <span style={{
            fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 16,
            background: 'linear-gradient(135deg, var(--text-primary), var(--brand-light))',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            whiteSpace: 'nowrap',
          }}>Apex</span>
        )}
        <button
          onClick={toggleSidebar}
          style={{
            marginLeft: 'auto', width: 20, height: 20, border: 'none', background: 'transparent',
            cursor: 'pointer', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center',
            justifyContent: 'center', borderRadius: 4, flexShrink: 0, padding: 0,
          }}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {collapsed
              ? <><polyline points="9 18 15 12 9 6"/></>
              : <><polyline points="15 18 9 12 15 6"/></>
            }
          </svg>
        </button>
      </div>

      {/* Nav */}
      <nav style={{ padding: '10px 8px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {!collapsed && (
          <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '8px 12px 4px' }}>
            Workspace
          </div>
        )}
        {workspace.map(item => (
          <NavRow
            key={item.id}
            item={item}
            active={activePage === item.id}
            collapsed={collapsed}
            onClick={() => setPage(item.id as any)}
          />
        ))}

        <div style={{ flex: 1 }} />

        {!collapsed && (
          <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '8px 12px 4px', marginTop: 8 }}>
            Account
          </div>
        )}
        {account.map(item => (
          <NavRow
            key={item.id}
            item={item}
            active={activePage === item.id}
            collapsed={collapsed}
            onClick={() => setPage(item.id as any)}
          />
        ))}
      </nav>

      {/* Footer / user */}
      <div style={{ padding: '10px 8px', borderTop: '1px solid var(--border)', flexShrink: 0 }}>
        <div
          style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: collapsed ? '8px' : '8px 10px',
            borderRadius: 8, cursor: 'pointer', transition: 'background 0.15s',
            justifyContent: collapsed ? 'center' : 'flex-start',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface-hov)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          title={currentUser.name}
        >
          <Avatar initials={currentUser.initials} color={currentUser.color} size={30} />
          {!collapsed && (
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {currentUser.name}
              </div>
              <div style={{ fontSize: 10, color: 'var(--text-tertiary)' }}>{currentUser.role}</div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

// ─── Nav row ──────────────────────────────────────────────────────────────────
interface NavRowProps {
  item:      { id: string; label: string; icon: React.FC<{ size?: number }>; badge?: number };
  active:    boolean;
  collapsed: boolean;
  onClick:   () => void;
}
function NavRow({ item, active, collapsed, onClick }: NavRowProps) {
  const Icon = item.icon;
  return (
    <div
      className={cx('nav-item', active && 'active')}
      onClick={onClick}
      title={collapsed ? item.label : undefined}
      style={{ justifyContent: collapsed ? 'center' : undefined, padding: collapsed ? '9px' : undefined }}
    >
      <Icon size={16} />
      {!collapsed && <span className="nav-label" style={{ flex: 1 }}>{item.label}</span>}
      {!collapsed && item.badge && !active && (
        <span className="nav-badge" style={{
          background: 'var(--brand)', color: 'white', fontSize: 10, fontWeight: 600,
          padding: '1px 6px', borderRadius: 10,
        }}>{item.badge}</span>
      )}
    </div>
  );
}

// ─── Icons ────────────────────────────────────────────────────────────────────
function GridIcon({ size = 16 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>;
}
function CheckIcon({ size = 16 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>;
}
function CalIcon({ size = 16 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
}
function BarIcon({ size = 16 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>;
}
function UsersIcon({ size = 16 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>;
}
function InboxIcon({ size = 16 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z"/></svg>;
}
function GearIcon({ size = 16 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>;
}
