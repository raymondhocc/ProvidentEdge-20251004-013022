import { useEffect, useState } from "react";
import { api } from "@/lib/api-client";
import { MemberSummary, Contribution, InvestmentFund, PortfolioAllocation } from "@shared/types";
import { SummaryCard } from "@/components/dashboard/SummaryCard";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import { AllocationDonut } from "@/components/dashboard/AllocationDonut";
import { RecentContributions } from "@/components/dashboard/RecentContributions";
import { Skeleton } from "@/components/ui/skeleton";
import { DollarSign, TrendingUp, Calendar } from "lucide-react";
import { format } from "date-fns";
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "HKD",
  }).format(value);
};
export function DashboardPage() {
  const [summary, setSummary] = useState<MemberSummary | null>(null);
  const [contributions, setContributions] = useState<Contribution[] | null>(null);
  const [portfolio, setPortfolio] = useState<{ allocation: PortfolioAllocation; funds: InvestmentFund[] } | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [summaryData, contributionsData, portfolioData] = await Promise.all([
          api<MemberSummary>("/api/member/summary"),
          api<Contribution[]>("/api/member/contributions/recent"),
          api<{ allocation: PortfolioAllocation; funds: InvestmentFund[] }>("/api/member/portfolio"),
        ]);
        setSummary(summaryData);
        setContributions(contributionsData);
        setPortfolio(portfolioData);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-[126px]" />
          <Skeleton className="h-[126px]" />
          <Skeleton className="h-[126px]" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-[380px] col-span-1 lg:col-span-2" />
          <Skeleton className="h-[380px]" />
        </div>
        <div>
          <Skeleton className="h-[300px]" />
        </div>
      </div>
    );
  }
  if (!summary || !contributions || !portfolio) {
    return <div>Error loading data. Please try again.</div>;
  }
  return (
    <div className="flex flex-col gap-6 md:gap-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, {summary.name}</h1>
        <p className="text-muted-foreground">Here's a summary of your MPF account.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <SummaryCard
          title="Total Balance"
          value={formatCurrency(summary.totalBalance)}
          icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
        />
        <SummaryCard
          title="YTD Return"
          value={`${summary.ytdReturn.toFixed(1)}%`}
          change={summary.ytdReturn}
          icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
        />
        <SummaryCard
          title="Last Contribution"
          value={format(new Date(summary.lastContributionDate), "dd MMM, yyyy")}
          icon={<Calendar className="h-4 w-4 text-muted-foreground" />}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        <PerformanceChart data={summary.performanceData} />
        <AllocationDonut portfolio={portfolio} />
      </div>
      <RecentContributions contributions={contributions} />
    </div>
  );
}