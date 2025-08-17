import React from "react";

type Props = {
  value: number;
};
const AirQualityValue = ({ value }: Props) => {
  if (value < 0) return <span className="text-red-500">{value}</span>;
  return <span>{value}</span>;
};

export default AirQualityValue;
