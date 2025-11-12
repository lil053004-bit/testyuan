import { StockInfo } from '../types/stock';
import { TrendingUp, TrendingDown, Calendar } from 'lucide-react';
import { useState } from 'react';

interface FullWidthStockInfoCardProps {
  info: StockInfo;
}

export default function FullWidthStockInfoCard({ info }: FullWidthStockInfoCardProps) {
  const isPositive = !info.change.startsWith('-');
  const changeColor = isPositive ? 'text-green-400' : 'text-red-400';
  const bgGradient = isPositive
    ? 'from-green-500/10 to-transparent'
    : 'from-red-500/10 to-transparent';

  return (
    <div
      className="w-full bg-gradient-to-br from-navy-card/90 via-navy-card/80 to-blue-900/70 backdrop-blur-xl rounded-2xl border border-blue-border/40 shadow-2xl hover:shadow-blue-glow hover:-translate-y-1 transition-all duration-300 overflow-hidden animate-fade-in-up"
    >
      <div className={`bg-gradient-to-r ${bgGradient} p-6 md:p-8 border-b border-blue-border/30`}>
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-2">
            <span className="inline-flex items-center px-2 py-1 bg-blue-600/30 border border-blue-500/50 rounded-lg text-cyan-300 font-bold text-sm">
              {info.code}
            </span>
            <div className="text-xs text-blue-300/50">
              {info.timestamp}
            </div>
          </div>

          <div className="flex gap-2">
            <div className="flex-[75]">
              <h2 className="text-xl md:text-2xl font-bold text-white">
                {info.name}
              </h2>
            </div>
            <div className="flex-[25] flex items-center gap-1 text-xs text-blue-300/70">
              <span className="px-1.5 py-0.5 bg-blue-900/30 rounded truncate">{info.market}</span>
              <span className="hidden sm:inline">•</span>
              <span className="truncate">{info.industry}</span>
            </div>
          </div>

          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <div className="text-sm text-blue-300/60 mb-1">現在値</div>
              <div className="text-2xl md:text-4xl font-black text-white tracking-tight">
                ¥{info.price}
              </div>
            </div>
            <div className="flex-1">
              <div className="text-sm text-blue-300/60 mb-1">変動</div>
              <div className={`flex items-center gap-2 ${changeColor} text-lg md:text-xl font-bold`}>
                {isPositive ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                <span>{info.change}</span>
                <span className="text-base">({info.changePercent}%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8 relative">
        {info.earningsDate && <EarningsBadge date={info.earningsDate} />}

        <div className="grid grid-cols-3 gap-1">
          <InfoItem
            label="時価総額"
            value={`${info.marketCap}億円`}
            compact
          />
          <InfoItem
            label="PER"
            value={`${info.per}倍`}
            compact
          />
          <InfoItem
            label="PBR"
            value={`${info.pbr}倍`}
            compact
          />
          <InfoItem
            label="配当利回り"
            value={`${info.dividend}%`}
            compact
          />
          <InfoItem
            label="信用倍率"
            value={`${info.creditRatio}倍`}
            compact
          />
          <InfoItem
            label="単元株数"
            value={info.unit}
            compact
          />
          {info.ptsPrice && (
            <InfoItem
              label="PTS価格"
              value={`¥${info.ptsPrice}`}
              subValue={info.ptsTime}
              compact
            />
          )}
        </div>
      </div>
    </div>
  );
}

interface InfoItemProps {
  label: string;
  value: string;
  subValue?: string;
  compact?: boolean;
}

function InfoItem({ label, value, subValue, compact = false }: InfoItemProps) {
  return (
    <div
      className="bg-navy-card/50 backdrop-blur-sm rounded-lg p-1 border border-blue-border/20 hover:border-blue-border/40 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
    >
      <div className="text-[10px] text-blue-300/60 mb-1 font-medium uppercase tracking-wider">
        {label}
      </div>
      <div className={`font-bold text-white ${compact ? 'text-sm' : 'text-base'}`}>
        {value}
      </div>
      {subValue && (
        <div className="text-[10px] text-blue-300/50 mt-0.5">
          {subValue}
        </div>
      )}
    </div>
  );
}

interface EarningsBadgeProps {
  date: string;
}

function EarningsBadge({ date }: EarningsBadgeProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="absolute top-4 right-4 z-10">
      <div
        className="relative"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-green-600/20 border border-green-500/40 rounded-lg cursor-help transition-all hover:bg-green-600/30">
          <Calendar className="w-3.5 h-3.5 text-green-400" />
          <span className="text-xs font-semibold text-green-300">決算予定</span>
        </div>

        {showTooltip && (
          <div className="absolute top-full right-0 mt-2 px-3 py-2 bg-navy-card border border-blue-border/40 rounded-lg shadow-xl z-20 whitespace-nowrap">
            <div className="text-xs text-blue-300/60 mb-0.5">決算発表予定日</div>
            <div className="text-sm font-bold text-white">{date}</div>
          </div>
        )}
      </div>
    </div>
  );
}
