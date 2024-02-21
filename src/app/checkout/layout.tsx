/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import ArrowTab from "@/components/atoms/arrow-tab";
import { useCartContext } from "@/lib/contexts/cart-context-provider";
import { TSteps, steps } from "@/lib/data";
import { ReactChildren } from "@/lib/types";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

function onCheckout(products: any, steps: any, id: any) {
  if (typeof window !== "undefined") {
    window[`dataLayer`] = window?.dataLayer || [];

    window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
    window.dataLayer.push({
      event: "checkout",
      componentName: "checkout step",
      ecommerce: {
        currencyCode: "AUD",
        actionField: { step: id, option: steps[id].text },
        products,
      },
    });
  }
}

const Layout = ({ children }: ReactChildren) => {
  const pathname = usePathname();
  const currentID = steps.filter((item: TSteps) => pathname === item.path)[0]
    .id;
  const { cart } = useCartContext();

  useEffect(() => {
    console.log(pathname.includes(steps[currentID - 1].path), pathname, steps[currentID - 1].path)
    if (pathname.includes(steps[currentID - 1].path)) {
      onCheckout(cart, steps, currentID - 1);
    }
  }, [pathname]);
  return (
    <section className="container">
      <div className="bg-white p-[10px] md:p-[20px] rounded-[8px]">
        <ul className="flex flex-wrap gap-y-[5px] pb-[32px] pl-3">
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
    </section>
  );
};

export default Layout;
