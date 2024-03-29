/* eslint-disable @next/next/no-img-element */
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Edit, FileText, Trash } from "lucide-react";
import { DataTableColumnHeader } from "../../../../../components/ui/sortable-hideable";
import Link from "next/link";
import { TOrdersSchema } from "../types/types";
import { formatRelative } from "date-fns";
import { IntlFormatter } from "@/lib/utils";
import clsx from "clsx";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<TOrdersSchema>[] = [
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
    accessorKey: "ID",
    header: "ID",
    cell: ({ row }) => {
      const { _id } = row.original;
      return _id;
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => {
      const data: TOrdersSchema = row.original;
      const updatedDate = new Date(data.updatedAt || new Date());
      return (
        <div>
          {/* {formatDistance(updatedDate, new Date(), { addSuffix: true })} */}
          {formatRelative(updatedDate, new Date())}
        </div>
      );
    },
  },
  {
    accessorKey: "Customer",
    header: "Customer",
    cell: ({ row }) => {
      const data: TOrdersSchema = row.original;
      const { firstName, lastName } = data.shippingAddress;
      return (
        <div>
          {firstName}&nbsp;{lastName}
        </div>
      );
    },
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => {
      const data: any = row.original;
      return <div>{IntlFormatter.format(data.total)}</div>;
    },
  },
  {
    accessorKey: "Items",
    header: "Items",
    cell: ({ row }) => {
      const data: TOrdersSchema = row.original;
      const { lineItems } = data;
      let items = 0;
      for (let i = 0; i < lineItems.length; i++) {
        items += lineItems[i].quantity;
      }
      return <div>{items}&nbsp;items</div>;
    },
  },
  {
    accessorKey: "Payment status",
    header: "Payment status",
    cell: ({ row }) => {
      const data: TOrdersSchema = row.original;
      const { paymentStatus } = data;
      return (
        <div
          className={clsx("px-4 py-1 rounded inline-block capitalize", {
            "bg-green-600 text-white": paymentStatus === "paid",
            "bg-gray-600 text-white": paymentStatus === "unpaid",
            "bg-yellow-300": paymentStatus === "pending",
          })}
        >
          {paymentStatus}
        </div>
      );
    },
  },
  {
    accessorKey: "Shipping method",
    header: "Shipping method",
    cell: ({ row }) => {
      const data: TOrdersSchema = row.original;
      const { shippingMethod } = data;
      return <div>{shippingMethod}</div>;
    },
  },
  {
    accessorKey: "Order status",
    header: "Order status",
    cell: ({ row }) => {
      const data: TOrdersSchema = row.original;
      const { status } = data;
      return (
        <div
          className={clsx("px-4 py-1 rounded inline-block capitalize", {
            "bg-green-600 text-white": status === "delivered",
            "bg-gray-600 text-white": status === "hold",
            "bg-yellow-300": status === "pending",
            "bg-orange-300": status === "processing",
            "bg-green-300": status === "packed",
            "bg-blue-300": status === "shipped",
          })}
        >
          {status}
        </div>
      );
    },
  },
  {
    accessorKey: "Invoice",
    header: "Invoice",
    cell: ({ row }) => {
      const data: TOrdersSchema = row.original;
      return (
        <div>
          <Link
            href={{
              pathname: "/invoice",
              query: {
                _id: data._id as string,
              },
            }}
          >
            <Button size={"icon"} variant={"icon"}>
              <FileText className="w-[16px] h-[16px] stroke-[1.5px] stroke-gray-600" />
            </Button>
          </Link>
        </div>
      );
    },
  },
  {
    id: "Actions",
    header: "Actions",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="flex items-center gap-[4px]">
          <Link
            href={{
              pathname: "/dashboard/orders/status",
              query: {
                _id: data._id as string,
                status: data.status,
              },
            }}
          >
            <Button size={"icon"} variant={"icon"}>
              <Edit className="w-[16px] h-[16px] stroke-[1.5px] stroke-gray-600" />
            </Button>
          </Link>
          <Link
            href={{
              pathname: "/dashboard/orders/delete",
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
