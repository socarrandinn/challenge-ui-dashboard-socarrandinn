"use client";
import DataTable from "@/components/core/table/data-table";
import { IZodAirQualityRangeSchema } from "../../schemas/air-quality-range.schema";
import { airQualityRangeColumn } from "../../constants/air-quality-range.columns";
type Props = {
  data: IZodAirQualityRangeSchema[];
  searchParams: any;
};
const AirQualityList = ({ data, searchParams }: Props) => {
  return (
    <DataTable
      key={JSON.stringify(searchParams ?? {})}
      columns={airQualityRangeColumn}
      data={data}
      title="Calidad del Aire"
    />
  );
};

export default AirQualityList;
