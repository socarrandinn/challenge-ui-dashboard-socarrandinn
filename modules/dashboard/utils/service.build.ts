export const buildQueryString = (
  params: Record<string, string | undefined>
): string => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.append(key, value);
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : "";
};

export const buildCacheTag = (
  params: Record<string, string | undefined>,
  prefix: string = "SUMMARY"
): string => {
  const values = Object.values(params)
    .filter((value) => value !== undefined && value !== null && value !== "")
    .join("-");

  return `${prefix}-${values}`;
};
