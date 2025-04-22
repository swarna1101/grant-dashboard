import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, ComposedChart, Area, Line
} from 'recharts';

const TaikoGrantDashboard = () => {
  // Updated data from the images provided
  const grantCycleData = [
    { 
      cycle: 'Grant Cycle #1 (2023)', 
      projects: 15, 
      taiko: 665067, 
      usd: 0,
      year: 2023
    },
    { 
      cycle: 'Grant Cycle #2 (2024)', 
      projects: 17, 
      taiko: 1424386, 
      usd: 319300,
      year: 2024
    },
    { 
      cycle: 'Grant Cycle #3 (2024)', 
      projects: 8, 
      taiko: 228708, 
      usd: 346733,
      year: 2024
    },
    { 
      cycle: 'Grant Cycle #4 (2024)', 
      projects: 17, 
      taiko: 618768.78, 
      usd: 93000,
      year: 2024
    },
    { 
      cycle: 'Grant Cycle #5 (2024)', 
      projects: 9, 
      taiko: 0, 
      usd: 0,
      year: 2024
    },
    { 
      cycle: 'Grant Cycle #6 (2024)', 
      projects: 9, 
      taiko: 260696, 
      usd: 100000,
      year: 2024
    }
  ];

  // Vertical distribution data
  const verticalData = [
    { vertical: 'AI', projects: 2, taiko: 64101, usd: 0, active: 1, ongoing: 1, completion: 100 },
    { vertical: 'Community', projects: 5, taiko: 76767, usd: 0, active: 3, ongoing: 2, completion: 40 },
    { vertical: 'GameFi', projects: 15, taiko: 390853.78, usd: 226000, active: 2, ongoing: 12, completion: 86.67 },
    { vertical: 'Infra', projects: 27, taiko: 1283363, usd: 2002033, active: 10, ongoing: 14, completion: 62.96 },
    { vertical: 'DeFi', projects: 24, taiko: 1318476, usd: 0, active: 1, ongoing: 16, completion: 95.83 },
    { vertical: 'Media', projects: 7, taiko: 244405, usd: 223000, active: 2, ongoing: 4, completion: 71.43 }
  ];

  // Half-yearly data from the visualizations
  const halfYearlyData = [
    { 
      period: 'H1 2023', 
      taiko: 332533.5, 
      usd: 0,
      verticals: 1
    },
    { 
      period: 'H2 2023', 
      taiko: 332533.5, 
      usd: 0,
      verticals: 1
    },
    { 
      period: 'H1 2024', 
      taiko: 1266279.39, 
      usd: 429516.5,
      verticals: 1
    },
    { 
      period: 'H2 2024', 
      taiko: 1266279.39, 
      usd: 429516.5,
      verticals: 7
    }
  ];

  // Budget data
  const budgetData = {
    totalTaikoBudget: 50000000,
    totalUsdBudgetCycle2: 32000000,
    totalUsdAllocated: 2321033,
    totalTaikoAllocated: 3377965.78,
    totalUsdPaidOut: 493198.96,
    usdtShortfall: 1827834.04,
    taikoShortfall: 2592148.28,
    totalSigningValue: 6681060.80,
    presentValueJan: 7697065.54
  };

  // Format numbers for display
  const formatNumber = (num: string | number | (string | number)[]) => {
    const value = typeof num === 'number' ? num : 
                 Array.isArray(num) ? parseFloat(String(num[0])) :
                 parseFloat(String(num));
    if (value >= 1000000) return `${(value/1000000).toFixed(2)}M`;
    if (value >= 1000) return `${(value/1000).toFixed(1)}K`;
    return value.toFixed(0);
  };
  
  const formatUSD = (num: string | number | (string | number)[]) => `$${formatNumber(num)}`;

  // Colors
  const COLORS = [
    '#0088FE', '#00C49F', '#FFBB28', '#FF8042', 
    '#8884d8', '#82ca9d', '#ffc658', '#ff7300'
  ];

  return (
    <div className="bg-white p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">TAIKO Grant Program Dashboard</h2>
      
      {/* Summary Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm font-medium text-blue-600">Total Projects</p>
          <p className="text-2xl font-bold text-blue-900">75</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm font-medium text-green-600">Total USD Allocated</p>
          <p className="text-2xl font-bold text-green-900">{formatUSD(budgetData.totalUsdAllocated)}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <p className="text-sm font-medium text-purple-600">Total TAIKO Allocated</p>
          <p className="text-2xl font-bold text-purple-900">{formatNumber(budgetData.totalTaikoAllocated)}</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <p className="text-sm font-medium text-yellow-600">USD Paid Out</p>
          <p className="text-2xl font-bold text-yellow-900">{formatUSD(budgetData.totalUsdPaidOut)}</p>
        </div>
      </div>
      
      {/* Budget Utilization Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Budget & Allocation Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* USD Budget Utilization */}
          <div className="bg-white rounded-lg shadow p-4">
            <h4 className="font-medium text-gray-700 mb-3">USD Budget Utilization</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Allocated', value: budgetData.totalUsdAllocated },
                      { name: 'Unallocated', value: budgetData.totalUsdBudgetCycle2 - budgetData.totalUsdAllocated }
                    ]}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                  >
                    <Cell fill="#00C49F" />
                    <Cell fill="#E5E7EB" />
                  </Pie>
                  <Tooltip formatter={(value) => formatUSD(value)} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 text-sm text-gray-600 text-center">
              <p>{formatUSD(budgetData.totalUsdAllocated)} allocated (7.3%) of {formatUSD(budgetData.totalUsdBudgetCycle2)} budget</p>
            </div>
          </div>
          
          {/* USD Allocation vs Payout */}
          <div className="bg-white rounded-lg shadow p-4">
            <h4 className="font-medium text-gray-700 mb-3">USD Allocation vs Payout</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { name: 'Allocated', value: budgetData.totalUsdAllocated },
                    { name: 'Paid Out', value: budgetData.totalUsdPaidOut },
                    { name: 'Shortfall', value: budgetData.usdtShortfall }
                  ]}
                  margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => formatUSD(value)} />
                  <Bar dataKey="value" name="USD" fill="#00C49F" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 text-sm text-gray-600 text-center">
              <p>USD Shortfall: {formatUSD(budgetData.usdtShortfall)}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Grant Cycle Analysis */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Grant Cycle Analysis</h3>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={grantCycleData}
                margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="cycle" angle={-45} textAnchor="end" height={80} />
                <YAxis yAxisId="left" orientation="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'usd' ? formatUSD(value) : formatNumber(value),
                    name === 'usd' ? 'USD Allocation' : 'TAIKO Allocation'
                  ]}
                />
                <Legend />
                <Bar yAxisId="left" dataKey="taiko" name="TAIKO" fill="#0088FE" />
                <Bar yAxisId="right" dataKey="usd" name="USD" fill="#00C49F" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Half-Yearly Trends */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Half-Yearly Allocation Trends</h3>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={halfYearlyData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip 
                  formatter={(value, name) => {
                    if (name === 'usd') return [formatUSD(value), 'USD Allocation'];
                    if (name === 'taiko') return [formatNumber(value), 'TAIKO Allocation'];
                    return [value, name];
                  }}
                />
                <Legend />
                <Bar yAxisId="left" dataKey="taiko" name="TAIKO" fill="#0088FE" />
                <Line 
                  yAxisId="right" 
                  type="monotone" 
                  dataKey="usd" 
                  name="USD" 
                  stroke="#00C49F" 
                  strokeWidth={3}
                  dot={{ r: 6 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Stablecoin Distribution by Vertical */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Stablecoin Distribution by Vertical</h3>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={verticalData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="vertical" />
                <YAxis />
                <Tooltip formatter={(value) => formatUSD(value)} />
                <Legend />
                <Bar dataKey="usd" name="USD Allocation" fill="#00C49F" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            <p>• Infrastructure leads with {formatUSD(2002033)} (86.3% of all stablecoin allocations)</p>
            <p>• DeFi and Community received no stablecoin funding</p>
          </div>
        </div>
      </div>
      
      {/* Vertical-based Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Distribution by Vertical */}
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-medium text-gray-700 mb-3">TAIKO Distribution by Vertical</h4>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={verticalData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="taiko"
                  nameKey="vertical"
                  label={({ vertical, percent }) => `${vertical}: ${(percent * 100).toFixed(0)}%`}
                >
                  {verticalData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatNumber(value)} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Project Count by Vertical */}
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-medium text-gray-700 mb-3">Project Count by Vertical</h4>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={verticalData.sort((a, b) => b.projects - a.projects)}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="vertical" />
                <Tooltip />
                <Legend />
                <Bar dataKey="projects" name="Project Count" fill="#0088FE" />
                <Bar dataKey="active" name="Active" fill="#00C49F" />
                <Bar dataKey="ongoing" name="Ongoing" fill="#FFBB28" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-3">Grant Distribution Insights</h4>
          <ul className="space-y-2 text-blue-700">
            <li>• Only 7.3% of USD budget utilized ($2.32M of $32M)</li>
            <li>• 21.2% of allocated stablecoins have been paid out ($493K)</li>
            <li>• Infrastructure received 86.3% of all stablecoin allocations</li>
            <li>• DeFi received exclusively TAIKO token funding</li>
            <li>• Grant Cycle #3 had highest stablecoin allocation ($346.7K)</li>
          </ul>
        </div>
        <div className="bg-green-50 p-6 rounded-lg">
          <h4 className="font-semibold text-green-900 mb-3">Temporal Patterns</h4>
          <ul className="space-y-2 text-green-700">
            <li>• Significant expansion from 1 to 7 verticals in H2 2024</li>
            <li>• 840% increase in USDT distribution from H1 to H2 2024</li>
            <li>• TAIKO token distributions introduced in H2 2024</li>
            <li>• Infrastructure focus maintained across all periods</li>
            <li>• DeFi leads in project count (24) and completion rate (95.8%)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TaikoGrantDashboard; 