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
    });
    const formattedValue = formatter.format(value);

    return (
      <div
        style={{
          backgroundColor: "#fff",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <p
          style={{ margin: 0, fontWeight: "bold", color: color }}
        >{`${name}: ${formattedValue}`}</p>
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
};

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  name,
}: CustomizedLabelProps) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      <tspan x={x} dy="-0.5em">
        {name} pppppp
      </tspan>
      <tspan x={x} dy="1.2em">{`${(percent * 100).toFixed(4)}%`}</tspan>
    </text>
  );
};

const TaikoPieChart = ({ subtitle, data, title }: PieChartProps) => {
  const newData = [...data.slice(4), ...data.slice(0, 4)];

  return (
    <div className="w-full">
      <h2 className="mb-4 break-words text-center text-xl font-bold md:text-2xl">
        {title}
      </h2>
      <div className="h-[400px] w-full md:h-[600px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={newData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }: { name: string; percent: number }) =>
                `${name}\n${(percent * 100).toFixed(4)}%`
              }
              // label={renderCustomizedLabel}
              outerRadius="70%"
              fill="#8884d8"
              dataKey="value"
            >
              {newData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
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
