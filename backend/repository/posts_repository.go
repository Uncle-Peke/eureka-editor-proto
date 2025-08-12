package repository

import (
	"backend/database"
	"backend/models"
	"context"
	"database/sql"
	"fmt"
	"log"
	"time"
)

// PostsRepository はポストのデータベース操作を管理
type PostsRepository struct {
	db *sql.DB
}

// NewPostsRepository は新しいPostsRepositoryを作成
func NewPostsRepository() *PostsRepository {
	return &PostsRepository{
		db: database.DB,
	}
}

// GetPosts は全てのポストを取得
func (r *PostsRepository) GetPosts(ctx context.Context) ([]models.Post, error) {
	query := `
		SELECT id, content, username, user_handle, timestamp, likes, reposts, replies
		FROM posts
		ORDER BY timestamp DESC
	`
	
	rows, err := r.db.QueryContext(ctx, query)
	if err != nil {
		return nil, fmt.Errorf("ポスト取得エラー: %v", err)
	}
	defer rows.Close()

	var posts []models.Post
	for rows.Next() {
		var post models.Post
		err := rows.Scan(
			&post.ID,
			&post.Content,
			&post.Username,
			&post.UserHandle,
			&post.Timestamp,
			&post.Likes,
			&post.Reposts,
			&post.Replies,
		)
		if err != nil {
			return nil, fmt.Errorf("ポストスキャンエラー: %v", err)
		}
		posts = append(posts, post)
	}

	return posts, nil
}

// GetPost は指定されたIDのポストを取得
func (r *PostsRepository) GetPost(ctx context.Context, id string) (*models.Post, error) {
	query := `
		SELECT id, content, username, user_handle, timestamp, likes, reposts, replies
		FROM posts
		WHERE id = $1
	`
	
	var post models.Post
	err := r.db.QueryRowContext(ctx, query, id).Scan(
		&post.ID,
		&post.Content,
		&post.Username,
		&post.UserHandle,
		&post.Timestamp,
		&post.Likes,
		&post.Reposts,
		&post.Replies,
	)
	
	if err == sql.ErrNoRows {
		return nil, nil
	}
	if err != nil {
		return nil, fmt.Errorf("ポスト取得エラー: %v", err)
	}
	
	return &post, nil
}

// CreatePost は新しいポストを作成
func (r *PostsRepository) CreatePost(ctx context.Context, req models.CreatePostRequest) (*models.Post, error) {
	query := `
		INSERT INTO posts (content, username, user_handle, timestamp)
		VALUES ($1, $2, $3, $4)
		RETURNING id, content, username, user_handle, timestamp, likes, reposts, replies
	`
	
	log.Printf("SQLクエリ実行: %s", query)
	log.Printf("パラメータ: Content=%s, Username=%s, UserHandle=%s", req.Content, req.Username, req.UserHandle)
	
	var post models.Post
	err := r.db.QueryRowContext(ctx, query,
		req.Content,
		req.Username,
		req.UserHandle,
		time.Now(),
	).Scan(
		&post.ID,
		&post.Content,
		&post.Username,
		&post.UserHandle,
		&post.Timestamp,
		&post.Likes,
		&post.Reposts,
		&post.Replies,
	)
	
	if err != nil {
		log.Printf("データベースエラー: %v", err)
		return nil, fmt.Errorf("ポスト作成エラー: %v", err)
	}
	
	log.Printf("投稿作成成功: ID=%s", post.ID)
	return &post, nil
}

// UpdatePost はポストを更新
func (r *PostsRepository) UpdatePost(ctx context.Context, id string, req models.UpdatePostRequest) (*models.Post, error) {
	query := `
		UPDATE posts
		SET content = $1
		WHERE id = $2
		RETURNING id, content, username, user_handle, timestamp, likes, reposts, replies
	`
	
	var post models.Post
	err := r.db.QueryRowContext(ctx, query, req.Content, id).Scan(
		&post.ID,
		&post.Content,
		&post.Username,
		&post.UserHandle,
		&post.Timestamp,
		&post.Likes,
		&post.Reposts,
		&post.Replies,
	)
	
	if err == sql.ErrNoRows {
		return nil, nil
	}
	if err != nil {
		return nil, fmt.Errorf("ポスト更新エラー: %v", err)
	}
	
	return &post, nil
}

// DeletePost はポストを削除
func (r *PostsRepository) DeletePost(ctx context.Context, id string) error {
	query := `DELETE FROM posts WHERE id = $1`
	
	result, err := r.db.ExecContext(ctx, query, id)
	if err != nil {
		return fmt.Errorf("ポスト削除エラー: %v", err)
	}
	
	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return fmt.Errorf("削除行数取得エラー: %v", err)
	}
	
	if rowsAffected == 0 {
		return fmt.Errorf("ポストが見つかりません")
	}
	
	return nil
}

// LikePost はポストにいいねを追加
func (r *PostsRepository) LikePost(ctx context.Context, id string) (*models.Post, error) {
	query := `
		UPDATE posts
		SET likes = likes + 1
		WHERE id = $1
		RETURNING id, content, username, user_handle, timestamp, likes, reposts, replies
	`
	
	var post models.Post
	err := r.db.QueryRowContext(ctx, query, id).Scan(
		&post.ID,
		&post.Content,
		&post.Username,
		&post.UserHandle,
		&post.Timestamp,
		&post.Likes,
		&post.Reposts,
		&post.Replies,
	)
	
	if err == sql.ErrNoRows {
		return nil, nil
	}
	if err != nil {
		return nil, fmt.Errorf("いいね追加エラー: %v", err)
	}
	
	return &post, nil
}

// RepostPost はポストをリポスト
func (r *PostsRepository) RepostPost(ctx context.Context, id string) (*models.Post, error) {
	query := `
		UPDATE posts
		SET reposts = reposts + 1
		WHERE id = $1
		RETURNING id, content, username, user_handle, timestamp, likes, reposts, replies
	`
	
	var post models.Post
	err := r.db.QueryRowContext(ctx, query, id).Scan(
		&post.ID,
		&post.Content,
		&post.Username,
		&post.UserHandle,
		&post.Timestamp,
		&post.Likes,
		&post.Reposts,
		&post.Replies,
	)
	
	if err == sql.ErrNoRows {
		return nil, nil
	}
	if err != nil {
		return nil, fmt.Errorf("リポスト追加エラー: %v", err)
	}
	
	return &post, nil
}
