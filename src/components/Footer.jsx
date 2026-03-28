export default function Footer() {
  return (
    <footer className="bg-[#000000] border-t border-outline-variant/15 flex justify-between items-center px-4 py-4 w-full bottom-0 z-40 mt-auto">
      <div className="text-primary font-mono text-[10px] uppercase tracking-widest opacity-80">
        © 2024 SENTINEL DEFENSE SYSTEMS. ALL DATA STREAMS ENCRYPTED.
      </div>
      <div className="flex gap-6">
        <span className="text-on-surface-variant hover:text-secondary cursor-pointer transition-colors font-mono text-[10px] uppercase">How It Works</span>
        <span className="text-on-surface-variant hover:text-secondary cursor-pointer transition-colors font-mono text-[10px] uppercase">Documentation</span>
        <span className="text-on-surface-variant hover:text-secondary cursor-pointer transition-colors font-mono text-[10px] uppercase">API Status</span>
      </div>
    </footer>
  );
}
