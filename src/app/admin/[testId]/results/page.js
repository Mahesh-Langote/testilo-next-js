import dbConnect from '@/lib/db';
import Test from '@/models/Test';
import Submission from '@/models/Submission';
import { User, Clock, FileText, Download, Trash2 } from 'lucide-react';
import styles from './results.module.css';

export default async function ResultsPage({ params }) {
  const { testId } = await params;
  
  await dbConnect();
  const test = await Test.findById(testId).lean();
  const submissions = await Submission.find({ testId }).sort({ timeEnded: -1 }).lean();

  if (!test) return <div>Test not found</div>;

  return (
    <div className={styles.resultsView}>
      <div className={styles.resultsHeader}>
        <h1>Results</h1>
        <div className={styles.resultsActions}>
          <button className={styles.btnSecondary}>
            <Download size={18} />
            Export CSV
          </button>
        </div>
      </div>

      <section className={`${styles.statsSummary}`}>
        <div className={`${styles.statCard} card`}>
          <div className={styles.statLabel}>Average Score</div>
          <div className={styles.statValue}>
            {submissions.length > 0 
              ? (submissions.reduce((sum, s) => sum + s.percentage, 0) / submissions.length).toFixed(1)
              : 0}%
          </div>
        </div>
        <div className={`${styles.statCard} card`}>
          <div className={styles.statLabel}>Total Submissions</div>
          <div className={styles.statValue}>{submissions.length}</div>
        </div>
        <div className={`${styles.statCard} card`}>
          <div className={styles.statLabel}>Top Score</div>
          <div className={styles.statValue}>
            {submissions.length > 0 
              ? Math.max(...submissions.map(s => s.percentage)).toFixed(1) 
              : 0}%
          </div>
        </div>
      </section>

      <section className={`${styles.resultsTableContainer} card`}>
        {submissions.length === 0 ? (
          <div className={styles.emptyResults}>
            <User size={48} />
            <p>No submissions yet. Share your test to collect results!</p>
          </div>
        ) : (
          <table className={styles.resultsTable}>
            <thead>
              <tr>
                <th>Student</th>
                <th>Score</th>
                <th>Percentage</th>
                <th>Violations</th>
                <th>Duration</th>
                <th>Finished</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((sub) => (
                <tr key={sub._id}>
                  <td className={styles.studentCell}>
                    <User size={16} />
                    {sub.studentName}
                  </td>
                  <td>{sub.totalScore} / {sub.maxPossibleScore}</td>
                  <td>
                    <div className={styles.percBarContainer}>
                      <div className={styles.percBar} style={{ width: `${sub.percentage}%` }}></div>
                      <span>{sub.percentage.toFixed(1)}%</span>
                    </div>
                  </td>
                  <td>{sub.violations || 0}</td>
                  <td>{Math.floor(sub.timeTaken / 60)}m {Math.floor(sub.timeTaken % 60)}s</td>
                  <td>{new Date(sub.timeEnded).toLocaleString()}</td>
                  <td className={styles.actionsCell}>
                    <a href={`/t/${testId}/review/${sub._id}`} target="_blank" rel="noopener noreferrer">
                      <FileText size={18} />
                    </a>
                    <button className={styles.deleteSub}>
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
