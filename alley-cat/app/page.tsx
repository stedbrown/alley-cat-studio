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
      <a className="wordmark" href="#" aria-label="Alley Cat home">ALLEY CAT<span className="brand-star">✳</span></a>
      <span className="header-note utility">INDEPENDENT CREATIVE STUDIO<br/>A LITTLE OFF THE LEASH.</span>
      <nav aria-label="Main navigation"><a href="#commerce">SERVICES</a><a href="#about">ABOUT</a><a href="#contact" className="contact-link">LET’S TALK <span>●</span></a></nav>
    </header>
    <main id="main">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-kicker utility"><span>GOOD PEOPLE. QUESTIONABLE INFLUENCE.</span><span>EST. 2026 / INDEPENDENT BY NATURE</span></div>
        <div className="hero-composition">
          <div className="hero-type"><h1 id="hero-title">GOOD TASTE.<span>BAD INFLUENCE.</span></h1><div className="hero-caption" data-reveal><span className="asterisk" aria-hidden="true">✳</span><p>We make brands stand out.<br/>And websites act up.</p></div></div>
        </div>
        <div className="hero-footer utility"><span>BUILT FOR THE ONES WHO DON’T BLEND IN.</span><a href="#commerce">EXPLORE OUR WORLD <span aria-hidden="true">↘</span></a></div>
      </section>
      <div className="ticker" aria-hidden="true"><div>NO TAME IDEAS <span>✳</span> NO BORING WEBSITES <span>✳</span> ALL BITE. <span>✳</span> NO TAME IDEAS <span>✳</span> NO BORING WEBSITES <span>✳</span></div></div>
      <CinematicSection />
      <section className="studio section-pad" id="about">
        <div className="section-heading utility"><span>02 / THE METHOD IN THE MISCHIEF</span><span>SMALL STUDIO. BIG INSTINCTS.</span></div>
        <LogoSequence />
        <div className="studio-bottom" data-reveal><p>Sharp strategy. Street-level instinct.<br/>We bring identities to life on the web.<br/>With a point of view. And a pulse.</p><div className="services"><div><span>01</span><h3>DESIGN</h3><p>Identity with attitude.</p></div><div><span>02</span><h3>CODE</h3><p>Built to break the ordinary.</p></div><div><span>03</span><h3>MOTION</h3><p>Every scroll tells a story.</p></div></div></div>
      </section>
      <CommerceSequence />
      <section className="software section-pad" id="work" aria-labelledby="software-title">
        <div className="section-heading utility"><span>04 / SOFTWARE WITH CHARACTER</span><span>CUSTOM TOOLS. CINEMATIC THINKING.</span></div>
        <div className="software-intro"><div id="software-title"><ScrollReveal lines={['SERIOUS TOOLS.', 'UNEXPECTED', 'FEELING.']} /></div><p data-reveal>We build custom software with the same care we bring to the screen. Clear interfaces. Purposeful motion. Made around the way you work.</p></div>
        <div className="software-services">
          <article data-reveal><span className="utility">01 / WEB APPLICATIONS</span><h3>YOUR IDEAS.<br/>IN ACTION.</h3><p>Customer portals and web apps that turn complex tasks into natural interactions.</p></article>
          <article data-reveal><span className="utility">02 / BUSINESS SOFTWARE</span><h3>LESS FRICTION.<br/>MORE FLOW.</h3><p>Dashboards, internal tools and connected workflows built around your business.</p></article>
          <article data-reveal><span className="utility">03 / INTERFACE & MOTION</span><h3>EVERY MOVE.<br/>A PURPOSE.</h3><p>Cinematic interfaces with thoughtful transitions, clear feedback and character in the details.</p></article>
        </div>
        <a className="text-link" href="#contact">LET’S SHAPE YOUR SOFTWARE <span aria-hidden="true">↗</span></a>
      </section>
      <section className="philosophy section-pad"><div className="section-heading utility"><span>05 / OUR NATURAL INSTINCT</span><span>MAKE IT FEEL SOMETHING.</span></div><ScrollReveal lines={['THE WEB', 'SHOULDN’T', 'SIT STILL.']} /><p>Not another page. A presence.<br/>Not just seen. Remembered.</p></section>
      <section className="contact section-pad" id="contact"><div className="section-heading utility"><span>06 / GOT A WILD IDEA?</span><span>LET’S GIVE IT NINE LIVES.</span></div><SplitText label="LET’S MAKE SOME NOISE." lines={[{ text: 'LET’S MAKE' }, { text: 'SOME ', accent: 'NOISE.' }]} /><p>Tell us what you’re dreaming up.</p><ContactBrief /></section>
    </main>
    <footer className="footer utility"><a className="wordmark" href="#">ALLEY CAT✳</a><span>GOOD TASTE. BAD INFLUENCE.</span><span>© 2026 ALLEY CAT STUDIO</span><a href="#">BACK TO TOP</a></footer>
  </>;
}
