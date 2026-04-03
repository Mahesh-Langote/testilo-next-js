'use server';

import dbConnect from '@/lib/db';
import Test from '@/models/Test';
import { redirect } from 'next/navigation';

export async function createBlankTest(userId) {
  await dbConnect();
  
  const test = await Test.create({
    title: 'Untitled Test',
    owner: userId,
    status: 'draft',
    settings: {
      review: {
        showScore: true,
        showOutline: true,
        showCorrectness: true,
        showCorrectAnswers: true,
        showExplanations: true
      },
      access: {
        mode: 'anyone'
      },
      browser: {}
    }
  });

  redirect(`/admin/${test._id}/publish`);
}
