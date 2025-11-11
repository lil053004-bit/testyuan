export default function HexagonRadarChart() {
  const hexagonPoints = [
    { x: 200, y: 50, label: '株価分析' },
    { x: 323.2, y: 125, label: '目標株価' },
    { x: 323.2, y: 275, label: 'テクニカル分析' },
    { x: 200, y: 350, label: '財務分析' },
    { x: 76.8, y: 275, label: 'チャート分析' },
    { x: 76.8, y: 125, label: '過去シミュレーション' }
  ];

  const dataPoints = [
    { x: 200, y: 100 },
    { x: 280, y: 150 },
    { x: 280, y: 250 },
    { x: 200, y: 300 },
    { x: 120, y: 250 },
    { x: 120, y: 150 }
  ];

  const pathData = dataPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

  return (
    <div className="w-full max-w-md mx-auto py-12">
      <h2 className="text-3xl font-bold text-white text-center mb-8">AIによる銘柄分析</h2>

      <div className="relative w-full aspect-square max-w-[400px] mx-auto">
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <defs>
            <linearGradient id="hexGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#0066ff" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          <polygon
            points="200,50 323.2,125 323.2,275 200,350 76.8,275 76.8,125"
            fill="none"
            stroke="#00d4ff"
            strokeWidth="2"
            opacity="0.3"
          />

          <polygon
            points="200,100 280,150 280,250 200,300 120,250 120,150"
            fill="none"
            stroke="#00d4ff"
            strokeWidth="1.5"
            opacity="0.4"
          />

          <polygon
            points="200,125 256.6,162.5 256.6,237.5 200,275 143.4,237.5 143.4,162.5"
            fill="none"
            stroke="#00d4ff"
            strokeWidth="1"
            opacity="0.3"
          />

          <line x1="200" y1="200" x2="200" y2="50" stroke="#00d4ff" strokeWidth="0.5" opacity="0.2" />
          <line x1="200" y1="200" x2="323.2" y2="125" stroke="#00d4ff" strokeWidth="0.5" opacity="0.2" />
          <line x1="200" y1="200" x2="323.2" y2="275" stroke="#00d4ff" strokeWidth="0.5" opacity="0.2" />
          <line x1="200" y1="200" x2="200" y2="350" stroke="#00d4ff" strokeWidth="0.5" opacity="0.2" />
          <line x1="200" y1="200" x2="76.8" y2="275" stroke="#00d4ff" strokeWidth="0.5" opacity="0.2" />
          <line x1="200" y1="200" x2="76.8" y2="125" stroke="#00d4ff" strokeWidth="0.5" opacity="0.2" />

          <path
            d={pathData}
            fill="url(#hexGradient)"
            stroke="#00d4ff"
            strokeWidth="2"
          />

          {dataPoints.map((point, i) => (
            <circle key={i} cx={point.x} cy={point.y} r="5" fill="#ffffff" />
          ))}

          {hexagonPoints.map((point, i) => (
            <g key={i}>
              <circle cx={point.x} cy={point.y} r="6" fill="#00d4ff" opacity="0.8" />
              <text
                x={point.x}
                y={point.y < 200 ? point.y - 15 : point.y + 25}
                textAnchor="middle"
                fill="#ffffff"
                fontSize="14"
                fontWeight="500"
              >
                {point.label}
              </text>
            </g>
          ))}

          <polygon
            points="170,180 230,180 250,200 230,220 170,220 150,200"
            fill="#001a4d"
            stroke="#00d4ff"
            strokeWidth="2"
          />

          <text
            x="200"
            y="198"
            textAnchor="middle"
            fill="#ffffff"
            fontSize="18"
            fontWeight="bold"
          >
            上昇確率
          </text>
          <text
            x="200"
            y="215"
            textAnchor="middle"
            fill="#00d4ff"
            fontSize="12"
          >
            すぐにAI分析
          </text>
        </svg>
      </div>
    </div>
  );
}
