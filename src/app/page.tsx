import Link from 'next/link'

export default function Home() {
  return (
    <main className="artistic-bg relative flex min-h-[calc(100vh-73px)] flex-col items-center justify-center px-6 text-center">
      <div className="relative z-10 flex flex-col items-center justify-center text-center">

        {/* Eyebrow */}
        <p className="label mb-6">Contemporary Painting</p>

        {/* Main headline */}
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(3rem, 8vw, 6.5rem)',
            fontWeight: 300,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            maxWidth: '14ch',
          }}
        >
          Aya Masadeh
        </h1>

       {/* 
<p
  className="mt-3 text-xs uppercase tracking-[0.28em]"
  style={{ color: 'var(--muted)' }}
>
  Contemporary Painter
</p>
*/}
        {/* Description */}
        <p
          className="mt-6 text-base font-light"
          style={{ color: 'var(--muted)', maxWidth: '40ch', lineHeight: 1.7 }}
        >
          Original paintings exploring light, texture, and the quiet language of form.
        </p>

        {/* CTA buttons */}
<div className="mt-12 flex gap-5">
  <Link
    href="/paintings"
    className="btn-outline"
    style={{ borderColor: 'var(--foreground)', letterSpacing: '0.14em' }}
  >
    View Works
  </Link>

  <Link
    href="/bio"
    className="btn-outline"
    style={{ borderColor: 'var(--foreground)', letterSpacing: '0.14em' }}
  >
    About
  </Link>
</div>
        {/* Decorative rule */}
        <div
          className="mt-20 h-px w-16"
          style={{ background: 'var(--border)' }}
        />

      </div>
    </main>
  )
}