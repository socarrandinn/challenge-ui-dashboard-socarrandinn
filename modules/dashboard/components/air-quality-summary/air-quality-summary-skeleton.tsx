import { VALUES_KEY_LABELS } from "../../constants/air-quality.enum";
import { useId } from "react";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const AirQualitySummarySkeleton = () => {
  const id = useId();

  return (
    <div
      className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 px-4 md:px-6 gap-2"
      defaultValue="CO"
    >
      {Object?.entries(VALUES_KEY_LABELS)?.map(([key]) => (
        <Card
          key={`${id}-${key}`}
          className="border-input has-data-[state=checked]:border-primary/50 relative flex w-full items-start gap-2 rounded-md border p-4 shadow-xs outline-none"
        >
          <Skeleton className="top-4 right-4 bg-primary/20 absolute w-4 h-4 rounded-full" />
          <div className="flex grow items-center gap-3">
            <Skeleton className="w-8 h-8 rounded-l-lg" />
            <div className="grid grow gap-2">
              <Skeleton className="w-20 h-3 bg-primary/20" />
              <Skeleton className="w-36 h-6 bg-primary/20" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
