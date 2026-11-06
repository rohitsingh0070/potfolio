import React, { useState, useEffect } from 'react';
import { sounds } from '../utils/soundEffects';

export default function SetlistDiscProgress({ onOpenSetlist, content }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState({ code: 'START', label: 'Intro' });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = totalScroll > 0 ? currentScroll / totalScroll : 0;
      setScrollProgress(progress);
      setVisible(currentScroll > 200);

      // Determine active section by scroll position
      const sections = [
        { id: 'contacto', code: 'OUTRO', label: 'Contacto' },
        { id: 'articulos', code: 'B3', label: 'Artículos' },
        { id: 'formacion', code: 'B2', label: 'Formación' },
        { id: 'skills', code: 'B1', label: 'Skills' },
        { id: 'portafolio', code: 'A3', label: 'Portafolio' },
        { id: 'trayectoria', code: 'A2', label: 'Trayectoria' },
        { id: 'previa', code: 'A1', label: 'La previa' },
        { id: 'inicio', code: 'START', label: 'Intro' }
      ];

      for (const sec of sections) {
        const el = document.getElementById(sec.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45) {
            setCurrentSection({ code: sec.code, label: sec.label });
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    sounds.playShutterClunk();
    onOpenSetlist();
  };

  const getSectionColor = (code) => {
    switch (code) {
      case 'START': return '#ff3b24';
      case 'A1': return '#e9ff2e';
      case 'A2': return '#22d3ff';
      case 'A3': return '#3dff8a';
      case 'B1': return '#ff3d8b';
      case 'B2': return '#ffb12b';
      case 'B3': return '#22d3ff';
      case 'OUTRO': return '#ff3b24';
      default: return '#e9ff2e';
    }
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Abrir setlist"
      title="Click para abrir setlist"
      style={{
        position: 'fixed',
        left: '20px',
        bottom: '20px',
        zIndex: 80,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '6px 18px 6px 6px',
        borderRadius: '999px',
        border: '2px solid #2c3242',
        backgroundColor: 'rgba(11, 13, 18, 0.92)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 16px 30px -10px rgba(0,0,0,0.8)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(120%)',
        transition: 'transform 0.4s var(--ease-slap), opacity 0.3s ease, border-color 0.2s ease',
        cursor: 'pointer',
        color: '#ffffff'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--yellow)';
        e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#2c3242';
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
      }}
    >
      {/* Vinyl Disc with Progress Ring */}
      <div 
        style={{
          position: 'relative',
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          padding: '3px',
          background: `conic-gradient(var(--yellow) ${scrollProgress * 360}deg, rgba(255,255,255,0.12) 0deg)`,
          display: 'grid',
          placeItems: 'center'
        }}
      >
        {/* Vinyl Surface */}
        <div 
          className="spinning-vinyl"
          style={{
            position: 'absolute',
            inset: '3px',
            borderRadius: '50%',
            background: 'repeating-radial-gradient(circle, #101218 0 1px, #1d1e26 1px 2.5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {/* Label center */}
          <div 
            style={{
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              backgroundColor: getSectionColor(currentSection.code),
              border: '1px solid #ffffff'
            }} 
          />
        </div>
      </div>

      {/* Track info text */}
      <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', lineHeight: 1.15 }}>
        <small 
          style={{
            fontFamily: 'var(--f-mono)',
            fontSize: '10px',
            fontWeight: 800,
            letterSpacing: '0.08em',
            color: 'var(--fog-2)',
            textTransform: 'uppercase'
          }}
        >
          TRACK // {currentSection.code}
        </small>
        <span style={{ fontFamily: 'var(--f-sign)', fontSize: '14px', color: '#ffffff' }}>
          {currentSection.label}
        </span>
      </div>
    </button>
  );
}
