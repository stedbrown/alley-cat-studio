'use client';

// Adapted from React Bits by David Haz. See licenses/react-bits-LICENSE.md.
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';




export default function SplitText({ lines, label }: { lines: { text: string; accent?: string }[]; label: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    let disposed = false;
    document.fonts.ready.then(() => {
      if (disposed) return;
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const element = ref.current!;
        const animation = gsap.fromTo(element.querySelectorAll('.rb-split-char'),
          { yPercent: 65, rotation: 4, opacity: 0 },
          { yPercent: 0, rotation: 0, opacity: 1, duration: .65,
            stagger: { amount: .45 }, ease: 'power3.out', paused: true });
        // Observe the actual heading, independent of preceding pinned films.
        // Replay on re-entry so a fast swipe or an anchor jump cannot consume it early.
        const observer = new IntersectionObserver(entries => {
          for (const entry of entries) {
            if (entry.isIntersecting) animation.play();
            else animation.pause(0);
          }
        }, { threshold: 0, rootMargin: '0px 0px -8% 0px' });
        observer.observe(element);
        return () => { observer.disconnect(); animation.kill(); };

      });
    });
    return () => { disposed = true; media.revert(); };
  }, []);
  const characters = (text: string) => Array.from(text).map((character, index) => character === ' ' ? ' ' : <span className="rb-split-char" key={index}>{character}</span>);
  return <h2 ref={ref} className="rb-split-text" aria-label={label}>
    {lines.map((line, index) => <span className="rb-split-line" aria-hidden="true" key={index}>{characters(line.text)}{line.accent && <em>{characters(line.accent)}</em>}</span>)}
  </h2>;
}
