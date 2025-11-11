import db from './db.js';

function generateUUID() {
  return `${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
}

export function cleanExpiredCache() {
  try {
    const now = new Date().toISOString();
    const stmt = db.prepare('DELETE FROM diagnosis_cache WHERE expires_at < ?');
    const result = stmt.run(now);
    console.log(`Cleaned ${result.changes} expired cache entries`);
    return true;
  } catch (error) {
    console.error('Error cleaning expired cache:', error);
    return false;
  }
}

export function getCacheStats() {
  try {
    const now = new Date().toISOString();
    const stmt = db.prepare(`
      SELECT
        COUNT(*) as total_entries,
        SUM(CASE WHEN expires_at > ? THEN 1 ELSE 0 END) as valid_entries,
        SUM(CASE WHEN expires_at <= ? THEN 1 ELSE 0 END) as expired_entries,
        SUM(hit_count) as total_hits,
        AVG(hit_count) as avg_hit_count
      FROM diagnosis_cache
    `);
    return stmt.get(now, now);
  } catch (error) {
    console.error('Error getting cache stats:', error);
    return null;
  }
}

export function getSessionSummary(daysBack = 7) {
  try {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysBack);
    const cutoff = cutoffDate.toISOString();

    const stmt = db.prepare(`
      SELECT
        COUNT(DISTINCT s.session_id) as total_sessions,
        COUNT(e.id) as total_events,
        SUM(CASE WHEN e.event_type = 'page_load' THEN 1 ELSE 0 END) as page_loads,
        SUM(CASE WHEN e.event_type = 'diagnosis_click' THEN 1 ELSE 0 END) as diagnoses,
        SUM(CASE WHEN e.event_type = 'report_download' THEN 1 ELSE 0 END) as report_downloads,
        SUM(CASE WHEN e.event_type = 'conversion' THEN 1 ELSE 0 END) as conversions,
        CASE
          WHEN COUNT(DISTINCT s.session_id) > 0
          THEN ROUND((CAST(SUM(CASE WHEN e.event_type = 'conversion' THEN 1 ELSE 0 END) AS REAL) / COUNT(DISTINCT s.session_id)) * 100, 2)
          ELSE 0
        END as conversion_rate
      FROM user_sessions s
      LEFT JOIN user_events e ON s.session_id = e.session_id
      WHERE s.first_visit_at >= ?
    `);

    return stmt.get(cutoff);
  } catch (error) {
    console.error('Error getting session summary:', error);
    return null;
  }
}

export function getPopularStocks(daysBack = 7, limitCount = 10) {
  try {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysBack);
    const cutoff = cutoffDate.toISOString();

    const stmt = db.prepare(`
      SELECT
        s.stock_code,
        s.stock_name,
        COUNT(DISTINCT s.session_id) as visit_count,
        SUM(CASE WHEN e.event_type = 'diagnosis_click' THEN 1 ELSE 0 END) as diagnosis_count,
        SUM(CASE WHEN e.event_type = 'conversion' THEN 1 ELSE 0 END) as conversion_count
      FROM user_sessions s
      LEFT JOIN user_events e ON s.session_id = e.session_id
      WHERE s.first_visit_at >= ? AND s.stock_code IS NOT NULL
      GROUP BY s.stock_code, s.stock_name
      ORDER BY visit_count DESC
      LIMIT ?
    `);

    return stmt.all(cutoff, limitCount);
  } catch (error) {
    console.error('Error getting popular stocks:', error);
    return [];
  }
}

export function upsertStockPerformanceCache(stockData) {
  try {
    const id = `stock_cache_${stockData.stock_code}_${Date.now()}`;
    const stmt = db.prepare(`
      INSERT INTO stock_performance_cache (
        id, stock_code, stock_name, current_price, previous_price,
        price_change, change_percent, prediction_result, prediction_direction,
        prediction_accuracy, is_hot_stock, last_updated
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
      ON CONFLICT(stock_code) DO UPDATE SET
        current_price = excluded.current_price,
        previous_price = excluded.previous_price,
        price_change = excluded.price_change,
        change_percent = excluded.change_percent,
        prediction_result = excluded.prediction_result,
        prediction_direction = excluded.prediction_direction,
        prediction_accuracy = excluded.prediction_accuracy,
        is_hot_stock = excluded.is_hot_stock,
        last_updated = datetime('now')
    `);

    stmt.run(
      id,
      stockData.stock_code,
      stockData.stock_name,
      stockData.current_price,
      stockData.previous_price || stockData.current_price,
      stockData.price_change || '0',
      stockData.change_percent || '0%',
      stockData.prediction_result || '',
      stockData.prediction_direction || 'neutral',
      stockData.prediction_accuracy || 0,
      stockData.is_hot_stock || 0
    );

    return true;
  } catch (error) {
    console.error('Error upserting stock performance cache:', error);
    return false;
  }
}

export function getHotStocks(limit = 7) {
  try {
    const stmt = db.prepare(`
      SELECT * FROM stock_performance_cache
      WHERE is_hot_stock = 1
      ORDER BY last_updated DESC
      LIMIT ?
    `);
    return stmt.all(limit);
  } catch (error) {
    console.error('Error getting hot stocks:', error);
    return [];
  }
}

export function getStockPerformanceByCode(stockCode) {
  try {
    const stmt = db.prepare(`
      SELECT * FROM stock_performance_cache
      WHERE stock_code = ?
      ORDER BY last_updated DESC
      LIMIT 1
    `);
    return stmt.get(stockCode);
  } catch (error) {
    console.error('Error getting stock performance:', error);
    return null;
  }
}

export function clearOldStockPerformance(daysOld = 30) {
  try {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysOld);
    const cutoff = cutoffDate.toISOString();

    const stmt = db.prepare(`
      DELETE FROM stock_performance_cache
      WHERE last_updated < ? AND is_hot_stock = 0
    `);
    const result = stmt.run(cutoff);
    console.log(`Cleaned ${result.changes} old stock performance entries`);
    return true;
  } catch (error) {
    console.error('Error clearing old stock performance:', error);
    return false;
  }
}

export { generateUUID };
