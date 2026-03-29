import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import PromptAnalyzer from './components/PromptAnalyzer';
import VerdictPanel from './components/VerdictPanel';
import TerminalLog from './components/TerminalLog';
import Notification from './components/Notification';
import ThreatMetrics from './components/ThreatMetrics';
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

        {/* LOG PANEL */}
        <div id="logs">
          <TerminalLog />
        </div>

        {/* THREAT METRICS & RED TEAMING ROW */}
        <div id="metrics" className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <ThreatMetrics />

          <section className="lg:col-span-4 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 bg-tertiary"></div>
              <h2 className="font-headline text-xl tracking-widest uppercase text-tertiary">Data Export</h2>
            </div>
            <div className="bg-surface-container-low p-6 border border-tertiary/20 relative group overflow-hidden flex flex-col h-full">
              <div className="absolute -right-4 -bottom-4 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-700">
                <span className="material-symbols-outlined text-[160px] text-tertiary">file_download</span>
              </div>
              <div className="text-[10px] font-headline text-tertiary mb-2">THREAT INTELLIGENCE</div>
              <p className="text-xs text-on-surface-variant leading-relaxed mb-6">
                Export full analysis results including risk indicators, pattern matching, and comprehensive reasoning data into a structured JSON report.
              </p>
              <div className="mt-auto space-y-4">
                <button 
                  onClick={downloadThreatReport}
                  className="w-full py-3 border border-tertiary text-tertiary font-headline text-[10px] tracking-widest hover:bg-tertiary hover:text-[hsl(36,100%,18%)] transition-all active:scale-95">
                  DOWNLOAD THREAT REPORT
                </button>
              </div>
            </div>
          </section>
        </div>

      </main>

      <Footer />
    </div>
  );
}

export default App;
