import BillingAddress from "@/components/pages/checkout/billing-address";
import CheckoutProducts from "@/components/pages/checkout/checkout-products";
import Complete from "@/components/pages/checkout/complete";
import Confirmation from "@/components/pages/checkout/confirmation";
import PaymentMethods from "@/components/pages/checkout/payment-methods";

const Tab = ({
  params,
  searchParams,
}: {
  params: { tab: string };
  searchParams: any;
}) => {
  console.log(params.tab);
  const currentStepId = parseInt(searchParams.stepId);
  const currentTab = [
    <CheckoutProducts key={1} />,
    <BillingAddress key={2} />,
    <PaymentMethods key={3} />,
    <Confirmation key={4} searchParams={searchParams}/>,
    <Complete key={5} />,
  ][currentStepId - 1];
  return currentTab;
};

export default Tab;
