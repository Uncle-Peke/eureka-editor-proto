package database

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"os"
	"time"

	_ "github.com/lib/pq"
)

var DB *sql.DB

// InitDB はデータベース接続を初期化
func InitDB() error {
	dsn := os.Getenv("DATABASE_URL")
	if dsn == "" {
		dsn = "postgres://admin:Passw0rd!@localhost:5432/app?sslmode=disable"
	}

	var err error
	DB, err = sql.Open("postgres", dsn)
	if err != nil {
		return fmt.Errorf("データベース接続エラー: %v", err)
	}

	// 接続プールの設定
	DB.SetMaxOpenConns(25)
	DB.SetMaxIdleConns(25)
	DB.SetConnMaxLifetime(5 * time.Minute)

	// 接続テスト
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if err := DB.PingContext(ctx); err != nil {
		return fmt.Errorf("データベース接続テスト失敗: %v", err)
	}

	log.Println("データベース接続成功")
	return nil
}

// CloseDB はデータベース接続を閉じる
func CloseDB() error {
	if DB != nil {
		return DB.Close()
	}
	return nil
}
