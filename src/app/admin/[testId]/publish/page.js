import dbConnect from '@/lib/db';
import Test from '@/models/Test';
import { publishTest, unpublishTest } from '../../publish-actions';
import { CheckCircle2, AlertCircle, ExternalLink, Printer, FileText, Download } from 'lucide-react';
import styles from './publish.module.css';

export default async function PublishPage({ params }) {
  const { testId } = await params;
  
  await dbConnect();
  const test = await Test.findById(testId).lean();

  if (!test) return <div>Test not found</div>;

  const testUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/t/${testId}`;
  const isPublished = test.status === 'published';
  const hasQuestions = test.questions?.length > 0;

  const handlePublish = publishTest.bind(null, testId);
  const handleUnpublish = unpublishTest.bind(null, testId);

  return (
    <div className={styles.publishView}>
      <h1>Publish {test.title}</h1>
      
      <section className={`${styles.publishStatus} card ${isPublished ? styles.statusPublished : styles.statusDraft}`}>
        <div className={styles.statusHeader}>
          {isPublished ? (
            <div className={`${styles.statusIndicator} ${styles.statusIndicatorPublished}`}>
              <CheckCircle2 size={32} />
              <span>Your test is published and available!</span>
            </div>
          ) : (
            <div className={`${styles.statusIndicator} ${styles.statusIndicatorDraft}`}>
              <AlertCircle size={32} />
              <span>Your test is in draft mode.</span>
            </div>
          )}
          
          <form action={isPublished ? handleUnpublish : handlePublish}>
            <button type="submit" className={`${styles.btnPublish} ${isPublished ? styles.btnRed : styles.btnGreen}`} disabled={!hasQuestions && !isPublished}>
              {isPublished ? 'Unpublish' : 'Publish'}
            </button>
          </form>
        </div>

        {isPublished && (
          <div className={styles.urlContainer}>
            <p>Students can take your test at:</p>
            <div className={styles.urlBox}>
              <input type="text" readOnly value={testUrl} />
              <a href={testUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink size={18} />
              </a>
            </div>
          </div>
        )}
        
        {!hasQuestions && !isPublished && (
          <div className={styles.warningBox}>
            <AlertCircle size={18} />
            <span>You need to add at least one question before publishing.</span>
          </div>
        )}
      </section>

      <section className={styles.exportSection}>
        <h2>Export / Print</h2>
        <p>Testilo tests are meant to be taken online. But if you need a paper copy, you can print one here.</p>
        
        <div className={styles.exportGrid}>
          <div className={`${styles.exportCard} card`}>
            <Printer size={24} />
            <div>
              <h3>View/Print in browser</h3>
              <p>Opens a printer-friendly version of your test.</p>
            </div>
          </div>
          <div className={`${styles.exportCard} card`}>
            <FileText size={24} />
            <div>
              <h3>Download as Word Doc</h3>
              <p>Download a .docx file for editing.</p>
            </div>
          </div>
          <div className={`${styles.exportCard} card`}>
            <Download size={24} />
            <div>
              <h3>CSV Export</h3>
              <p>Export all results to an Excel-friendly format.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
