import React from 'react';
import { 
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  ComposedChart
} from 'recharts';

const BlockMediaAnalytics = () => {
  // Monthly performance data from analysis
  const monthlyData = [
    { month: "01", monthName: "Jan", views: 7981, posts: 2, avgViews: 3991 },
    { month: "03", monthName: "Mar", views: 9010, posts: 2, avgViews: 4505 },
    { month: "04", monthName: "Apr", views: 18135, posts: 4, avgViews: 4534 },
    { month: "05", monthName: "May", views: 14553, posts: 4, avgViews: 3638 },
    { month: "06", monthName: "Jun", views: 35163, posts: 9, avgViews: 3907 },
    { month: "07", monthName: "Jul", views: 23341, posts: 6, avgViews: 3890 },
    { month: "08", monthName: "Aug", views: 25242, posts: 6, avgViews: 4207 },
    { month: "09", monthName: "Sep", views: 26644, posts: 7, avgViews: 3806 },
    { month: "10", monthName: "Oct", views: 15028, posts: 4, avgViews: 3757 },
    { month: "11", monthName: "Nov", views: 28006, posts: 9, avgViews: 3112 },
    { month: "12", monthName: "Dec", views: 38520, posts: 8, avgViews: 4815 }
  ];

  // Monthly growth data
  const growthData = [
    { month: "03", monthName: "Mar", viewsGrowth: 12.9 },
    { month: "04", monthName: "Apr", viewsGrowth: 101.3 },
    { month: "05", monthName: "May", viewsGrowth: -19.8 },
    { month: "06", monthName: "Jun", viewsGrowth: 141.6 },
    { month: "07", monthName: "Jul", viewsGrowth: -33.6 },
    { month: "08", monthName: "Aug", viewsGrowth: 8.1 },
    { month: "09", monthName: "Sep", viewsGrowth: 5.6 },
    { month: "10", monthName: "Oct", viewsGrowth: -43.6 },
    { month: "11", monthName: "Nov", viewsGrowth: 86.4 },
    { month: "12", monthName: "Dec", viewsGrowth: 37.5 }
  ];

  // Top performing content
  const topContent = [
    { title: "Amid cryptocurrency market downturn, top 6 coins in Upbit growth...", views: 6849, month: "Dec" },
    { title: "Let's take a look at 'TAIKO', the project that the world...", views: 5894, month: "Apr" },
    { title: "Ethereum Layer 2 TAIKO exceeds 1 million daily transactions...", views: 5231, month: "Jun" },
    { title: "Ethereum Layer 2 TAIKO, Large Airdrop Guide (Trailblazers Week 6)", views: 5146, month: "Aug" },
    { title: "TAIKO holds a networking party during Eid Seoul...", views: 5103, month: "Mar" }
  ];

  // Format numbers with commas
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Block Media Content Performance Overview</h1>
        <div className="flex flex-wrap gap-6 mb-6">
          <div className="bg-indigo-50 dark:bg-indigo-900 rounded-lg p-4 flex-1">
            <p className="text-sm font-medium text-indigo-600 dark:text-indigo-300">Total Posts</p>
            <p className="text-3xl font-bold text-indigo-900 dark:text-indigo-100">61</p>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900 rounded-lg p-4 flex-1">
            <p className="text-sm font-medium text-purple-600 dark:text-purple-300">Total Views</p>
            <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">241,623</p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4 flex-1">
            <p className="text-sm font-medium text-blue-600 dark:text-blue-300">Avg Views/Post</p>
            <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">3,961</p>
          </div>
          <div className="bg-green-50 dark:bg-green-900 rounded-lg p-4 flex-1">
            <p className="text-sm font-medium text-green-600 dark:text-green-300">Best Month</p>
            <p className="text-3xl font-bold text-green-900 dark:text-green-100">Dec</p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Monthly Performance Trend</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={monthlyData}
              margin={{ top: 10, right: 30, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="monthName" stroke="#9CA3AF" />
              <YAxis yAxisId="left" orientation="left" stroke="#9CA3AF" />
              <YAxis yAxisId="right" orientation="right" stroke="#9CA3AF" />
              <Tooltip 
                formatter={(value: number, name: string) => {
                  if (name === 'Views') return [formatNumber(value), 'Total Views'];
                  if (name === 'Posts') return [value, 'Content Count'];
                  return [formatNumber(value), name];
                }}
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: 'none',
                  borderRadius: '0.5rem',
                  color: '#F3F4F6'
                }}
              />
              <Legend />
              <Area 
                yAxisId="left"
                type="monotone" 
                dataKey="views" 
                name="Views" 
                fill="#8884d8" 
                stroke="#8884d8" 
                fillOpacity={0.3} 
              />
              <Bar 
                yAxisId="right"
                dataKey="posts" 
                name="Posts" 
                fill="#82ca9d" 
                barSize={20}
                radius={[4, 4, 0, 0]}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Monthly Growth (%)</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={growthData}
                margin={{ top: 10, right: 10, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="monthName" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  formatter={(value: number) => [`${value.toFixed(1)}%`, 'Growth Rate']}
                  labelFormatter={(label: string) => `Month: ${label}`}
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: 'none',
                    borderRadius: '0.5rem',
                    color: '#F3F4F6'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="viewsGrowth" 
                  name="Views Growth" 
                  stroke="#ff7300" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900 rounded-lg">
            <h3 className="font-medium text-yellow-800 dark:text-yellow-100 mb-2">Growth Insights</h3>
            <ul className="text-sm text-yellow-800 dark:text-yellow-200">
              <li className="mb-1">• Highest growth in June (+141.6%) and April (+101.3%)</li>
              <li className="mb-1">• Sharp declines in October (-43.6%) and July (-33.6%)</li>
              <li className="mb-1">• Consistent growth in Q4 (Nov-Dec)</li>
            </ul>
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Top Performing Content</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={topContent}
                layout="vertical"
                margin={{ top: 10, right: 10, left: 60, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis type="number" stroke="#9CA3AF" />
                <YAxis 
                  type="category" 
                  dataKey="title" 
                  width={60}
                  tick={{fontSize: 12}}
                  stroke="#9CA3AF"
                />
                <Tooltip 
                  formatter={(value: number) => [formatNumber(value), 'Views']}
                  labelFormatter={(label: string) => label}
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: 'none',
                    borderRadius: '0.5rem',
                    color: '#F3F4F6'
                  }}
                />
                <Bar 
                  dataKey="views" 
                  fill="#8884d8" 
                  label={{position: 'right', formatter: (value: number) => formatNumber(value)}}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
            <h3 className="font-medium text-blue-800 dark:text-blue-100 mb-2">Content Insights</h3>
            <ul className="text-sm text-blue-800 dark:text-blue-200">
              <li className="mb-1">• Market analysis content performs best (6,849 views)</li>
              <li className="mb-1">• Technical updates and guides consistently attract 5,000+ views</li>
              <li className="mb-1">• Top 5 content represents 12% of total views</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Key Performance Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-700 dark:text-gray-200 mb-2">Content Strategy Findings</h3>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
              <li className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 text-indigo-500">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="ml-2">Peak performance in high-activity months (Jun, Nov, Dec) with 9, 9, and 8 posts respectively</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 text-indigo-500">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="ml-2">December showed highest views (38,520) and highest avg views per post (4,815)</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 text-indigo-500">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="ml-2">Market analysis content generates higher viewership than technical updates</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-700 dark:text-gray-200 mb-2">Recommendations</h3>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
              <li className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 text-green-500">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="ml-2">Focus on market analysis and cryptocurrency comparison content</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 text-green-500">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="ml-2">Maintain consistent publishing schedule of 7-9 posts monthly for optimal performance</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 text-green-500">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="ml-2">Investigate opportunities to improve engagement metrics beyond just views</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockMediaAnalytics; 