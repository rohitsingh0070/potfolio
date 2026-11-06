import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export default function SectionPrevia({ content }) {
  const { previa } = content;

  const brands = [
    'PyTorch',
    'Hugging Face',
    'Scikit-Learn',
    'OpenAI',
    'Databricks',
    'NVIDIA',
    'Linux',
    'Apache Spark'
  ];

  // 2 identical halves for seamless infinite left-to-right looping
  const half = [...brands, ...brands];
  const allTapeItems = [...half, ...half];

  return (
    <section 
      className="section-wrapper anchor-layer"
      style={{
        backgroundColor: '#0e1118',
        paddingTop: '0px',
        paddingBottom: '100px',
        overflow: 'visible'
      }}
    >
      {/* Moving Yellow Brand Tape Band matching reference image (Left to Right) */}
      <div className="brand-tape-band" aria-hidden="true">
        <div className="brand-tape-track">
          {allTapeItems.map((brand, idx) => (
            <span key={idx} className="brand-tape-item">
              {brand}
            </span>
          ))}
        </div>
      </div>

      <div className="container" style={{ paddingTop: '36px' }}>
        
        {/* Section Tag Badge */}
        <div className="section-tag-badge" style={{ marginBottom: '28px' }}>
          <span>{previa.sectionTag}</span>
        </div>

        {/* Content Grid: White Card on Left, Pink Flyer on Right */}
        <div className="previa-grid">
          
          {/* Main Manifesto Poster Card (Single Column About Me Content) */}
          <article className="poster">
            {/* Real Masking Tape Corners */}
            <span className="tape tape-b" aria-hidden="true" />
            <span className="tape tape-c" aria-hidden="true" />

            {/* About Heading */}
            <h2 id="previa-h" className="poster-heading">
              ABOUT
            </h2>

            {/* Single Column About Me Content Flow */}
            <div 
              style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '15px', 
                marginTop: '16px' 
              }}
            >
              <p style={{ fontSize: 'clamp(18px, 1.35vw, 21.5px)', lineHeight: 1.68, color: 'var(--paper-ink)' }}>
                {previa.paragraph1}
              </p>
              <p style={{ fontSize: 'clamp(18px, 1.35vw, 21.5px)', lineHeight: 1.68, color: 'var(--paper-ink)' }}>
                {previa.paragraph2}
              </p>
              <p style={{ fontSize: 'clamp(18px, 1.35vw, 21.5px)', lineHeight: 1.68, color: 'var(--paper-ink)' }}>
                {previa.paragraph3}
              </p>
            </div>
          </article>

          {/* Right Sticky Neon Pink Flyer Card (Enlarged) */}
          <aside className="flyer" aria-label="Contacto / Oportunidades">
            <p className="flyer-big">{previa.callout.title}</p>
            <p className="flyer-small">{previa.callout.description}</p>
            <a
              href="#contacto"
              className="flyer-link"
              onClick={() => sounds.playClick()}
            >
              <span>{previa.callout.buttonText}</span>
              <ArrowUpRight size={26} />
            </a>
          </aside>

        </div>

      </div>
    </section>
  );
}
