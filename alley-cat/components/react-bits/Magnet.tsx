'use client';

// Adapted from React Bits by David Haz. See licenses/react-bits-LICENSE.md.
import { useEffect, useRef, type ReactNode } from 'react';

export default function Magnet({ children }: { children: ReactNode }) {
  const wrapper = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const preference = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    let raf = 0;
    let x = 0;
    let y = 0;
    const paint = () => {
      raf = 0;
      if (inner.current) inner.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    const reset = () => { x = 0; y = 0; cancelAnimationFrame(raf); paint(); };
    const move = (event: PointerEvent) => {
      if (!preference.matches || event.pointerType !== 'mouse' || document.querySelector('dialog[open]')) return;
      const element = wrapper.current!;
      if (element.contains(document.activeElement)) return;
      const bounds = element.getBoundingClientRect();
      const dx = event.clientX - bounds.left - bounds.width / 2;
      const dy = event.clientY - bounds.top - bounds.height / 2;
      const active = Math.abs(dx) < bounds.width / 2 + 35 && Math.abs(dy) < bounds.height / 2 + 35;
      x = active ? Math.max(-12, Math.min(12, dx / 8)) : 0;
      y = active ? Math.max(-9, Math.min(9, dy / 8)) : 0;
      if (!raf) raf = requestAnimationFrame(paint);
    };
    const element = wrapper.current!;
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('blur', reset);
    window.addEventListener('scroll', reset, { passive: true });
    preference.addEventListener('change', reset);
    element.addEventListener('focusin', reset);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('blur', reset);
      window.removeEventListener('scroll', reset);
      preference.removeEventListener('change', reset);
      element.removeEventListener('focusin', reset);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div className="rb-magnet" ref={wrapper}><div className="rb-magnet-inner" ref={inner}>{children}</div></div>;
}
