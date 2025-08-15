import { IAirQualitySummary } from "@/interfaces/air-quality.interface";
import { searchAirQualitySummary } from "../../services/dashbaord.service";
import { AirQualitySummary } from "./air-quality-summary";
import { OPERATORS_ENUM } from "../../constants/air-quality.enum";
import HandleError from "../air-quality-error/air-quality-error";

type Props = {
  query: any;
  operator: OPERATORS_ENUM;
};

export const AirQualitySummaryAsync = async ({ query, operator }: Props) => {
  const { data: summary, error } = await searchAirQualitySummary(query);

  if (error) {
    return <HandleError />;
  }

  return (
    <AirQualitySummary
      summary={summary as IAirQualitySummary}
      operator={operator}
    />
  );
};
