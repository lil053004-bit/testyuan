interface GreenBadgeProps {
  text: string;
  className?: string;
}

export default function GreenBadge({ text, className = '' }: GreenBadgeProps) {
  return (
    <div
      className={`inline-block bg-green-label text-white font-bold px-4 py-2 rounded-lg shadow-lg transform -rotate-2 hover:rotate-0 transition-all duration-300 animate-float ${className}`}
    >
      {text}
    </div>
  );
}
