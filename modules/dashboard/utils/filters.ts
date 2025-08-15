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
