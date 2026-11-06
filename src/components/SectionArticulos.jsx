import React from 'react';
import { sounds } from '../utils/soundEffects';

const SLEEVE_PALETTE = [
  { color: '#e8286a', glow: 'rgba(232, 40, 106, 0.45)', diskLabel: '#e8286a' }, // 01 Magenta / Hot Pink
  { color: '#d2f800', glow: 'rgba(210, 248, 0, 0.45)', diskLabel: '#d2f800' }, // 02 Acid Lime / Neon Yellow
  { color: '#00b8f0', glow: 'rgba(0, 184, 240, 0.45)', diskLabel: '#00b8f0' }, // 03 Bright Cyan / Sky Blue
];

export default function SectionArticulos({ content }) {
  const { articulos } = content;

  if (!articulos) return null;

  const isEnglish = articulos?.sectionTag?.includes('ESSAYS') || articulos?.heading?.includes('LATEST');
  const actionText = isEnglish ? 'READ ARTICLE' : 'LEER ARTÍCULO';

  return (
    <section className="section-wrapper anchor-layer articulos-section">
      {/* Background Ghost Watermark */}
      <div className="articulos-ghost" aria-hidden="true">
        MEDUSA
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '1720px', width: '100%' }}>
        
        {/* Section Header: Sequential Order */}
        <div className="section-tag-badge" style={{ marginBottom: '16px' }}>
          <span>{articulos.sectionTag}</span>
        </div>

        <h2 className="section-heading-big" style={{ marginBottom: '14px' }}>
          {articulos.heading}
        </h2>

        <p 
          style={{
            fontFamily: 'var(--f-body)',
            fontSize: '18px',
            color: 'var(--fog)',
            maxWidth: '760px',
            marginBottom: '48px',
            lineHeight: 1.6
          }}
        >
          {articulos.subheading}
        </p>

        {/* 3 Singles Layout (45 RPM Sleeves) */}
        <div className="articulos-grid">
          {articulos.singles?.map((single, i) => {
            const theme = SLEEVE_PALETTE[i % SLEEVE_PALETTE.length];
            // Format "LADO A · 01" to "LADO A · 1" or "SIDE A · 01" to "SIDE A · 1"
            const sideLabel = (single.side || `SIDE A · ${i + 1}`).replace(/· 0(\d)/, '· $1');
            const tags = single.tags || [];

            return (
              <a 
                key={i}
                href={single.url}
                target="_blank"
                rel="noopener noreferrer"
                className="single-card"
                style={{
                  '--sleeve-color': single.color || theme.color,
                  '--sleeve-glow': single.glow || (single.color ? `${single.color}88` : theme.glow),
                  '--sleeve-bg': single.bgColor || '#01042d',
                }}
                onMouseEnter={() => sounds.playClick()}
              >
                {/* 45 RPM Vinyl Sleeve Wrapper (Allows sliding disk without clipping) */}
                <div className="single-sleeve-wrapper">
                  
                  {/* Vinyl Disk that slides out on hover (Half of disk comes out) */}
                  <div className="single-vinyl-disk" aria-hidden="true">
                    <div className="vinyl-grooves-inner" />
                    <div className="vinyl-center-label" />
                    <div className="vinyl-spindle-hole" />
                  </div>

                  {/* 45 RPM Square Sleeve Cover (Picture Sleeve if image present, else classic die-cut) */}
                  <div className={`single-sleeve ${single.image ? 'has-art' : ''}`}>
                    {single.image ? (
                      <img 
                        src={single.image} 
                        alt={single.title || "Single cover"} 
                        className="single-sleeve-art" 
                      />
                    ) : (
                      <>
                        {/* Top-Left White Paper Sticker: LADO A · 1 / 2 / 3 */}
                        <span className="sleeve-side-sticker">
                          {sideLabel}
                        </span>

                        {/* Center Cutout Hole showing black vinyl underneath */}
                        <div className="sleeve-cutout-hole" aria-hidden="true" />

                        {/* Bottom-Right Yellow 45 RPM Sticker */}
                        <span className="sleeve-rpm-sticker" aria-hidden="true">
                          45
                        </span>
                      </>
                    )}
                  </div>

                  {/* Action Pill Sticker: LEER ARTÍCULO → */}
                  <div className="sleeve-action-pill">
                    <span>{actionText}</span>
                    <span className="pill-arrow" aria-hidden="true">→</span>
                  </div>

                </div>

                {/* Article Meta: Date · Read Time (if present) */}
                {(single.date || single.readTime) && (
                  <div className="single-meta">
                    {single.date && <span>{single.date}</span>}
                    {single.date && single.readTime && <span>·</span>}
                    {single.readTime && <span>{single.readTime}</span>}
                  </div>
                )}

                {/* Article Title */}
                {single.title && (
                  <h3 
                    className="single-title" 
                    style={!(single.date || single.readTime) ? { marginTop: '22px' } : undefined}
                  >
                    {single.title}
                  </h3>
                )}

                {/* Article Card Subheading */}
                {single.subheading && (
                  <p className="single-subheading">
                    {single.subheading}
                  </p>
                )}

                {/* Article Tag Pills */}
                {tags.some(t => t && t.trim()) && (
                  <div className="single-tags">
                    {tags.filter(t => t && t.trim()).map((tag, tIdx) => {
                      const cleanTag = tag.replace(/^#/, '');
                      return (
                        <span key={tIdx} className="single-tag-pill">
                          {cleanTag}
                        </span>
                      );
                    })}
                  </div>
                )}
              </a>
            );
          })}
        </div>

      </div>
    </section>
  );
}
