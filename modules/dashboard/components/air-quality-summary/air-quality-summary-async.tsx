"use client";
import { IAirQualitySummary } from "@/interfaces/air-quality.interface";
import { AirQualitySummary } from "./air-quality-summary";
import HandleError from "../air-quality-error/air-quality-error";

import { useFindAirQualitySummary } from "../../hooks/use-find-air-quality-summary";
import { OPERATORS_ENUM } from "../../constants/air-quality.enum";

export const AirQualitySummaryAsync = () => {
  const { data, error, isPending, operator } = useFindAirQualitySummary();

  if (error) {
    return <HandleError />;
  }

  return (
    <AirQualitySummary
      summary={data?.data as IAirQualitySummary}
      operator={operator as OPERATORS_ENUM}
      isLoading={isPending}
    />
  );
};
