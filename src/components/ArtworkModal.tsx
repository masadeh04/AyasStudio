'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

type Artwork = {
  _id: string
  title: string
  slug: { current: string }
  images?: any
  year?: number
  medium?: string
  dimensions?: string
  status: 'Available' | 'Sold' | 'Commissioned'
  price?: number
  showPrice?: boolean
  tags?: string[]
}

type Props = {
  artwork: Artwork | null
  imgUrl: string | null
  onClose: () => void
}

const statusColor: Record<string, string> = {
  Available: '#3b7a57',
  Sold: '#888',
  Commissioned: '#7a5c3b',
}

export default function ArtworkModal({ artwork, imgUrl, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!artwork) return

    closeRef.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', onKey)

    // Lock background scroll, but allow modal scroll (overlay is scrollable)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [artwork, onClose])

  if (!artwork) return null

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label={artwork.title}
      className="fixed inset-0 z-50 overflow-y-auto"
      style={{
        background: 'rgba(250,249,247,0.92)',
        backdropFilter: 'blur(10px)',
      }}
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose()
      }}
    >
      {/* Top bar (subtle) */}
      <div
        className="sticky top-0 z-10 border-b"
        style={{
          borderColor: 'var(--border)',
          background: 'rgba(250,249,247,0.78)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="min-w-0">
            <p className="label mb-1">{artwork.year ?? '—'}</p>
            <p
              className="truncate"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: '1.15rem',
                fontWeight: 300,
                color: 'var(--foreground)',
              }}
            >
              {artwork.title}
            </p>
          </div>

          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close"
            className="ml-4 inline-flex h-10 w-10 items-center justify-center border transition-opacity hover:opacity-70"
            style={{
              borderColor: 'var(--border)',
              color: 'var(--foreground)',
              borderRadius: '999px',
              background: 'rgba(255,255,255,0.55)',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="1" y1="1" x2="15" y2="15" />
              <line x1="15" y1="1" x2="1" y2="15" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-10 lg:grid-cols-[1.35fr_0.65fr]">
          {/* Image area */}
          <section>
            <div
              className="relative w-full border"
              style={{
                borderColor: 'var(--border)',
                background: 'rgba(255,255,255,0.55)',
                borderRadius: '2px',
                boxShadow: '0 30px 70px rgba(0,0,0,0.18)',
              }}
            >
              {/* Give the image a gallery wall feeling */}
              <div className="relative aspect-[4/3] w-full">
                {imgUrl ? (
                  <Image
                    src={imgUrl}
                    alt={artwork.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 70vw"
                    className="object-contain p-6 sm:p-10"
                    priority
                  />
                ) : (
                  <div className="flex h-full items-center justify-center" style={{ color: 'var(--muted)' }}>
                    <span className="label">No image</span>
                  </div>
                )}
              </div>
            </div>

            {/* Optional breathing room / caption line */}
            <div className="mt-6 text-xs tracking-widest uppercase" style={{ color: 'var(--muted)' }}>
              {artwork.medium ? artwork.medium : ' '}
            </div>
          </section>

          {/* Info rail */}
          <aside className="lg:sticky lg:top-24 self-start">
            <div
              className="border px-8 py-10"
              style={{
                borderColor: 'var(--border)',
                background: 'rgba(255,255,255,0.55)',
                borderRadius: '2px',
                boxShadow: '0 20px 55px rgba(0,0,0,0.12)',
              }}
            >
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 'clamp(1.6rem, 2.4vw, 2.2rem)',
                  fontWeight: 300,
                  lineHeight: 1.15,
                  letterSpacing: '-0.01em',
                  marginBottom: '1.5rem',
                }}
              >
                {artwork.title}
              </h2>

              <div className="space-y-4">
                {artwork.medium && (
                  <div>
                    <p className="label mb-1">Medium</p>
                    <p className="text-sm font-light" style={{ color: 'var(--foreground)' }}>
                      {artwork.medium}
                    </p>
                  </div>
                )}

                {artwork.dimensions && (
                  <div>
                    <p className="label mb-1">Dimensions</p>
                    <p className="text-sm font-light" style={{ color: 'var(--foreground)' }}>
                      {artwork.dimensions}
                    </p>
                  </div>
                )}

                <div>
                  <p className="label mb-1">Status</p>
                  <span
                    className="inline-block text-xs tracking-widest uppercase px-3 py-1"
                    style={{
                      letterSpacing: '0.1em',
                      color: statusColor[artwork.status] ?? 'var(--muted)',
                      border: `1px solid ${statusColor[artwork.status] ?? 'var(--border)'}`,
                    }}
                  >
                    {artwork.status}
                  </span>
                </div>

                {artwork.showPrice && typeof artwork.price === 'number' && (
                  <div>
                    <p className="label mb-1">Price</p>
                    <p className="text-sm font-light" style={{ color: 'var(--muted)' }}>
                      {new Intl.NumberFormat('en-JO', { style: 'currency', currency: 'JOD' }).format(artwork.price)}
                    </p>
                  </div>
                )}
              </div>

              {/* View full detail link */}
              <a
                href={`/paintings/${artwork.slug.current}`}
                className="mt-10 inline-block border-b pb-0.5 text-xs tracking-widest uppercase transition-opacity hover:opacity-50"
                style={{
                  borderColor: 'var(--foreground)',
                  letterSpacing: '0.12em',
                  color: 'var(--foreground)',
                  width: 'fit-content',
                }}
              >
                View full detail →
              </a>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}