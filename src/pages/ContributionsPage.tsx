import { useEffect, useState, useMemo } from "react";
import { api } from "@/lib/api-client";
import { Contribution } from "@shared/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { Search } from "lucide-react";
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "HKD",
  }).format(value);
};
const ITEMS_PER_PAGE = 10;
export function ContributionsPage() {
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    const fetchContributions = async () => {
      try {
        setLoading(true);
        const data = await api<Contribution[]>("/api/member/contributions/all");
        setContributions(data);
      } catch (error) {
        console.error("Failed to fetch contributions:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchContributions();
  }, []);
  const filteredContributions = useMemo(() => {
    return contributions.filter((c) =>
      format(new Date(c.date), "dd MMM, yyyy").toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [contributions, searchTerm]);
  const totalPages = Math.max(1, Math.ceil(filteredContributions.length / ITEMS_PER_PAGE));
  const paginatedContributions = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredContributions.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredContributions, currentPage]);
  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };
  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };
  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-1/3" />
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-6 md:gap-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Contribution History</h1>
        <p className="text-muted-foreground">A complete record of your MPF contributions.</p>
      </div>
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex-1">
              <CardTitle>All Transactions</CardTitle>
              <CardDescription>Search and browse your contribution history.</CardDescription>
            </div>
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by date..."
                className="pl-8 sm:w-[300px]"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset to first page on search
                }}
              />
            </div>
          </div>
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
              {paginatedContributions.length > 0 ? (
                paginatedContributions.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell className="font-medium">{format(new Date(c.date), "dd MMM, yyyy")}</TableCell>
                    <TableCell className="text-right">{formatCurrency(c.employeeAmount)}</TableCell>
                    <TableCell className="text-right">{formatCurrency(c.employerAmount)}</TableCell>
                    <TableCell className="text-right font-semibold">{formatCurrency(c.totalAmount)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    No contributions found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
        <div className="flex items-center justify-end space-x-2 p-4 border-t">
          <span className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
          <Button variant="outline" size="sm" onClick={handlePrevPage} disabled={currentPage === 1}>
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next
          </Button>
        </div>
      </Card>
    </div>
  );
}