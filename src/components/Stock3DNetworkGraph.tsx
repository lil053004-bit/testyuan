import { useState, useMemo } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { StockPrice } from '../types/stock';

interface Stock3DNetworkGraphProps {
  prices: StockPrice[];
}

export default function Stock3DNetworkGraph({ prices }: Stock3DNetworkGraphProps) {
  const [rotation, setRotation] = useState(0);

  const chartData = useMemo(() => {
    return prices.slice(0, 30).reverse().map((price, index) => {
      const closePrice = parseFloat(price.close.replace(/,/g, ''));
      const volume = parseInt(price.volume.replace(/,/g, ''));
      const change = parseFloat(price.change.replace(/,/g, ''));

      const angle = (index * 12 * Math.PI) / 180 + (rotation * Math.PI) / 180;
      const radius = 50 + (index * 5);

      return {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        z: volume / 1000000,
        price: closePrice,
        date: price.date,
        volume: price.volume,
        change: change,
        isPositive: change >= 0,
      };
    });
  }, [prices, rotation]);

  return (
    <div className="relative w-full h-[400px] bg-navy-card/40 backdrop-blur-sm border border-blue-border/20 rounded-2xl p-6 overflow-hidden">
      <div className="absolute top-4 left-4 z-10">
        <div className="bg-navy-card/90 backdrop-blur-sm border border-blue-border/30 rounded-lg px-4 py-2">
          <h3 className="text-sm font-bold text-ai-blue-light mb-1">株価ネットワーク分析</h3>
          <p className="text-xs text-blue-300/70">過去30日間のデータ可視化</p>
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute w-64 h-64 border border-blue-border/20 rounded-full animate-pulse" />
        <div className="absolute w-48 h-48 border border-blue-border/30 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute w-32 h-32 border border-blue-border/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />

        <div
          className="absolute w-3 h-3 bg-ai-blue-light rounded-full shadow-blue-glow animate-pulse"
          style={{ animationDelay: '0.3s' }}
        />
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 50, right: 50, bottom: 50, left: 50 }}>
          <XAxis
            type="number"
            dataKey="x"
            domain={[-200, 200]}
            hide
          />
          <YAxis
            type="number"
            dataKey="y"
            domain={[-200, 200]}
            hide
          />
          <ZAxis
            type="number"
            dataKey="z"
            range={[50, 400]}
          />
          <Tooltip
            cursor={{ strokeDasharray: '3 3' }}
            contentStyle={{
              backgroundColor: 'rgba(32, 40, 71, 0.95)',
              border: '1px solid rgba(74, 144, 226, 0.5)',
              borderRadius: '8px',
              backdropFilter: 'blur(8px)',
              color: '#fff',
            }}
            formatter={(value: any, name: string) => {
              if (name === 'price') return [`¥${value.toLocaleString()}`, '株価'];
              if (name === 'volume') return [value, '出来高'];
              if (name === 'date') return [value, '日付'];
              return [value, name];
            }}
          />
          <Scatter data={chartData}>
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.isPositive ? '#06C755' : '#ef4444'}
                opacity={0.8}
              />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>

      {chartData.map((point, index) => {
        if (index === 0 || index === chartData.length - 1 || index % 5 === 0) {
          return null;
        }

        const prevPoint = chartData[index - 1];
        const centerX = 50;
        const centerY = 50;

        return (
          <svg
            key={`line-${index}`}
            className="absolute inset-0 pointer-events-none"
            style={{ width: '100%', height: '100%' }}
          >
            <line
              x1={`${centerX + (prevPoint.x / 4)}%`}
              y1={`${centerY + (prevPoint.y / 4)}%`}
              x2={`${centerX + (point.x / 4)}%`}
              y2={`${centerY + (point.y / 4)}%`}
              stroke="rgba(74, 144, 226, 0.2)"
              strokeWidth="1"
            />
          </svg>
        );
      })}

      <div className="absolute bottom-4 right-4 flex gap-2">
        <button
          onClick={() => setRotation((prev) => prev - 15)}
          className="bg-navy-card/90 hover:bg-navy-card border border-blue-border/30 hover:border-blue-border/50 text-white rounded-lg px-3 py-2 text-sm font-semibold transition-all"
        >
          ← 回転
        </button>
        <button
          onClick={() => setRotation((prev) => prev + 15)}
          className="bg-navy-card/90 hover:bg-navy-card border border-blue-border/30 hover:border-blue-border/50 text-white rounded-lg px-3 py-2 text-sm font-semibold transition-all"
        >
          回転 →
        </button>
      </div>
    </div>
  );
}
