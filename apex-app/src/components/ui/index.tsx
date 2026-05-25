import React from 'react';
import { cx } from '../../lib/utils';

// ─── Badge ────────────────────────────────────────────────────────────────────
interface BadgeProps {
  variant?: 'purple' | 'teal' | 'rose' | 'amber' | 'green' | 'blue' | 'gray';
  children: React.ReactNode;
  className?: string;
}
export function Badge({ variant = 'purple', children, className }: BadgeProps) {
  return (
    <span className={cx('badge', `badge-${variant}`, className)}>
      {children}
    </span>
  );
}

// ─── Avatar ───────────────────────────────────────────────────────────────────
interface AvatarProps {
  initials: string;
  color:    string;
  size?:    number;
  border?:  boolean;
  title?:   string;
}
export function Avatar({ initials, color, size = 28, border = false, title }: AvatarProps) {
  return (
    <div
      title={title}
      style={{
        width: size, height: size,
        borderRadius: '50%',
        background: color,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: size * 0.36,
        fontWeight: 700,
        color: 'white',
        flexShrink: 0,
        border: border ? '2px solid var(--bg-elevated)' : 'none',
        userSelect: 'none',
      }}
    >
      {initials}
    </div>
  );
}

// ─── AvatarStack ──────────────────────────────────────────────────────────────
interface AvatarStackProps {
  users: Array<{ id: string; initials: string; color: string; name: string }>;
  max?: number;
  size?: number;
}
export function AvatarStack({ users, max = 3, size = 22 }: AvatarStackProps) {
  const shown = users.slice(0, max);
  const extra = users.length - max;
  return (
    <div className="avatar-stack" style={{ display: 'flex' }}>
      {shown.map((u) => (
        <Avatar key={u.id} initials={u.initials} color={u.color} size={size} border title={u.name} />
      ))}
      {extra > 0 && (
        <div
          style={{
            width: size, height: size, borderRadius: '50%',
            background: 'var(--surface-hov)', border: '2px solid var(--bg-elevated)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: size * 0.36, fontWeight: 600, color: 'var(--text-secondary)',
          }}
        >
          +{extra}
        </div>
      )}
    </div>
  );
}

// ─── ProgressBar ─────────────────────────────────────────────────────────────
interface ProgressBarProps { value: number; color?: string; height?: number; }
export function ProgressBar({ value, color = 'var(--brand)', height = 4 }: ProgressBarProps) {
  return (
    <div className="progress-track" style={{ height }}>
      <div className="progress-fill" style={{ width: `${value}%`, background: color }} />
    </div>
  );
}

// ─── Toggle ───────────────────────────────────────────────────────────────────
interface ToggleProps { on: boolean; onChange: () => void; }
export function Toggle({ on, onChange }: ToggleProps) {
  return (
    <div
      className={cx('toggle', on ? 'toggle-on' : 'toggle-off')}
      onClick={onChange}
      role="switch"
      aria-checked={on}
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onChange()}
    >
      <div className="toggle-thumb" />
    </div>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────
interface CardProps {
  children:   React.ReactNode;
  className?: string;
  glass?:     boolean;
  padding?:   number | string;
  style?:     React.CSSProperties;
}
export function Card({ children, className, glass = false, padding = 20, style }: CardProps) {
  return (
    <div
      className={cx(glass ? 'glass-card' : 'surface-card', className)}
      style={{ padding, ...style }}
    >
      {children}
    </div>
  );
}

// ─── IconButton ──────────────────────────────────────────────────────────────
interface IconBtnProps {
  children:    React.ReactNode;
  onClick?:    () => void;
  title?:      string;
  active?:     boolean;
  className?:  string;
  badgeCount?: number;
}
export function IconBtn({ children, onClick, title, active, className, badgeCount }: IconBtnProps) {
  return (
    <button
      className={cx('btn btn-icon', active && 'active', className)}
      onClick={onClick}
      title={title}
      style={{ position: 'relative' }}
    >
      {children}
      {badgeCount != null && badgeCount > 0 && (
        <span style={{
          position: 'absolute', top: 4, right: 4,
          width: 7, height: 7, borderRadius: '50%',
          background: 'var(--rose)', border: '1.5px solid var(--bg-base)',
        }} />
      )}
    </button>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────
interface SkeletonProps { width?: string | number; height?: string | number; className?: string; }
export function Skeleton({ width = '100%', height = 16, className }: SkeletonProps) {
  return <div className={cx('skeleton', className)} style={{ width, height }} />;
}

// ─── Section header ───────────────────────────────────────────────────────────
interface SectionHeaderProps {
  title:    string;
  action?:  React.ReactNode;
  className?: string;
}
export function SectionHeader({ title, action, className }: SectionHeaderProps) {
  return (
    <div className={cx('flex items-center justify-between mb-4', className)}>
      <h3 style={{ fontFamily: 'var(--font-head)', fontSize: 15, fontWeight: 600, color: 'var(--text-primary)' }}>
        {title}
      </h3>
      {action && <div>{action}</div>}
    </div>
  );
}

// ─── Divider ─────────────────────────────────────────────────────────────────
export function Divider({ className }: { className?: string }) {
  return <div className={cx(className)} style={{ height: 1, background: 'var(--border)', margin: '12px 0' }} />;
}

// ─── Empty state ──────────────────────────────────────────────────────────────
interface EmptyStateProps { icon: string; title: string; description?: string; }
export function EmptyState({ icon, title, description }: EmptyStateProps) {
  return (
    <div style={{ textAlign: 'center', padding: '32px 16px', color: 'var(--text-tertiary)' }}>
      <div style={{ fontSize: 32, marginBottom: 10 }}>{icon}</div>
      <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 4 }}>{title}</div>
      {description && <div style={{ fontSize: 12 }}>{description}</div>}
    </div>
  );
}
