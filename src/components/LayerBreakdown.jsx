import React from 'react';

import useSentinelStore from '../store/useSentinelStore';

export default function LayerBreakdown() {
  const { currentStage, result } = useSentinelStore();

  const getCategoryLabel = (cat) => {
    switch(cat) {
      case 'jailbreak_identity': return 'Identity Hijack';
      case 'jailbreak_hypothetical': return 'Hypothetical Framing';
      case 'jailbreak_authority': return 'Authority Spoofing';
      case 'suspicious': return 'Suspicious Intent';
      case 'safe': return 'Safe Prompt';
      default: return 'Unknown Intent';
    }
  };

  const getPatternLabel = (pat) => {
    switch(pat) {
      case 'identity_hijack': return 'IDENTITY HIJACK';
      case 'hypothetical_framing': return 'HYPOTHETICAL FRAMING';
      case 'authority_spoofing': return 'AUTHORITY SPOOFING';
      case 'instruction_override': return 'INSTRUCTION OVERRIDE';
      default: return pat.toUpperCase();
    }
  };

  return (
    <>
      {/* Layer 1 */}
      <div className={`border-t border-outline-variant/10 pt-4 transition-opacity duration-500 ${currentStage > 1 ? 'opacity-100' : 'opacity-30'}`}>
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] font-headline text-primary uppercase">Layer 01: Intent Classifier</span>
        </div>
        <div className="flex items-center justify-between p-3 bg-surface-container-lowest">
          <span className={`text-sm font-semibold ${result?.status === 'BLOCKED' ? 'text-secondary' : (result?.status === 'SUSPICIOUS' ? 'text-tertiary' : 'text-primary')}`}>
            {currentStage > 1 ? (result ? getCategoryLabel(result.category) : "Processing...") : "Standby"}
          </span>
          {currentStage > 1 && result && (
             <span className="text-xs font-mono px-2 py-1 bg-surface-container-high text-primary">
               {result.confidence.toFixed(3)}
             </span>
          )}
        </div>
      </div>

      {/* Layer 2 */}
      <div className={`border-t border-outline-variant/10 pt-4 transition-opacity duration-500 ${currentStage > 2 ? 'opacity-100' : 'opacity-30'}`}>
        <div className="flex justify-between items-center mb-3">
          <span className="text-[10px] font-headline text-primary uppercase">Layer 02: Pattern Detector</span>
          <span className="material-symbols-outlined text-secondary text-sm">warning</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {currentStage > 2 && result && result.patterns.length > 0 ? (
            result.patterns.map((pat, idx) => (
              <span key={idx} className="px-3 py-1 border border-secondary text-secondary text-[10px] font-bold tracking-tight bg-secondary/10">
                {getPatternLabel(pat)}
              </span>
            ))
          ) : (
             <span className="text-[10px] text-on-surface-variant font-mono">
               {currentStage > 2 && result ? "No suspicious patterns detected" : "Awaiting signature scan..."}
             </span>
          )}
        </div>
      </div>


    </>
  );
}
