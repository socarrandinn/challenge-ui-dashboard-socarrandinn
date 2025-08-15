import {
  INTERVALS_ENUM,
  OPERATORS_ENUM,
} from "@/modules/dashboard/constants/air-quality.enum";

export interface IAirQualitySummary {
  CO: number;
  PT08S1: number;
  NMHC: number;
  C6H6: number;
  PT08S2: number;
  NOx: number;
  PT08S3: number;
  NO2: number;
  PT08S4: number;
  PT08S5: number;
  T: number;
  RH: number;
  AH: number;
}

export interface IAirQualityRange extends IAirQualitySummary {
  _id: string;
  Date: string;
  Time: string;
  createdAt: string;
  updatedAt: string;
}

export interface IAirQualityQuery {
  range: string;
  parameter?: keyof IAirQualitySummary;
  operator?: OPERATORS_ENUM;
  interval?: INTERVALS_ENUM;
}
export interface IAirQualityTimeLine {
  count: number;
  interval: INTERVALS_ENUM;
}
