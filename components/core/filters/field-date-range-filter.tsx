"use client";

import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { IconCalendar, IconCaretDownFilled } from "@tabler/icons-react";
import { useCallback, useState } from "react";

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

  // Lee los parámetros iniciales
  const fromParam = searchParams.get(`${filter?.key}_from`);
  const toParam = searchParams.get(`${filter?.key}_to`);

  const [date, setDate] = useState<DateRange | undefined>({
    from: fromParam ? new Date(fromParam) : undefined,
    to: toParam ? new Date(toParam) : undefined,
  });

  const updateDateParams = useCallback(
    (newDate: DateRange | undefined) => {
      const params = new URLSearchParams(searchParams);

      if (newDate?.from && newDate?.to) {
        const dateRange = `${format(
          newDate.from.toDateString(),
          "yyyy-MM-dd"
        )}_${format(newDate.to.toDateString(), "yyyy-MM-dd")}`;
        params.set(filter?.key, dateRange);
      } else if (newDate?.from) {
        params.set(
          filter?.key,
          format(newDate.from.toDateString(), "yyyy-MM-dd")
        );
      } else {
        params.delete(filter?.key);
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
    if (!filter?.key) return;
    const params = new URLSearchParams(searchParams);
    params.delete(filter?.key);
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
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
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
