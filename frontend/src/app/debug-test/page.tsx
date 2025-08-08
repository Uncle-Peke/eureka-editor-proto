"use client";

import { useState } from "react";

export default function DebugTestPage() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const testApi = async (
    endpoint: string,
    method: "GET" | "POST" = "GET",
    body?: any
  ) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const options: RequestInit = {
        method,
        headers: {
          "Content-Type": "application/json",
        },
      };

      if (body && method === "POST") {
        options.body = JSON.stringify(body);
      }

      const response = await fetch(`/api/debug${endpoint}`, options);
      const data = await response.json();

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "エラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">
        🔍 サーバサイドブレークポイントテスト
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* GET リクエストテスト */}
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">GET リクエストテスト</h2>
          <div className="space-y-2">
            <button
              onClick={() => testApi("")}
              disabled={loading}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
            >
              通常のGETリクエスト
            </button>

            <button
              onClick={() => testApi("?test=slow")}
              disabled={loading}
              className="w-full bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 disabled:opacity-50"
            >
              遅い処理テスト (2秒)
            </button>

            <button
              onClick={() => testApi("?test=error")}
              disabled={loading}
              className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50"
            >
              エラーケーステスト
            </button>
          </div>
        </div>

        {/* POST リクエストテスト */}
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">POST リクエストテスト</h2>
          <div className="space-y-2">
            <button
              onClick={() => testApi("", "POST", { test: "data", value: 123 })}
              disabled={loading}
              className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
            >
              正常なPOSTリクエスト
            </button>

            <button
              onClick={() =>
                testApi("", "POST", { complex: { nested: { data: "test" } } })
              }
              disabled={loading}
              className="w-full bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 disabled:opacity-50"
            >
              複雑なデータPOST
            </button>
          </div>
        </div>
      </div>

      {/* 結果表示 */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">結果</h2>

        {loading && (
          <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
            処理中... ブレークポイントで停止している可能性があります
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            エラー: {error}
          </div>
        )}

        {result && (
          <div className="bg-gray-100 border border-gray-400 text-gray-700 px-4 py-3 rounded">
            <pre className="whitespace-pre-wrap">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>

      {/* ブレークポイント設定ガイド */}
      <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">
          🔧 ブレークポイント設定ガイド
        </h3>
        <div className="space-y-2 text-sm">
          <p>
            <strong>1.</strong> <code>src/app/api/debug/route.ts</code> を開く
          </p>
          <p>
            <strong>2.</strong> 以下の行にブレークポイントを設定してください：
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>行 5: リクエスト開始</li>
            <li>行 11: パラメータ処理</li>
            <li>行 18: ループ内処理</li>
            <li>行 25: 結果処理</li>
            <li>行 30: エラーケース</li>
            <li>行 35: 遅い処理</li>
            <li>行 41: 通常ケース</li>
            <li>行 46: レスポンス作成</li>
            <li>行 52: POSTリクエスト開始</li>
            <li>行 58: リクエストボディ処理</li>
            <li>行 68: 処理完了</li>
            <li>行 76: エラーハンドリング</li>
          </ul>
          <p>
            <strong>3.</strong>{" "}
            上記のボタンをクリックしてブレークポイントが動作するかテスト
          </p>
        </div>
      </div>
    </div>
  );
}
