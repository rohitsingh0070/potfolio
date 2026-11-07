import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, MessageSquare } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export default function Navbar({ lang, setLang, content, onOpenSetlist }) {
  const [isMuted, setIsMuted] = useState(sounds.isMuted());
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    const unsub = sounds.subscribe((muted) => setIsMuted(muted));
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      
      const sections = ['contacto', 'articulos', 'formacion', 'skills', 'portafolio', 'trayectoria', 'previa', 'inicio'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      unsub();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleMuteToggle = () => {
    sounds.toggleMute();
  };

  const navLinks = [
    { id: 'inicio', label: 'HOME' },
    { id: 'previa', label: 'ABOUT' },
    { id: 'trayectoria', label: 'JOURNEY' },
    { id: 'portafolio', label: 'PROJECTS' },
    { id: 'skills', label: 'SKILLS' },
    { id: 'formacion', label: 'EDUCATION' },
    { id: 'articulos', label: 'IN THE MAKING' },
    { id: 'contacto', label: 'CONTACT' }
  ];

  return (
    <>
      <header 
        className="topbar"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 90,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px',
          padding: '14px var(--gutter)',
          backgroundColor: scrolled ? 'rgba(11, 13, 18, 0.92)' : 'rgba(11, 13, 18, 0.82)',
          backdropFilter: 'blur(12px) saturate(1.2)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          transition: 'all 0.3s ease'
        }}
      >
        {/* Brand Logo matching strike.uno */}
        <a 
          href="#inicio" 
          onClick={() => sounds.playClick()}
          style={{
            display: 'inline-block',
            fontFamily: 'var(--f-tag)',
            fontSize: '34px',
            lineHeight: 1,
            color: 'var(--yellow)',
            textShadow: '2.5px 2.5px 0 var(--pink)',
            transform: 'rotate(-4deg)',
            textDecoration: 'none',
            letterSpacing: '0.04em',
            transition: 'transform 0.2s ease'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'rotate(-2deg) scale(1.06)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'rotate(-4deg) scale(1)'; }}
        >
          ROHIT
        </a>

        {/* Center Desktop Navigation Links */}
        <nav 
          className="desktop-nav"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(10px, 1.3vw, 22px)'
          }}
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => sounds.playClick()}
                className={`nav-link-anchor ${isActive ? 'active' : ''}`}
              >
                <span>{link.label}</span>
                <svg
                  className="nav-pink-underline"
                  viewBox="0 0 100 8"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M 2 5.5 C 22 6.8, 45 6.2, 68 3.8 C 82 2.4, 92 3.2, 98 4.2"
                    fill="none"
                    stroke="#ff3d8b"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                  />
                </svg>
              </a>
            );
          })}
        </nav>

        {/* Right Topbar Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          
          {/* Sound FX Toggle (Circular icon button) */}
          <button
            onClick={handleMuteToggle}
            title={isMuted ? "Enable sounds" : "Mute sounds"}
            aria-label="Toggle sound"
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: '#11151f',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: isMuted ? 'var(--fog-2)' : 'var(--yellow)',
              display: 'grid',
              placeItems: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--yellow)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)'; }}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>

          {/* WhatsApp Neon Pill Button */}
          <a
            href="https://wa.me/919142671893?text=Hi%20Rohit%2C%20let%27s%20connect"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sounds.playClick()}
            className="topbar-wa-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 18px',
              borderRadius: '999px',
              backgroundColor: '#4EFA94',
              border: '2px solid #0b0d12',
              color: '#0b0d12',
              fontFamily: 'var(--f-sign)',
              fontSize: '13px',
              fontWeight: 400,
              textDecoration: 'none',
              boxShadow: '0 4px 12px rgba(78, 250, 148, 0.3)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05) rotate(1deg)';
              e.currentTarget.style.boxShadow = '0 6px 18px rgba(78, 250, 148, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(78, 250, 148, 0.3)';
            }}
          >
            <MessageSquare size={16} strokeWidth={2.4} />
            <span className="wa-text">WHATSAPP</span>
          </a>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => {
              sounds.playShutterClunk();
              onOpenSetlist();
            }}
            className="mobile-menu-trigger"
            aria-label="Abrir menú"
            style={{
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: '#11151f',
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#ffffff',
              cursor: 'pointer'
            }}
          >
            <Menu size={18} />
          </button>

        </div>

      </header>

      {/* Awwwards Vertical Ribbon Banner pinned on right edge */}
      <div 
        className="awwwards-ribbon"
        style={{
          position: 'fixed',
          top: '50%',
          right: 0,
          zIndex: 85,
          transform: 'translateY(-50%)',
          backgroundColor: '#5ABDB2',
          padding: '16px 8px',
          borderRadius: '8px 0 0 8px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
          transition: 'transform 0.2s ease'
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-50%) translateX(-4px)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(-50%) translateX(0)'; }}
      >
        <div style={{ fontFamily: 'var(--f-sign)', fontSize: '18px', color: '#ffffff', fontWeight: 900 }}>
          W.
        </div>
        <div 
          style={{
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
            fontFamily: 'var(--f-mono)',
            fontSize: '11px',
            fontWeight: 800,
            letterSpacing: '0.12em',
            color: '#ffffff',
            textTransform: 'uppercase'
          }}
        >
          Nominee
        </div>
      </div>
    </>
  );
}
