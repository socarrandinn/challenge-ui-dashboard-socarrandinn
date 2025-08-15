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

export interface IAirQualityTimeline {
  CO: 5.2;
  count: 2;
  interval: "2004-03-10";
}

export interface IAirQualityRange {
  _id: string;
  Date: string;
  Time: string;
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
  __v: number;
  createdAt: string;
  updatedAt: string;
}


export interface IAirQualityQuery {
  range: string,
  operator?: string,

}