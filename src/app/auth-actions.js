'use server';

import dbConnect from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { signToken, setSession, clearSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export async function registerUser(formData) {
  try {
    await dbConnect();
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');

    if (!name || !email || !password) {
      return { success: false, error: 'All fields are required.' };
    }

    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      return { success: false, error: 'Email already in use.' };
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    
    const user = await User.create({
      name,
      email: email.toLowerCase().trim(),
      password: hashedPassword
    });

    const token = await signToken({ userId: user._id.toString(), email: user.email, name: user.name });
    await setSession(token);
    
    return { success: true };
  } catch (error) {
    console.error('Registration Error:', error);
    return { success: false, error: 'An unexpected error occurred during registration.' };
  }
}

export async function loginUser(formData) {
  try {
    await dbConnect();
    const email = formData.get('email');
    const password = formData.get('password');

    if (!email || !password) {
      return { success: false, error: 'Email and password are required.' };
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return { success: false, error: 'Invalid email or password.' };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { success: false, error: 'Invalid email or password.' };
    }

    const token = await signToken({ userId: user._id.toString(), email: user.email, name: user.name });
    await setSession(token);

    return { success: true };
  } catch (error) {
    console.error('Login Error:', error);
    return { success: false, error: 'An unexpected error occurred during login.' };
  }
}

export async function logoutUser() {
  await clearSession();
  redirect('/');
}
