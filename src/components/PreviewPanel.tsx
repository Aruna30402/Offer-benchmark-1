import React, { useState } from 'react';
import { 
  BarChart3, TrendingUp, Users, Award, Building2, 
  Clock, Filter, ArrowUp, ArrowDown, Eye, EyeOff,
  Table, BarChart, Download, Mail
} from 'lucide-react';
import { PreviewData, BankData, Competitor } from '../App';

interface PreviewPanelProps {
  data: PreviewData | null;
  bankData: BankData | null;
  competitors: Competitor[];
  isAnalyzing: boolean;
}

export function PreviewPanel({ data, bankData, competitors, isAnalyzing }: PreviewPanelProps) {
  const [viewMode, setViewMode] = useState<'table' | 'chart'>('table');

  const renderCompetitorSuggestions = () => {
    const suggestedCompetitors = [
      { id: '1', name: 'Chase Bank', selected: true, suggested: true, score: 95 },
      { id: '2', name: 'Bank of America', selected: true, suggested: true, score: 92 },
      { id: '3', name: 'Wells Fargo', selected: false, suggested: true, score: 88 },
      { id: '4', name: 'Citibank', selected: false, suggested: true, score: 85 },
      { id: '5', name: 'Capital One', selected: true, suggested: true, score: 90 },
      { id: '6', name: 'American Express', selected: false, suggested: true, score: 87 },
    ];

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Suggested Competitors</h3>
          <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
            AI Recommended
          </div>
        </div>
        
        <div className="space-y-3">
          {suggestedCompetitors.map((competitor) => (
            <div
              key={competitor.id}
              className={`
                p-3 border-2 rounded-lg cursor-pointer transition-all
                ${competitor.selected 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
                }
              `}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Building2 className={`h-5 w-5 ${competitor.selected ? 'text-blue-600' : 'text-gray-400'}`} />
                  <div>
                    <div className="font-medium text-gray-900">{competitor.name}</div>
                    <div className="text-sm text-gray-500">Relevance Score: {competitor.score}/100</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {competitor.suggested && (
                    <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                      AI Suggested
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderOfferAnalysis = () => {
    const categories = [
      'Dining', 'Travel', 'Electronics', 'Apparel', 'Home & Furniture', 
      'Health', 'Entertainment', 'Jewelry', 'Personal Services', 'Others'
    ];

    const offerData = {
      [bankData?.name || 'Your Bank']: {
        Dining: 45, Travel: 32, Electronics: 28, Apparel: 22, 'Home & Furniture': 18,
        Health: 15, Entertainment: 12, Jewelry: 8, 'Personal Services': 10, Others: 25
      },
      'Chase Bank': {
        Dining: 52, Travel: 38, Electronics: 35, Apparel: 28, 'Home & Furniture': 22,
        Health: 18, Entertainment: 15, Jewelry: 12, 'Personal Services': 14, Others: 30
      },
      'Bank of America': {
        Dining: 48, Travel: 35, Electronics: 32, Apparel: 25, 'Home & Furniture': 20,
        Health: 16, Entertainment: 13, Jewelry: 10, 'Personal Services': 12, Others: 28
      },
      'Capital One': {
        Dining: 41, Travel: 29, Electronics: 26, Apparel: 20, 'Home & Furniture': 16,
        Health: 13, Entertainment: 11, Jewelry: 7, 'Personal Services': 9, Others: 23
      }
    };

    const selectedCompetitors = competitors.filter(c => c.selected);

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Offer Analysis</h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-lg ${viewMode === 'table' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
            >
              <Table className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('chart')}
              className={`p-2 rounded-lg ${viewMode === 'chart' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
            >
              <BarChart className="h-4 w-4" />
            </button>
          </div>
        </div>

        {viewMode === 'table' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 font-medium text-gray-900">Category</th>
                  <th className="text-center py-2 font-medium text-gray-900">Your Bank</th>
                  {selectedCompetitors.map(comp => (
                    <th key={comp.id} className="text-center py-2 font-medium text-gray-900">
                      {comp.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {categories.slice(0, 5).map((category) => (
                  <tr key={category} className="border-b border-gray-100">
                    <td className="py-2 font-medium text-gray-900">{category}</td>
                    <td className="text-center py-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {offerData[bankData?.name || 'Your Bank']?.[category] || 0}
                      </span>
                    </td>
                    {selectedCompetitors.map(comp => {
                      const count = offerData[comp.name]?.[category] || 0;
                      return (
                        <td key={comp.id} className="text-center py-2">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                            {count}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="space-y-3">
            {categories.slice(0, 5).map((category) => {
              const yourBankCount = offerData[bankData?.name || 'Your Bank']?.[category] || 0;
              const maxCount = Math.max(
                yourBankCount,
                ...selectedCompetitors.map(comp => offerData[comp.name]?.[category] || 0)
              );
              
              return (
                <div key={category} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-900">{category}</span>
                    <span className="text-gray-500">{yourBankCount} offers</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(yourBankCount / maxCount) * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const renderScorecard = () => {
    const scorecard = [
      {
        bank: bankData?.name || 'Your Bank',
        depth: 85,
        validity: 92,
        additionRate: 78,
        overall: 85
      },
      {
        bank: 'Chase Bank',
        depth: 92,
        validity: 88,
        additionRate: 85,
        overall: 88
      },
      {
        bank: 'Bank of America',
        depth: 89,
        validity: 90,
        additionRate: 82,
        overall: 87
      },
      {
        bank: 'Capital One',
        depth: 78,
        validity: 85,
        additionRate: 75,
        overall: 79
      }
    ];

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Competitive Scorecard</h3>
        <div className="space-y-3">
          {scorecard.map((bank, index) => (
            <div key={index} className="p-3 border border-gray-200 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-900">{bank.bank}</span>
                <span className="text-lg font-bold text-gray-900">{bank.overall}/100</span>
              </div>
              <div className="space-y-2">
                {[
                  { label: 'Depth', value: bank.depth },
                  { label: 'Validity', value: bank.validity },
                  { label: 'Addition Rate', value: bank.additionRate },
                ].map((metric) => (
                  <div key={metric.label} className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{metric.label}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full ${
                            metric.value >= 90 ? 'bg-green-500' :
                            metric.value >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${metric.value}%` }}
                        />
                      </div>
                      <span className="font-medium w-6 text-right">{metric.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderMerchantTracker = () => {
    const newMerchants = [
      { name: 'Starbucks Premium', category: 'Dining', bank: bankData?.name || 'Your Bank', addedDate: '2025-01-15' },
      { name: 'Tesla Supercharger', category: 'Travel', bank: 'Chase Bank', addedDate: '2025-01-14' },
      { name: 'Apple Store', category: 'Electronics', bank: 'Bank of America', addedDate: '2025-01-12' },
      { name: 'Nike Premium', category: 'Apparel', bank: bankData?.name || 'Your Bank', addedDate: '2025-01-10' },
    ];

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">New Merchant Tracker</h3>
        <div className="space-y-3">
          {newMerchants.map((merchant, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">{merchant.name}</div>
                <div className="text-sm text-gray-500">
                  {merchant.category} • {merchant.bank}
                </div>
              </div>
              <div className="text-sm text-gray-500">
                {new Date(merchant.addedDate).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderCustomAnalytics = () => {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Custom Analytics</h3>
        <div className="text-center py-8 text-gray-500">
          <BarChart3 className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p>Custom analysis results will appear here</p>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    if (!data) {
      return (
        <div className="text-center py-12 text-gray-500">
          <BarChart3 className="h-16 w-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Preview Panel</h3>
          <p className="text-sm">Analytical results and previews will appear here as you interact with the chat assistant.</p>
        </div>
      );
    }

    switch (data.type) {
      case 'competitor_suggestions':
        return renderCompetitorSuggestions();
      case 'offer_analysis':
        return renderOfferAnalysis();
      case 'scorecard':
        return renderScorecard();
      case 'merchant_tracker':
        return renderMerchantTracker();
      case 'custom_analytics':
        return renderCustomAnalytics();
      default:
        return renderCustomAnalytics();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Analysis Preview</h2>
        {data && (
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg">
              <Download className="h-4 w-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg">
              <Mail className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {isAnalyzing ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-500">Analyzing data...</p>
          </div>
        ) : (
          renderContent()
        )}
      </div>
    </div>
  );
}
