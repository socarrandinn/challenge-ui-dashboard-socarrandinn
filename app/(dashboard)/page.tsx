import { ChartAreaInteractive } from "@/modules/dashboard/components/chart-area-interactive";
import { DataTable } from "@/modules/dashboard/components/data-table";
import { SectionCards } from "@/modules/dashboard/components/section-cards";

import HeaderFiler from "@/modules/dashboard/components/header-filters";
import { searchAirQualityRange } from "@/modules/dashboard/services/dashbaord.service";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: any;
};

const DashboardPage = async ({ searchParams }: Props) => {
  const query = await searchParams;
  const { data: range } = await searchAirQualityRange(query);
  console.log(range, "range");

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <HeaderFiler />
      <SectionCards />
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>
      <DataTable data={range} />
    </div>
  );
};

export default DashboardPage;
