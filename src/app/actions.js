'use server';

import dbConnect from '@/lib/db';
import Test from '@/models/Test';
import { redirect } from 'next/navigation';

export async function createTest(formData) {
  const title = formData.get('title');
  const password = formData.get('password');

  if (!title || !password) {
    throw new Error('Title and password are required');
  }

  await dbConnect();
  
  const test = await Test.create({
    title,
    adminPassword: password,
    settings: {
      review: {
        showScore: true,
        showOutline: true,
        showCorrectness: true,
        showCorrectAnswers: true,
        showExplanations: true
      }
    }
  });

  redirect(`/admin/${test._id}`);
}
