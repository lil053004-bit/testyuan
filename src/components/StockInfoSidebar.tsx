import { StockInfo } from '../types/stock';

interface InfoCardProps {
  label: string;
  value: string;
  delay?: number;
}

function InfoCard({ label, value, delay = 0 }: InfoCardProps) {
  return (
    <div
      className="bg-navy-card/80 backdrop-blur-sm border border-blue-border/30 rounded-lg p-3 hover:shadow-blue-glow hover:-translate-y-1 transition-all duration-300 animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="text-xs text-blue-300/70 mb-1 font-medium truncate">{label}</div>
      <div className="text-lg font-bold text-white truncate" title={value}>{value}</div>
    </div>
  );
}

interface StockInfoSidebarProps {
  info: StockInfo;
}

export default function StockInfoSidebar({ info }: StockInfoSidebarProps) {
  const cards = [
    { label: '銘柄コード', value: info.code },
    { label: '時価総額', value: info.marketCap },
    { label: 'PER', value: `${info.per}倍` },
    { label: 'PBR', value: `${info.pbr}倍` },
    { label: '配当利回り', value: info.dividend },
    { label: '業種', value: info.industry },
  ];

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl border border-gray-700 overflow-hidden shadow-2xl">
      <div className="bg-gradient-to-r from-blue-900/50 to-indigo-900/50 px-4 py-3 border-b border-gray-700">
        <h3 className="text-base font-bold text-white truncate">株式情報</h3>
      </div>
      <div className="flex-1 p-4 space-y-2 overflow-y-auto">
        {cards.map((card, index) => (
          <InfoCard
            key={index}
            label={card.label}
            value={card.value}
            delay={index * 100}
          />
        ))}
      </div>
    </div>
  );
}
