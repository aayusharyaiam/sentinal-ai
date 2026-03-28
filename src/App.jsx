import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import PromptAnalyzer from './components/PromptAnalyzer';
import VerdictPanel from './components/VerdictPanel';
import TerminalLog from './components/TerminalLog';
import Notification from './components/Notification';
import useSentinelStore from './store/useSentinelStore';

function App() {
  const { result } = useSentinelStore();
  const [notification, setNotification] = useState(null);

  const downloadThreatReport = async () => {
    try {
      if (!result) {
        setNotification({
          type: 'error',
          title: 'NO DATA AVAILABLE',
          message: 'Run a prompt analysis first to generate a threat report.'
        });
        return;
      }

      setNotification({
        type: 'info',
        title: 'INITIATING DOWNLOAD',
        message: 'Generating threat report file...'
      });

      // Simulate a small delay for realism
      await new Promise(resolve => setTimeout(resolve, 500));

      const reportData = {
        timestamp: new Date().toISOString(),
        status: result.status,
        riskScore: result.risk_score,
        riskLevel: result.risk_score > 0.7 ? 'CRITICAL' : (result.risk_score > 0.4 ? 'ELEVATED' : 'LOW'),
        confidence: (result.confidence * 100).toFixed(1) + '%',
        category: result.category,
        patterns: result.patterns,
        anomaly: result.anomaly,
        reasoning: result.reason
      };

      const jsonString = JSON.stringify(reportData, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `threat-report-${Date.now()}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setNotification({
        type: 'success',
        title: 'DOWNLOAD COMPLETE',
        message: `Report saved as threat-report-${Date.now()}.json`
      });
    } catch (error) {
      setNotification({
        type: 'error',
        title: 'DOWNLOAD FAILED',
        message: error?.message || 'An error occurred while downloading the report.'
      });
    }
  };
  return (
    <div className="bg-surface text-on-surface font-body selection:bg-primary/30 selection:text-primary min-h-screen grid-overlay flex flex-col">
      <Notification 
        notification={notification} 
        onClose={() => setNotification(null)} 
      />
      <Header />
      
      <main className="max-w-[1600px] mx-auto p-6 flex flex-col gap-12 mb-24 w-full">
        {/* PRIMARY DASHBOARD ROW */}
        <div id="analyzer" className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <PromptAnalyzer />
          <VerdictPanel />
        </div>

        {/* THREAT METRICS & RED TEAMING ROW */}
        <div id="metrics" className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <section className="lg:col-span-8 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 bg-primary"></div>
              <h2 className="font-headline text-xl tracking-widest uppercase text-primary">Threat Metrics // OWASP LLM01</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-surface-container-low p-6 border border-outline-variant/10">
                <h3 className="text-[10px] font-headline text-on-surface-variant mb-6 uppercase tracking-widest">Injection Prevention Rate</h3>
                <div className="flex items-end gap-1 h-32 mb-4">
                  <div className="flex-1 bg-primary/20 h-[60%] border-t-2 border-primary relative group">
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity">74%</div>
                  </div>
                  <div className="flex-1 bg-primary/30 h-[75%] border-t-2 border-primary relative group">
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity">82%</div>
                  </div>
                  <div className="flex-1 bg-primary/40 h-[88%] border-t-2 border-primary relative group">
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity">91%</div>
                  </div>
                  <div className="flex-1 bg-primary/50 h-[92%] border-t-2 border-primary relative group">
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity">94%</div>
                  </div>
                  <div className="flex-1 bg-primary h-[99%] border-t-2 border-[#fff] relative group">
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-mono font-bold text-primary">99.4%</div>
                  </div>
                </div>
                <div className="flex justify-between text-[8px] font-mono text-on-surface-variant uppercase">
                  <span>v1.0</span><span>v1.2</span><span>v2.0</span><span>v2.5</span><span className="text-primary">Current</span>
                </div>
              </div>
              <div className="bg-surface-container-low p-6 border border-outline-variant/10">
                <h3 className="text-[10px] font-headline text-on-surface-variant mb-4 uppercase tracking-widest">OWASP Top 10 Coverage</h3>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-[9px] font-mono">
                      <span className="text-on-surface">LLM01: Prompt Injection</span>
                      <span className="text-primary">99.4%</span>
                    </div>
                    <div className="w-full h-1 bg-surface-container-lowest"><div className="h-full bg-primary w-[99.4%]"></div></div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[9px] font-mono">
                      <span className="text-on-surface">LLM06: Sensitive Info Disclosure</span>
                      <span className="text-primary">94.2%</span>
                    </div>
                    <div className="w-full h-1 bg-surface-container-lowest"><div className="h-full bg-primary w-[94.2%]"></div></div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[9px] font-mono">
                      <span className="text-on-surface">LLM02: Insecure Output Handling</span>
                      <span className="text-primary">88.7%</span>
                    </div>
                    <div className="w-full h-1 bg-surface-container-lowest"><div className="h-full bg-primary w-[88.7%]"></div></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="lg:col-span-4 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 bg-tertiary"></div>
              <h2 className="font-headline text-xl tracking-widest uppercase text-tertiary">Sentinel Red</h2>
            </div>
            <div className="bg-surface-container-low p-6 border border-tertiary/20 relative group overflow-hidden flex flex-col h-full">
              <div className="absolute -right-4 -bottom-4 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-700">
                <span className="material-symbols-outlined text-[160px] text-tertiary">radar</span>
              </div>
              <div className="text-[10px] font-headline text-tertiary mb-2">AUTONOMOUS RED TEAMING</div>
              <p className="text-xs text-on-surface-variant leading-relaxed mb-6">
                Module continuously probes the active firewall with synthetic jailbreak vectors. Self-play mechanisms evolve protection layers against zero-day prompt variants.
              </p>
              <div className="mt-auto space-y-4">
                <div className="flex items-center justify-between p-3 bg-surface-container-lowest border border-tertiary/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-tertiary animate-ping"></span>
                    <span className="text-[10px] font-mono uppercase">Probing Active...</span>
                  </div>
                  <span className="text-[10px] font-mono text-tertiary">3,421 Vectors/sec</span>
                </div>
                <button 
                  onClick={downloadThreatReport}
                  className="w-full py-3 border border-tertiary text-tertiary font-headline text-[10px] tracking-widest hover:bg-tertiary hover:text-[hsl(36,100%,18%)] transition-all active:scale-95">
                  DOWNLOAD THREAT REPORT
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* LOG PANEL */}
        <div id="logs">
          <TerminalLog />
        </div>

      </main>

      <Footer />
    </div>
  );
}

export default App;
