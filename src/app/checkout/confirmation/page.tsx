/* eslint-disable react-hooks/exhaustive-deps */
"use client";

// import Product from "../_utils/components/product";
import UserRound from "@/components/assets/billing/user-round";
import Mail from "@/components/assets/billing/mail";
import PhoneCall from "@/components/assets/billing/phone-call";
import Printer from "@/components/assets/billing/printer";
import BookUser from "@/components/assets/billing/book-user";
import Quote from "@/components/assets/billing/quote";
import PriceCount from "../_utils/components/price-count";
import { Button } from "@/components/ui/button";
import { PaymentCardData } from "../_utils/data";
import Link from "next/link";
import clsx from "clsx";
import { useContextStore } from "@/lib/hooks/hooks";
import { useEffect, useState } from "react";
import { IntlFormatter, PRINT } from "@/lib/utils";
import PaymentBox from "./_utils/components/PaymentBox";
import Product from "../_utils/components/product";
import { useCartContext } from "@/lib/contexts/cart-context-provider";

const Confirmation = () => {
  const { getContext, setContext } = useContextStore();
  const { cart } = useCartContext();
  const [paymentMethod, setPaymentMethod] = useState(PaymentCardData[0]);
  const [billingDetails, setBillingDetails] = useState<{
    delivery: any;
    billing: any;
  }>({ delivery: null, billing: null });
  const CountPrice = () => {
    let temp = 0;
    cart.map((item) => {
      temp += item.basePrice * item.quantity;
    });
    return temp;
  };

  useEffect(() => {
    getContext("paymentMethod") &&
      setPaymentMethod(
        PaymentCardData.filter(
          (item) => item.method === getContext("paymentMethod")
        )[0]
      );

    getContext("billingDetails") &&
      setBillingDetails(getContext("billingDetails"));

    setContext("paymentStatus", "processing");
  }, []);

  // PRINT(billingDetails);
  return (
    <div>
      <div className="flex flex-col gap-[32px]">
        <div className="flex flex-col gap-[10px] md:gap-[20px]">
          {cart.map((item) => {
            return <Product key={item._id} details={item} />;
          })}
        </div>
        {Object.values(billingDetails).filter((item) => item).length === 2 ? (
          <div className="flex flex-wrap gap-[20px] [&>div]:max-w-[450px]">
            {Object.keys(billingDetails)
              .filter((item) => item)
              ?.map((item, index) => {
                const {
                  salutation,
                  firstName,
                  lastName,
                  email,
                  telephone,
                  street,
                  land,
                  message,
                  pobox,
                } =
                  billingDetails[item === "delivery" ? "delivery" : "billing"];
                return (
                  <div key={index} className="flex flex-col gap-[8px]">
                    <h3 className="text-[14px] md:text-[16px] font-semibold">
                      {item === "billing" ? "Billing" : "Delivery"}&nbsp;Address
                    </h3>
                    <ul className="flex flex-col gap-[8px] [&>li]:flex [&>li]:gap-[8px] [&>li>p]:flex [&>li>svg]:min-w-[16px]">
                      <li>
                        <UserRound className="" />
                        <p>
                          {salutation}&nbsp;{firstName}
                          &nbsp;{lastName}
                        </p>
                      </li>
                      <li>
                        <Mail className="" />
                        <p>{email}</p>
                      </li>
                      <li>
                        <PhoneCall className="" />
                        <p>{telephone}</p>
                      </li>
                      <li>
                        <Printer className="" />
                        <p>{pobox}</p>
                      </li>
                      <li>
                        <BookUser className="" />
                        <p>
                          {street}&nbsp;{land}
                        </p>
                      </li>
                      <li>
                        <Quote className="" />
                        <p>{message}</p>
                      </li>
                    </ul>
                  </div>
                );
              })}
          </div>
        ) : null}
        <div>
          <div className="flex gap-[20px] p-[10px] md:p-[20px] rounded-[8px] border border-dark_gray max-w-[290px]">
            <div
              className={clsx(
                "min-w-[20px] w-[20px] min-h-[20px] h-[20px] rounded-full flex items-center justify-center border border-secondary border-gray-400"
              )}
            >
              <div
                className={clsx("w-[12px] h-[12px] rounded-full bg-secondary")}
              ></div>
            </div>
            <div
              className={clsx(
                "flex flex-col gap-[12px] [&>svg]:w-[100px] [&>svg]:stroke-0 [&>svg>*]:fill-primary"
              )}
            >
              {paymentMethod.icon}
              <div className="text-gray-500">{paymentMethod.text}</div>
            </div>
          </div>
        </div>
        <PriceCount />
        <div className="w-full rounded-[8px] border border-dark_gray py-16">
          <PaymentBox
            amount={parseFloat((CountPrice() + 4.66 + 3.44).toFixed(2))}
          />
        </div>
      </div>
      <div className="pt-[20px] flex justify-start gap-[16px]">
        <Link href="/checkout/payment-methods">
          <Button variant="outline">Previous</Button>
        </Link>
      </div>
    </div>
  );
};
export default Confirmation;
