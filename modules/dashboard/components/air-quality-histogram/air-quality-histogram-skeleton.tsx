import { Skeleton } from "@/components/ui/skeleton";

export const AirQualityHistogramSkeleton = () => (
  <div className="rounded-lg border bg-card p-6">
    <Skeleton className="mb-4 h-6 w-40 bg-muted rounded" />
    <Skeleton className="h-[300px] bg-muted rounded" />
  </div>
);
