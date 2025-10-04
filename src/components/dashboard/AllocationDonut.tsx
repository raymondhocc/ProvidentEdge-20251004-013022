import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { InvestmentFund, PortfolioAllocation } from "@shared/types";
interface AllocationDonutProps {
  portfolio: {
    allocation: PortfolioAllocation;
    funds: InvestmentFund[];
  };
}
const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#AF19FF",
  "#FF4560",
  "#775DD0",
  "#3F51B5",
];
export function AllocationDonut({ portfolio }: AllocationDonutProps) {
  const { allocation, funds } = portfolio;
  const data = Object.entries(allocation).map(([fundId, percentage]) => {
    const fundDetails = funds.find(f => f.id === fundId);
    return {
      name: fundDetails?.name || 'Unknown Fund',
      value: percentage,
    };
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Investment Allocation</CardTitle>
        <CardDescription>Your current portfolio breakdown.</CardDescription>
      </CardHeader>
      <CardContent className="h-[300px] w-full p-2">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              innerRadius={60}
              fill="#8884d8"
              dataKey="value"
              paddingAngle={5}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => [`${value.toFixed(1)}%`, "Allocation"]}
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                borderColor: "hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}