import { Skeleton } from "@/components/ui/skeleton";

export const AirQualityListSkeleton = () => (
  <div className="rounded-lg border bg-card">
    {/* Header */}
    <div className="p-6 border-b">
      <Skeleton className="h-6 w-32" />
    </div>

    {/* Table Header */}
    <div className="p-6 pb-4 border-b">
      <div className="grid grid-cols-4 gap-4">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-18" />
      </div>
    </div>

    {/* Table Rows */}
    <div className="p-6 pt-0">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="grid grid-cols-4 gap-4 items-center py-4 border-b last:border-0"
        >
          {/* Primera columna con avatar y texto */}
          <div className="flex items-center space-x-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>

          {/* Segunda columna */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-3 w-14" />
          </div>

          {/* Tercera columna */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-3 w-12" />
          </div>

          {/* Cuarta columna */}
          <div className="flex justify-end">
            <Skeleton className="h-8 w-20 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default AirQualityListSkeleton;
