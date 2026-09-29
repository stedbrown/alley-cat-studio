import Magnet from './react-bits/Magnet';

export default function BrandLogo({ wordmark = false }: { wordmark?: boolean }) {
  const mark = <>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img className="brand-cat" src="/brand/alley-cat-logo.png" width="80" height="80" alt="" />
    {wordmark && <span>ALLEY CAT</span>}
  </>;
  return <div className={`brand-logo ${wordmark ? 'brand-wordmark' : 'brand-seal'}`}>
    <Magnet><a href="#" aria-label="Alley Cat home">{mark}</a></Magnet>
  </div>;
}
