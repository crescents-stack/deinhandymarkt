/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Edit, ShieldBan, Trash } from "lucide-react";
import { DataTableColumnHeader } from "../../../../../components/ui/sortable-hideable";
import Link from "next/link";
import { formatDistance, subDays } from "date-fns";
import { TProductSchema } from "../types/types";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

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
    accessorKey: "Details",
    header: "Details",
    cell: ({ row }) => {
      const data: TProductSchema = row.original;
      const { _id, name, slug, category, productType } = data;
      return (
        <ul className="min-w-[200px]">
          <li>
            <span className="text-gray-400 pr-2">ID</span> {_id as string}
          </li>
          <li>
            <span className="text-gray-400 pr-2">Name</span> {name}
          </li>
          <li>
            <span className="text-gray-400 pr-2">Slug</span> {slug}
          </li>
          <li>
            <span className="text-gray-400 pr-2">Category</span> {category}
          </li>
          <li>
            <span className="text-gray-400 pr-2">Type</span> {productType}
          </li>
        </ul>
      );
    },
  },
  {
    accessorKey: "images",
    header: "Images",
    cell: ({ row }) => {
      const data: TProductSchema = row.original;
      const { images, thumbnail } = data;
      return (
        <ul className="min-w-[200px] space-y-4">
          <li>
            <span className="text-gray-400 pr-2">Thumbnail</span>
            <img src={thumbnail} className="w-[30px] h-auto object-contain" />
          </li>
          <li>
            <span className="text-gray-400 pr-2">Images</span>
            <div className="flex items-center gap-[4px]">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  className="w-[30px] h-auto object-contain"
                />
              ))}
            </div>
          </li>
        </ul>
      );
    },
  },
  {
    accessorKey: "Price & Stock",
    header: "Price & Stock",
    cell: ({ row }) => {
      const data: TProductSchema = row.original;
      const { price, discount, stock } = data;
      const { type, value } = discount;
      return (
        <ul className="min-w-[200px]">
          <li>
            <span className="text-gray-400 pr-2">Price</span> {price}
          </li>
          <li>
            <span className="text-gray-400 pr-2">Discount type</span> {type}
          </li>
          <li>
            <span className="text-gray-400 pr-2">Discount amount</span> {value}
          </li>
          <li>
            <span className="text-gray-400 pr-2">In Stock</span> {stock}
          </li>
        </ul>
      );
    },
  },
  {
    accessorKey: "Attributes",
    header: "Attributes",
    cell: ({ row }) => {
      const data: TProductSchema = row.original;
      const { attributes, tags } = data;
      return (
        <div className="min-w-[300px]">
          <div className="flex items-center gap-[4px]">
            {attributes.map((attribute, index) => (
              <div key={index}>
                <p>
                  <span className="text-gray-400 pr-2">Label</span>
                  {attribute.label}
                </p>
                <ul className="flex items-center gap-[4px]">
                  <span className="text-gray-400 pr-2">Values</span>
                  {attribute.values.length
                    ? attribute.values.map((item) => {
                        return <li key={item} className="px-[4px] py-[2px] bg-muted rounded">{item}</li>;
                      })
                    : null}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-[4px]">
            <span className="text-gray-400 pr-2">Tags</span>
            {tags.map((tag, index) => (
              <div key={index}>
                <p>{tag}</p>
              </div>
            ))}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "Metadata",
    header: "Metadata",
    cell: ({ row }) => {
      const data: TProductSchema = row.original;
      return (
        <div>
          <p>
            {data.metadata.title}
          </p>
          <p className="text-gray-400">
            {data.metadata.description}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "Created At",
    header: "Updated & Created",
    cell: ({ row }) => {
      const data: TProductSchema = row.original;
      const createdDate = new Date(data.createdAt || new Date());
      const updatedDate = new Date(data.updatedAt || new Date());
      return (
        <div>
          <p>
            {formatDistance(updatedDate, new Date(), { addSuffix: true })}
          </p>
          <p className="text-gray-400">
            {formatDistance(createdDate, new Date(), { addSuffix: true })}
          </p>
        </div>
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
              pathname: "/dashboard/customers/update",
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
