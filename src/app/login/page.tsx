'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const successMsg = searchParams.get('success');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Invalid email or password');
        setLoading(false);
        return;
      }

      router.push('/dashboard');
      router.refresh();
    } catch {
      setError('An error occurred during authentication');
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1rem',
      }}
    >
      <div className="animate-fade-in" style={{ width: '100%', maxWidth: '450px' }}>
        <div className="card glass-card" style={{ padding: '2.5rem 2rem' }}>
          <h3
            style={{
              textAlign: 'center',
              marginBottom: '1.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              color: 'var(--header-red)',
              letterSpacing: '2px',
              fontSize: '1.75rem',
            }}
          >
            Portal Access
          </h3>

          {successMsg && (
            <div className="alert alert-success">
              <i className="bi bi-check-circle" style={{ marginRight: '0.6rem' }}></i>
              {successMsg}
            </div>
          )}

          {error && (
            <div className="alert alert-danger">
              <i className="bi bi-exclamation-triangle" style={{ marginRight: '0.6rem' }}></i>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label className="form-label">Neural Identity (Email)</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-control"
                placeholder="name@example.com"
              />
            </div>

            <div style={{ marginBottom: '1.75rem' }}>
              <label className="form-label">Access Key (Password)</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-control"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary shadow-neon"
              style={{ width: '100%', padding: '14px', fontSize: '1rem' }}
            >
              {loading ? 'Authorizing...' : 'Authorize Access'}
            </button>
          </form>

          <p style={{ marginTop: '1.75rem', textAlign: 'center', fontSize: '0.85rem', opacity: 0.75, margin: '1.5rem 0 0' }}>
            New identity required?{' '}
            <Link href="/register" style={{ color: 'var(--header-red)', fontWeight: 700 }}>
              Initialize Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div style={{ textAlign: 'center', padding: '4rem' }}>Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
