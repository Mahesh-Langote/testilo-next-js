'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '../auth-actions';
import Link from 'next/link';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import Image from 'next/image';

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    const formData = new FormData(e.target);
    const result = await loginUser(formData);
    
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
          <h1>Welcome Back</h1>
          <p>Login to manage your tests.</p>
        </div>

        {error && (
          <div className="auth-error">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
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
              <input type="password" name="password" placeholder="••••••••" required />
            </div>
          </div>
          
          <button type="submit" className="btn-primary auth-submit" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login to Dashboard'}
          </button>
        </form>

        <div className="auth-footer">
          <p>Don't have an account? <Link href="/register" className="auth-link">Sign up</Link></p>
        </div>
      </div>
    </div>
  );
}
