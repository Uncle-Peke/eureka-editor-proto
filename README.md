# Eureka Editor UX Proto

モノレポ構成のDevContainer環境で開発するプロジェクトです。

## 構成

- **Frontend**: Next.js (TypeScript)
- **Backend**: Go (Gin)
- **Database**: PostgreSQL

## 起動方法

### 1. DevContainerに接続

VSCodeでプロジェクトを開き、コマンドパレット（`Ctrl+Shift+P`）から以下を実行：

```
Dev Containers: Reopen in Container
```

### 2. コンテナの選択

接続したいコンテナを選択：
- **frontend**: Next.js開発環境
- **backend**: Go開発環境

### 3. アプリケーションの起動

#### Frontend開発
1. frontendコンテナに接続
2. `npm run dev` でNext.jsサーバーを起動
3. http://localhost:3000 でアクセス

#### Backend開発
1. backendコンテナに接続
2. `go run main.go` でGoサーバーを起動
3. http://localhost:8080 でAPIにアクセス

## ポート

- **3000**: Next.js Dev Server
- **8080**: Backend API
- **5432**: PostgreSQL
