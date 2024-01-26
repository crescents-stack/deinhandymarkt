/* eslint-disable @next/next/no-img-element */
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Edit, ShieldAlert, ShieldBan, ShieldCheck, Trash } from "lucide-react";
import { DataTableColumnHeader } from "../../../../../components/ui/sortable-hideable";
import Link from "next/link";
import { TUserSchema } from "../types/types";
import { formatDistance, subDays } from "date-fns";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<TUserSchema>[] = [
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
  // {
  //   accessorKey: "id",
  //   header: "ID",
  //   cell: ({ row }) => {
  //     const { _id } = row.original;
  //     return _id;
  //   },
  // },
  {
    accessorKey: "uid.name.firstName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="First name" />
    ),
    cell: ({ row }) => {
      const data: TUserSchema = row.original;
      return data?.uid?.name?.firstName;
    },
  },
  {
    accessorKey: "uid.name.lastName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last name" />
    ),
    cell: ({ row }) => {
      const data: TUserSchema = row.original;
      return data?.uid?.name?.lastName;
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => {
      const data: TUserSchema = row.original;
      return data?.uid?.email;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const data: TUserSchema = row.original;
      const date = new Date(data.uid.createdAt || new Date());
      return (
        <div>
          {data.status === "active" ? (
            <div className="px-4 py-[2px] rounded-full bg-green-600 inline-flex items-center gap-[4px]">
              <ShieldCheck className="w-5 h-5 storke-[1.3px] stroke-white" />
              <span className="text-white">Active</span>
            </div>
          ) : data.status === "pending" ? (
            <div className="px-4 py-[2px] rounded-full bg-orange-400 inline-flex items-center gap-[4px]">
              <ShieldAlert className="w-5 h-5 storke-[1.3px] stroke-white" />
              <span className="text-white">Pending</span>
            </div>
          ) : (
            <div className="px-4 py-[2px] rounded-full bg-pink-600 inline-flex items-center gap-[4px]">
              <ShieldBan className="w-5 h-5 storke-[1.3px] stroke-white" />
              <span className="text-white">Blocked</span>
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Joined" />
    ),
    cell: ({ row }) => {
      const data: TUserSchema = row.original;
      const date = new Date(data.uid.createdAt || new Date());
      return formatDistance(date, new Date(), { addSuffix: true });
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last updated" />
    ),
    cell: ({ row }) => {
      const data: TUserSchema = row.original;
      const date = new Date(data.uid.updatedAt || new Date());
      return formatDistance(date, new Date(), { addSuffix: true });
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="flex items-center gap-[4px]">
          <Link
            href={{
              pathname: "/dashboard/customers/block",
              query: {
                _id: data._id as string,
              },
            }}
          >
            <Button size={"icon"} variant={"icon"}>
              <ShieldBan className="w-[16px] h-[16px] stroke-[1.5px] stroke-gray-600" />
            </Button>
          </Link>
          <Link
            href={{
              pathname: "/dashboard/customers/update",
              query: {
                _id: data.uid._id as string,
              },
            }}
          >
            <Button size={"icon"} variant={"icon"}>
              <Edit className="w-[16px] h-[16px] stroke-[1.5px] stroke-gray-600" />
            </Button>
          </Link>
          <Link
            href={{
              pathname: "/dashboard/customers/delete",
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
