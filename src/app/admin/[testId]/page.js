import { 
  Settings, 
  HelpCircle, 
  Send, 
  BarChart3, 
  Copy, 
  Share2, 
  Trash2, 
  Lock 
} from 'lucide-react';
import { requireTestOwner } from '@/lib/auth';
import dbConnect from '@/lib/db';
import Test from '@/models/Test';
import styles from '../dashboard.module.css';

export default async function DashboardPage({ params }) {
  const { testId } = await params;
  await requireTestOwner(testId);
  
  await dbConnect();
  const test = await Test.findById(testId).lean();

  if (!test) {
    return <div>Test not found</div>;
  }

  const tasks = [
    {
      id: '0',
      title: 'Bookmark this page and write down your password',
      description: 'It is absolutely critical that you do this! There is no way to recover the URL or password.',
      icon: <Lock size={24} />,
      status: styles.critical
    },
    {
      id: '1',
      title: 'Adjust settings',
      description: 'Change the test name, description and what happens after the test is graded.',
      icon: <Settings size={22} />,
      link: `/admin/${testId}/settings`
    },
    {
      id: '2',
      title: 'Edit questions',
      description: "It's not much of a test if it doesn't have questions.",
      icon: <HelpCircle size={22} />,
      link: `/admin/${testId}/questions`
    },
    {
      id: '3',
      title: 'Publish & distribute',
      description: 'Publish your test, distribute it to your students and start collecting results.',
      icon: <Send size={22} />,
      link: `/admin/${testId}/publish`
    },
    {
      id: '4',
      title: 'View results',
      description: 'See how well your students did on the test.',
      icon: <BarChart3 size={22} />,
      link: `/admin/${testId}/results`
    }
  ];

  return (
    <div className={styles.dashboardView}>
      <section className={styles.welcome}>
        <h1>{test.title} - Dashboard</h1>
        <p>This is the control panel where you can adjust settings, add questions, publish the test, and view results.</p>
      </section>

      <section className={styles.tasksGrid}>
        <h2>Tasks</h2>
        <div className={styles.tasksList}>
          {tasks.map((task) => (
            <div key={task.id} className={`${styles.taskCard} ${task.status || ''}`}>
              <div className={styles.taskNumber}>{task.id}.</div>
              <div className={styles.taskIcon}>{task.icon}</div>
              <div className={styles.taskInfo}>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                {task.link && (
                  <a href={task.link} className={styles.taskLink}>Go to {task.title.toLowerCase()} →</a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.utilities}>
        <h2>Test Utilities</h2>
        <div className={styles.utilsGrid}>
          <div className={styles.utilCard}>
            <Copy size={20} />
            <div className={styles.utilInfo}>
              <h3>Clone</h3>
              <p>Create a duplicate copy of this test.</p>
            </div>
          </div>
          <div className={styles.utilCard}>
            <Share2 size={20} />
            <div className={styles.utilInfo}>
              <h3>Share</h3>
              <p>Share a copy of this test with a co-worker.</p>
            </div>
          </div>
          <div className={styles.utilCard}>
            <Trash2 size={20} />
            <div className={styles.utilInfo}>
              <h3>Clear Result Data</h3>
              <p>Clear out the data on the Results page.</p>
            </div>
          </div>
          <div className={styles.utilCard}>
            <Lock size={20} />
            <div className={styles.utilInfo}>
              <h3>Change Admin Password</h3>
              <p>Update the password for this test.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
