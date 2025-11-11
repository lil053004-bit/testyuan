import { TrendingUp, TrendingDown, Calendar, Building2 } from 'lucide-react';
import { StockInfo } from '../types/stock';

interface CompactStockInfoProps {
  info: StockInfo;
}

export default function CompactStockInfo({ info }: CompactStockInfoProps) {
  const isPositive = info.change.includes('+');
  const changeColor = isPositive ? 'text-green-600' : info.change === '0.0' ? 'text-gray-600' : 'text-red-600';
  const changeBgColor = isPositive ? 'bg-green-50' : info.change === '0.0' ? 'bg-gray-50' : 'bg-red-50';

  return (
    <div className="bg-dark-secondary rounded-xl shadow-red-glow overflow-hidden border-2 border-accent-red/30 h-full flex flex-col">
      <div className="bg-gradient-to-r from-accent-red to-accent-red-dark px-2 py-2 shrink-0">
        <div className="space-y-1.5">
          {/* Market Badge */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-500 rounded shadow-lg">
              <span className="text-[10px] font-bold text-white truncate">{info.market}</span>
            </div>
          </div>

          {/* Stock Code */}
          <div className="bg-black/30 backdrop-blur-sm px-2 py-1 rounded border border-white/20">
            <h1 className="text-sm font-bold text-white text-center truncate" title={info.code}>{info.code}</h1>
          </div>

          {/* Stock Name */}
          <div className="bg-black/20 backdrop-blur-sm px-2 py-1 rounded border border-white/10">
            <h2 className="text-[10px] font-bold text-white text-center truncate" title={info.name}>{info.name}</h2>
          </div>

          {/* Price */}
          <div className="text-center">
            <div className="text-[10px] text-gray-300 font-medium mb-0.5">現在値</div>
            <div className="text-base font-bold text-white truncate">¥{info.price}</div>
          </div>

          {/* Change */}
          <div className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded ${changeBgColor}`}>
            {isPositive ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            <div className="text-center">
              <div className={`text-xs font-bold ${changeColor} truncate`}>
                {info.change}
              </div>
              <div className={`text-[10px] font-semibold ${changeColor} truncate`}>
                ({info.changePercent}%)
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-2 py-2 flex-1 overflow-y-auto">
        <div className="space-y-1.5">
            <div className="bg-dark-card rounded p-1 border border-gray-700">
              <div className="text-[9px] text-gray-400 font-semibold mb-0.5 text-center truncate">PER</div>
              <div className="text-xs font-bold text-white text-center truncate">{info.per}<span className="text-[10px]">倍</span></div>
            </div>

            <div className="bg-dark-card rounded p-1 border border-gray-700">
              <div className="text-[9px] text-gray-400 font-semibold mb-0.5 text-center truncate">PBR</div>
              <div className="text-xs font-bold text-white text-center truncate">{info.pbr}<span className="text-[10px]">倍</span></div>
            </div>

            <div className="bg-dark-card rounded p-1 border border-gray-700">
              <div className="text-[9px] text-gray-400 font-semibold mb-0.5 text-center truncate">配当</div>
              <div className="text-xs font-bold text-white text-center truncate">{info.dividend}<span className="text-[10px]">%</span></div>
            </div>

            <div className="bg-dark-card rounded p-1 border border-gray-700">
              <div className="text-[9px] text-gray-400 font-semibold mb-0.5 text-center truncate">信用</div>
              <div className="text-xs font-bold text-white text-center truncate">{info.creditRatio}<span className="text-[10px]">倍</span></div>
            </div>

            <div className="bg-dark-card rounded p-1 border border-gray-700">
              <div className="text-[9px] text-gray-400 font-semibold mb-0.5 text-center truncate">時価</div>
              <div className="text-[10px] font-bold text-white text-center truncate">{info.marketCap}<span className="text-[9px]">億</span></div>
            </div>

            <div className="bg-dark-card rounded p-1 border border-gray-700">
              <div className="text-[9px] text-gray-400 font-semibold mb-0.5 text-center truncate">単位</div>
              <div className="text-[10px] font-bold text-white text-center truncate">{info.unit}</div>
            </div>

            <div className="bg-dark-card rounded p-1 border border-gray-700 border-t-2 border-t-gray-600">
              <div className="text-[9px] text-gray-400 font-semibold mb-0.5 text-center truncate">業種</div>
              <div className="text-[10px] font-bold text-accent-red text-center truncate" title={info.industry}>{info.industry}</div>
            </div>

            {info.earningsDate && (
              <div className="bg-dark-card rounded p-1 border border-gray-700">
                <div className="text-[9px] text-gray-400 font-semibold mb-0.5 text-center truncate">決算</div>
                <div className="text-[10px] font-bold text-gray-200 text-center truncate">{info.earningsDate}</div>
              </div>
            )}

            {info.ptsPrice && (
              <div className="bg-dark-card rounded p-1 border border-yellow-500/30">
                <div className="text-[9px] text-yellow-400 font-semibold mb-0.5 text-center truncate">PTS</div>
                <div className="text-xs font-bold text-white text-center truncate">¥{info.ptsPrice}</div>
                <div className="text-[9px] text-gray-400 text-center truncate">{info.ptsTime}</div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
