import React, { useState, useRef, useEffect } from 'react';
import { RotateCcw, Move } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export default function SectionSkills({ content }) {
  const { skills } = content;
  const containerRef = useRef(null);

  // Compute pixel positions from relative percentages based on container dimensions
  const getInitialStickers = () => {
    const width = containerRef.current ? containerRef.current.clientWidth : 1400;
    const height = containerRef.current ? containerRef.current.clientHeight : 720;

    return skills.items.map((item, index) => {
      // Safe padding bounds for enlarged stickers
      const x = Math.max(15, Math.min(width - 240, (item.xPct / 100) * width));
      const y = Math.max(15, Math.min(height - 140, (item.yPct / 100) * height));

      return {
        ...item,
        x,
        y,
        rotation: item.angle || 0,
        zIndex: index + 1
      };
    });
  };

  const [stickerPositions, setStickerPositions] = useState([]);
  const [activeDragId, setActiveDragId] = useState(null);
  const dragOffset = useRef({ x: 0, y: 0 });
  const highestZ = useRef(40);

  // Initialize and handle resize
  useEffect(() => {
    if (containerRef.current) {
      setStickerPositions(getInitialStickers());
    }

    const handleResize = () => {
      if (!activeDragId && containerRef.current) {
        setStickerPositions(getInitialStickers());
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [skills.items]);

  const handlePointerDown = (e, id) => {
    e.preventDefault();
    sounds.playClick();
    highestZ.current += 1;

    const sticker = stickerPositions.find((s) => s.id === id);
    if (!sticker || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const pointerX = e.clientX - rect.left;
    const pointerY = e.clientY - rect.top;

    dragOffset.current = {
      x: pointerX - sticker.x,
      y: pointerY - sticker.y
    };

    setActiveDragId(id);

    setStickerPositions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, zIndex: highestZ.current } : s))
    );
  };

  const handlePointerMove = (e) => {
    if (!activeDragId || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pointerX = e.clientX - rect.left;
    const pointerY = e.clientY - rect.top;

    setStickerPositions((prev) =>
      prev.map((s) => {
        if (s.id !== activeDragId) return s;
        return {
          ...s,
          x: Math.max(0, Math.min(rect.width - 120, pointerX - dragOffset.current.x)),
          y: Math.max(0, Math.min(rect.height - 90, pointerY - dragOffset.current.y))
        };
      })
    );
  };

  const handlePointerUp = () => {
    if (activeDragId) {
      sounds.playClick();
      setActiveDragId(null);
    }
  };

  const handleReset = () => {
    sounds.playClick();
    setStickerPositions(getInitialStickers());
  };

  // Shuffled brand names for SectionSkills
  const shuffledBrands = [
    'OpenAI',
    'NVIDIA',
    'PyTorch',
    'Apache Spark',
    'Hugging Face',
    'Linux',
    'Databricks',
    'Scikit-Learn'
  ];
  const half = [...shuffledBrands, ...shuffledBrands];
  const allTapeItems = [...half, ...half];

  return (
    <section 
      className="section-wrapper anchor-layer"
      style={{
        backgroundColor: '#0a0d14',
        paddingTop: '0px',
        paddingBottom: '110px',
        position: 'relative',
        overflow: 'visible',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
      }}
    >
      {/* Moving White Brand Tape Band with Shuffled Brands */}
      <div className="brand-tape-band tape-white" aria-hidden="true">
        <div className="brand-tape-track">
          {allTapeItems.map((brand, idx) => (
            <span key={idx} className="brand-tape-item">
              {brand}
            </span>
          ))}
        </div>
      </div>

      <div style={{ width: '100%', maxWidth: '1720px', margin: '0 auto', padding: '36px clamp(16px, 2.5vw, 36px) 0' }}>
        
        {/* Section Header */}
        <div className="section-tag-badge">
          <span>{skills.sectionTag}</span>
        </div>

        <div 
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '20px',
            marginBottom: '32px'
          }}
        >
          <div>
            <h2 className="section-heading-big" style={{ marginBottom: '8px' }}>
              {skills.heading}
            </h2>
            <p 
              style={{
                fontFamily: 'var(--f-body)',
                fontSize: '16px',
                color: 'var(--yellow)',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Move size={15} />
              <span>{skills.instruction}</span>
            </p>
          </div>

          <button
            onClick={handleReset}
            className="btn-slap secondary"
            style={{ fontSize: '13px', padding: '10px 22px' }}
          >
            <RotateCcw size={15} />
            <span>{skills.resetButton}</span>
          </button>
        </div>

        {/* Draggable Static Sticker Canvas */}
        <div 
          ref={containerRef}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          className="sticker-canvas"
          style={{
            position: 'relative',
            width: '100%',
            height: 'clamp(760px, 84vh, 880px)',
            backgroundColor: '#0b0e15',
            borderRadius: '26px',
            border: '8px dotted rgba(255, 255, 255, 0.08)',
            boxShadow: 'inset 0 0 60px rgba(0, 0, 0, 0.9), 0 24px 50px rgba(0, 0, 0, 0.7)',
            overflow: 'hidden',
            touchAction: 'none',
            userSelect: 'none',
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent 0 24px, rgba(255, 255, 255, 0.035) 24px 25px),
              radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.035) 1px, transparent 1px)
            `,
            backgroundSize: '100% 100%, 24px 24px'
          }}
        >
          {/* Faint Giant Outline Watermark "SKILLS" */}
          <div 
            style={{
              position: 'absolute',
              top: '25px',
              left: '45px',
              fontFamily: 'var(--f-head)',
              fontSize: 'clamp(4.5rem, 13vw, 11rem)',
              lineHeight: 0.9,
              color: 'transparent',
              WebkitTextStroke: '2px rgba(255, 255, 255, 0.045)',
              userSelect: 'none',
              pointerEvents: 'none',
              zIndex: 1,
              letterSpacing: '0.04em'
            }}
          >
            SKILLS
          </div>

          {/* 16 Draggable Interactive Stickers */}
          {stickerPositions.map((stk) => {
            const isDragging = stk.id === activeDragId;
            const isCircle = stk.shape === 'circle';
            const isHandwritten = stk.font === 'hand';
            const isGenAI = stk.id === 's12' || stk.name.includes('GENERATIVE');

            return (
              <div
                key={stk.id}
                className={`sticker-item ${isDragging ? 'is-dragging' : ''}`}
                onPointerDown={(e) => handlePointerDown(e, stk.id)}
                style={{
                  left: `${stk.x}px`,
                  top: `${stk.y}px`,
                  zIndex: stk.zIndex
                }}
              >
                {/* Rotated Static Sticker Wrapper */}
                <div 
                  style={{
                    transform: `rotate(${stk.rotation}deg)`
                  }}
                >
                  {/* Smooth Tactile Hover Lift Wrapper */}
                  <div className="hover-lift">
                    {/* Sticker Body */}
                    <div
                      className="sticker-inner"
                      style={{
                        backgroundColor: stk.color,
                        color: '#0b0d12',
                        fontFamily: isHandwritten ? 'var(--f-tag)' : 'var(--f-sign)',
                        fontSize: isGenAI
                          ? 'clamp(18px, 1.6vw, 23px)'
                          : isCircle 
                          ? 'clamp(16.5px, 1.45vw, 21px)' 
                          : stk.name.length > 24 
                          ? 'clamp(15.5px, 1.35vw, 19.5px)' 
                          : stk.name.length > 17
                          ? 'clamp(18px, 1.6vw, 22.5px)'
                          : 'clamp(20.5px, 1.85vw, 26px)',
                        fontWeight: isCircle ? 900 : isHandwritten ? 700 : 900,
                        textTransform: 'uppercase',
                        textAlign: isCircle ? 'center' : 'left',
                        lineHeight: isCircle ? 1.15 : 1,
                        letterSpacing: isCircle ? '0.03em' : isHandwritten ? '0.04em' : '0.03em',
                        ...(isCircle ? {
                          width: isGenAI ? 'clamp(182px, 14.8vw, 222px)' : 'clamp(160px, 13vw, 195px)',
                          height: isGenAI ? 'clamp(182px, 14.8vw, 222px)' : 'clamp(160px, 13vw, 195px)',
                          borderRadius: '50%',
                          padding: isGenAI ? '22px' : '20px',
                          whiteSpace: 'pre-line'
                        } : stk.shape === 'pill' ? {
                          borderRadius: '999px',
                          padding: stk.name.length > 24 ? '18px 36px' : '22px 52px',
                          whiteSpace: stk.name.includes('\n') ? 'pre-line' : 'nowrap'
                        } : stk.shape === 'label' ? {
                          borderRadius: '4px',
                          padding: stk.name.length > 24 ? '17px 34px' : '21px 48px',
                          whiteSpace: stk.name.includes('\n') ? 'pre-line' : 'nowrap'
                        } : {
                          borderRadius: '8px',
                          padding: stk.name.length > 24 ? '17px 34px' : '21px 48px',
                          whiteSpace: stk.name.includes('\n') ? 'pre-line' : 'nowrap'
                        })
                      }}
                    >
                      <span
                        style={{
                          maxWidth: isGenAI ? '150px' : isCircle ? '135px' : 'none',
                          display: 'inline-block',
                          textAlign: isCircle || stk.name.includes('\n') ? 'center' : 'left',
                          lineHeight: stk.name.includes('\n') ? 1.15 : isCircle ? 1.15 : 1,
                          whiteSpace: stk.name.includes('\n') ? 'pre-line' : 'nowrap',
                          wordBreak: 'break-word'
                        }}
                      >
                        {stk.name}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
