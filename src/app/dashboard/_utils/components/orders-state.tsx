import clsx from "clsx";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const OrdersState = () => {
  return (
    <div>
      <div className="flex items-center justify-between gap-10 pt-[24px] pb-[12px]">
        <h4 className="font-semibold">Orders</h4>
      </div>
      <div className="flex flex-wrap items-center justify-start p-[16px] border border-dark_gray rounded-[10px] gap-y-[16px]">
        {orders.map((item) => {
          const { id, text, total } = item;
          return (
            <div
              key={id}
              className={clsx(
                "text-gray-500 pr-[16px] border-dark_gray",
                { "pl-[16px]": id !== 1, "pl-0": id === 0 },
                {
                  "border-r": id !== orders.length,
                  "border-r-0": id === orders.length,
                }
              )}
            >
              {text}&nbsp;
              <span className="font-semibold text-primary">{total}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrdersState;

const orders = [
  {
    id: 1,
    text: "Total",
    total: 256,
  },
  {
    id: 2,
    text: "Completed",
    total: 137,
  },
  {
    id: 3,
    text: "In progress",
    total: 111,
  },
  {
    id: 4,
    text: "Cancellation",
    total: 8,
  },
];
