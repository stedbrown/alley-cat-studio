'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CanvasSequence } from './CanvasSequence';
import manifest from '@/public/cinematic/vibe/manifest.json';
import Arrow from '../Arrow';

gsap.registerPlugin(ScrollTrigger);

export default function VibeSequence() {
  const root = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!canvas.current?.getContext('2d')) return;
    const media = gsap.matchMedia();
    media.add({ mobile: '(max-width:767px)', desktop: '(min-width:768px)', reduce: '(prefers-reduced-motion:reduce)' }, context => {
      const mobile = context.conditions?.mobile;
      const reduced = context.conditions?.reduce;
      const variant = mobile ? 'mobile' : 'frames';
      const renderer = new CanvasSequence(canvas.current!, `vibe/${variant}`, manifest[variant].count, mobile ? 10 : 16);
      renderer.seek(reduced ? 1 : 0);
      const observer = new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) { renderer.preload(); observer.disconnect(); }
      }, { rootMargin: '300px' });
      if (!reduced) observer.observe(root.current!);
      const playhead = { progress: 0 };
      const timeline = reduced ? null : gsap.timeline({
        onUpdate: () => renderer.seek(playhead.progress),
        scrollTrigger: { trigger: root.current, start: 'top top', end: mobile ? '+=90%' : '+=130%', pin: true, scrub: .4, anticipatePin: 1, refreshPriority: -1 },
      });
      timeline?.to(playhead, { progress: 1, duration: 1, ease: 'none' }, 0)
        .fromTo(root.current!.querySelector('.vibe-note'), { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: .2 }, .35)
        .fromTo(root.current!.querySelector('.vibe-progress'), { scaleX: 0 }, { scaleX: 1, duration: 1, ease: 'none' }, 0);
      return () => { observer.disconnect(); timeline?.scrollTrigger?.kill(); timeline?.kill(); renderer.destroy(); };
    });
    return () => media.revert();
  }, []);
  return <section className="vibe section-pad" id="vibe" ref={root} aria-labelledby="vibe-title">
    <div className="section-heading utility"><span>05 / VIBE CODING. CAT ENERGY.</span><span>AI SPEED. HUMAN INSTINCT.</span></div>
    <div className="vibe-layout">
      <div className="vibe-copy"><h2 id="vibe-title">BIG IDEAS.<br/>FAST PAWS.<br/><em>REAL CODE.</em></h2><p>From “what if” to “try this.” We use AI to prototype, build and iterate — with human judgment on design, code and the details that matter.</p><a href="#contact" className="text-link">LET’S BUILD YOUR WHAT-IF <Arrow /></a><div className="vibe-note utility">THE CAT RUNS ON VIBES.<br/>YOUR PRODUCT GETS REVIEWED AND TESTED.</div></div>
      <div className="vibe-stage">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/cinematic/vibe/mobile/frame-0001.webp" width="768" height="1366" loading="lazy" alt="A cartoon cat typing at a neon keyboard surrounded by colorful code and galaxies" />
        <canvas ref={canvas} role="img" aria-label="Scroll-controlled animation of the cat typing code" />
      </div>
    </div><span className="vibe-progress" aria-hidden="true" />
  </section>;
}
