import nodemailer from 'nodemailer';

export interface SubmissionMetadata {
  ip?: string;
  country?: string;
  city?: string;
  userAgent?: string;
  domain?: string;
  referer?: string;
}

export interface UserEmailSettings {
  enabled: boolean;
  smtpHost?: string;
  smtpPort?: number;
  smtpUser?: string;
  smtpPass?: string;
  fromEmail?: string;
  toEmail?: string;
}

/**
 * Dispatch a submission notification using the member's private SMTP credentials.
 * NEVER uses server-global credentials, guaranteeing sender isolation and security.
 */
export async function sendUserSubmissionNotification(
  settings: UserEmailSettings,
  formName: string,
  data: Record<string, any>,
  meta?: SubmissionMetadata,
  defaultToEmail?: string
): Promise<{ success: boolean; error?: string }> {
  if (!settings.enabled) {
    return { success: false, error: 'Email notifications are disabled by user.' };
  }

  const host = settings.smtpHost?.trim();
  const user = settings.smtpUser?.trim();
  const pass = settings.smtpPass?.trim();
  const port = Number(settings.smtpPort || 587);
  const targetEmail = settings.toEmail?.trim() || defaultToEmail || user;

  if (!host || !user || !pass || !targetEmail) {
    return {
      success: false,
      error: 'Incomplete user SMTP settings (host, user, password, or recipient missing).',
    };
  }

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
    if (meta.domain) body += `Source Domain: ${meta.domain}\n`;
    if (meta.referer) body += `Page URL: ${meta.referer}\n`;
    if (meta.ip) body += `IP Address: ${meta.ip}\n`;
    if (meta.country || meta.city) {
      body += `Location: ${meta.city ? meta.city + ', ' : ''}${meta.country || ''}\n`;
    }
    if (meta.userAgent) body += `User Agent: ${meta.userAgent}\n`;
  }

  body += `\n---\n`;
  body += `Sent via FormFarm (Your Custom SMTP Configuration)\n`;

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
          ${meta.domain ? `<div><strong>Source Domain:</strong> <span style="color: #fff;">${meta.domain}</span></div>` : ''}
          ${meta.referer ? `<div><strong>Page URL:</strong> <span style="color: #fff;">${meta.referer}</span></div>` : ''}
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
            Dispatched via <strong>FormFarm</strong> using your custom SMTP endpoint
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
    });

    const fromAddress = settings.fromEmail?.trim() || `"${formName} Alerts" <${user}>`;

    const info = await transporter.sendMail({
      from: fromAddress,
      replyTo: fromAddress,
      to: targetEmail,
      subject,
      text: body,
      html: htmlBody,
    });

    console.log(`[User SMTP Success] Dispatched email to ${targetEmail} (MessageId: ${info.messageId})`);
    return { success: true };
  } catch (err: any) {
    console.error(`[User SMTP Error] Failed to send email to ${targetEmail}:`, err);
    return {
      success: false,
      error: err?.message || 'Failed to dispatch email via member SMTP.',
    };
  }
}

/**
 * Dispatch a test email to verify member's custom SMTP configuration
 */
export async function sendTestEmail(
  settings: UserEmailSettings,
  defaultToEmail?: string
): Promise<{ success: boolean; error?: string }> {
  const host = settings.smtpHost?.trim();
  const user = settings.smtpUser?.trim();
  const pass = settings.smtpPass?.trim();
  const port = Number(settings.smtpPort || 587);
  const targetEmail = settings.toEmail?.trim() || defaultToEmail || user;

  if (!host) {
    return { success: false, error: 'SMTP Host is required (e.g. smtp.gmail.com).' };
  }
  if (!user) {
    return { success: false, error: 'SMTP Username / Email is required.' };
  }
  if (!pass) {
    return { success: false, error: 'SMTP Password or App Password is required.' };
  }
  if (!targetEmail) {
    return { success: false, error: 'Recipient email address is required.' };
  }

  const subject = `FormFarm — SMTP Connection Test`;
  const timestamp = new Date().toLocaleString();

  const textBody =
    `Hello!\n\n` +
    `Your custom SMTP credentials have been successfully connected to FormFarm.\n` +
    `From now on, you will receive all incoming form submissions through your own email relay.\n\n` +
    `Timestamp: ${timestamp}\n` +
    `Target: ${targetEmail}\n` +
    `Host: ${host}:${port}\n\n` +
    `FormFarm Form Ingestion System\n`;

  const htmlBody = `
    <!DOCTYPE html>
    <html>
      <body style="margin: 0; padding: 25px; background-color: #050505; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #ffffff;">
        <div style="max-width: 560px; margin: 0 auto; background-color: #0d0d10; border: 1px solid #262626; border-radius: 12px; padding: 28px;">
          <h2 style="color: #ff4c4c; margin-top: 0; font-size: 22px;">✅ SMTP Connection Verified!</h2>
          <p style="color: #ddd; font-size: 15px; line-height: 1.6;">
            Your custom SMTP settings on <strong>FormFarm</strong> are working perfectly.
          </p>
          <div style="background-color: #151518; padding: 15px; border-radius: 8px; border: 1px solid #222; font-size: 13px; color: #aaa; margin: 20px 0;">
            <div><strong>SMTP Host:</strong> <span style="color: #fff;">${host}:${port}</span></div>
            <div><strong>Authenticated User:</strong> <span style="color: #fff;">${user}</span></div>
            <div><strong>Recipient:</strong> <span style="color: #fff;">${targetEmail}</span></div>
            <div><strong>Verified:</strong> <span style="color: #fff;">${timestamp}</span></div>
          </div>
          <p style="color: #888; font-size: 12px; margin-bottom: 0;">
            Dispatched via FormFarm Member Notification Engine
          </p>
        </div>
      </body>
    </html>
  `;

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
    });

    // Verify SMTP connection handshake first
    await transporter.verify();

    const fromAddress = settings.fromEmail?.trim() || `"FormFarm Test" <${user}>`;

    await transporter.sendMail({
      from: fromAddress,
      to: targetEmail,
      subject,
      text: textBody,
      html: htmlBody,
    });

    return { success: true };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || 'SMTP authentication failed. Check your host, port, username, and password.',
    };
  }
}
