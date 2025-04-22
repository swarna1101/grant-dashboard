import React from 'react';
import BaseProjectDashboard, { Transaction, formatUSD } from './BaseProjectDashboard';
import { ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area } from 'recharts';

const TACO_STUDIOS_TRANSACTIONS: Transaction[] = [
  {
    date: '2024-02-26',
    txnHash: '0x44caa4a768ff10861109a564c7caefffe138de37b7a51c1285ce3ba7f8465cb7',
    amount: '$71407.5',
    taikoAmount: '47605'
  },
  {
    date: '2024-12-05',
    txnHash: '0x6e65a345663d9e6ca4eca6c7a433dc220c7faa60b2fecf63e639cb362ef6341c',
    amount: '$35000',
    taikoAmount: '7500'
  },
  {
    date: '2024-11-01',
    txnHash: '0x153681860843c2bc433264a48c4bc0cc33257ca6a97c788e834c8dad9fc3c6ea',
    amount: '$49000',
    taikoAmount: '10500'
  },
  {
    date: '2024-09-16',
    txnHash: '0x7241b9219cdbed36f217518a794fc743d264cb30fc67e22faf5a617fb539a91c',
    amount: '$20000',
    taikoAmount: '0'
  },
  {
    date: '2024-07-29',
    txnHash: '0x6c52d2d82e235507840e4f8fa2fd2d33da248b2692dd0183fc30bba2efa4b485aa',
    amount: '$20000',
    taikoAmount: '0'
  }
];

const TacoStudiosDashboard = ({ projectName, transactions: propTransactions }: { projectName: string; transactions: Transaction[] }) => {
  const transactions = propTransactions || [];
  const totalAmount = transactions.reduce((sum, tx) => {
    const amount = parseFloat(tx.amount.replace(/[^0-9.-]+/g, ''));
    return sum + amount;
  }, 0);
  const averagePayment = transactions.length > 0 ? totalAmount / transactions.length : 0;
  const latestTransaction = transactions.length > 0 ? transactions[transactions.length - 1] : null;
  const latestPayment = latestTransaction 
    ? parseFloat(latestTransaction.amount.replace(/[^0-9.-]+/g, ''))
    : 0;

  const paymentData = transactions.length > 0 
    ? transactions.map(tx => ({
        date: tx.date,
        amount: parseFloat(tx.amount.replace(/[^0-9.-]+/g, ''))
      }))
    : [];

  return (
    <div className="space-y-8">
      <BaseProjectDashboard
        projectName="Taco Studios"
        transactions={transactions}
      />
      
      {/* Additional Taco Studios specific metrics could be added here */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Project Highlights</h3>
        <div className="space-y-2 text-gray-600 dark:text-gray-300">
          {latestTransaction && (
            <>
              <p>• Latest payment: {latestTransaction.amount} + {latestTransaction.taikoAmount} TAIKO</p>
              <p>• Average payment: {formatUSD(averagePayment)}</p>
            </>
          )}
          <p>• Payment frequency: Monthly</p>
          <p>• Project status: Active</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Taco Studios Performance Overview</h1>
          <div className="flex flex-wrap gap-6 mb-6">
            <div className="bg-indigo-50 dark:bg-indigo-900 rounded-lg p-4 flex-1">
              <p className="text-sm font-medium text-indigo-600 dark:text-indigo-300">Total Payments</p>
              <p className="text-3xl font-bold text-indigo-900 dark:text-indigo-100">{transactions.length}</p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900 rounded-lg p-4 flex-1">
              <p className="text-sm font-medium text-purple-600 dark:text-purple-300">Total Amount</p>
              <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">{formatUSD(totalAmount)}</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4 flex-1">
              <p className="text-sm font-medium text-blue-600 dark:text-blue-300">Average Payment</p>
              <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">{formatUSD(averagePayment)}</p>
            </div>
            <div className="bg-green-50 dark:bg-green-900 rounded-lg p-4 flex-1">
              <p className="text-sm font-medium text-green-600 dark:text-green-300">Latest Payment</p>
              <p className="text-3xl font-bold text-green-900 dark:text-green-100">{formatUSD(latestPayment)}</p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Payment History</h2>
          <div className="h-80">
            {paymentData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={paymentData}
                  margin={{ top: 10, right: 30, left: 10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    formatter={(value: number) => [formatUSD(value), 'Amount']}
                    contentStyle={{
                      backgroundColor: '#1F2937',
                      border: 'none',
                      borderRadius: '0.5rem',
                      color: '#F3F4F6'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="amount" 
                    name="Amount" 
                    fill="#8884d8" 
                    stroke="#8884d8" 
                    fillOpacity={0.3} 
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                No payment data available
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Key Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-700 dark:text-gray-200 mb-2">Payment Analysis</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                {transactions.length > 0 && (
                  <>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-indigo-500">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="ml-2">Latest payment: {formatUSD(latestPayment)} + {latestTransaction?.taikoAmount || '0'} TAIKO</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-indigo-500">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="ml-2">Average payment: {formatUSD(averagePayment)}</span>
                    </li>
                  </>
                )}
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
                  <span className="ml-2">Consider increasing payment frequency to maintain consistent cash flow</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-green-500">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="ml-2">Monitor payment amounts to ensure they align with project milestones</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TacoStudiosDashboard; 