import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // ブレークポイントを設定する場所1: リクエストの開始
  console.log("🔍 Debug API: リクエスト開始");

  // URLパラメータを取得
  const { searchParams } = new URL(request.url);
  const testParam = searchParams.get("test");

  // ブレークポイントを設定する場所2: パラメータ処理
  console.log("🔍 Debug API: パラメータ処理", { testParam });

  // テスト用の重い処理をシミュレート
  let result = 0;
  for (let i = 0; i < 1000; i++) {
    result += Math.random();
    // ブレークポイントを設定する場所3: ループ内
    if (i % 100 === 0) {
      console.log(`🔍 Debug API: ループ処理中 ${i}/1000`);
    }
  }

  // ブレークポイントを設定する場所4: 結果処理
  console.log("🔍 Debug API: 結果処理", { result });

  // 条件分岐のテスト
  let message = "";
  if (testParam === "error") {
    // ブレークポイントを設定する場所5: エラーケース
    console.log("🔍 Debug API: エラーケース処理");
    message = "エラーテストケース";
  } else if (testParam === "slow") {
    // ブレークポイントを設定する場所6: 遅い処理ケース
    console.log("🔍 Debug API: 遅い処理開始");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("🔍 Debug API: 遅い処理完了");
    message = "遅い処理完了";
  } else {
    // ブレークポイントを設定する場所7: 通常ケース
    console.log("🔍 Debug API: 通常ケース処理");
    message = "通常の処理完了";
  }

  // ブレークポイントを設定する場所8: レスポンス作成
  console.log("🔍 Debug API: レスポンス作成");

  return NextResponse.json({
    success: true,
    message,
    result: result.toFixed(2),
    timestamp: new Date().toISOString(),
    testParam,
    debugInfo: {
      userAgent: request.headers.get("user-agent"),
      method: request.method,
      url: request.url,
    },
  });
}

export async function POST(request: NextRequest) {
  // ブレークポイントを設定する場所9: POSTリクエスト処理
  console.log("🔍 Debug API: POSTリクエスト開始");

  try {
    const body = await request.json();

    // ブレークポイントを設定する場所10: リクエストボディ処理
    console.log("🔍 Debug API: リクエストボディ", body);

    // 複雑な処理をシミュレート
    const processedData = {
      ...body,
      processed: true,
      timestamp: new Date().toISOString(),
      randomValue: Math.random(),
    };

    // ブレークポイントを設定する場所11: 処理完了
    console.log("🔍 Debug API: 処理完了", processedData);

    return NextResponse.json({
      success: true,
      data: processedData,
      message: "POSTリクエスト処理完了",
    });
  } catch (error) {
    // ブレークポイントを設定する場所12: エラーハンドリング
    console.error("🔍 Debug API: エラー発生", error);

    return NextResponse.json(
      { success: false, error: "リクエストの処理中にエラーが発生しました" },
      { status: 400 }
    );
  }
}
