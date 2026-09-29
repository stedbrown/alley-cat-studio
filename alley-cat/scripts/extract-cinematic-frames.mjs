import { spawnSync } from 'node:child_process';
import { mkdirSync, readdirSync, writeFileSync, unlinkSync } from 'node:fs';
import { resolve, join } from 'node:path';

const source = process.argv[2];
if (!source) throw new Error('Usage: npm run extract -- /absolute/path/source.mp4 [ffmpeg-path] [sequence-name]');
const ffmpeg = process.argv[3] || process.env.FFMPEG_PATH || 'ffmpeg';
const sequenceName = process.argv[4] || '';
if (sequenceName && !/^[a-z0-9-]+$/.test(sequenceName)) throw new Error('Sequence name must contain lowercase letters, numbers and hyphens only.');
const root = resolve('public/cinematic', sequenceName);
const variants = [{ name: 'frames', width: 1280, fps: 24, quality: 79 }, { name: 'mobile', width: 768, fps: 12, quality: 74 }];
const manifest = {};
for (const variant of variants) {
  const dir = join(root, variant.name);
  mkdirSync(dir, { recursive: true });
  // Only remove generated frames in this explicit output directory, never source assets.
  for (const file of readdirSync(dir)) if (/^frame-\d{4}\.webp$/.test(file)) unlinkSync(join(dir, file));
  const result = spawnSync(ffmpeg, ['-hide_banner','-loglevel','error','-y','-i',resolve(source),'-an','-vf',`fps=${variant.fps},scale=${variant.width}:-2`,'-c:v','libwebp','-quality',String(variant.quality),'-compression_level','5',join(dir,'frame-%04d.webp')], { stdio: 'inherit' });
  if (result.status !== 0) throw new Error(`Frame extraction failed: ${result.error || result.status}`);
  manifest[variant.name] = { count: readdirSync(dir).filter(f => /^frame-\d{4}\.webp$/.test(f)).length, width: variant.width, fps: variant.fps };
}
writeFileSync(join(root, 'manifest.json'), JSON.stringify(manifest, null, 2));
console.log(manifest);
