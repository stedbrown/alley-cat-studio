/** Bounded decoded-image cache. Image objects never enter React state. */
export class FrameSequence {
  private cache = new Map<number, HTMLImageElement>();
  private pending = new Set<number>();
  private failed = new Set<number>();
  private queue: number[] = [];
  private active = 0;
  private disposed = false;
  private target = 0;
  constructor(private directory: string, readonly count: number, private limit: number, private ready: (frame: number) => void) {}
  start() { this.queue = Array.from({ length: this.count }, (_, i) => i); this.pump(); }
  get(index: number) { return this.cache.get(index); }
  seek(index: number) {
    this.target = Math.max(0, Math.min(this.count - 1, index));
    const near = [this.target];
    for (let offset = 1; offset <= 7; offset++) near.push(this.target + offset, this.target - offset);
    this.queue = [...new Set([...near, ...this.queue])].filter(i => i >= 0 && i < this.count && !this.cache.has(i) && !this.pending.has(i) && !this.failed.has(i));
    this.pump();
  }
  private pump() {
    while (!this.disposed && this.active < 3 && this.queue.length) {
      const index = this.queue.shift()!;
      if (this.cache.has(index) || this.pending.has(index)) continue;
      this.active++; this.pending.add(index);
      const image = new Image(); image.decoding = 'async';
      image.src = `/cinematic/${this.directory}/frame-${String(index + 1).padStart(4, '0')}.webp`;
      image.decode().then(() => {
        if (this.disposed) return;
        this.cache.set(index, image);
        this.ready(index);
        while (this.cache.size > this.limit) {
          let farthest = -1; let distance = -1;
          this.cache.forEach((_, key) => { const d = Math.abs(key - this.target); if (d > distance && key !== this.target) { farthest = key; distance = d; } });
          if (farthest < 0) break;
          this.cache.delete(farthest);
        }
      }).catch(() => { this.failed.add(index); }).finally(() => {
        this.active--; this.pending.delete(index);
        if (!this.disposed) this.pump();
      });
    }
  }
  destroy() { this.disposed = true; this.queue = []; this.cache.clear(); }
}
