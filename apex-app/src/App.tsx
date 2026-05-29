import { useEffect } from 'react';
import { useAppStore } from './store/useAppStore';
import { Sidebar }   from './components/layout/Sidebar';
import { Topbar }    from './components/layout/Topbar';
import { LoginPage }     from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { TasksPage }     from './pages/TasksPage';
import { CalendarPage }  from './pages/CalendarPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { TeamPage }      from './pages/TeamPage';
import { SettingsPage }  from './pages/SettingsPage';
import { InboxPage }     from './pages/InboxPage';

// ─── Page router ──────────────────────────────────────────────────────────────
function PageContent() {
  const { activePage } = useAppStore();
  switch (activePage) {
    case 'dashboard': return <DashboardPage />;
    case 'tasks':     return <TasksPage />;
    case 'calendar':  return <CalendarPage />;
    case 'analytics': return <AnalyticsPage />;
    case 'team':      return <TeamPage />;
    case 'inbox':     return <InboxPage />;
    case 'settings':  return <SettingsPage />;
    default:          return <DashboardPage />;
  }
}

// ─── App shell ────────────────────────────────────────────────────────────────
function AppShell() {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="main-area">
        <Topbar />
        <main className="content-area">
          <PageContent />
        </main>
      </div>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function App() {
  const { isLoggedIn, theme } = useAppStore();

  // Apply theme class on mount + change
  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light');
  }, [theme]);

  return isLoggedIn ? <AppShell /> : <LoginPage />;
}
