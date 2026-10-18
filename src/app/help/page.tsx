import React from 'react';
import Link from 'next/link';

export default function HelpPage() {
  return (
    <div
      className="container"
      style={{
        position: 'relative',
        zIndex: 1,
        paddingTop: '3rem',
        paddingBottom: '4rem',
        maxWidth: '960px',
      }}
    >
      <div className="animate-fade-in" style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1
          style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 800,
            textTransform: 'uppercase',
            color: 'var(--header-red)',
            letterSpacing: '3px',
            marginBottom: '0.5rem',
          }}
        >
          Technical Documentation
        </h1>
        <p className="tracking-widest" style={{ opacity: 0.75, textTransform: 'uppercase', fontSize: '0.85rem' }}>
          Mastering the Neural Form Interface
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* Step 1 */}
        <div className="card glass-card animate-fade-in" style={{ padding: '2rem' }}>
          <h3 style={{ fontWeight: 700, marginBottom: '1rem', fontSize: '1.4rem' }}>
            <span style={{ color: 'var(--accent-red)', marginRight: '0.6rem' }}>01.</span> Initialize Your Node
          </h3>
          <p style={{ opacity: 0.75, lineHeight: 1.6, margin: 0 }}>
            To begin collecting data, navigate to your{' '}
            <Link href="/dashboard" style={{ color: 'var(--accent-red)', fontWeight: 600 }}>
              Dashboard
            </Link>{' '}
            and create a new <strong>Node</strong>. Each node represents a unique form endpoint with its own
            dedicated data stream.
          </p>
        </div>

        {/* Step 2 */}
        <div className="card glass-card animate-fade-in" style={{ padding: '2rem' }}>
          <h3 style={{ fontWeight: 700, marginBottom: '1rem', fontSize: '1.4rem' }}>
            <span style={{ color: 'var(--accent-red)', marginRight: '0.6rem' }}>02.</span> Neural Integration
            (Integration Guide)
          </h3>
          <p style={{ opacity: 0.75, lineHeight: 1.6, marginBottom: '1.5rem' }}>
            Copy the <strong>Endpoint URL</strong> from your dashboard and insert it into your HTML form&apos;s{' '}
            <code style={{ color: 'var(--header-red)' }}>action</code> attribute. Ensure the{' '}
            <code style={{ color: 'var(--header-red)' }}>method</code> is set to{' '}
            <code style={{ color: 'var(--header-red)' }}>POST</code>.
          </p>

          <div
            className="payload-block"
            style={{
              padding: '1.5rem',
              marginBottom: '1.5rem',
              background: 'rgba(0, 0, 0, 0.6)',
            }}
          >
            <div
              style={{
                textTransform: 'uppercase',
                fontSize: '0.75rem',
                opacity: 0.5,
                marginBottom: '1rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                paddingBottom: '0.5rem',
              }}
            >
              HTML Implementation Example
            </div>
            <pre style={{ margin: 0, color: '#a9b7c6', fontSize: '0.9rem', overflowX: 'auto', lineHeight: 1.6 }}>
              {`<form action="https://your-domain.com/f/YOUR_NODE_KEY" method="POST">
    <input type="text" name="client_name" placeholder="Full Name" required>
    <input type="email" name="client_email" placeholder="Email Address" required>
    <textarea name="client_message"></textarea>
    <button type="submit">Transmit Data</button>
</form>`}
            </pre>
          </div>

          <ul style={{ listStyle: 'none', opacity: 0.8, lineHeight: 1.8, padding: 0, margin: 0 }}>
            <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
              <i className="bi bi-cpu" style={{ color: 'var(--accent-red)', marginRight: '0.75rem', fontSize: '1.1rem' }}></i>
              <span>
                <strong>Smart Keys:</strong> The <code>name</code> attributes of your inputs will automatically
                become keys in your submissions dashboard.
              </span>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start' }}>
              <i className="bi bi-shield-lock" style={{ color: 'var(--accent-red)', marginRight: '0.75rem', fontSize: '1.1rem' }}></i>
              <span>
                <strong>Security:</strong> All transmissions are handled over high-security encrypted protocols.
              </span>
            </li>
          </ul>
        </div>

        {/* Step 3 */}
        <div className="card glass-card animate-fade-in" style={{ padding: '2rem' }}>
          <h3 style={{ fontWeight: 700, marginBottom: '1rem', fontSize: '1.4rem' }}>
            <span style={{ color: 'var(--accent-red)', marginRight: '0.6rem' }}>03.</span> Analyze Data Streams
          </h3>
          <p style={{ opacity: 0.75, lineHeight: 1.6, margin: 0 }}>
            Once a client submits your form, the data packet is instantly routed to your dashboard. You can view,
            manage, and export all incoming payloads chronologically in the{' '}
            <strong>Incoming Data Stream</strong> section.
          </p>
        </div>
      </div>
    </div>
  );
}
