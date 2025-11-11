export default function RadarScanBackground() {
  return (
    <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#001a4d] via-[#001133] to-[#000a22]" />

      <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[90vw] max-w-[500px] aspect-square">
        <div className="relative w-full h-full">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
            <defs>
              <radialGradient id="radarGlow" cx="50%" cy="50%">
                <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#00d4ff" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#00d4ff" stopOpacity="0" />
              </radialGradient>

              <linearGradient id="scanGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00d4ff" stopOpacity="0" />
                <stop offset="50%" stopColor="#00d4ff" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#00d4ff" stopOpacity="0" />
              </linearGradient>
            </defs>

            <circle cx="200" cy="200" r="180" fill="url(#radarGlow)" opacity="0.3" />

            <g className="radar-grid">
              <circle cx="200" cy="200" r="180" fill="none" stroke="#00d4ff" strokeWidth="1" opacity="0.3" />
              <circle cx="200" cy="200" r="140" fill="none" stroke="#00d4ff" strokeWidth="1" opacity="0.25" />
              <circle cx="200" cy="200" r="100" fill="none" stroke="#00d4ff" strokeWidth="1" opacity="0.2" />
              <circle cx="200" cy="200" r="60" fill="none" stroke="#00d4ff" strokeWidth="1" opacity="0.15" />

              <line x1="200" y1="20" x2="200" y2="380" stroke="#00d4ff" strokeWidth="0.5" opacity="0.2" />
              <line x1="20" y1="200" x2="380" y2="200" stroke="#00d4ff" strokeWidth="0.5" opacity="0.2" />
              <line x1="73" y1="73" x2="327" y2="327" stroke="#00d4ff" strokeWidth="0.5" opacity="0.15" />
              <line x1="327" y1="73" x2="73" y2="327" stroke="#00d4ff" strokeWidth="0.5" opacity="0.15" />
            </g>

            <g className="radar-ticks">
              {Array.from({ length: 60 }).map((_, i) => {
                const angle = (i * 6) * Math.PI / 180;
                const x1 = 200 + Math.cos(angle) * 170;
                const y1 = 200 + Math.sin(angle) * 170;
                const x2 = 200 + Math.cos(angle) * 180;
                const y2 = 200 + Math.sin(angle) * 180;
                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#00d4ff"
                    strokeWidth="1"
                    opacity={i % 5 === 0 ? "0.5" : "0.2"}
                  />
                );
              })}
            </g>

            <g className="radar-scan-beam animate-radar-spin" style={{ transformOrigin: '200px 200px' }}>
              <path
                d="M 200 200 L 200 20 A 180 180 0 0 1 380 200 Z"
                fill="url(#scanGradient)"
                opacity="0.3"
              />
              <line
                x1="200"
                y1="200"
                x2="200"
                y2="20"
                stroke="#00d4ff"
                strokeWidth="2"
                opacity="0.8"
              />
            </g>

            <circle cx="200" cy="200" r="8" fill="#00d4ff" opacity="0.9">
              <animate
                attributeName="r"
                values="8;12;8"
                dur="2s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.9;0.5;0.9"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>

            <circle cx="200" cy="200" r="4" fill="#ffffff" />

            <g className="radar-dots" opacity="0.6">
              <circle cx="280" cy="150" r="3" fill="#00d4ff">
                <animate
                  attributeName="opacity"
                  values="0.3;1;0.3"
                  dur="3s"
                  repeatCount="indefinite"
                  begin="0s"
                />
              </circle>
              <circle cx="130" cy="250" r="3" fill="#00d4ff">
                <animate
                  attributeName="opacity"
                  values="0.3;1;0.3"
                  dur="3s"
                  repeatCount="indefinite"
                  begin="1s"
                />
              </circle>
              <circle cx="320" cy="280" r="3" fill="#00d4ff">
                <animate
                  attributeName="opacity"
                  values="0.3;1;0.3"
                  dur="3s"
                  repeatCount="indefinite"
                  begin="2s"
                />
              </circle>
            </g>
          </svg>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
              opacity: Math.random() * 0.5 + 0.2,
            }}
          />
        ))}
      </div>
    </div>
  );
}
