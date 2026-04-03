'use server';

import dbConnect from '@/lib/db';
import Test from '@/models/Test';
import { revalidatePath } from 'next/cache';

export async function updateTestSettings(testId, formData) {
  await dbConnect();
  
  const update = {
    title: formData.get('title'),
    introduction: formData.get('introduction'),
    theme: formData.get('theme'),
    language: formData.get('language'),
    settings: {
      pagination: formData.get('pagination'),
      randomizeQuestions: formData.get('randomizeQuestions') === 'on',
      allowBlank: formData.get('allowBlank') === 'on',
      negativeMarking: parseFloat(formData.get('negativeMarking') || 0),
      
      review: {
        showScore: formData.get('showScore') === 'on',
        showOutline: formData.get('showOutline') === 'on',
        showCorrectness: formData.get('showCorrectness') === 'on',
        showCorrectAnswers: formData.get('showCorrectAnswers') === 'on',
        showExplanations: formData.get('showExplanations') === 'on',
        conclusionText: formData.get('conclusionText')
      },
      
      access: {
        mode: formData.get('accessMode'),
        passcode: formData.get('passcode'),
        timeLimit: parseInt(formData.get('timeLimit') || 0),
        attempts: parseInt(formData.get('attempts') || 0)
      },
      
      browser: {
        disableRightClick: formData.get('disableRightClick') === 'on',
        disableCopyPaste: formData.get('disableCopyPaste') === 'on',
        proctoring: formData.get('proctoring') === 'on'
      }
    },
    updatedAt: new Date()
  };

  await Test.findByIdAndUpdate(testId, update);
  
  revalidatePath(`/admin/${testId}/settings`);
  return { success: true };
}
