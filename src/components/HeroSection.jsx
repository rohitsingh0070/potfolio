import React from 'react';
import { Mail, MessageSquare } from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import userPhoto from '../assets/pic(1)(1).png';

export default function HeroSection({ content }) {
  const { hero } = content;

  return (
    <section 
      className="hero-section"
      style={{
        position: 'relative',
        paddingTop: 'clamp(100px, 13vh, 140px)',
        paddingBottom: '60px',
        overflow: 'hidden',
        backgroundImage: 'var(--ribs)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
      }}
    >
      {/* Background Graffiti Watermark "ROHIT" */}
      <div 
        style={{
          position: 'absolute',
          top: '30px',
          left: '35%',
          transform: 'translateX(-50%) rotate(-4deg)',
          fontFamily: 'var(--f-tag)',
          fontSize: 'clamp(9rem, 24vw, 20rem)',
          lineHeight: 0.8,
          color: 'rgba(255, 255, 255, 0.035)',
          userSelect: 'none',
          pointerEvents: 'none',
          zIndex: 1,
          whiteSpace: 'nowrap'
        }}
      >
        ROHIT
      </div>

      {/* Pink Spray Glow behind nametag */}
      <div 
        style={{
          position: 'absolute',
          top: '20%',
          left: '15%',
          width: '460px',
          height: '460px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 61, 139, 0.12) 0%, transparent 65%)',
          pointerEvents: 'none',
          zIndex: 1
        }} 
      />

      {/* Floating Sticker 1: White "ROHIT" peeking behind badge */}
      <div 
        style={{
          position: 'absolute',
          top: '10%',
          left: 'clamp(10px, 4vw, 50px)',
          padding: '6px 16px',
          borderRadius: '8px',
          border: '2px solid #ffffff',
          backgroundColor: '#f4f1ea',
          color: '#0b0d12',
          fontFamily: 'var(--f-tag)',
          fontSize: '20px',
          transform: 'rotate(-8deg)',
          boxShadow: 'var(--sticker-shadow)',
          zIndex: 1,
          pointerEvents: 'none'
        }}
      >
        ROHIT
      </div>

      {/* Floating Sticker 2: Yellow "14 MVPS" */}
      <div 
        style={{
          position: 'absolute',
          top: '12%',
          left: '46%',
          padding: '6px 16px',
          borderRadius: '999px',
          border: '2px solid #ffffff',
          backgroundColor: 'var(--yellow)',
          color: '#0b0d12',
          fontFamily: 'var(--f-sign)',
          fontSize: '12.5px',
          fontWeight: 900,
          transform: 'rotate(12deg)',
          boxShadow: 'var(--sticker-shadow)',
          zIndex: 3,
          pointerEvents: 'none'
        }}
      >
        14 MVPS
      </div>

      {/* Floating Sticker 3: Cyan "DESIGN SPRINT" */}
      <div 
        style={{
          position: 'absolute',
          top: '11%',
          right: 'clamp(15px, 6vw, 90px)',
          padding: '6px 18px',
          borderRadius: '999px',
          border: '2.5px solid #0055ff',
          backgroundColor: 'var(--cyan)',
          color: '#0b0d12',
          fontFamily: 'var(--f-sign)',
          fontSize: '13px',
          fontWeight: 900,
          transform: 'rotate(8deg)',
          boxShadow: '0 4px 14px rgba(34, 211, 255, 0.4), var(--sticker-shadow)',
          zIndex: 3,
          pointerEvents: 'none'
        }}
      >
        DESIGN SPRINT
      </div>

      {/* Floating Sticker 4: Red "IA" */}
      <div 
        style={{
          position: 'absolute',
          bottom: '22%',
          left: '49%',
          width: '38px',
          height: '38px',
          borderRadius: '8px',
          border: '2px solid #ffffff',
          backgroundColor: 'var(--red)',
          color: '#ffffff',
          fontFamily: 'var(--f-sign)',
          fontSize: '15px',
          display: 'grid',
          placeItems: 'center',
          transform: 'rotate(6deg)',
          boxShadow: 'var(--sticker-shadow)',
          zIndex: 3,
          pointerEvents: 'none'
        }}
      >
        IA
      </div>

      {/* Bottom Right Glowing Bokeh Orbs */}
      <div 
        style={{
          position: 'absolute',
          bottom: '14%',
          right: 'clamp(10px, 4vw, 60px)',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(233, 255, 46, 0.75) 0%, rgba(233, 255, 46, 0.1) 70%)',
          filter: 'blur(10px)',
          zIndex: 2,
          pointerEvents: 'none'
        }} 
      />
      <div 
        style={{
          position: 'absolute',
          bottom: '16%',
          right: 'clamp(30px, 6vw, 90px)',
          width: '54px',
          height: '54px',
          borderRadius: '50%',
          background: 'rgba(255, 61, 139, 0.85)',
          display: 'grid',
          placeItems: 'center',
          color: 'var(--yellow)',
          fontFamily: 'var(--f-sign)',
          fontSize: '12px',
          zIndex: 3,
          boxShadow: '0 4px 16px rgba(255, 61, 139, 0.6)'
        }} 
      >
        UX
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        
        {/* Main 2-Column Hero Layout */}
        <div className="hero-inner">
          
          {/* Left Column: Nametag Badge, Role, Lede, CTA Buttons */}
          <div>
            
            {/* The Iconic "HELLO MY NAME IS" Nametag */}
            <div 
              style={{
                width: 'min(100%, 720px)',
                borderRadius: '26px',
                border: '6px solid #ffffff',
                backgroundColor: 'var(--red)',
                boxShadow: '0 30px 60px -20px rgba(0,0,0,0.8), var(--sticker-shadow)',
                transform: 'rotate(-4deg)',
                transformOrigin: '20% 50%',
                transition: 'transform 0.4s var(--ease-slap)',
                overflow: 'hidden',
                cursor: 'pointer',
                marginBottom: '40px'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'rotate(-1.5deg) scale(1.02)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'rotate(-4deg) scale(1)'; }}
              onClick={() => sounds.playClick()}
            >
              {/* Header: HEY YO they call me */}
              <div 
                style={{
                  padding: '20px 28px 14px',
                  textAlign: 'center',
                  color: '#ffffff'
                }}
              >
                <div 
                  style={{
                    fontFamily: 'var(--f-sign)',
                    fontSize: 'clamp(3rem, 6.2vw, 4.6rem)',
                    lineHeight: 0.95,
                    letterSpacing: '-0.02em',
                    textTransform: 'uppercase'
                  }}
                >
                  HEY YO
                </div>
                <div 
                  style={{
                    fontFamily: 'var(--f-body)',
                    fontSize: '17px',
                    fontWeight: 600,
                    marginTop: '5px',
                    letterSpacing: '0.02em'
                  }}
                >
                  they call me
                </div>
              </div>

              {/* Body: ROHIT handwritten marker */}
              <div 
                style={{
                  margin: '0 16px 16px',
                  padding: '16px 28px 30px',
                  borderRadius: '14px',
                  backgroundColor: '#ffffff',
                  color: '#0b0d12',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <span 
                  style={{
                    fontFamily: 'var(--f-tag)',
                    fontWeight: 400,
                    fontSize: 'clamp(5.4rem, 13vw, 9.2rem)',
                    lineHeight: 1,
                    letterSpacing: '-0.01em',
                    transform: 'rotate(-3deg) translateY(6px)',
                    color: '#0b0d12',
                    userSelect: 'none'
                  }}
                >
                  ROHIT
                </span>
              </div>
            </div>

            {/* Role Title in Bungee / blocky font */}
            <h2 
              style={{
                fontFamily: 'var(--f-sign)',
                fontSize: 'clamp(2.1rem, 3.8vw, 3.3rem)',
                lineHeight: 1.15,
                color: '#ffffff',
                textTransform: 'uppercase',
                marginBottom: '14px'
              }}
            >
              AI ML ENGINEER <span style={{ color: 'var(--lamp)' }}>&amp;</span> AI ENGINEER
            </h2>

            {/* Role Subtitle in Cyan */}
            <div 
              style={{
                color: 'var(--cyan)',
                fontFamily: 'var(--f-mono)',
                fontSize: 'clamp(13.5px, 1.5vw, 16px)',
                fontWeight: 800,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '22px'
              }}
            >
              DEEP LEARNING • NLP • MLOps • AI AGENT • GENERATIVE AI
            </div>

            {/* Lede Bio Text */}
            <p 
              style={{
                fontFamily: 'var(--f-body)',
                fontSize: 'clamp(16.5px, 1.7vw, 19.5px)',
                lineHeight: 1.65,
                color: 'var(--chalk)',
                maxWidth: '680px',
                marginBottom: '40px'
              }}
            >
              I bridge the gap between complex data and scalable AI solutions. From designing robust ML architectures to deploying MLOps pipelines and Generative AI, I build systems that solve real-world problems. Let’s build something intelligent.
            </p>

            {/* CTA Buttons Row */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
              
              {/* Yellow Email Button */}
              <a
                href="mailto:rohitkumar.ds33@gmail.com?subject=Let%27s%20connect"
                onClick={() => sounds.playClick()}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '14px 30px',
                  borderRadius: '999px',
                  backgroundColor: 'var(--yellow)',
                  border: '2.5px solid #0b0d12',
                  color: '#0b0d12',
                  fontFamily: 'var(--f-sign)',
                  fontSize: '15px',
                  textTransform: 'lowercase',
                  textDecoration: 'none',
                  boxShadow: 'var(--sticker-shadow)',
                  transform: 'rotate(-1.5deg)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'rotate(-3deg) scale(1.05)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'rotate(-1.5deg) scale(1)'; }}
              >
                <Mail size={18} strokeWidth={2.4} />
                <span>rohitkumar.ds33@gmail.com</span>
              </a>

              {/* Green WhatsApp Button */}
              <a
                href="https://wa.me/919142671893?text=Hi%20Rohit%2C%20let%27s%20connect"
                target="_blank"
                rel="noreferrer"
                onClick={() => sounds.playClick()}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '14px 30px',
                  borderRadius: '999px',
                  backgroundColor: '#4EFA94',
                  border: '2.5px solid #0b0d12',
                  color: '#0b0d12',
                  fontFamily: 'var(--f-sign)',
                  fontSize: '15px',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  boxShadow: 'var(--sticker-shadow)',
                  transform: 'rotate(1.5deg)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'rotate(3deg) scale(1.05)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'rotate(1.5deg) scale(1)'; }}
              >
                <MessageSquare size={18} strokeWidth={2.4} />
                <span>WHATSAPP</span>
              </a>

            </div>

          </div>

          {/* Right Column: Polaroid Photo Frame with tape & mini-sticker */}
          <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
            
            <figure 
              className="photo-sticker"
              style={{
                position: 'relative',
                width: 'min(100%, 530px)',
                backgroundColor: '#ffffff',
                borderRadius: '22px',
                padding: '18px 18px 0 18px',
                boxShadow: 'var(--sticker-shadow), 0 40px 70px -25px rgba(0, 0, 0, 0.85)',
                transform: 'rotate(3.5deg)',
                transition: 'transform 0.5s var(--ease-slap)'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'rotate(1.5deg) scale(1.02)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'rotate(3.5deg) scale(1)'; }}
            >
              {/* Semi-transparent Masking Tape at Top Center */}
              <span 
                style={{
                  position: 'absolute',
                  top: '-18px',
                  left: '50%',
                  marginLeft: '-72px',
                  width: '144px',
                  height: '38px',
                  backgroundColor: 'rgba(244, 241, 234, 0.75)',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.25)',
                  transform: 'rotate(-3deg)',
                  borderRadius: '2px',
                  zIndex: 5,
                  pointerEvents: 'none'
                }} 
              />

              {/* User Photo */}
              <img 
                src={userPhoto} 
                alt={hero.name || "Rohit Singh"}
                style={{
                  width: '100%',
                  aspectRatio: '1 / 1',
                  objectFit: 'cover',
                  objectPosition: 'center 20%',
                  borderRadius: '12px',
                  display: 'block'
                }} 
              />

              {/* Pink Overlay Mini-Sticker "LET'S DESIGN FOR REAL PEOPLE" */}
              <span 
                style={{
                  position: 'absolute',
                  left: '-16px',
                  bottom: '48px',
                  zIndex: 6,
                  padding: '8px 14px',
                  borderRadius: '8px',
                  border: '3px solid #ffffff',
                  backgroundColor: 'var(--pink)',
                  color: '#0b0d12',
                  fontFamily: 'var(--f-sign)',
                  fontSize: '12px',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  transform: 'rotate(-6deg)',
                  boxShadow: 'var(--sticker-shadow)',
                  whiteSpace: 'nowrap',
                  pointerEvents: 'none'
                }}
              >
                LET’S DESIGN FOR REAL PEOPLE
              </span>

              {/* Handwritten Signature Caption on Polaroid Margin */}
              <figcaption 
                style={{
                  padding: '12px 8px 18px',
                  textAlign: 'right',
                  fontFamily: 'var(--f-tag)',
                  fontSize: '28px',
                  color: '#0b0d12',
                  userSelect: 'none'
                }}
              >
                ROHIT SINGH
              </figcaption>
            </figure>

          </div>

        </div>

        {/* LED 7-Segment Digital Metric Strip below Hero */}
        <div 
          style={{
            marginTop: '70px',
            padding: '24px 36px',
            borderRadius: '24px',
            backgroundColor: '#0c0f16',
            border: '2px solid #232938',
            boxShadow: '0 20px 40px -10px rgba(0,0,0,0.8)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '24px'
          }}
        >
          {hero.metrics.map((metric, idx) => (
            <div 
              key={idx}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '10px 18px',
                borderLeft: idx > 0 ? '1px solid rgba(255, 255, 255, 0.08)' : 'none'
              }}
            >
              <div 
                style={{
                  fontFamily: 'var(--f-sign)',
                  fontSize: 'clamp(2.4rem, 4.2vw, 3.6rem)',
                  lineHeight: 1,
                  color: metric.color,
                  letterSpacing: '0.02em',
                  textShadow: `0 0 20px ${metric.color}55`,
                  marginBottom: '8px'
                }}
              >
                {metric.value}
              </div>
              <div 
                style={{
                  fontFamily: 'var(--f-body)',
                  fontSize: '13.5px',
                  color: 'var(--fog-2)',
                  fontWeight: 600,
                  textTransform: 'uppercase'
                }}
              >
                {metric.label}
              </div>
            </div>
          ))}
        </div>

      </div>

    </section>
  );
}
