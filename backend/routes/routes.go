package routes

import (
	"backend/handlers"

	"github.com/gin-gonic/gin"
)

// SetupRoutes はルーティングを設定
func SetupRoutes(r *gin.Engine) {
	// ヘルスチェックエンドポイント
	r.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status":  "ok",
			"message": "Backend is running",
		})
	})

	// 投稿関連のエンドポイント
	postsHandler := handlers.NewPostsHandler()
	
	// フロントエンドのAPI_BASE_URLに合わせてルートパスを設定
	posts := r.Group("/posts")
	{
		posts.GET("", postsHandler.GetPosts)           // GET /posts
		posts.GET("/:id", postsHandler.GetPost)        // GET /posts/:id
		posts.POST("", postsHandler.CreatePost)        // POST /posts
		posts.PUT("/:id", postsHandler.UpdatePost)     // PUT /posts/:id
		posts.DELETE("/:id", postsHandler.DeletePost)  // DELETE /posts/:id
		
		// 追加機能
		posts.POST("/:id/like", postsHandler.LikePost)     // POST /posts/:id/like
		posts.POST("/:id/repost", postsHandler.RepostPost) // POST /posts/:id/repost
	}
}
