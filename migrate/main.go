package main

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"os"
	"strconv"
	"time"

	"github.com/golang-migrate/migrate/v4"
	_ "github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	_ "github.com/jackc/pgx/v5/stdlib"
)

func main() {
	dsn := os.Getenv("DATABASE_URL")
	if dsn == "" {
		log.Fatal("DATABASE_URL is required")
	}

	// DB ready 待ち（最大 2分）
	waitForDB(dsn, 2*time.Minute)

	if len(os.Args) < 2 {
		printUsage()
		os.Exit(2)
	}

	command := os.Args[1]

	// マイグレーター生成
	m, err := migrate.New(
		"file://migrations",
		dsn,
	)
	if err != nil {
		log.Fatalf("migrate.New error: %v", err)
	}
	defer m.Close()

	switch command {
	case "migrate", "up":
		if err := m.Up(); err != nil && err != migrate.ErrNoChange {
			log.Fatalf("migration failed: %v", err)
		}
		log.Println("migrate: 適用完了（変更なし含む）")

	case "rollback", "down":
		steps := 1
		if len(os.Args) >= 3 {
			arg := os.Args[2]
			if arg == "all" {
				if err := m.Down(); err != nil && err != migrate.ErrNoChange {
					log.Fatalf("rollback(all) failed: %v", err)
				}
				log.Println("rollback: 全てのマイグレーションを取り消しました（変更なし含む）")
				return
			}
			parsed, perr := strconv.Atoi(arg)
			if perr != nil || parsed <= 0 {
				log.Fatalf("rollback 失敗: ステップ数は正の整数、または 'all' を指定してください。指定値=%q", arg)
			}
			steps = parsed
		}

		if err := m.Steps(-steps); err != nil && err != migrate.ErrNoChange {
			log.Fatalf("rollback(%d) failed: %v", steps, err)
		}
		log.Printf("rollback: %d ステップ取り消し完了（変更なし含む）\n", steps)

	default:
		printUsage()
		os.Exit(2)
	}
}

func waitForDB(dsn string, timeout time.Duration) {
	ctx, cancel := context.WithTimeout(context.Background(), timeout)
	defer cancel()

	backoff := time.Second
	for {
		select {
		case <-ctx.Done():
			log.Fatalf("DB ready 待ちタイムアウト: %v", ctx.Err())
		default:
		}

		db, err := sql.Open("pgx", dsn)
		if err == nil {
			if pingErr := db.PingContext(ctx); pingErr == nil {
				db.Close()
				log.Println("DB ready")
				return
			}
			db.Close()
		}

		log.Printf("DB未ready。%v 後に再試行...", backoff)
		time.Sleep(backoff)
		if backoff < 10*time.Second {
			backoff *= 2
		}
	}
}

func printUsage() {
	// 使用方法を標準エラーに出力
	fmt.Fprintln(os.Stderr, "Usage:")
	fmt.Fprintf(os.Stderr, "  %s migrate|up\n", os.Args[0])
	fmt.Fprintf(os.Stderr, "  %s rollback|down [steps|all]\n", os.Args[0])
	fmt.Fprintln(os.Stderr, "\nExamples:")
	fmt.Fprintf(os.Stderr, "  %s migrate\n", os.Args[0])
	fmt.Fprintf(os.Stderr, "  %s rollback 1\n", os.Args[0])
	fmt.Fprintf(os.Stderr, "  %s down all\n", os.Args[0])
}
