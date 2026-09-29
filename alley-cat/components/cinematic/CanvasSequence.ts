import { FrameSequence } from './FrameSequence';

/** Shared canvas engine for both films. No React updates during scroll. */
export class CanvasSequence {
  private frames: FrameSequence;
  private observer: ResizeObserver;
  private context: CanvasRenderingContext2D;
  private target = 0;
  private rendered = -1;
  private raf = 0;
  private width = 0;
  private height = 0;

  constructor(private canvas: HTMLCanvasElement, directory: string, private count: number, limit: number) {
    const context = canvas.getContext('2d', { alpha: false });
    if (!context) throw new Error('Canvas 2D is unavailable');
    this.context = context;
    this.frames = new FrameSequence(directory, count, limit, index => { if (index === this.target) this.schedule(); });
    this.observer = new ResizeObserver(this.resize);
    this.observer.observe(canvas);
    this.resize();
    this.seek(0);
  }

  private resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.width = Math.round(this.canvas.clientWidth * dpr);
    this.height = Math.round(this.canvas.clientHeight * dpr);
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.schedule();
  };

  private paint = () => {
    this.raf = 0;
    const image = this.frames.get(this.target);
    if (!image || !this.width || !this.height) return;
    const scale = Math.max(this.width / image.naturalWidth, this.height / image.naturalHeight);
    this.context.drawImage(image, (this.width - image.naturalWidth * scale) / 2, (this.height - image.naturalHeight * scale) / 2, image.naturalWidth * scale, image.naturalHeight * scale);
    this.rendered = this.target;
    this.canvas.style.opacity = '1';
    this.canvas.dataset.frame = String(this.target);
  };

  private schedule() { if (!this.raf) this.raf = requestAnimationFrame(this.paint); }
  seek(progress: number) {
    this.target = Math.round(Math.max(0, Math.min(1, progress)) * (this.count - 1));
    this.frames.seek(this.target);
    if (this.target !== this.rendered) this.schedule();
  }
  preload() { this.frames.start(); this.frames.seek(this.target); }
  destroy() { this.observer.disconnect(); cancelAnimationFrame(this.raf); this.frames.destroy(); }
}
