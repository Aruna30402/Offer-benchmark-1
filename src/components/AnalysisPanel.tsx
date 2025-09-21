import React, { useState } from 'react';
import { BarChart3, Table, TrendingUp, Award, Users, Building2 } from 'lucide-react';
import { AnalysisData, BankData, Competitor } from '../App';

interface AnalysisPanelProps {
  analysisData: AnalysisData | null;
  bankData: BankData | null;
  competitors: Competitor[];
}

export function AnalysisPanel({ analysisData, bankData, competitors }: AnalysisPanelProps) {
  const [viewType, setViewType] = useState<'table' | 'chart'>('table');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [merchantData, setMerchantData] = useState<any>(null);

  if (!analysisData) {
    return (
      <div className="h-full flex items-center justify-center bg-[#F7F8FA]">
        <div className="text-center">
          <div className="p-4 bg-white rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <BarChart3 className="h-8 w-8 text-[#0366D6]" />
          </div>
          <h3 className="text-lg font-semibold text-[#24292F] mb-2">Analysis Panel</h3>
          <p className="text-[#454C56] max-w-sm">
            Start a conversation to begin benchmarking your bank's offers against competitors. 
            I'll display analysis results here as we go through the process.
          </p>
        </div>
      </div>
    );
  }

  const renderOffersAnalysis = () => {
    const categories = ['Dining', 'Travel', 'Electronics', 'Apparel', 'Home & Furniture', 'Health', 'Entertainment', 'Jewelry', 'Personal Services', 'Others'];
    
    const offerData = {
      [bankData?.name || 'Your Bank']: {
        Dining: 45, Travel: 32, Electronics: 28, Apparel: 22, 'Home & Furniture': 18,
        Health: 15, Entertainment: 12, Jewelry: 8, 'Personal Services': 10, Others: 25
      },
      'ADCB': { Dining: 52, Travel: 38, Electronics: 35, Apparel: 28, 'Home & Furniture': 22, Health: 18, Entertainment: 15, Jewelry: 12, 'Personal Services': 14, Others: 30 },
      'FAB': { Dining: 48, Travel: 35, Electronics: 32, Apparel: 25, 'Home & Furniture': 20, Health: 16, Entertainment: 13, Jewelry: 10, 'Personal Services': 12, Others: 28 },
      'DIB': { Dining: 41, Travel: 29, Electronics: 26, Apparel: 20, 'Home & Furniture': 16, Health: 13, Entertainment: 11, Jewelry: 7, 'Personal Services': 9, Others: 23 },
      'ENBD': { Dining: 44, Travel: 31, Electronics: 29, Apparel: 24, 'Home & Furniture': 19, Health: 15, Entertainment: 12, Jewelry: 9, 'Personal Services': 11, Others: 26 }
    };

    // Merchant data for each category
    const categoryMerchantData = {
      'Dining': [
        { name: 'Starbucks', bank: bankData?.name || 'Your Bank', offer: '20% off on all beverages', validity: '30 days' },
        { name: 'McDonald\'s', bank: 'ADCB', offer: '15% off on meals', validity: '45 days' },
        { name: 'Pizza Hut', bank: 'FAB', offer: '25% off on pizza orders', validity: '60 days' },
        { name: 'KFC', bank: 'DIB', offer: '10% off on chicken meals', validity: '30 days' },
        { name: 'Subway', bank: 'ENBD', offer: 'Buy 1 Get 1 Free', validity: '15 days' }
      ],
      'Travel': [
        { name: 'Emirates Airlines', bank: bankData?.name || 'Your Bank', offer: '5% cashback on flights', validity: '90 days' },
        { name: 'Etihad Airways', bank: 'ADCB', offer: '10% off on bookings', validity: '60 days' },
        { name: 'Uber', bank: 'FAB', offer: '15% off on rides', validity: '30 days' },
        { name: 'Careem', bank: 'DIB', offer: '20% off on first 5 rides', validity: '45 days' },
        { name: 'Dubai Metro', bank: 'ENBD', offer: 'Free Nol card with 20 AED credit', validity: '30 days' }
      ],
      'Electronics': [
        { name: 'Apple Store', bank: bankData?.name || 'Your Bank', offer: '0% EMI for 12 months', validity: '90 days' },
        { name: 'Samsung', bank: 'ADCB', offer: '10% off on smartphones', validity: '60 days' },
        { name: 'Sharaf DG', bank: 'FAB', offer: '15% off on electronics', validity: '45 days' },
        { name: 'Jumbo Electronics', bank: 'DIB', offer: '5% cashback on purchases', validity: '30 days' },
        { name: 'Virgin Megastore', bank: 'ENBD', offer: 'Buy 2 Get 1 Free on accessories', validity: '30 days' }
      ],
      'Apparel': [
        { name: 'Nike', bank: bankData?.name || 'Your Bank', offer: '20% off on sports wear', validity: '45 days' },
        { name: 'Adidas', bank: 'ADCB', offer: '15% off on shoes', validity: '30 days' },
        { name: 'H&M', bank: 'FAB', offer: '25% off on selected items', validity: '60 days' },
        { name: 'Zara', bank: 'DIB', offer: '10% off on new collection', validity: '30 days' },
        { name: 'Marks & Spencer', bank: 'ENBD', offer: 'Buy 1 Get 1 Free on selected items', validity: '45 days' }
      ],
      'Home & Furniture': [
        { name: 'IKEA', bank: bankData?.name || 'Your Bank', offer: '10% off on furniture', validity: '90 days' },
        { name: 'Home Centre', bank: 'ADCB', offer: '15% off on home decor', validity: '60 days' },
        { name: 'Pan Emirates', bank: 'FAB', offer: '20% off on electronics', validity: '45 days' },
        { name: 'Ace Hardware', bank: 'DIB', offer: '5% cashback on tools', validity: '30 days' },
        { name: 'Home Box', bank: 'ENBD', offer: 'Buy 2 Get 1 Free on selected items', validity: '60 days' }
      ],
      'Health': [
        { name: 'Aster Pharmacy', bank: bankData?.name || 'Your Bank', offer: '10% off on medicines', validity: '30 days' },
        { name: 'Life Pharmacy', bank: 'ADCB', offer: '15% off on health products', validity: '45 days' },
        { name: 'Boots', bank: 'FAB', offer: '20% off on beauty products', validity: '60 days' },
        { name: 'Guardian Pharmacy', bank: 'DIB', offer: '5% cashback on purchases', validity: '30 days' },
        { name: 'Wellcare Pharmacy', bank: 'ENBD', offer: 'Buy 2 Get 1 Free on vitamins', validity: '45 days' }
      ],
      'Entertainment': [
        { name: 'Vox Cinemas', bank: bankData?.name || 'Your Bank', offer: '25% off on movie tickets', validity: '30 days' },
        { name: 'Nova Cinemas', bank: 'ADCB', offer: '20% off on weekend shows', validity: '45 days' },
        { name: 'Reel Cinemas', bank: 'FAB', offer: 'Buy 1 Get 1 Free on Tuesdays', validity: '60 days' },
        { name: 'Cinepolis', bank: 'DIB', offer: '15% off on food combos', validity: '30 days' },
        { name: 'IMAX', bank: 'ENBD', offer: '10% off on premium seats', validity: '45 days' }
      ],
      'Jewelry': [
        { name: 'Damiani', bank: bankData?.name || 'Your Bank', offer: '15% off on diamond jewelry', validity: '90 days' },
        { name: 'Tiffany & Co', bank: 'ADCB', offer: '10% off on engagement rings', validity: '60 days' },
        { name: 'Cartier', bank: 'FAB', offer: '20% off on watches', validity: '45 days' },
        { name: 'Bulgari', bank: 'DIB', offer: '5% cashback on luxury items', validity: '30 days' },
        { name: 'Van Cleef & Arpels', bank: 'ENBD', offer: 'Buy 2 Get 1 Free on accessories', validity: '60 days' }
      ],
      'Personal Services': [
        { name: 'Nail Spa', bank: bankData?.name || 'Your Bank', offer: '30% off on manicures', validity: '30 days' },
        { name: 'Hair Salon', bank: 'ADCB', offer: '25% off on haircuts', validity: '45 days' },
        { name: 'Massage Center', bank: 'FAB', offer: '20% off on spa treatments', validity: '60 days' },
        { name: 'Beauty Clinic', bank: 'DIB', offer: '15% off on facials', validity: '30 days' },
        { name: 'Fitness Center', bank: 'ENBD', offer: '10% off on memberships', validity: '90 days' }
      ],
      'Others': [
        { name: 'Car Wash', bank: bankData?.name || 'Your Bank', offer: '50% off on premium wash', validity: '30 days' },
        { name: 'Pet Store', bank: 'ADCB', offer: '20% off on pet supplies', validity: '45 days' },
        { name: 'Bookstore', bank: 'FAB', offer: '15% off on books', validity: '60 days' },
        { name: 'Stationery', bank: 'DIB', offer: '10% off on office supplies', validity: '30 days' },
        { name: 'Gift Shop', bank: 'ENBD', offer: 'Buy 2 Get 1 Free on gifts', validity: '45 days' }
      ]
    };

    const handleCategoryClick = (category: string) => {
      setSelectedCategory(category);
      const categoryMerchants = categoryMerchantData[category] || [];
      setMerchantData(categoryMerchants);
    };

    const selectedCompetitors = competitors.filter(c => c.selected);
    const allBanks = [bankData?.name || 'Your Bank', ...selectedCompetitors.map(c => c.name)];

    if (viewType === 'chart') {
      // Calculate total offers by category for pie chart
      const categoryTotals = categories.map(category => {
        const total = allBanks.reduce((sum, bank) => sum + (offerData[bank]?.[category] || 0), 0);
        return { category, total };
      }).filter(item => item.total > 0);

      const totalOffers = categoryTotals.reduce((sum, item) => sum + item.total, 0);

      // Pie chart colors - unique colors for each category
      const colors = [
        '#0366D6', // Blue - Dining
        '#218838', // Green - Travel
        '#FFD33D', // Yellow - Electronics
        '#E99695', // Pink - Apparel
        '#8B5CF6', // Purple - Home & Furniture
        '#F59E0B', // Orange - Health
        '#EF4444', // Red - Entertainment
        '#10B981', // Emerald - Jewelry
        '#F97316', // Orange - Personal Services
        '#6366F1'  // Indigo - Others
      ];

      return (
        <div className="space-y-6">
          {/* Pie Chart */}
          <div className="bg-white rounded-lg p-6 border border-[#E1E4E8]">
            <h3 className="text-lg font-semibold text-[#24292F] mb-4">Offers Distribution by Category</h3>
            <div className="flex items-center justify-center">
              <div className="relative w-64 h-64">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  {categoryTotals.map((item, index) => {
                    const percentage = (item.total / totalOffers) * 100;
                    const startAngle = categoryTotals.slice(0, index).reduce((sum, prev) => sum + (prev.total / totalOffers) * 360, 0);
                    const endAngle = startAngle + (item.total / totalOffers) * 360;
                    
                    const startAngleRad = (startAngle * Math.PI) / 180;
                    const endAngleRad = (endAngle * Math.PI) / 180;
                    
                    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
                    
                    const x1 = 50 + 40 * Math.cos(startAngleRad);
                    const y1 = 50 + 40 * Math.sin(startAngleRad);
                    const x2 = 50 + 40 * Math.cos(endAngleRad);
                    const y2 = 50 + 40 * Math.sin(endAngleRad);
                    
                    const pathData = [
                      `M 50 50`,
                      `L ${x1} ${y1}`,
                      `A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                      'Z'
                    ].join(' ');
                    
                    return (
                      <g key={item.category}>
                        <path
                          d={pathData}
                          fill={colors[index % colors.length]}
                          className="hover:opacity-80 transition-opacity cursor-pointer"
                          onClick={() => handleCategoryClick(item.category)}
                        />
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="bg-white rounded-lg p-6 border border-[#E1E4E8]">
            <h4 className="font-semibold text-[#24292F] mb-4">Offers by Category</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categoryTotals.map((item, index) => (
                <div key={item.category} className="flex items-center space-x-4 p-3 bg-[#F7F8FA] rounded-lg hover:bg-[#E1E4E8] transition-colors cursor-pointer" onClick={() => handleCategoryClick(item.category)}>
                  <div
                    className="w-6 h-6 rounded-full flex-shrink-0 shadow-sm"
                    style={{ backgroundColor: colors[index % colors.length] }}
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-[#24292F] text-lg">{item.total}</div>
                    <div className="text-lg font-semibold text-[#24292F]">{item.category}</div>
                    <div className="text-xs text-[#454C56]">
                      {(item.total / totalOffers * 100).toFixed(1)}% of total
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bar Chart for Bank Comparison */}
          <div className="bg-white rounded-lg p-6 border border-[#E1E4E8]">
            <h4 className="font-semibold text-[#24292F] mb-4">Offers by Bank</h4>
            <div className="space-y-3">
              {allBanks.map(bank => {
                const totalBankOffers = categories.reduce((sum, category) => sum + (offerData[bank]?.[category] || 0), 0);
                const maxOffers = Math.max(...allBanks.map(b => 
                  categories.reduce((sum, category) => sum + (offerData[b]?.[category] || 0), 0)
                ));
                const percentage = maxOffers > 0 ? (totalBankOffers / maxOffers) * 100 : 0;
                
                return (
                  <div key={bank} className="flex items-center space-x-3">
                    <div className="w-32 text-sm font-medium text-[#454C56] truncate">{bank}</div>
                    <div className="flex-1 bg-gray-200 rounded-full h-4 relative">
                      <div
                        className={`h-4 rounded-full ${
                          bank === bankData?.name ? 'bg-[#0366D6]' : 'bg-[#218838]'
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <div className="w-12 text-sm font-medium text-[#24292F]">{totalBankOffers}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E1E4E8]">
                <th className="text-left py-3 px-4 font-semibold text-[#24292F]">Category</th>
                {allBanks.map(bank => (
                  <th key={bank} className="text-center py-3 px-4 font-semibold text-[#24292F]">
                    {bank}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {categories.map(category => (
                <tr key={category} className="border-b border-[#E1E4E8] hover:bg-[#F7F8FA]">
                  <td className="py-3 px-4 font-medium text-[#24292F]">
                    <button
                      onClick={() => handleCategoryClick(category)}
                      className={`text-left hover:text-[#0366D6] transition-colors cursor-pointer ${
                        selectedCategory === category ? 'text-[#0366D6] font-semibold' : ''
                      }`}
                    >
                      {category}
                    </button>
                  </td>
                  {allBanks.map(bank => {
                    const count = offerData[bank]?.[category] || 0;
                    const isHighest = Math.max(...allBanks.map(b => offerData[b]?.[category] || 0)) === count;
                    
                    return (
                      <td key={bank} className="text-center py-3 px-4">
                        <span className={`
                          inline-flex items-center px-2 py-1 rounded-full text-sm font-medium
                          ${isHighest 
                            ? 'bg-[#FFD33D] text-[#24292F]' 
                            : 'bg-[#F7F8FA] text-[#454C56]'
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

        {/* Merchant Details - Always visible below the main table */}
        {selectedCategory && merchantData && (
          <div className="bg-[#F7F8FA] border border-[#E1E4E8] rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#24292F]">
                Merchants in {selectedCategory} Category
              </h3>
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setMerchantData(null);
                }}
                className="text-[#454C56] hover:text-[#0366D6] transition-colors text-lg font-bold"
              >
                ✕
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#E1E4E8]">
                    <th className="text-left py-3 px-4 font-semibold text-[#24292F]">Merchant</th>
                    <th className="text-left py-3 px-4 font-semibold text-[#24292F]">Bank</th>
                    <th className="text-left py-3 px-4 font-semibold text-[#24292F]">Offer</th>
                    <th className="text-left py-3 px-4 font-semibold text-[#24292F]">Validity</th>
                  </tr>
                </thead>
                <tbody>
                  {merchantData.map((merchant: any, index: number) => (
                    <tr key={index} className="border-b border-[#E1E4E8] hover:bg-white transition-colors">
                      <td className="py-3 px-4 font-medium text-[#24292F]">{merchant.name}</td>
                      <td className="py-3 px-4 text-[#454C56]">{merchant.bank}</td>
                      <td className="py-3 px-4 text-[#454C56]">{merchant.offer}</td>
                      <td className="py-3 px-4 text-[#454C56]">{merchant.validity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderMerchantsAnalysis = () => {
    // Mock data for newly added merchants by bank
    const newMerchantsByBank = {
      [bankData?.name || 'Your Bank']: [
        { name: 'Starbucks Premium', category: 'Dining', addedDate: '2025-01-15', offer: '25% off on premium drinks' },
        { name: 'Nike Premium', category: 'Apparel', addedDate: '2025-01-10', offer: '30% off on sports wear' },
        { name: 'Dubai Mall Cinema', category: 'Entertainment', addedDate: '2025-01-08', offer: 'Buy 1 Get 1 Free on tickets' },
        { name: 'Aster Clinic', category: 'Health', addedDate: '2025-01-05', offer: '15% off on consultations' }
      ],
      'ADCB': [
        { name: 'Tesla Supercharger', category: 'Travel', addedDate: '2025-01-14', offer: '10% off on charging' },
        { name: 'Apple Store', category: 'Electronics', addedDate: '2025-01-12', offer: '0% EMI for 24 months' },
        { name: 'Marriott Hotels', category: 'Travel', addedDate: '2025-01-09', offer: '20% off on bookings' },
        { name: 'Sephora', category: 'Health', addedDate: '2025-01-07', offer: '15% off on beauty products' },
        { name: 'Virgin Megastore', category: 'Entertainment', addedDate: '2025-01-03', offer: 'Buy 2 Get 1 Free' }
      ],
      'FAB': [
        { name: 'Careem Plus', category: 'Travel', addedDate: '2025-01-13', offer: '20% off on rides' },
        { name: 'Samsung Store', category: 'Electronics', addedDate: '2025-01-11', offer: '15% off on smartphones' },
        { name: 'H&M', category: 'Apparel', addedDate: '2025-01-06', offer: '25% off on selected items' }
      ],
      'DIB': [
        { name: 'IKEA', category: 'Home & Furniture', addedDate: '2025-01-08', offer: '10% off on furniture' },
        { name: 'KFC', category: 'Dining', addedDate: '2025-01-04', offer: '15% off on meals' },
        { name: 'Ace Hardware', category: 'Home & Furniture', addedDate: '2025-01-02', offer: '5% cashback on tools' }
      ],
      'ENBD': [
        { name: 'Dubai Mall', category: 'Entertainment', addedDate: '2025-01-05', offer: 'Free parking for 3 hours' },
        { name: 'Subway', category: 'Dining', addedDate: '2025-01-01', offer: 'Buy 1 Get 1 Free' }
      ]
    };

    // Calculate previous month counts (mock data)
    const previousMonthCounts = {
      [bankData?.name || 'Your Bank']: 2,
      'ADCB': 3,
      'FAB': 2,
      'DIB': 1,
      'ENBD': 1
    };

    const selectedCompetitors = competitors.filter(c => c.selected);
    const allBanks = [bankData?.name || 'Your Bank', ...selectedCompetitors.map(c => c.name)];

    return (
      <div className="space-y-6">
        {/* Summary Cards - New Merchants Count */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allBanks.map(bank => {
            const currentCount = newMerchantsByBank[bank]?.length || 0;
            const previousCount = previousMonthCounts[bank] || 0;
            const change = currentCount - previousCount;
            const changePercent = previousCount > 0 ? ((change / previousCount) * 100).toFixed(1) : 'N/A';
            
            return (
              <div key={bank} className="bg-white rounded-lg p-4 border border-[#E1E4E8] hover:shadow-sm transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-[#24292F]">{bank}</h4>
                  <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                    change > 0 
                      ? 'bg-[#218838] text-white' 
                      : change < 0 
                        ? 'bg-[#E99695] text-white' 
                        : 'bg-[#F7F8FA] text-[#454C56]'
                  }`}>
                    {change > 0 ? '+' : ''}{change}
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#454C56]">This Month:</span>
                    <span className="font-medium text-[#24292F]">{currentCount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#454C56]">Last Month:</span>
                    <span className="font-medium text-[#24292F]">{previousCount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#454C56]">Change:</span>
                    <span className={`font-medium ${
                      change > 0 ? 'text-[#218838]' : change < 0 ? 'text-[#E99695]' : 'text-[#454C56]'
                    }`}>
                      {changePercent}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Table - New Merchants by Bank */}
        <div className="bg-white rounded-lg border border-[#E1E4E8]">
          <div className="p-4 border-b border-[#E1E4E8]">
            <h3 className="text-lg font-semibold text-[#24292F]">Newly Added Merchants This Month</h3>
            <p className="text-sm text-[#454C56] mt-1">Detailed breakdown of new merchant partnerships by bank</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#E1E4E8]">
                  <th className="text-left py-3 px-4 font-semibold text-[#24292F]">Merchant</th>
                  <th className="text-left py-3 px-4 font-semibold text-[#24292F]">Bank</th>
                  <th className="text-left py-3 px-4 font-semibold text-[#24292F]">Category</th>
                  <th className="text-left py-3 px-4 font-semibold text-[#24292F]">Offer</th>
                  <th className="text-left py-3 px-4 font-semibold text-[#24292F]">Added Date</th>
                </tr>
              </thead>
              <tbody>
                {allBanks.flatMap(bank => 
                  (newMerchantsByBank[bank] || []).map((merchant, index) => (
                    <tr key={`${bank}-${index}`} className="border-b border-[#E1E4E8] hover:bg-[#F7F8FA] transition-colors">
                      <td className="py-3 px-4 font-medium text-[#24292F]">{merchant.name}</td>
                      <td className="py-3 px-4 text-[#454C56]">{bank}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-[#F7F8FA] rounded-full text-sm text-[#454C56]">
                          {merchant.category}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-[#454C56]">{merchant.offer}</td>
                      <td className="py-3 px-4 text-[#454C56]">
                        {new Date(merchant.addedDate).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderScorecardAnalysis = () => {
    const selectedCompetitors = competitors.filter(c => c.selected);
    const allBanks = [bankData?.name || 'Your Bank', ...selectedCompetitors.map(c => c.name)];
    
    // Full scorecard data
    const fullScorecard = [
      {
        bank: bankData?.name || 'Your Bank',
        depth: 85,
        validity: 92,
        additionRate: 78,
        overall: 85
      },
      { bank: 'ADCB', depth: 92, validity: 88, additionRate: 85, overall: 88 },
      { bank: 'FAB', depth: 89, validity: 90, additionRate: 82, overall: 87 },
      { bank: 'DIB', depth: 78, validity: 85, additionRate: 75, overall: 79 },
      { bank: 'ENBD', depth: 81, validity: 87, additionRate: 80, overall: 83 }
    ];
    
    // Filter scorecard to only include selected banks
    const scorecard = fullScorecard.filter(item => allBanks.includes(item.bank));

    if (viewType === 'chart') {
      return (
        <div className="space-y-6">
          {scorecard.map((bank, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border border-[#E1E4E8]">
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold text-[#24292F]">{bank.bank}</span>
                <span className="text-lg font-bold text-[#0366D6]">{bank.overall}/100</span>
              </div>
              <div className="space-y-3">
                {[
                  { label: 'Depth', value: bank.depth, color: 'bg-[#0366D6]' },
                  { label: 'Validity', value: bank.validity, color: 'bg-[#218838]' },
                  { label: 'Addition Rate', value: bank.additionRate, color: 'bg-[#FFD33D]' },
                ].map((metric) => (
                  <div key={metric.label} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#454C56]">{metric.label}</span>
                      <span className="font-medium text-[#24292F]">{metric.value}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${metric.color}`}
                        style={{ width: `${metric.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#E1E4E8]">
              <th className="text-left py-3 px-4 font-semibold text-[#24292F]">Bank</th>
              <th className="text-center py-3 px-4 font-semibold text-[#24292F]">Depth</th>
              <th className="text-center py-3 px-4 font-semibold text-[#24292F]">Validity</th>
              <th className="text-center py-3 px-4 font-semibold text-[#24292F]">Addition Rate</th>
              <th className="text-center py-3 px-4 font-semibold text-[#24292F]">Overall</th>
            </tr>
          </thead>
          <tbody>
            {scorecard.map((bank, index) => (
              <tr key={index} className="border-b border-[#E1E4E8] hover:bg-[#F7F8FA]">
                <td className="py-3 px-4 font-medium text-[#24292F]">{bank.bank}</td>
                <td className="text-center py-3 px-4">
                  <span className="px-2 py-1 bg-[#F7F8FA] rounded-full text-sm font-medium">
                    {bank.depth}
                  </span>
                </td>
                <td className="text-center py-3 px-4">
                  <span className="px-2 py-1 bg-[#F7F8FA] rounded-full text-sm font-medium">
                    {bank.validity}
                  </span>
                </td>
                <td className="text-center py-3 px-4">
                  <span className="px-2 py-1 bg-[#F7F8FA] rounded-full text-sm font-medium">
                    {bank.additionRate}
                  </span>
                </td>
                <td className="text-center py-3 px-4">
                  <span className="px-3 py-1 bg-[#0366D6] text-white rounded-full text-sm font-bold">
                    {bank.overall}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderCustomAnalysis = () => {
    return (
      <div className="bg-white rounded-lg p-6 border border-[#E1E4E8]">
        <h3 className="text-lg font-semibold text-[#24292F] mb-4">Custom Analysis Results</h3>
        <div className="space-y-4">
          <div className="p-4 bg-[#F7F8FA] rounded-lg">
            <p className="text-[#454C56]">
              Based on your query, here are the key insights from the analysis:
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-[#E1E4E8] rounded-lg">
              <h4 className="font-semibold text-[#24292F] mb-2">Key Findings</h4>
              <ul className="text-sm text-[#454C56] space-y-1">
                <li>• Your bank shows strong performance in dining and travel</li>
                <li>• ADCB leads in offer depth with 92/100</li>
                <li>• Opportunities in electronics and personal services</li>
              </ul>
            </div>
            <div className="p-4 border border-[#E1E4E8] rounded-lg">
              <h4 className="font-semibold text-[#24292F] mb-2">Recommendations</h4>
              <ul className="text-sm text-[#454C56] space-y-1">
                <li>• Focus on expanding electronics partnerships</li>
                <li>• Improve merchant addition rate</li>
                <li>• Consider seasonal offer strategies</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-[#E1E4E8] bg-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-[#24292F]">{analysisData.title}</h2>
            <p className="text-sm text-[#454C56] mt-1">
              {analysisData.type === 'offers' && 'Compare offers across categories'}
              {analysisData.type === 'merchants' && 'Track new merchant additions'}
              {analysisData.type === 'scorecard' && 'Performance metrics comparison'}
              {analysisData.type === 'custom' && 'Custom analysis results'}
            </p>
          </div>
          
          {analysisData.type !== 'merchants' && analysisData.type !== 'custom' && (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewType('table')}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  viewType === 'table' 
                    ? 'bg-[#0366D6] text-white' 
                    : 'bg-[#F7F8FA] text-[#454C56] hover:bg-[#E1E4E8]'
                }`}
              >
                <Table className="h-4 w-4 inline mr-1" />
                Table
              </button>
              <button
                onClick={() => setViewType('chart')}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  viewType === 'chart' 
                    ? 'bg-[#0366D6] text-white' 
                    : 'bg-[#F7F8FA] text-[#454C56] hover:bg-[#E1E4E8]'
                }`}
              >
                <BarChart3 className="h-4 w-4 inline mr-1" />
                Chart
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {analysisData.type === 'offers' && renderOffersAnalysis()}
        {analysisData.type === 'merchants' && renderMerchantsAnalysis()}
        {analysisData.type === 'scorecard' && renderScorecardAnalysis()}
        {analysisData.type === 'custom' && renderCustomAnalysis()}
      </div>
    </div>
  );
}
