'use client';

import React, { Suspense } from 'react';

function ThanksContent() {

  const handleReturn = () => {
    if (typeof window !== 'undefined') {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        window.location.href = '/';
      }
    }
  };

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
      <div className="animate-fade-in" style={{ width: '100%', maxWidth: '650px', textAlign: 'center' }}>
        <div
          className="card"
          style={{
            background: 'rgba(10, 10, 10, 0.6)',
            backdropFilter: 'blur(25px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '28px',
            boxShadow: '0 40px 100px -20px rgba(0, 0, 0, 0.8)',
            padding: '3.5rem 2.5rem',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Subtle Radial Glow */}
          <div
            style={{
              position: 'absolute',
              top: '-50%',
              left: '-50%',
              width: '200%',
              height: '200%',
              background: 'radial-gradient(circle, rgba(0, 255, 170, 0.05) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <div
            className="animate-float"
            style={{
              color: '#00ffaa',
              filter: 'drop-shadow(0 0 15px rgba(0, 255, 170, 0.4))',
              fontSize: '4.5rem',
              marginBottom: '1.5rem',
            }}
          >
            <i className="bi bi-shield-check"></i>
          </div>

          <h1
            style={{
              color: '#ffffff',
              letterSpacing: '3px',
              fontSize: 'clamp(1.75rem, 4vw, 2.4rem)',
              fontWeight: 800,
              textTransform: 'uppercase',
              textShadow: '0 0 20px rgba(255, 255, 255, 0.2)',
              marginBottom: '1.25rem',
            }}
          >
            Submission Successful
          </h1>

          <div style={{ marginBottom: '1.5rem' }}>
            <span
              className="badge rounded-pill"
              style={{
                background: '#00ffaa',
                color: '#000000',
                fontWeight: 700,
                padding: '0.45rem 1.1rem',
                fontSize: '0.8rem',
                letterSpacing: '1.5px',
              }}
            >
              SECURELY DELIVERED
            </span>
          </div>

          <p style={{ color: '#ffffff', opacity: 0.85, fontSize: '1.2rem', lineHeight: 1.6, marginBottom: '2.5rem' }}>
            Your data has been successfully submitted.
          </p>

          <div>
            <button
              type="button"
              onClick={handleReturn}
              className="btn btn-premium"
              style={{ padding: '14px 38px', fontSize: '0.95rem', cursor: 'pointer' }}
            >
              <i className="bi bi-chevron-left" style={{ marginRight: '0.5rem' }}></i>
              Return to Source
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ThanksPage() {
  return (
    <Suspense fallback={<div style={{ textAlign: 'center', padding: '4rem' }}>Loading...</div>}>
      <ThanksContent />
    </Suspense>
  );
}
