import Link from 'next/link';
import styles from '../admin.module.css';
import { 
  LayoutDashboard, 
  Settings, 
  HelpCircle, 
  Send, 
  BarChart3, 
  LogOut 
} from 'lucide-react';

export default async function AdminLayout({ children, params }) {
  const { testId } = await params;

  return (
    <div className={styles.adminLayout}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo}>
          <Link href="/">
            <h2 className={styles.logoText}>Testmoz</h2>
          </Link>
        </div>
        
        {/* Navigation */}
        <nav className={styles.sidebarNav}>
          <ul>
            <li>
              <Link href={`/admin/${testId}`}>
                <div className={styles.navItem}>
                  <LayoutDashboard size={20} />
                  <span>Dashboard</span>
                </div>
              </Link>
            </li>
            <li>
              <Link href={`/admin/${testId}/settings`}>
                <div className={styles.navItem}>
                  <Settings size={20} />
                  <span>Settings</span>
                </div>
              </Link>
            </li>
            <li>
              <Link href={`/admin/${testId}/questions`}>
                <div className={styles.navItem}>
                  <HelpCircle size={20} />
                  <span>Questions</span>
                </div>
              </Link>
            </li>
            <li>
              <Link href={`/admin/${testId}/publish`}>
                <div className={styles.navItem}>
                  <Send size={20} />
                  <span>Publish</span>
                </div>
              </Link>
            </li>
            <li>
              <Link href={`/admin/${testId}/results`}>
                <div className={styles.navItem}>
                  <BarChart3 size={20} />
                  <span>Results</span>
                </div>
              </Link>
            </li>
          </ul>
        </nav>
        
        {/* Footer actions */}
        <div className={styles.sidebarFooter}>
          <Link href="/">
            <div className={`${styles.navItem} ${styles.logout}`}>
              <LogOut size={20} />
              <span>Logout</span>
            </div>
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className={styles.adminContent}>
        <header className={styles.adminHeader}>
          <div className={styles.testInfo}>
            <span className={styles.testName}>Test: {testId}</span>
          </div>
        </header>
        <div className={styles.contentInner}>
          {children}
        </div>
      </main>
    </div>
  );
}
