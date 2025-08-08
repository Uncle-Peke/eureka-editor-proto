package main

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	// ヘルスチェックエンドポイント
	r.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status":  "ok",
			"message": "Backend is running",
		})
	})

	// APIエンドポイント
	r.GET("/api/hello", func(c *gin.Context) {
		log.Println("Hello from Backend!")
		c.JSON(http.StatusOK, gin.H{
			"message": "Hello from Backend!",
		})
	})

	log.Println("Backend server starting on :8080")
	r.Run(":8080")
}
