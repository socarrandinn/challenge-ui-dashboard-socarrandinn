import { ApiResponse } from "@/interfaces/api.interface";
import { ApiServerSide } from "@/lib/api.services/api-server-side.service";
import { getRangeDate } from "../utils/filters";
import { IZodAirQualityRangeSchema } from "../schemas/air-quality-range.schema";
import { INTERVALS_ENUM, OPERATORS_ENUM } from "../constants/air-quality.enum";
import {
  IAirQualityQuery,
  IAirQualitySummary,
  IAirQualityTimeLine,
} from "@/interfaces/air-quality.interface";

export const searchAirQualitySummary = async (
  searchParams: IAirQualityQuery,
  config?: any
): Promise<ApiResponse<IAirQualitySummary>> => {
  const { from, to } = getRangeDate(searchParams?.range);
  const cacheTag = `SUMMARY-${from}-${to}-${searchParams?.operator}`;

  return await ApiServerSide.get(
    `/air-quality/summary?from=${from}&to=${to}&operator=${
      searchParams?.operator ?? OPERATORS_ENUM.MAX
    }`,
    {
      next: { ...config, tags: [cacheTag] },
    }
  );
};

export const searchAirQualityRange = async (
  searchParams: IAirQualityQuery,
  config?: any
): Promise<ApiResponse<IZodAirQualityRangeSchema[]>> => {
  const { from, to } = getRangeDate(searchParams?.range);

  const cacheTag = `RANGE_LIST-${from}-${to}`;

  return await ApiServerSide.get(`/air-quality/range?from=${from}&to=${to}`, {
    next: { ...config, tags: [cacheTag], revalidate: 0 },
  });
};

export const searchAirQualityTimeLine = async (
  searchParams: IAirQualityQuery,
  config?: any
): Promise<ApiResponse<IAirQualityTimeLine[]>> => {
  const { from, to } = getRangeDate(searchParams?.range);

  const cacheTag = `TIMELINE-${from}-${to}-${searchParams?.operator}-${searchParams?.parameter}`;

  return await ApiServerSide.get(
    `/air-quality/timeline/${
      searchParams?.parameter ?? "CO"
    }?from=${from}&to=${to}&operator=${
      searchParams?.operator ?? OPERATORS_ENUM.MAX
    }&interval=${searchParams?.interval ?? INTERVALS_ENUM.DAILY}`,
    {
      next: { ...config, tags: [cacheTag], revalidate: 0 },
    }
  );
};
