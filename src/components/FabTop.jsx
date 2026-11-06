import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export default function FabTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    sounds.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Volver arriba"
      title="Volver arriba"
      style={{
        position: 'fixed',
        right: '20px',
        bottom: '20px',
        zIndex: 80,
        width: '54px',
        height: '54px',
        borderRadius: '50%',
        border: '3px solid #ffffff',
        backgroundColor: 'var(--yellow)',
        color: 'var(--ink)',
        display: 'grid',
        placeItems: 'center',
        boxShadow: 'var(--sticker-shadow)',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transform: visible ? 'translateY(0) rotate(-14deg)' : 'translateY(120%) rotate(-30deg)',
        transition: 'opacity 0.3s ease, transform 0.4s var(--ease-slap)',
        cursor: 'pointer'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-3px) rotate(-6deg) scale(1.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0) rotate(-14deg) scale(1)';
      }}
    >
      <ArrowUp size={24} strokeWidth={2.8} />
    </button>
  );
}
