'use server';

import dbConnect from '@/lib/db';
import Test from '@/models/Test';
import Submission from '@/models/Submission';
import { redirect } from 'next/navigation';

export async function submitTest(testId, studentData, answers) {
  try {
    await dbConnect();
    const test = await Test.findById(testId);
    
    if (!test) return { success: false, error: 'Test not found' };

    let totalScore = 0;
    let maxPossibleScore = 0;
    
    const processedAnswers = test.questions.map(q => {
      const studentAnswer = answers[q._id.toString()];
      let isCorrect = false;
      let score = 0;
      
      // Simple grading logic for MCQ and T/F
      if (q.type === 'multiple-choice' || q.type === 'true-false') {
        isCorrect = studentAnswer === q.correctAnswer;
      } else if (q.type === 'multiple-response') {
        // Array intersection logic
        isCorrect = Array.isArray(studentAnswer) && 
                    studentAnswer.sort().join(',') === (Array.isArray(q.correctAnswer) ? q.correctAnswer : []).sort().join(',');
      } else if (q.type === 'fill-in-blank' || q.type === 'numeric') {
        isCorrect = studentAnswer?.toString().toLowerCase().trim() === 
                    q.correctAnswer?.toString().toLowerCase().trim();
      }
      
      if (isCorrect) {
        score = q.points;
        totalScore += score;
      } else {
        totalScore -= (test.settings?.negativeMarking || 0);
      }
      
      maxPossibleScore += q.points || 0;
      
      return {
        questionId: q._id,
        answer: studentAnswer,
        isCorrect,
        score
      };
    });

    const percentage = maxPossibleScore > 0 ? (totalScore / maxPossibleScore) * 100 : 0;

    const submission = await Submission.create({
      testId,
      studentName: studentData.name,
      studentIdentifier: studentData.identifier || '',
      answers: processedAnswers,
      totalScore,
      maxPossibleScore,
      percentage,
      timeStarted: studentData.startTime,
      timeEnded: new Date(),
      timeTaken: (new Date() - new Date(studentData.startTime)) / 1000,
      status: 'submitted',
      violations: studentData.violations || 0
    });

    return { success: true, submissionId: submission._id.toString() };
  } catch (error) {
    console.error('Submission Action Error:', error);
    return { success: false, error: error.message || 'An unexpected server error occurred during submission.' };
  }
}
