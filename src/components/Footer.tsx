import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        position: 'relative',
        zIndex: 1,
        background: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid var(--glass-border)',
        padding: '1.5rem 0',
        marginTop: 'auto',
        textAlign: 'center',
      }}
    >
      <div className="container">
        <p
          className="tracking-widest"
          style={{
            margin: 0,
            fontSize: '0.85rem',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '0.4rem',
          }}
        >
          <span style={{ color: 'rgba(255, 255, 255, 0.5)' }}>&copy; {currentYear}</span>
          <span style={{ fontWeight: 700, color: '#ffffff', letterSpacing: '2px' }}>
            FORMFARM
          </span>
          <span style={{ color: 'rgba(255, 255, 255, 0.3)' }}>|</span>
          <a
            href="https://github.com/CodeWithTanim"
            target="_blank"
            rel="noopener noreferrer"
            className="animated-credit"
          >
            <span className="made-by">Made by </span>
            <span className="tanim-name">CodeWithTanim</span>
          </a>
        </p>
      </div>
    </footer>
  );
}
