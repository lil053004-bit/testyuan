export default function DarkBlueBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-navy-gradient overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 2px 2px, rgba(74, 144, 226, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-border/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-ai-blue/10 rounded-full blur-3xl" />
    </div>
  );
}
