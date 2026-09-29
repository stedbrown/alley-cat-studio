'use client';

// Adapted from React Bits by David Haz. See licenses/react-bits-LICENSE.md.
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SplitText({ lines, label }: { lines: { text: string; accent?: string }[]; label: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    let disposed = false;
    document.fonts.ready.then(() => {
      if (disposed) return;
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const element = ref.current!;
        gsap.from(element.querySelectorAll('.rb-split-char'), {
          yPercent: 65, rotation: 4, opacity: 0, duration: .65,
          stagger: .025, ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 88%', once: true, fastScrollEnd: true },
        });
      });
    });
    return () => { disposed = true; media.revert(); };
  }, []);
  const characters = (text: string) => Array.from(text).map((character, index) => character === ' ' ? ' ' : <span className="rb-split-char" key={index}>{character}</span>);
  return <h2 ref={ref} className="rb-split-text" aria-label={label}>
    {lines.map((line, index) => <span className="rb-split-line" aria-hidden="true" key={index}>{characters(line.text)}{line.accent && <em>{characters(line.accent)}</em>}</span>)}
  </h2>;
}
