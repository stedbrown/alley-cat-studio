'use client';
import Arrow from './Arrow';
import { useRef, useState } from 'react';
import Magnet from './react-bits/Magnet';

const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'stefanovananti@icloud.com';
export default function ContactBrief() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [status, setStatus] = useState('');
  function saveBrief(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = `ALLEY CAT — PROJECT BRIEF\n\nName: ${data.get('name')}\nEmail: ${data.get('email')}\nLooking for: ${data.get('service')}\n\nThe idea:\n${data.get('idea')}\n`;
    if (contactEmail) {
      window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent('A wild idea from ' + data.get('name'))}&body=${encodeURIComponent(body)}`;
      setStatus('Your email draft is ready. Review it in your email app before sending.');
    } else {
      const url = URL.createObjectURL(new Blob([body], { type: 'text/plain;charset=utf-8' }));
      const link = document.createElement('a'); link.href = url; link.download = 'alley-cat-project-brief.txt'; link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      setStatus('Brief downloaded. Your details stay on your device; nothing has been sent.');
    }
  }
  return <>
    <Magnet><button className="brief-button" onClick={() => { setStatus(''); dialog.current?.showModal(); }}>START A BRIEF <Arrow /></button></Magnet>
    <div className="direct-contacts">
      <a href="mailto:stefanovananti@icloud.com"><span className="utility">DROP US A LINE</span><span>stefanovananti@icloud.com</span><Arrow /></a>
      <a href="https://wa.me/41768057376" target="_blank" rel="noopener noreferrer"><span className="utility">WHATSAPP / SAY MEOW</span><span>+41 76 805 73 76</span><Arrow /></a>
    </div>
    <div className="contact-meta utility"><span>DESIGN / DEVELOPMENT / MOTION</span><span>HALF-BAKED IDEAS WELCOME.</span></div>
    <dialog ref={dialog} className="brief-dialog" onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }} aria-labelledby="brief-title">
      <div className="dialog-header utility"><span>YOUR NEXT GOOD IDEA STARTS HERE</span><button aria-label="Close project brief" onClick={() => dialog.current?.close()}>×</button></div>
      <h2 id="brief-title">WHAT’S<br/><em>THE IDEA?</em></h2>
      <p>{contactEmail ? 'A few details. Then let’s get talking.' : 'No perfect pitch needed. Capture the idea and download your brief to share when you’re ready.'}</p>
      <form onSubmit={saveBrief}>
        <div className="field-row"><label>Your name<input name="name" autoComplete="name" required maxLength={100} placeholder="Name" /></label><label>Your email<input name="email" type="email" autoComplete="email" required maxLength={200} placeholder="you@company.com" /></label></div>
        <label>What are you looking for?<select name="service" defaultValue="The whole thing"><option>The whole thing</option><option>Brand & art direction</option><option>Website & development</option><option>Motion & interaction</option><option>E-commerce & product websites</option><option>Custom software & web apps</option></select></label>
        <label>Tell us a little about it<textarea name="idea" required rows={3} maxLength={3000} placeholder="What are we making? Who is it for? What should it do?" /></label>
        <button className="submit-brief" type="submit">{contactEmail ? 'CREATE EMAIL DRAFT' : 'DOWNLOAD MY BRIEF'}</button>
        <p className="form-note">{contactEmail ? 'Opens your email app. You decide when to send.' : 'No upload. No mailing list. Just your idea, saved locally.'}</p>
        <p className="brief-status" role="status">{status}</p>
      </form>
    </dialog>
  </>;
}
