import { IAirQualityQuery, IAirQualitySummary } from "@/interfaces/ait-quality.interface";
import { ApiResponse } from "@/interfaces/api.interface";
import { ApiServerSide } from "@/lib/api.services/api-server-side.service";
import { getRangeDate } from "../utils/filters";


export const getProductsByPosition = async (config?: any): Promise<ApiResponse<IAirQualitySummary[]>> => {
  return await ApiServerSide.get(`/air-quality/summary`, {
    next: { ...config, tags: ['SUMMARY'] },
  });
};

export const searchAirQualityRange = async (searchParams: IAirQualityQuery, config?: any): Promise<ApiResponse<IAirQualitySummary[]>> => {

  const { form, to } = getRangeDate(searchParams?.range)

  const cacheTag = `SUMMARY-${form}-${to}`;

  return await ApiServerSide.get(`/air-quality/range?from=${form}&to=${to}`, {
    next: { ...config, tags: [cacheTag], revalidate: 0 },
  });
};