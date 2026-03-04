import { sanity } from '@/lib/sanity.client'
import { artworksQuery } from '@/lib/queries'
import GalleryClient from './gallery-client'

export const revalidate = 60

export default async function PaintingsPage() {
  const artworks = await sanity.fetch(artworksQuery)

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      {/* Page header */}
      <div className="mb-14 border-b pb-10" style={{ borderColor: 'var(--border)' }}>
        <p className="label mb-3">Portfolio</p>
        <h1>Works</h1>

        <p
          className="mt-4 text-sm font-light"
          style={{ color: 'var(--muted)', maxWidth: '50ch', lineHeight: 1.7 }}
        >
          A curated selection of original works.
        </p>
      </div>

      <GalleryClient artworks={artworks} />
    </main>
  )
}