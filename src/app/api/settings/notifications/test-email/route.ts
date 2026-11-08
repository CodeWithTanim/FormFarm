import { NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';
import { getUserNotificationSettings } from '@/lib/db';
import { sendTestEmail, UserEmailSettings } from '@/lib/mail';

export async function POST(request: Request) {
  const session = await getSessionUser();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const current = await getUserNotificationSettings(session.userId);

    const smtpPass = body.smtpPass || current.email.smtpPass;

    const emailSettings: UserEmailSettings = {
      enabled: true,
      smtpHost: body.smtpHost?.trim() || current.email.smtpHost,
      smtpPort: Number(body.smtpPort) || current.email.smtpPort || 587,
      smtpUser: body.smtpUser?.trim() || current.email.smtpUser,
      smtpPass: smtpPass || '',
      fromEmail: body.fromEmail?.trim() || current.email.fromEmail,
      toEmail: body.toEmail?.trim() || current.email.toEmail || session.email,
    };

    const result = await sendTestEmail(emailSettings, session.email);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || 'Failed to dispatch test email.' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Test email successfully dispatched to ${emailSettings.toEmail || session.email}! Check your inbox.`,
    });
  } catch (error: any) {
    console.error('Test email error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to send test email.' },
      { status: 500 }
    );
  }
}

