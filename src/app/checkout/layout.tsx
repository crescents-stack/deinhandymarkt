/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import ArrowTab from "@/components/atoms/arrow-tab";
import { useCartContext } from "@/lib/contexts/cart-context-provider";
import { TSteps, steps } from "@/lib/data";
import { ReactChildren } from "@/lib/types";
// import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const Layout = ({ children }: ReactChildren) => {
  const pathname = usePathname();
  const router = useRouter();
  const { cart } = useCartContext();
  const currentID = steps.filter((item: TSteps) => pathname === item.path)[0]
    .id;

  useEffect(() => {
    !cart.length && router.push("/search");
  }, [cart]);
  return (
    <section className="container">
      {cart.length ? (
        <div className="bg-white p-[10px] md:p-[20px] rounded-[8px]">
          <ul className="flex flex-wrap gap-y-[5px] pb-[32px]">
            {steps.map((step: any) => {
              const { id } = step;
              const status =
                id === currentID ? "current" : id < currentID ? "done" : "todo";
              return (
                <li key={step.id} className="ml-[-10px]">
                  <ArrowTab step={{ ...step, status }} />
                </li>
              );
            })}
          </ul>
          {children}
        </div>
      ) : (
        "Please add products to card before landing here!"
      )}
    </section>
  );
};

export default Layout;
