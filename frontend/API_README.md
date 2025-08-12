# API 通信の実装について

このプロジェクトでは、Post に対する CRUD 操作（POST, PUT, GET, DELETE）を行う API 通信が実装されています。

## 実装された機能

### 1. API クライアント (`src/lib/api/posts.ts`)

- `PostsAPI` クラスで全ての API 操作を管理
- エラーハンドリングとログ出力
- 環境変数による API ベース URL の設定

### 2. React フック (`src/hooks/usePosts.ts`)

- `usePosts` フックで API 操作の状態管理
- ローディング状態、エラー状態、投稿データの管理
- 最適化されたコールバック関数

### 3. UI コンポーネント

- `ErrorMessage`: エラーメッセージの表示
- `LoadingSpinner`: ローディング状態の表示
- 既存コンポーネントの更新（PostCard, PostEditor）

## 使用方法

### 基本的な使用方法

```tsx
import { usePosts } from "@/hooks/usePosts";

function MyComponent() {
  const {
    posts,
    loading,
    error,
    fetchPosts,
    createPost,
    updatePost,
    deletePost,
    clearError,
  } = usePosts();

  // 投稿一覧を取得
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // 新規投稿を作成
  const handleCreate = async () => {
    try {
      await createPost({
        content: "投稿内容",
        username: "ユーザー名",
        userHandle: "@username",
      });
    } catch (error) {
      console.error("投稿の作成に失敗しました:", error);
    }
  };

  // 投稿を更新
  const handleUpdate = async (id: string, content: string) => {
    try {
      await updatePost(id, { content });
    } catch (error) {
      console.error("投稿の更新に失敗しました:", error);
    }
  };

  // 投稿を削除
  const handleDelete = async (id: string) => {
    try {
      await deletePost(id);
    } catch (error) {
      console.error("投稿の削除に失敗しました:", error);
    }
  };

  return (
    <div>
      {error && <ErrorMessage error={error} onClear={clearError} />}
      {loading && <LoadingSpinner />}
      {/* 投稿一覧の表示 */}
    </div>
  );
}
```

### 環境変数の設定

`.env.local` ファイルに以下を設定してください：

```bash
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

デフォルトでは `http://localhost:3001/api` が使用されます。

## API エンドポイント

以下のエンドポイントが想定されています：

- `GET /api/posts` - 投稿一覧の取得
- `GET /api/posts/:id` - 特定の投稿の取得
- `POST /api/posts` - 新規投稿の作成
- `PUT /api/posts/:id` - 投稿の更新
- `DELETE /api/posts/:id` - 投稿の削除

## レスポンス形式

### 投稿一覧

```json
{
  "posts": [
    {
      "id": "string",
      "content": "string",
      "username": "string",
      "userHandle": "string",
      "timestamp": "string",
      "likes": "number",
      "reposts": "number",
      "replies": "number"
    }
  ]
}
```

### 単一投稿

```json
{
  "post": {
    "id": "string",
    "content": "string",
    "username": "string",
    "userHandle": "string",
    "timestamp": "string",
    "likes": "number",
    "reposts": "number",
    "replies": "number"
  }
}
```

## エラーハンドリング

- ネットワークエラーや API エラーは適切にキャッチされます
- エラーメッセージは日本語で表示されます
- エラーは自動的に 5 秒後に消えるか、手動で閉じることができます

## ローディング状態

- API 通信中は適切なローディングスピナーが表示されます
- ボタンは通信中は無効化されます
- ユーザーエクスペリエンスを向上させるための視覚的フィードバック

## サンプルページ

`/posts-example` ページで実装例を確認できます。このページでは：

- 新規投稿の作成
- 投稿一覧の表示
- 投稿の編集・削除
- エラーハンドリング
- ローディング状態の表示

が実装されています。

## 注意事項

- API サーバーが起動していない場合、エラーメッセージが表示されます
- 環境変数が設定されていない場合、デフォルトの URL が使用されます
- 全ての API 通信は非同期で行われ、適切なエラーハンドリングが実装されています
