"use client";
import ArrowTab from "@/components/atoms/arrow-tab";
import { steps } from "@/lib/data";
import { ReactChildren } from "@/lib/types";
import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const Layout = ({ children }: ReactChildren) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;
  const currentStepID = parseInt(searchParams.get("stepId")!);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const updateUrlWithStepIdInQuery = (id: number) => {
    id < currentStepID &&
      router.push(pathname + "?" + createQueryString("stepId", id.toString()));
  };
  return (
    <section className="container">
      <div className="bg-white p-[10px] md:p-[20px] rounded-[8px]">
        <ul className="flex flex-wrap gap-y-[5px]">
          {steps.map((step: any) => {
            const { id } = step;
            const status =
              id === currentStepID
                ? "current"
                : id < currentStepID
                ? "done"
                : "todo";
            return (
              <li
                key={step.id}
                className={clsx({
                  "ml-[-10px]": step.id !== 1,
                  "ml-0": step.id === 1,
                })}
              >
                <ArrowTab
                  step={{ ...step, status, updateUrlWithStepIdInQuery }}
                />
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
