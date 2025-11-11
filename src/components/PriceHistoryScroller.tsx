import { TrendingUp, TrendingDown } from 'lucide-react';
import { StockPrice } from '../types/stock';
import { useEffect, useState } from 'react';

interface PriceHistoryScrollerProps {
  prices: StockPrice[];
  stockCode: string;
}

export default function PriceHistoryScroller({ prices, stockCode }: PriceHistoryScrollerProps) {
  const [isPaused, setIsPaused] = useState(false);

  if (!prices || prices.length === 0) {
    return null;
  }

  const latestPrice = parseFloat(prices[0].close.replace(/,/g, ''));

  const formatVolume = (volume: string): string => {
    const num = parseInt(volume.replace(/,/g, ''));
    if (num >= 100000000) {
      return `${(num / 100000000).toFixed(1)}億`;
    } else if (num >= 10000) {
      return `${(num / 10000).toFixed(1)}万`;
    }
    return volume;
  };

  const formatDate = (dateStr: string): string => {
    const match = dateStr.match(/(\d{4})\/(\d{1,2})\/(\d{1,2})/);
    if (match) {
      return `${match[2]}/${match[3]}`;
    }
    return dateStr;
  };

  const duplicatedPrices = [...prices, ...prices];

  return (
    <div className="w-full bg-gradient-to-br from-navy-card/90 via-navy-card/80 to-blue-900/70 backdrop-blur-xl rounded-2xl border border-blue-border/40 shadow-2xl overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600/20 to-transparent p-4 border-b border-blue-border/30">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <span className="inline-flex items-center px-2 py-1 bg-blue-600/30 border border-blue-500/50 rounded-lg text-cyan-300 font-bold text-sm">
            {stockCode}
          </span>
          <span>価格履歴</span>
        </h3>
        <p className="text-xs text-blue-300/60 mt-1">過去の価格推移</p>
      </div>

      <div
        className="relative h-[300px] overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className={`space-y-2 p-4 ${isPaused ? '' : 'animate-scroll-up'}`}
          style={{
            animationPlayState: isPaused ? 'paused' : 'running'
          }}
        >
          {duplicatedPrices.map((price, index) => {
            const changePercent = parseFloat(price.changePercent);
            const isPositive = changePercent >= 0;
            const changeColor = isPositive ? 'text-green-400' : 'text-red-400';
            const bgGradient = isPositive
              ? 'from-green-500/5 to-transparent'
              : 'from-red-500/5 to-transparent';

            const comparison = {
              changePercent: price.changePercent,
              isPositive
            };

            return (
              <div
                key={`${price.date}-${index}`}
                className={`bg-gradient-to-r ${bgGradient} bg-navy-card/50 backdrop-blur-sm rounded-lg p-3 border border-blue-border/20 hover:border-blue-border/40 transition-all duration-200`}
              >
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  <div>
                    <div className="text-xs text-blue-300/60 mb-0.5">日付</div>
                    <div className="text-sm font-bold text-white whitespace-nowrap">
                      {formatDate(price.date)}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs text-blue-300/60 mb-0.5">終値</div>
                    <div className="text-base font-bold text-white">
                      ¥{price.close}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-blue-300/60 mb-0.5">変動</div>
                    <div className={`flex items-center gap-1 ${changeColor} text-sm font-bold`}>
                      {comparison.isPositive ? (
                        <TrendingUp className="w-3.5 h-3.5" />
                      ) : (
                        <TrendingDown className="w-3.5 h-3.5" />
                      )}
                      <span>{comparison.isPositive ? '+' : ''}{comparison.changePercent}%</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs text-blue-300/60 mb-0.5">出来高</div>
                    <div className="text-sm font-semibold text-blue-300">
                      {formatVolume(price.volume)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-navy-card/90 to-transparent pointer-events-none"></div>
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-navy-card/90 to-transparent pointer-events-none"></div>
      </div>

      <div className="px-4 py-2 bg-blue-600/10 border-t border-blue-border/30 text-center">
        <p className="text-xs text-blue-300/60">ホバーして一時停止</p>
      </div>
    </div>
  );
}
