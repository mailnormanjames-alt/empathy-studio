import type { Metadata } from 'next'
import { Cormorant_Garamond } from 'next/font/google'
import '@/styles/globals.css'
import Cursor    from '@/components/ui/Cursor'
import Curtain   from '@/components/ui/Curtain'
import Nav       from '@/components/layout/Nav'
import Footer    from '@/components/layout/Footer'
import GSAPInit  from '@/components/ui/GSAPInit'
import BackToTop from '@/components/ui/BackToTop'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

export const metadata: Metadata = {
  title: { template: '%s — Empathy Studio', default: 'Empathy Studio — Emotion-Led Design' },
  description: 'Empathy is a full-service creative studio. We design brands, build websites, and craft motion that makes people feel something.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cormorant.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@300;400;500&family=Great+Vibes&display=swap" rel="stylesheet" />
        {/* Right-click protection */}
        <script dangerouslySetInnerHTML={{ __html: `
          document.addEventListener('contextmenu', function(e) { e.preventDefault(); });
          document.addEventListener('keydown', function(e) {
            if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) || (e.ctrlKey && e.key === 'u')) {
              e.preventDefault();
            }
          });
        `}} />
      </head>
      <body>
        <GSAPInit />
        <Curtain />
        <Cursor />
        <Nav />
        <main>{children}</main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  )
}
