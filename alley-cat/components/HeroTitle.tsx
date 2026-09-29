import TechText from './react-bits/TechText';

export default function HeroTitle() {
  return <div className="hero-tech-title">
    <h1 id="hero-title" className="hero-accessible-title">GOOD TASTE. BAD INFLUENCE.</h1>
    <div aria-hidden="true">
      {['GOOD TASTE.', 'BAD INFLUENCE.'].map((text, index) => <div className={`hero-tech-line hero-tech-line-${index}`} key={text}>
        <span className="hero-tech-fallback">{text}</span>
        <TechText text={text} fontFamily="Barlow Condensed" fontWeight={700} fontSize={300} letterSpacing={-.025} color={index ? '#ff6b24' : '#f1eee5'} accentColor="#69d4d4" reach={140} specks={0} labels={false} draggable={false} speed={.7} strokeWidth={1} />
      </div>)}
    </div>
  </div>;
}
