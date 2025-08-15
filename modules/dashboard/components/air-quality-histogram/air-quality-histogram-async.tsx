import { IAirQualitySummary } from "@/interfaces/air-quality.interface";
import { INTERVALS_ENUM } from "../../constants/air-quality.enum";
import { searchAirQualityTimeLine } from "../../services/dashbaord.service";
import AirQualityHistogram from "./air-quality-histogram";

type Props = {
  query: any;
  interval: INTERVALS_ENUM;
  parameter: keyof IAirQualitySummary;
};

export const AirQualityHistogramAsync = async ({
  query,
  interval,
  parameter,
}: Props) => {
  const { data: timeline } = await searchAirQualityTimeLine(query);

  return (
    <AirQualityHistogram
      data={timeline || []}
      interval={interval}
      parameter={parameter}
    />
  );
};
