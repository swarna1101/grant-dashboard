import React from 'react';
import BaseProjectDashboard, { Transaction, formatUSD } from './BaseProjectDashboard';

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

const TacoStudiosDashboard: React.FC = () => {
  const averagePayment = TACO_STUDIOS_TRANSACTIONS.reduce(
    (acc, tx) => acc + parseFloat(tx.amount.replace(/[^0-9.-]+/g, '')), 
    0
  ) / TACO_STUDIOS_TRANSACTIONS.length;

  return (
    <div className="space-y-8">
      <BaseProjectDashboard
        projectName="Taco Studios"
        transactions={TACO_STUDIOS_TRANSACTIONS}
      />
      
      {/* Additional Taco Studios specific metrics could be added here */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Project Highlights</h3>
        <div className="space-y-2 text-gray-600 dark:text-gray-300">
          {TACO_STUDIOS_TRANSACTIONS.length > 0 && (
            <>
              <p>• Latest payment: {TACO_STUDIOS_TRANSACTIONS[0].amount} + {TACO_STUDIOS_TRANSACTIONS[0].taikoAmount} TAIKO</p>
              <p>• Average payment: {formatUSD(averagePayment)}</p>
            </>
          )}
          <p>• Payment frequency: Monthly</p>
          <p>• Project status: Active</p>
        </div>
      </div>
    </div>
  );
};

export default TacoStudiosDashboard; 