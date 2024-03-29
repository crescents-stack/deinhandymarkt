/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Success from "@/components/assets/success";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Complete = ({ searchParams }: { searchParams: { orderId: string } }) => {
  return (
    <section className="flex flex-col items-center justify-center min-h-[300px] gap-[20px]">
      <Success />
      <div className="flex flex-col items-center justify-center gap-4">
        <h3 className="text-[16px] md:text-[20px] font-bold">
          Congratulations!
        </h3>
        <p className="text-gray-600">Your order successfully has been placed</p>
        <p className="text-gray-600 text-2xl">
          Order ID&nbsp;
          <span className="text-2xl text-secondary bg-muted px-2 py-[2px] rounded-[10px]">
            #{searchParams.orderId}
          </span>
        </p>
      </div>

      <div className="flex flex-col items-center justify-center gap-[12px]">
        <Link href="/dashboard/orders">
          <Button variant={"secondary"}>Check Orders in Dashboard</Button>
        </Link>
        <Link href="/" className="text-gray-600 underline hover:text-secondary">
          Continue shopping
        </Link>
      </div>
    </section>
  );
};

export default Complete;
