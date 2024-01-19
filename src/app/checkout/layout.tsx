"use client";
import ArrowTab from "@/components/atoms/arrow-tab";
import { TSteps, steps } from "@/lib/data";
import { ReactChildren } from "@/lib/types";
import clsx from "clsx";
import { usePathname } from "next/navigation";

const Layout = ({ children }: ReactChildren) => {
  const pathname = usePathname();
  const currentID = steps.filter((item: TSteps) =>
    pathname === item.path
  )[0].id;
  console.log(currentID);
  return (
    <section className="container">
      <div className="bg-white p-[10px] md:p-[20px] rounded-[8px]">
        <ul className="flex flex-wrap gap-y-[5px] pb-[32px]">
          {steps.map((step: any) => {
            const { id } = step;
            const status =
              id === currentID ? "current" : id < currentID ? "done" : "todo";
            return (
              <li
                key={step.id}
                className="ml-[-10px]"
              >
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
