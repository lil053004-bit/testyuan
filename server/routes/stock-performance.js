import express from 'express';
import { getHotStocks, upsertStockPerformanceCache } from '../database/helpers.js';

const router = express.Router();

async function fetchStockData(code) {
  try {
    const stockUrl = `https://kabutan.jp/stock/kabuka?code=${code}`;
    const response = await fetch(stockUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      signal: AbortSignal.timeout(10000)
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
    console.error(`Error fetching stock ${code}:`, error.message);
    return null;
  }
}

function calculatePrediction(stockData) {
  const changeNum = parseFloat(stockData.change.replace(/,/g, '').replace(/[^\d.-]/g, ''));
  const isPositive = changeNum > 0;

  const prediction = isPositive ?
    '昨日予測結果：株価の上昇確率が高い' :
    '昨日予測結果：株価の下落確率が高い';

  return {
    prediction,
    todayChange: stockData.changePercent,
    changePercent: stockData.changePercent,
    isPositive: !isPositive
  };
}

router.post('/related-performance', async (req, res) => {
  try {
    const { stockCodes } = req.body;

    if (!stockCodes || !Array.isArray(stockCodes)) {
      return res.status(400).json({ error: 'stockCodes array is required' });
    }

    const results = await Promise.allSettled(
      stockCodes.map(code => fetchStockData(code))
    );

    const performanceData = results
      .filter(result => result.status === 'fulfilled' && result.value !== null)
      .map(result => {
        const stockData = result.value;
        const prediction = calculatePrediction(stockData);

        return {
          nameJp: stockData.name,
          code: stockData.code,
          prediction: prediction.prediction,
          todayChange: prediction.todayChange,
          changePercent: prediction.changePercent,
          isPositive: prediction.isPositive
        };
      });

    res.json({ success: true, data: performanceData });
  } catch (error) {
    console.error('Error in related-performance endpoint:', error);
    res.status(500).json({
      error: 'Internal server error',
      details: error.message
    });
  }
});

router.get('/hot-stocks', async (req, res) => {
  try {
    const hotStocks = getHotStocks(7);

    const performanceData = hotStocks.map(stock => ({
      nameJp: stock.stock_name,
      code: stock.stock_code,
      prediction: stock.prediction_result,
      todayChange: stock.change_percent,
      changePercent: stock.change_percent,
      isPositive: stock.prediction_direction === 'up'
    }));

    res.json({ success: true, data: performanceData });
  } catch (error) {
    console.error('Error in hot-stocks endpoint:', error);
    res.status(500).json({
      error: 'Internal server error',
      details: error.message
    });
  }
});

export default router;
