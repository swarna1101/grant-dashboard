import React from 'react';
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const data = [
  {
    date: "Aug 2024",
    title: "Decentralizing Rollups",
    sessionDuration: 26.67,
    pageviews: 60,
    type: "Issue"
  },
  {
    date: "Sep 2024",
    title: "Taiko - The True Ethereum L2",
    sessionDuration: 15.67,
    pageviews: 1200,
    type: "Article-Project"
  },
  {
    date: "Sep 2024",
    title: "So WTF is The True Ethereum L2?",
    sessionDuration: 20.33,
    pageviews: 320,
    type: "Issue"
  }
];

// Aggregate monthly data
const monthlyData = [
  {
    month: "Aug 2024",
    pageviews: 60,
    avgSessionDuration: 26.67,
    articles: 1
  },
  {
    month: "Sep 2024",
    pageviews: 1520,
    avgSessionDuration: 18,
    articles: 2
  },
  {
    month: "Oct 2024",
    pageviews: 0,
    avgSessionDuration: 0,
    articles: 0
  }
];

const formatDuration = (mins: number) => {
  const minutes = Math.floor(mins);
  const seconds = Math.round((mins - minutes) * 60);
  return `${minutes}m ${seconds}s`;
};

const formatNumber = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const FourPillarsAnalytics = () => {
  // Calculate averages
  const totalArticles = data.length;
  const totalViews = data.reduce((sum, item) => sum + item.pageviews, 0);
  const avgSessionDuration = data.reduce((sum, item) => sum + item.sessionDuration, 0) / totalArticles;
  const bestMonth = monthlyData.reduce((best, month) => 
    month.pageviews > (best?.pageviews || 0) ? month : best, monthlyData[0]
  )?.month || 'N/A';

  return (
    <div className="space-y-8 p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">TAIKO Content Performance on 4 Pillars</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-purple-50 dark:bg-purple-900 p-6 rounded-lg">
            <p className="text-sm font-medium text-purple-600 dark:text-purple-200">Total Articles</p>
            <p className="text-2xl font-bold text-purple-900 dark:text-purple-50">{totalArticles}</p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900 p-6 rounded-lg">
            <p className="text-sm font-medium text-blue-600 dark:text-blue-200">Total Views</p>
            <p className="text-2xl font-bold text-blue-900 dark:text-blue-50">{formatNumber(totalViews)}</p>
          </div>
          <div className="bg-green-50 dark:bg-green-900 p-6 rounded-lg">
            <p className="text-sm font-medium text-green-600 dark:text-green-200">Avg Session</p>
            <p className="text-2xl font-bold text-green-900 dark:text-green-50">{formatDuration(avgSessionDuration)}</p>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900 p-6 rounded-lg">
            <p className="text-sm font-medium text-yellow-600 dark:text-yellow-200">Best Performing</p>
            <p className="text-2xl font-bold text-yellow-900 dark:text-yellow-50">{bestMonth}</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Monthly Performance</h3>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={monthlyData}
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="month" />
              <YAxis 
                yAxisId="left"
                label={{ 
                  value: 'Page Views', 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { fill: '#6B7280' }
                }} 
              />
              <YAxis 
                yAxisId="right" 
                orientation="right"
                label={{ 
                  value: 'Avg Session Duration (min)', 
                  angle: 90, 
                  position: 'insideRight',
                  style: { fill: '#6B7280' }
                }}
              />
              <Tooltip 
                formatter={(value: number, name: string) => {
                  if (name === 'avgSessionDuration') return formatDuration(value);
                  if (name === 'pageviews') return formatNumber(value);
                  return value;
                }}
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: 'none',
                  borderRadius: '0.5rem',
                  color: '#F3F4F6'
                }}
              />
              <Legend />
              <Bar
                yAxisId="left"
                dataKey="pageviews"
                fill="#8884d8"
                name="Page Views"
                barSize={40}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="avgSessionDuration"
                stroke="#82ca9d"
                name="Avg Session Duration"
                strokeWidth={3}
                dot={{ r: 6 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-indigo-50 dark:bg-indigo-900 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-indigo-900 dark:text-indigo-100 mb-3">Content Performance</h3>
          <ul className="space-y-2 text-indigo-700 dark:text-indigo-200">
            {data.map((item, index) => (
              <li key={index}>
                • {item.title}: {formatNumber(item.pageviews)} views, {formatDuration(item.sessionDuration)} avg. session
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-emerald-50 dark:bg-emerald-900 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100 mb-3">Key Insights</h3>
          <ul className="space-y-2 text-emerald-700 dark:text-emerald-200">
            <li>• September was the most active month with 2 articles and 1,520 total views</li>
            <li>• Article-Project format achieved highest engagement (1,200 views)</li>
            <li>• Issue-type content maintains longer average session durations (23m+)</li>
            <li>• Content engagement shows strong reader retention</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FourPillarsAnalytics; 