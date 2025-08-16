"use client";
import DataTable from "@/components/core/table/data-table";
import { airQualityRangeColumn } from "../../constants/air-quality-range.columns";
import { useFindAirQualityRange } from "../../hooks/use-find-air-quality-range";

const AirQualityList = () => {
  const { data, isPending, error, queryParams } = useFindAirQualityRange();

  return (
    <DataTable
      key={JSON.stringify(queryParams)}
      title="Calidad del Aire"
      columns={airQualityRangeColumn}
      data={data?.data || []}
      isLoading={isPending}
      error={error}
    />
  );
};

export default AirQualityList;
