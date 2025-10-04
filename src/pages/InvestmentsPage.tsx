import { useEffect, useState } from "react";
import { api } from "@/lib/api-client";
import { InvestmentFund, PortfolioAllocation } from "@shared/types";
import { AllocationDonut } from "@/components/dashboard/AllocationDonut";
import { FundCard } from "@/components/investments/FundCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { AlertCircle, CheckCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
export function InvestmentsPage() {
  const [initialPortfolio, setInitialPortfolio] = useState<{ allocation: PortfolioAllocation; funds: InvestmentFund[] } | null>(null);
  const [allFunds, setAllFunds] = useState<InvestmentFund[]>([]);
  const [currentAllocation, setCurrentAllocation] = useState<PortfolioAllocation>({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [portfolioData, fundsData] = await Promise.all([
          api<{ allocation: PortfolioAllocation; funds: InvestmentFund[] }>("/api/member/portfolio"),
          api<InvestmentFund[]>("/api/funds"),
        ]);
        setInitialPortfolio(portfolioData);
        setCurrentAllocation(portfolioData.allocation);
        setAllFunds(fundsData);
      } catch (error) {
        console.error("Failed to fetch investment data:", error);
        toast.error("Failed to load investment data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  const handleAllocationChange = (fundId: string, value: number) => {
    setCurrentAllocation(prev => ({ ...prev, [fundId]: value }));
  };
  const totalAllocation = Object.values(currentAllocation).reduce((sum, val) => sum + val, 0);
  const isAllocationValid = totalAllocation === 100;
  const handleSaveChanges = async () => {
    if (!isAllocationValid) {
      toast.error("Total allocation must be exactly 100%.");
      return;
    }

    try {
      await api("/api/member/portfolio", {
        method: "POST",
        body: JSON.stringify({ allocation: currentAllocation }),
      });
      toast.success("Investment allocation updated successfully!");
      setInitialPortfolio(prev => (prev ? { ...prev, allocation: currentAllocation } : null));
    } catch (error) {
      console.error("Failed to update allocation:", error);
      toast.error("Failed to save changes. Please try again.");
    }
  };
  const handleReset = () => {
    if (initialPortfolio) {
      setCurrentAllocation(initialPortfolio.allocation);
      toast.info("Changes have been reset.");
    }
  };
  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-1/3" />
        <Skeleton className="h-8 w-1/2" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Skeleton className="h-96" />
          </div>
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Skeleton className="h-64" />
            <Skeleton className="h-64" />
            <Skeleton className="h-64" />
            <Skeleton className="h-64" />
          </div>
        </div>
      </div>
    );
  }
  if (!initialPortfolio) {
    return <div>Error loading data. Please try again.</div>;
  }
  return (
    <div className="flex flex-col gap-6 md:gap-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Investment Portfolio</h1>
        <p className="text-muted-foreground">Manage your investment strategy and fund allocation.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <Card className="lg:col-span-1 lg:sticky lg:top-6">
          <CardHeader>
            <CardTitle>Your Allocation</CardTitle>
            <CardDescription>Current vs. New Allocation</CardDescription>
          </CardHeader>
          <CardContent>
            <AllocationDonut portfolio={{ allocation: currentAllocation, funds: allFunds }} />
            <div className="mt-6">
              {isAllocationValid ? (
                <Alert variant="default" className="bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertTitle className="text-green-800 dark:text-green-300">Total Allocation: 100%</AlertTitle>
                  <AlertDescription className="text-green-700 dark:text-green-400">
                    Your new allocation is ready to be saved.
                  </AlertDescription>
                </Alert>
              ) : (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Total Allocation: {totalAllocation}%</AlertTitle>
                  <AlertDescription>
                    Please adjust your funds to total 100%.
                  </AlertDescription>
                </Alert>
              )}
            </div>
            <div className="mt-6 flex flex-col gap-2">
              <Button onClick={handleSaveChanges} disabled={!isAllocationValid}>Save Changes</Button>
              <Button variant="outline" onClick={handleReset}>Reset</Button>
            </div>
          </CardContent>
        </Card>
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {allFunds.map(fund => (
            <FundCard
              key={fund.id}
              fund={fund}
              allocation={currentAllocation[fund.id] || 0}
              onAllocationChange={handleAllocationChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
}