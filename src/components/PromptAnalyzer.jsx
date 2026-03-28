import React, { useState } from 'react';
import useSentinelStore from '../store/useSentinelStore';

export default function PromptAnalyzer() {
  const [prompt, setPrompt] = useState("");
  const { analyzePrompt, isAnalyzing, clear } = useSentinelStore();

  const handleAnalyze = () => {
    if (!prompt.trim()) return;
    analyzePrompt(prompt);
  };

  const handleClear = () => {
    setPrompt("");
    clear();
  };

  return (
    <section className="lg:col-span-7 flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <div className="w-1 h-6 bg-primary"></div>
        <h2 className="font-headline text-xl tracking-widest uppercase text-primary">Prompt Inspection Console</h2>
      </div>

      <div className="bg-surface-container-low p-6 border border-outline-variant/10 glow-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 p-2 opacity-20">
          <span className="material-symbols-outlined text-4xl">terminal</span>
        </div>

        <div className="mb-4 flex flex-col gap-2">
          <label className="text-[10px] uppercase tracking-widest text-on-surface-variant font-mono">Input Vector Field</label>
          <textarea 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isAnalyzing}
            className="w-full h-80 bg-transparent border-0 focus:ring-1 focus:outline-none focus:ring-primary text-primary font-mono text-sm p-4 placeholder:text-outline-variant/50 resize-none disabled:opacity-50" 
            placeholder="Enter prompt to analyze..." 
          />
        </div>

        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="flex gap-4">
            <button 
              onClick={handleAnalyze}
              disabled={isAnalyzing || !prompt.trim()}
              className="bg-primary text-on-primary font-headline text-xs px-6 py-3 tracking-widest transform transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_10px_rgba(143,245,255,0.5)]">
              {isAnalyzing ? "ANALYZING..." : "ANALYZE PROMPT"}
            </button>
            <button 
              onClick={handleClear}
              disabled={isAnalyzing}
              className="border border-outline-variant text-on-surface-variant font-headline text-xs px-6 py-3 tracking-widest hover:bg-surface-container-highest transition-all disabled:opacity-50 disabled:cursor-not-allowed">
              CLEAR
            </button>
          </div>
        </div>
      </div>

      {/* Core Concepts Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-surface-container-low p-4 border-l-2 border-primary/30">
          <h4 className="text-[10px] font-headline text-primary mb-2 tracking-tighter">SEMANTIC INTENT</h4>
          <p className="text-xs text-on-surface-variant leading-relaxed">High-parameter classification of underlying user motives and jailbreak logic.</p>
        </div>
        <div className="bg-surface-container-low p-4 border-l-2 border-primary/30">
          <h4 className="text-[10px] font-headline text-primary mb-2 tracking-tighter">VECTOR ANOMALIES</h4>
          <p className="text-xs text-on-surface-variant leading-relaxed">Comparison against billions of known adversarial embeddings in vector space.</p>
        </div>
        <div className="bg-surface-container-low p-4 border-l-2 border-primary/30">
          <h4 className="text-[10px] font-headline text-primary mb-2 tracking-tighter">PATTERN MATCHING</h4>
          <p className="text-xs text-on-surface-variant leading-relaxed">Dynamic heuristic signatures for rapid-fire rejection of known injection payloads.</p>
        </div>
      </div>
    </section>
  );
}
