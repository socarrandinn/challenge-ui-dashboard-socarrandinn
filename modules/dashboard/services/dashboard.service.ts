import { ApiResponse } from "@/interfaces/api.interface";
import { ApiServerSide } from "@/lib/api.services/api-server-side.service";
import { getRangeDate } from "../utils/filters";
import { IZodAirQualityRangeSchema } from "../schemas/air-quality-range.schema";
import { OPERATORS_ENUM } from "../constants/air-quality.enum";
import {
  IAirQualityQuery,
  IAirQualitySummary,
  IAirQualityTimeLine,
} from "@/interfaces/air-quality.interface";
import { buildCacheTag, buildQueryString } from "../utils/service.build";

export const searchAirQualitySummary = async (
  searchParams: IAirQualityQuery,
  config?: any
): Promise<ApiResponse<IAirQualitySummary>> => {
  const { from, to } = getRangeDate(searchParams?.range);

  const queryParams = {
    from,
    to,
    operator: searchParams?.operator ?? OPERATORS_ENUM.MAX,
  };

  const baseUrl = "/air-quality/summary";
  const queryString = buildQueryString(queryParams);
  const cacheTag = buildCacheTag({ ...queryParams });

  return await ApiServerSide.get(`${baseUrl}${queryString}`, {
    next: { ...config, tags: [cacheTag] },
  });
};

export const searchAirQualityRange = async (
  searchParams: IAirQualityQuery,
  config?: any
): Promise<ApiResponse<IZodAirQualityRangeSchema[]>> => {
  const { from, to } = getRangeDate(searchParams?.range);

  const queryParams = {
    from,
    to,
  };

  const baseUrl = "/air-quality/range";
  const queryString = buildQueryString(queryParams);
  const cacheTag = buildCacheTag({ ...queryParams });

  return await ApiServerSide.get(`${baseUrl}${queryString}`, {
    next: { ...config, tags: [cacheTag], revalidate: 0 },
  });
};

export const searchAirQualityTimeLine = async (
  searchParams: IAirQualityQuery,
  config?: any
): Promise<ApiResponse<IAirQualityTimeLine[]>> => {
  const { from, to } = getRangeDate(searchParams?.range);

  const queryParams = {
    from,
    to,
    operator: searchParams?.operator,
    interval: searchParams?.interval,
  };

  const baseUrl = `/air-quality/timeline/${searchParams?.parameter}`;
  const queryString = buildQueryString(queryParams);
  const cacheTag = buildCacheTag({ ...queryParams });

  return await ApiServerSide.get(`${baseUrl}${queryString}`, {
    next: { ...config, tags: [cacheTag] },
  });
};
