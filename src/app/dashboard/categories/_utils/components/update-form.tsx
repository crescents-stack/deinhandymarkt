"use client";

import BadgeDev from "@/components/molecules/badge-dev";
import TagInput from "@/components/molecules/tag-input";
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
import { CategorySchema, TCategorySchema } from "../types/types";
import { UpdateCategory } from "../actions/actions";
import { useAuthContext } from "@/lib/contexts/auth-context-provider";
import UploadSingleImage from "@/components/molecules/upload-with-cloudinary";
import { useContextStore } from "@/lib/hooks/hooks";

const CategoryUpdateForm = ({
  defaultFormData,
}: {
  defaultFormData: TCategorySchema;
}) => {
  const router = useRouter();
  const { removeContext } = useContextStore();
  const { auth, setAuth } = useAuthContext();
  const form = useForm<TCategorySchema>({
    resolver: zodResolver(CategorySchema),
    defaultValues: { ...defaultFormData },
  });

  const onSubmit = async (values: TCategorySchema) => {
    const result = await UpdateCategory(values, auth?.accessToken as string);
    if ([400, 401].includes(result.statusCode)) {
      removeContext("auth");
      setAuth(null);
      router.push("/auth/login");
    }
    ActionResponseHandler(result, "Post Category");
    if (result.success) {
      router.push("/dashboard/categories");
    }
  };
  return (
    <div className="max-w-[300px] md:max-w-[600px] input-field bg-white p-8 rounded-[10px]">
      <h1 className="text-[16px] md:text-[20px] font-bold pb-[24px]">
        Update Category
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

            {/* <div className="input-field">
              <label htmlFor="parentId">
                Parent ID&nbsp;
                <BadgeDev />
              </label>
              <input type="text" name="parentId" readOnly={true} />
            </div> */}

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
                defaultValue={form.getValues("tags")}
              />
            </div>
            <FormField
              control={form.control}
              name="icon"
              render={(field) => (
                <FormItem>
                  <FormLabel>Icon</FormLabel>
                  <FormControl>
                    {/* <UploadImage
                      func={(e: any) => {
                        form.setValue("icon", e.target.value);
                      }}
                      name="icon"
                      accept=".svg, .png, .jpg, .jpeg, .avif, .webp"
                      sizeLimit={500}
                      defaultValue={form.getValues("icon")}
                    /> */}
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
                label="Description"
                textarea
              />
              <div className="grid grid-cols-2 gap-[16px] mt-5">
                <Link href="/dashboard/categories">
                  <div className="flex items-center justify-center gap-[12px] px-[16px] py-[8px] rounded-[10px] bg-muted text-secondary">
                    Discard
                  </div>
                </Link>
                <Button disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting
                    ? "Updating..."
                    : "Update Category"}
                </Button>
              </div>
            </div>
          </fieldset>
        </form>
      </Form>
    </div>
  );
};

export default CategoryUpdateForm;
