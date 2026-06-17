-- dailystoptoshop Reviews — D1 Schema
-- Run: wrangler d1 execute dailystoptoshop-reviews --file=./schema.sql

CREATE TABLE IF NOT EXISTS reviews (
  id         TEXT PRIMARY KEY,
  product_id TEXT NOT NULL,
  user_sub   TEXT NOT NULL,
  user_name  TEXT NOT NULL,
  user_pic   TEXT NOT NULL,
  rating     INTEGER NOT NULL CHECK(rating BETWEEN 1 AND 5),
  body       TEXT NOT NULL,
  likes      INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(product_id, user_sub)
);

CREATE INDEX IF NOT EXISTS idx_reviews_product ON reviews(product_id, created_at DESC);
