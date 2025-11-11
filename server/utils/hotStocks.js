import { upsertStockPerformanceCache } from '../database/helpers.js';

const HOT_STOCK_CODES = [
  '7203',
  '9984',
  '6758',
  '8306',
  '9432',
  '6861',
  '4063'
];

async function fetchStockData(code) {
  try {
    const stockUrl = `https://kabutan.jp/stock/kabuka?code=${code}`;
    const response = await fetch(stockUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      signal: AbortSignal.timeout(15000)
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const html = await response.text();

    const codeMatch = html.match(/<h2><span class="inline-block">(\d+)<\/span>/);
    const nameMatch = html.match(/<h2><span class="inline-block">\d+<\/span><span class="fs0">　<\/span>([^<]+)<\/h2>/);
    const priceMatch = html.match(/<span class="kabuka">([0-9,]+(?:\.[0-9]+)?)円<\/span>/);
    const changeMatch = html.match(/<dt>前日比<\/dt>\s*<dd><span class="(up|down)">([^<]+)<\/span><\/dd>\s*<dd><span class="(?:up|down)">([^<]+)<\/span>/);

    if (!codeMatch || !nameMatch || !priceMatch) {
      return null;
    }

    return {
      code: codeMatch[1],
      name: nameMatch[1],
      price: priceMatch[1],
      change: changeMatch ? changeMatch[2] : '0',
      changePercent: changeMatch ? changeMatch[3] : '0',
      direction: changeMatch ? changeMatch[1] : 'neutral'
    };
  } catch (error) {
    console.error(`Error fetching hot stock ${code}:`, error.message);
    return null;
  }
}

function generatePrediction(stockData) {
  const changeNum = parseFloat(stockData.change.replace(/,/g, '').replace(/[^\d.-]/g, ''));
  const isUp = changeNum > 0;

  const predictionResult = isUp ?
    '昨日予測結果：株価の下落確率が高い' :
    '昨日予測結果：株価の上昇確率が高い';

  return {
    prediction_result: predictionResult,
    prediction_direction: isUp ? 'down' : 'up'
  };
}

export async function updateHotStocks() {
  console.log('Starting hot stocks update...');

  let successCount = 0;
  let failureCount = 0;

  for (const code of HOT_STOCK_CODES) {
    try {
      const stockData = await fetchStockData(code);

      if (!stockData) {
        console.error(`Failed to fetch data for hot stock ${code}`);
        failureCount++;
        continue;
      }

      const prediction = generatePrediction(stockData);

      const cacheData = {
        stock_code: stockData.code,
        stock_name: stockData.name,
        current_price: stockData.price,
        previous_price: stockData.price,
        price_change: stockData.change,
        change_percent: stockData.changePercent,
        prediction_result: prediction.prediction_result,
        prediction_direction: prediction.prediction_direction,
        prediction_accuracy: 0,
        is_hot_stock: 1
      };

      const success = upsertStockPerformanceCache(cacheData);

      if (success) {
        successCount++;
        console.log(`Updated hot stock ${stockData.code} - ${stockData.name}`);
      } else {
        failureCount++;
        console.error(`Failed to cache hot stock ${stockData.code}`);
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`Error processing hot stock ${code}:`, error.message);
      failureCount++;
    }
  }

  console.log(`Hot stocks update completed: ${successCount} succeeded, ${failureCount} failed`);
  return { successCount, failureCount };
}

export function startHotStocksScheduler() {
  updateHotStocks();

  const HOUR_IN_MS = 60 * 60 * 1000;
  setInterval(updateHotStocks, HOUR_IN_MS);

  console.log('Hot stocks scheduler started - will update every hour');
}
