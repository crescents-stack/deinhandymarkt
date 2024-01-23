/* eslint-disable @next/next/no-img-element */
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { DataTableColumnHeader } from "../../../../../components/ui/sortable-hideable";
import { TCategorySchema } from "../types/types";
import Link from "next/link";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<TCategorySchema>[] = [
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
    accessorKey: "Name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "Slug",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Slug" />
    ),
  },
  {
    accessorKey: "Icon",
    header: "Icon",
    cell: ({ row }) => {
      const { icon } = row.original;
      return <img src={icon} alt="icon" className="w-[30px] h-auto" />;
    },
  },
  {
    accessorKey: "Blog",
    header: "Blog",
    cell: ({ row }) => {
      const data = row.original;
      return <p className="w-[350px]">{data.blog}</p>;
    },
  },
  // {
  //   accessorKey: "parentId",
  //   header: "Parent ID",
  // },
  {
    accessorKey: "Tags",
    header: "Tags",
    cell: ({ row }) => {
      const data: TCategorySchema = row.original;
      const {tags} = data;
      return (
        <ul className="text-right font-medium flex flex-wrap gap-[4px] min-w-[200px]">
          {tags.length
            ? tags.map((tag: string) => {
                return (
                  <li
                    key={tag}
                    className="bg-muted rounded-full text-dark px-[12px] pb-[1px] text-[10px]"
                  >
                    {tag}
                  </li>
                );
              })
            : null}
        </ul>
      );
    },
  },
  {
    accessorKey: "Metadata",
    header: "Metadata",
    cell: ({ row }) => {
      const data = row.original;
      return <div className="w-[350px]">
         <p>{data.metadata.title}</p>
        <p className="text-gray-400">{data.metadata.description}</p>
      </div>;
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
              pathname: "/dashboard/categories/update",
              query: {
                _id: data._id as string,
              },
            }}
          >
            <Button size={"icon"} variant={"icon"}>
              <Edit className="w-[16px] h-[16px] stroke-[1.5px] stroke-gray-600" />
            </Button>
          </Link>
          <Link
            href={{
              pathname: "/dashboard/categories/delete",
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
