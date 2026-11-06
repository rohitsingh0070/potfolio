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

  const handleLanguageToggle = (selectedLang) => {
    sounds.playClick();
    setLang(selectedLang);
  };

  const navLinks = [
    { id: 'previa', label: lang === 'es' ? 'LA PREVIA' : 'THE PREVIA' },
    { id: 'trayectoria', label: lang === 'es' ? 'TRAYECTORIA' : 'TRACKLIST' },
    { id: 'portafolio', label: lang === 'es' ? 'PORTAFOLIO' : 'PORTFOLIO' },
    { id: 'skills', label: 'SKILLS' },
    { id: 'formacion', label: lang === 'es' ? 'FORMACIÓN' : 'EDUCATION' },
    { id: 'articulos', label: lang === 'es' ? 'ARTÍCULOS' : 'ARTICLES' },
    { id: 'contacto', label: lang === 'es' ? 'CONTACTO' : 'CONTACT' }
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
            gap: 'clamp(14px, 2vw, 28px)'
          }}
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => sounds.playClick()}
                style={{
                  position: 'relative',
                  fontFamily: 'var(--f-mono)',
                  fontSize: '13px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  color: isActive ? '#ffffff' : 'var(--fog)',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  padding: '4px 0',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--yellow)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = isActive ? '#ffffff' : 'var(--fog)'; }}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span 
                    style={{
                      position: 'absolute',
                      bottom: '-2px',
                      left: 0,
                      right: 0,
                      height: '2px',
                      backgroundColor: 'var(--yellow)',
                      borderRadius: '2px'
                    }} 
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right Topbar Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          
          {/* Language Switcher Pill */}
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '3px',
              backgroundColor: '#11151f',
              borderRadius: '999px',
              border: '1px solid rgba(255, 255, 255, 0.12)'
            }}
          >
            <button
              onClick={() => handleLanguageToggle('es')}
              style={{
                padding: '4px 10px',
                borderRadius: '999px',
                fontSize: '11px',
                fontFamily: 'var(--f-mono)',
                fontWeight: 800,
                color: lang === 'es' ? 'var(--ink)' : 'var(--fog)',
                backgroundColor: lang === 'es' ? 'var(--yellow)' : 'transparent',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              ES
            </button>
            <button
              onClick={() => handleLanguageToggle('en')}
              style={{
                padding: '4px 10px',
                borderRadius: '999px',
                fontSize: '11px',
                fontFamily: 'var(--f-mono)',
                fontWeight: 800,
                color: lang === 'en' ? 'var(--ink)' : 'var(--fog)',
                backgroundColor: lang === 'en' ? 'var(--yellow)' : 'transparent',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              EN
            </button>
          </div>

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
            <span>WHATSAPP</span>
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
