import { useState, useEffect } from 'react';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    if (!document.cookie.includes('cookieConsent=true')) {
      setVisible(true);
    }
  }, []);

  function dismiss(accept: boolean) {
    setHiding(true);
    if (accept) {
      document.cookie = 'cookieConsent=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/';
    }
    setTimeout(() => setVisible(false), 500);
  }

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '16px',
        left: '16px',
        zIndex: 200,
        maxWidth: '380px',
        width: 'calc(100vw - 32px)',
        transition: 'opacity 0.5s, transform 0.5s',
        opacity: hiding ? 0 : 1,
        transform: hiding ? 'translateY(8px)' : 'translateY(0)',
      }}
    >
      <div
        style={{
          background: 'var(--color-bg-elevated)',
          border: '1px solid var(--color-border)',
          borderRadius: '12px',
          padding: '16px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        }}
      >
        <p style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', marginBottom: '12px', lineHeight: 1.6 }}>
          This site uses cookies to improve your experience.{' '}
          <span style={{ fontSize: '0.76rem' }}>By clicking Accept, you agree to their use.</span>
        </p>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => dismiss(true)}
            style={{
              flex: 1,
              padding: '8px',
              background: 'var(--color-text)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '0.8rem',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            Accept
          </button>
          <button
            onClick={() => dismiss(false)}
            style={{
              flex: 1,
              padding: '8px',
              background: 'transparent',
              color: 'var(--color-text-secondary)',
              border: '1px solid var(--color-border)',
              borderRadius: '8px',
              fontSize: '0.8rem',
              cursor: 'pointer',
            }}
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}
