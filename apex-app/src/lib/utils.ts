import type { TaskPriority, TaskTag, TaskStatus, UserStatus } from '../types';

// ─── Class merging ────────────────────────────────────────────────────────────
export function cx(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

// ─── Task helpers ─────────────────────────────────────────────────────────────
export const PRIORITY_CONFIG: Record<TaskPriority, { label: string; color: string; dot: string }> = {
  low:    { label: 'Low',    color: 'var(--text-tertiary)', dot: '#5a5a72' },
  medium: { label: 'Medium', color: 'var(--amber)',          dot: '#ffb347' },
  high:   { label: 'High',   color: 'var(--rose)',           dot: '#ff6b8a' },
  urgent: { label: 'Urgent', color: '#ff2d5b',               dot: '#ff2d5b' },
};

export const TAG_CONFIG: Record<TaskTag, { label: string; bg: string; color: string }> = {
  design:    { label: 'Design',    bg: 'rgba(124,111,255,0.15)', color: 'var(--brand-light)' },
  dev:       { label: 'Dev',       bg: 'rgba(0,212,170,0.12)',   color: 'var(--teal)' },
  research:  { label: 'Research',  bg: 'rgba(255,179,71,0.12)',  color: 'var(--amber)' },
  marketing: { label: 'Marketing', bg: 'rgba(255,107,138,0.12)', color: 'var(--rose)' },
  ops:       { label: 'Ops',       bg: 'rgba(96,165,250,0.12)',  color: 'var(--blue)' },
};

export const STATUS_CONFIG: Record<TaskStatus, { label: string; color: string; dot: string }> = {
  backlog:     { label: 'Backlog',     color: 'var(--text-tertiary)', dot: '#5a5a72' },
  todo:        { label: 'To Do',       color: 'var(--blue)',          dot: '#60a5fa' },
  in_progress: { label: 'In Progress', color: 'var(--amber)',          dot: '#ffb347' },
  in_review:   { label: 'In Review',   color: 'var(--brand-light)',   dot: '#a78bff' },
  done:        { label: 'Done',        color: 'var(--green)',         dot: '#4ade80' },
};

export const STATUS_ORDER: TaskStatus[] = ['backlog', 'todo', 'in_progress', 'in_review', 'done'];

// ─── User status ──────────────────────────────────────────────────────────────
export const STATUS_DOT: Record<UserStatus, string> = {
  online:  '#4ade80',
  away:    '#ffb347',
  offline: '#5a5a72',
  busy:    '#ff6b8a',
};

// ─── Date helpers ─────────────────────────────────────────────────────────────
export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en', { month: 'short', day: 'numeric' });
}

export function isOverdue(iso: string): boolean {
  return new Date(iso) < new Date();
}

export function daysUntil(iso: string): number {
  const diff = new Date(iso).getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

// ─── Number formatting ────────────────────────────────────────────────────────
export function fmtNum(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1) + 'k';
  return String(n);
}

// ─── Random ID ────────────────────────────────────────────────────────────────
export const uid = () => Math.random().toString(36).slice(2, 9);

// ─── Calendar helpers ─────────────────────────────────────────────────────────
export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

export function getFirstDayOfMonth(year: number, month: number): number {
  // Returns 0=Mon … 6=Sun
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
}

// ─── Color helpers ────────────────────────────────────────────────────────────
export function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}
