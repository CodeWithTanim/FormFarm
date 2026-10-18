import React from 'react';
import Link from 'next/link';

export default function EndpointActivePage() {
  return (
    <div
      className="container"
      style={{
        position: 'relative',
        zIndex: 1,
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1rem',
      }}
    >
      <div className="animate-fade-in" style={{ width: '100%', maxWidth: '680px', textAlign: 'center' }}>
        <div className="card glass-card" style={{ padding: '3.5rem 2.5rem' }}>
          <div style={{ color: 'var(--accent-red)', fontSize: '4.5rem', marginBottom: '1.5rem' }}>
            <i className="bi bi-cpu"></i>
          </div>

          <h1
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              fontWeight: 800,
              textTransform: 'uppercase',
              color: 'var(--header-red)',
              letterSpacing: '2px',
              marginBottom: '1rem',
            }}
          >
            Endpoint Active
          </h1>

          <p style={{ fontSize: '1.15rem', opacity: 0.8, lineHeight: 1.6, marginBottom: '2rem' }}>
            This neural node is live and ready to receive data, but it requires a <strong>POST</strong>{' '}
            transmission.
          </p>

          <div
            className="alert alert-danger"
            style={{
              textAlign: 'left',
              padding: '1rem 1.25rem',
              marginBottom: '2rem',
              fontSize: '0.9rem',
              lineHeight: 1.5,
              background: 'rgba(20, 10, 10, 0.7)',
            }}
          >
            <i className="bi bi-exclamation-triangle-fill" style={{ marginRight: '0.6rem', fontSize: '1.1rem' }}></i>
            <div>
              <strong>Notice:</strong> If you see this after submitting a form, ensure your form specifies{' '}
              <code>method=&quot;POST&quot;</code> and that your client allows direct POST transmissions.
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/help" className="btn btn-outline-light" style={{ padding: '10px 22px' }}>
              <i className="bi bi-book" style={{ marginRight: '0.5rem' }}></i>
              Integration Guide
            </Link>
            <Link href="/dashboard" className="btn btn-primary" style={{ padding: '10px 22px' }}>
              <i className="bi bi-speedometer2" style={{ marginRight: '0.5rem' }}></i>
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
