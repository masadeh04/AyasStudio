import Image from 'next/image'
import Link from 'next/link'
import { sanity } from '@/lib/sanity.client'
import { artworkBySlugQuery } from '@/lib/queries'
import { urlFor } from '@/lib/sanity.image'
import InquiryActions from './InquiryActions'

export const revalidate = 60

const statusColor: Record<string, string> = {
  Available: '#3b7a57',
  Sold: '#888',
  Commissioned: '#b07a3b',
}

export default async function ArtworkPage({ params }: { params: any }) {
  const resolvedParams = await Promise.resolve(params)
  const slug = resolvedParams?.slug

  if (!slug) {
    return <main className="mx-auto max-w-3xl px-6 py-16">Missing slug.</main>
  }

  const artwork = await sanity.fetch(artworkBySlugQuery, { slug })

  if (!artwork) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-16">
        <p style={{ color: 'var(--muted)' }}>Work not found.</p>
        <Link
          className="mt-4 inline-block text-sm underline-offset-4 hover:underline"
          href="/paintings"
          style={{ color: 'var(--muted)' }}
        >
          ← Back to paintings
        </Link>
      </main>
    )
  }

  const subject = encodeURIComponent(`Inquiry about: ${artwork.title}`)
  const body = encodeURIComponent(
    `Hi,\n\nI'm interested in "${artwork.title}".\n\nLink: ${process.env.NEXT_PUBLIC_SITE_URL}/paintings/${artwork.slug.current}\n\nMy message:\n`
  )
  const mailto = `mailto:?subject=${subject}&body=${body}`

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      {/* Back */}
      <Link className="label hover:opacity-60 transition-opacity" href="/paintings">
        ← All works
      </Link>

      <div className="mt-10 grid gap-16 lg:grid-cols-[1fr_320px]">
  {/* ── Images ────────────────────────────────────────────────── */}
<div className="space-y-10">
  {artwork.images?.map((img: any, idx: number) => {
    const url = urlFor(img).width(2000).height(2000).fit('max').url()

    return (
      <div key={idx} className="w-full">
        <Image
          src={url}
          alt={`${artwork.title}${artwork.images.length > 1 ? ` — view ${idx + 1}` : ''}`}
          width={2000}
          height={2000}
          className="w-full h-auto"
          priority={idx === 0}
        />
      </div>
    )
  })}
</div>

        {/* ── Details ───────────────────────────────────────────────── */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="label mb-3">{artwork.year ?? '—'}</p>

          <h1
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
              fontWeight: 300,
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
            }}
          >
            {artwork.title}
          </h1>

          {/* Meta */}
          <div className="mt-8 space-y-5 border-y py-8" style={{ borderColor: 'var(--border)' }}>
            {artwork.medium && (
              <div>
                <p className="label mb-1">Medium</p>
                <p className="text-sm font-light">{artwork.medium}</p>
              </div>
            )}

            {artwork.dimensions && (
              <div>
                <p className="label mb-1">Dimensions</p>
                <p className="text-sm font-light">{artwork.dimensions}</p>
              </div>
            )}

            <div>
              <p className="label mb-1">Availability</p>
              <span
                className="text-xs tracking-widest uppercase"
                style={{
                  color: statusColor[artwork.status] ?? 'var(--muted)',
                  letterSpacing: '0.1em',
                }}
              >
                {artwork.status}
              </span>
            </div>

            {artwork.showPrice && typeof artwork.price === 'number' && (
              <div>
                <p className="label mb-1">Price</p>
                <p className="text-sm font-light">
                  {new Intl.NumberFormat('en-JO', { style: 'currency', currency: 'JOD' }).format(artwork.price)}
                </p>
              </div>
            )}
          </div>

          {/* Description */}
          {artwork.description && (
            <p className="mt-8 text-sm font-light whitespace-pre-line" style={{ color: 'var(--muted)', lineHeight: 1.8 }}>
              {artwork.description}
            </p>
          )}

          {/* Tags */}
          {artwork.tags?.length ? (
            <div className="mt-6 flex flex-wrap gap-2">
              {artwork.tags.map((t: string) => (
                <span
                  key={t}
                  className="text-xs px-3 py-1"
                  style={{
                    border: '1px solid var(--border)',
                    color: 'var(--muted)',
                    letterSpacing: '0.06em',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          ) : null}

         {/* CTAs */}
<div className="mt-10">
  <InquiryActions
    title={artwork.title}
    slug={artwork.slug.current}
    email={process.env.NEXT_PUBLIC_CONTACT_EMAIL}
    phone={process.env.NEXT_PUBLIC_CONTACT_PHONE}
    whatsapp={process.env.NEXT_PUBLIC_CONTACT_WHATSAPP}
    siteUrl={process.env.NEXT_PUBLIC_SITE_URL}
  />
</div>
        </div>
      </div>
    </main>
  )
}