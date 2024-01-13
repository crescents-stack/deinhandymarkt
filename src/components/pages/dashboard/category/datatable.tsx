/* eslint-disable @next/next/no-img-element */
"use client";
import Pagination from "@/components/molecules/pagination";
import AllCategoriesSkeleton from "@/components/skeletons/categories";
import { GET } from "@/lib/api/fetcher";
import clsx from "clsx";
import { Edit, Plus, Search, Trash } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import DeleteItem from "@/components/molecules/delete-item";
import UnderDevelopToolTip from "@/components/molecules/under-develop-tooltip";

type AllCategoriesTableDataTD =
  | { id: string; title: string }
  | number
  | string
  | { description: string; title: string };
type AllCategoriesTableDataTDData = {
  id: number;
  key: string;
  td: AllCategoriesTableDataTD | undefined | null;
};
type AllCategoriesTableData = {
  id: number;
  rowData: AllCategoriesTableDataTDData[];
}[];

const AllCategories = ({ searchParams }: { searchParams: any }) => {
  let currentPage = searchParams.paginatedAt || 1;
  const [tableData, setTableData] = useState<AllCategoriesTableData>([]);
  const [isLoading, setIsLoading] = useState(true);

  const FetchCategories = async () => {
    const response: any = await GET("/category", { next: { revalidate: 2 } });
    const resCategories = await response.data.categories;
    const tempTableData = [];
    for (let i = 0; i < resCategories.length; i++) {
      const {
        _id,
        name,
        slug,
        parent_id,
        icon,
        blog,
        status,
        createdAt,
        updatedAt,
        metadata,
        tags,
      } = resCategories[i];
      tempTableData.push({
        id: i + 1,
        rowData: [
          {
            id: 1,
            td: _id,
            key: "category_id",
          },
          {
            id: 2,
            td: name,
            key: "name",
          },
          {
            id: 3,
            td: slug,
            key: "slug",
          },
          {
            id: 4,
            td: icon,
            key: "icon",
          },
          {
            id: 5,
            td: parent_id,
            key: "parent_id",
          },
          {
            id: 6,
            td: blog,
            key: "blog",
          },
          {
            id: 7,
            td: status,
            key: "status",
          },
          {
            id: 8,
            td: tags,
            key: "tags",
          },
          {
            id: 9,
            td: metadata,
            key: "metadata",
          },
          {
            id: 10,
            td: updatedAt,
            key: "updatedAt",
          },
          {
            id: 11,
            td: createdAt,
            key: "createdAt",
          },
        ],
      });
    }
    setTableData(tempTableData);
    setIsLoading(false);
  };
  useEffect(() => {
    FetchCategories();
  }, []);
  const perPageItems = Math.ceil(tableData.length / 10);

  return (
    <div className="w-full overflow-auto">
      <div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-start sm:justify-between gap-[5px] pt-[24px] pb-[12px]">
          <h4 className="font-semibold text-[16px] md:text-[20px]">Manage categories</h4>
          <div className="flex flex-wrap items-center gap-[8px]">
            <UnderDevelopToolTip>
              <form>
                <div className="min-w-[250px] flex items-center justify-start gap-[8px] p-[8px] rounded-[10px] border border-dark_gray">
                  <Search className="w-[16px] h-[16px] storke-[1.3px] stroke-dark_gray" />
                  <input
                    className="px-[16]"
                    placeholder="Search with product name"
                  />
                </div>
              </form>
            </UnderDevelopToolTip>
            <Link
              className="px-[6px] py-[5.5px] rounded-[10px] hover:bg-muted flex items-center justify-center border border-dark_gray"
              href="/dashboard/categories/add"
            >
              <Plus className="stroke-[1px] stroke-gray-500" />
            </Link>
          </div>
        </div>
        <div className="border border-dark_gray rounded-[10px] py-[8px] overflow-auto">
          <table className="p-[16px] w-full min-w-[1020px]">
            <thead>
              <tr className="border-b border-dark_gray">
                {tableHead.map((item) => {
                  const { id, th } = item;
                  return (
                    <th
                      key={id}
                      className={clsx(
                        "font-semibold px-[16px] pb-[6px] text-left whitespace-nowrap",
                        { "rounded-[10px]": id === 1, "rounded-0": id !== 1 },
                        {
                          "rounded-[10px]": id === tableHead.length,
                          "rounded-0": id !== tableHead.length,
                        }
                      )}
                    >
                      {th}
                    </th>
                  );
                })}
              </tr>
            </thead>
            {isLoading ? (
              <AllCategoriesSkeleton />
            ) : (
              <tbody>
                {tableData.length ? (
                  tableData
                    .slice((currentPage - 1) * 10, (currentPage - 1) * 10 + 10)
                    .map((tableRow) => {
                      return (
                        <tr
                          key={tableRow.id}
                          className={clsx(
                            "group hover:bg-gray-50 transition ease-in-out duration-300",
                            {
                              "border-b-0": tableData.length === tableRow.id,
                              "border-b": tableData.length !== tableRow.id,
                            }
                          )}
                        >
                          {tableRow.rowData.map((tdata: any) => {
                            return (
                              <td
                                key={tdata.key}
                                className="px-[16px] py-[8px] align-top max-w-[200px]"
                              >
                                <div className="inline-flex flex-wrap gap-[4px]">
                                  {tdata.key === "metadata" ? (
                                    <div>
                                      <p className="font-medium">
                                        {tdata.td.title}
                                      </p>
                                      <p className="text-gray-500">
                                        {tdata.td.description.length > 100
                                          ? tdata.td.description.slice(0, 100) +
                                            "..."
                                          : tdata.td.description}
                                      </p>
                                    </div>
                                  ) : tdata.key === "icon" ? (
                                    <img
                                      src={tdata.td}
                                      alt=""
                                      className="w-[16px] h-[16px]"
                                    />
                                  ) : tdata.key === "parent_id" ? (
                                    "-"
                                  ) : tdata.key === "createdAt" ||
                                    tdata.key === "updatedAt" ? (
                                    new Date(tdata.td).toLocaleDateString()
                                  ) : tdata.key === "tags" ? (
                                    <div className="inline-flex items-center gap-[2px] flex-wrap min-w-[100px]">
                                      {tdata.td.length
                                        ? tdata.td.map((item: any) => {
                                            return (
                                              <span
                                                key={item}
                                                className="px-[4px] pt-[2px] pb-[1px] rounded text-[8px] md:text-[10px] bg-muted"
                                              >
                                                {item}
                                              </span>
                                            );
                                          })
                                        : "-"}
                                    </div>
                                  ) : tdata.key === "category_id" ? (
                                    <div className="inline-flex items-center gap-[4px]">
                                      <span className="text-gray-300">
                                        #{tableRow.id}
                                      </span>
                                      <span> {tdata.td}</span>
                                    </div>
                                  ) : tdata.td.length > 100 ? (
                                    tdata.td.slice(0, 100) + "..."
                                  ) : (
                                    tdata.td
                                  )}
                                </div>
                              </td>
                            );
                          })}
                          <td className="px-[16px] py-[4px] align-top">
                            <div className="inline-flex gap-[8px]">
                              <DeleteItem
                                url={`/category/${tableRow.rowData[0].td?.toString()}`}
                                list={tableData}
                                setList={setTableData}
                              />

                              <UnderDevelopToolTip>
                                <Link
                                  href={{
                                    pathname: "/dashboard/categories/update",
                                    query: {
                                      id: tableRow.rowData[0].td?.toString(),
                                    },
                                  }}
                                >
                                  <Edit className="w-[16px] h-[16px] stroke-gray-400 hover:stroke-dark transition ease-in-out duration-500" />
                                </Link>
                              </UnderDevelopToolTip>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                ) : (
                  <div className="p-10 text-center"> No category found!</div>
                )}
              </tbody>
            )}
          </table>
          <div className="py-[12px] flex justify-end px-[24px]">
            <Pagination currentPage={currentPage} maxItems={perPageItems} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCategories;

const tableHead = [
  {
    id: 1,
    th: "Category ID",
    key: "category_id",
  },
  {
    id: 2,
    th: "Name",
    key: "name",
  },
  {
    id: 3,
    th: "Slug",
    key: "slug",
  },
  {
    id: 4,
    th: "Icon",
    key: "icon",
  },
  {
    id: 5,
    th: "ParentID",
    key: "parent_id",
  },
  {
    id: 6,
    th: "blog",
    key: "blog",
  },
  {
    id: 7,
    th: "Status",
    key: "status",
  },
  {
    id: 8,
    th: "Tags",
    key: "tags",
  },
  {
    id: 9,
    th: "Metadata",
    key: "metadata",
  },
  {
    id: 10,
    th: "Created",
    key: "createdAt",
  },
  {
    id: 11,
    th: "Last update",
    key: "updatedAt",
  },
  {
    id: 12,
    th: "Action",
    key: "action",
  },
];
