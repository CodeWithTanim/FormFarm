'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface SubmissionItem {
  id: string;
  data: Record<string, any>;
  metadata?: {
    ip?: string;
    country?: string;
    city?: string;
    userAgent?: string;
  };
  created_at: string;
}

interface FormDetail {
  id: string;
  form_name: string;
  form_key: string;
  created_at: string;
}

export default function SubmissionsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [form, setForm] = useState<FormDetail | null>(null);
  const [submissions, setSubmissions] = useState<SubmissionItem[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [flashMsg, setFlashMsg] = useState<string | null>(null);
  const router = useRouter();

  const fetchSubmissions = async () => {
    try {
      const res = await fetch(`/api/forms/${id}/submissions`);
      if (res.status === 401) {
        router.push('/login');
        return;
      }
      if (!res.ok) {
        router.push('/forms');
        return;
      }
      const data = await res.json();
      setForm(data.form);
      setSubmissions(data.submissions || []);
    } catch (err) {
      console.error('Error fetching submissions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, [id]);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(submissions.map((s) => s.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (subId: string) => {
    setSelectedIds((prev) =>
      prev.includes(subId) ? prev.filter((item) => item !== subId) : [...prev, subId]
    );
  };

  const handleDeleteBulk = async () => {
    if (selectedIds.length === 0) return;
    const confirmed = window.confirm('Purge selected data packets permanently?');
    if (!confirmed) return;

    try {
      const res = await fetch('/api/submissions/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ form_id: id, ids: selectedIds }),
      });

      if (res.ok) {
        setSubmissions((prev) => prev.filter((s) => !selectedIds.includes(s.id)));
        setSelectedIds([]);
        setFlashMsg('Submissions deleted successfully.');
        setTimeout(() => setFlashMsg(null), 3500);
      } else {
        alert('Failed to delete submissions');
      }
    } catch (err) {
      console.error('Bulk delete error:', err);
      alert('An error occurred');
    }
  };

  const handleDeleteSingle = async (subId: string) => {
    const confirmed = window.confirm('Purge this data packet permanently?');
    if (!confirmed) return;

    try {
      const res = await fetch('/api/submissions/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ form_id: id, ids: [subId] }),
      });

      if (res.ok) {
        setSubmissions((prev) => prev.filter((s) => s.id !== subId));
        setSelectedIds((prev) => prev.filter((item) => item !== subId));
        setFlashMsg('Submissions deleted successfully.');
        setTimeout(() => setFlashMsg(null), 3500);
      } else {
        alert('Failed to delete submission');
      }
    } catch (err) {
      console.error('Single delete error:', err);
      alert('An error occurred');
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center', opacity: 0.6 }}>
        Loading data stream...
      </div>
    );
  }

  if (!form) {
    return null;
  }

  const isAllSelected = submissions.length > 0 && selectedIds.length === submissions.length;

  return (
    <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: '2.5rem', paddingBottom: '3.5rem' }}>
      {/* Header with Breadcrumb and Packet Count */}
      <div
        className="animate-fade-in"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '2.5rem',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div>
          <nav aria-label="breadcrumb" style={{ marginBottom: '0.5rem', fontSize: '0.8rem', textTransform: 'uppercase' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <Link href="/forms" style={{ color: 'var(--header-red)', fontWeight: 600 }}>
                Nodes
              </Link>
              <span style={{ opacity: 0.4 }}>/</span>
              <span style={{ opacity: 0.5 }}>{form.form_name}</span>
            </span>
          </nav>
          <h2 style={{ margin: 0, fontWeight: 700, fontSize: '1.8rem' }}>Incoming Data Stream</h2>
        </div>

        <div style={{ textAlign: 'right' }}>
          {flashMsg && (
            <div
              className="alert alert-success animate-fade-in"
              style={{
                padding: '0.4rem 0.9rem',
                fontSize: '0.85rem',
                marginBottom: '0.5rem',
                display: 'inline-flex',
              }}
            >
              {flashMsg}
            </div>
          )}
          <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', opacity: 0.5, marginBottom: '0.25rem' }}>
            Packet Count
          </div>
          <span className="badge bg-danger" style={{ fontSize: '1.25rem', padding: '0.4rem 1rem' }}>
            {submissions.length}
          </span>
        </div>
      </div>

      {/* Main Submissions Card */}
      <div
        className="card glass-card animate-fade-in"
        style={{ animationDelay: '0.2s', overflow: 'hidden' }}
      >
        {submissions.length === 0 ? (
          <div style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
            <div style={{ color: 'rgba(255, 255, 255, 0.25)', fontSize: '4.5rem', marginBottom: '1.25rem' }}>
              <i className="bi bi-broadcast"></i>
            </div>
            <p style={{ opacity: 0.5, fontSize: '1.25rem', margin: 0 }}>
              Listening for incoming data packets...
            </p>
          </div>
        ) : (
          <div>
            {/* Bulk Toolbar */}
            <div
              style={{
                padding: '0.9rem 1.5rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <label
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  textTransform: 'uppercase',
                  opacity: 0.6,
                }}
              >
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                  style={{
                    width: '18px',
                    height: '18px',
                    marginRight: '0.6rem',
                    accentColor: 'var(--accent-red)',
                    cursor: 'pointer',
                  }}
                />
                Select All
              </label>

              {selectedIds.length > 0 && (
                <button
                  type="button"
                  onClick={handleDeleteBulk}
                  className="btn btn-outline-danger btn-sm"
                  style={{ display: 'inline-flex', alignItems: 'center' }}
                >
                  <i className="bi bi-trash3" style={{ marginRight: '0.4rem' }}></i>
                  Purge Selected ({selectedIds.length})
                </button>
              )}
            </div>

            {/* Submissions Table */}
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th style={{ width: '50px', paddingLeft: '1.5rem' }}></th>
                    <th style={{ width: '110px' }}>Sequence</th>
                    <th>Extracted Payload</th>
                    <th style={{ width: '160px', paddingRight: '1.5rem', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((submission, index) => {
                    const isChecked = selectedIds.includes(submission.id);
                    const sequenceNumber = submissions.length - index;
                    const dateObj = new Date(submission.created_at);

                    return (
                      <tr key={submission.id}>
                        <td style={{ paddingLeft: '1.5rem' }}>
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleSelectOne(submission.id)}
                            style={{
                              width: '18px',
                              height: '18px',
                              accentColor: 'var(--accent-red)',
                              cursor: 'pointer',
                            }}
                          />
                        </td>
                        <td>
                          <span className="badge bg-secondary" style={{ opacity: 0.6 }}>
                            #{sequenceNumber}
                          </span>
                        </td>
                        <td>
                          <div className="payload-block" style={{ padding: '1rem', margin: '0.25rem 0' }}>
                            {Object.entries(submission.data || {}).map(([key, value]) => (
                              <div
                                key={key}
                                style={{
                                  display: 'flex',
                                  marginBottom: '0.35rem',
                                  flexWrap: 'wrap',
                                }}
                              >
                                <span
                                  style={{
                                    fontWeight: 700,
                                    color: 'var(--header-red)',
                                    marginRight: '0.75rem',
                                    minWidth: '110px',
                                  }}
                                >
                                  {key}:
                                </span>
                                <span style={{ opacity: 0.85, wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>
                                  {typeof value === 'object' ? JSON.stringify(value) : String(value ?? '')}
                                </span>
                              </div>
                            ))}

                            {submission.metadata && (
                              <div
                                style={{
                                  marginTop: '0.75rem',
                                  paddingTop: '0.6rem',
                                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                                  display: 'flex',
                                  gap: '1rem',
                                  flexWrap: 'wrap',
                                  fontSize: '0.75rem',
                                  opacity: 0.75,
                                }}
                              >
                                {submission.metadata.ip && (
                                  <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                                    <i className="bi bi-globe me-1" style={{ color: 'var(--header-red)', marginRight: '0.3rem' }}></i>
                                    IP: <strong style={{ color: '#fff', marginLeft: '0.25rem' }}>{submission.metadata.ip}</strong>
                                  </span>
                                )}
                                {submission.metadata.country && (
                                  <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                                    <i className="bi bi-geo-alt me-1" style={{ color: 'var(--header-red)', marginRight: '0.3rem' }}></i>
                                    Location:{' '}
                                    <strong style={{ color: '#fff', marginLeft: '0.25rem' }}>
                                      {submission.metadata.city ? `${submission.metadata.city}, ` : ''}
                                      {submission.metadata.country}
                                    </strong>
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </td>
                        <td style={{ paddingRight: '1.5rem', textAlign: 'right' }}>
                          <div style={{ fontSize: '0.8rem', opacity: 0.5, marginBottom: '0.5rem' }}>
                            <div style={{ fontWeight: 600 }}>
                              {dateObj.toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </div>
                            <div>{dateObj.toLocaleTimeString('en-US', { hour12: false })}</div>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleDeleteSingle(submission.id)}
                            className="btn btn-outline-danger btn-sm"
                            style={{
                              border: 'none',
                              opacity: 0.5,
                              padding: '4px 8px',
                              cursor: 'pointer',
                            }}
                            title="Purge packet"
                          >
                            <i className="bi bi-trash3" style={{ fontSize: '1rem' }}></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
