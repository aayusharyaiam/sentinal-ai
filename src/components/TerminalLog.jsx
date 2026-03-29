import React, { useEffect, useRef } from 'react';
import useSentinelStore from '../store/useSentinelStore';

export default function TerminalLog() {
  const { logs, isAnalyzing } = useSentinelStore();
  const headerRef = useRef(null);
  const containerRef = useRef(null);
  const prevAnalyzingRef = useRef(isAnalyzing);

  // Scroll page to this section when analysis starts
  useEffect(() => {
    if (isAnalyzing && !prevAnalyzingRef.current) {
      if (headerRef.current) {
        headerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    prevAnalyzingRef.current = isAnalyzing;
  }, [isAnalyzing]);

  // Scroll inside the log container only if user is near bottom
  useEffect(() => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      // Define a threshold (e.g. 150px) to consider "near bottom"
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 150;
      
      if (isNearBottom) {
        containerRef.current.scrollTop = scrollHeight;
      }
    }
  }, [logs]);

  return (
    <section className="w-full" ref={headerRef}>
      <div className="flex items-center justify-between mb-4 mt-8">
        <div className="flex flex-col gap-1 w-full">
          {/* Top Divider inside section or before */}
          <div className="w-full h-px bg-outline-variant/20 mb-8 mt-4"></div>
          
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 bg-primary animate-pulse"></div>
              <h2 className="font-headline text-xl tracking-widest uppercase text-primary">Live Event Log</h2>
            </div>
            <div className="text-[10px] font-mono text-on-surface-variant bg-surface-container-high px-3 py-1 uppercase tracking-widest border border-outline-variant/10">
              Status: <span className={isAnalyzing ? 'text-secondary animate-pulse' : 'text-primary'}>
                {isAnalyzing ? "Pipeline Active" : "System Monitoring"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-sm shadow-2xl relative flex flex-col">
        {/* Titlebar */}
        <div className="bg-surface-container-highest px-4 py-3 flex items-center border-b border-outline-variant/20">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
            <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
          </div>
          <div className="mx-auto text-[10px] font-mono tracking-widest text-[#8ff5ff]/80 uppercase">
            Prompt-shield :: live-log
          </div>
          <div className="w-12"></div> {/* spacer for centering */}
        </div>
        
        <div 
          ref={containerRef}
          className="p-6 h-72 font-mono text-xs overflow-y-auto scrollbar-thin scrollbar-thumb-outline-variant scrollbar-track-surface-container-low relative"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10">
             <span className="material-symbols-outlined text-4xl">terminal</span>
          </div>
          <div className="space-y-3">
          {logs.map((log, index) => (
            <div key={index} className="flex gap-4 group hover:bg-surface-container-high/50 px-2 py-1 transition-colors">
              <span className="text-on-surface-variant font-bold opacity-70">[{log.time}]</span>
              <span className={`${log.color} font-bold w-12 text-center`}>[{log.source}]</span>
              <span className={log.source === 'ERR' || log.source === 'OUT' || log.source === 'L1' || log.source === 'L2' || log.source === 'L3' ? log.color : "text-on-surface"}>
                {log.text}
              </span>
            </div>
          ))}
          {!isAnalyzing && (
            <div className="flex gap-4 animate-pulse opacity-50 px-2 py-1">
               <span className="text-primary font-bold w-12 text-center">...</span>
               <span className="text-on-surface-variant italic">Waiting for new input stream...</span>
            </div>
          )}
        </div>
        </div>
      </div>
    </section>
  );
}
