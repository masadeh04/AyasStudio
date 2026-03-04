import { sanity } from '@/lib/sanity.client'
import { artistProfileQuery } from '@/lib/queries'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity.image'
import { Mail, Instagram } from 'lucide-react'
import { PortableText } from '@portabletext/react'

export const revalidate = 60

export default async function BioPage() {
  const profile = await sanity.fetch(artistProfileQuery)

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      {/* Header */}
      <div className="mb-14 border-b pb-10" style={{ borderColor: 'var(--border)' }}>
        <p className="label mb-3">Artist</p>
        <h1>{profile?.name || 'Aya Masadeh'}</h1>

        {profile?.tagline && (
          <p
            className="mt-4 text-base font-light italic"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              color: 'var(--muted)',
              fontSize: '1.15rem',
              maxWidth: '50ch',
            }}
          >
            {profile.tagline}
          </p>
        )}
      </div>

      <div className="grid gap-16 md:grid-cols-[280px_1fr]">

        {/* Portrait */}
        <div>
          {profile?.portrait ? (
            <div
              className="relative overflow-hidden"
              style={{ aspectRatio: '4/5', background: '#ede9e3' }}
            >
              <Image
                src={urlFor(profile.portrait).width(800).height(1000).fit('crop').url()}
                alt={`${profile?.name || 'Artist'} portrait`}
                fill
                className="object-cover"
                sizes="280px"
                priority
              />
            </div>
          ) : (
            <div style={{ aspectRatio: '4/5', background: '#ede9e3' }} />
          )}

          {/* Social links */}
          <div className="mt-6 flex items-center gap-4">
            {profile?.email && (
              <a
                href={`mailto:${profile.email}`}
                aria-label="Email"
                className="flex h-9 w-9 items-center justify-center border transition-colors hover:bg-neutral-100"
                style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}
              >
                <Mail size={15} />
              </a>
            )}

            {profile?.instagram && (
              <a
                href={profile.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center border transition-colors hover:bg-neutral-100"
                style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}
              >
                <Instagram size={15} />
              </a>
            )}
          </div>
        </div>

        {/* Bio text */}
        <div className="max-w-xl">
          {profile?.shortBio ? (
            <p
              className="whitespace-pre-line text-base font-light"
              style={{ color: 'var(--foreground)', lineHeight: 1.85 }}
            >
              {profile.shortBio}
            </p>
          ) : (
            <p className="text-sm" style={{ color: 'var(--muted)' }}>
              Add a short bio in Sanity → Artist Profile.
            </p>
          )}

          {/* Artist Statement */}
          {profile?.statement && (
            <blockquote
              className="mt-12 border-l-2 pl-6"
              style={{
                borderColor: 'var(--foreground)',
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: '1.2rem',
                fontWeight: 300,
                fontStyle: 'italic',
                color: 'var(--foreground)',
                lineHeight: 1.6,
              }}
            >
              <PortableText
                value={
                  Array.isArray(profile.statement)
                    ? profile.statement
                    : [profile.statement]
                }
              />
            </blockquote>
          )}
        </div>

      </div>
    </main>
  )
}