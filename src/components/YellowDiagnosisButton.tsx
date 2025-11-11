import { Sparkles } from 'lucide-react';

interface YellowDiagnosisButtonProps {
  onClick: () => void;
  text: string;
  disabled?: boolean;
}

export default function YellowDiagnosisButton({ onClick, text, disabled = false }: YellowDiagnosisButtonProps) {
  return (
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-yellow-btn via-yellow-400 to-yellow-btn rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition duration-300 animate-pulse"></div>

      <button
        onClick={onClick}
        disabled={disabled}
        className="relative w-full max-w-md mx-auto block bg-gradient-to-br from-[#ffd900] via-[#ffed4e] to-[#ffd900] hover:from-[#ffed4e] hover:via-[#fff176] hover:to-[#ffed4e] disabled:opacity-50 disabled:cursor-not-allowed text-[#001a4d] font-bold text-lg py-5 px-8 rounded-xl transition-all duration-300 shadow-2xl hover:shadow-[0_0_40px_rgba(255,217,0,0.6)] hover:scale-[1.03] active:scale-[0.98] overflow-hidden border-2 border-yellow-300/50"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

        <div className="relative flex items-center justify-center gap-3">
          <div className="relative">
            <Sparkles className="w-6 h-6 animate-pulse" />
            <div className="absolute inset-0 bg-yellow-300 blur-md opacity-50 animate-ping"></div>
          </div>
          <span className="drop-shadow-sm">• {text}</span>
          <div className="relative">
            <Sparkles className="w-6 h-6 animate-pulse" style={{ animationDelay: '0.5s' }} />
            <div className="absolute inset-0 bg-yellow-300 blur-md opacity-50 animate-ping" style={{ animationDelay: '0.5s' }}></div>
          </div>
        </div>

        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.3), transparent 60%)',
        }}></div>
      </button>
    </div>
  );
}
