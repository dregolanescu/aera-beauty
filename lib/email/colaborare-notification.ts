/**
 * HTML email template: lead notification B2B → office@aerabeauty.ro
 * Inline styles only (email client compatibility).
 * Palette: cream-100 outer, ivory-50 container, cocoa-700 text.
 * Font: Tahoma stack (Romanian diacritics safe).
 */

import { colaborareConfigs } from '@/content/colaborare-forms'

type ColaborareData = {
  brand: 'aqua-mineral' | 'oliere-paris' | 'redefine-matcha'
  name: string
  email: string
  phone: string
  city: string
  profile: string
  profileOther: string
  interest: string[]
  products: string[]
  benefits: string[]
  followUp: 'whatsapp' | 'email' | 'telefon'
  message: string
  marketingOptIn: boolean
  timestamp: string
  ipHashed: string
  gdprVersion: string
  leadId?: string
}

const followUpLabels: Record<string, string> = {
  whatsapp: 'WhatsApp',
  email: 'Email',
  telefon: 'Telefon',
}

function labelFor(value: string, options: { value: string; label: string }[]): string {
  return options.find((o) => o.value === value)?.label ?? value
}

function joinLabels(values: string[], options: { value: string; label: string }[]): string {
  if (!values || values.length === 0) return '—'
  return values.map((v) => labelFor(v, options)).join(', ')
}

export function buildColaborareNotificationHtml(data: ColaborareData): string {
  const cfg = colaborareConfigs[data.brand]
  const brandLabel = cfg.name

  const profileLabel =
    data.profile === 'altul' && data.profileOther
      ? `Altul: ${data.profileOther}`
      : labelFor(data.profile, cfg.profile)

  const interestLabels = joinLabels(data.interest, cfg.interest)
  const productsLabels = joinLabels(data.products, cfg.products)
  const benefitsLabels = joinLabels(data.benefits, cfg.benefits)
  const followUpLabel = followUpLabels[data.followUp] ?? data.followUp

  const waLink = data.phone
    ? `https://wa.me/${data.phone.replace(/\D/g, '')}?text=${encodeURIComponent('Salut, ne-ai contactat prin aerabeauty.ro. Revenim cu detalii.')}`
    : ''

  return `<!DOCTYPE html>
<html lang="ro">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F5EFE7;font-family:Tahoma,Verdana,Arial,sans-serif;color:#5B4638;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F5EFE7;padding:32px 16px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#FBF7F0;border-radius:12px;overflow:hidden;max-width:600px;width:100%;">

  <!-- Header -->
  <tr><td style="padding:28px 32px 20px;border-bottom:1px solid #E8DFD3;">
    <img src="https://aerabeauty.ro/logo/aera-beauty-mocha.png" alt="AERA Beauty" width="140" style="display:block;width:140px;height:auto;margin:0 0 16px;border:0;outline:none;text-decoration:none;">
    <p style="margin:0 0 4px;font-size:11px;font-weight:500;text-transform:uppercase;letter-spacing:0.14em;color:#8C7567;">Lead B2B nou — ${brandLabel}</p>
    <p style="margin:0;font-family:Georgia,serif;font-size:22px;color:#3D2F25;">${data.name}</p>
  </td></tr>

  <!-- Contact highlight -->
  <tr><td style="padding:24px 32px;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td style="padding:0 0 8px;">
          <a href="mailto:${data.email}" style="color:#5B4638;font-size:16px;text-decoration:underline;">${data.email}</a>
        </td>
      </tr>
      ${data.phone ? `<tr><td style="padding:0 0 8px;">
        <a href="tel:${data.phone}" style="color:#5B4638;font-size:16px;text-decoration:underline;">${data.phone}</a>
      </td></tr>` : ''}
      ${data.city ? `<tr><td style="padding:0 0 8px;font-size:14px;color:#8C7567;">${data.city}</td></tr>` : ''}
    </table>
  </td></tr>

  <!-- Details table -->
  <tr><td style="padding:0 32px 24px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;">
      <tr>
        <td style="padding:10px 0;border-top:1px solid #E8DFD3;color:#8C7567;width:160px;vertical-align:top;">Brand</td>
        <td style="padding:10px 0;border-top:1px solid #E8DFD3;color:#3D2F25;font-weight:500;">${brandLabel}</td>
      </tr>
      <tr>
        <td style="padding:10px 0;border-top:1px solid #E8DFD3;color:#8C7567;vertical-align:top;">Profil</td>
        <td style="padding:10px 0;border-top:1px solid #E8DFD3;color:#3D2F25;">${profileLabel}</td>
      </tr>
      <tr>
        <td style="padding:10px 0;border-top:1px solid #E8DFD3;color:#8C7567;vertical-align:top;">Interes</td>
        <td style="padding:10px 0;border-top:1px solid #E8DFD3;color:#3D2F25;">${interestLabels}</td>
      </tr>
      <tr>
        <td style="padding:10px 0;border-top:1px solid #E8DFD3;color:#8C7567;vertical-align:top;">${cfg.productsLabel}</td>
        <td style="padding:10px 0;border-top:1px solid #E8DFD3;color:#3D2F25;">${productsLabels}</td>
      </tr>
      <tr>
        <td style="padding:10px 0;border-top:1px solid #E8DFD3;color:#8C7567;vertical-align:top;">${cfg.benefitsLabel}</td>
        <td style="padding:10px 0;border-top:1px solid #E8DFD3;color:#3D2F25;">${benefitsLabels}</td>
      </tr>
      <tr>
        <td style="padding:10px 0;border-top:1px solid #E8DFD3;color:#8C7567;vertical-align:top;">Follow-up preferat</td>
        <td style="padding:10px 0;border-top:1px solid #E8DFD3;color:#3D2F25;font-weight:500;">${followUpLabel}</td>
      </tr>
      ${data.message ? `<tr>
        <td style="padding:10px 0;border-top:1px solid #E8DFD3;color:#8C7567;vertical-align:top;">Mesaj</td>
        <td style="padding:10px 0;border-top:1px solid #E8DFD3;color:#3D2F25;white-space:pre-wrap;">${data.message}</td>
      </tr>` : ''}
      <tr>
        <td style="padding:10px 0;border-top:1px solid #E8DFD3;color:#8C7567;vertical-align:top;">Marketing</td>
        <td style="padding:10px 0;border-top:1px solid #E8DFD3;color:#3D2F25;">${data.marketingOptIn ? 'Da, a optat' : 'Nu'}</td>
      </tr>
      <tr>
        <td style="padding:10px 0;border-top:1px solid #E8DFD3;color:#8C7567;vertical-align:top;">Primit la</td>
        <td style="padding:10px 0;border-top:1px solid #E8DFD3;color:#3D2F25;">${new Date(data.timestamp).toLocaleString('ro-RO', { timeZone: 'Europe/Bucharest' })}</td>
      </tr>
    </table>
  </td></tr>

  <!-- Action buttons -->
  <tr><td style="padding:0 32px 24px;">
    <table cellpadding="0" cellspacing="0">
      <tr>
        <td style="padding-right:12px;">
          <a href="mailto:${data.email}?subject=${encodeURIComponent(`Re: colaborare AERA — ${brandLabel}`)}" style="display:inline-block;padding:10px 20px;background:#5B4638;color:#FBF7F0;font-family:Tahoma,Verdana,Arial,sans-serif;font-size:13px;font-weight:500;text-transform:uppercase;letter-spacing:0.08em;text-decoration:none;border-radius:6px;">R&#258;spunde</a>
        </td>
        ${waLink ? `<td style="padding-right:12px;">
          <a href="${waLink}" style="display:inline-block;padding:10px 20px;background:transparent;color:#5B4638;font-family:Tahoma,Verdana,Arial,sans-serif;font-size:13px;font-weight:500;text-transform:uppercase;letter-spacing:0.08em;text-decoration:none;border-radius:6px;border:1px solid #5B4638;">WhatsApp</a>
        </td>` : ''}
      </tr>
    </table>
  </td></tr>

  <!-- Audit footer -->
  <tr><td style="padding:16px 32px;border-top:1px solid #E8DFD3;font-size:11px;color:#8C7567;">
    Audit: ${data.timestamp} &middot; IP hash: ${data.ipHashed.slice(0, 12)}... &middot; GDPR: ${data.gdprVersion}
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`
}

export function buildColaborareNotificationSubject(name: string, brand: string): string {
  const cfg = colaborareConfigs[brand]
  const brandLabel = cfg?.name ?? brand
  return `Colaborare B2B: ${name} (${brandLabel})`
}
