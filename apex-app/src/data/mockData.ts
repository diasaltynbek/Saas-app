import type {
  Task, User, CalendarEvent, ActivityItem,
  Notification, ChatMessage, ChartDataPoint, MetricCard
} from '../types';

// ─── Users ───────────────────────────────────────────────────────────────────

export const USERS: User[] = [
  { id: 'u1', name: 'Alex Kim',     email: 'alex@apex.io',    role: 'Lead Designer',   initials: 'AK', color: '#7c6fff', status: 'online',  joinedAt: '2024-01-10' },
  { id: 'u2', name: 'Sarah Chen',   email: 'sarah@apex.io',   role: 'Frontend Dev',    initials: 'SC', color: '#00d4aa', status: 'online',  joinedAt: '2024-01-15' },
  { id: 'u3', name: 'Mike Ross',    email: 'mike@apex.io',    role: 'Backend Dev',     initials: 'MR', color: '#ff6b8a', status: 'away',    joinedAt: '2024-02-01' },
  { id: 'u4', name: 'Luna Park',    email: 'luna@apex.io',    role: 'Product Manager', initials: 'LP', color: '#ffb347', status: 'online',  joinedAt: '2024-02-12' },
  { id: 'u5', name: 'Tom Wright',   email: 'tom@apex.io',     role: 'DevOps',          initials: 'TW', color: '#60a5fa', status: 'offline', joinedAt: '2024-03-05' },
  { id: 'me', name: 'You',          email: 'you@apex.io',     role: 'Full-stack Dev',  initials: 'ME', color: '#a78bff', status: 'online',  joinedAt: '2024-01-01' },
];

export const ME = USERS.find(u => u.id === 'me')!;

// ─── Tasks ───────────────────────────────────────────────────────────────────

export const INITIAL_TASKS: Task[] = [
  // Backlog
  {
    id: 't1', title: 'User research synthesis for Q3 product roadmap',
    status: 'backlog', priority: 'low', tag: 'research',
    assignees: ['u1', 'u4'], dueDate: '2025-08-15',
    createdAt: '2025-07-20', updatedAt: '2025-08-01',
    comments: 4, attachments: 2,
  },
  {
    id: 't2', title: 'Update design system tokens for dark mode',
    status: 'backlog', priority: 'medium', tag: 'design',
    assignees: ['u1'], dueDate: '2025-08-18',
    createdAt: '2025-07-25', updatedAt: '2025-08-02',
    comments: 1,
  },
  // To Do
  {
    id: 't3', title: 'Implement OAuth2 flow with Google and GitHub providers',
    status: 'todo', priority: 'high', tag: 'dev',
    assignees: ['u2', 'u3'], dueDate: '2025-08-12',
    createdAt: '2025-08-01', updatedAt: '2025-08-05',
    comments: 8, attachments: 1,
  },
  {
    id: 't4', title: 'Create landing page animation concepts',
    status: 'todo', priority: 'medium', tag: 'design',
    assignees: ['u1'], dueDate: '2025-08-14',
    createdAt: '2025-08-02', updatedAt: '2025-08-06',
    comments: 2,
  },
  {
    id: 't5', title: 'Write copy for onboarding email sequence',
    status: 'todo', priority: 'low', tag: 'marketing',
    assignees: ['u4'], dueDate: '2025-08-16',
    createdAt: '2025-08-03', updatedAt: '2025-08-07',
  },
  {
    id: 't6', title: 'Set up Prometheus metrics + Grafana dashboards',
    status: 'todo', priority: 'medium', tag: 'ops',
    assignees: ['u5'], dueDate: '2025-08-20',
    createdAt: '2025-08-04', updatedAt: '2025-08-07',
    comments: 3,
  },
  // In Progress
  {
    id: 't7', title: 'Build Kanban board with drag-and-drop interface',
    status: 'in_progress', priority: 'high', tag: 'dev',
    assignees: ['u2', 'u1'], dueDate: '2025-08-10',
    createdAt: '2025-07-28', updatedAt: '2025-08-08',
    comments: 12, attachments: 3,
  },
  {
    id: 't8', title: 'Analytics dashboard — charts and KPI widgets',
    status: 'in_progress', priority: 'high', tag: 'dev',
    assignees: ['u2'], dueDate: '2025-08-11',
    createdAt: '2025-07-30', updatedAt: '2025-08-09',
    comments: 6,
  },
  {
    id: 't9', title: 'Finalize brand identity & icon set',
    status: 'in_progress', priority: 'medium', tag: 'design',
    assignees: ['u1'], dueDate: '2025-08-13',
    createdAt: '2025-08-01', updatedAt: '2025-08-09',
    comments: 5, attachments: 8,
  },
  // In Review
  {
    id: 't10', title: 'API rate limiting and Redis caching layer',
    status: 'in_review', priority: 'high', tag: 'dev',
    assignees: ['u3', 'u5'], dueDate: '2025-08-09',
    createdAt: '2025-07-22', updatedAt: '2025-08-08',
    comments: 9,
  },
  // Done
  {
    id: 't11', title: 'Design system component library v2.0',
    status: 'done', priority: 'high', tag: 'design',
    assignees: ['u1', 'u2'], dueDate: '2025-08-01',
    createdAt: '2025-07-10', updatedAt: '2025-08-01',
    comments: 18, attachments: 12,
  },
  {
    id: 't12', title: 'Database schema migration & seed scripts',
    status: 'done', priority: 'medium', tag: 'dev',
    assignees: ['u3'], dueDate: '2025-07-30',
    createdAt: '2025-07-15', updatedAt: '2025-07-30',
    comments: 4,
  },
];

// ─── Calendar Events ──────────────────────────────────────────────────────────

export const CALENDAR_EVENTS: CalendarEvent[] = [
  { id: 'e1', title: 'Design Review',         date: '2025-08-06', startTime: '09:00', endTime: '10:00', type: 'review',   color: '#7c6fff', attendees: ['u1','u2','u4'] },
  { id: 'e2', title: 'Sprint Planning',        date: '2025-08-06', startTime: '11:00', endTime: '13:00', type: 'meeting',  color: '#00d4aa', attendees: ['u1','u2','u3','u4','u5'] },
  { id: 'e3', title: 'Client Call — Acme Corp',date: '2025-08-06', startTime: '14:30', endTime: '15:15', type: 'meeting',  color: '#ff6b8a', attendees: ['u4','u1'] },
  { id: 'e4', title: 'Team Sync',              date: '2025-08-06', startTime: '16:00', endTime: '16:30', type: 'sync',     color: '#ffb347', attendees: ['u1','u2','u3','u4','u5'] },
  { id: 'e5', title: 'Auth PR Deadline',       date: '2025-08-12', startTime: '17:00', endTime: '17:00', type: 'deadline', color: '#ff6b8a', attendees: ['u2','u3'] },
  { id: 'e6', title: 'Product Demo v2',        date: '2025-08-18', startTime: '10:00', endTime: '11:00', type: 'demo',     color: '#60a5fa', attendees: ['u1','u2','u3','u4'] },
  { id: 'e7', title: 'Monthly Retrospective',  date: '2025-08-22', startTime: '14:00', endTime: '15:30', type: 'meeting',  color: '#00d4aa', attendees: ['u1','u2','u3','u4','u5'] },
  { id: 'e8', title: 'Q3 OKR Review',          date: '2025-08-25', startTime: '09:00', endTime: '10:30', type: 'review',   color: '#7c6fff', attendees: ['u1','u4'] },
];

// ─── Activity ─────────────────────────────────────────────────────────────────

export const ACTIVITY_ITEMS: ActivityItem[] = [
  { id: 'a1', type: 'task_moved',     userId: 'u1', userName: 'Alex Kim',   message: 'moved',      entityName: 'OAuth2 flow',           timestamp: '2m ago',  dotColor: '#7c6fff' },
  { id: 'a2', type: 'comment_added',  userId: 'u2', userName: 'Sarah Chen', message: 'commented on',entityName: 'Design System v2',      timestamp: '15m ago', dotColor: '#00d4aa' },
  { id: 'a3', type: 'task_completed', userId: 'u3', userName: 'Mike Ross',  message: 'completed',   entityName: 'API rate limiting',     timestamp: '1h ago',  dotColor: '#ff6b8a' },
  { id: 'a4', type: 'task_created',   userId: 'u4', userName: 'Luna Park',  message: 'created 3 tasks in', entityName: 'Sprint 12',       timestamp: '2h ago',  dotColor: '#ffb347' },
  { id: 'a5', type: 'member_joined',  userId: 'u5', userName: 'Tom Wright', message: 'joined the team', entityName: undefined,           timestamp: '3h ago',  dotColor: '#60a5fa' },
  { id: 'a6', type: 'sprint_started', userId: 'u4', userName: 'Luna Park',  message: 'started',     entityName: 'Sprint 12',             timestamp: '5h ago',  dotColor: '#ffb347' },
];

// ─── Notifications ────────────────────────────────────────────────────────────

export const NOTIFICATIONS: Notification[] = [
  { id: 'n1', icon: '💬', iconBg: 'rgba(124,111,255,0.15)', title: 'New comment',     body: 'Alex commented on your task "Kanban board"',      timestamp: '2m ago',  read: false },
  { id: 'n2', icon: '✅', iconBg: 'rgba(74,222,128,0.12)',  title: 'Sprint milestone',body: 'Sprint 12 milestone has been reached',             timestamp: '1h ago',  read: false },
  { id: 'n3', icon: '🔔', iconBg: 'rgba(255,179,71,0.12)',  title: 'Due tomorrow',    body: '3 tasks are due tomorrow — review them now',       timestamp: '2h ago',  read: false },
  { id: 'n4', icon: '👋', iconBg: 'rgba(0,212,170,0.12)',   title: 'New team member', body: 'Tom Wright joined your workspace',                  timestamp: '3h ago',  read: true  },
  { id: 'n5', icon: '📎', iconBg: 'rgba(96,165,250,0.12)',  title: 'File uploaded',   body: 'Sarah attached 3 files to "Design System v2"',     timestamp: '4h ago',  read: true  },
];

// ─── Chat Messages ────────────────────────────────────────────────────────────

export const INITIAL_CHAT: ChatMessage[] = [
  { id: 'm1', userId: 'u2', userName: 'Sarah Chen',   userColor: '#00d4aa', userInitials: 'SC', content: 'Just pushed the new auth flow to staging 🚀', timestamp: '10:32', isMe: false },
  { id: 'm2', userId: 'u1', userName: 'Alex Kim',     userColor: '#7c6fff', userInitials: 'AK', content: "Nice! I'll review the PR after standup",       timestamp: '10:35', isMe: false },
  { id: 'm3', userId: 'u3', userName: 'Mike Ross',    userColor: '#ff6b8a', userInitials: 'MR', content: 'Backend API is ready, endpoints are documented in Notion', timestamp: '10:41', isMe: false },
  { id: 'm4', userId: 'me', userName: 'You',          userColor: '#a78bff', userInitials: 'ME', content: "Great work team! Let's sync at 2pm 🙌",          timestamp: '10:44', isMe: true  },
  { id: 'm5', userId: 'u4', userName: 'Luna Park',    userColor: '#ffb347', userInitials: 'LP', content: 'Reminder: Sprint 12 planning is tomorrow at 11am', timestamp: '11:02', isMe: false },
];

// ─── Chart Data ───────────────────────────────────────────────────────────────

export const WEEKLY_CHART_DATA: ChartDataPoint[] = [
  { label: 'W1',  created: 15, completed: 12, hours: 38 },
  { label: 'W2',  created: 20, completed: 18, hours: 42 },
  { label: 'W3',  created: 18, completed: 14, hours: 36 },
  { label: 'W4',  created: 25, completed: 22, hours: 44 },
  { label: 'W5',  created: 22, completed: 19, hours: 40 },
  { label: 'W6',  created: 30, completed: 28, hours: 48 },
  { label: 'W7',  created: 26, completed: 24, hours: 41 },
  { label: 'W8',  created: 35, completed: 32, hours: 52 },
];

export const MONTHLY_TREND: Array<{ month: string; tasks: number; velocity: number }> = [
  { month: 'Jan', tasks: 40, velocity: 55 },
  { month: 'Feb', tasks: 55, velocity: 62 },
  { month: 'Mar', tasks: 42, velocity: 48 },
  { month: 'Apr', tasks: 68, velocity: 75 },
  { month: 'May', tasks: 52, velocity: 60 },
  { month: 'Jun', tasks: 78, velocity: 82 },
  { month: 'Jul', tasks: 65, velocity: 70 },
  { month: 'Aug', tasks: 95, velocity: 92 },
];

// ─── Metric Cards ─────────────────────────────────────────────────────────────

export const METRIC_CARDS: MetricCard[] = [
  { label: 'Active Tasks',  value: 24,     change: 12,  changeType: 'up',   icon: '📋', color: '#7c6fff', sparkline: [40,55,42,68,52,78,65] },
  { label: 'Completed',     value: 148,    change: 8,   changeType: 'up',   icon: '✅', color: '#00d4aa', sparkline: [30,45,38,60,50,72,65] },
  { label: 'Team Members',  value: 5,      change: 1,   changeType: 'up',   icon: '👥', color: '#ff6b8a', sparkline: [4,4,4,4,5,5,5] },
  { label: 'Sprint Velocity',value: '84pts',change: 12, changeType: 'up',   icon: '⚡', color: '#ffb347', sparkline: [55,62,48,70,58,72,65] },
];

// ─── Sprint Progress ──────────────────────────────────────────────────────────

export const SPRINT_PROGRESS = [
  { label: 'Design',   value: 78, color: '#7c6fff' },
  { label: 'Frontend', value: 62, color: '#00d4aa' },
  { label: 'Backend',  value: 85, color: '#60a5fa' },
  { label: 'QA',       value: 40, color: '#ffb347' },
];

export const CATEGORY_BREAKDOWN = [
  { label: 'Development', value: 42, color: '#7c6fff' },
  { label: 'Design',      value: 28, color: '#00d4aa' },
  { label: 'Research',    value: 18, color: '#ffb347' },
  { label: 'Marketing',   value: 12, color: '#ff6b8a' },
];
