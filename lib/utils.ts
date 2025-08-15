import { clsx, type ClassValue } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatObjectDate = (
  year: number,
  month: number,
  day: number = 1
) => {
  const date = new Date(year, month - 1, day);
  return format(date, "yyyy-MM-dd");
};

export const formatDate = (date: string) => {
  try {
    const dateString = date.split(":");
    const day = dateString[0].split("-");
    return Date.UTC(
      Number(day[0]),
      Number(day[1]) - 1,
      day?.length === 2 ? 1 : Number(day[2]),
      dateString?.length === 2 ? Number(dateString[1]) : 0
    );
  } catch (e) {
    console.log(e);
    return date;
  }
};
