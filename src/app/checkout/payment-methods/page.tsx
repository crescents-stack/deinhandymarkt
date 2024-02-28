"use client";

import PriceCount from "../_utils/components/price-count";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PaymentCardData } from "../_utils/data";
import { useContextStore } from "@/lib/hooks/hooks";
import clsx from "clsx";
import { useEffect, useState } from "react";

const paymentMethodDatalayer = (data: any) => {
  if (typeof window !== "undefined") {
    window[`dataLayer`] = window?.dataLayer || [];

    const datalayer: any = {
      event: "paymentMethod",
      method: data,
    };
    const cookies = window.localStorage.getItem("cookieBanner");
    if (cookies) {
      datalayer.cookies = JSON.parse(cookies);
    }

    window.dataLayer.push(datalayer);
  }
};

const PaymentMethods = () => {
  const { getContext, setContext } = useContextStore();
  const [paymentMethod, setPaymentMethod] = useState(
    getContext("paymentMethod") ?? "paypal"
  );
  useEffect(() => {
    paymentMethodDatalayer(paymentMethod);
  }, [paymentMethod]);
  return (
    <div>
      <div className="flex flex-wrap gap-[20px] pb-10">
        {PaymentCardData.map((item) => {
          const { id, icon, text, method } = item;
          return (
            <div
              key={id}
              className="flex gap-[20px] p-[10px] md:p-[20px] rounded-[8px] border border-dark_gray max-w-[290px]"
              role="button"
              onClick={() => {
                setPaymentMethod(method);
                setContext("paymentMethod", method);
              }}
            >
              <div
                className={clsx(
                  "min-w-[20px] w-[20px] min-h-[20px] h-[20px] rounded-full flex items-center justify-center border border-secondary",
                  {
                    "border-secondary": method !== paymentMethod,
                    "border-gray-400": method === paymentMethod,
                  }
                )}
              >
                <div
                  className={clsx("w-[12px] h-[12px] rounded-full", {
                    "bg-secondary": method === paymentMethod,
                    "bg-gray-400": method !== paymentMethod,
                  })}
                ></div>
              </div>
              <div
                className={clsx(
                  "flex flex-col gap-[12px] [&>svg]:w-[100px] [&>svg]:stroke-0",
                  {
                    "[&>svg>*]:fill-gray-400": method !== paymentMethod,
                    "[&>svg>*]:fill-primary": method === paymentMethod,
                  }
                )}
              >
                {icon}
                <div className="text-gray-500">{text}</div>
              </div>
            </div>
          );
        })}
      </div>
      <PriceCount />
      <div className="pt-[20px] flex justify-end gap-[16px]">
        <Link href="/checkout/billing-address">
          <Button variant="outline">Previous</Button>
        </Link>
        <Link href="/checkout/confirmation">
          <Button>Next</Button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentMethods;
