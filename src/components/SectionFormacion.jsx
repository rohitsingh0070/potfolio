import React, { useState, useRef, useEffect } from 'react';
import { sounds } from '../utils/soundEffects';

// Exact Strike color palette pairings for the record sleeves
const PALETTE = [
  ['#e9ff2e', '#0b0d12'], // yellow / black
  ['#ff3d8b', '#0b0d12'], // pink / black
  ['#22d3ff', '#0b0d12'], // cyan / black
  ['#ff3b24', '#f4f1ea'], // red / white
  ['#f4f1ea', '#ff3b24'], // white / red
  ['#3dff8a', '#0b0d12'], // green / black
  ['#ffb12b', '#0b0d12'], // orange / black
  ['#1e2a6e', '#e9ff2e'], // navy / yellow
  ['#0b0d12', '#ff3d8b'], // black / pink
];

const DARK_COLORS = new Set(['#0b0d12', '#1e2a6e']);

export default function SectionFormacion({ content }) {
  const { formacion } = content;
  const records = formacion?.records || [];

  const [activeIndex, setActiveIndex] = useState(0);
  const crateRowRef = useRef(null);
  const sleeveRefs = useRef([]);
  const sectionRef = useRef(null);
  const ghostRef = useRef(null);

  // Clamp activeIndex if records change
  const safeIndex = Math.min(activeIndex, Math.max(0, records.length - 1));
  const activeRecord = records[safeIndex] || records[0] || {};
  const isEnglish = content.portafolio?.actionButtonLabel === 'VIEW PROJECT' || formacion?.sectionTag?.includes('EDUCATION');

  // Background ghost text parallax: moves left to right when moving cursor
  useEffect(() => {
    let animationFrameId;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();

      // Only calculate if the section is within or near the screen view
      if (rect.bottom < -200 || rect.top > window.innerHeight + 200) return;

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Distance from center normalized (-1 to 1)
      const normX = (e.clientX - centerX) / (window.innerWidth / 2);
      const normY = (e.clientY - centerY) / (window.innerHeight / 2);

      // Strong horizontal left-to-right drift response to cursor movement
      targetX = Math.max(-2, Math.min(2, normX)) * 150;
      targetY = Math.max(-1.5, Math.min(1.5, normY)) * 12;
    };

    const animateGhost = () => {
      // Smooth interpolation (lerp)
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      if (ghostRef.current) {
        ghostRef.current.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(animateGhost);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animationFrameId = requestAnimationFrame(animateGhost);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Select a record
  const handleSelect = (index) => {
    if (index === activeIndex) return;
    sounds.playScratch();
    setActiveIndex(index);
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      sounds.playClick();
      setActiveIndex(activeIndex - 1);
    }
  };

  const handleNext = () => {
    if (activeIndex < records.length - 1) {
      sounds.playClick();
      setActiveIndex(activeIndex + 1);
    }
  };

  // Keyboard navigation when crate row has focus
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight' && activeIndex < records.length - 1) {
      e.preventDefault();
      handleNext();
    } else if (e.key === 'ArrowLeft' && activeIndex > 0) {
      e.preventDefault();
      handlePrev();
    } else if (e.key === 'Home') {
      e.preventDefault();
      setActiveIndex(0);
      sounds.playClick();
    } else if (e.key === 'End') {
      e.preventDefault();
      setActiveIndex(records.length - 1);
      sounds.playClick();
    }
  };

  // Smooth scroll selected sleeve into view inside the crate row
  useEffect(() => {
    if (sleeveRefs.current[activeIndex]) {
      sleeveRefs.current[activeIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [activeIndex]);

  const [activeBg, activeFg] = PALETTE[activeIndex % PALETTE.length];
  const activeBadgeColor = DARK_COLORS.has(activeBg) ? activeFg : activeBg;

  return (
    <section
      ref={sectionRef}
      className="crate-section"
      data-sec="formacion"
      data-name="Formación"
      aria-labelledby="crate-h"
    >
      {/* Ghost Watermark with Dynamic Cursor Parallax */}
      <div ref={ghostRef} className="ghost" aria-hidden="true" data-drift>
        {formacion?.heading || "DIGGIN' IN THE CRATES"}
      </div>

      {/* Section Header: Tag -> Heading -> Subheading in sequential vertical order */}
      <div className="section-head">
        {formacion?.sectionTag && (
          <div className="section-tag-badge">
            <span>{formacion.sectionTag}</span>
          </div>
        )}
        <h2 id="crate-h" className="section-heading-big">
          {formacion?.heading || "DIGGIN' IN THE CRATES"}
        </h2>
        <p className="section-subheading-text">
          {formacion?.subheading || "Every vinyl record preserves something I mastered. Some changed how I think, others provided sharp tools, and some taught me that sometimes to move forward, you have to spin back first."}
        </p>
      </div>

      {/* 2-Column Crate & Poster Layout */}
      <div className="crate-layout">
        {/* Left: The Record Crate */}
        <div className="crate">
          <div
            ref={crateRowRef}
            className="crate-row"
            id="crateRow"
            role="listbox"
            aria-label="Certificaciones y estudios"
            aria-orientation="horizontal"
            tabIndex={0}
            onKeyDown={handleKeyDown}
          >
            {records.map((rec, i) => {
              const isSelected = i === activeIndex;
              const [sbg, sfg] = PALETTE[i % PALETTE.length];
              const rot = ((i * 37) % 7 - 3) * 0.6;
              const artClass = `art-${i % 5}`;
              const instShort = (rec.institution || '')
                .split(' · ')[0]
                .split(' – ')[0]
                .split(' / ')[0];

              return (
                <button
                  key={i}
                  ref={(el) => (sleeveRefs.current[i] = el)}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  tabIndex={isSelected ? 0 : -1}
                  className={`sleeve ${artClass} ${isSelected ? 'is-active' : ''}`}
                  style={{
                    '--sbg': sbg,
                    '--sfg': sfg,
                    '--sr': `${rot}deg`,
                  }}
                  onClick={() => handleSelect(i)}
                  title={`${rec.year} - ${rec.title}`}
                >
                  <span className="vinyl" aria-hidden="true" />
                  <span className="sleeve-face">
                    <span className="sleeve-art" aria-hidden="true" />
                    <span className="sleeve-year">{rec.year}</span>
                    <span className="sleeve-inst">{instShort}</span>
                    {rec.cgpa && <span className="sleeve-cgpa">CGPA {rec.cgpa}</span>}
                    <span className="sr-only">: {rec.title}</span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Crate front box with cutout handle and handwritten brand */}
          <div className="crate-front" aria-hidden="true">
            <span>Rohit · Records</span>
          </div>
        </div>

        {/* Right: Detail Poster Paper Card */}
        <article
          className="crate-detail"
          id="crateDetail"
          aria-live="polite"
          style={{
            '--cd': activeBadgeColor,
          }}
        >
          <div className="cd-header-row">
            <p className="cd-year">{activeRecord.year}</p>
            {activeRecord.cgpa && (
              <span className="cd-cgpa-pill">CGPA: {activeRecord.cgpa}</span>
            )}
          </div>
          <h3 className="cd-title">{activeRecord.title}</h3>
          <p className="cd-inst">{activeRecord.institution}</p>
          <p className="cd-desc">{activeRecord.desc}</p>

          <div className="cd-nav">
            <button
              type="button"
              className="btn-crate btn-prev"
              disabled={activeIndex === 0}
              onClick={handlePrev}
              aria-label="Previous record"
            >
              {isEnglish ? '← PREVIOUS' : '← ANTERIOR'}
            </button>
            <button
              type="button"
              className="btn-crate btn-next"
              disabled={activeIndex === records.length - 1}
              onClick={handleNext}
              aria-label="Next record"
            >
              {isEnglish ? 'NEXT →' : 'SIGUIENTE →'}
            </button>
          </div>
        </article>
      </div>
    </section>
  );
}
