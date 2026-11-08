import { NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';
import { getUserNotificationSettings } from '@/lib/db';
import { sendTestTelegram } from '@/lib/telegram';

export async function POST(request: Request) {
  const session = await getSessionUser();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const current = await getUserNotificationSettings(session.userId);

    const botToken = body.botToken?.trim() || current.telegram.botToken;
    const chatId = body.chatId?.trim() || current.telegram.chatId;

    const result = await sendTestTelegram({ botToken, chatId });

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || 'Failed to dispatch test Telegram message.' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Test message sent to your Telegram successfully! Check your chat.',
    });
  } catch (error: any) {
    console.error('Test telegram error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to send test Telegram message.' },
      { status: 500 }
    );
  }
}

