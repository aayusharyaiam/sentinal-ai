import useSentinelStore from '../store/useSentinelStore';

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
  const confidenceText = result ? `${(result.confidence * 100).toFixed(1)}% CONFIDENCE` : "0.0% CONFIDENCE";

  // Bar width starts 0, completes based on risk_score
  const barWidth = result ? `${result.risk_score * 100}%` : "0%";

  return (
    <section className="lg:col-span-5 flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <div className={`w-1 h-6 ${getBgColor()} transition-colors duration-500`}></div>
        <h2 className={`font-headline text-xl tracking-widest uppercase ${getStatusColor()} transition-colors duration-500`}>Verdict System</h2>
      </div>

      <div className={`bg-surface-container-low border border-outline-variant/20 rounded-sm shadow-2xl ${getGlowColor()} relative transition-shadow duration-500 flex flex-col`}>
        {/* Titlebar */}
        <div className="bg-surface-container-highest px-4 py-3 flex items-center border-b border-outline-variant/20">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
            <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
          </div>
          <div className={`mx-auto text-[10px] font-mono tracking-widest uppercase ${getStatusColor()}`}>
            Prompt-shield :: verdict
          </div>
          <div className="w-12"></div> {/* spacer for centering */}
        </div>

        <div className="p-8 relative flex-1">
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

            <div className={`flex justify-end w-full text-[10px] font-mono ${getStatusColor()}`}>
              <span>{confidenceText}</span>
            </div>
          </div>

          <div className="space-y-6">
            {result?.reason && (
              <div className={`bg-surface-container-highest p-4 border border-outline-variant/20 text-xs text-on-surface-variant leading-relaxed text-left relative`}>
                <div className={`absolute top-0 left-0 w-1 h-full ${getBgColor()}`}></div>
                <span className={`font-headline text-[10px] uppercase flex items-center gap-1 mb-2 ${getStatusColor()}`}>
                  <span className="material-symbols-outlined text-[14px]">psychology</span>
                  Analysis Reasoning
                </span>
                {result.reason}
              </div>
            )}
            
            <div className={`bg-surface-container-highest p-4 border border-outline-variant/20 text-xs text-on-surface-variant leading-relaxed text-left relative`}>
              <div className={`absolute top-0 left-0 w-1 h-full ${getBgColor()}`}></div>
              <span className={`font-headline text-[10px] uppercase flex items-center gap-1 mb-2 ${getStatusColor()}`}>
                <span className="material-symbols-outlined text-[14px]">label</span>
                Output Category
              </span>
              <span className="font-mono text-base uppercase font-bold">
                {result ? (result.category || 'UNKNOWN') : 'STANDBY'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
