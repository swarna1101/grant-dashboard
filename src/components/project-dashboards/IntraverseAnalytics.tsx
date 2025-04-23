import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend
} from 'recharts';

const monthlyData = [
  {
    month: 'Month 1',
    transactions: 320000,
    users: 300
  },
  {
    month: 'Month 2',
    transactions: 1100000,
    users: 400
  },
  {
    month: 'Month 3',
    transactions: 1500000, // Current progress
    users: 500 // Current DAU
  }
];

const formatNumber = (value: number) => {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
  return value.toString();
};

const IntraverseAnalytics = () => {
  // Calculate growth rates
  const txGrowthRate = monthlyData.length >= 2 && monthlyData[0] && monthlyData[1]
    ? ((monthlyData[1].transactions - monthlyData[0].transactions) / monthlyData[0].transactions * 100).toFixed(1)
    : '0';
  
  const userGrowthRate = monthlyData.length >= 3 && monthlyData[0] && monthlyData[2]
    ? ((monthlyData[2].users - monthlyData[0].users) / monthlyData[0].users * 100).toFixed(1)
    : '0';

  return (
    <div className="space-y-8 p-4">
      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-blue-50 dark:bg-blue-900 p-6 rounded-lg">
          <h3 className="text-blue-600 dark:text-blue-200 text-sm font-medium">Total Transactions</h3>
          <p className="text-2xl font-bold text-blue-900 dark:text-blue-50">1.5M+</p>
          <p className="text-sm text-blue-600 dark:text-blue-200 mt-2">↑ {txGrowthRate}% MoM growth</p>
        </div>
        <div className="bg-green-50 dark:bg-green-900 p-6 rounded-lg">
          <h3 className="text-green-600 dark:text-green-200 text-sm font-medium">Daily Active Users</h3>
          <p className="text-2xl font-bold text-green-900 dark:text-green-50">500+</p>
          <p className="text-sm text-green-600 dark:text-green-200 mt-2">↑ {userGrowthRate}% growth</p>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900 p-6 rounded-lg">
          <h3 className="text-purple-600 dark:text-purple-200 text-sm font-medium">Avg. Daily Transactions</h3>
          <p className="text-2xl font-bold text-purple-900 dark:text-purple-50">50K+</p>
          <p className="text-sm text-purple-600 dark:text-purple-200 mt-2">Based on current month</p>
        </div>
        <div className="bg-yellow-50 dark:bg-yellow-900 p-6 rounded-lg">
          <h3 className="text-yellow-600 dark:text-yellow-200 text-sm font-medium">Tx per User</h3>
          <p className="text-2xl font-bold text-yellow-900 dark:text-yellow-50">100</p>
          <p className="text-sm text-yellow-600 dark:text-yellow-200 mt-2">Daily average</p>
        </div>
      </div>

      {/* Transaction Growth Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Transaction Growth</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={formatNumber} />
              <Tooltip 
                formatter={(value: number) => formatNumber(value)}
                labelStyle={{ color: '#374151' }}
                contentStyle={{ 
                  backgroundColor: '#1F2937',
                  border: 'none',
                  borderRadius: '0.5rem',
                  color: '#F3F4F6'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="transactions" 
                stroke="#6366F1" 
                fill="#6366F1" 
                fillOpacity={0.2} 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* User Growth Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">User Growth</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={formatNumber} />
              <Tooltip
                formatter={(value: number) => formatNumber(value)}
                labelStyle={{ color: '#374151' }}
                contentStyle={{ 
                  backgroundColor: '#1F2937',
                  border: 'none',
                  borderRadius: '0.5rem',
                  color: '#F3F4F6'
                }}
              />
              <Legend />
              <Bar dataKey="users" fill="#10B981" name="Daily Active Users" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-indigo-50 dark:bg-indigo-900 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-indigo-900 dark:text-indigo-100 mb-3">Growth Insights</h3>
          <ul className="space-y-2 text-indigo-700 dark:text-indigo-200">
            <li>• 243.75% increase in transactions from Month 1 to Month 2</li>
            <li>• Consistent user growth with 66.67% increase in DAU</li>
            <li>• Sustained high transaction volume in Month 3</li>
            <li>• Strong user retention and engagement metrics</li>
          </ul>
        </div>
        <div className="bg-emerald-50 dark:bg-emerald-900 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100 mb-3">Performance Metrics</h3>
          <ul className="space-y-2 text-emerald-700 dark:text-emerald-200">
            <li>• Average of 50K+ daily transactions</li>
            <li>• 500+ daily active users</li>
            <li>• 100 transactions per user per day</li>
            <li>• Steady growth in user engagement</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default IntraverseAnalytics; 