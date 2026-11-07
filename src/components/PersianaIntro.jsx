import React, { useState, useEffect, useRef } from 'react';
import { sounds } from '../utils/soundEffects';

export default function PersianaIntro({ onComplete }) {
  const [isRollingUp, setIsRollingUp] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const touchStartY = useRef(null);

  const handleOpen = () => {
    if (isRollingUp || isDismissed) return;
    setIsRollingUp(true);
    sounds.playShutterClunk();

    // After animation completes, remove from DOM and show home page
    setTimeout(() => {
      setIsDismissed(true);
      window.scrollTo({ top: 0, behavior: 'instant' });
      if (onComplete) onComplete();
    }, 950);
  };

  useEffect(() => {
    // Smooth auto-slide after 1.4 seconds: perfect balance to view ROHIT before smooth reveal
    const timer = setTimeout(() => {
      handleOpen();
    }, 1400);

    // Keyboard trigger (Enter, Space, Arrow keys, Escape)
    const handleKeyDown = (e) => {
      if (['Enter', ' ', 'ArrowUp', 'ArrowDown', 'Escape'].includes(e.key)) {
        handleOpen();
      }
    };

    // Scroll wheel trigger
    const handleWheel = (e) => {
      if (Math.abs(e.deltaY) > 6) {
        handleOpen();
      }
    };

    // Touch support (swipe up or tap)
    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      if (touchStartY.current !== null) {
        const diff = touchStartY.current - e.changedTouches[0].clientY;
        if (diff > 30) {
          handleOpen(); // Swiped up
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isRollingUp, isDismissed]);

  if (isDismissed) return null;

  return (
    <div
      className={`persiana-intro-curtain ${isRollingUp ? 'rolling-up' : ''}`}
      onClick={handleOpen}
      role="button"
      tabIndex={0}
      aria-label="Sube la persiana - Click to open portfolio"
    >
      {/* Dark Ribbed Shutter Background Texture */}
      <div className="persiana-texture-layer" />

      {/* Subtle Vignette & Lighting */}
      <div className="persiana-lighting-layer" />

      {/* Main Center Graffiti Section - Absolute Dead Center */}
      <div 
        className="persiana-content-wrap"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          margin: 0,
          padding: 0,
          pointerEvents: 'none'
        }}
      >
        <h1 
          className="persiana-tag-title"
          style={{
            fontFamily: "var(--f-tag, 'Permanent Marker', cursive)",
            fontSize: 'clamp(74px, 16vw, 190px)',
            lineHeight: 1,
            color: '#e9ff2e',
            letterSpacing: '0.03em',
            textShadow: '3px 3px 0 #ff3d8b, 6px 6px 0 #ff3d8b, 9px 9px 0 #ff3d8b, 14px 14px 24px rgba(0, 0, 0, 0.95)',
            transform: 'rotate(-3.5deg)',
            margin: 0,
            padding: 0,
            display: 'inline-block',
            userSelect: 'none',
            whiteSpace: 'nowrap'
          }}
        >
          ROHIT
        </h1>
      </div>

      {/* Industrial Metallic Slide / Handle Bar at Bottom */}
      <div className="persiana-bottom-bar" aria-hidden="true">
        <div className="persiana-handle-grip">
          <div className="persiana-handle-grooves" />
        </div>
      </div>
    </div>
  );
}

