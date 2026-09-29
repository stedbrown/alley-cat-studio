import type { Metadata, Viewport } from 'next';
import '@fontsource/barlow-condensed/600.css';
import '@fontsource/barlow-condensed/700.css';
import '@fontsource/barlow-condensed/800.css';
import '@fontsource/space-grotesk/400.css';
import '@fontsource/space-grotesk/500.css';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://alley-cat-studio.steddy92.chatgpt.site'),
  title: 'ALLEY CAT — Good taste. Bad influence.',
  description: 'Independent by nature. Unforgettable by design. ALLEY CAT creates expressive identities, digital experiences and motion with a little bite.',
  openGraph: { title: 'ALLEY CAT — Good taste. Bad influence.', description: 'Design. Code. Motion. Digital experiences with a little bite.', type: 'website', locale: 'en_US', siteName: 'ALLEY CAT' },
  twitter: { card: 'summary', title: 'ALLEY CAT — Good taste. Bad influence.', description: 'Digital experiences with a little bite.' },
  icons: { icon: '/favicon.svg' },
};
export const viewport: Viewport = { themeColor: '#111110' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
