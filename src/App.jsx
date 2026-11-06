import React, { useState } from 'react';
import Navbar from './components/Navbar';
import SetlistDrawer from './components/SetlistDrawer';
import HeroSection from './components/HeroSection';
import BrandsMarquee from './components/BrandsMarquee';
import SectionPrevia from './components/SectionPrevia';
import SectionTrayectoria from './components/SectionTrayectoria';
import SectionPortafolio from './components/SectionPortafolio';
import SectionSkills from './components/SectionSkills';
import SectionFormacion from './components/SectionFormacion';
import SectionArticulos from './components/SectionArticulos';
import SectionContacto from './components/SectionContacto';
import SetlistDiscProgress from './components/SetlistDiscProgress';
import FabTop from './components/FabTop';
import { useStackingLayers } from './hooks/useStackingLayers';
import { portfolioData } from './data/portfolioData';

export default function App() {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('portfolio_lang') || 'en';
    } catch {
      return 'en';
    }
  });
  const [isSetlistOpen, setIsSetlistOpen] = useState(false);

  const handleSetLang = (newLang) => {
    try {
      localStorage.setItem('portfolio_lang', newLang);
    } catch {}
    setLang(newLang);
  };

  // Activates Strike.uno Card Stacking & Overlay Slider physics
  useStackingLayers();

  const content = portfolioData[lang] || portfolioData.en || portfolioData.es;

  return (
    <div className="portfolio-app" style={{ minHeight: '100vh', position: 'relative' }}>
      
      {/* Navbar Header */}
      <Navbar 
        lang={lang} 
        setLang={handleSetLang} 
        content={content} 
        onOpenSetlist={() => setIsSetlistOpen(true)} 
      />

      {/* Roller Shutter Setlist Drawer */}
      <SetlistDrawer 
        isOpen={isSetlistOpen} 
        onClose={() => setIsSetlistOpen(false)} 
        content={content} 
      />

      {/* Hero Portada */}
      <main>
        {/* Layer 1: Inicio (Hero & Marquee) */}
        <div id="inicio" className="layer layer-hero" data-sec="inicio" data-name="Inicio">
          <HeroSection content={content} />
          <BrandsMarquee brands={content.brands} />
        </div>

        {/* Layer 2: A1 La Previa */}
        <div id="previa" className="layer layer-previa" data-sec="previa" data-name="La previa">
          <SectionPrevia content={content} />
        </div>

        {/* Layer 3: A2 Trayectoria */}
        <div id="trayectoria" className="layer layer-trayectoria" data-sec="trayectoria" data-name="Trayectoria">
          <SectionTrayectoria content={content} />
        </div>

        {/* Layer 4: A3 Portafolio */}
        <div id="portafolio" className="layer layer-portafolio" data-sec="portafolio" data-name="Portafolio">
          <SectionPortafolio content={content} />
        </div>

        {/* Layer 5: B1 Skills */}
        <div id="skills" className="layer layer-skills" data-sec="skills" data-name="Skills">
          <SectionSkills content={content} />
        </div>

        {/* Layer 6: B2 Formación */}
        <div id="formacion" className="layer layer-formacion" data-sec="formacion" data-name="Formación">
          <SectionFormacion content={content} />
        </div>

        {/* Layer 7: B3 Artículos */}
        <div id="articulos" className="layer layer-articulos" data-sec="articulos" data-name="Artículos">
          <SectionArticulos content={content} />
        </div>

        {/* Layer 8: Outro Contacto */}
        <div id="contacto" className="layer layer-contacto" data-sec="contacto" data-name="Contacto">
          <SectionContacto content={content} />
        </div>
      </main>

      {/* Floating Setlist Vinyl Progress Indicator */}
      <SetlistDiscProgress 
        onOpenSetlist={() => setIsSetlistOpen(true)} 
        content={content} 
      />

      {/* Floating Back to Top Button */}
      <FabTop />

    </div>
  );
}
