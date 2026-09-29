import type { Metadata, Viewport } from 'next';
import '@fontsource/barlow-condensed/600.css';
import '@fontsource/barlow-condensed/700.css';
import '@fontsource/barlow-condensed/800.css';
import '@fontsource/space-grotesk/400.css';
import '@fontsource/space-grotesk/500.css';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://alley-cat-studio.vercel.app'),
  title: 'ALLEY CAT — Good taste. Bad influence.',
  description: 'Cinematic websites, e-commerce stores and custom software. ALLEY CAT combines design, code and motion to help your business land on its feet.',
  openGraph: { title: 'ALLEY CAT — Good taste. Bad influence.', description: 'Design. Code. Motion. Digital experiences with a little bite.', type: 'website', locale: 'en_US', siteName: 'ALLEY CAT' },
  twitter: { card: 'summary', title: 'ALLEY CAT — Good taste. Bad influence.', description: 'Digital experiences with a little bite.' },
  icons: { icon: '/brand/alley-cat-logo.png', apple: '/brand/alley-cat-logo.png' },
};
export const viewport: Viewport = { themeColor: '#111110' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
