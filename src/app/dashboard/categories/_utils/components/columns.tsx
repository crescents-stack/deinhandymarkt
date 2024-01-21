"use client";

import { z } from "zod";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown, Edit, Trash } from "lucide-react";
import { DataTableColumnHeader } from "./sortable-hideable";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export const PaymentSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  icon: z.string(),
  blog: z.string(),
  parentId: z.string(),
  tags: z.array(z.string()),
  metadata: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

export type TPayment = z.infer<typeof PaymentSchema>;

export const columns: ColumnDef<TPayment>[] = [
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
  },
  {
    accessorKey: "blog",
    header: "Blog",
  },
  {
    accessorKey: "parentId",
    header: "Parent ID",
  },
  {
    accessorKey: "tags",
    header: "Tags",
    cell: ({ row }) => {
      const tags: string[] = row.getValue("tags");

      return (
        <ul className="text-right font-medium flex flex-wrap gap-[4px]">
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
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <div className="flex items-center gap-[4px]">
          <Button size={"icon"} variant={"icon"}>
            <Edit className="w-[16px] h-[16px] stroke-[1.5px] stroke-gray-600" />
          </Button>
          <Button size={"icon"} variant={"icon"} className="border-pink-200">
            <Trash className="w-[16px] h-[16px] stroke-[1.5px] stroke-pink-500" />
          </Button>
        </div>
      );
    },
  },
];
