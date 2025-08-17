import { Skeleton } from "@/components/ui/skeleton";

export const HeaderFiltersSkeleton = () => {
  return (
    <div className="flex flex-row gap-2 items-center flex-wrap px-4 md:px-6">
      <Skeleton className="h-10 w-40 bg-gray-200 rounded-md " />
      <Skeleton className="h-10 w-32 bg-gray-200 rounded-md " />
    </div>
  );
};
