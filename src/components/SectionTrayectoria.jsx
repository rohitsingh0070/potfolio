import React, { useState, useRef, useEffect } from 'react';
import { sounds } from '../utils/soundEffects';

export default function SectionTrayectoria({ content }) {
  const { trayectoria } = content;
  const [activeTrackIndex, setActiveTrackIndex] = useState(0);
  const deckRef = useRef(null);
  const wheelLockRef = useRef(false);
  const navigatingRef = useRef(false);
  const lastMouseY = useRef(null);
  const downwardMoveAccumulator = useRef(0);

  const totalTracks = trayectoria.tracks.length;
  const isAllCompleted = activeTrackIndex === totalTracks - 1;

  const goToNextSection = () => {
    if (navigatingRef.current) return;
    navigatingRef.current = true;
    sounds.playScratch();

    const nextSec = document.getElementById('portafolio');
    if (nextSec) {
      nextSec.scrollIntoView({ behavior: 'smooth' });
    }

    setTimeout(() => {
      navigatingRef.current = false;
    }, 1300);
  };

  const goToPrevSection = () => {
    if (navigatingRef.current) return;
    navigatingRef.current = true;
    sounds.playScratch();

    const prevSec = document.getElementById('previa');
    if (prevSec) {
      prevSec.scrollIntoView({ behavior: 'smooth' });
    }

    setTimeout(() => {
      navigatingRef.current = false;
    }, 1300);
  };

  const handleSelectTrack = (index) => {
    sounds.playScratch();
    setActiveTrackIndex(index);
  };

  const handleTrackHover = (index) => {
    if (index !== activeTrackIndex) {
      sounds.playScratch();
      setActiveTrackIndex(index);
    }
  };

  // Cursor movement tracking over the deck:
  // Once all stacks playing are completed (at B4), downward cursor motion glides to Portafolio!
  const handleDeckMouseMove = (e) => {
    if (!isAllCompleted) {
      downwardMoveAccumulator.current = 0;
      lastMouseY.current = e.clientY;
      return;
    }

    if (lastMouseY.current !== null) {
      const deltaY = e.clientY - lastMouseY.current;
      if (deltaY > 0) {
        downwardMoveAccumulator.current += deltaY;
        if (downwardMoveAccumulator.current > 70) {
          downwardMoveAccumulator.current = 0;
          goToNextSection();
        }
      } else if (deltaY < -15) {
        downwardMoveAccumulator.current = Math.max(0, downwardMoveAccumulator.current - 20);
      }
    }
    lastMouseY.current = e.clientY;
  };

  const handleDeckMouseLeave = (e) => {
    lastMouseY.current = null;
    downwardMoveAccumulator.current = 0;

    // If cursor exits from the bottom of deck while on the final track
    if (isAllCompleted && deckRef.current) {
      const rect = deckRef.current.getBoundingClientRect();
      if (e.clientY >= rect.bottom - 15) {
        goToNextSection();
      }
    }
  };

  // Interactive mouse wheel transition over the deck from A1 to B4,
  // and once all stacks are completed, wheeling down glides to Portafolio!
  useEffect(() => {
    const deckEl = deckRef.current;
    if (!deckEl) return;

    const handleWheel = (e) => {
      const delta = e.deltaY;
      if (Math.abs(delta) < 18) return;

      // Moving down between tracks A1 -> B4
      if (delta > 0 && activeTrackIndex < totalTracks - 1) {
        e.preventDefault();
        if (wheelLockRef.current) return;
        wheelLockRef.current = true;
        sounds.playScratch();
        setActiveTrackIndex(prev => prev + 1);
        setTimeout(() => { wheelLockRef.current = false; }, 420);
      } 
      // Completed all stacks (at B4) and wheeling down -> smoothly slide to Portafolio!
      else if (delta > 0 && activeTrackIndex === totalTracks - 1) {
        e.preventDefault();
        if (wheelLockRef.current) return;
        wheelLockRef.current = true;
        goToNextSection();
        setTimeout(() => { wheelLockRef.current = false; }, 1200);
      }
      // Moving up between tracks B4 -> A1
      else if (delta < 0 && activeTrackIndex > 0) {
        e.preventDefault();
        if (wheelLockRef.current) return;
        wheelLockRef.current = true;
        sounds.playScratch();
        setActiveTrackIndex(prev => prev - 1);
        setTimeout(() => { wheelLockRef.current = false; }, 420);
      }
      // At A1 and wheeling up -> smoothly slide back to Previa!
      else if (delta < 0 && activeTrackIndex === 0) {
        e.preventDefault();
        if (wheelLockRef.current) return;
        wheelLockRef.current = true;
        goToPrevSection();
        setTimeout(() => { wheelLockRef.current = false; }, 1200);
      }
    };

    deckEl.addEventListener('wheel', handleWheel, { passive: false });
    return () => deckEl.removeEventListener('wheel', handleWheel);
  }, [activeTrackIndex, totalTracks]);

  return (
    <section 
      className="section-wrapper anchor-layer"
      style={{
        backgroundColor: '#0c0f16',
        paddingTop: 'clamp(55px, 7vh, 75px)',
        paddingBottom: 'clamp(220px, 26vh, 380px)'
      }}
    >
      <div className="container">
        
        {/* Section Header */}
        <div className="section-tag-badge" style={{ marginBottom: '16px' }}>
          <span>{trayectoria.sectionTag}</span>
        </div>

        <h2 className="section-heading-big" style={{ marginBottom: '14px' }}>
          {trayectoria.heading}
        </h2>

        <p 
          style={{
            fontFamily: 'var(--f-body)',
            fontSize: '18px',
            color: 'var(--fog)',
            maxWidth: '760px',
            marginBottom: '46px',
            lineHeight: 1.6
          }}
        >
          {trayectoria.subheading}
        </p>

        {/* Layout Grid: Stacking Cards on Left, Tracklist on Right */}
        <div 
          ref={deckRef} 
          className="deck-layout"
          onMouseMove={handleDeckMouseMove}
          onMouseLeave={handleDeckMouseLeave}
        >
          
          {/* Left: Stacking Cards Overlay Deck */}
          <div className="track-detail-stack" aria-live="polite">
            {trayectoria.tracks.map((track, i) => {
              const isActive = i === activeTrackIndex;
              const isPast = i < activeTrackIndex;
              const isFuture = i > activeTrackIndex;

              return (
                <article 
                  key={track.id || i}
                  className={`track-detail-card ${isActive ? 'active' : ''} ${isPast ? 'under' : ''} ${isFuture ? 'next' : ''}`}
                  style={{
                    '--detail-tc': track.color,
                    zIndex: isActive ? 20 : (isPast ? i + 1 : 5)
                  }}
                >
                  {/* Colored Tape Sticker on Top-Left Corner */}
                  <div 
                    className="track-detail-tape" 
                    aria-hidden="true" 
                    style={{ backgroundColor: track.color }}
                  />

                  {/* Track Code Pill */}
                  <div 
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '5px 12px',
                      borderRadius: '6px',
                      backgroundColor: track.color,
                      color: '#050608',
                      fontFamily: 'var(--f-sign)',
                      fontSize: '14px',
                      fontWeight: 900,
                      marginBottom: '15px',
                      boxShadow: '0 2px 7px rgba(0,0,0,0.35)'
                    }}
                  >
                    {track.code}
                  </div>

                  <h3 className="td-role">{track.company}</h3>
                  <p className="td-meta">
                    {track.role} · {track.period}
                  </p>

                  <ul className="td-list">
                    {track.highlights.map((point, idx) => (
                      <li key={idx}>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>

          {/* Right: Authentic Tracklist Rows with Cursor / Hover Overlay Slider Sync */}
          <div className="tracks playing">
            <ol className="tracklist">
              {trayectoria.tracks.map((t, i) => {
                const isActive = i === activeTrackIndex;
                return (
                  <li key={t.id || i}>
                    <button
                      className={`track ${isActive ? 'active-track' : ''}`}
                      type="button"
                      aria-current={isActive}
                      style={{ '--tc': t.color }}
                      onClick={() => handleSelectTrack(i)}
                      onMouseEnter={() => handleTrackHover(i)}
                    >
                      <span className="side">{t.code}</span>
                      <span>
                        <span className="t-co">{t.company}</span>
                        <span className="t-role">{t.role}</span>
                      </span>
                      <span className="t-yr">
                        <span className="eq" aria-hidden="true">
                          <i /><i /><i /><i />
                        </span>
                        {t.period}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

        </div>

      </div>
    </section>
  );
}
