"use client";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import InputField from "@/components/atoms/input-field";
import { Form } from "@/components/ui/form";
import { ActionResponseHandler } from "@/lib/error";

import { useAuthContext } from "@/lib/contexts/auth-context-provider";
import { TVatCountrySchema, VatCountrySchema } from "../_utils/types/types";
import { PostVat } from "../_utils/actions/actions";

const Page = () => {
  const router = useRouter();
  const { auth } = useAuthContext();
  const form = useForm<TVatCountrySchema>({
    resolver: zodResolver(VatCountrySchema),
    defaultValues: {
      countryName: "",
      countryCode: "",
      vatAmountInPercent: 0,
    },
  });

  const onSubmit = async (values: TVatCountrySchema) => {
    PRINT(values);
    const result = await PostVat(values, auth?.accessToken as string);
    ActionResponseHandler(result, "Add country VAT info");
    if (result.success) {
      router.push("/dashboard/vat");
    }
  };
  return (
    <div className="max-w-[300px] md:max-w-[600px] input-field bg-white p-8 rounded-[10px]">
      <h1 className="text-[16px] md:text-[20px] font-bold pb-[24px]">
        Add New Country VAT information
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <InputField
            form={form}
            name="countryName"
            label="Country name"
            placeholder="e.g. Australia"
          />

          <InputField
            form={form}
            name="countryCode"
            label="Country code in short"
            placeholder="e.g. AU"
          />
          <InputField
            form={form}
            name="vatAmountInPercent"
            label="Amount in percent (%)"
            placeholder="4"
            type="number"
          />
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Adding..." : "Add country"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Page;
