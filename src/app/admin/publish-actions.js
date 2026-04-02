'use server';

import dbConnect from '@/lib/db';
import Test from '@/models/Test';
import { revalidatePath } from 'next/cache';

export async function publishTest(testId) {
  await dbConnect();
  await Test.findByIdAndUpdate(testId, { status: 'published' });
  revalidatePath(`/admin/${testId}/publish`);
}

export async function unpublishTest(testId) {
  await dbConnect();
  await Test.findByIdAndUpdate(testId, { status: 'draft' });
  revalidatePath(`/admin/${testId}/publish`);
}
