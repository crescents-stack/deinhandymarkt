/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useCartContext } from "@/lib/contexts/cart-context-provider";
import { IntlFormatter } from "@/lib/utils";
import { CheckCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { GetLocationBaseVatWithIPAPI } from "../../confirmation/_utils/actions/actions";
import { TCombination } from "@/app/dashboard/products/_utils/types/types";
import { Skeleton } from "@/components/skeletons/table";
import PriceCountSkeleton from "../skeletons/price-count";

const PriceCount = () => {
  const { cart } = useCartContext();
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [vat, setVat] = useState(0);
  const CountPrice = () => {
    let temp = 0;
    cart.forEach((item) => {
      item.attributeCombinations
        ? item.attributeCombinations?.combinations?.forEach(
            (combination: TCombination) => {
              temp += combination.subtotal;
            }
          )
        : (temp += item.price * item.quantity);
    });
    return temp;
  };

  const CalculatePrice = async () => {
    const temp: number = CountPrice();
    const vatAmount: number = await GetLocationBaseVatWithIPAPI(temp);
    setSubtotal(temp);
    setVat(vatAmount ?? 0);
    setTotal(temp + vatAmount ?? 0);
    console.timeLog(vatAmount.toString());
  };
  useEffect(() => {
    CalculatePrice();
  }, [cart]);
  return vat > 0 ? (
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
            Sub total&nbsp;
            <span className="font-semibold">
              {IntlFormatter.format(subtotal)}
            </span>
          </p>
          <div className="flex flex-col items-start justify-start md:items-end md:justify-end gap-[4px]">
            <p>
              Includes VAT <span>{IntlFormatter.format(vat)}</span>
            </p>
            <p>Free shipping</p>
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
  ) : (
    <PriceCountSkeleton />
  );
};

export default PriceCount;
