import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';
import { ExternalLink, Code } from 'lucide-react';
import type { Project } from '@/types/index';

interface Props {
  projects: Project[];
}

export default function ProjectsCarousel({ projects }: Props) {
  const autoplay = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));
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
      <div style={{ display: 'flex', gap: '14px', alignItems: 'stretch' }}>
        {projects.map((project) => (
          <div
            key={project.id}
            style={{
              flexShrink: 0,
              width: '280px',
              padding: '20px',
              border: '1px solid var(--color-border)',
              borderRadius: '12px',
              background: project.featured ? 'var(--color-text)' : 'var(--color-bg-elevated)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Code size={14} style={{ color: project.featured ? 'rgba(255,255,255,0.5)' : 'var(--color-text-tertiary)', flexShrink: 0 }} />
              <span style={{
                fontSize: '0.9rem',
                fontWeight: 600,
                letterSpacing: '-0.01em',
                color: project.featured ? 'white' : 'var(--color-text)',
              }}>
                {project.name}
              </span>
            </div>

            {project.description && (
              <p style={{
                fontSize: '0.82rem',
                color: project.featured ? 'rgba(255,255,255,0.65)' : 'var(--color-text-secondary)',
                lineHeight: 1.6,
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                flex: 1,
              }}>
                {project.description}
              </p>
            )}

            {project.tags.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {project.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: '0.68rem',
                      padding: '3px 8px',
                      borderRadius: '4px',
                      border: `1px solid ${project.featured ? 'rgba(255,255,255,0.2)' : 'var(--color-border)'}`,
                      color: project.featured ? 'rgba(255,255,255,0.7)' : 'var(--color-text-secondary)',
                      background: project.featured ? 'rgba(255,255,255,0.08)' : 'var(--color-code-bg)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.75rem',
                    color: project.featured ? 'rgba(255,255,255,0.7)' : 'var(--color-text-secondary)',
                    padding: '5px 10px',
                    border: `1px solid ${project.featured ? 'rgba(255,255,255,0.2)' : 'var(--color-border)'}`,
                    borderRadius: '6px',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                >
                  <Code size={12} />
                  GitHub
                </a>
              )}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.75rem',
                    color: project.featured ? 'rgba(255,255,255,0.7)' : 'var(--color-accent)',
                    padding: '5px 10px',
                    border: `1px solid ${project.featured ? 'rgba(255,255,255,0.2)' : 'var(--color-accent)'}`,
                    borderRadius: '6px',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                >
                  <ExternalLink size={12} />
                  Live
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
