'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser } from '../auth-actions';
import Link from 'next/link';
import { Mail, Lock, User as UserIcon, AlertCircle } from 'lucide-react';
import Image from 'next/image';

export default function Register() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    const formData = new FormData(e.target);
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setIsLoading(false);
      return;
    }
    
    const result = await registerUser(formData);
    
    if (result.success) {
      router.push('/admin/dashboard');
    } else {
      setError(result.error);
      setIsLoading(false);
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card card glass">
        <div className="auth-header">
          <Image src="/logo.png" alt="Testilo" width={140} height={42} className="auth-logo" />
          <h1>Create an Account</h1>
          <p>Start building tests for free.</p>
        </div>

        {error && (
          <div className="auth-error">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <label>Full Name</label>
            <div className="input-with-icon">
              <UserIcon size={18} className="input-icon" />
              <input type="text" name="name" placeholder="John Doe" required />
            </div>
          </div>

          <div className="input-group">
            <label>Email Address</label>
            <div className="input-with-icon">
              <Mail size={18} className="input-icon" />
              <input type="email" name="email" placeholder="you@example.com" required />
            </div>
          </div>
          
          <div className="input-group">
            <label>Password</label>
            <div className="input-with-icon">
              <Lock size={18} className="input-icon" />
              <input type="password" name="password" placeholder="••••••••" required minLength="6" />
            </div>
          </div>
          
          <div className="input-group">
            <label>Confirm Password</label>
            <div className="input-with-icon">
              <Lock size={18} className="input-icon" />
              <input type="password" name="confirmPassword" placeholder="••••••••" required minLength="6" />
            </div>
          </div>
          
          <button type="submit" className="btn-primary auth-submit" disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div className="auth-footer">
          <p>Already have an account? <Link href="/login" className="auth-link">Login</Link></p>
        </div>
      </div>
    </div>
  );
}
