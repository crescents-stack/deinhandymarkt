import Pagination from "@/components/molecules/pagination";
import clsx from "clsx";
import { Edit, Search, Trash } from "lucide-react";
type AllOrdersTableDataTD = { id: string; title: string } | number | string;
type AllOrdersTableDataTDData = {
  id: number;
  key: string;
  td: AllOrdersTableDataTD;
};
type AllOrdersTableData = {
  id: number;
  rowData: AllOrdersTableDataTDData[];
}[];

const AllOrders = () => {
  return (
    <div className="w-full overflow-auto">
      <div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-start sm:justify-between gap-[5px] pt-[24px] pb-[12px]">
          <h4 className="font-semibold">Recent orders</h4>
          <form>
            <div className="min-w-[300px] flex items-center justify-start gap-[8px] p-[8px] rounded-[10px] border border-dark_gray">
              <Search className="w-[16px] h-[16px] storke-[1.3px] stroke-dark_gray" />
              <input
                className="px-[16]"
                placeholder="Search with product name"
              />
            </div>
          </form>
        </div>
        <div className="border border-dark_gray rounded-[10px] py-[8px] overflow-auto">
          <table className="p-[16px] w-full min-w-[1020px]">
            <tr className="border-b border-dark_gray">
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
            {tableData.map((tableRow) => {
              const rowId = "#" + tableRow.id;
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
                      <td key={tdata.key} className="px-[16px] py-[4px]">
                        <div className="inline-flex">
                          <span className="text-gray-300">
                            {tdata.id === 1 ? rowId : null}
                          </span>
                          &nbsp;
                          {tdata.key === "price" ? "$" : null}
                          {tdata.key === "details" ||
                          tdata.key === "customer_details" ? (
                            <div className="inline-flex flex-col">
                              {tdata.td.title}
                              <span className="text-gray-300 hover:underline hover:text-gary-400">
                                (#{tdata.td.id})
                              </span>
                            </div>
                          ) : (
                            <div className="mb-auto relative">
                              {tdata.td}
                              {tdata.key === "was_placed" ? "hr" : null}
                              {tdata.key === "was_placed" ? (
                                <div
                                  className="absolute top-0 left-0 text-[10px] px-4 pb-[1px] pt-[2px] rounded-[4px] bg-white border text-secondary opacity-0 group-hover:opacity-100 transition ease-in-out duration-500"
                                  role="button"
                                >
                                  Track
                                </div>
                              ) : null}
                            </div>
                          )}
                        </div>
                      </td>
                    );
                  })}
                  <td className="px-[16px] py-[4px]">
                    <div className="inline-flex gap-[8px]">
                      <Trash
                        className="w-[16px] h-[16px] stroke-gray-400 hover:stroke-secondary transition ease-in-out duration-500"
                        role="button"
                      />
                      <Edit
                        className="w-[16px] h-[16px] stroke-gray-400 hover:stroke-dark transition ease-in-out duration-500"
                        role="button"
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </table>
          <div className="py-[12px] flex justify-end px-[24px]">
              <Pagination />
            </div>
        </div>
      </div>
    </div>
  );
};

export default AllOrders;

const tableHead = [
  {
    id: 1,
    th: "Order ID",
    key: "order_id",
  },
  {
    id: 2,
    th: "Details",
    key: "details",
  },
  {
    id: 3,
    th: "Status",
    key: "status",
  },
  {
    id: 4,
    th: "Price",
    key: "price",
  },
  {
    id: 5,
    th: "Customer details",
    key: "customer_details",
  },
  {
    id: 6,
    th: "Delivery address",
    key: "delivery_address",
  },
  {
    id: 7,
    th: "Was placed",
    key: "was_placed",
  },
  {
    id: 8,
    th: "Action",
    key: "action",
  },
];
const tableData: AllOrdersTableData = [
  {
    id: 1,
    rowData: [
      {
        id: 1,
        key: "order_id",
        td: "352xdfe433efws",
      },
      {
        id: 2,
        key: "details",
        td: {
          title: "Fine woven case with Magsafe",
          id: "635463",
        },
      },
      {
        id: 3,
        key: "status",
        td: "iPhone 15 Case",
      },
      {
        id: 4,
        key: "price",
        td: 347,
      },
      {
        id: 5,
        key: "customer_details",
        td: {
          title: "Musiur Alam Opu",
          id: "34563546",
        },
      },
      {
        id: 6,
        key: "delivery_address",
        td: "Bashundhara R/A,Berlin",
      },
      {
        id: 7,
        key: "was_placed",
        td: 22,
      },
    ],
  },
  {
    id: 2,
    rowData: [
      {
        id: 1,
        key: "order_id",
        td: "352xdfe433efws",
      },
      {
        id: 2,
        key: "details",
        td: {
          title: "Fine woven case with Magsafe",
          id: "635463",
        },
      },
      {
        id: 3,
        key: "status",
        td: "iPhone 15 Case",
      },
      {
        id: 4,
        key: "price",
        td: 347,
      },
      {
        id: 5,
        key: "customer_details",
        td: {
          title: "Musiur Alam Opu",
          id: "34563546",
        },
      },
      {
        id: 6,
        key: "delivery_address",
        td: "Bashundhara R/A,Berlin",
      },
      {
        id: 7,
        key: "was_placed",
        td: 22,
      },
    ],
  },
  {
    id: 3,
    rowData: [
      {
        id: 1,
        key: "order_id",
        td: "352xdfe433efws",
      },
      {
        id: 2,
        key: "details",
        td: {
          title: "Fine woven case with Magsafe",
          id: "635463",
        },
      },
      {
        id: 3,
        key: "status",
        td: "iPhone 15 Case",
      },
      {
        id: 4,
        key: "price",
        td: 347,
      },
      {
        id: 5,
        key: "customer_details",
        td: {
          title: "Musiur Alam Opu",
          id: "34563546",
        },
      },
      {
        id: 6,
        key: "delivery_address",
        td: "Bashundhara R/A,Berlin",
      },
      {
        id: 7,
        key: "was_placed",
        td: 22,
      },
    ],
  },
];
