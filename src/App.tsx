import React, { useState } from 'react';
import { ChatInterface } from './components/ChatInterface';
import { AnalysisPanel } from './components/AnalysisPanel';
import { BarChart3 } from 'lucide-react';

export interface BankData {
  name: string;
  dataSource: 'url' | 'csv';
  url?: string;
  csvData?: any[];
}

export interface Competitor {
  id: string;
  name: string;
  selected: boolean;
  suggested?: boolean;
  url?: string;
}

export interface AnalysisData {
  type: 'offers' | 'merchants' | 'scorecard' | 'custom';
  title: string;
  data: any;
  viewType?: 'table' | 'chart';
}

function App() {
  const [bankData, setBankData] = useState<BankData | null>(null);
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#0366D6] to-[#218838] border-b border-[#E1E4E8] shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">
              Offer Benchmarking Agent
            </h1>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Chat Panel */}
        <div className={`${analysisData ? 'w-1/2 border-r border-[#E1E4E8]' : 'w-full'} transition-all duration-300`}>
          <ChatInterface
            onBankDataChange={setBankData}
            onCompetitorsChange={setCompetitors}
            onAnalysisDataChange={setAnalysisData}
          />
        </div>

        {/* Analysis Panel - Right Side */}
        {analysisData && (
          <div className="w-1/2 bg-white">
            <AnalysisPanel 
              analysisData={analysisData}
              bankData={bankData}
              competitors={competitors}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;