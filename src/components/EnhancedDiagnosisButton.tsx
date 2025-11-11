import { Brain } from 'lucide-react';

interface EnhancedDiagnosisButtonProps {
  onClick: () => void;
  stockCode: string;
  stockName: string;
}

export default function EnhancedDiagnosisButton({ onClick, stockCode, stockName }: EnhancedDiagnosisButtonProps) {
  return (
    <button
      onClick={onClick}
      className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg transition-all duration-300 hover:shadow-xl hover:from-blue-500 hover:to-blue-600"
    >
      <div className="relative px-6 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-blue-500/30 p-2 rounded-lg">
            <Brain className="w-5 h-5 text-white" />
          </div>

          <div className="text-left">
            <div className="text-base font-bold text-white">
              {stockName}を詳しく診断
            </div>
            <div className="text-xs text-blue-100 mt-0.5">
              AI分析で投資判断をサポートする
            </div>
          </div>
        </div>

        <div className="text-white/80 group-hover:text-white group-hover:translate-x-1 transition-all duration-300">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </div>
      </div>
    </button>
  );
}
