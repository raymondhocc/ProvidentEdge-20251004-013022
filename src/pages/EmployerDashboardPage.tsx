import { useEffect, useState } from "react";
import { api } from "@/lib/api-client";
import { EmployerSummary, ManagedEmployee, ContributionPeriod } from "@shared/types";
import { Skeleton } from "@/components/ui/skeleton";
import { EmployerSummaryCard } from "@/components/employer/SummaryCard";
import { ManagedEmployeesTable } from "@/components/employer/ManagedEmployeesTable";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Users, CalendarClock } from "lucide-react";
import { format } from "date-fns";
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "HKD",
  }).format(value);
};
export function EmployerDashboardPage() {
  const [summary, setSummary] = useState<EmployerSummary | null>(null);
  const [employees, setEmployees] = useState<ManagedEmployee[] | null>(null);
  const [periods, setPeriods] = useState<ContributionPeriod[] | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [summaryData, employeesData, periodsData] = await Promise.all([
          api<EmployerSummary>("/api/employer/summary"),
          api<ManagedEmployee[]>("/api/employer/employees"),
          api<ContributionPeriod[]>("/api/employer/periods"),
        ]);
        setSummary(summaryData);
        setEmployees(employeesData);
        setPeriods(periodsData);
      } catch (error) {
        console.error("Failed to fetch employer dashboard data:", error);
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
        <Skeleton className="h-[400px]" />
      </div>
    );
  }
  if (!summary || !employees || !periods) {
    return <div>Error loading data. Please try again.</div>;
  }
  return (
    <div className="flex flex-col gap-6 md:gap-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome, {summary.companyName}</h1>
        <p className="text-muted-foreground">Here's an overview of your MPF administration.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <EmployerSummaryCard
          title="Contribution (Current Period)"
          value={formatCurrency(summary.totalContributionCurrentPeriod)}
          icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
        />
        <EmployerSummaryCard
          title="Active Employees"
          value={summary.activeEmployees.toString()}
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
        />
        <EmployerSummaryCard
          title="Next Contribution Deadline"
          value={format(new Date(summary.nextContributionDeadline), "dd MMM, yyyy")}
          icon={<CalendarClock className="h-4 w-4 text-muted-foreground" />}
        />
      </div>
      <ManagedEmployeesTable employees={employees} />
    </div>
  );
}