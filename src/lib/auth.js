import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import dbConnect from '@/lib/db';
import Test from '@/models/Test';

const JWT_SECRET = process.env.JWT_SECRET || 'testilo_super_secret_jwt_key_that_should_be_in_env!';

export async function signToken(payload) {
  // Sign the token with an expiration
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
}

export async function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null; // Invalid or expired token
  }
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get('testilo_token')?.value;
  
  if (!token) return null;
  return await verifyToken(token);
}

export async function setSession(token) {
  const cookieStore = await cookies();
  cookieStore.set('testilo_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 24 * 60 * 60, // 24 hours
    path: '/'
  });
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete('testilo_token');
}

export async function requireTestOwner(testId) {
  const session = await getSession();
  if (!session) {
    redirect('/login');
  }

  await dbConnect();
  const test = await Test.findById(testId).select('owner').lean();
  
  // Strict matching
  if (!test || test?.owner?.toString() !== session.userId) {
    redirect('/admin/dashboard');
  }
  
  return true;
}
