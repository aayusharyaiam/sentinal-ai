import React from 'react';
import useSentinelStore from '../store/useSentinelStore';
import LayerBreakdown from './LayerBreakdown';

export default function VerdictPanel() {
  const { isAnalyzing, currentStage, result } = useSentinelStore();

  const getStatusColor = () => {
    if (!result) return 'text-secondary';
    if (result.status === 'BLOCKED') return 'text-secondary';
    if (result.status === 'SUSPICIOUS') return 'text-tertiary';
    return 'text-primary';
  };

  const getGlowColor = () => {
    if (!result) return 'glow-error'; // default idle
    if (result.status === 'BLOCKED') return 'glow-error';
    if (result.status === 'SUSPICIOUS') return 'glow-tertiary';
    return 'glow-success'; // Map primary glow
  };

  const getShadowColor = () => {
    if (!result) return '#ff7168'; // secondary
    if (result.status === 'BLOCKED') return '#ff7168';
    if (result.status === 'SUSPICIOUS') return '#ffbd58';
    return '#8ff5ff'; // primary
  };

  const getBgColor = () => {
    if (!result) return 'bg-secondary';
    if (result.status === 'BLOCKED') return 'bg-secondary';
    if (result.status === 'SUSPICIOUS') return 'bg-tertiary';
    return 'bg-primary';
  };

  const statusText = result ? result.status : (isAnalyzing ? "ANALYZING..." : "STANDBY");
  const riskLevelText = result ? `RISK LEVEL: ${result.risk_score > 0.7 ? 'CRITICAL' : (result.risk_score > 0.4 ? 'ELEVATED' : 'LOW')}` : "RISK LEVEL: UNKNOWN";
  const confidenceText = result ? `${(result.confidence * 100).toFixed(1)}% CONFIDENCE` : "0.0% CONFIDENCE";
  
  // Bar width starts 0, completes based on risk_score
  const barWidth = result ? `${result.risk_score * 100}%` : "0%";

  return (
    <section className="lg:col-span-5 flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <div className={`w-1 h-6 ${getBgColor()} transition-colors duration-500`}></div>
        <h2 className={`font-headline text-xl tracking-widest uppercase ${getStatusColor()} transition-colors duration-500`}>Verdict System</h2>
      </div>

      <div className={`bg-surface-container-low p-8 border border-outline-variant/10 ${getGlowColor()} relative transition-shadow duration-500`}>
        <div className="flex flex-col items-center text-center gap-4 mb-8">
          <div className="text-[10px] uppercase tracking-widest text-on-surface-variant font-mono">Threat Status</div>
          <div className={`text-5xl font-black font-headline tracking-tighter ${isAnalyzing && currentStage < 5 ? 'animate-pulse' : ''} ${getStatusColor()}`}>
            {statusText}
          </div>

          <div className="w-full bg-surface-container-lowest h-1.5 mt-4 overflow-hidden relative">
            <div 
              className={`h-full transition-all duration-1000 ease-out ${getBgColor()}`} 
              style={{ width: barWidth, boxShadow: `0 0 8px ${getShadowColor()}` }}
            ></div>
          </div>

          <div className={`flex justify-between w-full text-[10px] font-mono ${getStatusColor()}`}>
            <span>{riskLevelText}</span>
            <span>{confidenceText}</span>
          </div>
        </div>

        <div className="space-y-6">
          <LayerBreakdown />
        </div>
      </div>
    </section>
  );
}
