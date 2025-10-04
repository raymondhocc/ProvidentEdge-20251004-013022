import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Construction } from "lucide-react";
export function PlaceholderPage() {
  return (
    <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
      <div className="flex flex-col items-center gap-4 text-center">
        <Construction className="h-16 w-16 text-muted-foreground" />
        <h3 className="text-2xl font-bold tracking-tight">
          Page Under Construction
        </h3>
        <p className="text-sm text-muted-foreground">
          This feature is coming soon. Please check back later!
        </p>
      </div>
    </div>
  );
}