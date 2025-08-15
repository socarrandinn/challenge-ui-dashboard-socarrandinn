import { ColumnDef } from "@tanstack/react-table";
import { IZodAirQualityRangeSchema } from "../schemas/air-quality-range.schema";
import { DragHandle } from "@/modules/common/constants/id.column";
import { Checkbox } from "@/components/ui/checkbox";
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

const airColumns = Object?.entries(VALUES_KEY_LABELS)?.map(([key, value]) => ({
  accessorKey: key,
  header: value.label,
  enableSorting: false,
  cell: ({ row }) => {
    // @ts-ignore
    return <>{(row.original[key] as number) ?? 0}</>;
  },
})) as ColumnDef<IZodAirQualityRangeSchema>[];

export const airQualityRangeColumn: ColumnDef<IZodAirQualityRangeSchema>[] = [
  {
    id: "drag",
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original._id} />,
    enableSorting: false,
  },
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
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
