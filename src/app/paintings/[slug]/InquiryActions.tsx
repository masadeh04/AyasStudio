'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

type Props = {
  title: string
  slug: string
  email?: string
  phone?: string // E.164 format recommended: +9627...
  whatsapp?: string // E.164 format recommended: +9627...
  siteUrl?: string
}

function toWaDigits(e164: string) {
  // wa.me expects digits only, no "+"
  return e164.replace(/[^\d]/g, '')
}

export default function InquiryActions({ title, slug, email, phone, whatsapp, siteUrl }: Props) {
  const [open, setOpen] = useState(false)
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  const pageUrl = useMemo(() => {
    const base = siteUrl || process.env.NEXT_PUBLIC_SITE_URL || ''
    const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base
    return cleanBase ? `${cleanBase}/paintings/${slug}` : `/paintings/${slug}`
  }, [siteUrl, slug])

  const subject = useMemo(() => encodeURIComponent(`Inquiry about: ${title}`), [title])
  const body = useMemo(
    () =>
      encodeURIComponent(
        `Hi,\n\nI'm interested in "${title}".\n\nLink: ${pageUrl}\n\nMy message:\n`
      ),
    [title, pageUrl]
  )

  const emailHref = useMemo(() => {
    // If you provide an email, it will fill the "to:" field.
    // If not, it still opens the email composer (but no recipient).
    const to = email ? encodeURIComponent(email) : ''
    return `mailto:${to}?subject=${subject}&body=${body}`
  }, [email, subject, body])

  const callHref = useMemo(() => (phone ? `tel:${phone}` : '#'), [phone])

  const whatsappHref = useMemo(() => {
    if (!whatsapp) return '#'
    const digits = toWaDigits(whatsapp)
    const text = encodeURIComponent(`Hi, I'm interested in "${title}". Link: ${pageUrl}`)
    return `https://wa.me/${digits}?text=${text}`
  }, [whatsapp, title, pageUrl])

  useEffect(() => {
    if (!open) return
    closeBtnRef.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      {/* Main CTA button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="btn-outline"
        style={{
          borderColor: 'var(--foreground)',
          color: 'var(--foreground)',
          letterSpacing: '0.14em',
        }}
      >
        Inquire about this piece
      </button>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-6"
          style={{ background: 'rgba(250,249,247,0.78)', backdropFilter: 'blur(10px)' }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false)
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Inquiry options"
        >
          <div
            className="relative w-full max-w-sm border bg-white/80 p-6"
            style={{
              borderColor: 'var(--border)',
              borderRadius: '2px',
              boxShadow: '0 28px 70px rgba(0,0,0,0.18)',
            }}
          >
            <div className="grid gap-2">
              <a
                href={emailHref}
               className="btn-outline"
                style={{ borderColor: 'var(--foreground)', color: 'var(--foreground)', letterSpacing: '0.14em' }}
              >
                Email
              </a>

              <a
                href={callHref}
                className="block border py-3 text-center text-xs tracking-widest uppercase transition-opacity hover:opacity-60"
                style={{
                  borderColor: 'var(--border)',
                  color: phone ? 'var(--foreground)' : 'var(--muted)',
                  letterSpacing: '0.14em',
                  pointerEvents: phone ? 'auto' : 'none',
                  opacity: phone ? 1 : 0.55,
                }}
                aria-disabled={!phone}
              >
                Call
              </a>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="block border py-3 text-center text-xs tracking-widest uppercase transition-opacity hover:opacity-60"
                style={{
                  borderColor: 'var(--border)',
                  color: whatsapp ? 'var(--foreground)' : 'var(--muted)',
                  letterSpacing: '0.14em',
                  pointerEvents: whatsapp ? 'auto' : 'none',
                  opacity: whatsapp ? 1 : 0.55,
                }}
                aria-disabled={!whatsapp}
              >
                Text
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}