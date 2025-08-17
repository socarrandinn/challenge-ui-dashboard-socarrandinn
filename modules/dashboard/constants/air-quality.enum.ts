import { IAirQualitySummary } from "@/interfaces/air-quality.interface";

export enum OPERATORS_ENUM {
  AVG = "avg",
  MIN = "min",
  MAX = "max",
}

export enum INTERVALS_ENUM {
  DAILY = "daily",
  MONTHLY = "monthly",
  YEARLY = "yearly",
}

export const VALUES_KEY_LABELS: Record<
  keyof IAirQualitySummary,
  {
    label: string;
  }
> = {
  CO: { label: "CO(GT)" },
  PT08S1: { label: "PT08.S1(CO)" },
  NMHC: { label: "NMHC(GT)" },
  C6H6: { label: "C6H6(GT)" },
  PT08S2: { label: "PT08.S2(NMHC)" },
  NOx: { label: "NOx(GT)" },
  PT08S3: { label: "PT08.S3(NOx)" },
  NO2: { label: "NO2(GT)" },
  PT08S4: { label: "PT08.S4(NO2)" },
  PT08S5: { label: "PT08.S5(O3)" },
  T: { label: "T" },
  RH: { label: "RH" },
  AH: { label: "AH" },
};

export const INTERVAL_OPTIONS = [
  { value: INTERVALS_ENUM.DAILY, label: "Diario" },
  { value: INTERVALS_ENUM.MONTHLY, label: "Mensual" },
  { value: INTERVALS_ENUM.YEARLY, label: "Anual" },
];

export const OPERATORS_OPTIONS = [
  { value: OPERATORS_ENUM.MAX, label: "Máximo" },
  { value: OPERATORS_ENUM.MIN, label: "Mínimo" },
  { value: OPERATORS_ENUM.AVG, label: "Promedio" },
];
