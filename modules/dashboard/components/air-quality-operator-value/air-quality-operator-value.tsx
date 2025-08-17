import { cn } from "@/lib/utils";
import { OPERATORS_ENUM } from "../../constants/air-quality.enum";

type Props = {
  value: number;
  operator: OPERATORS_ENUM;
  className?: string;
};

const AirQualityOperatorValue = ({ operator, value, className }: Props) => {
  switch (operator) {
    case OPERATORS_ENUM.MIN:
      return <span className={cn("text-red-500", className)}>{value}</span>;
    case OPERATORS_ENUM.MAX:
      return <span className={cn("text-shadow-emerald-500", className)}>{value}</span>;
    case OPERATORS_ENUM.AVG:
      return <span className={cn(className)}>{value.toFixed(2)}%</span>;
    default:
      return <span className={cn(className)}>{value}</span>;
  }
};

export default AirQualityOperatorValue;
