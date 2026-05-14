/**
 * HTML email template: lead notification → office@aerabeauty.ro
 * Inline styles only (email client compatibility).
 * Palette: cream-100 outer, ivory-50 container, cocoa-700 text.
 * Font fallback: Georgia (serif), Helvetica (sans).
 */

type LeadData = {
  name: string
  email: string
  phone: string
  city: string
  brand: string
  product: string
  message: string
  marketingOptIn: boolean
  timestamp: string
  ipHashed: string
  gdprVersion: string
  leadId?: string
}

const brandLabels: Record<string, string> = {
  'aqua-mineral': 'Aqua Mineral',
  'oliere-paris': 'Oliere Paris',
  'redefine-matcha': 'Redefine Matcha',
  toate: 'Toate brandurile',
}

export function buildLeadNotificationHtml(data: LeadData): string {
  const brandLabel = brandLabels[data.brand] ?? data.brand
  const waLink = data.phone
    ? `https://wa.me/${data.phone.replace(/\D/g, '')}?text=${encodeURIComponent('Salut, ne-ai contactat prin aerabeauty.ro. Revenim cu detalii.')}`
    : ''

  return `<!DOCTYPE html>
<html lang="ro">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F5EFE7;font-family:Helvetica,Arial,sans-serif;color:#5B4638;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F5EFE7;padding:32px 16px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#FBF7F0;border-radius:12px;overflow:hidden;max-width:600px;width:100%;">

  <!-- Header -->
  <tr><td style="padding:28px 32px 20px;border-bottom:1px solid #E8DFD3;">
    <p style="margin:0 0 4px;font-size:11px;font-weight:500;text-transform:uppercase;letter-spacing:0.14em;color:#8C7567;">Lead nou</p>
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
        <td style="padding:10px 0;border-top:1px solid #E8DFD3;color:#8C7567;width:140px;vertical-align:top;">Brand</td>
        <td style="padding:10px 0;border-top:1px solid #E8DFD3;color:#3D2F25;font-weight:500;">${brandLabel}</td>
      </tr>
      ${data.product ? `<tr>
        <td style="padding:10px 0;border-top:1px solid #E8DFD3;color:#8C7567;vertical-align:top;">Produs / gamă</td>
        <td style="padding:10px 0;border-top:1px solid #E8DFD3;color:#3D2F25;">${data.product}</td>
      </tr>` : ''}
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
          <a href="mailto:${data.email}?subject=${encodeURIComponent(`Re: precomanda ta AERA — ${brandLabel}`)}" style="display:inline-block;padding:10px 20px;background:#5B4638;color:#FBF7F0;font-size:13px;font-weight:500;text-transform:uppercase;letter-spacing:0.08em;text-decoration:none;border-radius:6px;">Răspunde</a>
        </td>
        ${waLink ? `<td style="padding-right:12px;">
          <a href="${waLink}" style="display:inline-block;padding:10px 20px;background:transparent;color:#5B4638;font-size:13px;font-weight:500;text-transform:uppercase;letter-spacing:0.08em;text-decoration:none;border-radius:6px;border:1px solid #5B4638;">WhatsApp</a>
        </td>` : ''}
      </tr>
    </table>
  </td></tr>

  <!-- Audit footer -->
  <tr><td style="padding:16px 32px;border-top:1px solid #E8DFD3;font-size:11px;color:#8C7567;">
    Audit: ${data.timestamp} · IP hash: ${data.ipHashed.slice(0, 12)}... · GDPR: ${data.gdprVersion}
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`
}

export function buildLeadNotificationSubject(name: string, brand: string): string {
  const brandLabel = brandLabels[brand] ?? brand
  // ASCII-safe separators. Em-dash and middle-dot cause encoding glitches
  // (â€" and Â·) in some mail clients (Microsoft Outlook) when the SMTP
  // Subject header isn't MIME-encoded as quoted-printable / base64.
  return `Lead nou: ${name} (${brandLabel})`
}
