import BrandLogo from "@/components/assets/brand-logo";
import { Button } from "@/components/ui/button";
import { MakeCombinationString } from "@/lib/combination-maker";
import Image from "next/image";
import Link from "next/link";

const InvoicePaper = ({ details }: any) => {
  const { status } = details;
  const {
    salutation,
    firstName,
    lastName,
    house,
    street,
    pobox,
    location,
    land,
  } = details?.shippingAddress;
  const lineItems = details?.lineItems;
  return (
    <div className="flex flex-col items-center justify-center max-w-[500px] mx-auto gap-4 bg-white p-4 rounded-[10px] py-10">
      <div className="flex flex-col items-center justify-center gap-4">
        <BrandLogo className="max-w-[200px] md:max-w-[300px]" />
        <h3 className="text-normal sm:text-lg font-bold">
          Thank you for your purchase!
        </h3>
        <p className="text-center">
          Hi&nbsp;
          <span className="text-secondary">{firstName}</span>, we&apos;re
          getting your order on&nbsp;
          <span className="text-secondary">{status}</span>. We will notify you
          when it has been sent.
        </p>
        <Link href="/dashboard/orders" className="inline-flex">
          <Button>View more orders</Button>
        </Link>
      </div>
      <div className="py-4 border-y">
        <div>
          <h3 className="text-normal sm:text-lg font-bold">Shipping address</h3>
          <p>{`${salutation} ${firstName} ${lastName}, ${house}, ${street}, ${pobox}, ${location}, ${land}`}</p>
        </div>
      </div>
      <div className="pb-4 border-b w-full">
        <div>
          {lineItems?.map((item: any, index: number) => {
            const { name, price, thumbnail } = item.product;
            return (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                <div className="flex items-center justify-start gap-4">
                  <div>
                    <Image
                      src={thumbnail}
                      alt="image"
                      width={1000}
                      height={1000}
                      className="max-w-[100px]"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-normal font-bold">{name}</h3>
                    {item?.attributeCombinations?.combinations?.length ? (
                      <p>{MakeCombinationString(item.attributeCombinations)}</p>
                    ) : (
                      price
                    )}
                  </div>
                </div>
                <div className="text-normal font-bold pr-4">${item.price}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full grid grid-cols-1 items-center pb-4">
        <div className="flex justify-between gap-4">
          <h3 className="text-normal sm:text-lg font-bold">Subtotal</h3>
          <p className="text-center">${details.subTotal}</p>
        </div>
        <div className="flex justify-between gap-4">
          <h3 className="text-normal sm:text-lg font-bold">VAT</h3>
          <p className="text-center">${details.tax}</p>
        </div>
        <div className="flex justify-between gap-4 border-t py-4">
          <h3 className="text-normal sm:text-lg font-bold">Total</h3>
          <p className="text-center font-bold">${details.total}</p>
        </div>
      </div>

      <div className="text-center py-4">
        If you have any questions, reply to this email or contact us at
        support@gmail.com street address city name, CA 10101
      </div>
      <div className="pt-4">
        Use <span className="px-3 py-2 rounded-[10px]">ctrl + P</span> to print
      </div>
    </div>
  );
};

export default InvoicePaper;
