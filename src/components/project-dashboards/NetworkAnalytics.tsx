import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend
} from 'recharts';

const NetworkAnalytics = () => {
  return (
    <div className="space-y-8 p-4">
      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-blue-50 dark:bg-blue-900 p-6 rounded-lg">
          <h3 className="text-blue-600 dark:text-blue-200 text-sm font-medium">Total Transactions</h3>
          <p className="text-2xl font-bold text-blue-900 dark:text-blue-50">3.49M</p>
          <p className="text-sm text-blue-600 dark:text-blue-200 mt-2">Last 30 Days: 316,192</p>
        </div>
        <div className="bg-green-50 dark:bg-green-900 p-6 rounded-lg">
          <h3 className="text-green-600 dark:text-green-200 text-sm font-medium">Total Users</h3>
          <p className="text-2xl font-bold text-green-900 dark:text-green-50">83.2K</p>
          <p className="text-sm text-green-600 dark:text-green-200 mt-2">Last 30 Days: 10,140</p>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900 p-6 rounded-lg">
          <h3 className="text-purple-600 dark:text-purple-200 text-sm font-medium">24h Transactions</h3>
          <p className="text-2xl font-bold text-purple-900 dark:text-purple-50">18.6K</p>
          <p className="text-sm text-purple-600 dark:text-purple-200 mt-2">↑ 12% from yesterday</p>
        </div>
        <div className="bg-yellow-50 dark:bg-yellow-900 p-6 rounded-lg">
          <h3 className="text-yellow-600 dark:text-yellow-200 text-sm font-medium">24h Users</h3>
          <p className="text-2xl font-bold text-yellow-900 dark:text-yellow-50">9.8K</p>
          <p className="text-sm text-yellow-600 dark:text-yellow-200 mt-2">↑ 8% from yesterday</p>
        </div>
      </div>

      {/* Transaction Growth Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Transaction Growth</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={[
              { date: '2024-01', transactions: 2800000 },
              { date: '2024-02', transactions: 3100000 },
              { date: '2024-03', transactions: 3497720 }
            ]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
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
            <BarChart data={[
              { date: '2024-01', users: 65000 },
              { date: '2024-02', users: 75000 },
              { date: '2024-03', users: 83288 }
            ]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="users" fill="#10B981" name="Total Users" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-indigo-50 dark:bg-indigo-900 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-indigo-900 dark:text-indigo-100 mb-3">Growth Insights</h3>
          <ul className="space-y-2 text-indigo-700 dark:text-indigo-200">
            <li>• 28.1% increase in total transactions since January</li>
            <li>• User base grown by 18.2K in Q1 2024</li>
            <li>• Consistent daily transaction growth</li>
            <li>• Strong user retention metrics</li>
          </ul>
        </div>
        <div className="bg-emerald-50 dark:bg-emerald-900 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100 mb-3">Network Health</h3>
          <ul className="space-y-2 text-emerald-700 dark:text-emerald-200">
            <li>• Average of 116.5K transactions per day</li>
            <li>• 2.7K new users per month</li>
            <li>• 42 transactions per user on average</li>
            <li>• Network stability at 99.9%</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NetworkAnalytics; 