interface HeaderProps {
  isHidden?: boolean;
}

export default function Header({ isHidden = false }: HeaderProps) {
  return (
    <header className={`relative z-20 bg-[#1e2747] border-b border-[#2a3352] transition-all duration-300 ${isHidden ? 'opacity-0 pointer-events-none -translate-y-4' : 'opacity-100 translate-y-0'}`}>
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 tracking-tight">
              AIによる銘柄診断
            </h1>
            <p className="text-base sm:text-lg text-white/90 font-medium">
              AIによるあなたの銘柄を
            </p>
            <p className="text-base sm:text-lg text-white/90 font-medium">
              徹底的に分析する
            </p>
          </div>

          <div className="relative flex-shrink-0 ml-8">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-3xl blur-3xl opacity-60 animate-pulse"></div>

            <div className="relative">
              <svg
                viewBox="0 0 200 120"
                className="w-32 h-20 sm:w-40 sm:h-24 lg:w-48 lg:h-28"
                style={{
                  filter: 'drop-shadow(0 0 20px rgba(96, 165, 250, 0.8))',
                }}
              >
                <defs>
                  <linearGradient id="aiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#93c5fd" />
                    <stop offset="50%" stopColor="#60a5fa" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                <text
                  x="100"
                  y="85"
                  textAnchor="middle"
                  fill="url(#aiGradient)"
                  fontSize="90"
                  fontWeight="900"
                  fontFamily="Arial, sans-serif"
                  filter="url(#glow)"
                  style={{
                    paintOrder: 'stroke fill',
                    stroke: '#1e3a8a',
                    strokeWidth: '2px',
                    letterSpacing: '-5px',
                  }}
                >
                  AI
                </text>

                <text
                  x="100"
                  y="85"
                  textAnchor="middle"
                  fill="rgba(255, 255, 255, 0.4)"
                  fontSize="90"
                  fontWeight="900"
                  fontFamily="Arial, sans-serif"
                  style={{
                    letterSpacing: '-5px',
                  }}
                >
                  AI
                </text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
