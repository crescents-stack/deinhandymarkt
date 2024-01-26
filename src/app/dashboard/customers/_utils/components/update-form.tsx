"use client";

import { useForm } from "react-hook-form";
import {
  TUpdateFormSchema,
  TUserSchema,
  UpdateFormSchema,
  UserSchema,
} from "../types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import InputField from "@/components/atoms/input-field";
import { Button } from "@/components/ui/button";
import { UpdateCustomer } from "../actions/actions";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useAuthContext } from "@/lib/contexts/auth-context-provider";
import { useRouter } from "next/navigation";
import { ActionResponseHandler } from "@/lib/error";


const CustomerUpdateForm = ({
  defaultFormData,
}: {
  defaultFormData: TUserSchema;
}) => {
  const { auth } = useAuthContext();
  const router = useRouter()
  const form = useForm<TUpdateFormSchema>({
    resolver: zodResolver(UpdateFormSchema),
    defaultValues: {
      uid: {
        name: {
          firstName: defaultFormData.uid.name.firstName,
          lastName: defaultFormData.uid.name.lastName,
        },
        _id: defaultFormData.uid._id as string,
      },
    },
  });
  const onSubmit = async (values: TUpdateFormSchema) => {
    console.log(values);
    const result = await UpdateCustomer(values, auth?.accessToken as string);
    console.log(result);
    ActionResponseHandler(result, "User data update");
    if (result.success) {
      router.push("/dashboard/customers");
    }
  };
  return (
    <div className="max-w-[450px] pt-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-[32px]"
        >
          <fieldset className="space-y-8">
            <InputField
              form={form}
              name="uid.name.firstName"
              label="First Name"
              placeholder="e.g. John"
            />
            <InputField
              form={form}
              name="uid.name.lastName"
              label="Last Name"
              placeholder="e.g. doe"
            />
          </fieldset>
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard/customers"
              className="flex items-center gap-[4px] group"
            >
              <ChevronLeft className="stroke-[1.3px] stroke-gray-500 w-4 h-4 translate-x-0 group-hover:translate-x-[-5px] transition ease-in-out duration-150" />
              <span className="text-gray-500">Back</span>
            </Link>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting
                ? "Updating..."
                : "Update Customer Data"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CustomerUpdateForm;
