import React, { useState, useEffect } from 'react';

export default function Footer() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="bg-surface-container-low border-t border-outline-variant/20 px-6 py-4 w-full mt-auto relative z-40 shadow-[0_-10px_30px_-15px_rgba(143,245,255,0.05)]">
      <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row items-center gap-4 relative">
        
        {/* Left Section - Status Indicators */}
        <div className="flex-1 flex justify-start w-full lg:w-auto">
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 md:gap-4 text-primary font-mono text-[10px] uppercase tracking-widest bg-surface-container-lowest border border-outline-variant/10 px-3 py-1.5 rounded-sm">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#27c93f] rounded-full animate-pulse shadow-[0_0_8px_rgba(39,201,63,0.8)]"></span>
              SYSTEM SECURE
            </span>
            <span className="opacity-30">|</span>
            <span className="opacity-80">v.3.2.1</span>
            <span className="opacity-30 hidden sm:inline">|</span>
            <span className="opacity-80 hidden sm:inline">NODES: 42 ACTIVE</span>
          </div>
        </div>

        {/* Middle Section - Copyright */}
        <div className="text-on-surface-variant font-mono text-[10px] uppercase tracking-widest opacity-60 text-center flex flex-col items-center justify-center gap-1">
          <div className="flex items-center gap-2">
            © {new Date().getFullYear()} SENTINEL AI
            <span className="text-primary/40">::</span>
            DATA STREAMS ENCRYPTED
          </div>
          <div className="text-[9px] opacity-70 mt-1">
            DEVELOPED BY COMMIT CHAOS
          </div>
        </div>

        {/* Right Section - Clock */}
        <div className="flex-1 flex justify-end w-full lg:w-auto">
          <div className="flex flex-wrap items-center justify-center gap-6">
            {/* Live UTC Clock */}
            <div className="text-primary/80 font-mono text-[10px] border border-primary/20 bg-primary/5 px-2 py-1 flex items-center gap-2 tabular-nums">
              <span className="material-symbols-outlined text-[14px]">schedule</span>
              {time.toISOString().split('T')[1].substring(0, 8)} UTC
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
