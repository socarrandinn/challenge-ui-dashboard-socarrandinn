"use client";
import { FieldDateRangeFilter } from "@/components/core/filters/field-date-range-filter";
import { FieldSelectFilter } from "@/components/core/filters/field-select-filter";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { FILTER_TYPE_ENUM } from "@/interfaces/table-filters.interfaces";
import {
  INTERVALS_ENUM,
  OPERATORS_ENUM,
} from "../../constants/air-quality.enum";
import { Suspense } from "react";
import { HeaderFiltersSkeleton } from "./header-filters-skeleton";

const HeaderFiler = () => {
  const OPTIONS = [
    { value: OPERATORS_ENUM.MAX, label: "Máximo" },
    { value: OPERATORS_ENUM.MIN, label: "Mínimo" },
    { value: OPERATORS_ENUM.AVG, label: "Promedio" },
  ];

  const INTERVAL_OPTIONS = [
    { value: INTERVALS_ENUM.DAILY, label: "Diario" },
    { value: INTERVALS_ENUM.MONTHLY, label: "Mensual" },
    { value: INTERVALS_ENUM.YEARLY, label: "Anual" },
  ];

  return (
    <header className="lg:px-6 px-4">
      <Card className="flex flex-col md:flex-row md:justify-between py-2 lg:py-4 gap-2 md:gap-4">
        <CardContent className="flex flex-col flex-1 gap-1 px-4 md:px-6">
          <CardTitle>Dashboard</CardTitle>
          <CardTitle className="font-light">Calidad de aire</CardTitle>
        </CardContent>
        <CardContent className="flex flex-row gap-2 items-center flex-wrap px-4 md:px-6">
          <Suspense fallback={<HeaderFiltersSkeleton />}>
            <FieldDateRangeFilter
              title="Rango"
              filter={{
                key: "range",
                type: FILTER_TYPE_ENUM.RANGE,
              }}
            />
            <FieldSelectFilter
              title="Intervalo"
              filter={{
                key: "interval",
                type: FILTER_TYPE_ENUM.FIXED_LIST,
                options: INTERVAL_OPTIONS,
                defaultValue: INTERVALS_ENUM.DAILY,
                placeholder: "Intervalo",
              }}
            />
            <FieldSelectFilter
              title="Operador"
              filter={{
                key: "operator",
                type: FILTER_TYPE_ENUM.FIXED_LIST,
                options: OPTIONS,
                defaultValue: OPERATORS_ENUM.MAX,
                placeholder: "Seleccione el operador",
              }}
            />
          </Suspense>
        </CardContent>
      </Card>
    </header>
  );
};

export default HeaderFiler;
