import clsx from "clsx";
type ReactOrdersTableDataTD = number | string | { id: string; title: string };
type ReactOrdersTableDataTDData = {
  id: number;
  key: string;
  td: ReactOrdersTableDataTD;
}[];
type RecentOrdersTableData = {
  id: number;
  rowData: ReactOrdersTableDataTDData;
}[];

const RecentOrders = () => {
  return (
    <div className="w-full overflow-auto">
      <div className="min-w-[700px]">
        <div className="flex items-center justify-between gap-10 pt-[24px] pb-[12px]">
          <h4 className="font-semibold">Popular products (Most sold)</h4>
        </div>
        <div className="border rounded-[10px] py-[8px]">
          <table className="p-[16px] w-full">
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
                        <div className="">
                          {tdata.key === "price" ? "$" : null}
                          {tdata.key === "details" ? (
                            <div>
                              {/* {tdata.td.title}
                              {tdata.td.id} */}
                            </div>
                          ) : (
                            <div>tdata.td</div>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </table>
        </div>
      </div>
    </div>
  );
};

export default RecentOrders;

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
    th: "Delivery ddress",
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
const tableData: RecentOrdersTableData = [
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
        td: 347,
      },
      {
        id: 6,
        key: "delivery_address",
        td: 347,
      },
      {
        id: 7,
        key: "was_placed",
        td: 347,
      },
    ],
  },
];
