import React, { useState, useRef, useEffect } from 'react';
import { Card, SectionHeader, Avatar } from '../components/ui';
import { useAppStore } from '../store/useAppStore';
import { USERS } from '../data/mockData';
import { STATUS_DOT } from '../lib/utils';

// ─── Team member card ─────────────────────────────────────────────────────────
function MemberCard({ user }: { user: typeof USERS[0] }) {
  const tasks = [8, 6, 5, 4, 7][USERS.indexOf(user)] ?? 5;
  return (
    <div
      className="surface-card"
      style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 14, cursor: 'pointer' }}
    >
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <Avatar initials={user.initials} color={user.color} size={40} />
        <div style={{
          position: 'absolute', bottom: 0, right: 0,
          width: 10, height: 10, borderRadius: '50%',
          background: STATUS_DOT[user.status],
          border: '2px solid var(--bg-elevated)',
        }} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)', marginBottom: 2 }}>{user.name}</div>
        <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{user.role}</div>
      </div>
      <div style={{ textAlign: 'right', flexShrink: 0 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-primary)' }}>{tasks} tasks</div>
        <div style={{ fontSize: 10, color: STATUS_DOT[user.status], marginTop: 2, display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'flex-end' }}>
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: STATUS_DOT[user.status] }} />
          {user.status}
        </div>
      </div>
    </div>
  );
}

// ─── Chat bubble ──────────────────────────────────────────────────────────────
function ChatBubble({ msg }: { msg: ReturnType<typeof useAppStore>['chatMessages'][0] }) {
  return (
    <div style={{ display: 'flex', gap: 8, flexDirection: msg.isMe ? 'row-reverse' : 'row', alignItems: 'flex-end' }}>
      {!msg.isMe && (
        <Avatar initials={msg.userInitials} color={msg.userColor} size={26} />
      )}
      <div style={{ maxWidth: '72%' }}>
        {!msg.isMe && (
          <div style={{ fontSize: 10, color: 'var(--text-tertiary)', marginBottom: 3, marginLeft: 2 }}>{msg.userName}</div>
        )}
        <div style={{
          background: msg.isMe
            ? 'linear-gradient(135deg, var(--brand), #9c88ff)'
            : 'var(--surface-hov)',
          border: msg.isMe ? 'none' : '1px solid var(--border)',
          borderRadius: msg.isMe ? '12px 2px 12px 12px' : '2px 12px 12px 12px',
          padding: '8px 12px',
          fontSize: 12,
          color: msg.isMe ? 'white' : 'var(--text-primary)',
          lineHeight: 1.55,
          wordBreak: 'break-word',
        }}>
          {msg.content}
        </div>
        <div style={{ fontSize: 9, color: 'var(--text-tertiary)', marginTop: 3, textAlign: msg.isMe ? 'right' : 'left' }}>
          {msg.timestamp}
        </div>
      </div>
    </div>
  );
}

// ─── Team page ────────────────────────────────────────────────────────────────
export function TeamPage() {
  const { chatMessages, sendMessage } = useAppStore();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  function handleSend() {
    const trimmed = input.trim();
    if (!trimmed) return;
    setInput('');
    sendMessage(trimmed);
    // Show typing indicator briefly
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 1600);
  }

  const onlineCount = USERS.filter(u => u.status === 'online').length;

  return (
    <div className="page-enter">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 16 }}>
        {/* Members list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Card padding={0} style={{ overflow: 'hidden' }}>
            <div style={{ padding: '16px 18px 12px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontFamily: 'var(--font-head)', fontSize: 14, fontWeight: 600 }}>Team Members</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)' }} />
                <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{onlineCount} online</span>
              </div>
            </div>
            <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
              {USERS.filter(u => u.id !== 'me').map(u => <MemberCard key={u.id} user={u} />)}
            </div>
          </Card>

          {/* Quick stats */}
          <Card>
            <SectionHeader title="Team Stats" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[
                { label: 'Total tasks', value: '36',  color: '#7c6fff' },
                { label: 'Completed',   value: '24',  color: '#4ade80' },
                { label: 'In progress', value: '9',   color: '#ffb347' },
                { label: 'Overdue',     value: '3',   color: '#ff6b8a' },
              ].map(s => (
                <div key={s.label} style={{ padding: 12, background: 'var(--surface-hov)', borderRadius: 8, border: '1px solid var(--border)' }}>
                  <div style={{ fontFamily: 'var(--font-head)', fontSize: 20, fontWeight: 700, color: s.color }}>{s.value}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-tertiary)', marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Chat panel */}
        <Card padding={0} style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 120px)', maxHeight: 680 }}>
          {/* Chat header */}
          <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--teal)' }} />
            <div>
              <div style={{ fontFamily: 'var(--font-head)', fontSize: 13, fontWeight: 600 }}># general</div>
              <div style={{ fontSize: 10, color: 'var(--text-tertiary)' }}>{onlineCount} members online</div>
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
              {/* Stacked avatars for online users */}
              <div style={{ display: 'flex' }}>
                {USERS.filter(u => u.status === 'online').map(u => (
                  <Avatar key={u.id} initials={u.initials} color={u.color} size={22} border />
                ))}
              </div>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
            {chatMessages.map(msg => <ChatBubble key={msg.id} msg={msg} />)}
            {isTyping && (
              <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
                <Avatar initials="SC" color="#00d4aa" size={26} />
                <div style={{
                  background: 'var(--surface-hov)', border: '1px solid var(--border)',
                  borderRadius: '2px 12px 12px 12px', padding: '10px 14px',
                  display: 'flex', gap: 4,
                }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{
                      width: 5, height: 5, borderRadius: '50%', background: 'var(--text-tertiary)',
                      animation: `pulse ${0.8 + i * 0.15}s ease-in-out infinite`,
                    }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div style={{ padding: 12, borderTop: '1px solid var(--border)', flexShrink: 0 }}>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
                placeholder="Message #general…"
                style={{
                  flex: 1, padding: '9px 14px', background: 'var(--surface)',
                  border: '1px solid var(--border)', borderRadius: 8,
                  color: 'var(--text-primary)', fontFamily: 'var(--font-body)',
                  fontSize: 12, outline: 'none', transition: 'border-color 0.2s',
                }}
                onFocus={e => (e.target.style.borderColor = 'var(--brand)')}
                onBlur={e  => (e.target.style.borderColor = 'var(--border)')}
              />
              <button
                onClick={handleSend}
                style={{
                  width: 36, height: 36, borderRadius: 9, border: 'none',
                  background: input.trim() ? 'linear-gradient(135deg, var(--brand), #9c88ff)' : 'var(--surface)',
                  color: input.trim() ? 'white' : 'var(--text-tertiary)',
                  cursor: input.trim() ? 'pointer' : 'default',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 16, transition: 'all 0.15s',
                }}
              >↑</button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
