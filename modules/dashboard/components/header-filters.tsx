"use client";
import { FieldDateRangeFilter } from "@/components/core/filters/field-date-range-filter";
import { Card, CardContent } from "@/components/ui/card";
import { FILTER_TYPE_ENUM } from "@/interfaces/table-filters.interfaces";

const HeaderFiler = () => {
  return (
    <header className="lg:px-6 px-4">
      <Card className="flex flex-row justify-end  py-2 lg:py-4">
        <CardContent className="">
          <FieldDateRangeFilter
            title="Rango"
            filter={{
              label: "",
              field: "",
              key: "range",
              placeholder: undefined,
              type: FILTER_TYPE_ENUM.RANGE,
              options: undefined,
              queryKey: undefined,
              className: undefined,
            }}
            value={undefined}
          />
        </CardContent>
      </Card>
    </header>
  );
};

export default HeaderFiler;
