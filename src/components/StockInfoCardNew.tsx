import { StockInfo } from '../types/stock';

interface StockInfoCardNewProps {
  info: StockInfo;
  isPlaceholder?: boolean;
}

export default function StockInfoCardNew({ info, isPlaceholder = false }: StockInfoCardNewProps) {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative">
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 1 }}
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#00ffff" stopOpacity="1" />
              <stop offset="100%" stopColor="#0099ff" stopOpacity="0.8" />
            </linearGradient>
            <filter id="borderGlow">
              <feGaussianBlur stdDeviation="0.5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <path
            d="M 2 10 L 2 2 L 35 2 L 40 5 L 60 5 L 65 2 L 98 2 L 98 98 L 2 98 Z"
            fill="none"
            stroke="url(#borderGradient)"
            strokeWidth="0.5"
            filter="url(#borderGlow)"
          />
          <line x1="0" y1="0" x2="3" y2="3" stroke="#00d4ff" strokeWidth="0.3" opacity="0.8" />
          <line x1="97" y1="0" x2="100" y2="3" stroke="#00d4ff" strokeWidth="0.3" opacity="0.8" />
          <line x1="0" y1="97" x2="3" y2="100" stroke="#00d4ff" strokeWidth="0.3" opacity="0.8" />
          <line x1="97" y1="97" x2="100" y2="100" stroke="#00d4ff" strokeWidth="0.3" opacity="0.8" />
        </svg>

        <div
          className={`relative bg-[#001a4d]/60 backdrop-blur-sm rounded-lg overflow-hidden`}
          style={{
            boxShadow: isPlaceholder ?
              '0 0 20px rgba(255, 68, 68, 0.3), inset 0 0 20px rgba(255, 68, 68, 0.1)' :
              '0 0 20px rgba(0, 212, 255, 0.3), inset 0 0 20px rgba(0, 212, 255, 0.1)',
            zIndex: 0
          }}
        >
          <div className="flex">
            <div className="flex-1 flex items-center justify-center border-r border-cyan-400/30 py-8 px-4">
              <div className="space-y-3 w-full">
                <div className="text-center">
                  <div className={`text-lg font-bold ${
                    isPlaceholder ? 'text-gray-500' : 'text-white'
                  }`}>
                    {info.name.length > 4 ? info.name.substring(0, 4) : info.name}
                    <span className="ml-1 text-sm font-medium text-cyan-300">({info.code})</span>
                  </div>
                </div>

                <div className="text-center">
                  <div className={`text-3xl font-bold flex items-center justify-center gap-2 ${
                    isPlaceholder ? 'text-gray-500' : 'text-white'
                  }`}>
                    ¥{info.price}
                    <svg width="16" height="20" viewBox="0 0 16 20" fill="none" className="flex-shrink-0">
                      <path
                        d={info.change.startsWith('-') ? "M8 20L8 4M8 4L4 8M8 4L12 8" : "M8 0L8 16M8 16L4 12M8 16L12 12"}
                        stroke={info.change.startsWith('-') ? "#22c55e" : "#ef4444"}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>

                <div className="text-center space-y-0.5">
                  <div className={`text-sm font-semibold ${
                    info.change.startsWith('-') ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {info.change}
                  </div>
                  <div className={`text-xs font-medium ${
                    info.change.startsWith('-') ? 'text-green-400/80' : 'text-red-400/80'
                  }`}>
                    前日比 {info.changePercent}%
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-[2] py-4 px-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="text-center">
                  <div className="text-white mb-1 font-medium">始値</div>
                  <div className={`font-semibold ${
                    isPlaceholder ? 'text-gray-500' : 'text-white'
                  }`}>{info.price || '---'}</div>
                </div>
                <div className="text-center">
                  <div className="text-white mb-1 font-medium">高値</div>
                  <div className={`font-semibold ${
                    isPlaceholder ? 'text-gray-500' : 'text-white'
                  }`}>{info.price || '---'}</div>
                </div>

                <div className="text-center border-t border-cyan-400/20 pt-3">
                  <div className="text-white mb-1 font-medium">前日終値</div>
                  <div className={`font-semibold ${
                    isPlaceholder ? 'text-gray-500' : 'text-white'
                  }`}>{info.price || '---'}</div>
                </div>
                <div className="text-center border-t border-cyan-400/20 pt-3">
                  <div className="text-white mb-1 font-medium">安値</div>
                  <div className={`font-semibold ${
                    isPlaceholder ? 'text-gray-500' : 'text-white'
                  }`}>{info.price || '---'}</div>
                </div>

                <div className="text-center border-t border-cyan-400/20 pt-3">
                  <div className="text-white mb-1 font-medium">調整終値</div>
                  <div className={`font-semibold ${
                    isPlaceholder ? 'text-gray-500' : 'text-white'
                  }`}>---</div>
                </div>
                <div className="text-center border-t border-cyan-400/20 pt-3">
                  <div className="text-white mb-1 font-medium">売買高</div>
                  <div className={`font-semibold ${
                    isPlaceholder ? 'text-gray-500' : 'text-white'
                  }`}>---</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
