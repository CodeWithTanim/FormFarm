'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface FormItem {
  id: string;
  form_name: string;
  form_key: string;
  created_at: string;
}

export default function FormsPage() {
  const [forms, setForms] = useState<FormItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [origin, setOrigin] = useState('');
  const router = useRouter();

  const fetchForms = async () => {
    try {
      const res = await fetch('/api/forms');
      if (res.status === 401) {
        router.push('/login');
        return;
      }
      const data = await res.json();
      setForms(data.forms || []);
    } catch (err) {
      console.error('Error fetching forms:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setOrigin(window.location.origin);
    fetchForms();
  }, []);

  const handleCopy = (id: string, formKey: string) => {
    const url = `${origin}/f/${formKey}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const handleTerminate = async (id: string) => {
    const confirmed = window.confirm(
      'WARNING: Are you sure you want to terminate this node and wipe all its data?'
    );
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/forms/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setForms((prev) => prev.filter((f) => f.id !== id));
      } else {
        alert('Failed to terminate form');
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('An error occurred');
    }
  };

  return (
    <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: '2.5rem', paddingBottom: '3.5rem' }}>
      {/* Page Header */}
      <div
        className="animate-fade-in"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2.5rem',
        }}
      >
        <h2 style={{ margin: 0, fontWeight: 700, display: 'flex', alignItems: 'center' }}>
          <i className="bi bi-grid-fill" style={{ marginRight: '0.8rem', color: 'var(--accent-red)' }}></i>
          My Data Nodes
        </h2>
        <Link href="/forms/create" className="btn btn-primary" style={{ padding: '10px 22px' }}>
          Initialize Node
        </Link>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem', opacity: 0.6 }}>Loading data nodes...</div>
      ) : forms.length === 0 ? (
        <div
          className="card glass-card animate-fade-in"
          style={{ padding: '4rem 2rem', textAlign: 'center' }}
        >
          <div style={{ color: 'var(--accent-red)', opacity: 0.5, fontSize: '4rem', marginBottom: '1.25rem' }}>
            <i className="bi bi-slash-circle"></i>
          </div>
          <p style={{ opacity: 0.75, fontSize: '1.25rem', marginBottom: '1.75rem' }}>
            No active neural endpoints detected on your network.
          </p>
          <div>
            <Link href="/forms/create" className="btn btn-primary btn-lg">
              Create Your First Node
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid-2">
          {forms.map((form, index) => {
            const endpointUrl = `${origin}/f/${form.form_key}`;
            const isCopied = copiedId === form.id;

            return (
              <div
                key={form.id}
                className="card glass-card animate-fade-in"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '1.75rem',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '1.5rem',
                  }}
                >
                  <div>
                    <h4 style={{ fontWeight: 700, margin: '0 0 0.25rem', color: '#ffffff', fontSize: '1.25rem' }}>
                      {form.form_name}
                    </h4>
                    <p style={{ fontSize: '0.8rem', opacity: 0.5, margin: 0 }}>
                      ID: {form.form_key}
                    </p>
                  </div>
                  <span className="badge bg-danger rounded-pill" style={{ padding: '0.4rem 0.8rem' }}>
                    ACTIVE
                  </span>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label className="form-label">Neural Link (Endpoint URL)</label>
                  <div className="input-group">
                    <input
                      type="text"
                      readOnly
                      value={endpointUrl}
                      className="form-control form-control-sm"
                      style={{ background: 'rgba(10, 10, 10, 0.7)', fontSize: '0.85rem' }}
                    />
                    <button
                      type="button"
                      onClick={() => handleCopy(form.id, form.form_key)}
                      className={`btn btn-sm ${isCopied ? 'btn-danger' : 'btn-outline-danger'}`}
                      style={{ minWidth: '95px' }}
                    >
                      {isCopied ? 'COPIED!' : 'Copy Link'}
                    </button>
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 'auto',
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                    paddingTop: '1rem',
                  }}
                >
                  <div style={{ fontSize: '0.85rem', opacity: 0.5, display: 'flex', alignItems: 'center' }}>
                    <i className="bi bi-calendar3" style={{ marginRight: '0.4rem' }}></i>
                    {new Date(form.created_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </div>

                  <div style={{ display: 'flex', gap: '0.6rem' }}>
                    <Link
                      href={`/forms/${form.id}/submissions`}
                      className="btn btn-sm btn-light"
                    >
                      Submissions
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleTerminate(form.id)}
                      className="btn btn-sm btn-outline-danger"
                    >
                      Terminate
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
