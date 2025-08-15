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

type Props = {
  summary: IAirQualitySummary | null;
  operator: OPERATORS_ENUM;
};

export const AirQualitySummary = ({ summary, operator }: Props) => {
  const id = useId();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

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
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 px-4 md:px-6 gap-2"
      defaultValue="CO"
      onValueChange={handleChange}
    >
      {Object?.entries(VALUES_KEY_LABELS)?.map(([key, value]) => (
        <Card
          key={`${id}-${key}`}
          className="border-white has-data-[state=checked]:border-primary/50 relative flex w-full items-start gap-2 rounded-md border-4 p-4 shadow-xs outline-none cursor-pointer"
          onClick={() => handleCardClick(key)}
        >
          <RadioGroupItem
            value={key}
            id={`${id}-${key}`}
            aria-describedby={`${id}-${key}-description`}
            className="top-4 right-4 absolute"
          />
          <Label htmlFor={`${id}-${key}`} className="cursor-pointer">
            <div className="flex grow items-center gap-3">
              <AirVentIcon />
              <div className="grid grow gap-2">
                <p className="text-lg"> {value.label}</p>
                <AirQualityOperatorValue
                  value={summary?.[key as keyof IAirQualitySummary] || 0}
                  operator={operator}
                  className="text-xl md:text-2xl font-bold"
                />
              </div>
            </div>
          </Label>
        </Card>
      ))}
    </RadioGroup>
  );
};
