import { InvestmentFund } from "@shared/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { AllocationSlider } from "./AllocationSlider";
import { TrendingUp, Shield, Layers } from "lucide-react";
interface FundCardProps {
  fund: InvestmentFund;
  allocation: number;
  onAllocationChange: (fundId: string, value: number) => void;
}
const riskLevelColors = {
  Low: "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300",
  Medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300",
  High: "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300",
};
export function FundCard({ fund, allocation, onAllocationChange }: FundCardProps) {
  const isPositive = fund.ytdPerformance >= 0;
  return (
    <Card className="flex flex-col transition-all hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg">{fund.name}</CardTitle>
        <CardDescription className="flex items-center gap-4 pt-1">
          <span className="flex items-center gap-1.5 text-xs">
            <Layers className="h-3 w-3" /> {fund.category}
          </span>
          <span className="flex items-center gap-1.5 text-xs">
            <Shield className="h-3 w-3" /> {fund.riskLevel} Risk
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex items-baseline justify-between p-4 rounded-lg bg-muted/50">
          <div className="flex items-center gap-2">
            <TrendingUp className={cn("h-5 w-5", isPositive ? "text-green-600" : "text-red-600")} />
            <span className="text-sm text-muted-foreground">YTD Performance</span>
          </div>
          <span className={cn("text-2xl font-bold", isPositive ? "text-green-600" : "text-red-600")}>
            {isPositive ? '+' : ''}{fund.ytdPerformance.toFixed(1)}%
          </span>
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-full">
          <p className="text-sm font-medium mb-2">Allocation</p>
          <AllocationSlider
            value={allocation}
            onValueChange={(value) => onAllocationChange(fund.id, value)}
          />
        </div>
      </CardFooter>
    </Card>
  );
}