interface YellowDiagnosisButtonProps {
  onClick: () => void;
  text: string;
  disabled?: boolean;
}

export default function YellowDiagnosisButton({ onClick, text, disabled = false }: YellowDiagnosisButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full max-w-md mx-auto block bg-[#ffd900] hover:bg-[#ffed4e] disabled:opacity-50 disabled:cursor-not-allowed text-[#001a4d] font-bold text-lg py-4 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
    >
      • {text}
    </button>
  );
}
