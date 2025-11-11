import StockChart from './StockChart';
import { StockPrice } from '../types/stock';

interface ChartTabsProps {
  prices: StockPrice[];
}

export default function ChartTabs({ prices }: ChartTabsProps) {
  return (
    <div className="relative z-10 bg-gradient-to-br from-slate-900/80 to-blue-900/80 backdrop-blur-xl rounded-2xl border border-blue-600/30 shadow-2xl overflow-hidden">
      <div className="border-b border-blue-800/30 px-6 py-4">
        <h3 className="text-lg font-bold text-cyan-300">価格推移</h3>
      </div>

      <div className="p-6">
        <StockChart prices={prices} />
      </div>
    </div>
  );
}
