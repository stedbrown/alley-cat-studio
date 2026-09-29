import BrandLogo from '@/components/BrandLogo';
import HeroTitle from '@/components/HeroTitle';
import Motion from '@/components/Motion';
import CinematicSection from '@/components/cinematic/CinematicSection';
import CommerceSequence from '@/components/cinematic/CommerceSequence';
import ContactBrief from '@/components/ContactBrief';
import ScrollReveal from '@/components/react-bits/ScrollReveal';
import SplitText from '@/components/react-bits/SplitText';
import LogoSequence from '@/components/cinematic/LogoSequence';

export default function Home() {
  return <>
    <Motion />
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="header">
      <BrandLogo wordmark />
      <span className="header-note utility">WEBSITES. STORES. SOFTWARE.<br/>BUILT WITH A LITTLE BITE.</span>
      <nav aria-label="Main navigation"><a href="#commerce">SERVICES</a><a href="#about">ABOUT</a><a href="#contact" className="contact-link">LET’S TALK</a></nav>
    </header>
    <main id="main">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-kicker utility"><span>WEB DESIGN WITH CLAWS.</span><span>INDEPENDENT STUDIO / CURIOUS BY DEFAULT</span></div>
        <div className="hero-composition">
          <div className="hero-type"><HeroTitle /><div className="hero-caption" data-reveal><BrandLogo /><p>Cinematic websites. Tempting online stores.<br/>Custom software that does the heavy lifting.</p></div></div>
        </div>
        <div className="hero-footer utility"><span>LOOK SHARP. WORK SMART. LAND ON YOUR FEET.</span><a href="#commerce">SEE WHAT WE BUILD <span aria-hidden="true">↘</span></a></div>
      </section>
      <div className="ticker tech-ticker" role="region" aria-label="Our toolkit: ChatGPT Astra, Vercel, GitHub, React, Next.js, TypeScript, GSAP and Google Flow">
        <div className="tech-ticker-track" aria-hidden="true">{[0, 1].map(copy => <div className="tech-ticker-group" key={copy}>{['CHATGPT / ASTRA', 'VERCEL', 'GITHUB', 'REACT', 'NEXT.JS', 'TYPESCRIPT', 'GSAP', 'GOOGLE FLOW'].map(technology => <span className="tech-ticker-item" key={technology}>{technology}<i className="ticker-divider" /></span>)}</div>)}</div>
      </div>
      <CinematicSection />
      <section className="studio section-pad" id="about">
        <div className="section-heading utility"><span>02 / THE METHOD IN THE MISCHIEF</span><span>CURIOUS MINDS. SHARP EXECUTION.</span></div>
        <LogoSequence />
        <div className="studio-bottom" data-reveal><p>We ask good questions. Then cause a little trouble.<br/>Design, development and motion — built around your business, not a template.</p><div className="services"><div><span>01</span><h3>DESIGN</h3><p>Make the first impression stick.</p></div><div><span>02</span><h3>CODE</h3><p>Less friction. More doing.</p></div><div><span>03</span><h3>MOTION</h3><p>A little cinema. A lot of purpose.</p></div></div></div>
      </section>
      <CommerceSequence />
      <section className="software section-pad" id="work" aria-labelledby="software-title">
        <div className="section-heading utility"><span>04 / SOFTWARE WITH CHARACTER</span><span>HARD-WORKING CODE. GOOD-LOOKING TOOLS.</span></div>
        <div className="software-intro"><div id="software-title"><ScrollReveal lines={['LESS BUSYWORK.', 'MORE', 'CATNAP.']} /></div><p data-reveal>Your team has better things to do than wrestle with software. We build web apps, dashboards and internal tools that fit the job — and feel good to use.</p></div>
        <div className="software-services">
          <article data-reveal><span className="utility">01 / WEB APPLICATIONS</span><h3>YOUR IDEAS.<br/>IN ACTION.</h3><p>From customer portals to your next big idea. Web apps that make the complicated feel obvious.</p></article>
          <article data-reveal><span className="utility">02 / BUSINESS SOFTWARE</span><h3>LESS FRICTION.<br/>MORE FLOW.</h3><p>Connect the tools, tame the admin and give repetitive tasks somewhere else to live.</p></article>
          <article data-reveal><span className="utility">03 / INTERFACE & MOTION</span><h3>EVERY MOVE.<br/>A PURPOSE.</h3><p>Motion that guides, feedback that helps, and interfaces with a personality. No circus required.</p></article>
        </div>
        <a className="text-link" href="#contact">PUT YOUR IDEA TO WORK <span aria-hidden="true">↗</span></a>
      </section>
      <section className="philosophy section-pad"><div className="section-heading utility"><span>05 / OUR NATURAL INSTINCT</span><span>NICE TO LOOK AT. BETTER TO USE.</span></div><ScrollReveal lines={['ALL BITE.', 'NO DEAD', 'CLICKS.']} /><p>A good website earns the next tap.<br/>We make every detail work for it.</p></section>
      <section className="contact section-pad" id="contact"><div className="section-heading utility"><span>06 / GOT A WILD IDEA?</span><span>LET’S GET OUR PAWS ON IT.</span></div><SplitText label="LET’S MAKE SOME NOISE." lines={[{ text: 'LET’S MAKE' }, { text: 'SOME ', accent: 'NOISE.' }]} /><p>A new store, a better website, a tool that saves your sanity. Let’s give it a life of its own.</p><ContactBrief /></section>
    </main>
    <footer className="footer utility"><BrandLogo wordmark /><span>GOOD TASTE. BAD INFLUENCE.</span><span>© 2026 ALLEY CAT STUDIO</span><a href="#">BACK TO TOP</a></footer>
  </>;
}
