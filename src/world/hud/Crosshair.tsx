export function Crosshair() {
  return (
    <div
      className="pointer-events-none fixed inset-0 flex items-center justify-center"
      aria-hidden>
      <div className="relative">
        <div className="absolute -inset-3 rounded-full bg-black/10 blur-sm" />
        <div className="relative h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_4px_rgba(0,0,0,0.6)]" />
      </div>
    </div>
  );
}
