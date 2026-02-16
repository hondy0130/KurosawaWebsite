import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

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

    // 環境変数の確認（デバッグ用）
    const hasApiKey = !!process.env.RESEND_API_KEY;
    const recipientEmailEnv = process.env.CONTACT_RECIPIENT_EMAIL;
    const fromEmailEnv = process.env.RESEND_FROM_EMAIL;

    console.log('Environment check:', {
      hasApiKey,
      recipientEmailEnv: recipientEmailEnv ? '***set***' : 'NOT SET',
      fromEmailEnv: fromEmailEnv || 'using default',
    });

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

    // APIキーの確認
    if (!process.env.RESEND_API_KEY) {
      console.error('❌ RESEND_API_KEY is not set');
      return NextResponse.json(
        { success: false, message: 'メール送信の設定が完了していません。管理者にお問い合わせください。' },
        { status: 500 }
      );
    }

    // Resendインスタンスの作成（環境変数が確実に読み込まれた後）
    const resend = new Resend(process.env.RESEND_API_KEY);

    // 送信先メールアドレス（環境変数から取得、カンマ区切りで複数指定可能）
    if (!recipientEmailEnv) {
      console.error('❌ CONTACT_RECIPIENT_EMAIL is not set');
      return NextResponse.json(
        { success: false, message: 'メール送信先が設定されていません。管理者にお問い合わせください。' },
        { status: 500 }
      );
    }

    // カンマ区切りのメールアドレスを配列に変換し、空白を除去
    const recipientEmails = recipientEmailEnv
      .split(',')
      .map((email) => email.trim())
      .filter((email) => email.length > 0);

    // 送信先メールアドレスの形式チェック
    const invalidEmails = recipientEmails.filter((email) => !emailRegex.test(email));
    if (invalidEmails.length > 0) {
      console.error('❌ Invalid recipient email addresses:', invalidEmails);
      return NextResponse.json(
        { success: false, message: '送信先メールアドレスの形式が正しくありません。管理者にお問い合わせください。' },
        { status: 500 }
      );
    }

    const fromEmail = fromEmailEnv || 'onboarding@resend.dev';

    console.log('Sending email:', {
      from: fromEmail,
      to: recipientEmails,
      replyTo: body.email,
      recipientCount: recipientEmails.length,
    });

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
      console.error('❌ Resend error:', {
        message: error.message,
        name: error.name,
        error: JSON.stringify(error, null, 2),
      });
      
      // エラーメッセージをより詳細に
      let errorMessage = 'メール送信に失敗しました';
      if (error.message?.includes('API key')) {
        errorMessage = 'APIキーが無効です。管理者にお問い合わせください。';
      } else if (error.message?.includes('domain')) {
        errorMessage = '送信元ドメインが認証されていません。管理者にお問い合わせください。';
      } else if (error.message?.includes('rate limit')) {
        errorMessage = '送信制限に達しました。しばらくしてから再度お試しください。';
      }
      
      return NextResponse.json(
        { 
          success: false, 
          message: errorMessage,
          error: process.env.NODE_ENV === 'development' ? error.message : undefined,
        },
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
    console.error('❌ Contact form error:', {
      error: err instanceof Error ? err.message : 'Unknown error',
      stack: err instanceof Error ? err.stack : undefined,
      type: err?.constructor?.name,
    });
    
    return NextResponse.json(
      {
        success: false,
        message: 'サーバーエラーが発生しました',
        error: process.env.NODE_ENV === 'development' 
          ? (err instanceof Error ? err.message : 'Unknown error')
          : undefined,
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
