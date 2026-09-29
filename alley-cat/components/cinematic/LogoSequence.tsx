'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CanvasSequence } from './CanvasSequence';
import manifest from '@/public/cinematic/logo/manifest.json';

gsap.registerPlugin(ScrollTrigger);

export default function LogoSequence() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const root = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (!canvas.current?.getContext('2d')) return;
    const media = gsap.matchMedia();
    media.add({ mobile: '(max-width: 767px)', desktop: '(min-width: 768px)', reduced: '(prefers-reduced-motion: reduce)' }, context => {
      const mobile = context.conditions?.mobile;
      const reduced = context.conditions?.reduced;
      const variant = mobile ? 'mobile' : 'frames';
      const renderer = new CanvasSequence(canvas.current!, `logo/${variant}`, manifest[variant].count, mobile ? 10 : 16);
      renderer.seek(reduced ? 1 : 0);
      const visibility = reduced ? null : new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) { renderer.preload(); visibility?.disconnect(); }
      }, { rootMargin: '350px' });
      visibility?.observe(root.current!);
      // Reveal before pinning, preserving the film's own scroll range.
      const entrance = reduced ? null : gsap.timeline({ scrollTrigger: {
        trigger: root.current, start: 'top 88%', end: 'top 12%', scrub: .6,
      } });
      entrance?.fromTo(root.current!.querySelectorAll('.method-line > span'),
        { yPercent: 105, opacity: .15 },
        { yPercent: 0, opacity: 1, duration: .7, stagger: .12, ease: 'power2.out' }, 0)
        .fromTo(root.current!.querySelector('.method-character'),
          { y: mobile ? 24 : 45, opacity: 0 },
          { y: 0, opacity: 1, duration: .8, ease: 'power2.out' }, .15)
        .fromTo(root.current!.querySelector('.method-aside'),
          { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: .4 }, .55);
      const playhead = { progress: 0 };
      const timeline = reduced ? null : gsap.timeline({ onUpdate: () => renderer.seek(playhead.progress), scrollTrigger: {
        trigger: root.current, start: 'top 10%', end: mobile ? '+=50%' : '+=110%', pin: true, scrub: .45, anticipatePin: 1, refreshPriority: 5,
        
      } });
      timeline?.to(playhead, { progress: 1, duration: 1, ease: 'none' }, 0);
      timeline?.fromTo(root.current!.querySelector('.logo-canvas-stage'), { scale: .92, rotate: -3 }, { scale: 1.04, rotate: 0, duration: 1, ease: 'none' }, 0)
        .fromTo(root.current!.querySelector('.method-title'), { y: 18 }, { y: -12, duration: 1, ease: 'none' }, 0)
        .fromTo(root.current!.querySelector('.method-progress'), { scaleX: 0 }, { scaleX: 1, duration: 1, ease: 'none' }, 0);
      return () => { visibility?.disconnect(); entrance?.scrollTrigger?.kill(); entrance?.kill(); timeline?.scrollTrigger?.kill(); timeline?.kill(); renderer.destroy(); };
    });
    return () => media.revert();
  }, []);

  return <div className="method-scene" ref={root}>
    <div className="method-copy"><h2 className="method-title"><span className="method-line"><span>THE RIGHT</span></span><span className="method-line"><span>KIND OF</span></span><span className="method-line"><span><em>WRONG.</em></span></span></h2><p className="method-aside utility">HUMAN INSTINCT.<br/>A VERY WELL-STOCKED TOOLKIT.</p></div>
    <div className="method-character"><div className="logo-canvas-stage">
      {/* This still is only the no-JS/loading fallback, underneath the canvas. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/cinematic/logo/frames/frame-0001.webp" alt="The mischievous Alley Cat logo" width="1280" height="720" loading="lazy" />
      <canvas ref={canvas} role="img" aria-label="Alley Cat logo changes expression as you scroll" />
    </div><span className="method-caption utility">INDEPENDENT BY NATURE.</span></div>
    <span className="method-progress" aria-hidden="true" />
  </div>;
}

