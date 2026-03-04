'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'

type Artwork = {
  title: string
  year?: number
  medium?: string
  dimensions?: string
  status?: string
  price?: number
  showPrice?: boolean
}

export default function ArtworkModal({
  artwork,
  imgUrl,
  onClose,
}: {
  artwork: Artwork | null
  imgUrl: string | null
  onClose: () => void
}) {
  const open = !!artwork && !!imgUrl
  const startY = useRef<number | null>(null)
  const [dragY, setDragY] = useState(0)

  // Currency formatting (only used if showPrice is true)
  const priceText = useMemo(() => {
    if (!artwork?.showPrice || typeof artwork.price !== 'number') return null
    return new Intl.NumberFormat('en-JO', { style: 'currency', currency: 'JOD' }).format(artwork.price)
  }, [artwork])

  // ESC to close + lock scroll
  useEffect(() => {
    if (!open) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = prevOverflow
    }
  }, [open, onClose])

  if (!open) return null

  const metaLine = [artwork?.year, artwork?.medium, artwork?.dimensions].filter(Boolean).join(' · ')

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // only close if user clicked the backdrop (not inside content)
    if (e.target === e.currentTarget) onClose()
  }

  const onTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0]?.clientY ?? null
    setDragY(0)
  }
  const onTouchMove = (e: React.TouchEvent) => {
    if (startY.current == null) return
    const current = e.touches[0]?.clientY ?? startY.current
    const delta = current - startY.current
    // Only allow dragging down a bit (mobile-friendly "pull down to close")
    setDragY(Math.max(0, Math.min(delta, 220)))
  }
  const onTouchEnd = () => {
    if (dragY > 90) {
      onClose()
    } else {
      setDragY(0)
    }
    startY.current = null
  }

  return (
    <div
      className="fixed inset-0 z-50"
      style={{ background: 'rgba(0,0,0,0.72)' }}
      onMouseDown={handleBackdropClick}
      aria-modal="true"
      role="dialog"
    >
      {/* Mobile: full-screen sheet. Desktop: centered lightbox */}
      <div
        className="
          absolute inset-0
          sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2
          sm:w-[min(1000px,92vw)] sm:max-h-[88vh]
        "
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{
          transform:
            // mobile drag: translateY; desktop: handled by tailwind translate
            dragY > 0 ? `translateY(${dragY}px)` : undefined,
          transition: dragY > 0 ? 'none' : 'transform 180ms ease',
        }}
      >
        <div
          className="
            h-full w-full
            bg-[var(--background)]
            sm:rounded-2xl
            overflow-hidden
            border
          "
          style={{ borderColor: 'var(--border)' }}
        >
          {/* Top bar (mobile) */}
          <div
            className="flex items-center justify-between px-4 py-3 sm:hidden"
            style={{ borderBottom: '1px solid var(--border)' }}
          >
            <div className="min-w-0">
              <p className="text-sm font-light truncate" style={{ color: 'var(--foreground)' }}>
                {artwork?.title}
              </p>
              {metaLine ? (
                <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>
                  {metaLine}
                </p>
              ) : null}
            </div>

            <button
              onClick={onClose}
              className="ml-3 inline-flex h-10 w-10 items-center justify-center rounded-full border"
              style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>

          {/* Content */}
          <div className="flex h-full flex-col sm:flex-row">
            {/* Image */}
            <div className="relative w-full sm:w-[64%] bg-black">
              <div className="relative h-[68vh] sm:h-[88vh] sm:max-h-[88vh] w-full">
                <Image
                  src={imgUrl}
                  alt={artwork?.title || 'Artwork'}
                  fill
                  sizes="(max-width: 640px) 100vw, 64vw"
                  className="object-contain"
                  priority
                />
              </div>

              {/* Desktop close button */}
              <button
                onClick={onClose}
                className="hidden sm:inline-flex absolute right-4 top-4 h-10 w-10 items-center justify-center rounded-full border bg-black/40 backdrop-blur"
                style={{ borderColor: 'rgba(255,255,255,0.25)', color: '#fff' }}
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Details */}
            <div className="w-full sm:w-[36%] p-5 sm:p-7 overflow-auto">
              <div className="hidden sm:block mb-4">
                <p className="label mb-2">Work</p>
                <h2 className="text-xl font-light" style={{ color: 'var(--foreground)' }}>
                  {artwork?.title}
                </h2>
                {metaLine ? (
                  <p className="mt-2 text-sm font-light" style={{ color: 'var(--muted)', lineHeight: 1.7 }}>
                    {metaLine}
                  </p>
                ) : null}
              </div>

              {artwork?.status ? (
                <p className="text-xs tracking-widest uppercase" style={{ color: 'var(--muted)', letterSpacing: '0.12em' }}>
                  {artwork.status}
                </p>
              ) : null}

              {priceText ? (
                <p className="mt-3 text-sm font-light" style={{ color: 'var(--foreground)' }}>
                  {priceText}
                </p>
              ) : null}

              {/* Mobile hint */}
              <p className="mt-6 text-xs sm:hidden" style={{ color: 'var(--muted)' }}>
                Tip: swipe down to close
              </p>

              {/* Optional CTA (safe default) */}
              <div className="mt-8">
                <a
                  href="/contact"
                  className="block border py-3 text-center text-xs tracking-widest uppercase transition-opacity hover:opacity-60"
                  style={{
                    borderColor: 'var(--foreground)',
                    color: 'var(--foreground)',
                    letterSpacing: '0.14em',
                  }}
                >
                  Inquire
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}