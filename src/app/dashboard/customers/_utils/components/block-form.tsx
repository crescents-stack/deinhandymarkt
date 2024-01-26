"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  CustomerAccountBlockSchema,
  TCustomerAccountBlockSchema,
} from "../types/types";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import InputField from "@/components/atoms/input-field";
import Link from "next/link";
import { BlockCustomer } from "../actions/actions";
import { ActionResponseHandler } from "@/lib/error";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/lib/contexts/auth-context-provider";

const CustomerAccountBlockForm = ({ _id }: { _id: string }) => {
  const router = useRouter();
  const form = useForm<TCustomerAccountBlockSchema>({
    resolver: zodResolver(CustomerAccountBlockSchema),
    defaultValues: {
      _id,
      status: "blocked",
      text: "",
    },
  });

  const onSubmit = async (values: TCustomerAccountBlockSchema) => {
    // action on successfull response
    console.log(values);
    const result = await BlockCustomer(values);
    ActionResponseHandler(result, "Customer Block");
    if (result.success) {
      router.push("/dashboard/customers");
    }
  };
  return (
    <div className="max-w-[350px] space-y-8">
      <div className="space-y-2">
        <h4 className="text-[16px] md:text-[20px] font-semibold">
          Are you sure to block this customer for any access?
        </h4>
        <p>
          Please, type&nbsp;
          <span className="px-[4px] py-[2px] bg-pink-50 text-pink-600 font-semibold">
            BLOCKED
          </span>
          &nbsp;in this input field
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <InputField name="text" form={form} label="Text" />
          <div className="space-x-4">
            <Button
              type="submit"
              variant={"destructive"}
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Blocking..." : "Block"}
            </Button>
            <Link
              href="/dashboard/customers"
              className="py-[10px] px-[16px] rounded-[10px] bg-primary text-primary-foreground"
            >
              Discard
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CustomerAccountBlockForm;
