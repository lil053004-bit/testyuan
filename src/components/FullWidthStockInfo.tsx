import { TrendingUp, TrendingDown, Building2, Calendar, Package } from 'lucide-react';
import { StockInfo } from '../types/stock';

interface FullWidthStockInfoProps {
  info: StockInfo;
}

export default function FullWidthStockInfo({ info }: FullWidthStockInfoProps) {
  const isPositive = info.change.includes('+');
  const changeColor = isPositive ? 'text-green-400' : info.change === '0.0' ? 'text-gray-400' : 'text-red-400';
  const changeBgColor = isPositive ? 'bg-green-900/30' : info.change === '0.0' ? 'bg-gray-900/30' : 'bg-red-900/30';
  const changeBorderColor = isPositive ? 'border-green-500/40' : info.change === '0.0' ? 'border-gray-500/40' : 'border-red-500/40';

  return (
    <div className="bg-dark-secondary rounded-2xl shadow-red-glow overflow-hidden border-2 border-accent-red/40">
      <div className="bg-gradient-to-r from-accent-red to-accent-red-dark px-6 py-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg shadow-lg">
              <span className="text-sm font-bold text-white">{info.market}</span>
            </div>

            <div className="flex flex-col">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                {info.code}
              </div>
              <div className="text-base md:text-lg font-semibold text-white/90">
                {info.name}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end gap-3">
            <div className="text-right">
              <div className="text-sm text-white/70 mb-1">現在値 <span className="text-xs">({info.timestamp})</span></div>
              <div className="text-4xl md:text-5xl font-bold text-white">
                ¥{info.price}
              </div>
            </div>

            <div className={`flex items-center gap-3 px-5 py-2.5 rounded-lg ${changeBgColor} border-2 ${changeBorderColor}`}>
              {isPositive ? (
                <TrendingUp className="w-6 h-6 text-green-400" />
              ) : (
                <TrendingDown className="w-6 h-6 text-red-400" />
              )}
              <div className="flex items-baseline gap-2">
                <span className={`text-2xl font-bold ${changeColor}`}>
                  {info.change}
                </span>
                <span className={`text-lg font-semibold ${changeColor}`}>
                  ({info.changePercent}%)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {info.ptsPrice && (
        <div className="px-6 py-4 bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border-b-2 border-yellow-500/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-yellow-400 uppercase tracking-wide">PTS取引</span>
              <span className="text-2xl md:text-3xl font-bold text-yellow-300">¥{info.ptsPrice}</span>
            </div>
            <div className="text-sm text-yellow-300/70 font-medium">{info.ptsTime}</div>
          </div>
        </div>
      )}

      <div className="px-6 py-6 bg-dark-card/50">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-dark-secondary rounded-xl p-4 border-2 border-gray-700 hover:border-accent-red/50 transition-all">
            <div className="text-xs text-gray-400 font-semibold mb-2 uppercase tracking-wide">PER</div>
            <div className="text-2xl md:text-3xl font-bold text-white">{info.per}<span className="text-lg text-gray-400 ml-1">倍</span></div>
          </div>

          <div className="bg-dark-secondary rounded-xl p-4 border-2 border-gray-700 hover:border-accent-red/50 transition-all">
            <div className="text-xs text-gray-400 font-semibold mb-2 uppercase tracking-wide">PBR</div>
            <div className="text-2xl md:text-3xl font-bold text-white">{info.pbr}<span className="text-lg text-gray-400 ml-1">倍</span></div>
          </div>

          <div className="bg-dark-secondary rounded-xl p-4 border-2 border-gray-700 hover:border-accent-red/50 transition-all">
            <div className="text-xs text-gray-400 font-semibold mb-2 uppercase tracking-wide">配当利回り</div>
            <div className="text-2xl md:text-3xl font-bold text-white">{info.dividend}<span className="text-lg text-gray-400 ml-1">%</span></div>
          </div>

          <div className="bg-dark-secondary rounded-xl p-4 border-2 border-gray-700 hover:border-accent-red/50 transition-all">
            <div className="text-xs text-gray-400 font-semibold mb-2 uppercase tracking-wide">信用倍率</div>
            <div className="text-2xl md:text-3xl font-bold text-white">{info.creditRatio}<span className="text-lg text-gray-400 ml-1">倍</span></div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-dark-secondary rounded-xl p-4 border border-gray-700 flex items-center gap-3">
            <div className="bg-accent-red/20 p-2.5 rounded-lg">
              <Building2 className="w-5 h-5 text-accent-red" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-gray-400 font-semibold mb-1">業種</div>
              <div className="text-base font-bold text-accent-red truncate" title={info.industry}>{info.industry}</div>
            </div>
          </div>

          <div className="bg-dark-secondary rounded-xl p-4 border border-gray-700 flex items-center gap-3">
            <div className="bg-blue-500/20 p-2.5 rounded-lg">
              <Package className="w-5 h-5 text-blue-400" />
            </div>
            <div className="flex-1">
              <div className="text-xs text-gray-400 font-semibold mb-1">時価総額</div>
              <div className="text-base font-bold text-white">{info.marketCap}<span className="text-sm text-gray-400 ml-1">億円</span></div>
            </div>
          </div>

          <div className="bg-dark-secondary rounded-xl p-4 border border-gray-700 flex items-center gap-3">
            <div className="bg-purple-500/20 p-2.5 rounded-lg">
              <Package className="w-5 h-5 text-purple-400" />
            </div>
            <div className="flex-1">
              <div className="text-xs text-gray-400 font-semibold mb-1">売買単位</div>
              <div className="text-base font-bold text-white">{info.unit}</div>
            </div>
          </div>
        </div>

        {info.earningsDate && (
          <div className="mt-4 bg-dark-secondary rounded-xl p-4 border border-gray-700 flex items-center gap-3">
            <div className="bg-green-500/20 p-2.5 rounded-lg">
              <Calendar className="w-5 h-5 text-green-400" />
            </div>
            <div className="flex-1">
              <div className="text-xs text-gray-400 font-semibold mb-1">決算発表予定</div>
              <div className="text-base font-bold text-white">{info.earningsDate}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
