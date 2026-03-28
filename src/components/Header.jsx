export default function Header() {
  const navItems = [
    { label: 'Analyzer', id: 'analyzer' },
    { label: 'Metrics & Red Team', id: 'metrics' },
    { label: 'Live Logs', id: 'logs' }
  ];

  return (
    <header className="bg-[#0a0e13] border-b border-[#44484e]/15 shadow-[0_0_15px_rgba(143,245,255,0.1)] flex justify-between items-center w-full px-6 py-3 top-0 z-50 sticky">
      <div className="flex items-center gap-8">
        <h1 className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#8ff5ff] to-[#00eefc] font-['Orbitron'] tracking-wider uppercase">
          SENTINEL
        </h1>
        <nav className="hidden md:flex gap-6">
          {navItems.map((item) => (
            <a 
              key={item.id}
              href={`#${item.id}`}
              className="font-['Orbitron'] tracking-wider uppercase text-sm transition-all duration-150 text-on-surface-variant hover:text-primary"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 bg-surface-container-highest border border-outline-variant/20 flex items-center justify-center cursor-pointer">
          <span className="material-symbols-outlined text-primary text-sm">account_circle</span>
        </div>
      </div>
    </header>
  );
}
