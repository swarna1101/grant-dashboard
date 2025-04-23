import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend
} from 'recharts';

const BlockMediaAnalytics = () => {
  const contentData = [
    {
      month: 'Jan 2024',
      articles: 12,
      views: 15000,
      engagement: 85
    },
    {
      month: 'Feb 2024',
      articles: 15,
      views: 22000,
      engagement: 88
    },
    {
      month: 'Mar 2024',
      articles: 18,
      views: 35000,
      engagement: 92
    }
  ];

  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="space-y-8 p-4">
      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-blue-50 dark:bg-blue-900 p-6 rounded-lg">
          <h3 className="text-blue-600 dark:text-blue-200 text-sm font-medium">Total Articles</h3>
          <p className="text-2xl font-bold text-blue-900 dark:text-blue-50">45</p>
          <p className="text-sm text-blue-600 dark:text-blue-200 mt-2">↑ 20% this quarter</p>
        </div>
        <div className="bg-green-50 dark:bg-green-900 p-6 rounded-lg">
          <h3 className="text-green-600 dark:text-green-200 text-sm font-medium">Total Views</h3>
          <p className="text-2xl font-bold text-green-900 dark:text-green-50">72K</p>
          <p className="text-sm text-green-600 dark:text-green-200 mt-2">↑ 133% growth</p>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900 p-6 rounded-lg">
          <h3 className="text-purple-600 dark:text-purple-200 text-sm font-medium">Avg. Engagement</h3>
          <p className="text-2xl font-bold text-purple-900 dark:text-purple-50">88%</p>
          <p className="text-sm text-purple-600 dark:text-purple-200 mt-2">Based on time spent</p>
        </div>
        <div className="bg-yellow-50 dark:bg-yellow-900 p-6 rounded-lg">
          <h3 className="text-yellow-600 dark:text-yellow-200 text-sm font-medium">Monthly Growth</h3>
          <p className="text-2xl font-bold text-yellow-900 dark:text-yellow-50">59%</p>
          <p className="text-sm text-yellow-600 dark:text-yellow-200 mt-2">Avg. view increase</p>
        </div>
      </div>

      {/* Content Performance Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Content Performance</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={contentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value: number) => formatNumber(value)}
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: 'none',
                  borderRadius: '0.5rem',
                  color: '#F3F4F6'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="views" 
                stroke="#6366F1" 
                fill="#6366F1" 
                fillOpacity={0.2} 
                name="Views"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Engagement Metrics */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Engagement Metrics</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={contentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                formatter={(value: number) => `${value}%`}
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: 'none',
                  borderRadius: '0.5rem',
                  color: '#F3F4F6'
                }}
              />
              <Legend />
              <Bar dataKey="engagement" fill="#10B981" name="Engagement Rate (%)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-indigo-50 dark:bg-indigo-900 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-indigo-900 dark:text-indigo-100 mb-3">Content Insights</h3>
          <ul className="space-y-2 text-indigo-700 dark:text-indigo-200">
            <li>• Technical articles perform best (92% engagement)</li>
            <li>• Average read time increased to 8.5 minutes</li>
            <li>• Tutorial content sees 2.3x more shares</li>
            <li>• Community engagement up by 45%</li>
          </ul>
        </div>
        <div className="bg-emerald-50 dark:bg-emerald-900 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100 mb-3">Growth Metrics</h3>
          <ul className="space-y-2 text-emerald-700 dark:text-emerald-200">
            <li>• 50% increase in subscriber base</li>
            <li>• Newsletter open rate at 42%</li>
            <li>• Social shares up by 75%</li>
            <li>• Returning readers: 65%</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BlockMediaAnalytics; 