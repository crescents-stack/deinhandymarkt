import Success from "@/components/assets/success";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Complete = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-[300px] gap-[20px]">
      <Success />
      <div className="flex flex-col items-center justify-center gap-[4px]">
        <h3 className="text-[16px] md:text-[20px] font-bold">
          Congratulations!
        </h3>
        <p className="text-gray-600">Order No #4562456345345</p>
        <p className="text-gray-600">Your order successfully has been placed</p>
      </div>

      <div className="flex flex-col items-center justify-center gap-[12px]">
        <Button variant={"secondary"}>Check Orders in Dashboard</Button>
        <Link href="/" className="text-gray-600 underline hover:text-secondary">
          Continue shopping
        </Link>
      </div>
    </section>
  );
};

export default Complete;
