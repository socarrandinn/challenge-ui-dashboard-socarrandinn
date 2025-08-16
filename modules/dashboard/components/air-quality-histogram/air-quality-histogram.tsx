"use client";
import { memo, useMemo } from "react";
import dynamic from "next/dynamic";
import useAirQualityHistogram from "./use-air-quality-histogram";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PermissionContainer from "@/components/core/permission-container";
import LoadingFallback from "@/components/core/loading-fallback";
import EmptyHistogram from "@/modules/common/components/empty-histogram";

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
    <Card className="gap-0 min-h-[280px]">
      <PermissionContainer
        hasPermission={!isLoading}
        fallback={<LoadingFallback />}
      >
        <CardHeader>
          <CardTitle>Histogram</CardTitle>
        </CardHeader>
        <CardContent className="mt-4 px-4 md:px-6">
          {isEmpty ? <EmptyHistogram /> : content}
        </CardContent>
      </PermissionContainer>
    </Card>
  );
};

export default memo(AirQualityHistogram);
