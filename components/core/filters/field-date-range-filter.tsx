"use client";

import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { IconCalendar, IconCaretDownFilled } from "@tabler/icons-react";
import { useCallback, useState, useEffect } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DateRange } from "react-day-picker";
import { FilterProps } from "@/interfaces/table-filters.interfaces";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import CleanParamsAction from "./clear-params-action";

export function FieldDateRangeFilter({ filter, title }: FilterProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // Función auxiliar para crear fechas en zona horaria local
  const createLocalDate = (dateString: string): Date => {
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day); // month - 1 porque los meses en JS van de 0-11
  };

  const parseRangeParam = useCallback(
    (rangeParam: string | null): DateRange | undefined => {
      if (!rangeParam) return undefined;

      const dates = rangeParam.split("_");
      if (dates.length === 2) {
        try {
          const fromDate = createLocalDate(dates[0]);
          const toDate = createLocalDate(dates[1]);

          if (!isNaN(fromDate.getTime()) && !isNaN(toDate.getTime())) {
            return {
              from: fromDate,
              to: toDate,
            };
          }
        } catch (error) {
          console.error("Error parsing date range:", error);
        }
      }

      return undefined;
    },
    []
  );

  const rangeParam = searchParams.get("range");

  const getDateFromParams = useCallback((): DateRange | undefined => {
    if (rangeParam) {
      const parsedRange = parseRangeParam(rangeParam);
      if (parsedRange) return parsedRange;
    }
    return undefined;
  }, [rangeParam, parseRangeParam]);

  const [date, setDate] = useState<DateRange | undefined>(getDateFromParams);

  useEffect(() => {
    const newDate = getDateFromParams();
    setDate(newDate);
  }, [getDateFromParams]);

  const updateDateParams = useCallback(
    (newDate: DateRange | undefined) => {
      const params = new URLSearchParams(searchParams);

      if (newDate?.from && newDate?.to) {
        const dateRange = `${format(newDate.from, "yyyy-MM-dd")}_${format(
          newDate.to,
          "yyyy-MM-dd"
        )}`;

        // Actualiza el parámetro range
        params.set("range", dateRange);

        if (filter?.key) {
          params.set(filter.key, dateRange);
        }
      } else if (newDate?.from) {
        const singleDate = format(newDate.from, "yyyy-MM-dd");

        if (filter?.key) {
          params.set(filter.key, singleDate);
        }
        params.delete("range");
      } else {
        params.delete("range");
        if (filter?.key) {
          params.delete(filter.key);
        }
      }

      replace(`${pathname}?${params.toString()}`);
    },
    [searchParams, replace, pathname, filter?.key]
  );

  const handleDateChange = (newDate: DateRange | undefined) => {
    setDate(newDate);
    updateDateParams(newDate);
  };

  const handleClean = useCallback(() => {
    const params = new URLSearchParams(searchParams);
    params.delete("range");
    if (filter?.key) {
      params.delete(filter.key);
    }

    replace(`${pathname}?${params.toString()}`);
    setDate({ from: undefined, to: undefined });
  }, [searchParams, pathname, replace, filter?.key]);

  return (
    <div className="grid gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            id="date"
            size={"sm"}
            variant="outline"
            className="bg-transparent dark:bg-input/30"
          >
            <IconCalendar className="h-5 w-5" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, yyyy")} -{" "}
                  {format(date.to, "LLL dd, yyyy")}
                </>
              ) : (
                format(date.from, "LLL dd, yyyy")
              )
            ) : (
              <span>{title}</span>
            )}
            <IconCaretDownFilled />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-auto p-0" align="start">
          <div className="flex flex-col gap-2 bg-popover p-4">
            <Calendar
              mode="range"
              defaultMonth={date?.from || new Date(2004, 0)}
              numberOfMonths={2}
              selected={date}
              onSelect={handleDateChange}
              className="rounded-lg border-none bg-popover"
            />
            <CleanParamsAction
              className="!relative ml-auto my-1 mr-1"
              onClean={handleClean}
              notIcon
              show
            />
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
