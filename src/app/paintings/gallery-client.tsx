'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'
import { urlFor } from '@/lib/sanity.image'
import ArtworkModal from '@/components/ArtworkModal'

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

const statusDot: Record<string, string> = {
  Available:    '#3b7a57',
  Sold:         '#aaa',
  Commissioned: '#b07a3b',
}

export default function GalleryClient({ artworks }: { artworks: Artwork[] }) {
  const [status, setStatus] = useState<'All' | Artwork['status']>('All')
  const [tag, setTag]       = useState<string>('All')
  const [selected, setSelected] = useState<Artwork | null>(null)

  const allTags = useMemo(() => {
    const set = new Set<string>()
    artworks.forEach((a) => (a.tags || []).forEach((t) => set.add(t)))
    return ['All', ...Array.from(set).sort((a, b) => a.localeCompare(b))]
  }, [artworks])

  const filtered = useMemo(() => {
    return artworks.filter((a) => {
      const okStatus = status === 'All' ? true : a.status === status
      const okTag    = tag    === 'All' ? true : (a.tags || []).includes(tag)
      return okStatus && okTag
    })
  }, [artworks, status, tag])

  const modalImgUrl = selected?.images
    ? urlFor(selected.images).width(1600).height(1600).fit('max').url()
    : null

  return (
    <>
      {/* ── Filters ─────────────────────────────────────────────────── */}
      <div className="mb-10 flex flex-wrap items-center gap-3">
        {/* Status pills */}
        {(['All', 'Available', 'Sold', 'Commissioned'] as const).map((s) => (
          <button
            key={s}
            onClick={() => setStatus(s)}
            className="text-xs tracking-widest uppercase px-4 py-2 transition-all"
            style={{
              letterSpacing: '0.12em',
              background:    status === s ? 'var(--foreground)' : 'transparent',
              color:         status === s ? 'var(--background)' : 'var(--muted)',
              border:        `1px solid ${status === s ? 'var(--foreground)' : 'var(--border)'}`,
            }}
          >
            {s}
          </button>
        ))}

        {/* Divider */}
        <div className="h-5 w-px mx-1" style={{ background: 'var(--border)' }} />

        {/* Tag select */}
        <select
          className="text-xs tracking-widest uppercase px-4 py-2 bg-transparent"
          style={{
            letterSpacing: '0.12em',
            border: '1px solid var(--border)',
            color: tag === 'All' ? 'var(--muted)' : 'var(--foreground)',
            appearance: 'none',
            paddingRight: '2rem',
          }}
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        >
          {allTags.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>

        {/* Count */}
        <span
          className="ml-auto text-xs tracking-widest uppercase"
          style={{ color: 'var(--muted)', letterSpacing: '0.12em' }}
        >
          {filtered.length} {filtered.length === 1 ? 'work' : 'works'}
        </span>
      </div>

      {/* ── Grid ────────────────────────────────────────────────────── */}
      <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((a) => {
          const img    = a.images
          const imgUrl = img ? urlFor(img).width(800).height(900).fit('crop').url() : null

          return (
            <article key={a._id} className="group">
              {/* Image block — clickable for modal */}
              <button
                className="relative block w-full cursor-pointer overflow-hidden"
                style={{
                  aspectRatio: '4/5',
                  background: '#ede9e3',
                }}
                onClick={() => setSelected(a)}
                aria-label={`View ${a.title} in fullscreen`}
              >
                {imgUrl ? (
                  <>
                    <Image
                      src={imgUrl}
                      alt={a.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      loading="lazy"
                    />
                    {/* Hover overlay */}
                    <div
                      className="absolute inset-0 flex flex-col items-center justify-end pb-6 transition-opacity duration-400"
                      style={{
                        background: 'linear-gradient(to top, rgba(26,25,22,0.55) 0%, transparent 50%)',
                        opacity: 0,
                      }}
                      // CSS-only hover via sibling — we'll use inline style + group-hover via a wrapper span
                    />
                    <div
                      className="absolute inset-0 flex flex-col items-center justify-end pb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: 'linear-gradient(to top, rgba(26,25,22,0.6) 0%, transparent 55%)',
                        pointerEvents: 'none',
                      }}
                    >
                      <p
                        className="text-center text-sm font-light tracking-wide"
                        style={{ color: '#fff', maxWidth: '80%' }}
                      >
                        {a.title}
                      </p>
                      <p
                        className="mt-1 text-xs tracking-widest uppercase"
                        style={{ color: 'rgba(255,255,255,0.65)', letterSpacing: '0.12em' }}
                      >
                        {a.year ?? ''}
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <span className="label">No image</span>
                  </div>
                )}
              </button>

              {/* Caption */}
              <div className="mt-4 px-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p
                      className="text-sm font-light"
                      style={{ color: 'var(--foreground)', lineHeight: 1.4 }}
                    >
                      {a.title}
                    </p>
                    <p
                      className="mt-1 text-xs"
                      style={{ color: 'var(--muted)', lineHeight: 1.5 }}
                    >
                      {[a.year, a.medium].filter(Boolean).join(' · ')}
                    </p>
                  </div>

                  {/* Status dot */}
                  <span
                    className="mt-1 h-2 w-2 shrink-0 rounded-full"
                    title={a.status}
                    style={{ background: statusDot[a.status] ?? 'var(--border)', marginTop: '5px' }}
                  />
                </div>

                {a.showPrice && typeof a.price === 'number' && (
                  <p className="mt-2 text-xs" style={{ color: 'var(--muted)' }}>
                    {new Intl.NumberFormat('en-JO', { style: 'currency', currency: 'JOD' }).format(a.price)}
                  </p>
                )}
              </div>
            </article>
          )
        })}
      </div>

      {/* ── Modal ───────────────────────────────────────────────────── */}
      <ArtworkModal
        artwork={selected}
        imgUrl={modalImgUrl}
        onClose={() => setSelected(null)}
      />
    </>
  )
}
