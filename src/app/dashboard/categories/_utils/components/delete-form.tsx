"use client";

import InputField from "@/components/atoms/input-field";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ActionResponseHandler } from "@/lib/error";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DeleteCategory } from "../actions/actions";

const DeleteFormSchema = z.object({
  text: z
    .string()
    .min(3)
    .refine((value) => value === "DELETE", {
      message: "Please enter 'DELETE'!",
    }),
});

type TDeleteFormSchema = z.infer<typeof DeleteFormSchema>;

const DeleteForm = ({_id}: {_id: string}) => {
  const router = useRouter();
  const form = useForm<TDeleteFormSchema>({
    resolver: zodResolver(DeleteFormSchema),
    defaultValues: {
      text: "",
    },
  });
  const onSubmit = async () => {
    // action on successfull response
    const result = await DeleteCategory(_id);
    ActionResponseHandler(result, "Category deletion", true);
    if (result.success) {
      router.push("/dashboard/categories");
    }
  };

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <InputField name="text" form={form} label="" />
          <div className="space-x-4">
            <Button
              type="submit"
              variant={"destructive"}
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Deleting..." : "Delete"}
            </Button>
            <Link
              href="/dashboard/categories"
              className="py-[10px] px-[16px] rounded-[10px] bg-primary text-primary-foreground"
            >
              Discard
            </Link>
          </div>
        </form>
      </Form>
  )
}

export default DeleteForm;