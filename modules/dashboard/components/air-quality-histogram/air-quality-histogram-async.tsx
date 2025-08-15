import { IAirQualitySummary } from "@/interfaces/air-quality.interface";
import { INTERVALS_ENUM } from "../../constants/air-quality.enum";
import { searchAirQualityTimeLine } from "../../services/dashbaord.service";
import AirQualityHistogram from "./air-quality-histogram";
import HandleError from "../air-quality-error/air-quality-error";

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
  const { data: timeline, error } = await searchAirQualityTimeLine(query);

  if (error) {
    return <HandleError />;
  }

  return (
    <AirQualityHistogram
      data={timeline || []}
      interval={interval}
      parameter={parameter}
    />
  );
};
