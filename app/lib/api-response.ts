// APIルート共通のレスポンスヘルパー
//
// すべてのAPIエンドポイントで統一されたレスポンス構造を返す

import { NextResponse } from 'next/server';

// ─── 型定義 ───

export type ApiSuccessResponse<T = unknown> = {
  success: true;
  message: string;
} & (T extends undefined ? object : { data?: T });

export type ApiErrorResponse = {
  success: false;
  message: string;
  error?: string; // 開発環境のみ
};

export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse;

// ─── レスポンスビルダー ───

/** 成功レスポンスを返す */
export function successResponse<T extends Record<string, unknown>>(
  message: string,
  extra?: T,
  status = 200
) {
  return NextResponse.json(
    { success: true, message, ...extra } as const,
    { status }
  );
}

/** エラーレスポンスを返す（開発環境では詳細エラーを含む） */
export function errorResponse(
  message: string,
  status = 500,
  devError?: string
) {
  const body: ApiErrorResponse = { success: false, message };
  if (process.env.NODE_ENV === 'development' && devError) {
    body.error = devError;
  }
  return NextResponse.json(body, { status });
}

/** catch ブロック内で unknown エラーからメッセージを取り出す */
export function extractErrorMessage(err: unknown): string {
  return err instanceof Error ? err.message : 'Unknown error';
}

/** エンドポイント動作確認用の GET レスポンス */
export function healthResponse(
  description: string,
  endpoint: string
) {
  return NextResponse.json({
    status: 'ok',
    message: description,
    timestamp: new Date().toISOString(),
    endpoints: {
      POST: endpoint,
      description,
    },
  });
}
