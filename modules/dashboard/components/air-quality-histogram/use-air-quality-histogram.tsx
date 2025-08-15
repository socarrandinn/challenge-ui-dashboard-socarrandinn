import {
  IAirQualitySummary,
  IAirQualityTimeLine,
} from "@/interfaces/air-quality.interface";
import { useMemo } from "react";
import { formatDate } from "@/lib/utils";
import { INTERVALS_ENUM, VALUES_KEY_LABELS } from "../../constants/air-quality.enum";

const xaxisConfig: Record<string, any> = {
  Monthly: {
    type: "datetime",
    labels: {
      format: "yyyy/MM",
    },
  },
};
type Props = {
  data: IAirQualityTimeLine[];
  interval: INTERVALS_ENUM;
  parameter: keyof IAirQualitySummary;
};
const useAirQualityHistogram = ({ data, interval, parameter }: Props) => {
  const { air } = useMemo(() => {
    const air: number[] = [];

    data?.forEach((n: IAirQualityTimeLine) => {
      air.push(n?.count);
    });

    return {
      air,
    };
  }, [data]);

  const labels = useMemo(() => {
    return (
      data?.map((n: IAirQualityTimeLine) => {
        const d = n?.interval;
        return formatDate(d);
      }) || []
    );
  }, [data]);

  const series = useMemo(() => {
    return [
      {
        name: VALUES_KEY_LABELS[parameter]?.label || 'CO',
        data: air || [],
      },
    ];
  }, [air, parameter]);

  const options = useMemo(
    () => ({
      title: {
        align: "left",
        style: {
          fontSize: 20,
        },
      },
      chart: {
        id: "histogram-air-quality",
        toolbar: {
          show: true,
          autoSelected: "zoom",
        },
      },
      yaxis: {
        min: 0,
        forceNiceScale: true,
        labels: {
          formatter: (value: number) => {
            return value;
          },
        },
      },
      labels,
      xaxis: xaxisConfig[interval as string] || {
        type: "datetime",
      },
      markers: { size: 0 },
      tooltip: { shared: false },
      dataLabels: {
        enabled: true,
        formatter: (value: number) => {
          return value;
        },
      },
    }),
    [labels, interval]
  );

  return {
    options,
    series,
  };
};
export default useAirQualityHistogram;
