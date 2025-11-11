export default function EnhancedRadar() {
  return (
    <div className="absolute inset-0 w-full max-w-[500px] mx-auto left-0 right-0 -top-8 pointer-events-none">
      <div className="relative w-full aspect-square">
        <svg className="w-full h-full" viewBox="0 0 400 400">
          <defs>
            <radialGradient id="radarGlow" cx="50%" cy="50%">
              <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.8" />
              <stop offset="30%" stopColor="#00d4ff" stopOpacity="0.4" />
              <stop offset="60%" stopColor="#0066ff" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#00d4ff" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="radarGlowSecondary" cx="50%" cy="50%">
              <stop offset="0%" stopColor="#00ffff" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#00d4ff" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0066ff" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="scanGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00d4ff" stopOpacity="0" />
              <stop offset="50%" stopColor="#00ffff" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#00d4ff" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="scanGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0066ff" stopOpacity="0" />
              <stop offset="50%" stopColor="#00d4ff" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#0066ff" stopOpacity="0" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          <circle cx="200" cy="200" r="190" fill="url(#radarGlow)" opacity="0.4" />
          <circle cx="200" cy="200" r="160" fill="url(#radarGlowSecondary)" opacity="0.3" />

          <g className="radar-grid">
            <circle cx="200" cy="200" r="180" fill="none" stroke="#00d4ff" strokeWidth="1.5" opacity="0.4" filter="url(#glow)" />
            <circle cx="200" cy="200" r="140" fill="none" stroke="#00d4ff" strokeWidth="1.2" opacity="0.35" />
            <circle cx="200" cy="200" r="100" fill="none" stroke="#00d4ff" strokeWidth="1" opacity="0.3" />
            <circle cx="200" cy="200" r="60" fill="none" stroke="#00d4ff" strokeWidth="0.8" opacity="0.25" />
            <circle cx="200" cy="200" r="30" fill="none" stroke="#00ffff" strokeWidth="0.5" opacity="0.2" />

            <line x1="200" y1="20" x2="200" y2="380" stroke="#00d4ff" strokeWidth="0.8" opacity="0.25" />
            <line x1="20" y1="200" x2="380" y2="200" stroke="#00d4ff" strokeWidth="0.8" opacity="0.25" />
            <line x1="73" y1="73" x2="327" y2="327" stroke="#00d4ff" strokeWidth="0.6" opacity="0.2" />
            <line x1="327" y1="73" x2="73" y2="327" stroke="#00d4ff" strokeWidth="0.6" opacity="0.2" />
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
                  opacity={i % 5 === 0 ? "0.6" : "0.3"}
                />
              );
            })}
          </g>

          <g className="radar-scan-beam animate-radar-spin" style={{ transformOrigin: '200px 200px' }}>
            <path d="M 200 200 L 200 20 A 180 180 0 0 1 380 200 Z" fill="url(#scanGradient)" opacity="0.4" />
            <line x1="200" y1="200" x2="200" y2="20" stroke="#00ffff" strokeWidth="3" opacity="0.9" filter="url(#glow)" />
          </g>

          <g className="radar-scan-beam-2" style={{ transformOrigin: '200px 200px', animation: 'radar-spin 8s linear infinite reverse' }}>
            <path d="M 200 200 L 283 83 A 180 180 0 0 1 380 200 Z" fill="url(#scanGradient2)" opacity="0.25" />
            <line x1="200" y1="200" x2="283" y2="83" stroke="#0066ff" strokeWidth="2" opacity="0.6" />
          </g>

          <circle cx="200" cy="200" r="195" fill="none" stroke="#00d4ff" strokeWidth="0.5" opacity="0.15">
            <animate attributeName="r" values="195;205;195" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.15;0.4;0.15" dur="3s" repeatCount="indefinite" />
          </circle>

          <circle cx="200" cy="200" r="10" fill="#00d4ff" opacity="0.9" filter="url(#glow)">
            <animate attributeName="r" values="10;15;10" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.9;0.5;0.9" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="200" cy="200" r="5" fill="#ffffff" />

          <g className="radar-dots" opacity="0.7">
            <circle cx="280" cy="150" r="3" fill="#00ffff">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="2.5s" repeatCount="indefinite" begin="0s" />
              <animate attributeName="r" values="3;5;3" dur="2.5s" repeatCount="indefinite" begin="0s" />
            </circle>
            <circle cx="130" cy="250" r="3" fill="#00d4ff">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="2.5s" repeatCount="indefinite" begin="0.8s" />
              <animate attributeName="r" values="3;5;3" dur="2.5s" repeatCount="indefinite" begin="0.8s" />
            </circle>
            <circle cx="320" cy="280" r="3" fill="#0099ff">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="2.5s" repeatCount="indefinite" begin="1.6s" />
              <animate attributeName="r" values="3;5;3" dur="2.5s" repeatCount="indefinite" begin="1.6s" />
            </circle>
            <circle cx="90" cy="120" r="2" fill="#00ffff">
              <animate attributeName="opacity" values="0.2;0.8;0.2" dur="3s" repeatCount="indefinite" begin="0.5s" />
            </circle>
            <circle cx="310" cy="200" r="2" fill="#00d4ff">
              <animate attributeName="opacity" values="0.2;0.8;0.2" dur="3s" repeatCount="indefinite" begin="1s" />
            </circle>
            <circle cx="200" cy="320" r="2" fill="#0099ff">
              <animate attributeName="opacity" values="0.2;0.8;0.2" dur="3s" repeatCount="indefinite" begin="1.5s" />
            </circle>
            <circle cx="150" cy="90" r="2" fill="#00d4ff">
              <animate attributeName="opacity" values="0.2;0.9;0.2" dur="2.8s" repeatCount="indefinite" begin="0.3s" />
            </circle>
            <circle cx="250" cy="310" r="2" fill="#00ffff">
              <animate attributeName="opacity" values="0.2;0.9;0.2" dur="2.8s" repeatCount="indefinite" begin="1.1s" />
            </circle>
          </g>
        </svg>

        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 100 }).map((_, i) => {
            const size = Math.random() * 3 + 1;
            const duration = 3 + Math.random() * 4;
            const delay = Math.random() * 5;
            const opacity = Math.random() * 0.6 + 0.2;
            const isOrbiting = i % 3 === 0;

            return (
              <div
                key={i}
                className={`absolute rounded-full ${isOrbiting ? 'animate-orbit' : 'animate-float'}`}
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  background: `rgba(${i % 3 === 0 ? '0,255,255' : i % 3 === 1 ? '0,212,255' : '0,153,255'}, ${opacity})`,
                  boxShadow: `0 0 ${size * 3}px rgba(0,212,255,0.6)`,
                  animationDelay: `${delay}s`,
                  animationDuration: `${duration}s`,
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
