// ─── Task & Kanban ───────────────────────────────────────────────────────────

export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TaskStatus   = 'backlog' | 'todo' | 'in_progress' | 'in_review' | 'done';
export type TaskTag      = 'design' | 'dev' | 'research' | 'marketing' | 'ops';

export interface Task {
  id:          string;
  title:       string;
  description?: string;
  status:      TaskStatus;
  priority:    TaskPriority;
  tag:         TaskTag;
  assignees:   string[];   // user IDs
  dueDate?:    string;     // ISO date string
  createdAt:   string;
  updatedAt:   string;
  labels?:     string[];
  attachments?: number;
  comments?:   number;
}

export interface KanbanColumn {
  id:     TaskStatus;
  label:  string;
  color:  string;
  tasks:  Task[];
}

// ─── User & Team ─────────────────────────────────────────────────────────────

export type UserStatus = 'online' | 'away' | 'offline' | 'busy';

export interface User {
  id:        string;
  name:      string;
  email:     string;
  role:      string;
  avatar?:   string;
  initials:  string;
  color:     string;
  status:    UserStatus;
  timezone?: string;
  joinedAt:  string;
}

// ─── Calendar ─────────────────────────────────────────────────────────────────

export type EventType = 'meeting' | 'deadline' | 'review' | 'sync' | 'demo';

export interface CalendarEvent {
  id:        string;
  title:     string;
  date:      string;
  startTime: string;
  endTime:   string;
  type:      EventType;
  color:     string;
  attendees: string[];
  location?: string;
  notes?:    string;
}

// ─── Analytics ───────────────────────────────────────────────────────────────

export interface MetricCard {
  label:      string;
  value:      string | number;
  change:     number;
  changeType: 'up' | 'down' | 'neutral';
  icon:       string;
  color:      string;
  sparkline?: number[];
}

export interface ChartDataPoint {
  label:     string;
  created:   number;
  completed: number;
  hours:     number;
}

// ─── Activity ────────────────────────────────────────────────────────────────

export type ActivityType =
  | 'task_created'
  | 'task_moved'
  | 'task_completed'
  | 'comment_added'
  | 'member_joined'
  | 'sprint_started';

export interface ActivityItem {
  id:        string;
  type:      ActivityType;
  userId:    string;
  userName:  string;
  message:   string;
  entityName?: string;
  timestamp: string;
  dotColor:  string;
}

// ─── Notifications ───────────────────────────────────────────────────────────

export interface Notification {
  id:        string;
  icon:      string;
  iconBg:    string;
  title:     string;
  body:      string;
  timestamp: string;
  read:      boolean;
}

// ─── Chat ────────────────────────────────────────────────────────────────────

export interface ChatMessage {
  id:        string;
  userId:    string;
  userName:  string;
  userColor: string;
  userInitials: string;
  content:   string;
  timestamp: string;
  isMe:      boolean;
}

// ─── Settings ────────────────────────────────────────────────────────────────

export interface SettingToggle {
  key:   string;
  label: string;
  description: string;
  value: boolean;
}

// ─── Navigation ──────────────────────────────────────────────────────────────

export type PageId =
  | 'dashboard'
  | 'tasks'
  | 'calendar'
  | 'analytics'
  | 'team'
  | 'inbox'
  | 'settings'
  | 'login';

export interface NavItem {
  id:      PageId;
  label:   string;
  icon:    string;
  badge?:  number;
  section: 'workspace' | 'account';
}
