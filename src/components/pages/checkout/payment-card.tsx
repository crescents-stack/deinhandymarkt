"use client";

import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const PaymentCard = ({ item }: { item: any }) => {
  const { id, icon, text } = item;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;
  const currentMethodId = parseInt(searchParams.get("paymentMethodId")!);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const selectionHandler = () => {
    router.push(
      pathname + "?" + createQueryString("paymentMethodId", id.toString())
    );
  };
  return (
    <div
      className="flex gap-[20px] p-[10px] md:p-[20px] rounded-[8px] border border-dark_gray max-w-[290px]"
      role="button"
      onClick={selectionHandler}
    >
      <div
        className={clsx(
          "min-w-[20px] w-[20px] min-h-[20px] h-[20px] rounded-full flex items-center justify-center border border-secondary",
          {
            "border-secondary": currentMethodId === id,
            "border-gray-400": currentMethodId !== id,
          }
        )}
      >
        <div
          className={clsx("w-[12px] h-[12px] rounded-full", {
            "bg-secondary": currentMethodId === id,
            "bg-gray-400": currentMethodId !== id,
          })}
        ></div>
      </div>
      <div
        className={clsx(
          "flex flex-col gap-[12px] [&>svg]:w-[100px] [&>svg]:stroke-0",
          {
            "[&>svg>*]:fill-gray-400": currentMethodId !== id,
            "[&>svg>*]:fill-primary": currentMethodId === id,
          }
        )}
      >
        {icon}
        <div className="text-gray-500">{text}</div>
      </div>
    </div>
  );
};

export default PaymentCard;
