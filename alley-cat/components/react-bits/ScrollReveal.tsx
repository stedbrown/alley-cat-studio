'use client';

// Adapted from React Bits by David Haz. See licenses/react-bits-LICENSE.md.
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollReveal({ lines }: { lines: string[] }) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const element = ref.current!;
      gsap.fromTo(element, { rotate: 1.5, transformOrigin: '0% 50%' }, {
        rotate: 0, ease: 'none',
        scrollTrigger: { trigger: element, start: 'top 90%', end: 'bottom 90%', scrub: true },
      });
      gsap.fromTo(element.querySelectorAll('.rb-word'), { opacity: .24 }, {
        opacity: 1, stagger: .12, ease: 'none',
        scrollTrigger: { trigger: element, start: 'top 85%', end: 'bottom 85%', scrub: true },
      });
    });
    // Scope cleanup to this component; never kill the cinematic's triggers.
    return () => media.revert();
  }, []);

  return <h2 ref={ref} className="rb-scroll-reveal" aria-label={lines.join(' ')}>
    {lines.map((line, index) => <span className={`rb-reveal-line ${index === lines.length - 1 ? 'rb-accent' : ''}`} aria-hidden="true" key={line}>
      {line.split(' ').map((word, i) => <span key={`${word}-${i}`}><span className="rb-word">{word}</span>{i < line.split(' ').length - 1 ? ' ' : ''}</span>)}
    </span>)}
  </h2>;
}
