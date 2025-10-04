import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
interface SummaryCardProps {
  title: string;
  value: string;
  change?: number;
  icon: React.ReactNode;
}
export function SummaryCard({ title, value, change, icon }: SummaryCardProps) {
  const hasChange = typeof change === 'number';
  const isPositive = hasChange && change >= 0;
  return (
    <Card className="transition-all hover:shadow-md hover:-translate-y-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {hasChange && (
          <p className={cn(
            "text-xs text-muted-foreground flex items-center",
            isPositive ? "text-green-600" : "text-red-600"
          )}>
            {isPositive ? <ArrowUpRight className="h-4 w-4 mr-1" /> : <ArrowDownRight className="h-4 w-4 mr-1" />}
            {change.toFixed(1)}% from last month
          </p>
        )}
      </CardContent>
    </Card>
  );
}