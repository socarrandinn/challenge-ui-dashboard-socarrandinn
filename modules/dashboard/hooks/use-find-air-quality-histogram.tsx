"use client";
import { useCallback } from "react";
import { searchAirQualityTimeLine } from "../services/dashboard.service";
import { useQuery } from "@tanstack/react-query";
import { AIR_QUALITY_SUMMARY } from "../constants/air-quality.query";
import { useDashboardSearchParams } from "./use-dashboard-search-params";
import { INTERVALS_ENUM, OPERATORS_ENUM } from "../constants/air-quality.enum";
import { IAirQualityQuery } from "@/interfaces/air-quality.interface";

export const useFindAirQualityHistogram = () => {
  const { queryParams } = useDashboardSearchParams(
    ["range", "operator", "interval", "parameter"],
    {
      parameter: "CO",
      operator: OPERATORS_ENUM.MAX,
      interval: INTERVALS_ENUM.DAILY,
    }
  );

  const fetch = useCallback(
    async () => await searchAirQualityTimeLine(queryParams as IAirQualityQuery),
    [queryParams]
  );
  const query = useQuery({
    queryKey: [AIR_QUALITY_SUMMARY, queryParams],
    queryFn: fetch,
  });
  return {
    ...query,
    parameter: queryParams?.parameter,
    interval: queryParams?.interval,
  };
};
