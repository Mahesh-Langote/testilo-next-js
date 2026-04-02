'use server';

import dbConnect from '@/lib/db';
import Test from '@/models/Test';
import Submission from '@/models/Submission';
import { redirect } from 'next/navigation';

export async function submitTest(testId, studentData, answers) {
  await dbConnect();
  const test = await Test.findById(testId);
  
  if (!test) throw new Error('Test not found');

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
                  studentAnswer.sort().join(',') === q.correctAnswer.sort().join(',');
    } else if (q.type === 'fill-in-blank' || q.type === 'numeric') {
      isCorrect = studentAnswer?.toString().toLowerCase().trim() === 
                  q.correctAnswer?.toString().toLowerCase().trim();
    }
    
    if (isCorrect) {
      score = q.points;
      totalScore += score;
    } else {
      totalScore -= (test.settings.negativeMarking || 0);
    }
    
    maxPossibleScore += q.points;
    
    return {
      questionId: q._id,
      answer: studentAnswer,
      isCorrect,
      score
    };
  });

  const percentage = (totalScore / maxPossibleScore) * 100;

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
    status: 'submitted'
  });

  redirect(`/t/${testId}/review/${submission._id}`);
}
