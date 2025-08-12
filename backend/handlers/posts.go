package handlers

import (
	"net/http"

	"backend/models"
	"backend/repository"

	"github.com/gin-gonic/gin"
)

// PostsHandler は投稿関連のHTTPハンドラー
type PostsHandler struct {
	repo *repository.PostsRepository
}

// NewPostsHandler は新しいPostsHandlerを作成
func NewPostsHandler() *PostsHandler {
	return &PostsHandler{
		repo: repository.NewPostsRepository(),
	}
}

// GetPosts は投稿一覧を取得
func (h *PostsHandler) GetPosts(c *gin.Context) {
	posts, err := h.repo.GetPosts(c.Request.Context())
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "投稿の取得に失敗しました: " + err.Error(),
		})
		return
	}

	response := models.PostsResponse{
		Posts: posts,
	}
	c.JSON(http.StatusOK, response)
}

// GetPost は特定の投稿を取得
func (h *PostsHandler) GetPost(c *gin.Context) {
	id := c.Param("id")

	post, err := h.repo.GetPost(c.Request.Context(), id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "投稿の取得に失敗しました: " + err.Error(),
		})
		return
	}

	if post == nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "投稿が見つかりません",
		})
		return
	}

	response := models.PostResponse{
		Post: *post,
	}
	c.JSON(http.StatusOK, response)
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

	post, err := h.repo.CreatePost(c.Request.Context(), req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "投稿の作成に失敗しました: " + err.Error(),
		})
		return
	}

	response := models.PostResponse{
		Post: *post,
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

	post, err := h.repo.UpdatePost(c.Request.Context(), id, req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "投稿の更新に失敗しました: " + err.Error(),
		})
		return
	}

	if post == nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "投稿が見つかりません",
		})
		return
	}

	response := models.PostResponse{
		Post: *post,
	}
	c.JSON(http.StatusOK, response)
}

// DeletePost は投稿を削除
func (h *PostsHandler) DeletePost(c *gin.Context) {
	id := c.Param("id")

	err := h.repo.DeletePost(c.Request.Context(), id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "投稿の削除に失敗しました: " + err.Error(),
		})
		return
	}

	c.Status(http.StatusNoContent)
}

// LikePost は投稿にいいねを追加
func (h *PostsHandler) LikePost(c *gin.Context) {
	id := c.Param("id")

	post, err := h.repo.LikePost(c.Request.Context(), id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "いいねの追加に失敗しました: " + err.Error(),
		})
		return
	}

	if post == nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "投稿が見つかりません",
		})
		return
	}

	response := models.PostResponse{
		Post: *post,
	}
	c.JSON(http.StatusOK, response)
}

// RepostPost は投稿をリポスト
func (h *PostsHandler) RepostPost(c *gin.Context) {
	id := c.Param("id")

	post, err := h.repo.RepostPost(c.Request.Context(), id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "リポストの追加に失敗しました: " + err.Error(),
		})
		return
	}

	if post == nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "投稿が見つかりません",
		})
		return
	}

	response := models.PostResponse{
		Post: *post,
	}
	c.JSON(http.StatusOK, response)
}
