/* eslint-disable react-hooks/exhaustive-deps */
import {
  BillingFormSchema,
  TBillingFormSchema,
} from "@/app/checkout/_utils/types/types";
import { TSingleUserSchema } from "@/app/dashboard/customers/_utils/types/types";
import InputField from "@/components/atoms/input-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { PRINT } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const BillingDetailsForm = ({
  defaultValues,
  customerData,
  setCustomerData,
  name,
}: {
  defaultValues: TBillingFormSchema;
  customerData: TSingleUserSchema;
  setCustomerData: Function;
  name: string;
}) => {
  const form = useForm<TBillingFormSchema>({
    resolver: zodResolver(BillingFormSchema),
    defaultValues,
  });
  const [sameAsBilling, setSameAsBilling] = useState(false);

  const onSubmit = (values: TBillingFormSchema) => {
    setCustomerData({
      ...customerData,
      uid: { ...customerData.uid, [name]: values },
    });
  };

  useEffect(() => {
    onSubmit(form.getValues());
  }, [form]);

  PRINT(form.getValues());
  return (
    <div className="bg-white p-8 rounded-[10px] space-y-8">
      <h4 className="text-[14px] md:text-[16px] font-semibold">
        {name === "billingAddress" ? "Billing" : "Delivery"}&nbsp;Address
      </h4>
      {name === "shippingAddress" ? (
        <div className="flex gap-8">
          <p>Same as billing?</p>
          <Switch
            checked={sameAsBilling}
            onClick={() => {
              setSameAsBilling(!sameAsBilling);
              setCustomerData({
                ...customerData,
                uid: {
                  ...customerData.uid,
                  shippingAddress: customerData.uid.billingAddress,
                },
              });
              !sameAsBilling && form.reset(customerData.uid.billingAddress);
            }}
          />
        </div>
      ) : null}
      <Form {...form}>
        <form
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[32px]"
          // onSubmit={form.handleSubmit(onSubmit)}
        >
          <fieldset className="space-y-4">
            <InputField form={form} name="salutation" label="Salutation" />
            <InputField
              form={form}
              name="firstName"
              label="First name"
              placeholder="e.g. John"
            />
            <InputField
              form={form}
              name="lastName"
              label="Last name"
              placeholder="e.g. Doe"
            />
            <InputField form={form} name="reference" label="Reference number" />
            <InputField form={form} name="telephone" label="Telephone number" />
          </fieldset>
          <fieldset className="space-y-4">
            <InputField form={form} name="street" label="Street" />
            <InputField form={form} name="house" label="House number" />
            <InputField form={form} name="pobox" label="P.O Box" />
            <InputField form={form} name="plz" label="PLZ" />
            <InputField form={form} name="location" label="Location" />
          </fieldset>
          <fieldset className="space-y-4">
            <InputField form={form} name="land" label="Land" />
            <InputField
              form={form}
              name="email"
              label="Email"
              placeholder="e.g. hello@example.com"
            />
            <InputField
              form={form}
              name="message"
              label="Your message"
              textarea
            />
            {/* <Button type="submit">Next</Button> */}
          </fieldset>
        </form>
      </Form>
    </div>
  );
};

export default BillingDetailsForm;
