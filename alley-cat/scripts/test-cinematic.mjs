import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
function load(name, globals = {}) {
  const exports = {};
  const source = fs.readFileSync(`components/cinematic/${name}.ts`, 'utf8');
  vm.runInNewContext(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText, { exports, ...globals });
  return exports[name];
}
(async () => {
  let requests = 0;
  const FrameSequence = load('FrameSequence', { Image: class { constructor() { requests++; } decode() { return Promise.resolve(); } } });
  const frames = new FrameSequence('frames', 144, 12, () => {});
  frames.seek(0); frames.seek(100); frames.seek(30);
  await new Promise(resolve => setImmediate(resolve));
  assert.ok(frames.get(30), 'latest rapid-scroll target is decoded');
  assert.ok(frames.cache.size <= 12, 'decoded cache stays bounded');
  const forward = frames.nearest(33, 30);
  assert.ok(forward >= 30 && forward <= 33, 'fallback moves only toward forward target');
  const reverse = frames.nearest(27, 30);
  assert.ok(reverse >= 27 && reverse <= 30, 'fallback moves only toward reverse target');
  frames.destroy(); const before = requests; frames.seek(120);
  assert.equal(requests, before, 'destroyed sequences do not start requests');
  let resize; let seeks = 0; let resets = 0;
  const CanvasSequence = load('CanvasSequence', {
    require: () => ({ FrameSequence: class { seek() { seeks++; } destroy() {} } }),
    ResizeObserver: class { constructor(fn) { resize = fn; } observe() {} disconnect() {} },
    requestAnimationFrame: () => 1, cancelAnimationFrame() {}, window: { devicePixelRatio: 3 },
  });
  const canvas = { clientWidth: 390, clientHeight: 220, getContext: () => ({}), set width(v) { resets++; }, set height(v) { resets++; } };
  const renderer = new CanvasSequence(canvas, 'frames', 144, 12);
  const initial = resets; resize(); assert.equal(resets, initial, 'same-size observation does not clear canvas');
  renderer.seek(.5); const sought = seeks; renderer.seek(.5);
  assert.equal(seeks, sought, 'unchanged frame does not rebuild loading queue');
  renderer.destroy();
  console.log('PASS: fast seeks, cache bound, forward/reverse fallback, cleanup, stable resize, duplicate-frame suppression');
})().catch(error => { console.error(error); process.exitCode = 1; });
