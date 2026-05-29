import { useState } from 'react';
import { Card, SectionHeader } from '../components/ui';
import { CALENDAR_EVENTS } from '../data/mockData';
import { getDaysInMonth, getFirstDayOfMonth } from '../lib/utils';
import type { CalendarEvent } from '../types';

const DAYS_SHORT = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

export function CalendarPage() {
  const today = new Date();
  const [year, setYear]   = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState(today.getDate());
  const [view, setView]   = useState<'month' | 'week'>('month');

  const daysInMonth   = getDaysInMonth(year, month);
  const firstDayOffset = getFirstDayOfMonth(year, month); // 0=Mon

  // Build cells: leading nulls + day numbers
  const cells: (number | null)[] = [
    ...Array(firstDayOffset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  // Pad to full grid rows
  while (cells.length % 7 !== 0) cells.push(null);

  const eventsByDay: Record<number, CalendarEvent[]> = {};
  CALENDAR_EVENTS.forEach(ev => {
    const d = new Date(ev.date);
    if (d.getFullYear() === year && d.getMonth() === month) {
      const day = d.getDate();
      if (!eventsByDay[day]) eventsByDay[day] = [];
      eventsByDay[day].push(ev);
    }
  });

  const selectedDateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`;
  const selectedEvents = CALENDAR_EVENTS.filter(ev => ev.date === selectedDateStr);

  function prevMonth() {
    if (month === 0) { setYear(y => y - 1); setMonth(11); }
    else setMonth(m => m - 1);
  }
  function nextMonth() {
    if (month === 11) { setYear(y => y + 1); setMonth(0); }
    else setMonth(m => m + 1);
  }

  return (
    <div className="page-enter">
      {/* View toggle */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16, gap: 8 }}>
        {(['month', 'week'] as const).map(v => (
          <button key={v} onClick={() => setView(v)} style={{
            padding: '5px 14px', borderRadius: 7, fontSize: 11, fontWeight: 600,
            border: '1px solid var(--border)', cursor: 'pointer', fontFamily: 'var(--font-body)',
            background: view === v ? 'var(--brand)' : 'var(--surface)',
            color: view === v ? 'white' : 'var(--text-secondary)',
            textTransform: 'capitalize',
          }}>{v}</button>
        ))}
        <button style={{
          padding: '5px 14px', borderRadius: 8, fontSize: 11, fontWeight: 600,
          background: 'linear-gradient(135deg, var(--brand), #9c88ff)',
          border: 'none', color: 'white', cursor: 'pointer', fontFamily: 'var(--font-body)',
        }}>+ Add Event</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 16 }}>
        {/* Calendar grid */}
        <Card>
          {/* Month nav */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <h3 style={{ fontFamily: 'var(--font-head)', fontSize: 16, fontWeight: 700 }}>
              {MONTHS[month]} {year}
            </h3>
            <div style={{ display: 'flex', gap: 6 }}>
              <button onClick={prevMonth} style={{ width: 30, height: 30, borderRadius: 7, border: '1px solid var(--border)', background: 'var(--surface)', cursor: 'pointer', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              <button onClick={() => { setYear(today.getFullYear()); setMonth(today.getMonth()); setSelectedDay(today.getDate()); }} style={{ padding: '4px 10px', borderRadius: 7, border: '1px solid var(--border)', background: 'var(--surface)', cursor: 'pointer', color: 'var(--text-secondary)', fontSize: 11, fontFamily: 'var(--font-body)' }}>Today</button>
              <button onClick={nextMonth} style={{ width: 30, height: 30, borderRadius: 7, border: '1px solid var(--border)', background: 'var(--surface)', cursor: 'pointer', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>
          </div>

          {/* Day headers */}
          <div className="cal-grid" style={{ marginBottom: 6 }}>
            {DAYS_SHORT.map(d => (
              <div key={d} style={{ textAlign: 'center', fontSize: 10, fontWeight: 600, color: 'var(--text-tertiary)', padding: '4px 0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {d}
              </div>
            ))}
          </div>

          {/* Day cells */}
          <div className="cal-grid">
            {cells.map((day, i) => {
              if (!day) return <div key={i} />;
              const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
              const isSelected = day === selectedDay && !isToday;
              const dayEvents = eventsByDay[day] ?? [];

              return (
                <div
                  key={i}
                  className={`cal-day${isToday ? ' today' : ''}${isSelected ? ' selected' : ''}${dayEvents.length ? ' has-dot' : ''}`}
                  onClick={() => setSelectedDay(day)}
                >
                  <span>{day}</span>
                  {/* Event dots (max 3) */}
                  {dayEvents.length > 0 && !isToday && (
                    <div style={{ display: 'flex', gap: 2, position: 'absolute', bottom: 4 }}>
                      {dayEvents.slice(0, 3).map((ev, j) => (
                        <div key={j} style={{ width: 4, height: 4, borderRadius: '50%', background: ev.color }} />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Card>

        {/* Events sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Card>
            <SectionHeader
              title={`${MONTHS[month].slice(0,3)} ${selectedDay}`}
              action={<span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{selectedEvents.length} events</span>}
            />

            {selectedEvents.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '20px 0', color: 'var(--text-tertiary)', fontSize: 12 }}>
                No events today 🎉
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {selectedEvents.map(ev => (
                  <EventCard key={ev.id} event={ev} />
                ))}
              </div>
            )}
          </Card>

          {/* Upcoming */}
          <Card>
            <SectionHeader title="Upcoming" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {CALENDAR_EVENTS.slice(0, 4).map(ev => (
                <div key={ev.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', borderBottom: '1px solid var(--border)' }}>
                  <div style={{ width: 3, height: 28, borderRadius: 2, background: ev.color, flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ev.title}</div>
                    <div style={{ fontSize: 10, color: 'var(--text-tertiary)' }}>{ev.date} · {ev.startTime}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ─── Event card ───────────────────────────────────────────────────────────────
function EventCard({ event }: { event: CalendarEvent }) {
  return (
    <div style={{
      padding: '10px 12px', borderRadius: 8, background: 'var(--surface-hov)',
      borderLeft: `3px solid ${event.color}`, cursor: 'pointer',
      transition: 'background 0.15s',
    }}
      onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface-act)')}
      onMouseLeave={e => (e.currentTarget.style.background = 'var(--surface-hov)')}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
        <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-primary)', lineHeight: 1.4, flex: 1 }}>{event.title}</div>
        <span style={{ fontSize: 9, fontWeight: 600, padding: '2px 6px', borderRadius: 5, background: `${event.color}22`, color: event.color, marginLeft: 6, whiteSpace: 'nowrap', textTransform: 'uppercase' }}>
          {event.type}
        </span>
      </div>
      <div style={{ fontSize: 10, color: 'var(--text-tertiary)' }}>
        {event.startTime} – {event.endTime} · {event.attendees.length} attendees
      </div>
    </div>
  );
}
