import { ColumnDef } from "@tanstack/react-table";
import { IZodAirQualityRangeSchema } from "../schemas/air-quality-range.schema";

import { IconDotsVertical } from "@tabler/icons-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import DateValue from "@/components/core/format-value/date-value";
import { VALUES_KEY_LABELS } from "./air-quality.enum";
import AirQualityValue from "../components/air-quality-value/air-quality-value";
import { IAirQualitySummary } from "@/interfaces/air-quality.interface";

const airColumns = Object?.entries(VALUES_KEY_LABELS)?.map(([key, value]) => ({
  accessorKey: key,
  header: value.label,
  enableSorting: false,
  cell: ({ row }) => {
    return (
      <AirQualityValue
        value={row.original[key as keyof IAirQualitySummary] || 0}
      />
    );
  },
})) as ColumnDef<IZodAirQualityRangeSchema>[];

export const airQualityRangeColumn: ColumnDef<IZodAirQualityRangeSchema>[] = [
  ...airColumns,
  {
    accessorKey: "Date",
    header: "Fecha",
    cell: ({ row }) => {
      return <DateValue value={row?.original?.Date} />;
    },
  },
  {
    accessorKey: "Time",
    header: "Tiempo",
    cell: ({ row }) => {
      return <DateValue value={row?.original?.Time} format="hh:mm:ss" />;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Fecha de creación",
    cell: ({ row }) => {
      return <DateValue value={row?.original?.createdAt} />;
    },
    enableSorting: true,
  },
  {
    id: "actions",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
            size="icon"
          >
            <IconDotsVertical />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Make a copy</DropdownMenuItem>
          <DropdownMenuItem>Favorite</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
