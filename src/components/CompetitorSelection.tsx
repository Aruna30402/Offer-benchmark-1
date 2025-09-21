import React, { useState, useEffect } from 'react';
import { Search, Plus, Check, X, Building2, TrendingUp, Users, Award } from 'lucide-react';
import { Competitor } from '../App';

interface CompetitorSelectionProps {
  bankName: string;
  onComplete: (competitors: Competitor[]) => void;
}

export function CompetitorSelection({ bankName, onComplete }: CompetitorSelectionProps) {
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [customCompetitor, setCustomCompetitor] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Suggested competitors based on bank type
  const suggestedCompetitors = [
    { id: 'chase', name: 'Chase Bank', suggested: true, relevance: 95 },
    { id: 'bofa', name: 'Bank of America', suggested: true, relevance: 92 },
    { id: 'capitalone', name: 'Capital One', suggested: true, relevance: 90 },
    { id: 'wells', name: 'Wells Fargo', suggested: true, relevance: 88 },
    { id: 'citi', name: 'Citibank', suggested: true, relevance: 85 },
    { id: 'amex', name: 'American Express', suggested: true, relevance: 87 },
    { id: 'discover', name: 'Discover', suggested: true, relevance: 82 },
    { id: 'usbank', name: 'U.S. Bank', suggested: true, relevance: 80 },
  ];

  // Additional competitors for search
  const allCompetitors = [
    ...suggestedCompetitors,
    { id: 'pnc', name: 'PNC Bank', suggested: false, relevance: 78 },
    { id: 'truist', name: 'Truist', suggested: false, relevance: 75 },
    { id: 'regions', name: 'Regions Bank', suggested: false, relevance: 73 },
    { id: 'keybank', name: 'KeyBank', suggested: false, relevance: 70 },
    { id: 'huntington', name: 'Huntington Bank', suggested: false, relevance: 68 },
    { id: 'citizens', name: 'Citizens Bank', suggested: false, relevance: 65 },
  ];

  useEffect(() => {
    // Initialize with suggested competitors
    const initialCompetitors = suggestedCompetitors.map(comp => ({
      id: comp.id,
      name: comp.name,
      selected: false,
      suggested: comp.suggested
    }));
    setCompetitors(initialCompetitors);
  }, []);

  const filteredCompetitors = allCompetitors.filter(comp =>
    comp.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleCompetitor = (id: string) => {
    setCompetitors(prev =>
      prev.map(comp =>
        comp.id === id ? { ...comp, selected: !comp.selected } : comp
      )
    );
  };

  const handleSelectAll = () => {
    setCompetitors(prev =>
      prev.map(comp => ({ ...comp, selected: true }))
    );
  };

  const handleDeselectAll = () => {
    setCompetitors(prev =>
      prev.map(comp => ({ ...comp, selected: false }))
    );
  };

  const handleAddCustom = () => {
    if (customCompetitor.trim()) {
      const newCompetitor: Competitor = {
        id: `custom-${Date.now()}`,
        name: customCompetitor.trim(),
        selected: true,
        suggested: false
      };
      setCompetitors(prev => [...prev, newCompetitor]);
      setCustomCompetitor('');
      setShowAddForm(false);
    }
  };

  const handleRemoveCompetitor = (id: string) => {
    setCompetitors(prev => prev.filter(comp => comp.id !== id));
  };

  const handleContinue = () => {
    const selectedCompetitors = competitors.filter(comp => comp.selected);
    if (selectedCompetitors.length === 0) {
      alert('Please select at least one competitor to continue.');
      return;
    }

    setIsProcessing(true);
    
    // Simulate processing time
    setTimeout(() => {
      onComplete(selectedCompetitors);
      setIsProcessing(false);
    }, 1500);
  };

  const selectedCount = competitors.filter(comp => comp.selected).length;
  const suggestedCount = competitors.filter(comp => comp.suggested && comp.selected).length;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Select Competitors for {bankName}
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Choose the banks you'd like to compare against. We've suggested the most relevant 
          competitors based on your bank's profile, but you can add custom ones too.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Building2 className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Selected Competitors</p>
              <p className="text-2xl font-bold text-gray-900">{selectedCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Award className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Suggested Selected</p>
              <p className="text-2xl font-bold text-gray-900">{suggestedCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Analysis Depth</p>
              <p className="text-2xl font-bold text-gray-900">
                {selectedCount > 5 ? 'High' : selectedCount > 2 ? 'Medium' : 'Basic'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Competitor List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Available Competitors</h2>
              <div className="flex space-x-2">
                <button
                  onClick={handleSelectAll}
                  className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  Select All
                </button>
                <button
                  onClick={handleDeselectAll}
                  className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Deselect All
                </button>
              </div>
            </div>

            {/* Search */}
            <div className="relative mb-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search competitors..."
              />
            </div>

            {/* Competitor List */}
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredCompetitors.map((comp) => {
                const competitor = competitors.find(c => c.id === comp.id);
                const isSelected = competitor?.selected || false;
                
                return (
                  <div
                    key={comp.id}
                    className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
                      isSelected
                        ? 'border-blue-200 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => handleToggleCompetitor(comp.id)}
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'bg-blue-600 border-blue-600'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {isSelected && <Check className="h-3 w-3 text-white" />}
                      </button>
                      
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900">{comp.name}</span>
                          {comp.suggested && (
                            <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                              Suggested
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <span>Relevance: {comp.relevance}%</span>
                          <div className="w-16 bg-gray-200 rounded-full h-1">
                            <div
                              className="bg-blue-500 h-1 rounded-full"
                              style={{ width: `${comp.relevance}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {!comp.suggested && (
                      <button
                        onClick={() => handleRemoveCompetitor(comp.id)}
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Add Custom Competitor */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              {!showAddForm ? (
                <button
                  onClick={() => setShowAddForm(true)}
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Custom Competitor</span>
                </button>
              ) : (
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={customCompetitor}
                    onChange={(e) => setCustomCompetitor(e.target.value)}
                    placeholder="Enter competitor name..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddCustom()}
                  />
                  <button
                    onClick={handleAddCustom}
                    disabled={!customCompetitor.trim()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => {
                      setShowAddForm(false);
                      setCustomCompetitor('');
                    }}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Selected Competitors & Actions */}
        <div className="space-y-6">
          {/* Selected Competitors */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Selected Competitors ({selectedCount})
            </h3>
            
            {selectedCount === 0 ? (
              <p className="text-gray-500 text-sm">No competitors selected yet</p>
            ) : (
              <div className="space-y-2">
                {competitors
                  .filter(comp => comp.selected)
                  .map((comp) => (
                    <div
                      key={comp.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <span className="font-medium text-gray-900">{comp.name}</span>
                      <button
                        onClick={() => handleToggleCompetitor(comp.id)}
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
              </div>
            )}
          </div>

          {/* Analysis Preview */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Analysis Preview</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Offer Portfolio Analysis</span>
                <span className="text-green-600">✓</span>
              </div>
              <div className="flex justify-between">
                <span>Competitive Scorecard</span>
                <span className="text-green-600">✓</span>
              </div>
              <div className="flex justify-between">
                <span>New Merchant Tracker</span>
                <span className="text-green-600">✓</span>
              </div>
              <div className="flex justify-between">
                <span>Custom Analytics</span>
                <span className="text-green-600">✓</span>
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            disabled={selectedCount === 0 || isProcessing}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Check className="h-4 w-4" />
                <span>Continue to Analysis</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
