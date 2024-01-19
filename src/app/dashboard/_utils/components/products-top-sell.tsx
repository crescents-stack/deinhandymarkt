import clsx from "clsx";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const ProductsTopSell = () => {
  return (
    <div className="w-full overflow-auto">
      <div className="min-w-[700px]">
        <div className="flex items-center justify-between gap-10 pt-[24px] pb-[12px]">
          <h4 className="font-semibold">Popular products (Most sold)</h4>
          <Link
            href="/dashboard/products"
            className="group flex items-center justify-end gap-[8px]"
          >
            <span className="text-gray-500 group-hover:text-primary">
              View all
            </span>
            <ChevronRight className="w-[16px] h-[16px] stroke-[1.3px] stroke-gray-500 group-hover:stroke-primary translate-x-0 group-hover:translate-x-[5px] transition ease-in-out duration-500" />
          </Link>
        </div>
        <div className="border rounded-[10px] py-[8px]">
          <table className="p-[16px] w-full">
            <thead>
              <tr>
                {tableHead.map((item) => {
                  const { id, th } = item;
                  return (
                    <th
                      key={id}
                      className={clsx(
                        "font-semibold px-[16px] py-[4px] text-left",
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
            <tbody>
              {tableData.map((tableRow) => {
                const rowId = "#" + tableRow.id;
                return (
                  <tr key={tableRow.id}>
                    {tableRow.rowData.map((tdata) => {
                      return (
                        <td key={tdata.key} className="px-[16px] py-[4px]">
                          <span className="text-gray-300">
                            {tdata.id === 1 ? rowId : null}
                          </span>
                          &nbsp;
                          <span className="">{tdata.td}</span>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductsTopSell;

const tableHead = [
  {
    id: 1,
    th: "Product ID",
    key: "product_id",
  },
  {
    id: 2,
    th: "Product",
    key: "product",
  },
  {
    id: 3,
    th: "Category",
    key: "category",
  },
  {
    id: 4,
    th: "Total sold item(s)",
    key: "total_sold_items",
  },
];
const tableData = [
  {
    id: 1,
    rowData: [
      {
        id: 1,
        key: "product_id",
        td: "352xdfe433efws",
      },
      {
        id: 2,
        key: "product",
        td: "Fine woven case with Magsafe",
      },
      {
        id: 3,
        key: "category",
        td: "iPhone 15 Case",
      },
      {
        id: 4,
        key: "total_sold_items",
        td: 347,
      },
    ],
  },
  {
    id: 2,
    rowData: [
      {
        id: 1,
        key: "product_id",
        td: "352xdfe433efws",
      },
      {
        id: 2,
        key: "product",
        td: "Fine woven case with Magsafe",
      },
      {
        id: 3,
        key: "category",
        td: "iPhone 15 Case",
      },
      {
        id: 4,
        key: "total_sold_items",
        td: 347,
      },
    ],
  },
  {
    id: 3,
    rowData: [
      {
        id: 1,
        key: "product_id",
        td: "352xdfe433efws",
      },
      {
        id: 2,
        key: "product",
        td: "Fine woven case with Magsafe",
      },
      {
        id: 3,
        key: "category",
        td: "iPhone 15 Case",
      },
      {
        id: 4,
        key: "total_sold_items",
        td: 347,
      },
    ],
  },
  {
    id: 4,
    rowData: [
      {
        id: 1,
        key: "product_id",
        td: "352xdfe433efws",
      },
      {
        id: 2,
        key: "product",
        td: "Fine woven case with Magsafe",
      },
      {
        id: 3,
        key: "category",
        td: "iPhone 15 Case",
      },
      {
        id: 4,
        key: "total_sold_items",
        td: 347,
      },
    ],
  },
  {
    id: 5,
    rowData: [
      {
        id: 1,
        key: "product_id",
        td: "352xdfe433efws",
      },
      {
        id: 2,
        key: "product",
        td: "Fine woven case with Magsafe",
      },
      {
        id: 3,
        key: "category",
        td: "iPhone 15 Case",
      },
      {
        id: 4,
        key: "total_sold_items",
        td: 347,
      },
    ],
  },
  {
    id: 6,
    rowData: [
      {
        id: 1,
        key: "product_id",
        td: "352xdfe433efws",
      },
      {
        id: 2,
        key: "product",
        td: "Fine woven case with Magsafe",
      },
      {
        id: 3,
        key: "category",
        td: "iPhone 15 Case",
      },
      {
        id: 4,
        key: "total_sold_items",
        td: 347,
      },
    ],
  },
  {
    id: 7,
    rowData: [
      {
        id: 1,
        key: "product_id",
        td: "352xdfe433efws",
      },
      {
        id: 2,
        key: "product",
        td: "Fine woven case with Magsafe",
      },
      {
        id: 3,
        key: "category",
        td: "iPhone 15 Case",
      },
      {
        id: 4,
        key: "total_sold_items",
        td: 347,
      },
    ],
  },
];
