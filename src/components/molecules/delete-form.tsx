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

const DeleteFormSchema = z.object({
  text: z
    .string()
    .min(3)
    .refine((value) => value === "DELETE", {
      message: "Please enter 'DELETE'!",
    }),
});

type TDeleteFormSchema = z.infer<typeof DeleteFormSchema>;

const DeleteForm = ({
  _id,
  title,
  deletor,
  backlink,
}: {
  _id: string;
  title: string;
  deletor: Function;
  backlink: string;
}) => {
  const router = useRouter();
  const form = useForm<TDeleteFormSchema>({
    resolver: zodResolver(DeleteFormSchema),
    defaultValues: {
      text: "",
    },
  });
  const onSubmit = async () => {
    // action on successfull response
    const result = await deletor(_id);
    ActionResponseHandler(result, title, true);
    if (result.success) {
      router.push(backlink);
    }
  };

  return (
    <div className="max-w-[300px] space-y-8">
      <h3 className="text-[16px] md:text-[20px] font-bold">
        Are you sure to delete?
      </h3>
      <div>
        This item will be deleted from this store! To delete type&nbsp;
        <span className="px-2 pt-1 pb-1 font-semibold text-pink-600 bg-pink-50 rounded">
          DELETE
        </span>
        &nbsp;in this input box
      </div>
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
              href={backlink}
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

export default DeleteForm;
