import { format } from "date-fns";
type Props = {
  from: string;
  to: string;
};
export const getRangeDate = (range: string): Props => {
  const newDate = new Date();
  const formatNewDate = format(newDate.toISOString(), "yyyy-MM-dd");

  if (range) {
    const rangeSplit = range.split("_");
    const from = rangeSplit?.[0] || formatNewDate;
    const to = rangeSplit?.[1] || rangeSplit?.[1] || formatNewDate;
    return { from, to };
  }

  return {
    from: formatNewDate,
    to: formatNewDate,
  };
};

export const createSafeKey = (params: any) => {
  if (!params) return "empty";

  const safeParams: Record<string, any> = {};
  Object.entries(params).forEach(([key, value]) => {
    if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean"
    ) {
      safeParams[key] = value;
    }
  });

  return JSON.stringify(safeParams);
};
