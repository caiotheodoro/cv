import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';
import type { Certification } from '@/types/index';

interface Props {
  certifications: Certification[];
}

const issuerColors: Record<string, { bg: string; color: string }> = {
  AWS: { bg: '#FF9900', color: 'white' },
  IBM: { bg: '#0530AD', color: 'white' },
  Google: { bg: '#4285F4', color: 'white' },
};

export default function CertificationsCarousel({ certifications }: Props) {
  const autoplay = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [autoplay.current]
  );

  return (
    <div
      ref={emblaRef}
      style={{ overflow: 'hidden', cursor: 'grab' }}
      onMouseEnter={() => autoplay.current.stop()}
      onMouseLeave={() => autoplay.current.play()}
    >
      <div style={{ display: 'flex', gap: '14px' }}>
        {certifications.map((cert) => {
          const colors = issuerColors[cert.issuer] ?? { bg: '#6B6B6B', color: 'white' };
          return (
            <a
              key={cert.id}
              href={cert.link ?? '#'}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flexShrink: 0,
                width: '200px',
                padding: '16px',
                border: '1px solid var(--color-border)',
                borderRadius: '12px',
                background: 'var(--color-bg-elevated)',
                textDecoration: 'none',
                color: 'inherit',
                display: 'block',
                transition: 'border-color 0.2s, box-shadow 0.2s, transform 0.2s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border-strong)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 12px rgba(0,0,0,0.06)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
            >
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: colors.bg,
                  color: colors.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  marginBottom: '12px',
                  overflow: 'hidden',
                  flexShrink: 0,
                }}
              >
                {cert.logoUrl ? (
                  <img src={cert.logoUrl} alt={cert.issuer} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  cert.issuer.slice(0, 3)
                )}
              </div>
              <div style={{ fontSize: '0.82rem', fontWeight: 550, lineHeight: 1.4, marginBottom: '4px', color: 'var(--color-text)' }}>
                {cert.name}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--color-text-tertiary)' }}>
                {cert.issuer}
                {cert.issuedDate && ` · ${new Date(cert.issuedDate).getFullYear()}`}
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
