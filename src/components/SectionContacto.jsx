import React from 'react';
import { Mail, MessageSquare, ArrowUp } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

// Icons for LinkedIn, Behance and Medium
const LinkedInIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
  </svg>
);

const BehanceIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-4.085 0-5.625-3-5.625-6.5 0-3.625 1.775-6.5 5.5-6.5 4.3 0 5.125 3.525 4.8 6.5h-7.85c0 2.2 1.3 3.65 3.325 3.65 1.55 0 2.45-.775 2.85-1.65l2.101 1.5zm-5.226-5.5c-.025-1.425-.75-2.65-2.35-2.65-1.65 0-2.325 1.225-2.4 2.65h4.75zm-12.5-6.5h-6v14h6.5c3.2 0 5.5-1.8 5.5-4.8 0-1.8-.9-3.2-2.3-3.9 1.1-.6 1.8-1.9 1.8-3.3 0-2.6-2-4-5.5-4zm-3 5v-2.5h2.8c1.3 0 2.2.6 2.2 1.25 0 .7-.9 1.25-2.2 1.25h-2.8zm0 6.5v-3.5h3.2c1.4 0 2.3.8 2.3 1.75 0 1-.9 1.75-2.3 1.75h-3.2z"/>
  </svg>
);

const MediumIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
  </svg>
);

export default function SectionContacto({ content }) {
  const handleScroll = (id) => (e) => {
    e.preventDefault();
    sounds.playClick();
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = (e) => {
    e.preventDefault();
    sounds.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-section" aria-label="Pie de página y contacto">
      
      {/* 3-Column Grid matching Strike.uno Footer */}
      <div className="footer-inner">
        
        {/* Column 1: Brand Logo & Tagline */}
        <div className="footer-brand">
          <a 
            className="footer-logo" 
            href="#inicio" 
            onClick={scrollToTop} 
            aria-label="Ir al inicio"
          >
            ROHIT
          </a>
          <p>
            Transformación digital &amp; innovación con flow de calle. Del problema al resultado medible.
          </p>
        </div>

        {/* Column 2: Setlist Navigation */}
        <nav className="footer-nav" aria-label="Navegación del setlist">
          <h2 className="footer-title">SETLIST</h2>
          <ul>
            <li>
              <a href="#inicio" onClick={handleScroll('inicio')}>HOME</a>
            </li>
            <li>
              <a href="#previa" onClick={handleScroll('previa')}>ABOUT</a>
            </li>
            <li>
              <a href="#trayectoria" onClick={handleScroll('trayectoria')}>JOURNEY</a>
            </li>
            <li>
              <a href="#portafolio" onClick={handleScroll('portafolio')}>PROJECTS</a>
            </li>
            <li>
              <a href="#skills" onClick={handleScroll('skills')}>SKILLS</a>
            </li>
            <li>
              <a href="#formacion" onClick={handleScroll('formacion')}>EDUCATION</a>
            </li>
            <li>
              <a href="#articulos" onClick={handleScroll('articulos')}>IN THE MAKING</a>
            </li>
            <li>
              <a href="#contacto" onClick={handleScroll('contacto')}>CONTACT</a>
            </li>
          </ul>
        </nav>

        {/* Column 3: Contact Channels (Hablemos) */}
        <div className="footer-contact">
          <h2 className="footer-title">HABLEMOS</h2>
          <ul>
            <li>
              <a href="mailto:rohitkumar.ds33@gmail.com" onClick={() => sounds.playClick()}>
                <Mail size={22} />
                <span>rohitkumar.ds33@gmail.com</span>
              </a>
            </li>
            <li>
              <a 
                href="https://wa.me/919142671893?text=Hi%20Rohit%2C%20let%27s%20connect" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => sounds.playClick()}
              >
                <MessageSquare size={22} />
                <span>WhatsApp</span>
              </a>
            </li>
            <li>
              <a 
                href="https://www.linkedin.com/in/rohit-singh55/" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => sounds.playClick()}
              >
                <LinkedInIcon />
                <span>LinkedIn</span>
              </a>
            </li>
            <li>
              <a 
                href="https://www.behance.net/strikeheredia" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => sounds.playClick()}
              >
                <BehanceIcon />
                <span>Behance</span>
              </a>
            </li>
            <li>
              <a 
                href="https://medium.com/@soy_40480" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => sounds.playClick()}
              >
                <MediumIcon />
                <span>Medium</span>
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar: Copyright & Back to Top */}
      <div className="footer-bottom">
        <p>© 2026 Rohit Singh · Rohit Studio Lab</p>
        <button 
          type="button" 
          className="to-top" 
          onClick={scrollToTop} 
          aria-label="Volver arriba"
        >
          <span>Volver arriba</span>
          <ArrowUp size={19} />
        </button>
      </div>

      {/* Vertical Teal "W. Nominee" Badge pinned to right edge */}
      <a 
        className="footer-nominee-badge" 
        href="https://www.awwwards.com" 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="Awwwards Nominee"
      >
        <span className="nominee-w">W.</span>
        <span className="nominee-text">Nominee</span>
      </a>

    </footer>
  );
}
