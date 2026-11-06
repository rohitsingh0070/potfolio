import React from 'react';
import { X, ArrowRight, Mail, MessageSquare, Disc } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export default function SetlistDrawer({ isOpen, onClose, content }) {
  const handleItemClick = (id) => {
    sounds.playClick();
    onClose();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleClose = () => {
    sounds.playShutterClunk();
    onClose();
  };

  return (
    <div 
      className={`shutter-overlay ${isOpen ? 'open' : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-hidden={!isOpen}
    >
      <div className="shutter-panel">
        
        {/* Top Header of the drawer */}
        <div 
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '40px',
            borderBottom: '2px solid rgba(255, 255, 255, 0.08)',
            paddingBottom: '20px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div 
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'var(--yellow)',
                display: 'grid',
                placeItems: 'center',
                color: 'var(--ink)'
              }}
            >
              <Disc size={18} className="spinning-vinyl" />
            </div>
            <span style={{ fontFamily: 'var(--f-sign)', fontSize: '24px', letterSpacing: '0.04em' }}>
              SETLIST // TRACKS
            </span>
          </div>

          <button
            onClick={handleClose}
            aria-label="Cerrar setlist"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              color: '#ffffff',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--red)';
              e.currentTarget.style.borderColor = '#ffffff';
              e.currentTarget.style.transform = 'scale(1.1) rotate(90deg)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
            }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Setlist Tracks Navigation */}
        <div className="container" style={{ maxWidth: '960px' }}>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {content.nav.menuItems.map((item, idx) => {
              const colors = ['#ff3b24', '#e9ff2e', '#22d3ff', '#3dff8a', '#ff3d8b', '#ffb12b', '#22d3ff', '#ff3b24'];
              const itemColor = colors[idx % colors.length];

              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleItemClick(item.id);
                    }}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '70px minmax(0, 1fr) auto',
                      alignItems: 'center',
                      gap: '16px',
                      padding: '14px 18px',
                      borderRadius: '16px',
                      backgroundColor: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      transition: 'all 0.25s var(--ease-out)',
                      textDecoration: 'none'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                      e.currentTarget.style.borderColor = itemColor;
                      e.currentTarget.style.transform = 'translateX(10px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    {/* Badge */}
                    <div 
                      style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        border: '2px solid #ffffff',
                        backgroundColor: itemColor,
                        color: 'var(--ink)',
                        fontFamily: 'var(--f-sign)',
                        fontSize: '12px',
                        textAlign: 'center',
                        transform: 'rotate(-3deg)'
                      }}
                    >
                      {item.code}
                    </div>

                    {/* Title & Description */}
                    <div>
                      <div 
                        style={{
                          fontFamily: 'var(--f-sign)',
                          fontSize: 'clamp(1.4rem, 3.5vw, 2.4rem)',
                          lineHeight: 1.1,
                          color: '#ffffff'
                        }}
                      >
                        {item.label}
                      </div>
                      <div style={{ fontFamily: 'var(--f-body)', fontSize: '14px', color: 'var(--fog-2)', marginTop: '2px' }}>
                        {item.desc}
                      </div>
                    </div>

                    {/* Arrow */}
                    <ArrowRight size={20} color={itemColor} />
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Quick Footer Action Row */}
          <div 
            style={{
              marginTop: '48px',
              paddingTop: '24px',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px'
            }}
          >
            <div style={{ display: 'flex', gap: '16px' }}>
              <a 
                href={`mailto:${content.contacto.email}`}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--fog)', fontSize: '14px', fontWeight: 600 }}
                onClick={() => sounds.playClick()}
              >
                <Mail size={16} color="var(--yellow)" />
                <span>{content.contacto.email}</span>
              </a>
              <a 
                href="https://wa.me/919142671893?text=Hi%20Rohit%2C%20let%27s%20connect"
                target="_blank"
                rel="noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--fog)', fontSize: '14px', fontWeight: 600 }}
                onClick={() => sounds.playClick()}
              >
                <MessageSquare size={16} color="var(--green)" />
                <span>WhatsApp</span>
              </a>
            </div>

            <button
              onClick={() => handleItemClick('contacto')}
              className="btn-slap"
              style={{ fontSize: '13px', padding: '10px 22px' }}
            >
              <span>{content.hero.ctaPrimary}</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
