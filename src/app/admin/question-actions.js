'use server';

import dbConnect from '@/lib/db';
import Test from '@/models/Test';
import { revalidatePath } from 'next/cache';

export async function addQuestion(testId, type) {
  await dbConnect();
  
  const newQuestion = {
    type,
    text: 'New Question',
    points: 1,
    options: type === 'multiple-choice' || type === 'multiple-response' ? ['Option 1', 'Option 2'] : [],
    correctAnswer: type === 'true-false' ? 'true' : '',
    order: 0 // Will adjust later
  };

  await Test.findByIdAndUpdate(testId, {
    $push: { questions: newQuestion }
  });

  revalidatePath(`/admin/${testId}/questions`);
}

export async function deleteQuestion(testId, questionId) {
  await dbConnect();
  await Test.findByIdAndUpdate(testId, {
    $pull: { questions: { _id: questionId } }
  });
  revalidatePath(`/admin/${testId}/questions`);
}

export async function updateQuestion(testId, questionId, update) {
  await dbConnect();
  
  const test = await Test.findById(testId);
  const question = test.questions.id(questionId);
  Object.assign(question, update);
  
  await test.save();
  revalidatePath(`/admin/${testId}/questions`);
}

export async function reorderQuestions(testId, newOrder) {
  // newOrder is array of question IDs
  await dbConnect();
  const test = await Test.findById(testId);
  
  const questionsMap = new Map(test.questions.map(q => [q._id.toString(), q]));
  test.questions = newOrder.map(id => questionsMap.get(id)).filter(Boolean);
  
  await test.save();
  revalidatePath(`/admin/${testId}/questions`);
}
