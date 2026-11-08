import { NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';
import { getUserNotificationSettings, updateUserNotificationSettings, UserNotificationSettings } from '@/lib/db';

export async function GET() {
  const session = await getSessionUser();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const settings = await getUserNotificationSettings(session.userId);

    // Return settings with password masked indicator for security
    return NextResponse.json({
      settings: {
        email: {
          ...settings.email,
          hasPassword: Boolean(settings.email?.smtpPass),
          // We return smtpPass so user can edit it, or keep existing
          smtpPass: settings.email?.smtpPass || '',
        },
        telegram: {
          ...settings.telegram,
          botToken: settings.telegram?.botToken || '',
          chatId: settings.telegram?.chatId || '',
        },
      },
    });
  } catch (error) {
    console.error('Error fetching notification settings:', error);
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getSessionUser();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { email, telegram } = body as Partial<UserNotificationSettings>;

    const current = await getUserNotificationSettings(session.userId);

    // Merge email settings, preserving password if not provided
    const newSmtpPass = email?.smtpPass !== undefined && email?.smtpPass !== ''
      ? email.smtpPass
      : current.email.smtpPass;

    const updatedSettings: UserNotificationSettings = {
      email: {
        enabled: Boolean(email?.enabled),
        smtpHost: email?.smtpHost?.trim() || '',
        smtpPort: Number(email?.smtpPort) || 587,
        smtpUser: email?.smtpUser?.trim() || '',
        smtpPass: newSmtpPass || '',
        fromEmail: email?.fromEmail?.trim() || '',
        toEmail: email?.toEmail?.trim() || '',
      },
      telegram: {
        enabled: Boolean(telegram?.enabled),
        botToken: telegram?.botToken?.trim() || '',
        chatId: telegram?.chatId?.trim() || '',
      },
    };

    await updateUserNotificationSettings(session.userId, updatedSettings);

    return NextResponse.json({
      success: true,
      message: 'Notification settings saved successfully.',
    });
  } catch (error) {
    console.error('Error updating notification settings:', error);
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}

