import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSessionUser } from '@/lib/auth';
import { getFormsByUserId } from '@/lib/db';

export default async function DashboardPage() {
  const session = await getSessionUser();
  if (!session) {
    redirect('/login');
  }

  const allForms = await getFormsByUserId(session.userId);
  const totalForms = allForms.length;
  const recentForms = allForms.slice(0, 5);

  return (
    <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: '2rem', paddingBottom: '3rem' }}>
      {/* Stat Card */}
      <div className="animate-fade-in" style={{ marginBottom: '2.5rem' }}>
        <div style={{ maxWidth: '380px' }}>
          <div
            className="card"
            style={{
              padding: '1.75rem',
              position: 'relative',
              overflow: 'hidden',
              background: 'rgba(255, 10, 10, 0.05)',
              border: '1px solid rgba(255, 10, 10, 0.25)',
              borderRadius: '12px',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1.25rem',
                opacity: 0.2,
                fontSize: '2.75rem',
              }}
            >
              <i className="bi bi-layers"></i>
            </div>
            <h5
              style={{
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                fontWeight: 700,
                color: 'var(--header-red)',
                letterSpacing: '1px',
                marginBottom: '0.75rem',
              }}
            >
              Neural Endpoints
            </h5>
            <h2
              style={{
                fontSize: '3.25rem',
                fontWeight: 800,
                lineHeight: 1,
                color: '#ffffff',
                marginBottom: '0.5rem',
              }}
            >
              {totalForms}
            </h2>
            <div style={{ fontSize: '0.85rem', opacity: 0.5 }}>Active form collection points</div>
          </div>
        </div>
      </div>

      {/* Recent Activity Card */}
      <div className="card animate-fade-in" style={{ animationDelay: '0.2s', overflow: 'hidden' }}>
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h4 style={{ margin: 0, fontWeight: 700, fontSize: '1.25rem', display: 'flex', alignItems: 'center' }}>
            <i className="bi bi-clock-history" style={{ marginRight: '0.6rem', color: 'var(--accent-red)' }}></i>
            Recent Activity
          </h4>
          <Link href="/forms" className="btn btn-outline-light btn-sm">
            View All Nodes
          </Link>
        </div>

        <div style={{ padding: 0 }}>
          {recentForms.length === 0 ? (
            <div style={{ padding: '3.5rem 1.5rem', textAlign: 'center' }}>
              <p style={{ opacity: 0.5, marginBottom: '1.25rem' }}>No active data streams detected.</p>
              <Link href="/forms/create" className="btn btn-primary">
                Initialize New Form
              </Link>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th style={{ paddingLeft: '1.5rem' }}>Source Name</th>
                    <th>Created</th>
                    <th style={{ paddingRight: '1.5rem', textAlign: 'right' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentForms.map((form) => (
                    <tr key={form._id?.toString()}>
                      <td style={{ paddingLeft: '1.5rem', fontWeight: 600 }}>
                        <i className="bi bi-file-earmark-text" style={{ marginRight: '0.6rem', opacity: 0.5 }}></i>
                        {form.form_name}
                      </td>
                      <td style={{ opacity: 0.75, fontSize: '0.9rem' }}>
                        {new Date(form.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </td>
                      <td style={{ paddingRight: '1.5rem', textAlign: 'right' }}>
                        <Link
                          href={`/forms/${form._id?.toString()}/submissions`}
                          className="btn btn-outline-danger btn-sm"
                        >
                          Submissions
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
