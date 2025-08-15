import { Suspense } from "react";
import HeaderFiler from "@/modules/dashboard/components/header-filters";
import {
  INTERVALS_ENUM,
  OPERATORS_ENUM,
} from "@/modules/dashboard/constants/air-quality.enum";
import { AirQualitySummaryAsync } from "@/modules/dashboard/components/air-quality-summary/air-quality-summary-async";
import { AirQualityHistogramAsync } from "@/modules/dashboard/components/air-quality-histogram/air-quality-histogram-async";
import { AirQualityListAsync } from "@/modules/dashboard/components/air-quality-list/air-quality-list-async";
import { AirQualitySummarySkeleton } from "@/modules/dashboard/components/air-quality-summary/air-quality-summary-skeleton";
import { AirQualityHistogramSkeleton } from "@/modules/dashboard/components/air-quality-histogram/air-quality-histogram-skeleton";
import { AirQualityListSkeleton } from "@/modules/dashboard/components/air-quality-list/air-quality-list-skeleton";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: any;
};

const DashboardPage = async ({ searchParams }: Props) => {
  const query = await searchParams;

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <HeaderFiler />

      {/* Summary con Suspense */}
      <Suspense fallback={<AirQualitySummarySkeleton />}>
        <AirQualitySummaryAsync
          query={query}
          operator={query?.operator ?? OPERATORS_ENUM.MAX}
        />
      </Suspense>

      {/* Histogram con Suspense */}
      <div className="px-4 lg:px-6">
        <Suspense fallback={<AirQualityHistogramSkeleton />}>
          <AirQualityHistogramAsync
            query={query}
            interval={query?.interval ?? INTERVALS_ENUM.DAILY}
            parameter={query?.parameter ?? "CO"}
          />
        </Suspense>
      </div>

      {/* List con Suspense */}
      <div className="px-4 lg:px-6">
        <Suspense fallback={<AirQualityListSkeleton />}>
          <AirQualityListAsync query={query} searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
};

export default DashboardPage;
