'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CanvasSequence } from './CanvasSequence';
import manifest from '@/public/cinematic/manifest.json';
gsap.registerPlugin(ScrollTrigger);

export default function CinematicSection() {
  const root = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const section = root.current!; const canvas = canvasRef.current!;
    if (!canvas.getContext('2d')) return;
    const media = gsap.matchMedia();
    media.add({ mobile: '(max-width: 767px)', desktop: '(min-width: 768px)', reduce: '(prefers-reduced-motion: reduce)' }, ctx => {
      const mobile = ctx.conditions?.mobile; const reduced = ctx.conditions?.reduce;
      // Preserve source detail on high-density phones; the mobile film is letterboxed.
      const variant = 'frames';
      const count = manifest[variant].count;
      const renderer = new CanvasSequence(canvas, variant, count, mobile ? 12 : 38);
      renderer.seek(reduced ? 1 : 0);
      const visibility = reduced ? null : new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          renderer.preload(); visibility?.disconnect();
        }
      }, { rootMargin: '300px' });
      visibility?.observe(section);
      const timeline = reduced ? null : gsap.timeline({ scrollTrigger: {
        trigger: section, start: 'top top', end: mobile ? '+=170%' : '+=220%', pin: true, scrub: .35, anticipatePin: 1, refreshPriority: 10,
        onUpdate: self => {
          renderer.seek(self.progress);
          if (counter.current) counter.current.textContent = String(Math.round(self.progress * 100)).padStart(3, '0');
        },
      } });
      timeline?.to(section.querySelector('.scene-intro'), { opacity: 0, y: -35, duration: .25 }, 0)
        .fromTo(section.querySelector('.scene-outro'), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: .22 }, .78);
      return () => { visibility?.disconnect(); timeline?.scrollTrigger?.kill(); timeline?.kill(); renderer.destroy(); };
    });
    return () => media.revert();
  }, []);
  return <section className="cinematic" ref={root} aria-labelledby="cinematic-title" id="film">
    <div className="scene-top utility"><span>01 / NINE LIVES. PLENTY OF TRICKS.</span><span>MEET THE STACK</span></div>
    <div className="canvas-stage">
      {/* The poster remains underneath until the requested frame is decoded. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="scene-poster" src="/cinematic/frames/frame-0001.webp" alt="A grinning cartoon cat wearing a trench coat in a colorful graffiti alley" width="1280" height="720" />
      <canvas ref={canvasRef} aria-label="Scroll-controlled animation of the cartoon cat opening its coat to reveal exaggerated cartoon props" role="img" />
      <h2 id="cinematic-title" className="scene-intro">NINE LIVES.<br/><em>ONE BIG STACK.</em></h2>
      <p className="scene-outro">ALL THIS TECH.<br/><em>STILL NO THUMBS.</em></p>
    </div>
    <div className="scene-bottom utility"><span>AI, CODE & MOTION. MORE TOOLS THAN POCKETS.</span><span><span ref={counter}>000</span> / 100</span></div>
  </section>;
}
