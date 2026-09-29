export default function Arrow({ down = false }: { down?: boolean }) {
  return <svg className={`arrow-icon${down ? ' arrow-down' : ''}`} viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M5 19 19 5M5 5h14v14" /></svg>;
}
