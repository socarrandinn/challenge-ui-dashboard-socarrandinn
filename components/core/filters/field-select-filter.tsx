"use client";

import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { IconSelector, IconCaretDownFilled } from "@tabler/icons-react";
import {
  useCallback,
  useState,
  useEffect,
  useMemo,
  useTransition,
} from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { FilterProps } from "@/interfaces/table-filters.interfaces";

export function FieldSelectFilter({ filter, title }: FilterProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const initialValue = useMemo(() => {
    if (filter?.key) {
      const paramValue = searchParams.get(filter.key);
      if (
        paramValue &&
        filter?.options?.some((option) => option.value === paramValue)
      ) {
        return paramValue;
      }
    }
    return filter?.defaultValue || "";
  }, [filter.key, filter?.defaultValue, filter?.options, searchParams]);

  const [selectedValue, setSelectedValue] = useState<string>(initialValue);

  const updateSelectParams = useCallback(
    (newValue: string) => {
      startTransition(() => {
        const params = new URLSearchParams(searchParams.toString());

        if (filter?.key) {
          if (newValue === filter?.defaultValue || !newValue) {
            params.delete(filter.key);
          } else {
            params.set(filter.key, newValue);
          }
        }

        const newUrl = `${pathname}${
          params.toString() ? `?${params.toString()}` : ""
        }`;
        router.replace(newUrl, { scroll: false });
      });
    },
    [searchParams, filter.key, filter?.defaultValue, router, pathname]
  );

  useEffect(() => {
    const currentValue =
      searchParams.get(filter?.key || "") || filter?.defaultValue || "";
    if (currentValue !== selectedValue) {
      setSelectedValue(currentValue);
    }
  }, [searchParams, filter?.key, filter?.defaultValue, selectedValue]);

  const handleValueChange = useCallback(
    (newValue: string) => {
      setSelectedValue(newValue);
      updateSelectParams(newValue);
    },
    [updateSelectParams]
  );

  const selectedLabel = useMemo(() => {
    const selectedOption = filter?.options?.find(
      (option) => option.value === selectedValue
    );
    return selectedOption?.label || filter?.placeholder || title;
  }, [filter?.options, selectedValue, filter?.placeholder, title]);

  return (
    <div className="grid gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="sm"
            variant="outline"
            className="bg-transparent dark:bg-input/30 justify-between"
            disabled={isPending}
          >
            <span className="flex items-center gap-2">
              <IconSelector className="h-4 w-4" />
              {selectedValue ? selectedLabel : title}
            </span>
            <IconCaretDownFilled className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="start">
          <div className="p-2">
            {filter?.options?.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() => handleValueChange(option.value)}
                className={`cursor-pointer ${
                  selectedValue === option.value
                    ? "bg-accent text-accent-foreground"
                    : ""
                } ${isPending ? "opacity-50" : ""}`}
                disabled={isPending}
              >
                {option.label}
              </DropdownMenuItem>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
