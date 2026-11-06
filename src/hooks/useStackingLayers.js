import { useEffect } from 'react';

export function useStackingLayers() {
  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let rafId = null;
    let ticking = false;

    // Pointer coordinates for cursor movement parallax
    let mouseTargetX = 0;
    let mouseTargetY = 0;
    let mouseCurrentX = 0;
    let mouseCurrentY = 0;

    const getLayers = () => Array.from(document.querySelectorAll('.layer'));

    // Measure and set sticky top and z-index for every layer
    const measureLayers = () => {
      const layers = getLayers();
      const viewportHeight = window.innerHeight;

      layers.forEach((layer, idx) => {
        layer.style.zIndex = String(idx + 1);

        // If layer is taller than the viewport, pin it so the bottom finishes scrolling
        // before the next layer overlays it; if shorter or equal, pin at top: 0
        const layerHeight = layer.offsetHeight;
        const stickyTop = Math.min(0, viewportHeight - layerHeight);
        layer.style.top = `${stickyTop}px`;
      });

      updateDimming();
    };

    // Update overlay dimming on underlying pinned layers
    const updateDimming = () => {
      const layers = getLayers();
      const viewportHeight = window.innerHeight;

      layers.forEach((layer, idx) => {
        const nextLayer = layers[idx + 1];
        if (nextLayer) {
          const nextTop = nextLayer.getBoundingClientRect().top;
          // Progress: 0 when nextLayer top is at bottom of viewport; 1 when nextLayer top is at 0
          const progress = Math.min(Math.max(1 - nextTop / viewportHeight, 0), 1);
          // Smooth dark vignette overlay
          layer.style.setProperty('--dim', (progress * 0.62).toFixed(3));
        } else {
          layer.style.setProperty('--dim', '0');
        }
      });
    };

    // Smooth scroll and cursor tick
    const onTick = () => {
      ticking = false;
      updateDimming();

      // Smooth cursor lerp
      mouseCurrentX += (mouseTargetX - mouseCurrentX) * 0.1;
      mouseCurrentY += (mouseTargetY - mouseCurrentY) * 0.1;

      document.documentElement.style.setProperty('--mouse-shift-x', `${(mouseCurrentX * 18).toFixed(1)}px`);
      document.documentElement.style.setProperty('--mouse-shift-y', `${(mouseCurrentY * 18).toFixed(1)}px`);
      document.documentElement.style.setProperty('--mouse-rot-x', `${(-mouseCurrentY * 6).toFixed(2)}deg`);
      document.documentElement.style.setProperty('--mouse-rot-y', `${(mouseCurrentX * 8).toFixed(2)}deg`);

      if (Math.abs(mouseTargetX - mouseCurrentX) > 0.001 || Math.abs(mouseTargetY - mouseCurrentY) > 0.001) {
        requestTick();
      }
    };

    const requestTick = () => {
      if (!ticking) {
        ticking = true;
        rafId = requestAnimationFrame(onTick);
      }
    };

    const handleScroll = () => {
      requestTick();
    };

    const handleResize = () => {
      requestAnimationFrame(measureLayers);
    };

    const handlePointerMove = (e) => {
      mouseTargetX = (e.clientX / window.innerWidth) - 0.5;
      mouseTargetY = (e.clientY / window.innerHeight) - 0.5;
      requestTick();
    };

    // Initial setup with safe delays for font & image loading
    measureLayers();
    const timer1 = setTimeout(measureLayers, 100);
    const timer2 = setTimeout(measureLayers, 450);

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('load', measureLayers, { passive: true });
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    // ResizeObserver on <main> to recalculate when inner content changes
    const mainEl = document.querySelector('main');
    let resizeObserver = null;
    if (mainEl && window.ResizeObserver) {
      resizeObserver = new ResizeObserver(() => {
        requestAnimationFrame(measureLayers);
      });
      resizeObserver.observe(mainEl);
    }

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('load', measureLayers);
      window.removeEventListener('pointermove', handlePointerMove);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, []);
}
