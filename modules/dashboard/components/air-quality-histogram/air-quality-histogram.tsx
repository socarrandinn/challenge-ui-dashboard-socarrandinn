"use client";
import { memo, Suspense, useMemo } from "react";
import dynamic from "next/dynamic";
import useAirQualityHistogram from "./use-air-quality-histogram";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PermissionContainer from "@/components/core/permission-container";
import LoadingFallback from "@/components/core/loading-fallback";
import EmptyHistogram from "@/modules/common/components/empty-histogram";
import {
  INTERVAL_OPTIONS,
  INTERVALS_ENUM,
} from "../../constants/air-quality.enum";
import { FieldSelectFilter } from "@/components/core/filters/field-select-filter";
import { FILTER_TYPE_ENUM } from "@/interfaces/table-filters.interfaces";
import { Skeleton } from "@/components/ui/skeleton";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
  loading: () => <LoadingFallback />,
});

const AirQualityHistogram = () => {
  const { options, series, isLoading } = useAirQualityHistogram();
  const isEmpty = useMemo(
    () => series?.every((s) => s.data.length === 0),
    [series]
  );

  const content = useMemo(() => {
    return (
      <Chart
        // @ts-ignore
        options={options}
        series={series}
        type="area"
        width="100%"
        height={280}
      />
    );
  }, [options, series]);

  return (
    <Card className="gap-2 min-h-[280px]">
      <CardHeader className="flex flex-row flex-wrap gap-2 justify-between items-center">
        <CardTitle>Histogram</CardTitle>
        <Suspense
          fallback={<Skeleton className="h-10 w-32 bg-gray-200 rounded-md " />}
        >
          <FieldSelectFilter
            title="Intervalo"
            filter={{
              key: "interval",
              type: FILTER_TYPE_ENUM.FIXED_LIST,
              options: INTERVAL_OPTIONS,
              defaultValue: INTERVALS_ENUM.DAILY,
              placeholder: "Intervalo",
            }}
          />
        </Suspense>
      </CardHeader>
      <PermissionContainer
        hasPermission={!isLoading}
        fallback={<LoadingFallback />}
      >
        <CardContent className="mt-4 px-4 md:px-6">
          {isEmpty ? <EmptyHistogram /> : content}
        </CardContent>
      </PermissionContainer>
    </Card>
  );
};

export default memo(AirQualityHistogram);
