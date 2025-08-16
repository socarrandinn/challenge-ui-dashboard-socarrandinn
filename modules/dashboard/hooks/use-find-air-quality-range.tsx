"use client";
import { useCallback } from "react";
import { searchAirQualityRange } from "../services/dashboard.service";
import { useQuery } from "@tanstack/react-query";
import { AIR_QUALITY_SUMMARY } from "../constants/air-quality.query";
import { useDashboardSearchParams } from "./use-dashboard-search-params";
import { IAirQualityQuery } from "@/interfaces/air-quality.interface";

export const useFindAirQualityRange = () => {
  const { queryParams } = useDashboardSearchParams(["range"]);

  const fetch = useCallback(
    () => searchAirQualityRange(queryParams as IAirQualityQuery),
    [queryParams]
  );

  const query = useQuery({
    queryKey: [AIR_QUALITY_SUMMARY, queryParams],
    queryFn: fetch,
    refetchInterval: 1000,
  });

  return {
    ...query,
    queryParams,
  };
};
