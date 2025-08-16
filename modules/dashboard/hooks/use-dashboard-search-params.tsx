"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

type ParamConfig<T extends string> = {
  [K in T]?: string;
};

type QueryParamsResult<T extends string> = {
  [K in T]: string;
};

export const useDashboardSearchParams = <T extends string>(
  keys: T[],
  defaultValues: ParamConfig<T> = {}
) => {
  const searchParams = useSearchParams();

  const queryParams = useMemo(() => {
    const params = {} as QueryParamsResult<T>;

    keys.forEach((key) => {
      const value = searchParams.get(key);
      params[key] = value ?? defaultValues[key] ?? "";
    });

    return params;
  }, [searchParams, keys, defaultValues]);

  const allQueryParams = useMemo(() => {
    const params: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  }, [searchParams]);

  return {
    queryParams,
    allQueryParams,
  };
};
