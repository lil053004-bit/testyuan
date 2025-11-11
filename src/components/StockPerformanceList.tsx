import { useState, useEffect } from 'react';

interface StockPerformanceItem {
  nameJp: string;
  code: string;
  prediction: string;
  todayChange: string;
  changePercent: string;
  isPositive: boolean;
}

const mockData: StockPerformanceItem[] = [
  {
    nameJp: '任天堂',
    code: '9432',
    prediction: '昨日予測結果：株価の下落確率が高い',
    todayChange: '-0.8%',
    changePercent: '-0.8%',
    isPositive: false
  },
  {
    nameJp: 'ソニー',
    code: '6758',
    prediction: '昨日予測結果：株価の下落確率が高い',
    todayChange: '-0.79%',
    changePercent: '-0.79%',
    isPositive: false
  },
  {
    nameJp: 'Apple Inc.',
    code: 'AAPL',
    prediction: '昨日予測結果：株価の上昇確率が高い',
    todayChange: '+1.08%',
    changePercent: '+1.08%',
    isPositive: true
  }
];

interface StockPerformanceListProps {
  data?: StockPerformanceItem[];
}

export default function StockPerformanceList({ data }: StockPerformanceListProps) {
  const performanceData = data && data.length > 0 ? data : mockData;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const itemHeight = 120;

  const doubledData = [...performanceData, ...performanceData];

  useEffect(() => {
    if (isPaused || performanceData.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = prev + 1;
        return next >= performanceData.length ? 0 : next;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused, performanceData.length]);

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
      <div className="bg-[#001a4d] text-white text-center py-3 px-4">
        <h2 className="text-xl font-bold">銘柄診断実績</h2>
      </div>

      <div
        className="relative overflow-hidden"
        style={{ height: `${itemHeight * 3}px` }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        <div
          className="transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateY(-${currentIndex * itemHeight}px)`,
          }}
        >
          {doubledData.map((item, index) => (
            <div
              key={index}
              className="p-4 border-b border-gray-200"
              style={{ height: `${itemHeight}px` }}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="text-lg font-semibold text-gray-800">{item.nameJp}</div>
                  <div className="text-sm text-gray-500">{item.code}</div>
                </div>
                <div className={`text-lg font-bold ${item.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {item.todayChange}
                </div>
              </div>
              <div className="text-sm">
                <span className={item.isPositive ? 'text-red-600' : 'text-green-600'}>
                  {item.prediction}
                </span>
              </div>
              <div className="text-xs text-gray-600 mt-1">
                今日株価変動：<span className={item.isPositive ? 'text-green-600' : 'text-red-600'}>{item.changePercent}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
