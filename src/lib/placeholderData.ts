import { StockData, StockInfo, StockPrice } from '../types/stock';

export const createPlaceholderStockInfo = (code?: string): StockInfo => ({
  code: code || '----',
  name: 'データ取得に失敗しました',
  market: '---',
  price: '---',
  change: '0.0',
  changePercent: '0.0',
  timestamp: '---',
  ptsPrice: undefined,
  ptsTime: undefined,
  industry: '---',
  unit: '---',
  per: '---',
  pbr: '---',
  dividend: '---',
  creditRatio: '---',
  marketCap: '---',
  earningsDate: undefined,
});

export const createPlaceholderStockData = (code?: string): StockData => ({
  info: createPlaceholderStockInfo(code),
  prices: [],
});

export const isPlaceholderData = (stockData: StockData | null): boolean => {
  if (!stockData) return true;
  return stockData.info.name === 'データ取得に失敗しました';
};
