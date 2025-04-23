import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend
} from 'recharts';

interface ProjectData {
  tvl: number;
  insights: string;
  dailyMetrics?: {
    tvlChange?: string;
    fees24h?: string;
    revenue24h?: string;
    spotVolume24h?: string;
  };
}

interface ProjectDataMap {
  [key: string]: ProjectData;
}

interface DefiAnalyticsProps {
  projectName: string;
}

const DefiAnalytics: React.FC<DefiAnalyticsProps> = ({ projectName }) => {
  // TVL data for different projects
  const projectData: ProjectDataMap = {
    'Curve': {
      tvl: 1.29,
      insights: 'Major DEX protocol with significant liquidity'
    },
    'Solv': {
      tvl: 70.3,
      insights: 'Peak TVL during incentive period. SolvBTC is the main asset of the protocol.'
    },
    'Panko': {
      tvl: 26.28,
      insights: 'PancakeSwap franchise on Taiko, driven by Impossible Finance team'
    },
    'Tako Tako': {
      tvl: 44.0,
      insights: 'Native Lending & Borrowing protocol on Taiko'
    },
    'Avalon': {
      tvl: 38.0,
      insights: 'One of the biggest L&B protocols in the BTCFi space'
    },
    'Dodo': {
      tvl: 10.0,
      insights: 'Built a native DEX on Taiko, working closely with the ecosystem'
    },
    'KiloEx': {
      tvl: 0.241,
      insights: 'Native DEX protocol'
    },
    'Henjin DEX': {
      tvl: 0.012,
      insights: 'Emerging DEX protocol'
    },
    'Symbiosis': {
      tvl: 22.155,
      insights: 'Cross-chain liquidity protocol'
    },
    'Swapsicle | Robinos': {
      tvl: 29.919,
      insights: 'DEX and prediction market platform'
    },
    'iZUMi': {
      tvl: 87.12,
      insights: 'Leading DeFi protocol with strong growth metrics',
      dailyMetrics: {
        tvlChange: '+9.78%',
        fees24h: '+3.82%',
        revenue24h: '+12.67%',
        spotVolume24h: '31 chains'
      }
    }
  };

  const currentProject = projectData[projectName] || { tvl: 0, insights: 'No data available' };

  return (
    <div className="space-y-8 p-4">
      {/* TVL Stats */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">DeFi Analytics</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 dark:bg-blue-900 p-6 rounded-lg">
            <h3 className="text-blue-600 dark:text-blue-200 text-sm font-medium">Total Value Locked (TVL)</h3>
            <p className="text-3xl font-bold text-blue-900 dark:text-blue-50">${currentProject.tvl}M</p>
            {currentProject.dailyMetrics?.tvlChange && (
              <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                24h Change: {currentProject.dailyMetrics.tvlChange}
              </p>
            )}
          </div>
          
          <div className="bg-purple-50 dark:bg-purple-900 p-6 rounded-lg">
            <h3 className="text-purple-600 dark:text-purple-200 text-sm font-medium">Project Insights</h3>
            <p className="text-gray-700 dark:text-purple-100">{currentProject.insights}</p>
          </div>
        </div>

        {/* 24h Metrics - Only shown for projects with daily metrics */}
        {currentProject.dailyMetrics && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-green-50 dark:bg-green-900 p-4 rounded-lg">
              <h3 className="text-green-600 dark:text-green-200 text-sm font-medium">24h Fees</h3>
              <p className="text-lg font-semibold text-green-900 dark:text-green-50">
                {currentProject.dailyMetrics.fees24h}
              </p>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900 p-4 rounded-lg">
              <h3 className="text-yellow-600 dark:text-yellow-200 text-sm font-medium">24h Revenue</h3>
              <p className="text-lg font-semibold text-yellow-900 dark:text-yellow-50">
                {currentProject.dailyMetrics.revenue24h}
              </p>
            </div>
            <div className="bg-indigo-50 dark:bg-indigo-900 p-4 rounded-lg">
              <h3 className="text-indigo-600 dark:text-indigo-200 text-sm font-medium">Coverage</h3>
              <p className="text-lg font-semibold text-indigo-900 dark:text-indigo-50">
                {currentProject.dailyMetrics.spotVolume24h}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* TVL Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">TVL Trend</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={[
              { date: '2024-01', tvl: currentProject.tvl * 0.7 },
              { date: '2024-02', tvl: currentProject.tvl * 0.85 },
              { date: '2024-03', tvl: currentProject.tvl }
            ]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="tvl" 
                stroke="#6366F1" 
                fill="#6366F1" 
                fillOpacity={0.2} 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DefiAnalytics; 