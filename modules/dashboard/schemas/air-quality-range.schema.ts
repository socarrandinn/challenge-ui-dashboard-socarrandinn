import z from "zod";

export const airQualityRangeSchema = z.object({
  _id: z.string(),
  Date: z.string(),
  Time: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  CO: z.number(),
  PT08S1: z.number(),
  NMHC: z.number(),
  C6H6: z.number(),
  PT08S2: z.number(),
  NOx: z.number(),
  PT08S3: z.number(),
  NO2: z.number(),
  PT08S4: z.number(),
  PT08S5: z.number(),
  T: z.number(),
  RH: z.number(),
  AH: z.number(),
})


export type IZodAirQualityRangeSchema = z.infer<typeof airQualityRangeSchema>