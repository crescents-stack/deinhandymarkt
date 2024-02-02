/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Edit, ShieldBan, Trash } from "lucide-react";
// import { DataTableColumnHeader } from "../../../../../components/ui/sortable-hideable";
import Link from "next/link";
import { formatDistance, subDays } from "date-fns";
import { TProductSchema } from "../types/types";
import { DataTableColumnHeader } from "@/components/ui/sortable-hideable";

export const productColumns: ColumnDef<TProductSchema>[] = [
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
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      const { thumbnail, name } = row.original;
      return (
        <div className="flex items-center gap-4 min-w-[250px]">
          <img
            src={thumbnail}
            alt="thumbnail"
            className="w-16 h-auto rounded-[10px] border"
          />
          <p>{name}</p>
        </div>
      );
    },
  },
  // {
  //   accessorKey: "thumbnail",
  //   header: "Thumbnail",
  //   cell: ({ row }) => {
  //     const { thumbnail } = row.original;
  //     return (
  //       <img src={thumbnail} alt="thumbnail" className="w-[30px] h-auto rounded-[10px] border" />
  //     );
  //   },
  // },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  // {
  //   accessorKey: "Attributes",
  //   header: "Attributes",
  //   cell: ({ row }) => {
  //     const data: TProductSchema = row.original;
  //     const { attributes, tags } = data;
  //     return (
  //       <div className="min-w-[300px]">
  //         <div className="flex items-center gap-[4px]">
  //           {attributes.map((attribute, index) => (
  //             <div key={index}>
  //               <p>
  //                 <span className="text-gray-400 pr-2">Label</span>
  //                 {attribute.label}
  //               </p>
  //               <ul className="flex items-center gap-[4px]">
  //                 <span className="text-gray-400 pr-2">Values</span>
  //                 {attribute.values.length
  //                   ? attribute.values.map((item) => {
  //                       return <li key={item} className="px-[4px] py-[2px] bg-muted rounded">{item}</li>;
  //                     })
  //                   : null}
  //               </ul>
  //             </div>
  //           ))}
  //         </div>
  //         <div className="flex items-center gap-[4px]">
  //           <span className="text-gray-400 pr-2">Tags</span>
  //           {tags.map((tag, index) => (
  //             <div key={index}>
  //               <p>{tag}</p>
  //             </div>
  //           ))}
  //         </div>
  //       </div>
  //     );
  //   },
  // },
  // {
  //   accessorKey: "Metadata Title",
  //   header: "Metadata Title",
  //   cell: ({ row }) => {
  //     const data: TProductSchema = row.original;
  //     return (
  //       <div>
  //         <p>{data?.metadata?.title}</p>
  //       </div>
  //     );
  //   },
  // },
  {
    accessorKey: "Last Updated",
    header: "Last updated",
    cell: ({ row }) => {
      const data: TProductSchema = row.original;
      // const createdDate = new Date(data.createdAt || new Date());
      const updatedDate = new Date(data.updatedAt || new Date());
      return (
        <p className="min-w-[100px]">
            {formatDistance(updatedDate, new Date(), { addSuffix: true })}
          </p>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="flex items-center gap-[4px]">
          {/* <Link
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
          </Link> */}
          <Link
            href={{
              pathname: "/dashboard/products/update",
              query: {
                slug: data.slug as string,
              },
            }}
          >
            <Button size={"icon"} variant={"icon"}>
              <Edit className="w-[16px] h-[16px] stroke-[1.5px] stroke-gray-600" />
            </Button>
          </Link>
          <Link
            href={{
              pathname: "/dashboard/products/delete",
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
