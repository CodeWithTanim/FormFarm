'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to create account');
        setLoading(false);
        return;
      }

      router.push(`/login?success=${encodeURIComponent('Account created! Please log in using your email and password.')}`);
    } catch {
      setError('An error occurred during registration');
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
            Identity Creation
          </h3>

          {error && (
            <div className="alert alert-danger">
              <i className="bi bi-exclamation-triangle" style={{ marginRight: '0.6rem' }}></i>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.25rem' }}>
              <label className="form-label">Full Designation (Name)</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="form-control"
                placeholder="John Doe"
              />
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
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
              {loading ? 'Initializing...' : 'Initialize Identity'}
            </button>
          </form>

          <p style={{ marginTop: '1.75rem', textAlign: 'center', fontSize: '0.85rem', opacity: 0.75, margin: '1.5rem 0 0' }}>
            Existing identity check?{' '}
            <Link href="/login" style={{ color: 'var(--header-red)', fontWeight: 700 }}>
              Access Portal
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
