import { createTest } from './actions';
import styles from './page.module.css';

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
              <p>The simplest way to create and grade assessments. No signup required to start building.</p>
              
              <div className="card glass">
                <form action={createTest}>
                  <div className="input-group">
                    <label htmlFor="title">Test Name</label>
                    <input type="text" id="title" name="title" placeholder="e.g. History Mid-Term" required />
                  </div>
                  <div className="input-group">
                    <label htmlFor="password">Admin Password</label>
                    <input type="password" id="password" name="password" placeholder="Don't lose this!" required />
                    <small className={styles.small}>You'll need this to manage your test later.</small>
                  </div>
                  <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                    Build Test
                  </button>
                </form>
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
