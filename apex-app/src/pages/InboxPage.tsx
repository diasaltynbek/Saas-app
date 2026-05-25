import React, { useState } from 'react';
import { Card, SectionHeader, Avatar } from '../components/ui';
import { USERS } from '../data/mockData';

const INBOX_ITEMS = [
  { id: '1', from: USERS[0], subject: 'Design system tokens updated', preview: "'I've finished updating all the color tokens for dark mode. Please review the PR when you get a chance.'", time: '10:32', read: false, type: 'mention' },
  { id: '2', from: USERS[1], subject: 'PR ready for review: Auth flow', preview: "'The OAuth2 implementation is done. All tests pass and I've added documentation for the new endpoints.'", time: '09:15', read: false, type: 'pr' },
  { id: '3', from: USERS[3], subject: 'Sprint 12 planning notes', preview: "'Here are the notes from today's sprint planning. We've committed to 42 points this sprint with a focus on the auth and analytics features.'", time: 'Yesterday', read: true, type: 'meeting' },
  { id: '4', from: USERS[2], subject: 'API docs updated', preview: "'I've pushed the updated API documentation to Notion. All the new rate limiting endpoints are documented with examples.'", time: 'Yesterday', read: true, type: 'update' },
  { id: '5', from: USERS[4], subject: 'Infrastructure update', preview: "'I've set up the Prometheus metrics and Grafana dashboards as requested. Staging and prod are both monitored now.'", time: 'Mon', read: true, type: 'update' },
];

const TYPE_CONFIG: Record<string, { icon: string; color: string; bg: string }> = {
  mention: { icon: '@',  color: '#7c6fff', bg: 'rgba(124,111,255,0.15)' },
  pr:      { icon: '⎇',  color: '#00d4aa', bg: 'rgba(0,212,170,0.12)'   },
  meeting: { icon: '📅', color: '#ffb347', bg: 'rgba(255,179,71,0.12)'  },
  update:  { icon: '📝', color: '#60a5fa', bg: 'rgba(96,165,250,0.12)'  },
};

export function InboxPage() {
  const [selected, setSelected] = useState(INBOX_ITEMS[0]);
  const [items, setItems] = useState(INBOX_ITEMS);

  function markRead(id: string) {
    setItems(prev => prev.map(i => i.id === id ? { ...i, read: true } : i));
  }

  function selectItem(item: typeof INBOX_ITEMS[0]) {
    setSelected(item);
    markRead(item.id);
  }

  const unread = items.filter(i => !i.read).length;

  return (
    <div className="page-enter" style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 16, height: 'calc(100vh - 104px)' }}>
      {/* Inbox list */}
      <Card padding={0} style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <h3 style={{ fontFamily: 'var(--font-head)', fontSize: 14, fontWeight: 600 }}>Inbox</h3>
            {unread > 0 && (
              <span style={{ background: 'var(--brand)', color: 'white', fontSize: 10, fontWeight: 700, padding: '1px 6px', borderRadius: 10 }}>{unread}</span>
            )}
          </div>
          <button style={{ fontSize: 11, color: 'var(--brand-light)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>Mark all read</button>
        </div>
        <div style={{ overflowY: 'auto', flex: 1 }}>
          {items.map(item => {
            const typeInfo = TYPE_CONFIG[item.type];
            const isSelected = selected?.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => selectItem(item)}
                style={{
                  padding: '14px 16px', cursor: 'pointer',
                  borderBottom: '1px solid var(--border)',
                  background: isSelected ? 'rgba(124,111,255,0.08)' : item.read ? 'transparent' : 'rgba(124,111,255,0.04)',
                  transition: 'background 0.15s', position: 'relative',
                }}
                onMouseEnter={e => !isSelected && ((e.currentTarget as HTMLElement).style.background = 'var(--surface-hov)')}
                onMouseLeave={e => !isSelected && ((e.currentTarget as HTMLElement).style.background = item.read ? 'transparent' : 'rgba(124,111,255,0.04)')}
              >
                {!item.read && (
                  <div style={{ position: 'absolute', left: 6, top: '50%', transform: 'translateY(-50%)', width: 5, height: 5, borderRadius: '50%', background: 'var(--brand)' }} />
                )}
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <Avatar initials={item.from.initials} color={item.from.color} size={32} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                      <span style={{ fontSize: 12, fontWeight: item.read ? 400 : 600, color: 'var(--text-primary)' }}>{item.from.name}</span>
                      <span style={{ fontSize: 10, color: 'var(--text-tertiary)', flexShrink: 0 }}>{item.time}</span>
                    </div>
                    <div style={{ fontSize: 12, fontWeight: item.read ? 400 : 500, color: 'var(--text-secondary)', marginBottom: 3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {item.subject}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--text-tertiary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {item.preview}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Message view */}
      {selected ? (
        <Card style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: 16, marginBottom: 16 }}>
            <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 16, fontWeight: 700, marginBottom: 10 }}>{selected.subject}</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Avatar initials={selected.from.initials} color={selected.from.color} size={34} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>{selected.from.name}</div>
                <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{selected.from.role} · {selected.time}</div>
              </div>
              <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
                {['Reply', 'Forward'].map(a => (
                  <button key={a} style={{ padding: '6px 14px', borderRadius: 7, border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text-secondary)', fontFamily: 'var(--font-body)', fontSize: 11, cursor: 'pointer' }}>{a}</button>
                ))}
              </div>
            </div>
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.8, flex: 1 }}>
            <p style={{ marginBottom: 12 }}>{selected.preview}</p>
            <p style={{ marginBottom: 12, color: 'var(--text-tertiary)' }}>
              Let me know if you have any questions or need clarification on any of the changes. I'm happy to walk through it together if that would help.
            </p>
            <p style={{ color: 'var(--text-tertiary)' }}>
              Best,<br />
              <strong style={{ color: 'var(--text-secondary)' }}>{selected.from.name}</strong>
            </p>
          </div>
          {/* Quick reply */}
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16, marginTop: 16 }}>
            <textarea
              placeholder="Write a reply…"
              rows={3}
              style={{
                width: '100%', padding: '10px 14px', background: 'var(--surface)',
                border: '1px solid var(--border)', borderRadius: 8,
                color: 'var(--text-primary)', fontFamily: 'var(--font-body)',
                fontSize: 12, outline: 'none', resize: 'none', marginBottom: 10,
              }}
              onFocus={e => (e.target.style.borderColor = 'var(--brand)')}
              onBlur={e  => (e.target.style.borderColor = 'var(--border)')}
            />
            <button style={{
              padding: '8px 18px', background: 'linear-gradient(135deg, var(--brand), #9c88ff)',
              border: 'none', borderRadius: 8, color: 'white',
              fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600, cursor: 'pointer',
            }}>Send Reply</button>
          </div>
        </Card>
      ) : (
        <Card style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center', color: 'var(--text-tertiary)' }}>
            <div style={{ fontSize: 40, marginBottom: 10 }}>📭</div>
            <div style={{ fontSize: 14 }}>Select a message to read</div>
          </div>
        </Card>
      )}
    </div>
  );
}
