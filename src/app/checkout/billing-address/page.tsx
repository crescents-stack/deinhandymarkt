/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import BillingAddressForm from "../_utils/components/billing-address-form";
import { useEffect, useState } from "react";

import { useContextStore } from "@/lib/hooks/hooks";

const defaultValues = {
  email: "",
  salutation: "",
  firstName: "",
  lastName: "",
  reference: "",
  telephone: "",
  street: "",
  house: "",
  pobox: "",
  plz: "",
  location: "",
  land: "",
  message: "",
};

const BillingAddress = () => {
  const { getContext } = useContextStore();
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    billing: defaultValues,
    delivery: defaultValues,
  });

  useEffect(() => {
    const persistendedData = getContext("billingDetails");
    if (persistendedData) {
      setData(persistendedData);
    }
  }, [])
  return (
    <div>
      {step === 2 ? (
        <>
          <div
            
          >
            <BillingAddressForm
              title="Delivery Address"
              name="delivery"
              handler={{ data, setData, step, setStep }}
              defaultValues={data.billing}
            />
          </div>
        </>
      ) : (
        <BillingAddressForm
          title="Billing Address"
          name="billing"
          handler={{ data, setData, step, setStep }}
          defaultValues={data.billing}
        />
      )}
    </div>
  );
};

export default BillingAddress;
