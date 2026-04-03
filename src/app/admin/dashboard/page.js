import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import dbConnect from '@/lib/db';
import Test from '@/models/Test';
import Link from 'next/link';
import { PlusCircle, Settings, Users, LogOut, FileText } from 'lucide-react';
import Image from 'next/image';
import { logoutUser } from '@/app/auth-actions';
import './dashboard.css';

export default async function AdminDashboard() {
  const session = await getSession();
  
  if (!session) {
    redirect('/login');
  }

  await dbConnect();
  
  const tests = await Test.find({ owner: session.userId }).sort({ createdAt: -1 });

  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar">
        <div className="sidebar-logo">
          <Image src="/logo.png" alt="Testilo" width={140} height={42} />
        </div>
        
        <div className="user-profile">
          <div className="avatar">{session.name.charAt(0).toUpperCase()}</div>
          <div className="user-info">
            <span className="user-name">{session.name}</span>
            <span className="user-email">{session.email}</span>
          </div>
        </div>

        <nav className="dashboard-nav">
          <ul>
            <li className="active">
              <Link href="/admin/dashboard"><FileText size={20} /> My Tests</Link>
            </li>
          </ul>
        </nav>

        <div className="sidebar-footer">
          <form action={logoutUser}>
            <button type="submit" className="logout-btn">
              <LogOut size={20} /> Logout
            </button>
          </form>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>My Tests</h1>
          <form action={async () => {
            'use server';
            const { createBlankTest } = await import('@/app/admin/dashboard-actions');
            await createBlankTest(session.userId);
          }}>
            <button type="submit" className="btn-primary create-btn">
              <PlusCircle size={20} /> Create New Test
            </button>
          </form>
        </header>

        <div className="dashboard-content">
          {tests.length === 0 ? (
            <div className="empty-state">
              <FileText size={48} className="empty-icon" />
              <h2>No Tests Yet</h2>
              <p>You haven't created any tests yet. Click the button above to get started!</p>
            </div>
          ) : (
            <div className="tests-grid">
              {tests.map(test => (
                <div key={test._id.toString()} className="test-card card">
                  <div className="test-card-header">
                    <h3>{test.title}</h3>
                    <span className={`status-badge ${test.status}`}>{test.status}</span>
                  </div>
                  <div className="test-stats">
                    <div className="stat">
                      <span className="stat-value">{test.questions?.length || 0}</span>
                      <span className="stat-label">Questions</span>
                    </div>
                  </div>
                  <div className="test-actions">
                    <Link href={`/admin/${test._id}/settings`} className="btn-secondary sm">
                      <Settings size={16} /> Manage
                    </Link>
                    <Link href={`/admin/${test._id}/results`} className="btn-secondary sm">
                      <Users size={16} /> Results
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
