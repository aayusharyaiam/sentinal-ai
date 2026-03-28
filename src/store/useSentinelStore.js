import { create } from 'zustand';
import { endpoints } from '../config';

const generateTimestamp = () => {
  const d = new Date();
  return `[${d.toLocaleTimeString('en-US', { hour12: false })}]`;
};

const useSentinelStore = create((set, get) => ({
  isAnalyzing: false,
  currentStage: 0, // 0: Idle, 1: SYS initialized, 2: L1, 3: L2, 4: L3, 5: Verdict
  result: null,
  logs: [],

  analyzePrompt: async (promptText) => {
    // Reset and initialize
    set({
      isAnalyzing: true,
      currentStage: 1,
      result: null,
      logs: [
        { time: generateTimestamp(), source: 'SYS', text: 'Initializing sentinel security cluster... 3-layer pipeline active.', color: 'text-primary' }
      ]
    });

    try {
      const res = await fetch(endpoints.analyze, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: promptText }),
      });

      if (!res.ok) {
        throw new Error(`API Error: ${res.status}`);
      }

      const rawResponse = await res.json();

      // Normalize backend schema to our frontend expectations
      const response = {
        ...rawResponse,
        // Map typical keys in case backend uses slightly different naming (like "detected patterns")
        patterns: Array.isArray(rawResponse.patterns) ? rawResponse.patterns : (rawResponse['detected patterns'] || rawResponse.detected_patterns || []),
        // Mocking a category for L1 and anomaly for L3 logs as the backend returns an aggregated object
        category: rawResponse.status === 'BLOCKED' ? 'jailbreak_heuristic' : 'safe',
        anomaly: rawResponse.status === 'BLOCKED' ? true : false,
        confidence: typeof rawResponse.confidence === 'number' ? rawResponse.confidence : 0.95,
        risk_score: typeof rawResponse.risk_score === 'number' ? rawResponse.risk_score : 0,
        status: rawResponse.status || 'UNKNOWN',
      };

      // We have the response, now we simulate the pipeline progression and streaming logs
      
      // Stage 2: Layer 1 (Intent)
      await new Promise(resolve => setTimeout(resolve, 800));
      set(state => ({
        currentStage: 2,
        logs: [...state.logs, {
          time: generateTimestamp(), source: 'L1', 
          text: `category=${response.category} confidence=${(response.confidence * 100).toFixed(1)}%`,
          color: 'text-primary'
        }]
      }));

      // Stage 3: Layer 2 (Patterns)
      await new Promise(resolve => setTimeout(resolve, 1000));
      const patternsText = response.patterns.length > 0 ? `matched ${response.patterns.join(', ')}` : 'no heuristic patterns matched';
      set(state => ({
        currentStage: 3,
        logs: [...state.logs, { 
          time: generateTimestamp(), source: 'L2', 
          text: patternsText,
          color: response.patterns.length > 0 ? 'text-secondary' : 'text-primary'
        }]
      }));

      // Stage 4: Layer 3 (Vector)
      await new Promise(resolve => setTimeout(resolve, 900));
      set(state => ({
        currentStage: 4,
        logs: [...state.logs, {
          time: generateTimestamp(), source: 'L3',
          text: `anomaly=${response.anomaly}`,
          color: response.anomaly ? 'text-secondary' : 'text-primary'
        }]
      }));

      // Stage 5: Verdict computation
      await new Promise(resolve => setTimeout(resolve, 700));
      set(state => ({
        logs: [...state.logs, {
          time: generateTimestamp(), source: 'ENG',
          text: `risk_score=${response.risk_score.toFixed(2)}`,
          color: 'text-tertiary'
        }]
      }));

      // Final Stage: Presenting the verdict
      await new Promise(resolve => setTimeout(resolve, 600));
      const finalStatusColor = response.status === 'BLOCKED' ? 'text-error' : (response.status === 'SUSPICIOUS' ? 'text-tertiary' : 'text-primary');

      set(state => ({
        isAnalyzing: false,
        currentStage: 5,
        result: response,
        logs: [...state.logs, {
          time: generateTimestamp(), source: 'OUT',
          text: `STATUS: ${response.status}. ACTION: ${response.status === 'BLOCKED' ? 'REJECTED' : 'PROCESSED'}.`,
          color: finalStatusColor
        }]
      }));

    } catch (e) {
      console.error(e);
      set(state => ({
        isAnalyzing: false,
        logs: [...state.logs, { time: generateTimestamp(), source: 'ERR', text: 'Analysis failed due to a system error.', color: 'text-error' }]
      }));
    }
  },
  
  clear: () => set({ isAnalyzing: false, currentStage: 0, result: null, logs: [] })
}));

export default useSentinelStore;
