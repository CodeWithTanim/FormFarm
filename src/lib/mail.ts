import nodemailer from 'nodemailer';

export interface SubmissionMetadata {
  ip?: string;
  country?: string;
  city?: string;
  userAgent?: string;
}

export async function sendSubmissionNotification(
  to: string,
  formName: string,
  data: Record<string, any>,
  meta?: SubmissionMetadata
): Promise<boolean> {
  const subject = `New submission on ${formName}`;

  const timestamp = new Date().toLocaleString('en-US', { timeZoneName: 'short' });

  // Plain Text Version
  let body = `You have received a new form submission on your website.\n\n`;
  body += `Form Name: ${formName}\n`;
  body += `Submitted at: ${timestamp}\n\n`;
  body += `--- Submission Details ---\n`;

  for (const [key, value] of Object.entries(data)) {
    const formattedVal = Array.isArray(value) ? value.join(', ') : String(value ?? '');
    body += `${key.charAt(0).toUpperCase() + key.slice(1)}: ${formattedVal}\n`;
  }

  if (meta) {
    body += `\n--- Client Telemetry & Origin ---\n`;
    if (meta.ip) body += `IP Address: ${meta.ip}\n`;
    if (meta.country) body += `Location: ${meta.city ? meta.city + ', ' : ''}${meta.country}\n`;
    if (meta.userAgent) body += `User Agent: ${meta.userAgent}\n`;
  }

  body += `\n---\n`;
  body += `Sent via FormFarm API\n`;

  // Rich HTML Version
  const rowsHtml = Object.entries(data)
    .map(([key, value]) => {
      const formattedVal = Array.isArray(value) ? value.join(', ') : String(value ?? '');
      return `
        <tr>
          <td style="padding: 10px 14px; font-weight: bold; color: #ff4c4c; border-bottom: 1px solid #222; text-transform: capitalize;">${key}</td>
          <td style="padding: 10px 14px; color: #ffffff; border-bottom: 1px solid #222; white-space: pre-wrap;">${formattedVal}</td>
        </tr>`;
    })
    .join('');

  const metaHtml = meta
    ? `
      <div style="margin-top: 25px; padding: 15px; background-color: #121215; border: 1px solid #222; border-radius: 8px;">
        <h4 style="margin: 0 0 10px 0; color: #ff4c4c; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Client Origin & Telemetry</h4>
        <div style="font-size: 13px; color: #aaa; line-height: 1.6;">
          ${meta.ip ? `<div><strong>IP Address:</strong> <span style="color: #fff;">${meta.ip}</span></div>` : ''}
          ${meta.country ? `<div><strong>Location:</strong> <span style="color: #fff;">${meta.city ? meta.city + ', ' : ''}${meta.country}</span></div>` : ''}
          ${meta.userAgent ? `<div style="margin-top: 5px; font-size: 11px; word-break: break-all;"><strong>User Agent:</strong> ${meta.userAgent}</div>` : ''}
        </div>
      </div>`
    : '';

  const htmlBody = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>${subject}</title>
      </head>
      <body style="margin: 0; padding: 20px; background-color: #050505; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #ffffff;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #0a0a0c; border: 1px solid #262626; border-radius: 12px; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
          
          <div style="border-bottom: 1px solid #ff0a0a; padding-bottom: 15px; margin-bottom: 20px;">
            <span style="font-size: 20px; font-weight: 800; color: #ff4c4c; letter-spacing: 2px;">FORMFARM</span>
            <span style="float: right; font-size: 12px; color: #888; line-height: 28px;">${timestamp}</span>
          </div>

          <h2 style="font-size: 20px; color: #ffffff; margin-top: 0;">New submission on <span style="color: #ff4c4c;">${formName}</span></h2>
          <p style="color: #aaa; font-size: 14px; margin-bottom: 20px;">You have received a new form packet on your neural endpoint:</p>

          <table style="width: 100%; border-collapse: collapse; background-color: #111114; border-radius: 8px; overflow: hidden; font-size: 14px;">
            ${rowsHtml}
          </table>

          ${metaHtml}

          <div style="margin-top: 30px; text-align: center; border-top: 1px solid #1a1a1a; padding-top: 15px; font-size: 12px; color: #666;">
            Dispatched via <strong>FormFarm API</strong> | Automated Notification
          </div>
        </div>
      </body>
    </html>
  `;

  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const port = Number(process.env.SMTP_PORT || 587);

  if (!host || !user || !pass) {
    // Graceful fallback when SMTP credentials are not configured
    console.log(`[FormFarm Mail Notification] Target: ${to} | Subject: ${subject}`);
    console.log(body);
    return true;
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: `"FormFarm" <${user}>`,
      to,
      subject,
      text: body,
      html: htmlBody,
    });
    return true;
  } catch (err) {
    console.error('Failed to send submission email:', err);
    return false;
  }
}
