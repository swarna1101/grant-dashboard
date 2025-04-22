import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, AreaChart, Area
} from 'recharts';

const transactionsByContract = [
  { address: '0x0158a4055428b67e286b2627c91120b49ca1146c', value: 150000 },
  { address: '0x03376f22ef7d08cee420d0720785e52638a9fcd', value: 180000 },
  { address: '0x20f5051818fb3c9f5adff472e056291c4b98ece', value: 850000 },
  { address: '0x409395bc4b50a9bbd45a943a8b0d6236e0f83540', value: 50000 },
  { address: '0x4f576c055f06effdff165c5ba014f0b827d47c27b', value: 20000 },
  { address: '0x72dcb9a28bb8ea172b58130d9fd17a6dbe7a9e41', value: 100000 },
  { address: '0x73716c57f87ffd4135453abce6cf61bb0e99c410', value: 200000 },
  { address: '0x7cd1c27121b84717a6e0fec94c0586643bc9254f', value: 30000 },
  { address: '0x8a93aae6d9468065801288887bfdd981a1766ef4', value: 900000 },
  { address: '0xb66a56126fad14563e62ba2cda658cb97f7a90de', value: 10000 }
];

const monthlyData = [
  { month: 'October 2024', transactions: 450000, users: 28000 },
  { month: 'November 2024', transactions: 470000, users: 18000 },
  { month: 'December 2024', transactions: 480000, users: 29000 },
  { month: 'January 2025', transactions: 680000, users: 22000 },
  { month: 'February 2025', transactions: 520000, users: 42000 },
  { month: 'March 2025', transactions: 320000, users: 20000 },
  { month: 'April 2025', transactions: 320000, users: 10000 }
];

const NetworkAnalytics = () => {
  return (
    <div className="space-y-8 p-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2">🔗 Transactions</h3>
          <p className="text-4xl font-bold">3,497,720</p>
          <div className="mt-4 space-y-2">
            <p className="text-gray-600 dark:text-gray-300">
              <span className="font-medium">30 Days:</span> 316,192
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              <span className="font-medium">24h:</span> 18,624
            </p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2">👤 Users</h3>
          <p className="text-4xl font-bold">83,288</p>
          <div className="mt-4 space-y-2">
            <p className="text-gray-600 dark:text-gray-300">
              <span className="font-medium">30 Days:</span> 10,140
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              <span className="font-medium">24h:</span> 9,881
            </p>
          </div>
        </div>
      </div>

      {/* Transactions per Smart Contract */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Transactions per Smart Contract</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={transactionsByContract}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis 
                type="category" 
                dataKey="address" 
                width={300}
                tick={{ fontSize: 12 }}
              />
              <Tooltip />
              <Bar dataKey="value" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Transactions by Month</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" angle={-45} textAnchor="end" height={60} />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="transactions" 
                  stroke="#3B82F6" 
                  fill="#93C5FD" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Users by Month</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" angle={-45} textAnchor="end" height={60} />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="users" 
                  stroke="#10B981" 
                  fill="#6EE7B7" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkAnalytics; 