import {
  IAirQualitySummary,
  IAirQualityTimeLine,
} from "@/interfaces/air-quality.interface";
import { useMemo } from "react";
import { formatDate } from "@/lib/utils";
import { VALUES_KEY_LABELS } from "../../constants/air-quality.enum";
import { useFindAirQualityHistogram } from "../../hooks/use-find-air-quality-histogram";
import { useTheme } from "next-themes";

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
  const { theme } = useTheme();

  const { air } = useMemo(() => {
    const air: number[] = [];

    data?.data?.forEach((n: any) => {
      air.push(n?.[parameter ?? "count"]);
    });

    return {
      air,
    };
  }, [data?.data, parameter]);

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
      theme: {
        mode: theme === "dark" ? "dark" : "light",
      },
      title: {
        align: "left",
        style: {
          fontSize: 20,
          color: "var(--background)",
        },
      },
      chart: {
        id: "histogram-air-quality",
        toolbar: {
          show: true,
          autoSelected: "zoom",
        },
        background: "transparent",
      },
      yaxis: {
        min: 0,
        forceNiceScale: true,
        labels: {
          style: {
            colors: ["var(--foreground)"],
          },
          formatter: (value: number) => value,
        },
      },
      labels,
      xaxis: {
        ...(xaxisConfig[interval as string] || { type: "datetime" }),
        labels: {
          style: {
            colors: ["var(--foreground)"],
          },
        },
      },
      markers: { size: 0 },
      tooltip: { shared: false },
      dataLabels: {
        enabled: true,
        style: {
          colors: ["var(--primary)"],
        },
        formatter: (value: number) => value,
      },

      fill: {
        type: "gradient",
        colors: ["var(--primary)"],
        gradient: {
          shade: theme === "dark" ? "dark" : "light",
          type: "vertical",
          shadeIntensity: 0.5,
          gradientToColors: ["var(--primary)"],
          inverseColors: false,
          opacityFrom: 0.8,
          opacityTo: 0.2,
          stops: [0, 100],
        },
      },
    }),
    [theme, labels, interval]
  );

  return {
    options,
    series,
    isLoading,
  };
};
export default useAirQualityHistogram;
