import { searchAirQualityRange } from "../../services/dashbaord.service";
import AirQualityList from "./air-quality-list";

type Props = {
  query: any;
  searchParams: any;
};

export const AirQualityListAsync = async ({ query, searchParams }: Props) => {
  const { data: range } = await searchAirQualityRange(query);

  return <AirQualityList data={range || []} searchParams={searchParams} />;
};
