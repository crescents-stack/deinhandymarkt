"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  CustomerAccountBlockSchema,
  TCustomerAccountBlockSchema,
} from "../types/types";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BlockCustomer } from "../actions/actions";
import { ActionResponseHandler } from "@/lib/error";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/lib/contexts/auth-context-provider";
import { PRINT } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useContextStore } from "@/lib/hooks/hooks";

const CustomerAccountBlockForm = ({
  _id,
  status = "blocked",
}: {
  _id: string;
  status: "active" | "pending" | "blocked";
}) => {
  const router = useRouter();
  const { removeContext } = useContextStore();
  const form = useForm<TCustomerAccountBlockSchema>({
    resolver: zodResolver(CustomerAccountBlockSchema),
    defaultValues: {
      _id,
      status,
    },
  });
  const { auth, setAuth } = useAuthContext();

  const onSubmit = async (values: TCustomerAccountBlockSchema) => {
    // action on successfull response
    const result = await BlockCustomer(values, auth?.accessToken as string);
    if ([400, 401].includes(result.statusCode)) {
      removeContext("auth");
      setAuth(null);
      router.push("/auth/login");
    }
    ActionResponseHandler(result, "Customer Block");
    if (result.success) {
      router.push("/dashboard/customers");
    }
  };
  return (
    <div className="max-w-[350px] space-y-8 bg-white p-8 rounded-[10px]">
      <div className="space-y-2">
        <h4 className="text-[16px] md:text-[20px] font-semibold">
          User access type
        </h4>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="blocked">Block</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Based on this user status will be changed
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="space-x-4">
            <Link
              href="/dashboard/customers"
              className="py-[10px] px-[16px] rounded-[10px] bg-muted text-primary border border-dark_gray"
            >
              Discard
            </Link>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Updating..." : "Update status"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CustomerAccountBlockForm;
