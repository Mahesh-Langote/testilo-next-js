import dbConnect from '@/lib/db';
import Test from '@/models/Test';
import StudentView from './StudentView';

export default async function StudentPage({ params }) {
  const { testId } = await params;
  
  await dbConnect();
  const test = await Test.findById(testId).lean();

  if (!test) return <div>Test not found</div>;
  if (test.status !== 'published') {
    return (
      <div className="card glass" style={{ padding: '4rem', textAlign: 'center' }}>
        <h2>This test is not yet available.</h2>
        <p>Please contact your instructor.</p>
      </div>
    );
  }

  return (
    <StudentView test={JSON.parse(JSON.stringify(test))} testId={testId} />
  );
}
