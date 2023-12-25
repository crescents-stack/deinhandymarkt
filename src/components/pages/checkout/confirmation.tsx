import CheckoutNextButton from "@/components/atoms/checkout-next-button";
import Product from "./product";
import UserRound from "@/components/assets/billing/user-round";
import Mail from "@/components/assets/billing/mail";
import PhoneCall from "@/components/assets/billing/phone-call";
import Printer from "@/components/assets/billing/printer";
import BookUser from "@/components/assets/billing/book-user";
import Quote from "@/components/assets/billing/quote";
import { paymentCardData } from "./payment-methods";
import PaymentCard from "./payment-card";
import PriceCount from "./price-count";

const Confirmation = ({ searchParams }: { searchParams: any }) => {
  const paymentData = paymentCardData.filter(
    (item: any) => item.id === parseInt(searchParams.paymentMethodId)
  )[0];
  return (
    <div>
      <div className="flex flex-col gap-[32px]">
        <div className="flex flex-col gap-[10px] md:gap-[20px]">
          <Product />
          <Product />
        </div>
        <div className="flex flex-wrap gap-[20px] [&>div]:max-w-[450px]">
          <div className="flex flex-col gap-[8px]">
            <h3 className="text-[14px] md:text-[16px] font-semibold">
              Billing Address
            </h3>
            <ul className="flex flex-col gap-[8px] [&>li]:flex [&>li]:gap-[8px] [&>li>p]:flex [&>li>svg]:min-w-[16px]">
              <li>
                <UserRound className="" />
                <p>
                  {BillingDetails.salutation}&nbsp;{BillingDetails.firstname}
                  &nbsp;{BillingDetails.lastname}
                </p>
              </li>
              <li>
                <Mail className="" />
                <p>{BillingDetails.email}</p>
              </li>
              <li>
                <PhoneCall className="" />
                <p>{BillingDetails.phone}</p>
              </li>
              <li>
                <Printer className="" />
                <p>{BillingDetails.fax}</p>
              </li>
              <li>
                <BookUser className="" />
                <p>
                  {BillingDetails.street}&nbsp;{BillingDetails.land}
                </p>
              </li>
              <li>
                <Quote className="" />
                <p>{BillingDetails.message}</p>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-[8px]">
            <h3 className="text-[14px] md:text-[16px] font-semibold">
              Delivery Address
            </h3>
            <ul className="flex flex-col gap-[8px] [&>li]:flex [&>li]:gap-[8px] [&>li>p]:flex [&>li>p]:text-gray-600 [&>li>svg]:min-w-[16px]">
              <li>
                <UserRound className="" />
                <p>
                  {BillingDetails.salutation}&nbsp;{BillingDetails.firstname}
                  &nbsp;{BillingDetails.lastname}
                </p>
              </li>
              <li>
                <Mail className="" />
                <p>{BillingDetails.email}</p>
              </li>
              <li>
                <PhoneCall className="" />
                <p>{BillingDetails.phone}</p>
              </li>
              <li>
                <Printer className="" />
                <p>{BillingDetails.fax}</p>
              </li>
              <li>
                <BookUser className="" />
                <p>
                  {BillingDetails.street}&nbsp;{BillingDetails.land}
                </p>
              </li>
              <li>
                <Quote className="" />
                <p>{BillingDetails.message}</p>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <PaymentCard item={paymentData} />
        </div>
        <PriceCount />
        <div className="w-full h-[200px] rounded-[8px] bg-gray-200"></div>
      </div>
      <div className="flex justify-end pt-[32px]">
        <CheckoutNextButton variant="both" />
      </div>
    </div>
  );
};
export default Confirmation;

const BillingDetails = {
  salutation: "Mr",
  firstname: "Musiur Alam",
  lastname: "Opu",
  email: "johndoe@example.com",
  phone: "+1234567890",
  fax: "1234567890",
  street: "92, Road 2, Handy Street, 1229, Berlin",
  land: "Germany",
  message:
    "Lorem ipsum dolor sit amet consectetur. Ut bibendum scelerisque turpis volutpat odio. At malesuada sed eget leo risus. Tortor eget placerat volutpat tellus. Interdum diam dapibus sed volutpat amet tincidunt",
};
