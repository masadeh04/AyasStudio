import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: "Aya Masadeh — Artist",
  description: 'Contemporary paintings by Aya Masadeh.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen" style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
        <Navbar />
        {children}
        <footer
          className="mt-24 border-t"
          style={{ borderColor: 'var(--border)' }}
        >
          <div
            className="mx-auto max-w-6xl px-6 py-10 flex items-center justify-between"
          >
            <span
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: '1.1rem',
                fontWeight: 300,
                letterSpacing: '0.04em',
                color: 'var(--muted)',
              }}
            >
              Aya Masadeh
            </span>
            <span className="text-xs tracking-widest uppercase" style={{ color: 'var(--muted)', letterSpacing: '0.12em' }}>
              © {new Date().getFullYear()}
            </span>
          </div>
        </footer>
      </body>
    </html>
  )
}
