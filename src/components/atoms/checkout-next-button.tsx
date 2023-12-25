"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { useCallback } from "react";
import { steps } from "@/app/checkout/page";
import clsx from "clsx";

const CheckoutNextButton = ({ variant = "both" }: { variant: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams()!;
  const currentStepId = parseInt(searchParams.get("stepId")!);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  const GotoNextStep = () => {
    const nextPathname =
      "/checkout/" +
      steps
        .filter((item: any) => item.id === currentStepId + 1)[0]
        .text.toLowerCase()
        .replaceAll(" ", "-");
    router.push(
      nextPathname +
        "?" +
        createQueryString("stepId", (currentStepId + 1).toString())
    );
  };
  const GotoPrevStep = () => {
    const prevPathname =
      "/checkout/" +
      steps
        .filter((item: any) => item.id === currentStepId - 1)[0]
        .text.toLowerCase()
        .replaceAll(" ", "-");
    router.push(
      prevPathname +
        "?" +
        createQueryString("stepId", (currentStepId - 1).toString())
    );
  };
  return (
    <div className="flex gap-[20px]">
      <Button
        variant={"outline"}
        onClick={GotoPrevStep}
        className={clsx({
          hidden: variant === "one",
          "": variant === "both",
        })}
      >
        Previous
      </Button>
      <Button variant={"secondary"} onClick={GotoNextStep}>
        Next
      </Button>
    </div>
  );
};

export default CheckoutNextButton;
