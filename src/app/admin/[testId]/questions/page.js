import dbConnect from '@/lib/db';
import Test from '@/models/Test';
import { requireTestOwner } from '@/lib/auth';
import QuestionList from './QuestionList';
import styles from './questions.module.css';

export default async function QuestionsPage({ params }) {
  const { testId } = await params;
  await requireTestOwner(testId);
  
  await dbConnect();
  const test = await Test.findById(testId).lean();

  if (!test) return <div>Test not found</div>;

  return (
    <div className={styles.questionsView}>
      <div className={styles.questionsHeader}>
        <h1>Questions</h1>
        <div className={styles.stats}>
          <span>{test.questions.length || 0} items</span>
          <span>{test.questions.reduce((sum, q) => sum + (q.points || 0), 0)} points total</span>
        </div>
      </div>
      
      <QuestionList testId={testId} initialQuestions={JSON.parse(JSON.stringify(test.questions))} />
    </div>
  );
}
