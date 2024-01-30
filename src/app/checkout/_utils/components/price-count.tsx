/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useCartContext } from "@/lib/contexts/cart-context-provider";
import { IntlFormatter } from "@/lib/utils";
import { CheckCheck } from "lucide-react";
import { useEffect, useState } from "react";

const PriceCount = () => {
  const { cart } = useCartContext();
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const CountPrice = () => {
    let temp = 0;
    cart.map((item) => {
      temp += item.basePrice * item.quantity;
    });
    return temp;
  };
  useEffect(() => {
    const temp = CountPrice();
    setSubtotal(temp);
    setTotal(temp + 4.66 + 3.44);
  }, [cart]);
  return (
    <div className="border-t border-dashed">
      <div className="flex flex-col-reverse md:flex-row justify-between gap-[16px] py-[20px]">
        <div className="flex flex-col gap-[12px]">
          <h5 className="text-[14px] md:text-[16px] font-semibold">
            Shop Safely without Risk!
          </h5>
          <ul className="flex flex-col gap-[8px]">
            {[
              { id: 1, text: "Secure payment with SSL encryption" },
              { id: 2, text: "3 year guarantee" },
              { id: 3, text: "Data protection" },
              { id: 4, text: "14 day return policy" },
              { id: 5, text: "Over 1,500,000 customers" },
            ].map((item) => {
              return (
                <li key={item.id} className="flex items-center gap-[8px]">
                  <CheckCheck className="w-[16px] h-[16px] stroke-[1.3px] stroke-gray-500" />
                  <p>{item.text}</p>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex flex-col items-start justify-start md:items-end md:justify-end gap-[8px]">
          <p>
            Sub total <span>${subtotal}</span>
          </p>
          <div className="flex flex-col items-start justify-start md:items-end md:justify-end gap-[4px]">
            <p>
              Shipping charge <span>$4.66</span>
            </p>
            <p>
              Includes VAT <span>$3.44</span>
            </p>
          </div>
          <p className="text-[16px] md:text-[20px] font-semibold">
            Total&nbsp;
            <span className="text-[16px] md:text-[24px] font-bold">
              {IntlFormatter.format(total)}
            </span>
          </p>
          <div className="flex flex-col items-start justify-start md:items-end md:justify-end gap-[4px]">
            <p className="text-secondary">Available Immediately</p>
            <p>Delivery time: 1-2 Working days</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceCount;
