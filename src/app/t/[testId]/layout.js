import dbConnect from '@/lib/db';
import Test from '@/models/Test';
import styles from './student.module.css';

export default async function StudentLayout({ children, params }) {
  const { testId } = await params;
  
  await dbConnect();
  const test = await Test.findById(testId).lean();

  if (!test) return <div>Test not found</div>;

  const themeHeaderClass = {
    corporate: styles.headerCorporate,
    crimson: styles.headerCrimson,
    genghis: styles.headerGenghis
  }[test.theme] || '';

  return (
    <div className={`${styles.studentLayout} theme-${test.theme || 'default'}`}>
      <header className={`${styles.studentHeader} ${themeHeaderClass}`}>
        <div className="container">
          <div className={styles.headerInner}>
            <h1 className={styles.testTitle}>{test.title}</h1>
          </div>
        </div>
      </header>
      
      <main className={styles.studentMain}>
        <div className="container">
          {children}
        </div>
      </main>
    </div>
  );
}
