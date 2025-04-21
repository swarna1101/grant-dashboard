import { useProjectStore } from "~/store/projectdata.store";

const BudgetStats = () => {
  const { projects } = useProjectStore();

  // Calculate totals from projects data
  const calculateTotals = () => {
    let totalTaikoAllocated = 3062586; // Fixed TAIKO amount
    let totalUSDAllocated = 0;
    let totalTaikoPaidOut = totalTaikoAllocated; // All TAIKO is paid out
    let totalUSDPaidOut = 0;

    projects.forEach(project => {
      project.txns.forEach(txn => {
        if (txn.paidInUSD) {
          totalUSDPaidOut += txn.amountInUSD;
          totalUSDAllocated += txn.amountInUSD;
        }
      });
    });

    return {
      totalTaikoAllocated,
      totalUSDAllocated,
      totalTaikoPaidOut,
      totalUSDPaidOut
    };
  };

  const totals = calculateTotals();

  // Constants from the image
  const TOTAL_TAIKO_SUPPLY = 50_000_000_000;
  const GRANT_BUDGET_PERCENTAGE = 5;
  const TOTAL_USD_BUDGET_CYCLE2 = 32_000_000;
  const TOTAL_GRANT_ALLOCATION_SIGNING = 6_681_060.80;
  const TOTAL_GRANT_ALLOCATION_PRESENT = 7_697_065.54;
  const USDT_SHORTFALL = 1_817_834.04;
  const TAIKO_SHORTFALL = 2_592_148.28;

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  const formatUSD = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  const formatInMillions = (num: number) => {
    const inMillions = num / 1_000_000;
    return `${new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(inMillions)}M`;
  };

  const StatCard = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow">
      <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">{title}</h3>
      <div className="text-gray-900 dark:text-gray-100">
        {children}
      </div>
    </div>
  );

  return (
    <div className="w-full p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Grants Budget Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Total Grant Budget">
          <div className="text-lg font-medium">
            {GRANT_BUDGET_PERCENTAGE}% of {formatInMillions(TOTAL_TAIKO_SUPPLY)} TAIKO
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            = {formatInMillions(TOTAL_TAIKO_SUPPLY * GRANT_BUDGET_PERCENTAGE / 100)} TAIKO
          </div>
        </StatCard>

        <StatCard title="USD Budget (Cycle 2)">
          <div className="text-lg font-medium">{formatUSD(TOTAL_USD_BUDGET_CYCLE2)}</div>
          <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            ({formatInMillions(TOTAL_USD_BUDGET_CYCLE2)})
          </div>
        </StatCard>

        <StatCard title="Total Grant Allocation (Signing)">
          <div className="text-lg font-medium">{formatUSD(TOTAL_GRANT_ALLOCATION_SIGNING)}</div>
          <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            ({formatInMillions(TOTAL_GRANT_ALLOCATION_SIGNING)})
          </div>
        </StatCard>

        <StatCard title="Current Allocation Status">
          <div className="space-y-2">
            <div>
              <span className="font-medium">TAIKO:</span> {formatNumber(totals.totalTaikoAllocated)}
              <span className="text-gray-600 dark:text-gray-300 ml-2">
                ({formatNumber(totals.totalTaikoPaidOut)} paid)
              </span>
            </div>
            <div>
              <span className="font-medium">USD:</span> {formatUSD(totals.totalUSDAllocated)}
              <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                ({formatInMillions(totals.totalUSDAllocated)} paid)
              </div>
            </div>
          </div>
        </StatCard>

        <StatCard title="Shortfall">
          <div className="space-y-2">
            <div>
              <span className="font-medium">USDT:</span> {formatUSD(USDT_SHORTFALL)}
              <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                ({formatInMillions(USDT_SHORTFALL)})
              </div>
            </div>
            <div>
              <span className="font-medium">TAIKO:</span> {formatNumber(TAIKO_SHORTFALL)}
            </div>
          </div>
        </StatCard>

        <StatCard title="Present Value (Jan 1st)">
          <div className="text-lg font-medium">{formatUSD(TOTAL_GRANT_ALLOCATION_PRESENT)}</div>
          <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            ({formatInMillions(TOTAL_GRANT_ALLOCATION_PRESENT)})
          </div>
        </StatCard>
      </div>
    </div>
  );
};

export default BudgetStats; 