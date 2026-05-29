import { useRef, useEffect } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { Avatar, IconBtn } from '../ui';
import { NotificationPanel } from '../ui/NotificationPanel';

const PAGE_LABELS: Record<string, string> = {
  dashboard: 'Dashboard',
  tasks:     'Kanban Board',
  calendar:  'Calendar',
  analytics: 'Analytics',
  team:      'Team & Chat',
  inbox:     'Inbox',
  settings:  'Settings',
};

export function Topbar() {
  const {
    activePage, searchQuery, setSearch,
    theme, toggleTheme,
    notifPanelOpen, setNotifPanel,
    notifications, currentUser,
  } = useAppStore();

  const unread = notifications.filter(n => !n.read).length;
  const ref = useRef<HTMLDivElement>(null);

  // Close notif panel on outside click
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setNotifPanel(false);
      }
    }
    if (notifPanelOpen) document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [notifPanelOpen, setNotifPanel]);

  return (
    <div className="topbar">
      {/* Page title */}
      <h2 style={{
        fontFamily: 'var(--font-head)', fontSize: 15, fontWeight: 600,
        color: 'var(--text-primary)', flex: 1,
      }}>
        {PAGE_LABELS[activePage] ?? 'Apex'}
      </h2>

      {/* Search */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 8, padding: '6px 12px', width: 220,
        transition: 'border-color 0.2s',
      }}
        onFocus={e => (e.currentTarget.style.borderColor = 'var(--brand)')}
        onBlur={e  => (e.currentTarget.style.borderColor = 'var(--border)')}
      >
        <SearchIcon />
        <input
          value={searchQuery}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search tasks, projects…"
          style={{
            background: 'transparent', border: 'none', outline: 'none',
            color: 'var(--text-primary)', fontFamily: 'var(--font-body)',
            fontSize: 12, width: '100%',
          }}
        />
        {searchQuery && (
          <button
            onClick={() => setSearch('')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-tertiary)', padding: 0, lineHeight: 1 }}
          >×</button>
        )}
      </div>

      {/* Notification bell */}
      <div ref={ref} style={{ position: 'relative' }}>
        <IconBtn
          onClick={() => setNotifPanel(!notifPanelOpen)}
          title="Notifications"
          badgeCount={unread}
        >
          <BellIcon />
        </IconBtn>
        {notifPanelOpen && <NotificationPanel />}
      </div>

      {/* Theme toggle */}
      <IconBtn onClick={toggleTheme} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
        {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
      </IconBtn>

      {/* User avatar */}
      <Avatar initials={currentUser.initials} color={currentUser.color} size={30} />
    </div>
  );
}

// ─── Icons ────────────────────────────────────────────────────────────────────
function SearchIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="2" strokeLinecap="round">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  );
}
function BellIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/>
    </svg>
  );
}
function SunIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  );
}
function MoonIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
    </svg>
  );
}
