import { NextRequest } from 'next/server';
import { Resend } from 'resend';
import {
  type ContactFormData,
  validateContactForm,
  isValidEmail,
} from '../../lib/contact';
import {
  getResendApiKey,
  getResendFromEmail,
  getContactRecipientEmail,
  hasEnv,
} from '../../lib/env';
import {
  successResponse,
  errorResponse,
  extractErrorMessage,
  healthResponse,
} from '../../lib/api-response';

// ─── メール本文の組み立て ───

function buildEmailBody(data: ContactFormData): string {
  return `
お問い合わせがありました。

【お名前】
${data.name}

【会社名】
${data.company}

【メールアドレス】
${data.email}

${data.phone ? `【電話番号】\n${data.phone}\n` : ''}
${data.service ? `【ご希望のサービス】\n${data.service}\n` : ''}

【お問い合わせ内容】
${data.message}

---
送信日時: ${new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })}
`;
}

// ─── Resend エラーの分類 ───

function classifyResendError(errorMessage: string, fromEmail: string): string {
  const msg = errorMessage.toLowerCase();

  if (msg.includes('api key') || msg.includes('unauthorized')) {
    return 'APIキーが無効です。管理者にお問い合わせください。';
  }
  if (
    msg.includes('domain') ||
    msg.includes('not verified') ||
    msg.includes('unverified')
  ) {
    return `送信元ドメインが認証されていません。現在の送信元: ${fromEmail}。Vercelの環境変数RESEND_FROM_EMAILを削除するか、Resendでドメインを認証してください。`;
  }
  if (msg.includes('rate limit') || msg.includes('quota')) {
    return '送信制限に達しました。しばらくしてから再度お試しください。';
  }

  return 'メール送信に失敗しました';
}

// ─── 送信先メールアドレスのパース ───

function parseRecipientEmails(raw: string): string[] {
  return raw
    .split(',')
    .map((email) => email.trim())
    .filter((email) => email.length > 0);
}

// ─── POST: お問い合わせ受付 ───

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ContactFormData;

    // 環境変数の確認（デバッグ用）
    console.log('Environment check:', {
      hasApiKey: hasEnv('RESEND_API_KEY'),
      hasRecipient: hasEnv('CONTACT_RECIPIENT_EMAIL'),
      fromEmail: hasEnv('RESEND_FROM_EMAIL') ? '***set***' : 'using default',
    });

    // バリデーション
    const validation = validateContactForm(body);
    if (!validation.isValid) {
      return errorResponse(validation.errors[0], 400);
    }

    // APIキーの確認
    let apiKey: string;
    try {
      apiKey = getResendApiKey();
    } catch {
      console.error('❌ RESEND_API_KEY is not set');
      return errorResponse(
        'メール送信の設定が完了していません。管理者にお問い合わせください。'
      );
    }

    // 送信先メールアドレスの取得
    let recipientEmailEnv: string;
    try {
      recipientEmailEnv = getContactRecipientEmail();
    } catch {
      console.error('❌ CONTACT_RECIPIENT_EMAIL is not set');
      return errorResponse(
        'メール送信先が設定されていません。管理者にお問い合わせください。'
      );
    }

    // カンマ区切りのメールアドレスを配列に変換
    const recipientEmails = parseRecipientEmails(recipientEmailEnv);

    // 送信先メールアドレスの形式チェック
    const invalidEmails = recipientEmails.filter(
      (email) => !isValidEmail(email)
    );
    if (invalidEmails.length > 0) {
      console.error('❌ Invalid recipient email addresses:', invalidEmails);
      return errorResponse(
        '送信先メールアドレスの形式が正しくありません。管理者にお問い合わせください。'
      );
    }

    const fromEmail = getResendFromEmail();

    console.log('Sending email:', {
      from: fromEmail,
      to: recipientEmails,
      replyTo: body.email,
      recipientCount: recipientEmails.length,
    });

    // Resend でメール送信
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: recipientEmails.length === 1 ? recipientEmails[0] : recipientEmails,
      replyTo: body.email,
      subject: `【お問い合わせ】${body.company}様より`,
      text: buildEmailBody(body),
    });

    if (error) {
      console.error('❌ Resend error:', {
        message: error.message,
        name: error.name,
        error: JSON.stringify(error, null, 2),
      });

      return errorResponse(
        classifyResendError(error.message || '', fromEmail),
        500,
        error.message
      );
    }

    console.log('✅ Email sent successfully:', data);

    return successResponse('お問い合わせを受け付けました', { id: data?.id });
  } catch (err) {
    const msg = extractErrorMessage(err);
    console.error('❌ Contact form error:', {
      error: msg,
      stack: err instanceof Error ? err.stack : undefined,
      type: (err as { constructor?: { name?: string } })?.constructor?.name,
    });

    return errorResponse('サーバーエラーが発生しました', 500, msg);
  }
}

// ─── GET: エンドポイント動作確認用 ───

export async function GET() {
  return healthResponse(
    'Receives contact form submissions and sends emails via Resend',
    '/api/contact'
  );
}
