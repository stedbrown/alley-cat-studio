'use client';
import Arrow from '../Arrow';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CanvasSequence } from './CanvasSequence';
import manifest from '@/public/cinematic/commerce/manifest.json';

gsap.registerPlugin(ScrollTrigger);

export default function CommerceSequence() {
  const root = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const progress = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!canvas.current?.getContext('2d')) return;
    const media = gsap.matchMedia();
    media.add({ mobile: '(max-width:767px)', desktop: '(min-width:768px)', reduce: '(prefers-reduced-motion:reduce)' }, context => {
      const reduced = context.conditions?.reduce;
      const renderer = new CanvasSequence(canvas.current!, 'commerce/frames', manifest.frames.count, context.conditions?.mobile ? 12 : 28);
      renderer.seek(reduced ? 1 : 0);
      const observer = new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) { renderer.preload(); observer.disconnect(); }
      }, { rootMargin: '250px' });
      if (!reduced) observer.observe(root.current!);
      const playhead = { progress: 0 };
      const timeline = reduced ? null : gsap.timeline({ onUpdate: () => renderer.seek(playhead.progress), scrollTrigger: {
        trigger: root.current, start: 'top top', end: context.conditions?.mobile ? '+=85%' : '+=140%', pin: true, scrub: .4, anticipatePin: 1, refreshPriority: 1,
        onUpdate: self => {  if (progress.current) progress.current.style.transform = `scaleX(${self.progress})`; },
      } });
      timeline?.to(playhead, { progress: 1, duration: 1, ease: 'none' }, 0);
      timeline?.fromTo('.commerce-caption', { opacity: .45, y: 10 }, { opacity: 1, y: 0, duration: 1 }, 0);
      return () => { observer.disconnect(); timeline?.scrollTrigger?.kill(); timeline?.kill(); renderer.destroy(); };
    });
    return () => media.revert();
  }, []);
  return <section className="commerce section-pad" id="commerce" ref={root} aria-labelledby="commerce-title">
    <div className="section-heading utility"><span>03 / BUILT TO BE WANTED</span><span>E-COMMERCE & PRODUCT EXPERIENCES</span></div>
    <div className="commerce-layout">
      <div className="commerce-copy"><h2 id="commerce-title">GOOD <br/>ENOUGH <br/>TO <em>CLICK.</em></h2><p>From “just looking” to “in the basket.”<br/>We design product pages and online stores that make shopping feel natural.</p><a className="text-link" href="#contact">LET’S BUILD YOUR STORE <Arrow /></a></div>
      <div className="commerce-product"><div className="commerce-stage">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/cinematic/commerce/frames/frame-0001.webp" width="1280" height="720" loading="lazy" alt="An illustrated cat food can with a vivid graffiti label" />
        <canvas ref={canvas} role="img" aria-label="Scroll to open the illustrated product can" />
      </div><div className="commerce-caption utility"><span>GIVE YOUR PRODUCTS THE MAIN ROLE.</span><span>SCROLL TO OPEN <Arrow down /></span></div></div>
    </div>
    <div className="commerce-foot utility"><span>PRODUCT STORYTELLING</span><span>STOREFRONT DESIGN</span><span>SEAMLESS SHOPPING</span></div><span className="commerce-progress" ref={progress} aria-hidden="true" />
  </section>;
}


