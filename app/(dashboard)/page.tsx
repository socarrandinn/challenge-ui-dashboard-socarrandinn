import { Suspense } from "react";
import HeaderFiler from "@/modules/dashboard/components/header-filters/header-filters";
import { AirQualitySummaryAsync } from "@/modules/dashboard/components/air-quality-summary/air-quality-summary-async";
import { AirQualitySummarySkeleton } from "@/modules/dashboard/components/air-quality-summary/air-quality-summary-skeleton";
import AirQualityHistogram from "@/modules/dashboard/components/air-quality-histogram/air-quality-histogram";
import AirQualityListSkeleton from "@/modules/dashboard/components/air-quality-list/air-quality-list-skeleton";
import AirQualityList from "@/modules/dashboard/components/air-quality-list/air-quality-list";
import { AirQualityHistogramSkeleton } from "@/modules/dashboard/components/air-quality-histogram/air-quality-histogram-skeleton";

const DashboardPage = () => {
  return (
    <div className="flex flex-col gap-3 py-4 md:gap-4 md:py-6">
      <HeaderFiler />

      {/* Summary con Suspense */}
      <Suspense fallback={<AirQualitySummarySkeleton />}>
        <AirQualitySummaryAsync />
      </Suspense>

      {/* Histogram con Suspense */}
      <div className="px-4 lg:px-6">
        <Suspense fallback={<AirQualityHistogramSkeleton />}>
          <AirQualityHistogram />
        </Suspense>
      </div>

      <div className="px-4 lg:px-6">
        <Suspense fallback={<AirQualityListSkeleton />}>
          <AirQualityList />
        </Suspense>
      </div>
    </div>
  );
};

export default DashboardPage;
