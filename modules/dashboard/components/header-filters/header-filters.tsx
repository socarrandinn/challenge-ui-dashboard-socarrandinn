"use client";
import { FieldDateRangeFilter } from "@/components/core/filters/field-date-range-filter";
import { FieldSelectFilter } from "@/components/core/filters/field-select-filter";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { FILTER_TYPE_ENUM } from "@/interfaces/table-filters.interfaces";

import { Suspense } from "react";
import { HeaderFiltersSkeleton } from "./header-filters-skeleton";
import {
  OPERATORS_ENUM,
  OPERATORS_OPTIONS,
} from "../../constants/air-quality.enum";

const HeaderFiler = () => {
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
              title="Operador"
              filter={{
                key: "operator",
                type: FILTER_TYPE_ENUM.FIXED_LIST,
                options: OPERATORS_OPTIONS,
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
