import { Bot, Search, Zap } from 'lucide-react';

export default function RobotAnalysisAnimation() {
  return (
    <div className="flex items-center justify-center mb-6">
      <div className="relative">
        <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 rounded-3xl blur-xl opacity-60 animate-pulse"></div>

        <div className="relative bg-gradient-to-br from-blue-600 via-cyan-500 to-blue-500 rounded-2xl p-6 shadow-[0_0_40px_rgba(0,212,255,0.5)] border-2 border-cyan-400/30">
          <div className="relative">
            <Bot className="w-16 h-16 text-white drop-shadow-lg" />
            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg px-3 py-1.5 shadow-lg border-2 border-white/20 animate-pulse">
              <span className="text-xs font-bold text-white">AI分析中</span>
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <Zap className="w-8 h-8 text-yellow-300 animate-ping opacity-50" />
            </div>
          </div>
        </div>

        <div className="absolute -right-6 top-1/2 transform -translate-y-1/2 animate-bounce">
          <div className="relative">
            <div className="absolute inset-0 bg-yellow-btn rounded-full blur-md opacity-60"></div>
            <div className="relative bg-gradient-to-br from-yellow-btn to-yellow-400 rounded-full p-3 shadow-lg border-2 border-yellow-300/50">
              <Search className="w-8 h-8 text-deep-blue animate-pulse" />
            </div>
          </div>
        </div>

        <div className="absolute -left-8 top-4 w-3 h-3 bg-cyan-400 rounded-full animate-ping opacity-75"></div>
        <div className="absolute -right-10 bottom-4 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-75" style={{ animationDelay: '0.3s' }}></div>
        <div className="absolute left-14 -top-6 w-2 h-2 bg-cyan-300 rounded-full animate-ping opacity-75" style={{ animationDelay: '0.6s' }}></div>
        <div className="absolute -left-6 bottom-8 w-3 h-3 bg-yellow-btn rounded-full animate-ping opacity-60" style={{ animationDelay: '0.9s' }}></div>
      </div>
    </div>
  );
}
