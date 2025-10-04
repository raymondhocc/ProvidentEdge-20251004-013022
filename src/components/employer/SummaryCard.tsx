import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
interface EmployerSummaryCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}
export function EmployerSummaryCard({ title, value, icon }: EmployerSummaryCardProps) {
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
      </CardContent>
    </Card>
  );
}