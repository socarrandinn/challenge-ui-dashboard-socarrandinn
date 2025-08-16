import { VALUES_KEY_LABELS } from "../../constants/air-quality.enum";
import { useId } from "react";
import { Card } from "@/components/ui/card";
import { SkeletonCardItem } from "./air-quality-summary";

export const AirQualitySummarySkeleton = () => {
  const id = useId();

  return (
    <div
      className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-7 px-4 md:px-6 gap-2"
      defaultValue="CO"
    >
      {Object?.entries(VALUES_KEY_LABELS)?.map(([key]) => (
        <Card
          key={`${id}-${key}`}
          className="has-data-[state=checked]:border-primary/50 relative flex w-full items-start gap-2 rounded-md border-2 p-4 shadow-xs outline-none cursor-pointer hover:bg-sidebar-accent"
        >
          <SkeletonCardItem />
        </Card>
      ))}
    </div>
  );
};
