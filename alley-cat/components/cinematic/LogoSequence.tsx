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
      const timeline = reduced ? null : gsap.timeline({ scrollTrigger: {
        trigger: root.current, start: 'top 10%', end: mobile ? '+=85%' : '+=110%', pin: true, scrub: .45, anticipatePin: 1, refreshPriority: 5,
        onUpdate: self => {
          renderer.seek(self.progress);
        },
      } });
      timeline?.fromTo(root.current!.querySelector('.logo-canvas-stage'), { scale: .92, rotate: -3 }, { scale: 1.04, rotate: 0, duration: 1, ease: 'none' }, 0)
        .fromTo(root.current!.querySelector('.method-title'), { y: 18 }, { y: -12, duration: 1, ease: 'none' }, 0)
        .fromTo(root.current!.querySelector('.method-progress'), { scaleX: 0 }, { scaleX: 1, duration: 1, ease: 'none' }, 0);
      return () => { visibility?.disconnect(); timeline?.scrollTrigger?.kill(); timeline?.kill(); renderer.destroy(); };
    });
    return () => media.revert();
  }, []);

  return <div className="method-scene" ref={root}>
    <div className="method-copy"><h2 className="method-title">THE RIGHT<br/>KIND OF<br/><em>WRONG.</em></h2><p className="method-aside utility">A LITTLE INSTINCT.<br/>A LOT OF CHARACTER.</p></div>
    <div className="method-character"><div className="logo-canvas-stage">
      {/* This still is only the no-JS/loading fallback, underneath the canvas. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/cinematic/logo/frames/frame-0001.webp" alt="The mischievous Alley Cat logo" width="1280" height="720" loading="lazy" />
      <canvas ref={canvas} role="img" aria-label="Alley Cat logo changes expression as you scroll" />
    </div><span className="method-caption utility">INDEPENDENT BY NATURE.</span></div>
    <span className="method-progress" aria-hidden="true" />
  </div>;
}

