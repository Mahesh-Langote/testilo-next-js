import dbConnect from '@/lib/db';
import Test from '@/models/Test';
import Submission from '@/models/Submission';
import { CheckCircle, XCircle, Clock, Trophy, User, ShieldAlert } from 'lucide-react';
import styles from '../../../review.module.css';

export default async function ReviewPage({ params }) {
  const { testId, submissionId } = await params;
  
  await dbConnect();
  const test = await Test.findById(testId).lean();
  const submission = await Submission.findById(submissionId).lean();

  if (!test || !submission) return <div>Data not found</div>;

  const { settings } = test;
  const { review } = settings;

  return (
    <div className={styles.reviewView}>
      <div className={`${styles.summaryCard} card glass`}>
        <div className={styles.summaryHeader}>
          <Trophy size={48} color={submission.percentage >= 50 ? 'var(--primary)' : 'var(--error)'} />
          <div className={styles.scoreMain}>
            <h2>Your Score: {submission.percentage.toFixed(1)}%</h2>
            <p>{submission.totalScore} / {submission.maxPossibleScore} points</p>
          </div>
        </div>
        
        <div className={styles.summaryMeta}>
          <div className={styles.metaItem}>
            <User size={18} />
            <span>Participant: {submission.studentName} {submission.studentIdentifier ? `(${submission.studentIdentifier})` : ''}</span>
          </div>
          <div className={styles.metaItem}>
            <Clock size={18} />
            <span>Time Taken: {Math.floor(submission.timeTaken / 60)}m {Math.floor(submission.timeTaken % 60)}s</span>
          </div>
          {(submission.violations > 0 || test.settings?.browser?.proctoring) && (
            <div className={styles.metaItem}>
              <ShieldAlert size={18} color={submission.violations > 0 ? "var(--error)" : "#10b981"} />
              <span style={{ color: submission.violations > 0 ? 'var(--error)' : '#10b981' }}>
                {submission.violations > 0 
                  ? `Activity Warnings: ${submission.violations} time(s) (Tab/Window Switching)` 
                  : 'Proctoring: Clear (No switching detected)'}
              </span>
            </div>
          )}
        </div>

        {review.conclusionText && (
          <div className={styles.conclusionText}>
            {review.conclusionText}
          </div>
        )}
      </div>

      {review.showOutline && (
        <div className={styles.reviewOutline}>
          {test.questions.map((q, index) => {
            const subAnswer = submission.answers.find(a => a.questionId.toString() === q._id.toString());
            return (
              <div key={q._id} className={`${styles.questionReview} card`}>
                <div className={styles.qHeader}>
                  <span className={styles.qNum}>Question {index + 1}</span>
                  {review.showCorrectness && (
                    <span className={`${styles.correctnessLabel} ${subAnswer?.isCorrect ? styles.correct : styles.incorrect}`}>
                      {subAnswer?.isCorrect ? <CheckCircle size={18} /> : <XCircle size={18} />}
                      {subAnswer?.isCorrect ? 'Correct' : 'Incorrect'}
                    </span>
                  )}
                  <span className={styles.pointsLabel}>{subAnswer?.score} / {q.points} pt</span>
                </div>

                <div className={styles.qText}>{q.text}</div>
                
                <div className={styles.qResponse}>
                  <p><strong>Your Answer:</strong> {subAnswer?.answer || '(No answer)'}</p>
                  
                  {review.showCorrectAnswers && !subAnswer?.isCorrect && (
                    <p className={styles.correctAnswer}><strong>Correct Answer:</strong> {q.correctAnswer}</p>
                  )}
                  
                  {review.showExplanations && q.explanation && (
                    <div className={styles.explanation}>
                      <strong>Explanation:</strong> {q.explanation}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className={styles.footerActions}>
        <a href="/" className="btn-primary">Back to Home</a>
      </div>
    </div>
  );
}
