"use client";

import BadgeDev from "@/components/molecules/badge-dev";
import TagInput from "@/components/molecules/tag-input";
import UploadImage from "@/components/molecules/upload-image";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { CategorySchema, TCategorySchema } from "../_utils/types/types";
import InputField from "@/components/atoms/input-field";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PostCategory } from "../_utils/actions/actions";
import { ActionResponseHandler } from "@/lib/error";
import { PRINT } from "@/lib/utils";
import { useAuthContext } from "@/lib/contexts/auth-context-provider";
import UploadSingleImage from "@/components/molecules/upload-with-cloudinary";
import { useContextStore } from "@/lib/hooks/hooks";

const Page = () => {
  const router = useRouter();
  const {removeContext} = useContextStore();
  const { auth } = useAuthContext();
  const form = useForm<TCategorySchema>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      name: "",
      slug: "",
      icon: "",
      blog: "",
      // parentId: "",
      tags: [],
      metadata: {
        title: "",
        description: "",
      },
    },
  });

  const onSubmit = async (values: TCategorySchema) => {
    PRINT(values);
    const result = await PostCategory(values, auth?.accessToken as string);
    if (result.statusCode === 401) {
     removeContext("auth"); router.push("/auth/login");
    }
    ActionResponseHandler(result, "Post Category");
    console.log(result);
    if (result.success) {
      router.push("/dashboard/categories");
    }
  };
  return (
    <div className="max-w-[300px] md:max-w-[600px] input-field bg-white p-8 rounded-[10px]">
      <h1 className="text-[16px] md:text-[20px] font-bold pb-[24px]">
        Add New Category
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-[32px]"
        >
          <fieldset className="space-y-8">
            <InputField
              form={form}
              name="name"
              label="Name"
              placeholder="e.g. Case"
            />

            <InputField
              form={form}
              name="slug"
              label="Slug"
              placeholder="e.g. /case"
            />

            <div className="flex flex-col gap-[4px]">
              <label htmlFor="status" className="font-semibold">
                Tags
              </label>
              <TagInput
                onChange={(e: any) => {
                  form.setValue("tags", e.target.value);
                }}
                name="tags"
              />
            </div>
            <FormField
              control={form.control}
              name="icon"
              render={() => (
                <FormItem>
                  <FormLabel>Icon</FormLabel>
                  <FormControl>
                    <UploadSingleImage
                      form={form}
                      name="icon"
                      defaultValue={form.getValues("icon")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <InputField form={form} name="blog" label="Blog" textarea />
          </fieldset>
          <fieldset className="space-y-8">
            <div className="pt-4 mt-4 border-t flex flex-col gap-[16px]">
              <h2 className="font-bold text-[16px] md:text-[18px]">Metadata</h2>
              <InputField form={form} name="metadata.title" label="Title" />
              <InputField
                form={form}
                name="metadata.description"
                label="description"
                textarea
              />
              <div className="grid grid-cols-2 gap-[16px] mt-5">
                <Link href="/dashboard/categories">
                  <Button
                    disabled={form.formState.isSubmitting}
                    variant={"outline"}
                    className="w-full text-pink-600"
                  >
                    Discard
                  </Button>
                </Link>
                <Button disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? "Adding..." : "Add Category"}
                </Button>
              </div>
            </div>
          </fieldset>
        </form>
      </Form>
    </div>
  );
};

export default Page;
