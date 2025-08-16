"use client";
import { useCallback } from "react";
import { searchAirQualitySummary } from "../services/dashboard.service";
import { useQuery } from "@tanstack/react-query";
import { AIR_QUALITY_SUMMARY } from "../constants/air-quality.query";
import { useDashboardSearchParams } from "./use-dashboard-search-params";
import { OPERATORS_ENUM } from "../constants/air-quality.enum";
import { IAirQualityQuery } from "@/interfaces/air-quality.interface";

export const useFindAirQualitySummary = () => {
  const { queryParams } = useDashboardSearchParams(["range", "operator"], {
    operator: OPERATORS_ENUM.MAX,
  });

  const fetch = useCallback(
    () => searchAirQualitySummary(queryParams as IAirQualityQuery),
    [queryParams]
  );

  const query = useQuery({
    queryKey: [AIR_QUALITY_SUMMARY, queryParams],
    queryFn: fetch,
    refetchInterval: 1000,
  });

  return {
    ...query,
    operator: queryParams?.operator,
  };
};
