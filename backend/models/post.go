package models

import "time"

// Post は投稿を表す構造体
type Post struct {
	ID          string    `json:"id" db:"id"`
	Content     string    `json:"content" db:"content"`
	Username    string    `json:"username" db:"username"`
	UserHandle  string    `json:"userHandle" db:"user_handle"`
	Timestamp   time.Time `json:"timestamp" db:"timestamp"`
	Likes       int       `json:"likes" db:"likes"`
	Reposts     int       `json:"reposts" db:"reposts"`
	Replies     int       `json:"replies" db:"replies"`
}

// CreatePostRequest は投稿作成リクエストを表す構造体
type CreatePostRequest struct {
	Content    string `json:"content" binding:"required"`
	Username   string `json:"username" binding:"required"`
	UserHandle string `json:"userHandle" binding:"required"`
}

// UpdatePostRequest は投稿更新リクエストを表す構造体
type UpdatePostRequest struct {
	Content string `json:"content" binding:"required"`
}

// PostsResponse は投稿一覧レスポンスを表す構造体
type PostsResponse struct {
	Posts []Post `json:"posts"`
}

// PostResponse は単一投稿レスポンスを表す構造体
type PostResponse struct {
	Post Post `json:"post"`
}
