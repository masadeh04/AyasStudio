'use client'
import { useMemo } from 'react'
import { Mail, Phone, MessageCircle } from 'lucide-react'

const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || ''
const CONTACT_PHONE = process.env.NEXT_PUBLIC_CONTACT_PHONE || '' // e.g. +9627...
const CONTACT_TEXT  = process.env.NEXT_PUBLIC_CONTACT_WHATSAPP || '' // reuse this env for WhatsApp text (e.g. +9627...)

function waDigits(e164: string) {
  return e164.replace(/[^\d]/g, '')
}

export default function ContactPage() {
  const mailHref = useMemo(() => {
    if (!CONTACT_EMAIL) return '#'
    return `mailto:${encodeURIComponent(CONTACT_EMAIL)}`
  }, [])

  const callHref = useMemo(() => {
    if (!CONTACT_PHONE) return '#'
    return `tel:${CONTACT_PHONE}`
  }, [])

  // Text opens WhatsApp (as you wanted the label to just say “Text”)
  const textHref = useMemo(() => {
    if (!CONTACT_TEXT) return '#'
    return `https://wa.me/${waDigits(CONTACT_TEXT)}`
  }, [])

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      {/* Header */}
      <div className="mb-14 border-b pb-10" style={{ borderColor: 'var(--border)' }}>
        <p className="label mb-3">Contact</p>
        <h1>Get in touch</h1>
        <p
          className="mt-4 text-sm font-light"
          style={{ color: 'var(--muted)', maxWidth: '55ch', lineHeight: 1.7 }}
        >
          For availability, purchasing, or commissions, please reach out using one of the options below.
        </p>
      </div>

      {/* Contact options */}
      <div className="grid gap-6 md:grid-cols-3 items-stretch">
        {/* Email */}
        <div className="border p-6 flex h-[260px] flex-col" style={{ borderColor: 'var(--border)' }}>
          <div>
            <div className="mb-4 flex items-center gap-3">
              <Mail size={18} />
              <p className="label">Email</p>
            </div>

            <p className="text-sm font-light" style={{ color: 'var(--muted)', lineHeight: 1.7 }}>
              Best for inquiries about a specific work, pricing, and shipping.
            </p>
          </div>

          <div className="mt-auto pt-8">
           <a
  href={mailHref}
  className="btn-outline"
  style={{
    pointerEvents: CONTACT_EMAIL ? 'auto' : 'none',
    opacity: CONTACT_EMAIL ? 1 : 0.55
  }}
>
  Email
</a>
          </div>
        </div>

        {/* Call */}
        <div className="border p-6 flex h-[260px] flex-col" style={{ borderColor: 'var(--border)' }}>
          <div>
            <div className="mb-4 flex items-center gap-3">
              <Phone size={18} />
              <p className="label">Call</p>
            </div>

            <p className="text-sm font-light" style={{ color: 'var(--muted)', lineHeight: 1.7 }}>
              For quick questions and time-sensitive requests.
            </p>
          </div>

          <div className="mt-auto pt-8">
            <a
              href={callHref}
              className="block border py-3 text-center text-xs tracking-widest uppercase transition-opacity hover:opacity-60"
              style={{
                borderColor: 'var(--foreground)',
                color: 'var(--foreground)',
                letterSpacing: '0.14em',
                pointerEvents: CONTACT_PHONE ? 'auto' : 'none',
                opacity: CONTACT_PHONE ? 1 : 0.55,
              }}
            >
              Call
            </a>
          </div>
        </div>

        {/* Text */}
        <div className="border p-6 flex h-[260px] flex-col" style={{ borderColor: 'var(--border)' }}>
          <div>
            <div className="mb-4 flex items-center gap-3">
              <MessageCircle size={18} />
              <p className="label">Text</p>
            </div>

            <p className="text-sm font-light" style={{ color: 'var(--muted)', lineHeight: 1.7 }}>
              Message us directly for a quick reply.
            </p>
          </div>

          <div className="mt-auto pt-8">
            <a
              href={textHref}
              target="_blank"
              rel="noreferrer"
              className="block border py-3 text-center text-xs tracking-widest uppercase transition-opacity hover:opacity-60"
              style={{
                borderColor: 'var(--foreground)',
                color: 'var(--foreground)',
                letterSpacing: '0.14em',
                pointerEvents: CONTACT_TEXT ? 'auto' : 'none',
                opacity: CONTACT_TEXT ? 1 : 0.55,
              }}
            >
              Text
            </a>
          </div>
        </div>
      </div>

      {/* Commissions note */}
      <div className="mt-14 border-t pt-10" style={{ borderColor: 'var(--border)' }}>
        <p className="label mb-3">Commissions</p>
        <p className="text-sm font-light" style={{ color: 'var(--muted)', maxWidth: '70ch', lineHeight: 1.8 }}>
          Commissions are welcomed on a limited basis. Please include your preferred size, timeline, and any reference
          imagery or ideas.
        </p>
      </div>
    </main>
  )
}