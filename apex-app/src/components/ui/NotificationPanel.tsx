import { useAppStore } from '../../store/useAppStore';

export function NotificationPanel() {
  const { notifications, markAllRead, dismissNotif } = useAppStore();
  const unread = notifications.filter(n => !n.read).length;

  return (
    <div className="notif-panel">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontFamily: 'var(--font-head)', fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
            Notifications
          </span>
          {unread > 0 && (
            <span style={{
              background: 'var(--brand)', color: 'white', fontSize: 10, fontWeight: 700,
              padding: '1px 6px', borderRadius: 10,
            }}>{unread}</span>
          )}
        </div>
        {unread > 0 && (
          <button
            onClick={markAllRead}
            style={{ fontSize: 11, color: 'var(--brand-light)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)' }}
          >
            Mark all read
          </button>
        )}
      </div>

      {/* Items */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {notifications.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '24px 0', color: 'var(--text-tertiary)', fontSize: 12 }}>
            You're all caught up! 🎉
          </div>
        ) : (
          notifications.map(n => (
            <div
              key={n.id}
              style={{
                display: 'flex', gap: 10, padding: '10px 0',
                borderBottom: '1px solid var(--border)',
                opacity: n.read ? 0.6 : 1,
                position: 'relative',
              }}
            >
              {/* Unread dot */}
              {!n.read && (
                <div style={{
                  position: 'absolute', left: -8, top: 16,
                  width: 5, height: 5, borderRadius: '50%', background: 'var(--brand)',
                }} />
              )}

              <div style={{
                width: 34, height: 34, borderRadius: 9, background: n.iconBg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 15, flexShrink: 0,
              }}>
                {n.icon}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-primary)', marginBottom: 2 }}>
                  {n.title}
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {n.body}
                </div>
                <div style={{ fontSize: 10, color: 'var(--text-tertiary)', marginTop: 4 }}>
                  {n.timestamp}
                </div>
              </div>

              <button
                onClick={() => dismissNotif(n.id)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'var(--text-tertiary)', fontSize: 14, lineHeight: 1,
                  padding: '0 2px', alignSelf: 'flex-start', marginTop: 4,
                }}
                title="Dismiss"
              >×</button>
            </div>
          ))
        )}
      </div>

      {notifications.length > 0 && (
        <div style={{ textAlign: 'center', paddingTop: 12 }}>
          <span style={{ fontSize: 11, color: 'var(--brand-light)', cursor: 'pointer' }}>
            View all notifications →
          </span>
        </div>
      )}
    </div>
  );
}
