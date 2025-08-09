import { NextRequest, NextResponse } from "next/server";

// 複雑なデータ構造を定義
interface ComplexData {
  id: string;
  name: string;
  items: Array<{
    id: number;
    value: string;
    metadata?: {
      created: Date;
      tags: string[];
    };
    processed?: boolean;
    processedAt?: Date;
    computedValue?: string;
  }>;
  metadata: {
    version: string;
    timestamp: Date;
    lastProcessed?: Date;
    itemCount?: number;
    processingVersion?: string;
  };
  processingStatus?: "pending" | "completed";
}

// 複雑な処理をシミュレートする関数
async function processComplexData(data: ComplexData): Promise<ComplexData> {
  // ブレークポイントを設定する場所1: 関数開始
  console.log("🔍 Complex API: 複雑なデータ処理開始", { dataId: data.id });

  // データの検証
  if (!data.id || !data.name) {
    throw new Error("必須フィールドが不足しています");
  }

  // ブレークポイントを設定する場所2: データ検証後
  console.log("🔍 Complex API: データ検証完了");

  // アイテムの処理
  const processedItems = await Promise.all(
    data.items.map(async (item, index) => {
      // ブレークポイントを設定する場所3: アイテム処理ループ
      console.log(
        `🔍 Complex API: アイテム処理中 ${index + 1}/${data.items.length}`
      );

      // 重い処理をシミュレート
      await new Promise((resolve) => setTimeout(resolve, 100));

      return {
        ...item,
        processed: true,
        processedAt: new Date(),
        computedValue: `${item.value}_processed_${index}`,
      };
    })
  );

  // ブレークポイントを設定する場所4: アイテム処理完了
  console.log("🔍 Complex API: アイテム処理完了", {
    processedCount: processedItems.length,
  });

  // メタデータの更新
  const updatedMetadata = {
    ...data.metadata,
    lastProcessed: new Date(),
    itemCount: processedItems.length,
    processingVersion: "1.0.0",
  };

  // ブレークポイントを設定する場所5: メタデータ更新
  console.log("🔍 Complex API: メタデータ更新完了");

  return {
    ...data,
    items: processedItems,
    metadata: updatedMetadata,
    processingStatus: "completed",
  };
}

export async function POST(request: NextRequest) {
  // ブレークポイントを設定する場所6: リクエスト開始
  console.log("🔍 Complex API: POSTリクエスト開始");

  try {
    const body = await request.json();

    // ブレークポイントを設定する場所7: リクエストボディ取得
    console.log("🔍 Complex API: リクエストボディ取得", {
      bodyType: typeof body,
    });

    // データの型チェック
    if (!body || typeof body !== "object") {
      throw new Error("無効なリクエストボディ");
    }

    // ブレークポイントを設定する場所8: 型チェック後
    console.log("🔍 Complex API: 型チェック完了");

    // 複雑なデータ処理を実行
    const processedData = await processComplexData(body as ComplexData);

    // ブレークポイントを設定する場所9: 処理完了
    console.log("🔍 Complex API: 複雑な処理完了", {
      processedId: processedData.id,
      itemCount: processedData.items.length,
    });

    // レスポンスの作成
    const response = {
      success: true,
      data: processedData,
      processingInfo: {
        duration: "simulated",
        itemsProcessed: processedData.items.length,
        timestamp: new Date().toISOString(),
      },
    };

    // ブレークポイントを設定する場所10: レスポンス作成
    console.log("🔍 Complex API: レスポンス作成完了");

    return NextResponse.json(response);
  } catch (error) {
    // ブレークポイントを設定する場所11: エラーハンドリング
    console.error("🔍 Complex API: エラー発生", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "不明なエラーが発生しました",
        timestamp: new Date().toISOString(),
      },
      { status: 400 }
    );
  }
}

export async function GET(request: NextRequest) {
  // ブレークポイントを設定する場所12: GETリクエスト開始
  console.log("🔍 Complex API: GETリクエスト開始");

  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action");

  // ブレークポイントを設定する場所13: パラメータ処理
  console.log("🔍 Complex API: パラメータ処理", { action });

  switch (action) {
    case "generate":
      // ブレークポイントを設定する場所14: データ生成
      console.log("🔍 Complex API: データ生成開始");

      const generatedData: ComplexData = {
        id: `gen_${Date.now()}`,
        name: `Generated Data ${Math.floor(Math.random() * 1000)}`,
        items: Array.from({ length: 5 }, (_, i) => ({
          id: i + 1,
          value: `item_${i + 1}`,
          metadata: {
            created: new Date(),
            tags: [`tag_${i + 1}`, "generated"],
          },
        })),
        metadata: {
          version: "1.0.0",
          timestamp: new Date(),
        },
      };

      // ブレークポイントを設定する場所15: データ生成完了
      console.log("🔍 Complex API: データ生成完了", {
        generatedId: generatedData.id,
      });

      return NextResponse.json({
        success: true,
        data: generatedData,
        message: "テストデータが生成されました",
      });

    case "simulate-error":
      // ブレークポイントを設定する場所16: エラーシミュレーション
      console.log("🔍 Complex API: エラーシミュレーション開始");

      throw new Error("シミュレーションされたエラー");

    default:
      // ブレークポイントを設定する場所17: デフォルトケース
      console.log("🔍 Complex API: デフォルトケース処理");

      return NextResponse.json({
        success: true,
        message: "Complex API が正常に動作しています",
        availableActions: ["generate", "simulate-error"],
        timestamp: new Date().toISOString(),
      });
  }
}
