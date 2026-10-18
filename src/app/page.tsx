import React from 'react';
import Link from 'next/link';
import { getSessionUser } from '@/lib/auth';

export default async function HomePage() {
  const user = await getSessionUser();

  return (
    <div className="container" style={{ position: 'relative', zIndex: 1, paddingBottom: '4rem' }}>
      {/* Hero Section */}
      <section
        style={{
          minHeight: '75vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '4rem 1rem',
        }}
      >
        <div className="animate-fade-in" style={{ maxWidth: '850px' }}>
          <h1
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.2rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: '1.5rem',
            }}
          >
            <span style={{ color: 'var(--accent-red)' }}>FUTURE</span> OF FORM COLLECTION
          </h1>

          <p
            style={{
              fontSize: '1.25rem',
              lineHeight: 1.6,
              opacity: 0.8,
              marginBottom: '2.5rem',
              maxWidth: '700px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            Just point your forms to our endpoint and we&apos;ll handle the rest. No backend required. Purely
            serverless, purely powerful.
          </p>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '1.25rem',
              flexWrap: 'wrap',
            }}
          >
            {user ? (
              <Link href="/dashboard" className="btn btn-primary btn-lg">
                Enter Dashboard
              </Link>
            ) : (
              <>
                <Link href="/register" className="btn btn-primary btn-lg shadow-neon">
                  Initialize Account
                </Link>
                <Link href="/login" className="btn btn-outline-light btn-lg">
                  Access Portal
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section style={{ marginTop: '2rem' }}>
        <div className="grid-3">
          <div className="card glass-card" style={{ padding: '2.5rem 2rem', textAlign: 'center' }}>
            <div style={{ color: 'var(--accent-red)', fontSize: '2.5rem', marginBottom: '1.25rem' }}>
              <i className="bi bi-cpu"></i>
            </div>
            <h4 style={{ fontWeight: 700, marginBottom: '1rem', color: '#ffffff' }}>1. Construct Form</h4>
            <p style={{ opacity: 0.75, lineHeight: 1.6, fontSize: '0.95rem' }}>
              Define your form structure and receive a unique neural endpoint key instantly.
            </p>
          </div>

          <div className="card glass-card" style={{ padding: '2.5rem 2rem', textAlign: 'center' }}>
            <div style={{ color: 'var(--accent-red)', fontSize: '2.5rem', marginBottom: '1.25rem' }}>
              <i className="bi bi-plug"></i>
            </div>
            <h4 style={{ fontWeight: 700, marginBottom: '1rem', color: '#ffffff' }}>2. Interface Sync</h4>
            <p style={{ opacity: 0.75, lineHeight: 1.6, fontSize: '0.95rem' }}>
              Insert the endpoint into your HTML. Compatible with any frontend architecture.
            </p>
          </div>

          <div className="card glass-card" style={{ padding: '2.5rem 2rem', textAlign: 'center' }}>
            <div style={{ color: 'var(--accent-red)', fontSize: '2.5rem', marginBottom: '1.25rem' }}>
              <i className="bi bi-reception-4"></i>
            </div>
            <h4 style={{ fontWeight: 700, marginBottom: '1rem', color: '#ffffff' }}>3. Data Stream</h4>
            <p style={{ opacity: 0.75, lineHeight: 1.6, fontSize: '0.95rem' }}>
              Analyze incoming data packets via our advanced analytics dashboard.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
