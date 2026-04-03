import { createTest } from './actions';
import styles from './page.module.css';
import Link from 'next/link';

export default function Home() {
  return (
    <div className={styles.homeContainer}>
      <header className={styles.header}>
        <div className="container">
          <nav className={styles.nav}>
            <div className={styles.logoWrapper} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img src="/logo.png" alt="Testilo Logo" style={{ height: '32px', width: 'auto' }} />
              <h2 className={styles.logo} style={{ margin: 0 }}>Testilo</h2>
            </div>
            <div className={styles.navLinks}>
              <a href="#">Pricing</a>
              <a href="#">FAQ</a>
              <a href="#">Features</a>
            </div>
          </nav>
        </div>
      </header>

      <main className={styles.mainHero}>
        <div className="container">
          <div className={styles.heroGrid}>
            <div className={styles.heroText}>
              <h1>Build a Test in Seconds</h1>
              <p>The simplest way to create and grade assessments. Join to start building your tests.</p>
              
              <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <Link href="/register" className="btn-primary" style={{ padding: '16px 32px', fontSize: '1.1rem' }}>
                  Get Started for Free
                </Link>
                <Link href="/login" className="btn-secondary" style={{ padding: '16px 32px', fontSize: '1.1rem', background: 'transparent' }}>
                  Login to Dashboard
                </Link>
              </div>
            </div>
            
            <div className="hero-image">
              <div className="screenshot-mockup card" style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: '#ccc', fontStyle: 'italic' }}>Testilo Dashboard Mockup</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <div className="container">
          <p>© 2026 Testilo. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
