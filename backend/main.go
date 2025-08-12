package main

import (
	"log"
	"net/http"

	"backend/database"
	"backend/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	// データベース接続を初期化
	if err := database.InitDB(); err != nil {
		log.Fatalf("データベース接続失敗: %v", err)
	}
	defer database.CloseDB()

	r := gin.Default()

	// CORSミドルウェアを追加
	r.Use(func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Header("Access-Control-Allow-Headers", "Origin, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
		
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(http.StatusNoContent)
			return
		}
		
		c.Next()
	})

	// ルーティングを設定
	routes.SetupRoutes(r)

	log.Println("Backend server starting on :8080")
	r.Run(":8080")
}
