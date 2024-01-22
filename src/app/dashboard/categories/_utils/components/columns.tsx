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
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      const { _id } = row.original;
      return _id;
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "slug",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Slug" />
    ),
  },
  {
    accessorKey: "icon",
    header: "Icon",
    cell: ({ row }) => {
      const { icon } = row.original;
      return <img src={icon} alt="icon" className="w-[30px] h-auto" />;
    },
  },
  {
    accessorKey: "blog",
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
    accessorKey: "tags",
    header: "Tags",
    cell: ({ row }) => {
      const tags: string[] = row.getValue("tags");

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
    accessorKey: "metadata.title",
    header: "Title",
  },
  {
    accessorKey: "metadata.description",
    header: "Description",
    cell: ({ row }) => {
      const data = row.original;
      return <p className="w-[350px]">{data.metadata.description}</p>;
    },
  },
  {
    id: "actions",
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
