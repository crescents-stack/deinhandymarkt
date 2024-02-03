/* eslint-disable @next/next/no-img-element */
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { DataTableColumnHeader } from "../../../../../components/ui/sortable-hideable";
import Link from "next/link";
import { TVatCountrySchema } from "../types/types";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<TVatCountrySchema>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="pr-4">
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
      <div className="pr-4">
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
  {
    accessorKey: "Country name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Country name" />
    ),
    cell: ({ row }) => {
      const { countryName } = row.original;
      return countryName;
    },
  },
  {
    accessorKey: "Country code",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Country code" />
    ),
    cell: ({ row }) => {
      const { countryCode } = row.original;
      return countryCode;
    },
  },
  {
    accessorKey: "VAT amount (%)",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Vat amount (%)" />
    ),
    cell: ({ row }) => {
      const { vatAmountInPercent } = row.original;
      return vatAmountInPercent;
    },
  },

  {
    id: "Actions",
    header: "Actions",
    cell: ({ row }) => {
      const data = row.original;
      const { _id, countryName, countryCode, vatAmountInPercent } = data;
      return (
        <div className="flex items-center gap-[4px]">
          <Link
            href={{
              pathname: "/dashboard/vat/update",
              query: {
                _id: _id as string,
                countryName: countryName as string,
                countryCode: countryCode as string,
                vatAmountInPercent: vatAmountInPercent,
              },
            }}
          >
            <Button size={"icon"} variant={"icon"}>
              <Edit className="w-[16px] h-[16px] stroke-[1.5px] stroke-gray-600" />
            </Button>
          </Link>
          <Link
            href={{
              pathname: "/dashboard/vat/delete",
              query: {
                _id: data._id as string,
              },
            }}
          >
            <Button size={"icon"} variant={"icon"} className="border-pink-200">
              <Trash className="w-[16px] h-[16px] stroke-[1.5px] stroke-pink-500" />
            </Button>
          </Link>
        </div>
      );
    },
  },
];
