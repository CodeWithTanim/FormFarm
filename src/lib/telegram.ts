export interface TelegramSubmissionMetadata {
  ip?: string;
  country?: string;
  city?: string;
  userAgent?: string;
  domain?: string;
  referer?: string;
}

export interface TelegramConfig {
  botToken?: string;
  chatId?: string;
}

/**
 * Escape HTML special characters for Telegram HTML parse_mode
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Dispatch a form submission notification to the user's private Telegram bot and chat
 */
export async function sendTelegramNotification(
  config: TelegramConfig,
  formName: string,
  data: Record<string, any>,
  meta?: TelegramSubmissionMetadata
): Promise<{ success: boolean; error?: string }> {
  // Use member's bot token, or fallback to platform token if provided
  const botToken = config.botToken?.trim() || process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = config.chatId?.trim();

  if (!botToken || !chatId) {
    return {
      success: false,
      error: 'Telegram Bot Token or Chat ID is missing.',
    };
  }

  const timestamp = new Date().toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
  });

  // Construct styled Telegram HTML message
  let message = `🚜 <b>FormFarm — New Form Submission</b>\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `📁 <b>Form Node:</b> <code>${escapeHtml(formName)}</code>\n`;
  if (meta?.domain) {
    message += `🌐 <b>Source Domain:</b> <code>${escapeHtml(meta.domain)}</code>\n`;
  }
  if (meta?.referer && meta.referer !== meta.domain) {
    message += `🔗 <b>Page URL:</b> <code>${escapeHtml(meta.referer)}</code>\n`;
  }
  message += `⏱ <b>Timestamp:</b> ${escapeHtml(timestamp)}\n\n`;

  message += `📝 <b>Data Packet:</b>\n`;
  const entries = Object.entries(data);
  if (entries.length === 0) {
    message += `<i>(No field payload received)</i>\n`;
  } else {
    for (const [key, value] of entries) {
      const formattedVal = Array.isArray(value) ? value.join(', ') : String(value ?? '');
      // Truncate overly long values for Telegram message safety
      const cleanVal = formattedVal.length > 500 ? formattedVal.substring(0, 497) + '...' : formattedVal;
      message += `• <b>${escapeHtml(key)}:</b> ${escapeHtml(cleanVal)}\n`;
    }
  }

  if (meta) {
    message += `\n🌐 <b>Client Origin & Telemetry:</b>\n`;
    if (meta.domain) {
      message += `🌐 <b>Origin Domain:</b> <code>${escapeHtml(meta.domain)}</code>\n`;
    }
    if (meta.country || meta.city) {
      const loc = [meta.city, meta.country].filter(Boolean).join(', ');
      message += `📍 <b>Location:</b> ${escapeHtml(loc)}\n`;
    }
    if (meta.ip) {
      message += `🖥 <b>IP Address:</b> <code>${escapeHtml(meta.ip)}</code>\n`;
    }
    if (meta.userAgent) {
      const shortUa = meta.userAgent.length > 100 ? meta.userAgent.substring(0, 97) + '...' : meta.userAgent;
      message += `📱 <b>Agent:</b> <code>${escapeHtml(shortUa)}</code>\n`;
    }
  }

  message += `━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `⚡ <i>Dispatched via FormFarm Neural Ingestion</i>`;

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
      signal: controller.signal,
    });
    clearTimeout(timer);

    const result = await res.json();
    if (!res.ok || !result.ok) {
      const errorMsg = result?.description || `HTTP ${res.status}`;
      console.error(`[Telegram Notification Error] Failed to send to chat ${chatId}:`, errorMsg);
      return { success: false, error: errorMsg };
    }

    console.log(`[Telegram Notification Success] Dispatched to chat ${chatId}`);
    return { success: true };
  } catch (err: any) {
    console.error(`[Telegram Notification Exception]`, err);
    return {
      success: false,
      error: err?.message || 'Connection timed out while contacting Telegram Bot API',
    };
  }
}

/**
 * Dispatch a test notification to verify the user's Telegram configuration
 */
export async function sendTestTelegram(
  config: TelegramConfig
): Promise<{ success: boolean; error?: string }> {
  const botToken = config.botToken?.trim() || process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = config.chatId?.trim();

  if (!botToken) {
    return {
      success: false,
      error: 'Please enter a valid Telegram Bot Token (from @BotFather).',
    };
  }

  if (!chatId) {
    return {
      success: false,
      error: 'Please enter your numeric Telegram Chat ID.',
    };
  }

  const timestamp = new Date().toLocaleString();
  const testMessage =
    `🚜 <b>FormFarm — Integration Test</b>\n` +
    `━━━━━━━━━━━━━━━━━━━━━━\n` +
    `✅ <b>Telegram Bot Link Established!</b>\n\n` +
    `Your Telegram notification channel is active and verified.\n` +
    `Whenever any visitor submits data to your FormFarm endpoints, you will instantly receive full transmission alerts right here!\n\n` +
    `⏱ <b>Verified at:</b> ${escapeHtml(timestamp)}\n` +
    `━━━━━━━━━━━━━━━━━━━━━━\n` +
    `🔒 <i>Private channel linked to your account only.</i>`;

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: testMessage,
        parse_mode: 'HTML',
      }),
      signal: controller.signal,
    });
    clearTimeout(timer);

    const result = await res.json();
    if (!res.ok || !result.ok) {
      const errorMsg = result?.description || `HTTP ${res.status}`;
      return {
        success: false,
        error: `Telegram Error: ${errorMsg}. Make sure you clicked 'Start' in your bot before testing!`,
      };
    }

    return { success: true };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || 'Unable to connect to Telegram API.',
    };
  }
}

