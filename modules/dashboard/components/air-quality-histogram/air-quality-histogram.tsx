"use client";
import { memo, useMemo } from "react";
import useAirQualityHistogram from "./use-air-quality-histogram";
import Chart from "react-apexcharts";
import {
  IAirQualitySummary,
  IAirQualityTimeLine,
} from "@/interfaces/air-quality.interface";
import { INTERVALS_ENUM } from "../../constants/air-quality.enum";
import { Card, CardContent } from "@/components/ui/card";

type Props = {
  data: IAirQualityTimeLine[];
  interval: INTERVALS_ENUM;
  parameter: keyof IAirQualitySummary;
};
const AirQualityHistogram = ({ ...props }: Props) => {
  const { options, series } = useAirQualityHistogram({ ...props });
  const isEmpty = useMemo(
    () => series?.every((s) => s.data.length === 0),
    [series]
  );

  console.log(props?.data, "AAAA");

  const emptyData = <>VAcio</>;

  const content = useMemo(() => {
    return (
      <Chart
        // @ts-ignore
        options={options}
        series={series}
        type="area"
        width="100%"
        height={300}
      />
    );
  }, [options, series]);

  return (
    <Card>
      <CardContent className="mt-4">
        {isEmpty ? emptyData : content}
      </CardContent>
    </Card>
  );
};

export default memo(AirQualityHistogram);
