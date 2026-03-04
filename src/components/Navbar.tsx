'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/paintings', label: 'Paintings' },
  { href: '/bio',       label: 'Bio'       },
  { href: '/contact',   label: 'Contact'   },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <header
      className="sticky top-0 z-40 border-b bg-[#faf9f7]/90 backdrop-blur-md"
      style={{ borderColor: 'var(--border)' }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        {/* Wordmark */}
        <Link
          href="/"
          className="font-display text-xl font-light tracking-wide hover:opacity-70 transition-opacity"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", letterSpacing: '0.04em' }}
        >
          Aya's Studio
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-8">
          {links.map((l) => {
            const active = pathname === l.href || pathname.startsWith(l.href + '/')
            return (
              <Link
                key={l.href}
                href={l.href}
                className="relative text-sm font-light tracking-widest uppercase transition-opacity hover:opacity-60"
                style={{
                  letterSpacing: '0.12em',
                  color: active ? 'var(--foreground)' : 'var(--muted)',
                }}
              >
                {l.label}
                {active && (
                  <span
                    className="absolute -bottom-[21px] left-0 right-0 h-px"
                    style={{ background: 'var(--foreground)' }}
                  />
                )}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
