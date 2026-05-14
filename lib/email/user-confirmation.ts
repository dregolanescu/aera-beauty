/**
 * HTML email template: confirmation → user
 * Warm, short, editorial. AERA palette + Georgia/Helvetica fallback.
 */

export function buildUserConfirmationHtml(name: string): string {
  const firstName = name.split(/\s+/)[0]

  return `<!DOCTYPE html>
<html lang="ro">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F5EFE7;font-family:Tahoma,Verdana,Arial,sans-serif;color:#5B4638;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F5EFE7;padding:32px 16px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#FBF7F0;border-radius:12px;overflow:hidden;max-width:600px;width:100%;">

  <!-- Header with logo -->
  <tr><td style="padding:36px 32px 20px;text-align:center;">
    <img src="https://aerabeauty.ro/logo/aera-beauty-mocha.png" alt="AERA Beauty" width="180" style="display:inline-block;width:180px;height:auto;border:0;outline:none;text-decoration:none;">
    <p style="margin:14px 0 0;font-family:Georgia,serif;font-size:15px;font-style:italic;color:#8C7567;">For the love of Beauty.</p>
  </td></tr>

  <!-- Divider -->
  <tr><td style="padding:0 32px;"><div style="border-top:1px solid #E8DFD3;"></div></td></tr>

  <!-- Body -->
  <tr><td style="padding:28px 32px;">
    <p style="margin:0 0 16px;font-size:16px;line-height:1.6;">
      Mulțumim, ${firstName}. Am primit cererea ta și revenim în maximum 48 de ore lucrătoare cu informații despre produs, preț și disponibilitate.
    </p>
    <p style="margin:0 0 24px;font-size:16px;line-height:1.6;">
      Între timp, poți descoperi colecțiile AERA.
    </p>

    <!-- CTA -->
    <table cellpadding="0" cellspacing="0" style="margin:0 auto;">
      <tr><td>
        <a href="https://aerabeauty.ro/produse" style="display:inline-block;padding:14px 32px;background:#5B4638;color:#FBF7F0;font-family:Tahoma,Verdana,Arial,sans-serif;font-size:13px;font-weight:500;text-transform:uppercase;letter-spacing:0.10em;text-decoration:none;border-radius:14px;">Descoper&#258; colec&#538;iile</a>
      </td></tr>
    </table>
  </td></tr>

  <!-- Contact -->
  <tr><td style="padding:0 32px 28px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;color:#8C7567;">
      <tr><td style="padding:16px 0 0;border-top:1px solid #E8DFD3;">
        <a href="mailto:office@aerabeauty.ro" style="color:#5B4638;text-decoration:none;">office@aerabeauty.ro</a>
        &nbsp;&middot;&nbsp;
        <a href="tel:+40747306107" style="color:#5B4638;text-decoration:none;">+40 747 306 107</a>
        &nbsp;&middot;&nbsp;
        <a href="https://wa.me/40747306107" style="color:#5B4638;text-decoration:none;">WhatsApp</a>
      </td></tr>
    </table>
  </td></tr>

  <!-- GDPR footer -->
  <tr><td style="padding:16px 32px;background:#F5EFE7;font-size:11px;color:#8C7567;line-height:1.5;">
    Primești acest email deoarece ai completat formularul de precomandă pe aerabeauty.ro.
    Datele tale sunt prelucrate conform
    <a href="https://aerabeauty.ro/politica-confidentialitate" style="color:#5B4638;">Politicii de confidențialitate</a>.
    <br>© 2026 SC AERA SCENTT SRL
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`
}
