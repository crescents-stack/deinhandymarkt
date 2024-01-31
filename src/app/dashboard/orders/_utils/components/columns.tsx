/* eslint-disable @next/next/no-img-element */
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { DataTableColumnHeader } from "../../../../../components/ui/sortable-hideable";
import Link from "next/link";
import { TOrdersSchema } from "../types/types";
import { formatDistance, formatRelative, subDays } from "date-fns";
import { IntlFormatter } from "@/lib/utils";

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
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer" />
    ),
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
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total" />
    ),
    cell: ({ row }) => {
      const data: TOrdersSchema = row.original;
      const { lineItems, shippingCost, tax } = data;
      let totalPrice = 0;
      for (let i = 0; i < lineItems.length; i++) {
        totalPrice += lineItems[i].price * lineItems[i].quantity;
      }
      totalPrice += shippingCost;
      totalPrice += tax;
      return <div>{IntlFormatter.format(totalPrice)}</div>;
    },
  },
  {
    accessorKey: "Items",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Items" />
    ),
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
    accessorKey: "Shipping method",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Shipping method" />
    ),
    cell: ({ row }) => {
      const data: TOrdersSchema = row.original;
      const { shippingMethod } = data;
      return <div>{shippingMethod}</div>;
    },
  },
  {
    accessorKey: "Payment status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Payment status" />
    ),
    cell: ({ row }) => {
      const data: TOrdersSchema = row.original;
      const { paymentStatus } = data;
      return <div>{paymentStatus}</div>;
    },
  },
  {
    accessorKey: "Order status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order status" />
    ),
    cell: ({ row }) => {
      const data: TOrdersSchema = row.original;
      const { status } = data;
      return <div>{status}</div>;
    },
  },
  // {
  //   id: "Actions",
  //   header: "Actions",
  //   cell: ({ row }) => {
  //     const data = row.original;
  //     return (
  //       <div className="flex items-center gap-[4px]">
  //         <Link
  //           href={{
  //             pathname: "/dashboard/categories/update",
  //             query: {
  //               slug: "",
  //             },
  //           }}
  //         >
  //           <Button size={"icon"} variant={"icon"}>
  //             <Edit className="w-[16px] h-[16px] stroke-[1.5px] stroke-gray-600" />
  //           </Button>
  //         </Link>
  //         <Link
  //           href={{
  //             pathname: "/dashboard/categories/delete",
  //             query: {
  //               _id: data._id as string,
  //             },
  //           }}
  //         >
  //           <Button size={"icon"} variant={"icon"} className="border-pink-200">
  //             <Trash className="w-[16px] h-[16px] stroke-[1.5px] stroke-pink-500" />
  //           </Button>
  //         </Link>
  //       </div>
  //     );
  //   },
  // },
];
