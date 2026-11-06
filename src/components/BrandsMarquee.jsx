import React from 'react';
import { Sparkles, Disc } from 'lucide-react';

export default function BrandsMarquee({ brands }) {
  // Duplicate array for continuous scroll
  const marqueeItems = [...brands, ...brands];

  return (
    <div 
      style={{
        position: 'relative',
        padding: '24px 0',
        backgroundColor: '#07090d',
        borderTop: '2px solid #232938',
        borderBottom: '2px solid #232938',
        overflow: 'hidden',
        userSelect: 'none'
      }}
    >
      <div className="marquee-roller">
        {marqueeItems.map((brand, i) => (
          <div 
            key={i} 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              paddingInline: '28px',
              whiteSpace: 'nowrap'
            }}
          >
            <span 
              style={{
                fontFamily: 'var(--f-sign)',
                fontSize: '18px',
                color: 'var(--fog-2)',
                letterSpacing: '0.08em',
                transition: 'color 0.2s ease, transform 0.2s ease',
                cursor: 'default'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--yellow)';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--fog-2)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              {brand}
            </span>
            <Sparkles size={14} color="var(--yellow)" />
          </div>
        ))}
      </div>
    </div>
  );
}
