import Link from 'next/link';
import styles from '../admin.module.css';
import { 
  LayoutDashboard, 
  Settings, 
  HelpCircle, 
  Send, 
  BarChart3, 
  LogOut,
  ArrowLeft
} from 'lucide-react';

import { getSession } from '@/lib/auth';
import dbConnect from '@/lib/db';
import Test from '@/models/Test';
import { redirect } from 'next/navigation';

export default async function AdminLayout({ children, params }) {
  const { testId } = await params;
  
  const session = await getSession();
  if (!session) {
    redirect('/login');
  }

  await dbConnect();
  try {
    const test = await Test.findById(testId);
    if (!test) {
      redirect('/admin/dashboard');
    }
    
    // Check if the current user owns this test
    // Legacy tests might have adminPassword but no owner. If strict mode is desired, 
    // we block them or we adapt. For now, strictly require owner match.
    if (test.owner?.toString() !== session.userId) {
      redirect('/admin/dashboard'); // Unauthorized
    }
  } catch (error) {
    redirect('/admin/dashboard');
  }

  return (
    <div className={styles.adminLayout}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo}>
          <Link href="/">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img src="/logo.png" alt="Testilo Logo" style={{ height: '32px', width: 'auto' }} />
              <h2 className={styles.logoText} style={{ margin: 0 }}>Testilo</h2>
            </div>
          </Link>
        </div>
        
        {/* Navigation */}
        <nav className={styles.sidebarNav}>
          <div style={{ padding: '0 1rem 1rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '1rem' }}>
            <Link href="/admin/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94A3B8', fontSize: '0.9rem', textDecoration: 'none', fontWeight: 500 }}>
              <ArrowLeft size={16} /> All Tests
            </Link>
          </div>
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
