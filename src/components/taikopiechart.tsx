import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  TooltipProps,
} from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

interface PieChartProps {
  data: PieDataType[];
  title: string;
  subtitle: string;
}

export type PieDataType = {
  name: string;
  value: number;
  color: string;
};

// Define the props for the CustomTooltip component
type CustomTooltipProps = TooltipProps<ValueType, NameType>;

// Custom Tooltip Component
const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, value, color } = payload[0]!.payload as PieDataType;

    // Format the value as USD
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    const formattedValue = formatter.format(value);

    return (
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          padding: "10px",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          borderRadius: "5px",
          color: "white",
        }}
      >
        <p style={{ margin: 0, fontWeight: "bold" }}>
          <span style={{ color }}>{name}</span>
          <br />
          {formattedValue}
        </p>
      </div>
    );
  }

  return null;
};

const RADIAN = Math.PI / 180;
type CustomizedLabelProps = {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
  name: string;
  value: number;
};

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  name,
  value,
}: CustomizedLabelProps) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 1.1; // Increased radius for better spacing
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
  // Format value as currency
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  
  // Only show label if percent is greater than 1%
  if (percent < 0.01) return null;

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="middle"
      fontSize="12"
    >
      <tspan x={x} dy="-1.2em" fontWeight="bold">
        {name}
      </tspan>
      <tspan x={x} dy="1.2em" fontSize="11">
        {`${(percent * 100).toFixed(1)}%`}
      </tspan>
      <tspan x={x} dy="1.2em" fontSize="10">
        {formatter.format(value)}
      </tspan>
    </text>
  );
};

const TaikoPieChart = ({ subtitle, data, title }: PieChartProps) => {
  // Sort data by value in descending order for better visualization
  const sortedData = [...data].sort((a, b) => b.value - a.value);

  return (
    <div className="w-full">
      <h2 className="mb-4 break-words text-center text-xl font-bold md:text-2xl">
        {title}
      </h2>
      <div className="relative h-[400px] w-full md:h-[500px] lg:h-[600px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={sortedData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius="80%"
              innerRadius="40%"
              paddingAngle={2}
              dataKey="value"
            >
              {sortedData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color}
                  stroke="rgba(0, 0, 0, 0.2)"
                  strokeWidth={1}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{
                paddingTop: "20px",
                fontSize: "14px",
                color: "white",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-4 break-words text-center text-sm font-bold md:text-xl">
        {subtitle}
      </p>
    </div>
  );
};

export default TaikoPieChart;
