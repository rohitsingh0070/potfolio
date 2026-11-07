import React from 'react';
import { sounds } from '../utils/soundEffects';
import brickWallImg from '../assets/portfolio/brick_wall.jpg';

export default function SectionPortafolio({ content }) {
  const { portafolio } = content;
  // Take only 3 cards as requested
  const projectsToRender = (portafolio.projects || []).slice(0, 3);

  return (
    <section 
      className="section-wrapper anchor-layer"
      style={{
        position: 'relative',
        backgroundColor: '#11141c',
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.16), rgba(0, 0, 0, 0.28)), url(${brickWallImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        paddingTop: 'clamp(52px, 7vh, 80px)',
        paddingBottom: 'clamp(110px, 14vh, 160px)',
        overflow: 'hidden',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
      }}
    >
      <div className="container" style={{ maxWidth: '1720px' }}>
        
        {/* Top Header Row: Giant PORTAFOLIO Title (Left) + Dark Lede Pill (Right) */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px',
            flexWrap: 'wrap',
            marginBottom: 'clamp(46px, 6vw, 72px)'
          }}
        >
          {/* Giant PORTAFOLIO Headline */}
          <h2 
            className="portfolio-main-heading"
            style={{
              fontFamily: 'var(--f-head)',
              fontSize: 'clamp(2.2rem, 6vw, 5.2rem)',
              letterSpacing: '0.02em',
              lineHeight: 0.95,
              color: '#ffffff',
              textTransform: 'uppercase',
              margin: 0,
              transform: 'translateY(-6px)',
              textShadow: '0 4px 25px rgba(0, 0, 0, 0.9)'
            }}
          >
            {portafolio.heading || 'PORTAFOLIO'}
          </h2>

          {/* Dark Glass Lede Card with sharp corners */}
          <div 
            className="portfolio-lede-card"
            style={{
              backgroundColor: 'rgba(14, 18, 26, 0.92)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: 0,
              padding: '18px 26px',
              maxWidth: '580px',
              boxShadow: '0 16px 36px rgba(0, 0, 0, 0.7)'
            }}
          >
            <p 
              style={{
                fontFamily: 'var(--f-body)',
                fontSize: 'clamp(13.5px, 1.1vw, 15.5px)',
                lineHeight: 1.6,
                color: 'rgba(235, 240, 248, 0.84)',
                margin: 0
              }}
            >
              {portafolio.subheadingLead || "Desde rediseñar procesos hasta validar nuevos productos, implementar IA o ayudar a equipos a trabajar de otra manera. "}
              <strong style={{ color: '#ffffff', fontWeight: 700 }}>
                {portafolio.subheadingBold || "La metodología es el medio. El cambio es el objetivo."}
              </strong>
            </p>
          </div>
        </div>

        {/* Taped Poster Cards Grid: Single Row for all 3 project cards */}
        <div className="portfolio-posters-grid">
          {projectsToRender.map((proj, idx) => (
            <div 
              key={proj.id}
              className={`poster-card-wrapper stagger-${idx}`}
              style={{
                filter: 'drop-shadow(0 24px 44px rgba(0,0,0,0.72))',
                cursor: 'pointer'
              }}
              onMouseEnter={() => sounds.playClick()}
            >
              {/* Masking Tape Strip across Top-Left Corner */}
              <span className="poster-tape-corner-left" />

              {/* Masking Tape Strip across Top-Right Corner */}
              <span className="poster-tape-corner-right" />

              {/* Large Poster Paper Card: Flat in Idle State, Folds Dynamically on Hover */}
              <div className="poster-paper-card">
                {/* 3D Folded Paper Flap: Deeper 74px Page Curl on Hover Only */}
                <span className="poster-fold-flap" />

                {/* Framed Graphic Container: Curved Corners, 12px Green Border (covered by image on hover) */}
                <a
                  href={proj.behanceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sounds.playClick()}
                  className={`project-graphic-frame ${proj.image ? 'has-image' : ''} ${proj.id === 'proj-2' ? 'proj-2-frame' : ''} ${proj.id === 'proj-3' ? 'proj-3-frame' : ''}`}
                  style={{
                    backgroundImage: proj.image ? undefined : 'radial-gradient(circle at 50% 30%, #161b26 0%, #080a0f 100%)',
                    '--proj-border': proj.borderColor || '#74d618',
                  }}
                >
                  {proj.image && (
                    <img 
                      src={proj.image} 
                      alt={proj.posterHeadline || proj.title} 
                      className={`project-cover-img ${proj.id}-img`}
                    />
                  )}

                  {/* 12px Green Border Overlay: Curved corners, covered by image on hover */}
                  <span className="project-border-overlay" aria-hidden="true" />
                </a>

                {/* Bottom Paper Margin with Bold Headline */}
                <a
                  href={proj.behanceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sounds.playClick()}
                  style={{ 
                    display: 'block',
                    paddingTop: '20px', 
                    paddingLeft: '4px', 
                    paddingRight: '4px',
                    textDecoration: 'none'
                  }}
                >
                  <h3 
                    style={{
                      fontFamily: 'var(--f-head)',
                      fontSize: 'clamp(17px, 1.5vw, 21px)',
                      fontWeight: 900,
                      letterSpacing: '0.04em',
                      color: proj.headlineColor || '#0b0d12',
                      margin: 0,
                      lineHeight: 1.25
                    }}
                  >
                    {proj.posterHeadline}
                  </h3>
                  {proj.datePlatform && (
                    <div 
                      style={{
                        marginTop: '6px',
                        fontFamily: 'var(--f-sign)',
                        fontSize: '13.5px',
                        fontWeight: 700,
                        color: '#ff3b24',
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase'
                      }}
                    >
                      {proj.datePlatform}
                    </div>
                  )}
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
