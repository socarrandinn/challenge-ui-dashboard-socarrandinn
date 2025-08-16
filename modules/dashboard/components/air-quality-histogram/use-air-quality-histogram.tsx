import {
  IAirQualitySummary,
  IAirQualityTimeLine,
} from "@/interfaces/air-quality.interface";
import { useMemo } from "react";
import { formatDate } from "@/lib/utils";
import { VALUES_KEY_LABELS } from "../../constants/air-quality.enum";
import { useFindAirQualityHistogram } from "../../hooks/use-find-air-quality-histogram";

const xaxisConfig: Record<string, any> = {
  Monthly: {
    type: "datetime",
    labels: {
      format: "yyyy/MM",
    },
  },
};

const useAirQualityHistogram = () => {
  const { data, isLoading, interval, parameter } = useFindAirQualityHistogram();

  console.log(data,'HISTOGRAM')
  const { air } = useMemo(() => {
    const air: number[] = [];

    data?.data?.forEach((n: IAirQualityTimeLine) => {
      air.push(n?.count);
    });

    return {
      air,
    };
  }, [data]);

  const labels = useMemo(() => {
    return (
      data?.data?.map((n: IAirQualityTimeLine) => {
        const d = n?.interval;
        return formatDate(d);
      }) || []
    );
  }, [data]);

  const series = useMemo(() => {
    return [
      {
        name: VALUES_KEY_LABELS[parameter as keyof IAirQualitySummary]?.label,
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
    isLoading,
  };
};
export default useAirQualityHistogram;
