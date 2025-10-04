import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Contribution } from "@shared/types";
import { format } from "date-fns";
interface RecentContributionsProps {
  contributions: Contribution[];
}
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "HKD",
  }).format(value);
};
export function RecentContributions({ contributions }: RecentContributionsProps) {
  return (
    <Card className="col-span-1 lg:col-span-3">
      <CardHeader>
        <CardTitle>Recent Contributions</CardTitle>
        <CardDescription>
          Your last 5 contributions to your MPF account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Employee</TableHead>
              <TableHead className="text-right">Employer</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contributions.map((c) => (
              <TableRow key={c.id}>
                <TableCell className="font-medium">
                  {format(new Date(c.date), "dd MMM, yyyy")}
                </TableCell>
                <TableCell className="text-right">
                  {formatCurrency(c.employeeAmount)}
                </TableCell>
                <TableCell className="text-right">
                  {formatCurrency(c.employerAmount)}
                </TableCell>
                <TableCell className="text-right font-semibold">
                  {formatCurrency(c.totalAmount)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}