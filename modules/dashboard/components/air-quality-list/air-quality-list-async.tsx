import { searchAirQualityRange } from "../../services/dashbaord.service";
import HandleError from "../air-quality-error/air-quality-error";
import AirQualityList from "./air-quality-list";

type Props = {
  query: any;
  searchParams: any;
};

export const AirQualityListAsync = async ({ query, searchParams }: Props) => {
  const { data: range, error } = await searchAirQualityRange(query);

  if (error) {
    return <HandleError />;
  }

  return <AirQualityList data={range || []} searchParams={searchParams} />;
};
