# Eureka Editor Proto

モノレポ構成のDevContainer環境で開発するプロジェクトです。

## 構成

- **Frontend**: Next.js (TypeScript)
- **Backend**: Go (Gin)
- **Database**: PostgreSQL

## 起動方法

### 1. ローカル（非DevContainer）での起動

リポジトリ直下の `compose.local.yml` を使って、PostgreSQL・マイグレーション・バックエンド・フロントエンドをまとめて起動できます。

前提：Docker と Docker Compose がインストール済み。

```bash
docker compose -f compose.local.yml up -d --build
```

- **フロントエンド（ローカルCompose）**: `http://localhost:3001`
- **バックエンド（ローカルCompose）**: `http://localhost:8081` （ヘルスチェック `GET /health`）
- **PostgreSQL（ローカルCompose）**: `localhost:5433`（DB: `app`, USER: `admin`, PASS: `Passw0rd!`）

停止する場合：

```bash
docker compose -f compose.local.yml down -v
```

マイグレーションをやり直したい場合（例：全削除→再適用）：

```bash
docker compose -f compose.local.yml run --rm migrate go run . down all
docker compose -f compose.local.yml run --rm migrate go run . migrate
```

### 2. DevContainerに接続

VSCodeでプロジェクトを開き、コマンドパレット（`Ctrl+Shift+P`）から以下を実行：

```
Dev Containers: Reopen in Container
```

### 3. コンテナの選択

接続したいコンテナを選択：
- **frontend**: Next.js開発環境
- **backend**: Go開発環境
