"use client";
import { IAirQualitySummary } from "@/interfaces/air-quality.interface";
import {
  OPERATORS_ENUM,
  VALUES_KEY_LABELS,
} from "../../constants/air-quality.enum";
import { useCallback, useId } from "react";
import AirQualityOperatorValue from "../air-quality-operator-value/air-quality-operator-value";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AirVentIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import LongText from "@/components/core/long-text/long-text";

type Props = {
  summary: IAirQualitySummary | null;
  operator: OPERATORS_ENUM;
  isLoading: boolean;
};

export const AirQualitySummary = ({ summary, operator, isLoading }: Props) => {
  const id = useId();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // Obtener el valor actual del parámetro desde la URL
  const currentParameter = searchParams.get("parameter") || "CO";

  const handleChange = useCallback(
    (newValue: string) => {
      const params = new URLSearchParams(searchParams);
      params.set("parameter", newValue);

      replace(`${pathname}?${params.toString()}`);
    },
    [searchParams, replace, pathname]
  );

  const handleCardClick = useCallback(
    (key: string) => {
      handleChange(key);
    },
    [handleChange]
  );

  return (
    <RadioGroup
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-7 px-4 md:px-6 gap-2"
      value={currentParameter}
      onValueChange={handleChange}
    >
      {Object?.entries(VALUES_KEY_LABELS)?.map(([key, value]) => (
        <Card
          key={`${id}-${key}`}
          className="has-data-[state=checked]:border-primary/50 relative flex w-full items-start gap-2 rounded-md border-2 p-4 shadow-xs outline-none cursor-pointer hover:bg-sidebar-accent"
          onClick={() => handleCardClick(key)}
        >
          <RadioGroupItem
            value={key}
            id={`${id}-${key}`}
            aria-describedby={`${id}-${key}-description`}
            className="top-4 right-4 absolute hidden"
          />
          <Label htmlFor={`${id}-${key}`} className="cursor-pointer">
            {isLoading ? (
              <SkeletonCardItem />
            ) : (
              <div className="flex grow items-start gap-3">
                <AirVentIcon className="w-3 h-3 sm:w-5 sm:h-5" />
                <div className="grid grow gap-1">
                  <LongText text={value?.label} lineClamp={1} />
                  <AirQualityOperatorValue
                    value={summary?.[key as keyof IAirQualitySummary] || 0}
                    operator={operator}
                    className="text-md md:text-xl font-medium"
                  />
                </div>
              </div>
            )}
          </Label>
        </Card>
      ))}
    </RadioGroup>
  );
};

export const SkeletonCardItem = () => (
  <div className="flex grow items-start gap-3">
    <Skeleton className="h-5 w-5 bg-muted" />
    <div className="grid grow gap-1">
      <Skeleton className="h-3 w-20 bg-muted" />
      <Skeleton className="h-7 w-full bg-muted" />
    </div>
  </div>
);
