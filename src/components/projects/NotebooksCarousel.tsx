import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';
import { ExternalLink } from 'lucide-react';
import type { Notebook } from '@/types/index';

interface Props {
  notebooks: Notebook[];
}

export default function NotebooksCarousel({ notebooks }: Props) {
  const autoplay = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [autoplay.current]
  );

  return (
    <div
      ref={emblaRef}
      style={{ overflow: 'hidden' }}
      onMouseEnter={() => autoplay.current.stop()}
      onMouseLeave={() => autoplay.current.play()}
    >
      <div style={{ display: 'flex', gap: '14px' }}>
        {notebooks.map((nb) => (
          <div
            key={nb.id}
            style={{
              flexShrink: 0,
              width: '240px',
              padding: '18px',
              border: '1px solid var(--color-border)',
              borderRadius: '12px',
              background: 'var(--color-bg-elevated)',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              (e.currentTarget as HTMLElement).style.boxShadow = 'none';
            }}
          >
            <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--color-text)', lineHeight: 1.4 }}>
              {nb.name}
            </div>
            <p style={{
              fontSize: '0.8rem',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.6,
              display: '-webkit-box',
              WebkitLineClamp: 5,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              flex: 1,
            }}>
              {nb.description}
            </p>
            <a
              href={nb.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '0.75rem',
                color: 'var(--color-accent)',
                textDecoration: 'none',
                marginTop: 'auto',
              }}
            >
              <ExternalLink size={12} />
              View Notebook
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
