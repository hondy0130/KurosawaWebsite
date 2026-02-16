import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

type ContactFormData = {
  name: string;
  company: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
};

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ContactFormData;

    // 必須項目のバリデーション
    if (!body.name || !body.company || !body.email || !body.message) {
      return NextResponse.json(
        { success: false, message: '必須項目が入力されていません' },
        { status: 400 }
      );
    }

    // メールアドレスの形式チェック
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { success: false, message: 'メールアドレスの形式が正しくありません' },
        { status: 400 }
      );
    }

    // 送信先メールアドレス（環境変数から取得、カンマ区切りで複数指定可能）
    const recipientEmailEnv = process.env.CONTACT_RECIPIENT_EMAIL || 'info@example.com';
    // カンマ区切りのメールアドレスを配列に変換し、空白を除去
    const recipientEmails = recipientEmailEnv
      .split(',')
      .map((email) => email.trim())
      .filter((email) => email.length > 0);
    
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

    // メール本文の作成
    const emailBody = `
お問い合わせがありました。

【お名前】
${body.name}

【会社名】
${body.company}

【メールアドレス】
${body.email}

${body.phone ? `【電話番号】\n${body.phone}\n` : ''}
${body.service ? `【ご希望のサービス】\n${body.service}\n` : ''}

【お問い合わせ内容】
${body.message}

---
送信日時: ${new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })}
`;

    // Resendでメール送信（複数のメールアドレスに対応）
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: recipientEmails.length === 1 ? recipientEmails[0] : recipientEmails,
      replyTo: body.email,
      subject: `【お問い合わせ】${body.company}様より`,
      text: emailBody,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { success: false, message: 'メール送信に失敗しました', error: error.message },
        { status: 500 }
      );
    }

    console.log('Email sent successfully:', data);

    return NextResponse.json({
      success: true,
      message: 'お問い合わせを受け付けました',
      id: data?.id,
    });
  } catch (err) {
    console.error('Contact form error:', err);
    return NextResponse.json(
      {
        success: false,
        message: 'サーバーエラーが発生しました',
        error: err instanceof Error ? err.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// GET: エンドポイント動作確認用
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Contact form API endpoint is working',
    timestamp: new Date().toISOString(),
    endpoints: {
      POST: '/api/contact',
      description: 'Receives contact form submissions and sends emails via Resend',
    },
  });
}
