"use client";

import BadgeDev from "@/components/molecules/badge-dev";
import TagInput from "@/components/molecules/tag-input";
import UploadImage from "@/components/molecules/upload-image";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import InputField from "@/components/atoms/input-field";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ActionResponseHandler } from "@/lib/error";
import { useAuthContext } from "@/lib/contexts/auth-context-provider";
import { TVatCountrySchema, VatCountrySchema } from "../types/types";
import { UpdateVat } from "../actions/actions";

const VatInfoUpdate = ({
  defaultFormData,
}: {
  defaultFormData: TVatCountrySchema;
}) => {
  const router = useRouter();
  const {auth} = useAuthContext();
  const form = useForm<TVatCountrySchema>({
    resolver: zodResolver(VatCountrySchema),
    defaultValues: {...defaultFormData},
  });

  const onSubmit = async (values: TVatCountrySchema) => {
    const result = await UpdateVat(values, auth?.accessToken as string);
    ActionResponseHandler(result, "Update country VAT info");
    if (result.success) {
      router.push("/dashboard/vat");
    }
  };
  return (
    <div className="max-w-[300px] md:max-w-[600px] input-field bg-white p-8 rounded-[10px]">
      <h1 className="text-[16px] md:text-[20px] font-bold pb-[24px]">
        Update VAT info
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
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
            {form.formState.isSubmitting ? "Updating...": "Update country"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default VatInfoUpdate;
