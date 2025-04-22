import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line
} from 'recharts';

export interface Transaction {
  date: string;
  txnHash: string;
  amount: string;
  taikoAmount: string;
}

export interface ProjectDashboardProps {
  projectName: string;
  transactions: Transaction[];
}

export const formatUSD = (value: string | number) => {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(num);
};

export const formatNumber = (value: string | number) => {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(num);
};

const BaseProjectDashboard: React.FC<ProjectDashboardProps> = ({
  projectName,
  transactions
}) => {
  // Calculate total amounts
  const totalUSD = transactions.reduce((acc, tx) => acc + parseFloat(tx.amount.replace(/[^0-9.-]+/g, '')), 0);
  const totalTAIKO = transactions.reduce((acc, tx) => acc + parseFloat(tx.taikoAmount.replace(/[^0-9.-]+/g, '')), 0);

  // Prepare data for charts
  const monthlyData = transactions.reduce((acc, tx) => {
    const date = new Date(tx.date);
    const monthYear = date.toLocaleString('default', { month: 'short', year: 'numeric' });
    
    if (!acc[monthYear]) {
      acc[monthYear] = {
        month: monthYear,
        usd: 0,
        taiko: 0,
        transactions: 0
      };
    }
    
    acc[monthYear].usd += parseFloat(tx.amount.replace(/[^0-9.-]+/g, ''));
    acc[monthYear].taiko += parseFloat(tx.taikoAmount.replace(/[^0-9.-]+/g, ''));
    acc[monthYear].transactions += 1;
    
    return acc;
  }, {} as Record<string, { month: string; usd: number; taiko: number; transactions: number; }>);

  const chartData = Object.values(monthlyData);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">{projectName} Dashboard</h2>
      
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
          <p className="text-sm font-medium text-blue-600 dark:text-blue-200">Total Transactions</p>
          <p className="text-2xl font-bold text-blue-900 dark:text-blue-50">{transactions.length}</p>
        </div>
        <div className="bg-green-50 dark:bg-green-900 p-4 rounded-lg">
          <p className="text-sm font-medium text-green-600 dark:text-green-200">Total USD</p>
          <p className="text-2xl font-bold text-green-900 dark:text-green-50">{formatUSD(totalUSD)}</p>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900 p-4 rounded-lg">
          <p className="text-sm font-medium text-purple-600 dark:text-purple-200">Total TAIKO</p>
          <p className="text-2xl font-bold text-purple-900 dark:text-purple-50">{formatNumber(totalTAIKO)}</p>
        </div>
      </div>

      {/* Monthly Distribution Chart */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Monthly Distribution</h3>
        <div className="h-80 bg-white dark:bg-gray-900 rounded-lg p-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" orientation="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip
                formatter={(value: any, name: string) => [
                  name === 'usd' ? formatUSD(value) : formatNumber(value),
                  name === 'usd' ? 'USD' : 'TAIKO'
                ]}
              />
              <Legend />
              <Bar yAxisId="left" dataKey="usd" name="USD" fill="#10B981" />
              <Bar yAxisId="right" dataKey="taiko" name="TAIKO" fill="#6366F1" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Transaction Count Trend */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Transaction Count Trend</h3>
        <div className="h-64 bg-white dark:bg-gray-900 rounded-lg p-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="transactions"
                name="Transactions"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default BaseProjectDashboard; 