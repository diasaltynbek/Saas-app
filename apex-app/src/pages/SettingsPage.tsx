import { useState } from 'react';
import { Card, Toggle, Avatar, SectionHeader } from '../components/ui';
import { useAppStore } from '../store/useAppStore';

interface ToggleSetting { key: string; label: string; description: string; }

const NOTIFICATION_SETTINGS: ToggleSetting[] = [
  { key: 'pushNotifs',  label: 'Push Notifications',   description: 'Receive alerts for mentions, comments, and task updates' },
  { key: 'emailDigest', label: 'Weekly Email Digest',   description: 'Get a weekly summary of team activity and sprint progress' },
  { key: 'taskReminders',label: 'Task Reminders',       description: 'Remind me about upcoming deadlines 24 hours in advance' },
  { key: 'slackSync',   label: 'Slack Integration',     description: 'Sync task status updates with your Slack workspace' },
];

const SECURITY_SETTINGS: ToggleSetting[] = [
  { key: 'twoFactor',   label: 'Two-Factor Authentication', description: 'Add an extra layer of security with an authenticator app' },
  { key: 'sessionAlerts',label: 'Login Alerts',            description: 'Get notified of new sign-ins to your account' },
];

const PRIVACY_SETTINGS: ToggleSetting[] = [
  { key: 'analytics',  label: 'Usage Analytics',   description: 'Help improve Apex with anonymous usage data' },
  { key: 'autosave',   label: 'Auto-save Drafts',  description: 'Automatically save task descriptions and comments as you type' },
  { key: 'publicProfile', label: 'Public Profile', description: 'Allow other workspace members to see your profile and activity' },
];

export function SettingsPage() {
  const { currentUser, theme, toggleTheme } = useAppStore();
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    pushNotifs: true, emailDigest: false, taskReminders: true, slackSync: false,
    twoFactor: true, sessionAlerts: true,
    analytics: true, autosave: true, publicProfile: false,
  });
  const [activeTab, setActiveTab] = useState<'general' | 'notifications' | 'security' | 'privacy'>('general');

  const toggle = (key: string) => setToggles(p => ({ ...p, [key]: !p[key] }));

  const TABS = [
    { id: 'general' as const,       label: 'General' },
    { id: 'notifications' as const, label: 'Notifications' },
    { id: 'security' as const,      label: 'Security' },
    { id: 'privacy' as const,       label: 'Privacy' },
  ];

  return (
    <div className="page-enter" style={{ maxWidth: 640 }}>
      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 24, background: 'var(--surface)', padding: 4, borderRadius: 10, border: '1px solid var(--border)', width: 'fit-content' }}>
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '6px 16px', borderRadius: 7, border: 'none',
              background: activeTab === tab.id ? 'var(--surface-act)' : 'transparent',
              color: activeTab === tab.id ? 'var(--text-primary)' : 'var(--text-tertiary)',
              fontSize: 12, fontWeight: activeTab === tab.id ? 600 : 400,
              cursor: 'pointer', fontFamily: 'var(--font-body)', transition: 'all 0.15s',
            }}
          >{tab.label}</button>
        ))}
      </div>

      {/* General */}
      {activeTab === 'general' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Card>
            <SectionHeader title="Profile" />
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 20 }}>
              <div style={{ position: 'relative' }}>
                <Avatar initials={currentUser.initials} color={currentUser.color} size={60} />
                <button style={{
                  position: 'absolute', bottom: 0, right: 0, width: 20, height: 20,
                  borderRadius: '50%', border: '2px solid var(--bg-elevated)',
                  background: 'var(--brand)', color: 'white', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10,
                }}>✏️</button>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-head)', fontSize: 16, fontWeight: 600, marginBottom: 3 }}>{currentUser.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 6 }}>{currentUser.email}</div>
                <div style={{ display: 'inline-flex', padding: '2px 8px', borderRadius: 6, background: 'rgba(124,111,255,0.15)', color: 'var(--brand-light)', fontSize: 10, fontWeight: 600 }}>
                  {currentUser.role}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: 'Full Name',    value: currentUser.name },
                { label: 'Email',        value: currentUser.email },
                { label: 'Role',         value: currentUser.role },
                { label: 'Timezone',     value: 'UTC+5 (Almaty)' },
              ].map(f => (
                <div key={f.label} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 90, fontSize: 11, color: 'var(--text-tertiary)', fontWeight: 500, flexShrink: 0 }}>{f.label}</div>
                  <input
                    defaultValue={f.value}
                    style={{
                      flex: 1, padding: '7px 12px', background: 'var(--surface)',
                      border: '1px solid var(--border)', borderRadius: 7,
                      color: 'var(--text-primary)', fontFamily: 'var(--font-body)', fontSize: 12, outline: 'none',
                    }}
                    onFocus={e => (e.target.style.borderColor = 'var(--brand)')}
                    onBlur={e  => (e.target.style.borderColor = 'var(--border)')}
                  />
                </div>
              ))}
            </div>
            <button style={{
              marginTop: 16, padding: '8px 18px',
              background: 'linear-gradient(135deg, var(--brand), #9c88ff)',
              border: 'none', borderRadius: 8, color: 'white',
              fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600, cursor: 'pointer',
            }}>Save Changes</button>
          </Card>

          <Card>
            <SectionHeader title="Appearance" />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 13, color: 'var(--text-primary)', marginBottom: 2 }}>Theme</div>
                <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>
                  Currently using <strong style={{ color: 'var(--text-secondary)' }}>{theme}</strong> mode
                </div>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                {(['dark', 'light'] as const).map(t => (
                  <button
                    key={t}
                    onClick={() => theme !== t && toggleTheme()}
                    style={{
                      padding: '6px 14px', borderRadius: 7, fontSize: 11, fontWeight: 500,
                      border: '1px solid var(--border)', cursor: 'pointer', fontFamily: 'var(--font-body)',
                      background: theme === t ? 'var(--brand)' : 'var(--surface)',
                      color: theme === t ? 'white' : 'var(--text-secondary)',
                      textTransform: 'capitalize',
                    }}
                  >{t === 'dark' ? '🌙 Dark' : '☀️ Light'}</button>
                ))}
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Notifications */}
      {activeTab === 'notifications' && (
        <Card>
          <SectionHeader title="Notification Preferences" />
          <ToggleList settings={NOTIFICATION_SETTINGS} toggles={toggles} onToggle={toggle} />
        </Card>
      )}

      {/* Security */}
      {activeTab === 'security' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Card>
            <SectionHeader title="Security Settings" />
            <ToggleList settings={SECURITY_SETTINGS} toggles={toggles} onToggle={toggle} />
          </Card>
          <Card>
            <SectionHeader title="Change Password" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['Current Password', 'New Password', 'Confirm Password'].map(f => (
                <input
                  key={f}
                  type="password"
                  placeholder={f}
                  style={{
                    padding: '8px 12px', background: 'var(--surface)',
                    border: '1px solid var(--border)', borderRadius: 7,
                    color: 'var(--text-primary)', fontFamily: 'var(--font-body)', fontSize: 12, outline: 'none',
                  }}
                  onFocus={e => (e.target.style.borderColor = 'var(--brand)')}
                  onBlur={e  => (e.target.style.borderColor = 'var(--border)')}
                />
              ))}
              <button style={{
                padding: '8px 16px', borderRadius: 8, border: 'none',
                background: 'linear-gradient(135deg, var(--brand), #9c88ff)',
                color: 'white', fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600, cursor: 'pointer', width: 'fit-content',
              }}>Update Password</button>
            </div>
          </Card>
        </div>
      )}

      {/* Privacy */}
      {activeTab === 'privacy' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Card>
            <SectionHeader title="Privacy & Data" />
            <ToggleList settings={PRIVACY_SETTINGS} toggles={toggles} onToggle={toggle} />
          </Card>

          {/* Danger zone */}
          <div style={{ padding: 18, border: '1px solid rgba(255,107,138,0.3)', borderRadius: 12, background: 'rgba(255,107,138,0.04)' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--rose)', marginBottom: 4 }}>⚠️ Danger Zone</div>
            <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 14 }}>
              These actions are permanent and cannot be undone. Please proceed with caution.
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button style={{ padding: '7px 14px', borderRadius: 8, border: '1px solid var(--rose)', background: 'transparent', color: 'var(--rose)', fontFamily: 'var(--font-body)', fontSize: 12, cursor: 'pointer' }}>
                Export Data
              </button>
              <button style={{ padding: '7px 14px', borderRadius: 8, border: '1px solid var(--rose)', background: 'transparent', color: 'var(--rose)', fontFamily: 'var(--font-body)', fontSize: 12, cursor: 'pointer' }}>
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Toggle list ──────────────────────────────────────────────────────────────
function ToggleList({ settings, toggles, onToggle }: {
  settings: ToggleSetting[];
  toggles: Record<string, boolean>;
  onToggle: (key: string) => void;
}) {
  return (
    <div>
      {settings.map((s, i) => (
        <div
          key={s.key}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '14px 0',
            borderBottom: i < settings.length - 1 ? '1px solid var(--border)' : 'none',
          }}
        >
          <div style={{ flex: 1, marginRight: 20 }}>
            <div style={{ fontSize: 13, color: 'var(--text-primary)', marginBottom: 2 }}>{s.label}</div>
            <div style={{ fontSize: 11, color: 'var(--text-tertiary)', lineHeight: 1.5 }}>{s.description}</div>
          </div>
          <Toggle on={!!toggles[s.key]} onChange={() => onToggle(s.key)} />
        </div>
      ))}
    </div>
  );
}
