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
  error: any;
};
export const AirQualitySummary = ({ summary, operator, error }: Props) => {
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

  if (error) return <>EXISTE un error</>;
  return (
    <RadioGroup
      className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 px-4 md:px-6 gap-2"
      defaultValue="CO"
      onValueChange={handleChange}
    >
      {Object?.entries(VALUES_KEY_LABELS)?.map(([key, value]) => (
        <Card
          key={`${id}-${key}`}
          className="border-input has-data-[state=checked]:border-primary/50 relative flex w-full items-start gap-2 rounded-md border p-4 shadow-xs outline-none"
        >
          <RadioGroupItem
            value={key}
            id={`${id}-${key}-id`}
            aria-describedby={`${id}-${key}-description`}
            className="top-4 right-4  absolute "
          />
          <div className="flex grow items-center gap-3">
            <AirVentIcon />
            <div className="grid grow gap-2">
              <Label htmlFor={`${id}-1`}>{value.label}</Label>
              <AirQualityOperatorValue
                value={summary?.[key as keyof IAirQualitySummary] || 0}
                operator={operator}
                className="text-xl md:text-2xl font-bold"
              />
            </div>
          </div>
        </Card>
      ))}
    </RadioGroup>
  );
};
