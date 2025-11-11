import db from './db.js';
import bcrypt from 'bcryptjs';

export function initializeDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS diagnosis_sessions (
      id TEXT PRIMARY KEY,
      stock_code TEXT NOT NULL,
      src TEXT DEFAULT '',
      rac_text TEXT DEFAULT '',
      completed INTEGER DEFAULT 0,
      converted INTEGER DEFAULT 0,
      analysis_result TEXT,
      error_message TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      completed_at TEXT,
      converted_at TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_diagnosis_sessions_src
      ON diagnosis_sessions(src);

    CREATE INDEX IF NOT EXISTS idx_diagnosis_sessions_created_at
      ON diagnosis_sessions(created_at DESC);

    CREATE INDEX IF NOT EXISTS idx_diagnosis_sessions_completed
      ON diagnosis_sessions(completed) WHERE completed = 1;

    CREATE INDEX IF NOT EXISTS idx_diagnosis_sessions_converted
      ON diagnosis_sessions(converted) WHERE converted = 1;

    CREATE TABLE IF NOT EXISTS diagnosis_cache (
      id TEXT PRIMARY KEY,
      stock_code TEXT NOT NULL,
      stock_data TEXT NOT NULL,
      diagnosis_result TEXT NOT NULL,
      model_used TEXT DEFAULT 'qwen2.5-7b-instruct',
      created_at TEXT DEFAULT (datetime('now')),
      expires_at TEXT NOT NULL,
      hit_count INTEGER DEFAULT 0,
      last_hit_at TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_diagnosis_cache_lookup
      ON diagnosis_cache(stock_code, expires_at);

    CREATE INDEX IF NOT EXISTS idx_diagnosis_cache_expires
      ON diagnosis_cache(expires_at);

    CREATE TABLE IF NOT EXISTS diagnosis_queue (
      id TEXT PRIMARY KEY,
      stock_code TEXT NOT NULL,
      stock_data TEXT NOT NULL,
      user_id TEXT,
      priority INTEGER DEFAULT 5,
      status TEXT DEFAULT 'pending',
      result TEXT,
      error_message TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      processed_at TEXT,
      attempts INTEGER DEFAULT 0
    );

    CREATE INDEX IF NOT EXISTS idx_diagnosis_queue_processing
      ON diagnosis_queue(status, priority, created_at);

    CREATE INDEX IF NOT EXISTS idx_diagnosis_queue_status
      ON diagnosis_queue(status);

    CREATE TABLE IF NOT EXISTS api_usage_stats (
      id TEXT PRIMARY KEY,
      date TEXT NOT NULL,
      hour INTEGER NOT NULL,
      requests_total INTEGER DEFAULT 0,
      cache_hits INTEGER DEFAULT 0,
      api_calls INTEGER DEFAULT 0,
      queue_length_avg INTEGER DEFAULT 0,
      response_time_avg INTEGER DEFAULT 0,
      errors_count INTEGER DEFAULT 0,
      updated_at TEXT DEFAULT (datetime('now')),
      UNIQUE(date, hour)
    );

    CREATE UNIQUE INDEX IF NOT EXISTS idx_api_usage_stats_date_hour
      ON api_usage_stats(date, hour);

    CREATE TABLE IF NOT EXISTS admin_users (
      id TEXT PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now')),
      last_login_at TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_admin_users_username
      ON admin_users(username);

    CREATE TABLE IF NOT EXISTS user_sessions (
      id TEXT PRIMARY KEY,
      session_id TEXT UNIQUE NOT NULL,
      stock_code TEXT,
      stock_name TEXT,
      url_params TEXT DEFAULT '{}',
      first_visit_at TEXT DEFAULT (datetime('now')),
      last_activity_at TEXT DEFAULT (datetime('now')),
      user_agent TEXT,
      ip_address TEXT,
      converted INTEGER DEFAULT 0,
      converted_at TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_user_sessions_session_id
      ON user_sessions(session_id);

    CREATE INDEX IF NOT EXISTS idx_user_sessions_first_visit
      ON user_sessions(first_visit_at DESC);

    CREATE INDEX IF NOT EXISTS idx_user_sessions_converted
      ON user_sessions(converted, converted_at);

    CREATE INDEX IF NOT EXISTS idx_user_sessions_stock_code
      ON user_sessions(stock_code);

    CREATE TABLE IF NOT EXISTS user_events (
      id TEXT PRIMARY KEY,
      session_id TEXT NOT NULL,
      event_type TEXT NOT NULL,
      event_data TEXT DEFAULT '{}',
      stock_code TEXT,
      stock_name TEXT,
      duration_ms INTEGER,
      gclid TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_user_events_session_id
      ON user_events(session_id, created_at DESC);

    CREATE INDEX IF NOT EXISTS idx_user_events_type
      ON user_events(event_type);

    CREATE INDEX IF NOT EXISTS idx_user_events_created_at
      ON user_events(created_at DESC);

    CREATE INDEX IF NOT EXISTS idx_user_events_stock_code
      ON user_events(stock_code);

    CREATE TABLE IF NOT EXISTS line_redirect_links (
      id TEXT PRIMARY KEY,
      line_url TEXT NOT NULL,
      weight INTEGER NOT NULL DEFAULT 1,
      is_active INTEGER DEFAULT 1,
      hit_count INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_line_redirect_links_active
      ON line_redirect_links(is_active, weight DESC);

    CREATE TABLE IF NOT EXISTS google_tracking_config (
      id TEXT PRIMARY KEY,
      google_ads_conversion_id TEXT,
      ga4_measurement_id TEXT,
      conversion_action_id TEXT,
      is_enabled INTEGER DEFAULT 0,
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS stock_performance_cache (
      id TEXT PRIMARY KEY,
      stock_code TEXT NOT NULL UNIQUE,
      stock_name TEXT NOT NULL,
      current_price TEXT,
      previous_price TEXT,
      price_change TEXT,
      change_percent TEXT,
      prediction_result TEXT,
      prediction_direction TEXT,
      prediction_accuracy REAL DEFAULT 0,
      is_hot_stock INTEGER DEFAULT 0,
      last_updated TEXT DEFAULT (datetime('now')),
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE UNIQUE INDEX IF NOT EXISTS idx_stock_performance_cache_code
      ON stock_performance_cache(stock_code);

    CREATE INDEX IF NOT EXISTS idx_stock_performance_cache_hot_stock
      ON stock_performance_cache(is_hot_stock) WHERE is_hot_stock = 1;

    CREATE INDEX IF NOT EXISTS idx_stock_performance_cache_updated
      ON stock_performance_cache(last_updated DESC);
  `);

  console.log('Database schema initialized successfully');
}

export async function createInitialAdminUser() {
  const username = 'adsadmin';
  const password = 'Mm123567';
  const passwordHash = await bcrypt.hash(password, 10);

  const stmt = db.prepare('SELECT id FROM admin_users WHERE username = ?');
  const existingUser = stmt.get(username);

  if (!existingUser) {
    const id = `admin_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
    const insertStmt = db.prepare('INSERT INTO admin_users (id, username, password_hash) VALUES (?, ?, ?)');
    insertStmt.run(id, username, passwordHash);
    console.log(`Initial admin user created: ${username}`);
  } else {
    console.log('Admin user already exists');
  }
}
