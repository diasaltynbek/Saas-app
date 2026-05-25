import React, { useState, useRef } from 'react';
import { useAppStore } from '../store/useAppStore';
import { AvatarStack } from '../components/ui';
import { TAG_CONFIG, STATUS_CONFIG, STATUS_ORDER, formatDate, isOverdue } from '../lib/utils';
import { USERS } from '../data/mockData';
import type { Task, TaskStatus } from '../types';

const COL_CONFIG = STATUS_ORDER.map(id => STATUS_CONFIG[id]);
const userMap = Object.fromEntries(USERS.map(u => [u.id, u]));

// ─── Task card ────────────────────────────────────────────────────────────────
interface TaskCardProps {
  task: Task;
  onDragStart: () => void;
}
function TaskCard({ task, onDragStart }: TaskCardProps) {
  const tag = TAG_CONFIG[task.tag];
  const assigneeUsers = task.assignees.map(id => userMap[id]).filter(Boolean);
  const overdue = task.dueDate && isOverdue(task.dueDate) && task.status !== 'done';

  return (
    <div
      className="task-card"
      draggable
      onDragStart={onDragStart}
    >
      {/* Tag pill */}
      <div style={{ display: 'inline-flex', alignItems: 'center', fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 6, background: tag.bg, color: tag.color, marginBottom: 8 }}>
        {tag.label}
      </div>

      {/* Title */}
      <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-primary)', lineHeight: 1.55, marginBottom: 10 }}>
        {task.title}
      </div>

      {/* Meta row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6 }}>
        <AvatarStack users={assigneeUsers} size={20} max={3} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Priority dot */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 4,
            fontSize: 10, color: task.priority === 'high' || task.priority === 'urgent' ? 'var(--rose)' : 'var(--text-tertiary)',
          }}>
            <PriorityIcon priority={task.priority} />
          </div>

          {/* Due date */}
          {task.dueDate && (
            <span style={{ fontSize: 10, color: overdue ? 'var(--rose)' : 'var(--text-tertiary)', fontWeight: overdue ? 600 : 400 }}>
              {task.status === 'done' ? '✓ Done' : formatDate(task.dueDate)}
            </span>
          )}
        </div>
      </div>

      {/* Bottom stats */}
      {(task.comments || task.attachments) ? (
        <div style={{ display: 'flex', gap: 10, marginTop: 10, paddingTop: 10, borderTop: '1px solid var(--border)' }}>
          {task.comments && (
            <span style={{ fontSize: 10, color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: 3 }}>
              💬 {task.comments}
            </span>
          )}
          {task.attachments && (
            <span style={{ fontSize: 10, color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: 3 }}>
              📎 {task.attachments}
            </span>
          )}
        </div>
      ) : null}
    </div>
  );
}

// ─── Kanban column ────────────────────────────────────────────────────────────
interface KanbanColProps {
  status:    TaskStatus;
  tasks:     Task[];
  onDrop:    (status: TaskStatus) => void;
  onDragOver:(e: React.DragEvent) => void;
  dragOver:  boolean;
  onDragStart: (taskId: string) => void;
}
function KanbanCol({ status, tasks, onDrop, onDragOver, dragOver, onDragStart }: KanbanColProps) {
  const cfg = STATUS_CONFIG[status];

  return (
    <div
      className={`kanban-column${dragOver ? ' drag-over' : ''}`}
      onDragOver={onDragOver}
      onDrop={() => onDrop(status)}
    >
      {/* Column header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: cfg.dot, flexShrink: 0 }} />
        <span style={{ fontFamily: 'var(--font-head)', fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
          {cfg.label}
        </span>
        <span style={{
          marginLeft: 2, background: 'var(--surface-hov)', color: 'var(--text-secondary)',
          fontSize: 11, fontWeight: 600, padding: '1px 7px', borderRadius: 10,
        }}>{tasks.length}</span>
        <div style={{ flex: 1 }} />
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-tertiary)', padding: 0 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg>
        </button>
      </div>

      {/* Task list */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} onDragStart={() => onDragStart(task.id)} />
        ))}
      </div>

      {/* Add task button */}
      <button
        style={{
          width: '100%', padding: '8px', marginTop: 8,
          border: '1px dashed var(--border)', borderRadius: 8,
          background: 'transparent', color: 'var(--text-tertiary)',
          fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center',
          justifyContent: 'center', gap: 6, fontFamily: 'var(--font-body)',
          transition: 'all 0.2s',
        }}
        onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = 'var(--brand)'; el.style.color = 'var(--brand-light)'; el.style.background = 'var(--brand-glow)'; }}
        onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = 'var(--border)'; el.style.color = 'var(--text-tertiary)'; el.style.background = 'transparent'; }}
      >
        + Add task
      </button>
    </div>
  );
}

// ─── Tasks page ───────────────────────────────────────────────────────────────
export function TasksPage() {
  const { tasks, moveTask, searchQuery } = useAppStore();
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOverCol, setDragOverCol] = useState<TaskStatus | null>(null);

  const filtered = searchQuery
    ? tasks.filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : tasks;

  function handleDrop(targetStatus: TaskStatus) {
    if (draggingId) {
      const task = tasks.find(t => t.id === draggingId);
      if (task && task.status !== targetStatus) moveTask(draggingId, targetStatus);
    }
    setDraggingId(null);
    setDragOverCol(null);
  }

  const totalDone = tasks.filter(t => t.status === 'done').length;
  const totalTasks = tasks.length;

  return (
    <div className="page-enter">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 16, fontWeight: 600, marginBottom: 4 }}>Sprint 12 — Aug 2025</h2>
          <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>
            {totalDone}/{totalTasks} tasks completed · Drag cards to update status
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {/* Filter chips */}
          {['All', 'My tasks', 'High priority'].map((f, i) => (
            <button key={f} style={{
              padding: '5px 12px', borderRadius: 7, fontSize: 11, fontWeight: 500,
              border: '1px solid var(--border)', cursor: 'pointer', fontFamily: 'var(--font-body)',
              background: i === 0 ? 'var(--brand)' : 'var(--surface)',
              color: i === 0 ? 'white' : 'var(--text-secondary)',
              transition: 'all 0.15s',
            }}>{f}</button>
          ))}
          <button style={{
            padding: '5px 14px', borderRadius: 8, fontSize: 12, fontWeight: 600,
            background: 'linear-gradient(135deg, var(--brand), #9c88ff)',
            border: 'none', color: 'white', cursor: 'pointer', fontFamily: 'var(--font-body)',
            display: 'flex', alignItems: 'center', gap: 5,
          }}>
            + New Task
          </button>
        </div>
      </div>

      {/* Board */}
      <div
        className="kanban-board"
        onDragEnd={() => { setDraggingId(null); setDragOverCol(null); }}
      >
        {STATUS_ORDER.map(status => {
          const colTasks = filtered.filter(t => t.status === status);
          return (
            <KanbanCol
              key={status}
              status={status}
              tasks={colTasks}
              onDragStart={setDraggingId}
              dragOver={dragOverCol === status}
              onDragOver={e => { e.preventDefault(); setDragOverCol(status); }}
              onDrop={handleDrop}
            />
          );
        })}
      </div>
    </div>
  );
}

// ─── Priority icon ────────────────────────────────────────────────────────────
function PriorityIcon({ priority }: { priority: Task['priority'] }) {
  const color = priority === 'urgent' ? '#ff2d5b' : priority === 'high' ? 'var(--rose)' : priority === 'medium' ? 'var(--amber)' : 'var(--text-tertiary)';
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill={color}>
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
      <line x1="4" y1="22" x2="4" y2="15" stroke={color} strokeWidth="2"/>
    </svg>
  );
}
