import React, { useState } from 'react';
import { 
  Download, Mail, Calendar, TrendingUp, 
  Award, Users, Clock, BarChart3, Filter, ArrowUp, ArrowDown 
} from 'lucide-react';
import { BankData, Competitor } from '../App';

interface AnalysisResultsProps {
  bankData: BankData;
  competitors: Competitor[];
  onOpenChat?: () => void;
}

export function AnalysisResults({ bankData, competitors, onOpenChat }: AnalysisResultsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [reportSchedule, setReportSchedule] = useState<'weekly' | 'monthly'>('weekly');

  const categories = [
    'Dining', 'Travel', 'Electronics', 'Apparel', 'Home & Furniture', 
    'Health', 'Entertainment', 'Jewelry', 'Personal Services', 'Others'
  ];

  const selectedCompetitors = competitors.filter(c => c.selected);

  // Mock data for demonstration
  const offerData = {
    [bankData.name]: {
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

  const newMerchants = [
    { name: 'Starbucks Premium', category: 'Dining', bank: bankData.name, addedDate: '2025-01-15' },
    { name: 'Tesla Supercharger', category: 'Travel', bank: 'Chase Bank', addedDate: '2025-01-14' },
    { name: 'Apple Store', category: 'Electronics', bank: 'Bank of America', addedDate: '2025-01-12' },
    { name: 'Nike Premium', category: 'Apparel', bank: bankData.name, addedDate: '2025-01-10' },
  ];

  const scorecard = [
    {
      bank: bankData.name,
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

  const handleExport = (format: 'pdf' | 'csv' | 'json') => {
    console.log(`Exporting as ${format}...`);
    // Simulate download
    alert(`Downloading report as ${format.toUpperCase()}...`);
  };

  const handleEmailShare = () => {
    console.log('Opening email client...');
    alert('Opening email client to share the report...');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Benchmarking Analysis for {bankData.name}
          </h2>
          <p className="text-gray-600">
            Comparing against {selectedCompetitors.length} competitors across {categories.length} categories
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleExport('pdf')}
              className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Download className="h-4 w-4" />
            </button>
            <button
              onClick={handleEmailShare}
              className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Mail className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Active Offers', value: '215', change: '+12%', icon: BarChart3, color: 'blue' },
          { label: 'Categories Covered', value: '10', change: '100%', icon: Filter, color: 'green' },
          { label: 'New Merchants', value: '8', change: '+25%', icon: Users, color: 'purple' },
          { label: 'Avg. Offer Validity', value: '45 days', change: '+5d', icon: Clock, color: 'orange' },
        ].map((metric, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 bg-${metric.color}-100 rounded-lg`}>
                <metric.icon className={`h-5 w-5 text-${metric.color}-600`} />
              </div>
              <div className="flex items-center space-x-1 text-green-600 text-sm">
                <ArrowUp className="h-3 w-3" />
                <span>{metric.change}</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
            <div className="text-sm text-gray-500">{metric.label}</div>
          </div>
        ))}
      </div>

      {/* Offer Portfolio Analysis */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Offer Portfolio by Category</h3>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Category</th>
                {[bankData.name, ...selectedCompetitors.map(c => c.name)].map(bank => (
                  <th key={bank} className="text-center py-3 px-4 font-semibold text-gray-900">
                    {bank}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {categories
                .filter(cat => selectedCategory === 'all' || selectedCategory === cat)
                .map((category) => (
                <tr key={category} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">{category}</td>
                  {[bankData.name, ...selectedCompetitors.map(c => c.name)].map(bank => {
                    const count = offerData[bank]?.[category] || 0;
                    const isHighest = Math.max(
                      ...Object.keys(offerData).map(b => offerData[b][category] || 0)
                    ) === count;
                    
                    return (
                      <td key={bank} className="text-center py-3 px-4">
                        <span className={`
                          inline-flex items-center px-2 py-1 rounded-full text-sm font-medium
                          ${isHighest 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-700'
                          }
                        `}>
                          {count}
                          {isHighest && <Award className="h-3 w-3 ml-1" />}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* New Merchant Tracker */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">New Merchant Tracker</h3>
          <div className="space-y-4">
            {newMerchants.map((merchant, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
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

        {/* Comparative Scorecard */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Competitive Scorecard</h3>
          <div className="space-y-4">
            {scorecard.map((bank, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-center mb-3">
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
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              metric.value >= 90 ? 'bg-green-500' :
                              metric.value >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${metric.value}%` }}
                          />
                        </div>
                        <span className="font-medium w-8">{metric.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scheduled Reporting */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Calendar className="h-5 w-5 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Scheduled Reporting</h3>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="weekly"
                name="schedule"
                value="weekly"
                checked={reportSchedule === 'weekly'}
                onChange={(e) => setReportSchedule(e.target.value as 'weekly')}
                className="text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="weekly" className="text-sm font-medium text-gray-700">Weekly</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="monthly"
                name="schedule"
                value="monthly"
                checked={reportSchedule === 'monthly'}
                onChange={(e) => setReportSchedule(e.target.value as 'monthly')}
                className="text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="monthly" className="text-sm font-medium text-gray-700">Monthly</label>
            </div>
          </div>
        </div>
        
        <p className="text-gray-600 mb-4">
          Get automated reports with competitive insights, new offers, and market analysis delivered to your inbox.
        </p>
        
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => handleExport('pdf')}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
          >
            <Download className="h-4 w-4" />
            <span>Export PDF</span>
          </button>
          
          <button
            onClick={() => handleExport('csv')}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
            <Download className="h-4 w-4" />
            <span>Export CSV</span>
          </button>
          
          <button
            onClick={() => handleExport('json')}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
          >
            <Download className="h-4 w-4" />
            <span>Export JSON</span>
          </button>
          
          <button
            onClick={handleEmailShare}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Mail className="h-4 w-4" />
            <span>Email Report</span>
          </button>
        </div>
      </div>
    </div>
  );
}