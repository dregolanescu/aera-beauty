/**
 * HTML email template: confirmation B2B → user
 * Warm, short, editorial. AERA palette + Tahoma stack.
 */

import { colaborareConfigs } from '@/content/colaborare-forms'

export function buildColaborareConfirmationHtml(
  name: string,
  brand: 'aqua-mineral' | 'oliere-paris' | 'redefine-matcha',
): string {
  const firstName = name.split(/\s+/)[0]
  const cfg = colaborareConfigs[brand]
  const brandLabel = cfg.name

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
      Mul&#355;umim, ${firstName}. Am primit cererea ta pentru o colaborare cu <strong>${brandLabel}</strong> &#537;i revenim &#238;n maximum 48 de ore lucr&#259;toare cu detalii despre gam&#259;, condi&#355;ii comerciale &#537;i pa&#537;ii urm&#259;tori.
    </p>
    <p style="margin:0 0 24px;font-size:16px;line-height:1.6;">
      &#206;ntre timp, po&#355;i descoperi colec&#355;iile AERA.
    </p>

    <!-- CTA -->
    <table cellpadding="0" cellspacing="0" style="margin:0 auto;">
      <tr><td>
        <a href="https://aerabeauty.ro/produse" style="display:inline-block;padding:14px 32px;background:#5B4638;color:#FBF7F0;font-family:Tahoma,Verdana,Arial,sans-serif;font-size:13px;font-weight:500;text-transform:uppercase;letter-spacing:0.10em;text-decoration:none;border-radius:14px;">Descoper&#259; colec&#539;iile</a>
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
    Prime&#537;ti acest email deoarece ai completat formularul de colaborare pe aerabeauty.ro.
    Datele tale sunt prelucrate conform
    <a href="https://aerabeauty.ro/politica-confidentialitate" style="color:#5B4638;">Politicii de confiden&#355;ialitate</a>.
    <br>&copy; 2026 SC AERA SCENTT SRL
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`
}
