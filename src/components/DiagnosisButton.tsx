import { Sparkles } from 'lucide-react';

interface DiagnosisButtonProps {
  onClick: () => void;
  disabled?: boolean;
  stockName?: string;
}

export default function DiagnosisButton({ onClick, disabled = false, stockName }: DiagnosisButtonProps) {
  return (
    <div className="relative">
      <div className="absolute -inset-2 bg-orange-gradient rounded-full blur-xl opacity-50 animate-pulse"></div>
      <button
        onClick={onClick}
        disabled={disabled}
        className="relative w-full bg-orange-gradient hover:shadow-orange-glow-lg disabled:from-gray-600 disabled:to-gray-700 text-white font-black py-6 md:py-8 px-8 md:px-12 rounded-full shadow-orange-glow transition-all duration-300 transform hover:scale-105 active:translate-y-1 disabled:cursor-not-allowed disabled:transform-none overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

        <div className="relative flex items-center justify-center gap-3 md:gap-4">
          <Sparkles className="w-5 md:w-7 h-5 md:h-7 animate-pulse" />
          <span className="text-base md:text-xl">{stockName ? `${stockName} ` : ''}· 診断開始</span>
        </div>

        <div
          className="absolute inset-0 shadow-inner-3d pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.2), transparent 50%)',
          }}
        />
      </button>
    </div>
  );
}
