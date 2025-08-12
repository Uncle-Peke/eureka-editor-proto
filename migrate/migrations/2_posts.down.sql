-- ポストテーブルのロールバック
-- トリガーを削除
DROP TRIGGER IF EXISTS update_posts_updated_at ON posts;

-- トリガー関数を削除
DROP FUNCTION IF EXISTS update_updated_at_column();

-- インデックスを削除
DROP INDEX IF EXISTS idx_posts_user_handle;
DROP INDEX IF EXISTS idx_posts_username;
DROP INDEX IF EXISTS idx_posts_timestamp;

-- テーブルを削除
DROP TABLE IF EXISTS posts;
