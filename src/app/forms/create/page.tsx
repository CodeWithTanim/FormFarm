'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CreateFormPage() {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/forms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Could not create form');
        setLoading(false);
        return;
      }

      router.push('/forms');
      router.refresh();
    } catch {
      setError('An error occurred while creating the form');
      setLoading(false);
    }
  };

  return (
    <div
      className="container"
      style={{
        position: 'relative',
        zIndex: 1,
        minHeight: '75vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1rem',
      }}
    >
      <div className="animate-fade-in" style={{ width: '100%', maxWidth: '520px' }}>
        <div className="card glass-card" style={{ padding: '2.5rem 2rem' }}>
          <h3
            style={{
              marginBottom: '1.75rem',
              fontWeight: 700,
              fontSize: '1.6rem',
              color: '#ffffff',
            }}
          >
            Create New Form
          </h3>

          {error && (
            <div className="alert alert-danger">
              <i className="bi bi-exclamation-triangle" style={{ marginRight: '0.6rem' }}></i>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.75rem' }}>
              <label className="form-label" style={{ fontSize: '0.85rem' }}>
                Form Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="form-control"
                placeholder="e.g. Contact Page Form, Newsletter Signup"
                style={{ padding: '12px 14px' }}
              />
              <div className="form-text">This name is just for your reference.</div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
                style={{ padding: '12px 24px' }}
              >
                {loading ? 'Creating...' : 'Create Form'}
              </button>
              <Link href="/forms" className="btn btn-light" style={{ padding: '12px 24px' }}>
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
