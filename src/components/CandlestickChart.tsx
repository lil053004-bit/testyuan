import { useMemo, useState } from 'react';
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  BarChart,
} from 'recharts';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { StockPrice } from '../types/stock';

interface CandlestickChartProps {
  prices: StockPrice[];
}

export default function CandlestickChart({ prices }: CandlestickChartProps) {
  const [showVolume, setShowVolume] = useState(false);
  const [dataRange, setDataRange] = useState<'7d' | '30d' | 'all'>('30d');

  const chartData = useMemo(() => {
    const rangeMap = {
      '7d': 7,
      '30d': 30,
      'all': prices.length,
    };

    const limit = rangeMap[dataRange];
    return prices.slice(0, limit).reverse().map(price => {
      const open = parseFloat(price.open.replace(/,/g, ''));
      const close = parseFloat(price.close.replace(/,/g, ''));
      const high = parseFloat(price.high.replace(/,/g, ''));
      const low = parseFloat(price.low.replace(/,/g, ''));
      const volume = parseInt(price.volume.replace(/,/g, ''));

      return {
        date: price.date,
        open,
        close,
        high,
        low,
        volume,
        bodyTop: Math.max(open, close),
        bodyBottom: Math.min(open, close),
        bodyHeight: Math.abs(close - open),
        wickTop: high,
        wickBottom: low,
        isPositive: close >= open,
        change: price.change,
      };
    });
  }, [prices, dataRange]);

  const priceStats = useMemo(() => {
    const closes = chartData.map(d => d.close);
    const high = Math.max(...chartData.map(d => d.high));
    const low = Math.min(...chartData.map(d => d.low));
    const avg = closes.reduce((a, b) => a + b, 0) / closes.length;

    return { high, low, avg };
  }, [chartData]);

  const CustomCandlestick = (props: any) => {
    const { x, y, width, height, index } = props;
    const data = chartData[index];

    if (!data) return null;

    const yScale = height / (priceStats.high - priceStats.low);
    const getY = (price: number) => y + height - ((price - priceStats.low) * yScale);

    const bodyTop = getY(data.bodyTop);
    const bodyBottom = getY(data.bodyBottom);
    const wickTop = getY(data.wickTop);
    const wickBottom = getY(data.wickBottom);

    const bodyHeight = Math.max(bodyBottom - bodyTop, 1);
    const wickX = x + width / 2;

    const color = data.isPositive ? '#10b981' : '#ef4444';
    const fillColor = data.isPositive ? '#10b981' : '#ef4444';

    return (
      <g>
        <line
          x1={wickX}
          y1={wickTop}
          x2={wickX}
          y2={bodyTop}
          stroke={color}
          strokeWidth={1}
        />
        <rect
          x={x + width * 0.2}
          y={bodyTop}
          width={width * 0.6}
          height={bodyHeight}
          fill={fillColor}
          stroke={color}
          strokeWidth={1}
          opacity={data.isPositive ? 0.8 : 1}
        />
        <line
          x1={wickX}
          y1={bodyBottom}
          x2={wickX}
          y2={wickBottom}
          stroke={color}
          strokeWidth={1}
        />
      </g>
    );
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload[0]) {
      const data = payload[0].payload;
      return (
        <div className="bg-gray-900/95 backdrop-blur-sm border border-blue-500/50 rounded-lg p-4 shadow-xl">
          <p className="text-white font-semibold mb-2">{data.date}</p>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-gray-400">始値:</span>
              <span className="text-white font-medium">¥{data.open.toLocaleString()}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-gray-400">高値:</span>
              <span className="text-green-400 font-medium">¥{data.high.toLocaleString()}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-gray-400">安値:</span>
              <span className="text-red-400 font-medium">¥{data.low.toLocaleString()}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-gray-400">終値:</span>
              <span className="text-white font-bold">¥{data.close.toLocaleString()}</span>
            </div>
            <div className="flex justify-between gap-4 pt-1 border-t border-gray-700">
              <span className="text-gray-400">前日比:</span>
              <span className={data.isPositive ? 'text-green-400 font-medium' : 'text-red-400 font-medium'}>
                {data.change}
              </span>
            </div>
            {showVolume && (
              <div className="flex justify-between gap-4">
                <span className="text-gray-400">出来高:</span>
                <span className="text-blue-300 font-medium">{data.volume.toLocaleString()}</span>
              </div>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl border border-gray-700 overflow-hidden shadow-2xl">
      <div className="p-4">
        <div className="flex items-center justify-end gap-2 mb-4">
          <button
            onClick={() => setDataRange('7d')}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
              dataRange === '7d'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            7日
          </button>
          <button
            onClick={() => setDataRange('30d')}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
              dataRange === '30d'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            30日
          </button>
          <button
            onClick={() => setDataRange('all')}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
              dataRange === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            全期間
          </button>
        </div>

        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: '#9ca3af' }}
              stroke="#4b5563"
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis
              yAxisId="price"
              domain={[priceStats.low * 0.99, priceStats.high * 1.01]}
              tick={{ fontSize: 11, fill: '#9ca3af' }}
              stroke="#4b5563"
              tickFormatter={(value) => `¥${value.toLocaleString()}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              yAxisId="price"
              dataKey="high"
              shape={<CustomCandlestick />}
              isAnimationActive={true}
            />
          </ComposedChart>
        </ResponsiveContainer>

        {showVolume && (
          <div className="mt-6">
            <h4 className="text-sm font-semibold text-gray-400 mb-3">出来高</h4>
            <ResponsiveContainer width="100%" height={120}>
              <BarChart data={chartData} margin={{ top: 0, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 11, fill: '#9ca3af' }}
                  stroke="#4b5563"
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: '#9ca3af' }}
                  stroke="#4b5563"
                  tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #4b5563',
                    borderRadius: '8px',
                  }}
                  formatter={(value: any) => [value.toLocaleString(), '出来高']}
                />
                <Bar dataKey="volume">
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.isPositive ? '#10b981' : '#ef4444'} opacity={0.8} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span>上昇</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span>下降</span>
            </div>
          </div>

          <button
            onClick={() => setShowVolume(!showVolume)}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-700 text-gray-300 hover:bg-gray-600 transition-all"
          >
            {showVolume ? '出来高を非表示' : '出来高を表示'}
          </button>
        </div>
      </div>
    </div>
  );
}
