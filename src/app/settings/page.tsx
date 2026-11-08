'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface UserEmailSettings {
  enabled: boolean;
  smtpHost: string;
  smtpPort: number;
  smtpUser: string;
  smtpPass: string;
  fromEmail: string;
  toEmail: string;
}

interface UserTelegramSettings {
  enabled: boolean;
  botToken: string;
  chatId: string;
}

export default function SettingsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'email' | 'telegram'>('email');
  const [loading, setLoading] = useState(true);

  // Email form state
  const [emailSettings, setEmailSettings] = useState<UserEmailSettings>({
    enabled: false,
    smtpHost: '',
    smtpPort: 587,
    smtpUser: '',
    smtpPass: '',
    fromEmail: '',
    toEmail: '',
  });
  const [showSmtpPass, setShowSmtpPass] = useState(false);

  // Telegram form state
  const [telegramSettings, setTelegramSettings] = useState<UserTelegramSettings>({
    enabled: false,
    botToken: '',
    chatId: '',
  });

  // Action states
  const [savingEmail, setSavingEmail] = useState(false);
  const [savingTelegram, setSavingTelegram] = useState(false);
  const [testingEmail, setTestingEmail] = useState(false);
  const [testingTelegram, setTestingTelegram] = useState(false);

  // Notifications feedback
  const [feedback, setFeedback] = useState<{ type: 'success' | 'danger'; message: string } | null>(null);

  // Fetch current user notification settings
  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch('/api/settings/notifications');
        if (res.status === 401) {
          router.push('/login');
          return;
        }
        if (res.ok) {
          const data = await res.json();
          if (data.settings) {
            if (data.settings.email) {
              setEmailSettings((prev) => ({
                ...prev,
                ...data.settings.email,
                smtpPort: data.settings.email.smtpPort || 587,
              }));
            }
            if (data.settings.telegram) {
              setTelegramSettings((prev) => ({
                ...prev,
                ...data.settings.telegram,
              }));
            }
          }
        }
      } catch (err) {
        console.error('Failed to load settings:', err);
      } finally {
        setLoading(false);
      }
    }

    loadSettings();
  }, [router]);

  const showMessage = (type: 'success' | 'danger', message: string) => {
    setFeedback({ type, message });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Save Email Settings
  const handleSaveEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingEmail(true);
    setFeedback(null);

    try {
      const res = await fetch('/api/settings/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailSettings }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        showMessage('success', 'Email notification settings saved successfully.');
      } else {
        showMessage('danger', data.error || 'Failed to save email settings.');
      }
    } catch {
      showMessage('danger', 'An error occurred while saving email settings.');
    } finally {
      setSavingEmail(false);
    }
  };

  // Test Email Connection
  const handleTestEmail = async () => {
    setTestingEmail(true);
    setFeedback(null);

    try {
      const res = await fetch('/api/settings/notifications/test-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailSettings),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        showMessage('success', data.message || 'Test email dispatched successfully!');
      } else {
        showMessage('danger', data.error || 'Test email delivery failed.');
      }
    } catch (err: any) {
      showMessage('danger', err?.message || 'Network error while testing SMTP connection.');
    } finally {
      setTestingEmail(false);
    }
  };

  // Save Telegram Settings
  const handleSaveTelegram = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingTelegram(true);
    setFeedback(null);

    try {
      const res = await fetch('/api/settings/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ telegram: telegramSettings }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        showMessage('success', 'Telegram bot settings saved successfully.');
      } else {
        showMessage('danger', data.error || 'Failed to save Telegram settings.');
      }
    } catch {
      showMessage('danger', 'An error occurred while saving Telegram settings.');
    } finally {
      setSavingTelegram(false);
    }
  };

  // Test Telegram Connection
  const handleTestTelegram = async () => {
    setTestingTelegram(true);
    setFeedback(null);

    try {
      const res = await fetch('/api/settings/notifications/test-telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(telegramSettings),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        showMessage('success', data.message || 'Telegram test message delivered successfully!');
      } else {
        showMessage('danger', data.error || 'Telegram test failed.');
      }
    } catch (err: any) {
      showMessage('danger', err?.message || 'Network error while contacting Telegram API.');
    } finally {
      setTestingTelegram(false);
    }
  };

  if (loading) {
    return (
      <div className="container text-center" style={{ padding: '6rem 1rem' }}>
        <div style={{ color: 'var(--accent-red)', fontSize: '2.5rem', marginBottom: '1rem' }}>
          <i className="bi bi-cpu animate-spin"></i>
        </div>
        <p style={{ opacity: 0.6 }}>Loading notification security settings...</p>
      </div>
    );
  }

  return (
    <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: '2.5rem', paddingBottom: '4rem' }}>
      {/* Header */}
      <div className="animate-fade-in" style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', marginBottom: '0.4rem' }}>
              PANEL <span style={{ color: 'var(--accent-red)' }}>SETTINGS</span>
            </h1>
            <p style={{ opacity: 0.7, margin: 0, fontSize: '1rem' }}>
              Manage your private notifications. All transmissions are isolated strictly to your account.
            </p>
          </div>
          <Link href="/dashboard" className="btn btn-outline-light btn-sm">
            <i className="bi bi-arrow-left" style={{ marginRight: '0.4rem' }}></i> Back to Dashboard
          </Link>
        </div>
      </div>

      {/* Global Feedback Alert */}
      {feedback && (
        <div className={`alert alert-${feedback.type} animate-fade-in`} style={{ marginBottom: '2rem' }}>
          <i
            className={`bi ${feedback.type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill'}`}
            style={{ marginRight: '0.75rem', fontSize: '1.2rem' }}
          ></i>
          <div>{feedback.message}</div>
        </div>
      )}

      {/* Tab Navigation */}
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          marginBottom: '2rem',
        }}
      >
        <button
          onClick={() => setActiveTab('email')}
          style={{
            background: 'none',
            border: 'none',
            color: activeTab === 'email' ? 'var(--header-red)' : 'rgba(255, 255, 255, 0.6)',
            borderBottom: activeTab === 'email' ? '3px solid var(--accent-red)' : '3px solid transparent',
            padding: '0.75rem 1.25rem',
            fontWeight: 700,
            fontSize: '1rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'all 0.2s',
          }}
        >
          <i className="bi bi-envelope-at"></i>
          <span>Email Relay (SMTP)</span>
          {emailSettings.enabled && (
            <span
              style={{
                fontSize: '0.65rem',
                backgroundColor: 'rgba(16, 185, 129, 0.2)',
                color: '#10b981',
                padding: '2px 8px',
                borderRadius: '10px',
                border: '1px solid rgba(16, 185, 129, 0.4)',
                fontWeight: 600,
              }}
            >
              Active
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('telegram')}
          style={{
            background: 'none',
            border: 'none',
            color: activeTab === 'telegram' ? 'var(--header-red)' : 'rgba(255, 255, 255, 0.6)',
            borderBottom: activeTab === 'telegram' ? '3px solid var(--accent-red)' : '3px solid transparent',
            padding: '0.75rem 1.25rem',
            fontWeight: 700,
            fontSize: '1rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'all 0.2s',
          }}
        >
          <i className="bi bi-telegram"></i>
          <span>Telegram Bot</span>
          {telegramSettings.enabled && (
            <span
              style={{
                fontSize: '0.65rem',
                backgroundColor: 'rgba(16, 185, 129, 0.2)',
                color: '#10b981',
                padding: '2px 8px',
                borderRadius: '10px',
                border: '1px solid rgba(16, 185, 129, 0.4)',
                fontWeight: 600,
              }}
            >
              Active
            </span>
          )}
        </button>
      </div>

      {/* Tab 1: Email Configuration */}
      {activeTab === 'email' && (
        <div className="animate-fade-in">
          <div
            className="card glass-card"
            style={{
              padding: '2rem',
              marginBottom: '2rem',
              border: emailSettings.enabled
                ? '1px solid rgba(255, 10, 10, 0.3)'
                : '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            {/* Header with Switch */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                paddingBottom: '1.25rem',
                marginBottom: '1.5rem',
                flexWrap: 'wrap',
                gap: '1rem',
              }}
            >
              <div>
                <h3 style={{ margin: 0, fontSize: '1.3rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <i className="bi bi-envelope-shield" style={{ color: 'var(--header-red)' }}></i>
                  Custom Member SMTP Relay
                </h3>
                <div style={{ fontSize: '0.85rem', opacity: 0.6, marginTop: '0.25rem' }}>
                  Form submissions are delivered directly using your private SMTP credentials. No central server relays.
                </div>
              </div>

              {/* Enable / Disable Toggle */}
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  cursor: 'pointer',
                  userSelect: 'none',
                }}
              >
                <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>
                  {emailSettings.enabled ? 'Notifications Enabled' : 'Notifications Disabled'}
                </span>
                <input
                  type="checkbox"
                  checked={emailSettings.enabled}
                  onChange={(e) => setEmailSettings({ ...emailSettings, enabled: e.target.checked })}
                  style={{
                    width: '44px',
                    height: '24px',
                    accentColor: 'var(--accent-red)',
                    cursor: 'pointer',
                  }}
                />
              </label>
            </div>

            {/* Email Form */}
            <form onSubmit={handleSaveEmail}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div>
                  <label className="form-label">
                    SMTP Host <span style={{ color: 'var(--accent-red)' }}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. smtp.gmail.com"
                    value={emailSettings.smtpHost}
                    onChange={(e) => setEmailSettings({ ...emailSettings, smtpHost: e.target.value })}
                    required={emailSettings.enabled}
                  />
                  <div className="form-text">e.g. smtp.gmail.com, smtp.office365.com, or your domain SMTP.</div>
                </div>

                <div>
                  <label className="form-label">
                    SMTP Port <span style={{ color: 'var(--accent-red)' }}>*</span>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="587"
                    value={emailSettings.smtpPort || ''}
                    onChange={(e) => setEmailSettings({ ...emailSettings, smtpPort: Number(e.target.value) })}
                    required={emailSettings.enabled}
                  />
                  <div className="form-text">Use 587 for TLS or 465 for SSL.</div>
                </div>

                <div>
                  <label className="form-label">
                    SMTP Username / Email <span style={{ color: 'var(--accent-red)' }}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. yourname@gmail.com"
                    value={emailSettings.smtpUser}
                    onChange={(e) => setEmailSettings({ ...emailSettings, smtpUser: e.target.value })}
                    required={emailSettings.enabled}
                  />
                  <div className="form-text">The authenticated username or full email address.</div>
                </div>

                <div>
                  <label className="form-label">
                    SMTP Password / App Password <span style={{ color: 'var(--accent-red)' }}>*</span>
                  </label>
                  <div className="input-group">
                    <input
                      type={showSmtpPass ? 'text' : 'password'}
                      className="form-control"
                      placeholder="Enter SMTP password or App Password"
                      value={emailSettings.smtpPass}
                      onChange={(e) => setEmailSettings({ ...emailSettings, smtpPass: e.target.value })}
                      required={emailSettings.enabled}
                    />
                    <button
                      type="button"
                      className="btn btn-outline-light"
                      onClick={() => setShowSmtpPass(!showSmtpPass)}
                      title={showSmtpPass ? 'Hide password' : 'Show password'}
                    >
                      <i className={`bi ${showSmtpPass ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                    </button>
                  </div>
                  <div className="form-text">For Gmail, use a 16-character Google App Password.</div>
                </div>

                <div>
                  <label className="form-label">Sender &quot;From&quot; Header (Optional)</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder='e.g. "My Website" &lt;you@gmail.com&gt;'
                    value={emailSettings.fromEmail}
                    onChange={(e) => setEmailSettings({ ...emailSettings, fromEmail: e.target.value })}
                  />
                  <div className="form-text">Leaves default to your SMTP email if left blank.</div>
                </div>

                <div>
                  <label className="form-label">Send Submissions To (Recipient Email)</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="e.g. notify@yourdomain.com"
                    value={emailSettings.toEmail}
                    onChange={(e) => setEmailSettings({ ...emailSettings, toEmail: e.target.value })}
                  />
                  <div className="form-text">Destination email for all form submissions. Defaults to your account email.</div>
                </div>
              </div>

              {/* Form Actions */}
              <div
                style={{
                  display: 'flex',
                  gap: '1rem',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  paddingTop: '1.5rem',
                }}
              >
                <button type="submit" className="btn btn-primary" disabled={savingEmail}>
                  {savingEmail ? (
                    <>
                      <i className="bi bi-arrow-repeat animate-spin" style={{ marginRight: '0.5rem' }}></i>
                      Saving...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-check2-circle" style={{ marginRight: '0.5rem' }}></i>
                      Save Email Settings
                    </>
                  )}
                </button>

                <button
                  type="button"
                  className="btn btn-outline-light"
                  onClick={handleTestEmail}
                  disabled={testingEmail || !emailSettings.smtpHost || !emailSettings.smtpUser || !emailSettings.smtpPass}
                  title="Dispatch a verification test email using these credentials"
                >
                  {testingEmail ? (
                    <>
                      <i className="bi bi-arrow-repeat animate-spin" style={{ marginRight: '0.5rem' }}></i>
                      Testing Connection...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-send" style={{ marginRight: '0.5rem' }}></i>
                      Send Test Email
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Quick Setup Instructions Card */}
          <div className="card glass-card" style={{ padding: '1.5rem' }}>
            <h4 style={{ fontSize: '1rem', marginBottom: '0.75rem', color: 'var(--header-red)' }}>
              <i className="bi bi-lightbulb" style={{ marginRight: '0.5rem' }}></i>
              Using Gmail? How to generate an App Password in 60 seconds:
            </h4>
            <ol style={{ paddingLeft: '1.25rem', opacity: 0.8, fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
              <li>Visit your <a href="https://myaccount.google.com/security" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-red)', textDecoration: 'underline' }}>Google Account Security</a> settings.</li>
              <li>Ensure <strong>2-Step Verification</strong> is enabled on your account.</li>
              <li>Under &quot;2-Step Verification&quot;, scroll down and select <strong>App passwords</strong>.</li>
              <li>Create a new app name (e.g., <em>FormFarm</em>) and copy the generated 16-letter password.</li>
              <li>Paste that 16-letter password into the <strong>SMTP Password</strong> field above.</li>
            </ol>
          </div>
        </div>
      )}

      {/* Tab 2: Telegram Bot Configuration */}
      {activeTab === 'telegram' && (
        <div className="animate-fade-in">
          <div
            className="card glass-card"
            style={{
              padding: '2rem',
              marginBottom: '2rem',
              border: telegramSettings.enabled
                ? '1px solid rgba(255, 10, 10, 0.3)'
                : '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            {/* Header with Switch */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                paddingBottom: '1.25rem',
                marginBottom: '1.5rem',
                flexWrap: 'wrap',
                gap: '1rem',
              }}
            >
              <div>
                <h3 style={{ margin: 0, fontSize: '1.3rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <i className="bi bi-telegram" style={{ color: '#0088cc' }}></i>
                  Telegram Push Notification Bot
                </h3>
                <div style={{ fontSize: '0.85rem', opacity: 0.6, marginTop: '0.25rem' }}>
                  Receive instant Telegram messages with form data, origin location, and IP whenever someone submits.
                </div>
              </div>

              {/* Enable / Disable Toggle */}
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  cursor: 'pointer',
                  userSelect: 'none',
                }}
              >
                <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>
                  {telegramSettings.enabled ? 'Telegram Alerts Enabled' : 'Telegram Alerts Disabled'}
                </span>
                <input
                  type="checkbox"
                  checked={telegramSettings.enabled}
                  onChange={(e) => setTelegramSettings({ ...telegramSettings, enabled: e.target.checked })}
                  style={{
                    width: '44px',
                    height: '24px',
                    accentColor: '#0088cc',
                    cursor: 'pointer',
                  }}
                />
              </label>
            </div>

            {/* Telegram Form */}
            <form onSubmit={handleSaveTelegram}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div>
                  <label className="form-label">
                    Telegram Bot Token <span style={{ color: 'var(--accent-red)' }}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. 123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ"
                    value={telegramSettings.botToken}
                    onChange={(e) => setTelegramSettings({ ...telegramSettings, botToken: e.target.value })}
                    required={telegramSettings.enabled}
                  />
                  <div className="form-text">Obtained directly from <strong>@BotFather</strong> on Telegram.</div>
                </div>

                <div>
                  <label className="form-label">
                    Your Telegram Chat ID <span style={{ color: 'var(--accent-red)' }}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. 987654321"
                    value={telegramSettings.chatId}
                    onChange={(e) => setTelegramSettings({ ...telegramSettings, chatId: e.target.value })}
                    required={telegramSettings.enabled}
                  />
                  <div className="form-text">Your personal numeric Telegram user ID or group chat ID.</div>
                </div>
              </div>

              {/* Form Actions */}
              <div
                style={{
                  display: 'flex',
                  gap: '1rem',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  paddingTop: '1.5rem',
                }}
              >
                <button type="submit" className="btn btn-primary" disabled={savingTelegram}>
                  {savingTelegram ? (
                    <>
                      <i className="bi bi-arrow-repeat animate-spin" style={{ marginRight: '0.5rem' }}></i>
                      Saving...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-check2-circle" style={{ marginRight: '0.5rem' }}></i>
                      Save Telegram Settings
                    </>
                  )}
                </button>

                <button
                  type="button"
                  className="btn btn-outline-light"
                  onClick={handleTestTelegram}
                  disabled={testingTelegram || !telegramSettings.botToken || !telegramSettings.chatId}
                  title="Send a sample test notification to your Telegram"
                >
                  {testingTelegram ? (
                    <>
                      <i className="bi bi-arrow-repeat animate-spin" style={{ marginRight: '0.5rem' }}></i>
                      Sending Test...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-send" style={{ marginRight: '0.5rem' }}></i>
                      Send Test Telegram
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Quick Setup Instructions Card */}
          <div className="card glass-card" style={{ padding: '1.5rem' }}>
            <h4 style={{ fontSize: '1rem', marginBottom: '0.75rem', color: '#0088cc' }}>
              <i className="bi bi-info-circle" style={{ marginRight: '0.5rem' }}></i>
              How to setup your Telegram Bot in 4 easy steps:
            </h4>
            <ol style={{ paddingLeft: '1.25rem', opacity: 0.8, fontSize: '0.9rem', lineHeight: 1.8, margin: 0 }}>
              <li>
                Open Telegram, search for <strong>@BotFather</strong>, and press <strong>Start</strong>.
              </li>
              <li>
                Send <code>/newbot</code>, choose a friendly display name and a unique username ending in <code>_bot</code>.
              </li>
              <li>
                Copy the <strong>HTTP API Token</strong> provided by BotFather and paste it into <strong>Telegram Bot Token</strong> above.
              </li>
              <li>
                Open your new bot in Telegram and press <strong>Start</strong> (crucial, so the bot has permission to message you!).
              </li>
              <li>
                To find your numeric Chat ID, message <strong>@userinfobot</strong> or <strong>@GetIDsBot</strong> on Telegram and copy your ID into <strong>Your Telegram Chat ID</strong> above.
              </li>
              <li>
                Click <strong>Send Test Telegram</strong> to verify your connection!
              </li>
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}

