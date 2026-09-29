'use client';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
gsap.registerPlugin(ScrollTrigger);

export default function Motion() {
  useEffect(() => {
    const media = gsap.matchMedia();
    let alive = true;
    let refreshFrame = 0;
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const lenis = window.matchMedia('(pointer: fine)').matches ? new Lenis({ duration: 1.05, smoothWheel: true, anchors: false }) : null;
      const navigate = (event: MouseEvent) => {
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        const link = (event.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
        if (!link) return;
        const hash = link.getAttribute('href')!;
        const target = hash === '#' ? 0 : document.getElementById(hash.slice(1));
        if (target === null) return;
        event.preventDefault();
        lenis?.resize();
        // Navigation jumps directly across pinned films; wheel scrolling remains smooth.
        const pinned = ScrollTrigger.getAll().find(trigger => trigger.trigger === target && trigger.pin);
        const destination = pinned ? pinned.start : typeof target === 'number' ? target : target.getBoundingClientRect().top + window.scrollY;
        if (lenis) lenis.scrollTo(destination, { immediate: true, force: true });
        else window.scrollTo({ top: destination, behavior: 'instant' });
        window.history.pushState(null, '', hash);
      };
      document.addEventListener('click', navigate);
      lenis?.on('scroll', ScrollTrigger.update);
      const tick = (time: number) => lenis?.raf(time * 1000);
      if (lenis) gsap.ticker.add(tick);
      const context = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>('[data-reveal], .section-heading, .hero-tech-title, .contact > p').forEach(el => {
          gsap.from(el, { y: 24, opacity: 0, duration: .8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 94%', once: true } });
        });
      });
      return () => { document.removeEventListener('click', navigate); context.revert(); gsap.ticker.remove(tick); lenis?.destroy(); };
    });
    document.fonts.ready.then(() => {
      if (alive) refreshFrame = requestAnimationFrame(() => { ScrollTrigger.sort(); ScrollTrigger.refresh(); });
    });
    return () => { alive = false; cancelAnimationFrame(refreshFrame); media.revert(); };
  }, []);
  return null;
}
