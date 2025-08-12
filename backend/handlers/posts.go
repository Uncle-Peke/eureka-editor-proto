package handlers

import (
	"net/http"
	"time"

	"backend/models"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

// PostsHandler は投稿関連のHTTPハンドラー
type PostsHandler struct {
	posts []models.Post
}

// NewPostsHandler は新しいPostsHandlerを作成
func NewPostsHandler() *PostsHandler {
	// サンプルデータを初期化
	samplePosts := []models.Post{
		{
			ID:         "1",
			Content:    "これは最初の投稿です！",
			Username:   "テストユーザー",
			UserHandle: "@testuser",
			Timestamp:  time.Now().Add(-time.Hour),
			Likes:      5,
			Reposts:    2,
			Replies:    1,
		},
		{
			ID:         "2",
			Content:    "2番目の投稿です。",
			Username:   "サンプルユーザー",
			UserHandle: "@sampleuser",
			Timestamp:  time.Now().Add(-30 * time.Minute),
			Likes:      3,
			Reposts:    0,
			Replies:    0,
		},
	}

	return &PostsHandler{
		posts: samplePosts,
	}
}

// GetPosts は投稿一覧を取得
func (h *PostsHandler) GetPosts(c *gin.Context) {
	response := models.PostsResponse{
		Posts: h.posts,
	}
	c.JSON(http.StatusOK, response)
}

// GetPost は特定の投稿を取得
func (h *PostsHandler) GetPost(c *gin.Context) {
	id := c.Param("id")

	for _, post := range h.posts {
		if post.ID == id {
			response := models.PostResponse{
				Post: post,
			}
			c.JSON(http.StatusOK, response)
			return
		}
	}

	c.JSON(http.StatusNotFound, gin.H{
		"error": "投稿が見つかりません",
	})
}

// CreatePost は新しい投稿を作成
func (h *PostsHandler) CreatePost(c *gin.Context) {
	var req models.CreatePostRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "リクエストの形式が正しくありません: " + err.Error(),
		})
		return
	}

	newPost := models.Post{
		ID:         uuid.New().String(),
		Content:    req.Content,
		Username:   req.Username,
		UserHandle: req.UserHandle,
		Timestamp:  time.Now(),
		Likes:      0,
		Reposts:    0,
		Replies:    0,
	}

	h.posts = append(h.posts, newPost)

	response := models.PostResponse{
		Post: newPost,
	}
	c.JSON(http.StatusCreated, response)
}

// UpdatePost は投稿を更新
func (h *PostsHandler) UpdatePost(c *gin.Context) {
	id := c.Param("id")

	var req models.UpdatePostRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "リクエストの形式が正しくありません: " + err.Error(),
		})
		return
	}

	for i, post := range h.posts {
		if post.ID == id {
			h.posts[i].Content = req.Content

			response := models.PostResponse{
				Post: h.posts[i],
			}
			c.JSON(http.StatusOK, response)
			return
		}
	}

	c.JSON(http.StatusNotFound, gin.H{
		"error": "投稿が見つかりません",
	})
}

// DeletePost は投稿を削除
func (h *PostsHandler) DeletePost(c *gin.Context) {
	id := c.Param("id")

	for i, post := range h.posts {
		if post.ID == id {
			// スライスから要素を削除
			h.posts = append(h.posts[:i], h.posts[i+1:]...)
			c.Status(http.StatusNoContent)
			return
		}
	}

	c.JSON(http.StatusNotFound, gin.H{
		"error": "投稿が見つかりません",
	})
}

// LikePost は投稿にいいねを追加
func (h *PostsHandler) LikePost(c *gin.Context) {
	id := c.Param("id")

	for i, post := range h.posts {
		if post.ID == id {
			h.posts[i].Likes++

			response := models.PostResponse{
				Post: h.posts[i],
			}
			c.JSON(http.StatusOK, response)
			return
		}
	}

	c.JSON(http.StatusNotFound, gin.H{
		"error": "投稿が見つかりません",
	})
}

// RepostPost は投稿をリポスト
func (h *PostsHandler) RepostPost(c *gin.Context) {
	id := c.Param("id")

	for i, post := range h.posts {
		if post.ID == id {
			h.posts[i].Reposts++

			response := models.PostResponse{
				Post: h.posts[i],
			}
			c.JSON(http.StatusOK, response)
			return
		}
	}

	c.JSON(http.StatusNotFound, gin.H{
		"error": "投稿が見つかりません",
	})
}
