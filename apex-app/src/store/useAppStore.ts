import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Task, TaskStatus, Notification, ChatMessage, User } from '../types';
import {
  INITIAL_TASKS,
  NOTIFICATIONS as INIT_NOTIFS,
  INITIAL_CHAT,
  USERS,
  ME,
} from '../data/mockData';

// ─── Types ───────────────────────────────────────────────────────────────────

type Theme = 'dark' | 'light';
type PageId = 'dashboard' | 'tasks' | 'calendar' | 'analytics' | 'team' | 'inbox' | 'settings';

interface AppState {
  // Auth
  isLoggedIn: boolean;
  currentUser: User;
  login:  () => void;
  logout: () => void;

  // Navigation
  activePage: PageId;
  setPage: (page: PageId) => void;

  // Theme
  theme: Theme;
  toggleTheme: () => void;

  // Tasks / Kanban
  tasks: Task[];
  moveTask:   (taskId: string, newStatus: TaskStatus) => void;
  addTask:    (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  deleteTask: (taskId: string) => void;

  // Notifications
  notifications: Notification[];
  unreadCount:   number;
  markAllRead:   () => void;
  dismissNotif:  (id: string) => void;

  // Chat
  chatMessages: ChatMessage[];
  sendMessage:  (content: string) => void;

  // Search
  searchQuery: string;
  setSearch:   (q: string) => void;

  // UI state
  notifPanelOpen: boolean;
  setNotifPanel:  (open: boolean) => void;
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
}

// ─── Store ───────────────────────────────────────────────────────────────────

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Auth
      isLoggedIn: false,
      currentUser: ME,
      login:  () => set({ isLoggedIn: true }),
      logout: () => set({ isLoggedIn: false, activePage: 'dashboard' }),

      // Navigation
      activePage: 'dashboard',
      setPage: (page) => set({ activePage: page, notifPanelOpen: false }),

      // Theme
      theme: 'dark',
      toggleTheme: () => {
        const next = get().theme === 'dark' ? 'light' : 'dark';
        document.documentElement.classList.toggle('light', next === 'light');
        set({ theme: next });
      },

      // Tasks
      tasks: INITIAL_TASKS,
      moveTask: (taskId, newStatus) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === taskId
              ? { ...t, status: newStatus, updatedAt: new Date().toISOString() }
              : t
          ),
        })),
      addTask: (task) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              ...task,
              id: `t${Date.now()}`,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
          ],
        })),
      deleteTask: (taskId) =>
        set((state) => ({ tasks: state.tasks.filter((t) => t.id !== taskId) })),

      // Notifications
      notifications: INIT_NOTIFS,
      get unreadCount() { return get().notifications.filter((n) => !n.read).length; },
      markAllRead: () =>
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
        })),
      dismissNotif: (id) =>
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        })),

      // Chat
      chatMessages: INITIAL_CHAT,
      sendMessage: (content) => {
        const { currentUser } = get();
        set((state) => ({
          chatMessages: [
            ...state.chatMessages,
            {
              id: `m${Date.now()}`,
              userId: currentUser.id,
              userName: currentUser.name,
              userColor: currentUser.color,
              userInitials: currentUser.initials,
              content,
              timestamp: new Date().toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' }),
              isMe: true,
            },
          ],
        }));
        // Simulate a reply after 1.5s
        setTimeout(() => {
          const responders = USERS.filter((u) => u.id !== 'me');
          const responder = responders[Math.floor(Math.random() * responders.length)];
          const replies = [
            'On it! 👍',
            'Makes sense, let me check',
            'Agreed, will update the PR',
            'Sounds good to me ✅',
            'Can we sync on this quickly?',
          ];
          set((state) => ({
            chatMessages: [
              ...state.chatMessages,
              {
                id: `m${Date.now() + 1}`,
                userId: responder.id,
                userName: responder.name,
                userColor: responder.color,
                userInitials: responder.initials,
                content: replies[Math.floor(Math.random() * replies.length)],
                timestamp: new Date().toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' }),
                isMe: false,
              },
            ],
          }));
        }, 1500);
      },

      // Search
      searchQuery: '',
      setSearch: (q) => set({ searchQuery: q }),

      // UI state
      notifPanelOpen: false,
      setNotifPanel: (open) => set({ notifPanelOpen: open }),
      sidebarCollapsed: false,
      toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
    }),
    {
      name: 'apex-app-store',
      partialize: (state: AppState) => ({
        theme: state.theme,
        sidebarCollapsed: state.sidebarCollapsed,
        isLoggedIn: state.isLoggedIn,
      }),
    }
  )
);
