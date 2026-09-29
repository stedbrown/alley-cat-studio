const stack = [
  ['openai.svg', 'ChatGPT / Astra'], ['vercel.svg', 'Vercel'], ['github.svg', 'GitHub'],
  ['react.svg', 'React'], ['nextdotjs.svg', 'Next.js'], ['typescript.svg', 'TypeScript'],
  ['gsap.svg', 'GSAP'], ['google-flow.png', 'Google Flow'],
];

export default function StackTicker() {
  return <div className="ticker tech-ticker logo-ticker" role="region" aria-label="Our technology toolkit">
    <div className="tech-ticker-track">{[0, 1].map(copy => <div className="tech-ticker-group" key={copy} aria-hidden={copy === 1 ? true : undefined}>
      {stack.map(([file, name]) => <span className="tech-ticker-item" key={file} title={name}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`/stack/${file}`} alt={name} width="44" height="44" /><i className="ticker-divider" aria-hidden="true" />
      </span>)}
    </div>)}</div>
  </div>;
}
