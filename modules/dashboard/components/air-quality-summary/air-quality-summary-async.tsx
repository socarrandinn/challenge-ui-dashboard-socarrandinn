import { IAirQualitySummary } from "@/interfaces/air-quality.interface";
import { searchAirQualitySummary } from "../../services/dashbaord.service";
import { AirQualitySummary } from "./air-quality-summary";
import { OPERATORS_ENUM } from "../../constants/air-quality.enum";
import { AirQualityError } from "../air-quality-error/air-quality-error";

type Props = {
  query: any;
  operator: OPERATORS_ENUM;
};

export const AirQualitySummaryAsync = async ({ query, operator }: Props) => {
  const { data: summary, error } = await searchAirQualitySummary(query);

  return (
    <AirQualityError
      error={error}
      title="Error en el Resumen de Calidad del Aire"
      description="No se pudieron cargar los datos de calidad del aire. Por favor, inténtalo de nuevo."
      showRetry={true}
      showHome={false}
      className="px-4 md:px-6"
    />
  );

  return (
    <AirQualitySummary
      error={error}
      summary={summary as IAirQualitySummary}
      operator={operator}
    />
  );
};
