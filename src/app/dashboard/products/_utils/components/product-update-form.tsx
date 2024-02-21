"use client";

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
import UploadMultiImages from "@/components/molecules/upload-multi-images";
import { ProductComboBox } from "@/components/ui/products-combobox";
import { TOptionItem } from "@/components/molecules/multiselect";
import { useAuthContext } from "@/lib/contexts/auth-context-provider";
import { useEffect, useState } from "react";
import { ProductSchema, TProductSchema } from "../types/types";
import { GetProducts, UpdateProduct } from "../actions/actions";
import AttributesMaker from "./attributes-maker";
import { PRINT } from "@/lib/utils";
import { GetCategories } from "@/app/dashboard/categories/_utils/actions/actions";
import UploadMultipleImages from "@/components/molecules/upload-multi-image-with-cloudinary";
import UploadSingleImage from "@/components/molecules/upload-with-cloudinary";
import { useContextStore } from "@/lib/hooks/hooks";

const ProductUpdateForm = ({
  defaultFormData,
}: {
  defaultFormData: TProductSchema;
}) => {
  const router = useRouter();
  const { removeContext } = useContextStore();
  const { auth } = useAuthContext();
  const form = useForm<TProductSchema>({
    resolver: zodResolver(ProductSchema),
    defaultValues: defaultFormData,
  });
  const [categories, setCategories] = useState([
    {
      value: "dummy",
      label: "Dummy",
    },
  ]);
  const fetchCategories = async () => {
    const result = await GetCategories();
    PRINT(result);
    if (result.success) {
      setCategories([
        ...result.data.categories.map(
          (category: { _id: string; name: string }) => {
            return {
              value: category._id,
              label: category.name,
            };
          }
        ),
      ]);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  const onSubmit = async (values: TProductSchema) => {
    // PRINT(values);
    const token = auth?.accessToken;
    const result = await UpdateProduct(values, token as string);
    if ([400, 401].includes(result.statusCode)) {
      removeContext("auth");
      router.push("/auth/login");
    }
    ActionResponseHandler(result, "Add new product");
    if (result.success) {
      router.push("/dashboard/products");
    }
  };
  PRINT(form.getValues());

  const onError = (errors: any) => {
    PRINT({
      title: "form Error",
      errors,
    });
  };
  return (
    <div className="input-field">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:gird-cols-3 2xl:grid-cols-4 gap-[32px]">
        <div className="pb-[24px] cols-span-1 md:cols-span-2 lg:col-span-1">
          <AttributesMaker parentForm={form} />
        </div>
        <div className="cols-span-1 lg:col-span-3">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit, onError)}
              className="grid grid-cols-1 lg:grid-cols-3 gap-[32px]"
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
                <InputField
                  form={form}
                  name="price"
                  label="Price"
                  type="number"
                />
                <div className="pt-4 mt-4 border-t flex flex-col gap-[16px]">
                  <h2 className="font-bold text-[16px] md:text-[18px]">
                    Discount
                  </h2>
                  {/* <InputField form={form} name="discount.label" label="Label" /> */}
                  <FormField
                    control={form.control}
                    name="discount.type"
                    render={() => (
                      <FormItem>
                        <FormLabel className="inline-flex">Type</FormLabel>
                        <br />
                        <FormControl>
                          <ProductComboBox
                            placeholder="Discount type..."
                            options={DiscountType}
                            name="discount.type"
                            onChange={(e: any) => {
                              PRINT({
                                name: e.target.mame,
                                value: e.target.value,
                              });
                              form.setValue("discount.type", e.target.value);
                            }}
                            defaultValue={form.getValues("discount.type")}
                            inForm
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <InputField
                    form={form}
                    name="discount.value"
                    label="Value"
                    type="number"
                  />
                </div>
                <InputField
                  form={form}
                  name="stock"
                  label="Total items in stock"
                  type="number"
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="inline-flex">Category</FormLabel>
                      <br />
                      <FormControl>
                        <ProductComboBox
                          placeholder="Category..."
                          options={categories}
                          name="category"
                          onChange={(e: any) => {
                            PRINT({
                              name: e.target.mame,
                              value: e.target.value,
                            });
                            form.setValue("category", e.target.value);
                          }}
                          inForm
                          defaultValue={form.getValues("category._id")}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
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
              </fieldset>
              <fieldset className="space-y-8">
                <FormField
                  control={form.control}
                  name="thumbnail"
                  render={() => (
                    <FormItem>
                      <FormLabel>Thumbnail</FormLabel>
                      <FormControl>
                        {/* <UploadImage
                          func={(e: any) => {
                            form.setValue("thumbnail", e.target.value);
                          }}
                          name="thumbnail"
                          accept=".svg, .png, .jpg, .jpeg, .avif, .webp"
                          sizeLimit={500}
                          defaultValue={form.getValues("thumbnail")}
                        /> */}
                        <UploadSingleImage
                          form={form}
                          name="thumbnail"
                          defaultValue={form.getValues("thumbnail")}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="images"
                  render={() => (
                    <FormItem>
                      <FormLabel>Images</FormLabel>
                      <FormControl>
                        {/* <UploadMultiImages
                          func={(e: any) => {
                            // PRINT(e.target.value);
                            form.setValue("images", e.target.value);
                          }}
                          name="images"
                          accept=".svg, .png, .jpg, .jpeg, .avif, .webp"
                          sizeLimit={500}
                          defaultValue={form.getValues("images")}
                        /> */}
                        <UploadMultipleImages
                          form={form}
                          name="images"
                          defaultValues={form.getValues("images")}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <InputField
                  form={form}
                  name="short_description"
                  label="Short description"
                  textarea
                />
                <InputField
                  form={form}
                  name="description"
                  label="Description"
                  textarea
                />
              </fieldset>
              <fieldset className="space-y-8">
                <div className="pt-4 mt-4 border-t flex flex-col gap-[16px]">
                  <h2 className="font-bold text-[16px] md:text-[18px]">
                    Metadata
                  </h2>
                  <InputField form={form} name="metadata.title" label="Title" />
                  <InputField
                    form={form}
                    name="metadata.description"
                    label="description"
                    textarea
                  />
                  <div className="grid grid-cols-2 gap-[16px] mt-5">
                    <Link
                      href="/dashboard/products"
                      className="flex items-center justify-center gap-[12px] px-[16px] py-[8px] rounded-[10px] bg-muted text-secondary"
                    >
                      Discard
                    </Link>
                    <Button disabled={form.formState.isSubmitting}>
                      {form.formState.isSubmitting
                        ? "Adding..."
                        : "Update product data"}
                    </Button>
                  </div>
                </div>
              </fieldset>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ProductUpdateForm;

const DiscountType = [
  {
    value: "percentage",
    label: "Percentage",
  },
  {
    value: "fixed",
    label: "Fixed",
  },
];
